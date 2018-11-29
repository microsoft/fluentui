/**
 * Script to update all versions and dependencies within the repo.
 *
 * Usage:
 *
 * node update-package-versions.js "6.0.0-alpha" ">=6.0.0-0 <7.0.0-0"
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readConfig = require('./read-config');

const rushPackages = readConfig('rush.json');
if (!rushPackages) {
  console.error('Could not find rush.json');
  return;
}
const newVersion = process.argv[2];
const newDep = process.argv[3] || newVersion;

for (const package of rushPackages.projects) {
  let packagePath = path.resolve('..', package.projectFolder, 'package.json');
  let packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  console.log(`Updating ${chalk.magenta(package.packageName)} from ${chalk.grey(packageJson.version)} to ${chalk.green(newVersion)}.`);

  packageJson.version = newVersion;

  function updateDependencies(deps) {
    for (const dependency in deps) {
      if (rushPackages.projects.find(pkg => pkg.packageName === dependency)) {
        console.log(`  Updating deps ${dependency}`);

        deps[dependency] = newDep;
      }
    }
  }

  updateDependencies(packageJson.dependencies);
  updateDependencies(packageJson.devDependencies);

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
}
