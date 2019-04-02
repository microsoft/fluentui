const path = require('path');
const chalk = require('chalk');
const execSync = require('./exec-sync');
const readConfig = require('./read-config');
const process = require('process');

let rushConfigPath = path.resolve(__dirname, '..', 'rush.json');
const rushPackages = readConfig(rushConfigPath);
if (!rushPackages) {
  console.error('Could not find rush.json');
  process.exit(1);
}

const packages = rushPackages.projects.filter(project => project.shouldPublish || project.versionPolicyName);

for (const package of packages) {
  const packagePath = path.resolve(__dirname, '..', package.projectFolder);

  console.log(`Publishing ${chalk.magenta(package.packageName)} in ${packagePath}`);
  execSync('npm publish --tag next', undefined, packagePath);
}
