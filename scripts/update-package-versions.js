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
const { readRushJson, readConfig } = require('./read-config');
const writeConfig = require('./write-config');

const rushJson = readRushJson();
const newVersion = process.argv[2];
const newDep = process.argv[3] || newVersion;

function help() {
  console.error('update-package-versions.js - usage:\n  node update-package-versions.js "6.0.0-alpha" ">=6.0.0-0 <7.0.0-0"');
}

if (!rushJson) {
  help();
  console.error('Could not find rush.json');
  process.exit(1);
}

if (!newVersion || !newDep) {
  help();
  console.error('Must specify newVersion and newDep');
  process.exit(1);
}

for (const package of rushJson.projects) {
  let packagePath = path.resolve(__dirname, '..', package.projectFolder, 'package.json');
  let packageJson = readConfig(packagePath);

  console.log(`Updating ${chalk.magenta(package.packageName)} from ${chalk.grey(packageJson.version)} to ${chalk.green(newVersion)}.`);

  packageJson.version = newVersion;

  function updateDependencies(deps) {
    for (const dependency in deps) {
      if (rushJson.projects.find(pkg => pkg.packageName === dependency)) {
        console.log(`  Updating deps ${dependency}`);

        deps[dependency] = newDep;
      }
    }
  }

  updateDependencies(packageJson.dependencies);
  updateDependencies(packageJson.devDependencies);

  writeConfig(packagePath, packageJson);
}
