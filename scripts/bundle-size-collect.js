// @ts-check

// This script collates bundle size information from minified files in apps/test-bundles/dist
// and writes to apps/test-bundles/dist/bundlesizes.json.
// It is uploaded as an artifact by the build definition in Azure DevOps and used to compare
// baseline and PR file size information which gets reported by Size Auditor.

const fs = require('fs');
const path = require('path');

const distRoot = path.resolve(__dirname, '../apps/test-bundles/dist');
const sizes = {};
const outputFilename = 'bundlesizes.json';

var items = fs.readdirSync(distRoot);
items.forEach(item => {
  const file = path.join(distRoot, item);

  const isMinifiedJavascriptFile = item.match(/.min.js$/);
  if (isMinifiedJavascriptFile) {
    sizes[getComponentName(item)] = getFilesizeInBytes(file);
  }
});

fs.writeFileSync(path.join(distRoot, outputFilename), JSON.stringify({ sizes }));

console.log('Bundle size Collect:');
console.log('====================');
console.log(sizes);

function getFilesizeInBytes(fileName) {
  return fs.statSync(fileName).size;
}

function getComponentName(fileName) {
  return path.basename(fileName, '.min.js');
}
