// @ts-check

/**
 * Script to update all versions and dependencies within the repo.
 *
 * Usage:
 *
 * node update-package-versions.js "6.0.0-alpha" ">=6.0.0-0 <7.0.0-0"
 */

const path = require('path');
const process = require('process');
const chalk = require('chalk').default;
const getAllPackageInfo = require('./monorepo/getAllPackageInfo');
const writeConfig = require('./write-config');

const allPackages = getAllPackageInfo();
const newVersion = process.argv[2];
const newDep = process.argv[3] || newVersion;

function help() {
  console.error('update-package-versions.js - usage:\n  node update-package-versions.js "6.0.0-alpha" ">=6.0.0-0 <7.0.0-0"');
}

if (!allPackages) {
  help();
  console.error('Could not find get all the packages');
  process.exit(1);
}

if (!newVersion || !newDep) {
  help();
  console.error('Must specify newVersion and newDep');
  process.exit(1);
}

for (const name of Object.keys(allPackages)) {
  const info = allPackages[name];
  const packageJson = info.packageJson;

  console.log(`Updating ${chalk.magenta(name)} from ${chalk.grey(packageJson.version)} to ${chalk.green(newVersion)}.`);

  packageJson.version = newVersion;

  function updateDependencies(deps) {
    for (const dependency in deps) {
      if (Object.keys(allPackages).find(name => name === dependency)) {
        console.log(`  Updating deps ${dependency}`);

        deps[dependency] = newDep;
      }
    }
  }

  updateDependencies(packageJson.dependencies);
  updateDependencies(packageJson.devDependencies);

  writeConfig(info.packagePath, packageJson);
}
