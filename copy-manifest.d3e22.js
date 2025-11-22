/**
 * 构建后处理脚本：自动复制 tonconnect-manifest.json 到构建输出目录
 * 此脚本会在构建完成后自动执行
 */

const fs = require('fs');
const path = require('path');

// 获取项目根目录（从构建输出目录向上查找）
function findProjectRoot(buildDir) {
    let currentDir = buildDir;
    while (currentDir !== path.dirname(currentDir)) {
        const manifestPath = path.join(currentDir, 'assets', 'Scripts', 'Test', 'tonconnect-manifest.json');
        if (fs.existsSync(manifestPath)) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    return null;
}

// 复制 manifest 文件
function copyManifestFile() {
    try {
        // 构建输出目录（当前脚本所在目录的父目录）
        const buildOutputDir = __dirname;
        const projectRoot = findProjectRoot(buildOutputDir);
        
        if (!projectRoot) {
            console.warn('⚠️ 无法找到项目根目录，跳过 manifest 文件复制');
            return;
        }
        
        const sourceFile = path.join(projectRoot, 'assets', 'Scripts', 'Test', 'tonconnect-manifest.json');
        const targetFile = path.join(buildOutputDir, 'tonconnect-manifest.json');
        
        if (!fs.existsSync(sourceFile)) {
            console.warn('⚠️ 源文件不存在:', sourceFile);
            return;
        }
        
        // 复制文件
        fs.copyFileSync(sourceFile, targetFile);
        console.log('✅ tonconnect-manifest.json 已复制到构建输出目录');
    } catch (error) {
        console.error('❌ 复制 manifest 文件失败:', error.message);
    }
}

// 执行复制
copyManifestFile();

