// @ts-check

module.exports = function bundleSizeCollect() {
  // This script collates bundle size information from
  // minified files in apps/test-bundles/dist and writes to
  // apps/test-bundles/dist/bundlesizes.json.
  // It is uploaded as an artifact by the build definition in
  // Azure Dev Ops and used to compare baseline and PR file size
  // information which gets reported by Size Auditor

  const fs = require('fs');
  const path = require('path');

  const distRoot = path.join(__dirname, '../../apps/test-bundles/dist');
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

  function getFilesizeInBytes(fileName) {
    return fs.statSync(fileName).size;
  }

  function getComponentName(fileName) {
    if (fileName.startsWith('experiments-')) {
      return path.basename(fileName, '.min.js');
    }
    return fileName.match('office-ui-fabric-react-(.*).min.js')[1];
  }
};
