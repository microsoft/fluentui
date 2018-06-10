const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const rushPackages = JSON.parse(fs.readFileSync('../rush.json', 'utf8'));
const newVersion = process.argv[2];
const newDep = process.argv[3] || newVersion;

for (const package of rushPackages.projects) {
  let packagePath = path.resolve('..', package.projectFolder, 'package.json');
  let packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  console.log(`Updating ${chalk.magenta(package.packageName)} from ${chalk.grey(packageJson.version)} to ${chalk.green(newVersion)}.`);

  packageJson.version = newVersion;

  function updateDependencies(deps) {
    for (const dependency in deps) {
      if (rushPackages.projects.find((pkg) => pkg.packageName === dependency)) {
        console.log(`  Updating deps ${dependency}`);

        deps[dependency] = newDep;
      }
    }
  }

  updateDependencies(packageJson.dependencies);
  updateDependencies(packageJson.devDependencies);

  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2), 'utf8');
}
