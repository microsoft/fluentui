const path = require('path');

function expandSourcePath(pattern) {
  const requireResolveCwd = require('../require-resolve-cwd');

  if (!pattern) {
    return null;
  }

  // just returns the relative paths
  if (pattern.startsWith('.')) {
    return pattern;
  }

  // tries to resolve the packages, handling scoped packages
  const splitPattern = pattern.split('/');
  const packageName = pattern[0] == '@' ? `${splitPattern[0]}/${splitPattern[1]}` : splitPattern[0];

  try {
    const resolvedPackageJson = requireResolveCwd(`${packageName}/package.json`);

    if (!resolvedPackageJson) {
      // returns pattern if the packageName didn't contain a package.json (not really a package)
      return pattern;
    }

    return pattern.replace(packageName, path.dirname(resolvedPackageJson));
  } catch (e) {
    console.error(e);
  }
}

module.exports = function() {
  const path = require('path');
  const fs = require('fs');

  let configPath = path.resolve(process.cwd(), 'config/pre-copy.json');

  if (!fs.existsSync(configPath)) {
    return;
  }

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  let promise = Promise.resolve();

  if (config && config.copyTo) {
    for (let destination in config.copyTo) {
      const sources = config.copyTo[destination];

      for (let source of sources) {
        source = expandSourcePath(source);
        destination = path.resolve(process.cwd(), destination);
        startCopy(source, destination);
      }
    }
  }

  return promise;

  function startCopy(source, destination) {
    promise = promise.then(
      () =>
        new Promise((resolve, reject) => {
          const copy = require('cpx').copy;

          console.log(`  Copying "${path.relative(process.cwd(), source)}" to "${path.relative(process.cwd(), destination)}"`);
          copy(source, destination, err => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        })
    );
  }
};
