/**
 * 构建后处理脚本：自动复制 tonconnect-manifest.json 到构建输出目录
 * 
 * 使用方法：
 * 1. 在 Cocos Creator 构建完成后，手动运行此脚本
 * 2. 或配置构建工具自动执行此脚本
 * 
 * Node.js 执行：
 * node build-templates/web-mobile/post-build.js <构建输出目录>
 */

const fs = require('fs');
const path = require('path');

// 获取构建输出目录（从命令行参数或当前目录）
const buildOutputDir = process.argv[2] || path.join(__dirname, '..', '..', 'XDiving', 'web-mobile');
const projectRoot = path.join(__dirname, '..', '..');
const sourceFile = path.join(projectRoot, 'assets', 'Scripts', 'Test', 'tonconnect-manifest.json');
const targetFile = path.join(buildOutputDir, 'tonconnect-manifest.json');

console.log('开始复制 tonconnect-manifest.json...');
console.log('源文件:', sourceFile);
console.log('目标文件:', targetFile);

try {
    // 检查源文件是否存在
    if (!fs.existsSync(sourceFile)) {
        console.error('❌ 源文件不存在:', sourceFile);
        process.exit(1);
    }
    
    // 确保目标目录存在
    const targetDir = path.dirname(targetFile);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log('✅ 创建目标目录:', targetDir);
    }
    
    // 复制文件
    fs.copyFileSync(sourceFile, targetFile);
    console.log('✅ tonconnect-manifest.json 已成功复制到构建输出目录');
    
    // 验证文件内容
    const content = fs.readFileSync(targetFile, 'utf8');
    const manifest = JSON.parse(content);
    console.log('✅ 文件验证成功');
    console.log('   URL:', manifest.url);
    console.log('   名称:', manifest.name);
    
} catch (error) {
    console.error('❌ 复制失败:', error.message);
    process.exit(1);
}

