// @ts-check

// Prevent new dependencies on @uifabric/tslint-rules or other tslint things.

const { readConfig } = require('../read-config');
const { checkPackageJsons } = require('../no-tslint');

const packageInfos = process.argv.slice(2).map(packagePath => ({ packagePath, packageJson: readConfig(packagePath) }));

const hasError = checkPackageJsons(packageInfos);
if (hasError) {
  process.exit(1);
}
