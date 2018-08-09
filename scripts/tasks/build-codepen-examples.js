module.exports = function(options) {
  const path = require('path');
  const transformer = require('./codepen-examples-transform');
  const glob = require('glob');
  const files = glob.sync(path.resolve(process.cwd(), 'src/components/**/examples/*Example*.tsx'));
  const jscodeshift = require('jscodeshift');
  const fs = require('fs');
  const async = require('async');

  return processFiles();

  function processFiles() {
    return new Promise((resolve, reject) => {
      async.eachLimit(
        files,
        5,
        function(file, callback) {
          const fileSource = fs.readFileSync(file).toString();
          if (fileSource.indexOf('@codepen') >= 0) {
            const exampleName = path.basename(file, '.tsx');
            // extract the name of the component (relies on component/examples/examplefile.tsx structure)
            const exampleComponentName = file.split('/').reverse()[2];
            const fileInfo = { path: file, source: fileSource };
            const api = { jscodeshift: jscodeshift.withParser('babylon'), stats: {} };
            const transformResult = transformer(fileInfo, api);
            fs.writeFileSync(
              'lib/components/' + exampleComponentName + '/' + exampleName + '.Codepen.txt',
              transformResult
            );
            callback();
          } else {
            callback();
          }
        },
        function(err) {
          if (err) {
            reject();
          } else {
            resolve();
          }
        }
      );
    });
  }
};
