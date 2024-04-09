const { readConfig } = require('@fluentui/scripts-utils');
const semver = require('semver');

const { getProjectMetadata } = require('./utils');

/**
 *  @typedef {string | import('./index').PackageJson}  PathOrPackageJson
 */

/**
 * Determines whether a package is converged, based on its version.
 *
 * @param {Object} [options]
 * @param {PathOrPackageJson} [options.packagePathOrJson] - optional different package path to run in OR previously-read package.json
 * (defaults to reading package.json from `process.cwd()`)
 * @param {'library' | 'application' | 'all'} [options.projectType] - filter for what project types you wanna apply the condition
 * @param {ReturnType<typeof import('@nx/devkit').getProjects>} [options.projects] - pass all workspace projects for significantly faster execution ( useful if you need to run this function multiple times )
 *
 * @returns {boolean} true if it's a converged package (version >= 9)
 */
function isConvergedPackage(options = {}) {
  const { packagePathOrJson, projectType = 'all', projects } = options;
  const packageJson =
    !packagePathOrJson || typeof packagePathOrJson === 'string'
      ? readConfig('package.json', /** @type {string|undefined} */ (packagePathOrJson))
      : packagePathOrJson;

  if (!packageJson) {
    throw new Error(`package.json doesn't exist`);
  }

  const metadata = getProjectMetadata(packageJson.name, projects);

  if (projectType !== 'all' && metadata.projectType !== projectType) {
    return false;
  }

  const hasVNextTag = !!metadata.tags?.includes('vNext');

  return semver.major(packageJson.version) >= 9 || isNightlyVersion(packageJson.version) || hasVNextTag;
}

/**
 * @param {Object} [options]
 * @param {PathOrPackageJson} [options.packagePathOrJson] - optional different package path to run in OR previously-read package.json
 * (defaults to reading package.json from `process.cwd()`)
 * @returns
 */
function shipsAMD(options = {}) {
  const { packagePathOrJson } = options;
  const packageJson =
    !packagePathOrJson || typeof packagePathOrJson === 'string'
      ? readConfig('package.json', /** @type {string|undefined} */ (packagePathOrJson))
      : packagePathOrJson;

  if (!packageJson) {
    throw new Error(`package.json doesn't exist`);
  }

  const metadata = getProjectMetadata(packageJson.name);

  if (metadata.projectType !== 'library') {
    return false;
  }

  const tags = new Set(metadata.tags ?? []);
  const isV8 = tags.has('v8');
  const isV9 = tags.has('vNext');
  const needsAMD = tags.has('ships-amd');
  const isMixedProject = isV9 && isV8;

  if (needsAMD) {
    return true;
  }
  if (isMixedProject) {
    return true;
  }
  if (isV9) {
    return false;
  }
  return true;
}

/**
 * Determines if a version is the 0.0.0 nightly version used by converged packages
 * @param {string} version
 */
function isNightlyVersion(version) {
  return semver.major(version) === 0 && semver.minor(version) === 0 && semver.patch(version) === 0;
}

exports.isConvergedPackage = isConvergedPackage;
exports.shipsAMD = shipsAMD;
