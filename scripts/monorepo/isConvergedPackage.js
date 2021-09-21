// @ts-check
const semver = require('semver');
const { readConfig } = require('../read-config');

/**
 *  @typedef {string | import('./index').PackageJson}  PathOrPackageJson
 */

/**
 * Determines whether a package is converged, based on its version.
 * @param {PathOrPackageJson} [packagePathOrJson] optional different package path to run in OR previously-read package.json
 * (defaults to reading package.json from `process.cwd()`)
 * @returns {boolean} true if it's a converged package (version >= 9)
 */
function isConvergedPackage(packagePathOrJson) {
  const packageJson =
    typeof packagePathOrJson === 'string' ? readConfig('package.json', packagePathOrJson) : packagePathOrJson;
  return !!packageJson && semver.major(packageJson.version) >= 9;
}

module.exports = isConvergedPackage;
