module.exports = function(options) {
  const path = require('path');
  const transformer = require('./codepen-examples-transform');
  const glob = require('glob');
  const files = glob.sync(path.resolve(process.cwd(), 'src/components/**/examples/*Example*.tsx'));

  // Return a promise.
  return processFiles();

  function processFiles() {
    const api = require('jscodeshift');
    const promises = [];
    if (files.length) {
      files.forEach(file => {
        const fileName = path.resolve(file);
        promises.push(
          new Promise((resolve, reject) => {
            // check if the tag is present
            if (file.indexOf('@codepen') >= 0) {
              console.log('BEFORE WRITING FILENAME');
              transformer.transformer(fileName, jscodeshift).then(result => {
                fs.writeFileSync(fileName + '.CodepenExample.txt');
                resolve();
                console.log('FILENAME WAS WRITTEN RIGHT HERE', fileName);
              });
            }
          })
        );
      });
    }
    return Promise.all(promises);
  }
};
