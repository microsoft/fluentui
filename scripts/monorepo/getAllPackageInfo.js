const fs = require('fs-extra');
const path = require('path');
const lernaAlias = require('lerna-alias');
const findGitRoot = require('./findGitRoot');

/** @type {import('./index').AllPackageInfo} */
let packageInfo;
/**
 * @type {string}
 */
let cwdForPackageInfo;

/**
 * @param {string[]?} omittedPaths - paths to ommit from the list
 * @returns {import('./index').AllPackageInfo}
 */
function getAllPackageInfo(omittedPaths) {
  if (packageInfo && cwdForPackageInfo === process.cwd()) {
    return packageInfo;
  }

  // Get mapping from package name to package path
  // (rollup helper happens to be good for getting basic package name/path pairs)
  const packagePaths = lernaAlias.rollup({ sourceDirectory: false });
  delete packagePaths['@fluentui/noop']; // not a real package

  packageInfo = {};
  cwdForPackageInfo = process.cwd();
  const gitRoot = findGitRoot();

  for (const [packageName, packagePath] of Object.entries(packagePaths)) {
    let keep = true;
    omittedPaths &&
      omittedPaths.forEach(omittedPath => {
        if (packagePath.split('\\').join('/').includes(omittedPath)) {
          keep = false;
          return;
        }
      });
    if (keep) {
      packageInfo[packageName] = {
        packagePath: path.relative(gitRoot, packagePath),
        packageJson: fs.readJSONSync(path.join(packagePath, 'package.json')),
      };
    }
  }

  return packageInfo;
}

module.exports = getAllPackageInfo;
