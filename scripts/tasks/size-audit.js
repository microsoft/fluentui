/**
 * Gets the size of the "default" locale bundle file
 */
module.exports = function(options) {
  function generateSizeData() {
    const projectName = path.basename(process.cwd());
    const sizeFilePath = path.join(process.cwd(), 'dist', `${projectName}.json`);
    if (fs.existsSync(path.dirname(sizeFilePath))) {
      const result = {
        chunks: analyzeChunks()
      };
      const fileContents = JSON.stringify(result);
      fs.writeFileSync(sizeFilePath, fileContents);
    }
  }

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
    try {
      const stats = fs.statSync(filePath);
      return stats.size;
    } catch (e) {
      console.log(`Unable to get size of file "${filePath}"`);
      return -1;
    }
  }
};
