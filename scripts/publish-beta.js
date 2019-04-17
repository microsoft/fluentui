const path = require('path');
const chalk = require('chalk');
const readConfig = require('./read-config');

const rushJson = readConfig('rush.json');
if (!rushJson) {
  console.error('Could not find rush.json');
  return;
}

const packages = rushPackages.projects.filter(project => project.shouldPublish);

for (const package of packages) {
  const packagePath = path.resolve('..', package.projectFolder);

  console.log(`Publishing ${chalk.magenta(package.packageName)} in ${packagePath}`);
  //  execSync('npm publish --tag beta', undefined, packagePath);
}
