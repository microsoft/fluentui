// This script collates bundle size information from
// minified files in apps/test-bundles/dist and writes to
// apps/test-bundles/dist/bundlesizes.json.
// It is uploaded as an artifact by the build definition in
// Azure Dev Ops and used to compare baseline and PR file size
// information which gets reported by Size Auditor

var fs = require('fs');

var path = 'dist';
var sizes = {};
var outputFilePath = 'dist/bundlesizes.json';

fs.readdir(path, function(err, items) {
  for (var i = 0; i < items.length; i++) {
    var file = path + '/' + items[i];

    const isMinifiedJavascriptFile = items[i].match(/.min.js$/);
    if (isMinifiedJavascriptFile) {
      var fileName = getComponentName(items[i]);
      var fileSize = getFilesizeInBytes(file);
      sizes[fileName] = fileSize;
    }
  }

  fs.writeFileSync(outputFilePath, JSON.stringify({ sizes }));
});

function getFilesizeInBytes(fileName) {
  const stats = fs.statSync(fileName);
  const fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

function getComponentName(fileName) {
  return fileName.match('office-ui-fabric-react-(.*).min.js')[1];
}
