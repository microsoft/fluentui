const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const execSync = require('./exec-sync');

const newVersion = process.argv[2];
const newDep = process.argv[3] || newVersion;

const packages = [
  'utilities',
  'merge-styles',
  'icons',
  'styling',
  'office-ui-fabric-react',
  'experiments'
];

for (const package of packages) {
  let packagePath = path.resolve('../packages', package);

  console.log(`Publishing ${chalk.magenta(package)} in ${packagePath}`);
  execSync('npm publish --tag beta', undefined, packagePath);
}
