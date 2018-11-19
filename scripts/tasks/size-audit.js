const path = require('path');
const fs = require('fs');

exports.generateSizeData = function() {
  const projectName = path.basename(process.cwd());
  const sizeFilePath = path.join(process.cwd(), 'dist', `${projectName}-sizedata.json`);
  if (fs.existsSync(path.dirname(sizeFilePath))) {
    const result = {
      chunks: analyzeChunks()
    };
    const fileContents = JSON.stringify(result);
    fs.writeFileSync(sizeFilePath, fileContents);
  }
};

// The file format is expected to be {"chunks":{"test-bundle-button.js":xxxxxxx}}
function analyzeChunks() {
  const distPath = path.join(process.cwd(), 'dist');
  const result = {};
  for (const filePath of fs.readdirSync(distPath)) {
    const fileName = path.basename(filePath);
    const extension = path.extname(fileName);
    if (extension.toLowerCase() === '.js') {
      result[fileName] = getFileSize(path.join(distPath, fileName));
    }
    return result;
  }
}

function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}
