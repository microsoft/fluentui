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
    !packagePathOrJson || typeof packagePathOrJson === 'string'
      ? readConfig('package.json', /** @type {string|undefined} */ (packagePathOrJson))
      : packagePathOrJson;
  return !!packageJson && (semver.major(packageJson.version) >= 9 || isNightlyVersion(packageJson.version));
}

/**
 * Determins if a version is the 0.0.0 nightly version used by converged packages
 * @param {string} version
 */
function isNightlyVersion(version) {
  return semver.major(version) === 0 && semver.minor(version) === 0 && semver.patch(version) === 0;
}

module.exports = isConvergedPackage;
