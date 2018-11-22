const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const execSync = require('./exec-sync');
const readRushJson = require('./read-rush-json');

const newVersion = process.argv[2];
const newDep = process.argv[3] || newVersion;

const rushJson = readRushJson();
if (!rushJson) {
  return;
}

const packages = rushPackages.projects.filter(project => project.shouldPublish);

for (const package of packages) {
  const packagePath = path.resolve('..', package.projectFolder);

  console.log(`Publishing ${chalk.magenta(package.packageName)} in ${packagePath}`);
  //  execSync('npm publish --tag beta', undefined, packagePath);
}
