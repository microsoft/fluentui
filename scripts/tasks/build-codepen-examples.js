// @ts-check

module.exports = function() {
  const path = require('path');
  const transformer = require('../codepen/codepen-examples-transform');
  const glob = require('glob');
  const fs = require('fs-extra');
  const async = require('async');

  const files = glob.sync(path.resolve(__dirname, '../../packages/*/src/components/**/examples/*Example*.tsx'));

  function readFileStart(file, len) {
    const buffer = Buffer.alloc(len);
    let fileSource = '';
    let fd;
    try {
      fd = fs.openSync(file, 'r');
      fs.readSync(fd, buffer, 0, len, 0);
      fileSource = buffer.toString();
    } finally {
      if (fd) {
        fs.closeSync(fd);
      }
    }
    return fileSource;
  }

  return new Promise((resolve, reject) => {
    async.eachLimit(
      files,
      5,
      function(file, callback) {
        if (readFileStart(file, 150).includes('@codepen')) {
          let fileSource = fs.readFileSync(file).toString();
          const exampleName = path.basename(file, '.tsx');

          // extract the name of the component (relies on component/examples/examplefile.tsx structure)
          const transformResult = transformer(fileSource);
          const dirPath = path.dirname(path.dirname(file)).replace(/((\b)src(\b))(?!.*\1)/, '$2lib/codepen$3');

          if (!fs.existsSync(dirPath)) {
            fs.mkdirpSync(dirPath);
          }

          const outPath = path.join(dirPath, exampleName + '.Codepen.txt');
          console.log('Writing: ' + outPath);
          fs.writeFileSync(outPath, transformResult);
        }

        callback();
      },
      function(err) {
        err ? reject(err) : resolve();
      }
    );
  });
};

// This is run as a CLI when we do 'npm start' - otherwise, it is simply a module to be run by build.js as a task
// @ts-ignore
if (require.main == module) {
  module.exports();
}
