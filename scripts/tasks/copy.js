
module.exports = function (options) {
  const { logStartTask, logEndTask } = require('../logging');
  const path = require('path');
  const fs = require('fs');

  configPath = path.resolve(process.cwd(), 'config/pre-copy.json');

  if (!fs.existsSync(configPath)) {
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  let promise = Promise.resolve();

  if (config && config.copyTo) {
    for (let destination in config.copyTo) {
      const sources = config.copyTo[destination];

      for (let source of sources) {
        source = path.resolve(process.cwd(), source);
        destination = path.resolve(process.cwd(), destination);
        startCopy(source, destination);
      }
    }
  }

  return promise;

  function startCopy(source, destination) {
    promise = promise.then(() => new Promise((resolve, reject) => {
      const copy = require('cpx').copy;

      console.log(`  Copying "${path.relative(process.cwd(), source)}" to "${path.relative(process.cwd(), destination)}"`);
      copy(source, destination, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }));
  }
};