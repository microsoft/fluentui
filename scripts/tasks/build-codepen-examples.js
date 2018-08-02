module.exports = function(options) {
  const path = require('path');
  const transformer = require('./codepen-examples-transform');
  const glob = require('glob');
  const files = glob.sync(path.resolve(process.cwd(), 'src/components/**/examples/*Example*.tsx'));
  const jscodeshift = require('jscodeshift');
  const fs = require('fs');

  // Return a promise.
  return processFiles();

  function processFiles() {
    const promises = [];
    if (files.length) {
      files.forEach(file => {
        const filePath = path.resolve(file);
        const fileSource = fs.readFileSync(filePath).toString();

        promises.push(
          new Promise((resolve, reject) => {
            // check if the @codepen tag is present
            if (fileSource.indexOf('@codepen') >= 0) {
              // parameters for transform file
              const options = { parser: 'babylon' };
              const fileInfo = { path: filePath, source: fileSource };
              const api = { jscodeshift: jscodeshift, stats: {} };
              const transformResult = transformer(fileInfo, api);
              fs.writeFileSync('lib/components/Label/Label.Basic.CodepenExample.txt', transformResult);
              resolve();
            }
          })
        );
      });
    }
    return Promise.all(promises);
  }
};
