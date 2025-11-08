const fs = require('fs');
const path = require('path');

const reactDomDir = path.join(process.cwd(), 'node_modules', 'react-dom');
const sourceFile = path.join(reactDomDir, 'server.browser.js');
const targetFile = path.join(reactDomDir, 'server.edge.js');
const packageJsonPath = path.join(reactDomDir, 'package.json');

if (!fs.existsSync(reactDomDir)) {
  console.error('react-dom is not installed yet. Skipping edge patch.');
  process.exit(0);
}

if (!fs.existsSync(targetFile)) {
  fs.copyFileSync(sourceFile, targetFile);
  console.log('Created react-dom/server.edge.js from server.node.js');
}

const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
pkg.exports = pkg.exports || {};
if (!pkg.exports['./server.edge']) {
  pkg.exports['./server.edge'] = './server.edge.js';
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2));
  console.log('Updated react-dom package exports to expose server.edge entry.');
}
