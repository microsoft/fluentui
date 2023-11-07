import * as fs from 'fs';
const readFilePath = 'lib-commonjs/components/Sparkline/Sparkline.base.js';
const writeFilePath = 'src/components/Sparkline/SparklineBase.js';
// Read the file
const updatedFile = () => {
  fs.readFile(readFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file from disk: ${err}`);
    } else {
      // Replace the words
      let result = data.replace(/require\("d3-scale"\)/g, "import('d3-scale')");
      result = result.replace(/require\("d3-shape"\)/g, "import('d3-shape')");
      result = result.replace(/require\("d3-array"\)/g, "import('d3-array')");
      // Write the file back
      fs.writeFile(writeFilePath, result, 'utf8', err => {
        if (err) {
          console.error(`Error writing file to disk: ${err}`);
        }
      });
    }
  });
};

updatedFile();
