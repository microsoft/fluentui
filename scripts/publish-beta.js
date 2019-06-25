// @ts-check

const path = require('path');
const chalk = require('chalk').default;
const execSync = require('./exec-sync');
const { readRushJson } = require('./read-config');
const process = require('process');

const rushJson = readRushJson();
if (!rushJson) {
  console.error('Could not find rush.json');
  process.exit(1);
}

const packages = rushJson.projects.filter(project => project.shouldPublish || project.versionPolicyName);

for (const package of packages) {
  const packagePath = path.resolve(__dirname, '..', package.projectFolder);

  console.log(`Publishing ${chalk.magenta(package.packageName)} in ${packagePath}`);
  execSync('npm publish --tag next', undefined, packagePath);
}
