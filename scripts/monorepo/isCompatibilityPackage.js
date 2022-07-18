// @ts-check
const { readConfig } = require('../read-config');

/**
 *  @typedef {string | import('./index').PackageJson}  PathOrPackageJson
 */

/**
 * Determines whether a package is a compatibility package
 * between current and next versions.
 *
 * Compatibility packages are typicallv9 packages that provide
 * backwards compatibility for v8.
 *
 * They may need special handling in the build.
 * @param {PathOrPackageJson} [packagePathOrJson] optional different package path to run in OR previously-read package.json
 * (defaults to reading package.json from `process.cwd()`)
 * @returns {boolean} true if the package.json has the fluent-compatibility set to true.
 */
function isCompatibilityPackage(packagePathOrJson) {
  const packageJson =
    !packagePathOrJson || typeof packagePathOrJson === 'string'
      ? readConfig('package.json', /** @type {string|undefined} */ (packagePathOrJson))
      : packagePathOrJson;
  return !!packageJson && packageJson['fluent-compatibility'] === true;
}

module.exports = isCompatibilityPackage;
