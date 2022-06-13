const fs = require('fs-extra');
const path = require('path');
const lernaAlias = require('lerna-alias');
const { findGitRoot } = require('./configHelpers');

/**
 *  @typedef {{name: string, version: string, dependencies: {[key: string]: string}}} PackageJson
 *  @typedef {{packagePath: string, packageJson: PackageJson}} PackageInfo
 *  @typedef {{[packageName: string]: PackageInfo}} AllPackageInfo
 */

function getAllPackageInfo() {
  /**
   * @type AllPackageInfo
   */
  const allPackageInfo = {};

  // Get mapping from package name to package path
  // (rollup helper happens to be good for getting basic package name/path pairs)
  const packagePaths = lernaAlias.rollup({ sourceDirectory: false });
  delete packagePaths['@fluentui/noop']; // not a real package

  const gitRoot = findGitRoot();

  for (const [packageName, packagePath] of Object.entries(packagePaths)) {
    allPackageInfo[packageName] = {
      packagePath: path.relative(gitRoot, packagePath),
      packageJson: fs.readJSONSync(path.join(packagePath, 'package.json')),
    };
  }

  return allPackageInfo;
}

module.exports = getAllPackageInfo;
