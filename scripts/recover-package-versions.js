// @ts-check

/**
 * Script to update all versions of public packages to the latest in npm.
 * Usage:
 *
 * node recover-package-versions.js
 */

const path = require('path');
const process = require('process');
const child_process = require('child_process');
const chalk = require('chalk').default;
const getAllPackageInfo = require('./monorepo/getAllPackageInfo');
const writeConfig = require('./write-config');
const semver = require('semver');

const allPackages = getAllPackageInfo();

function help() {
  console.error('recover-package-versions.js - usage:\n  node recover-versions.js');
}

function getVersion(packageName) {
  return child_process
    .execSync(`npm view ${packageName} version`)
    .toString()
    .replace('\n', '');
}

if (!allPackages) {
  help();
  console.error('Could not find get all the packages');
  process.exit(1);
}

for (const name of Object.keys(allPackages)) {
  const info = allPackages[name];
  const packageJson = info.packageJson;
  const currentVersion = packageJson.version;

  if (!packageJson.private) {
    const npmVersion = getVersion(packageJson.name);
    const needsUpdating = semver.lt(currentVersion, npmVersion);

    if (needsUpdating) {
      console.log(`${chalk.magenta(name)}: Updating to ${npmVersion}`);
      packageJson.version = npmVersion;
      writeConfig(path.join(info.packagePath, 'package.json'), packageJson);
    }
  }
}
