module.exports = function(options) {
  const path = require('path');
  const transformer = require('./codepen-examples-transform');
  const glob = require('glob');
  const files = glob.sync(path.resolve(process.cwd(), 'src/components/**/examples/*Example*.tsx'));
  const jscodeshift = require('jscodeshift');
  const fs = require('fs');
  const async = require('async');

  // Return a promise.
  return processFiles();
  function processFiles() {
    const promises = [];
    if (files.length) {
      async.eachLimit(files, 5, function(file, callback) {
        const fileSource = fs.readFileSync(file).toString();
        promises.push(
          new Promise((resolve, reject) => {
            // check if the @codepen tag is present
            if (fileSource.indexOf('@codepen') >= 0) {
              const exampleName = path.basename(file, '.tsx');
              // extract the name of the component (relies on component/examples/examplefile.tsx structure)
              const exampleComponentName = file.split('/').reverse()[2];
              // parameters for transform file
              const fileInfo = { path: file, source: fileSource };
              const api = { jscodeshift: jscodeshift.withParser('babylon'), stats: {} };
              const transformResult = transformer(fileInfo, api);
              fs.writeFileSync(
                'lib/components/' + exampleComponentName + '/' + exampleName + '.Codepen.txt',
                transformResult
              );
              resolve();
            }
          })
        );
      });
    }
    return Promise.all(promises);
  }
};
