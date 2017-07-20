let gzipSize = require('gzip-size');
let fs = require('fs');
let files = [
  'dist/test-bundle-button.js'
];

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let size = gzipSize.sync(content);

  console.log(`${file} - min: ${content.length} bytes, gzip: ${size} bytes`);
}
