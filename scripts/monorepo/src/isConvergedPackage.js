const semver = require('semver');

/**
 *
 * @param {{project:import('@nx/devkit').ProjectConfiguration;packageJson:import('nx/src/utils/package-json').PackageJson}} metadata
 */
function isConvergedPackage(metadata) {
  const { packageJson, project } = metadata;
  const hasVNextTag = Boolean(project.tags?.includes('vNext'));

  return semver.major(packageJson.version) >= 9 || isNightlyVersion(packageJson.version) || hasVNextTag;
}

/**
 * Determines if a version is the 0.0.0 nightly version used by converged packages
 * @param {string} version
 */
function isNightlyVersion(version) {
  return semver.major(version) === 0 && semver.minor(version) === 0 && semver.patch(version) === 0;
}

exports.isConvergedPackage = isConvergedPackage;
