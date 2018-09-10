module.exports = function() {
  const path = require('path');
  const transformer = require('./codepen-examples-transform');
  const glob = require('glob');
  const files = glob.sync(path.resolve(__dirname, '../../packages/*/src/components/**/examples/*Example*.tsx'));

  const jscodeshift = require('jscodeshift');
  const fs = require('fs');
  const async = require('async');
  const mkdirp = require('mkdirp');

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
          const dirPath = path.dirname(path.dirname(file)).replace(/((\b)src(\b))(?!.*\1)/, '$2lib/codepen$3');

          if (!fs.existsSync(dirPath)) {
            mkdirp.sync(dirPath);
          }

          fs.writeFileSync(path.join(dirPath, exampleName + '.Codepen.txt'), transformResult);
        }

        callback();
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
};

// This is run as a CLI when we do 'npm start' - otherwise, it is simply a module to be run by build.js as a task
if (require.main == module) {
  module.exports();
}
