// @ts-check

const path = require('path');
const chalk = require('chalk').default;
const execSync = require('./exec-sync');
const getAllPackageInfo = require('./monorepo/getAllPackageInfo');

const allPackages = getAllPackageInfo();
const packages = [];

Object.keys(allPackages).forEach(name => {
  const info = allPackages[name];
  if (info.packageJson.private !== true) {
    packages.push(info);
  }
});

for (const package of packages) {
  const packagePath = path.resolve(__dirname, '..', package.packagePath);

  console.log(`Publishing ${chalk.magenta(package.packageName)} in ${packagePath}`);
  execSync('npm publish --tag next', undefined, packagePath);
}
