const fs = require('fs');
const path = require('path');

const findGitRoot = require('./findGitRoot');
const { getLernaAliases } = require('./get-lerna-aliases');

/**
 * @type {import('./types').AllPackageInfo}
 */
let packageInfo;
/**
 * @type {string}
 */
let cwdForPackageInfo;

/**
 * @returns {typeof packageInfo}
 */
function getAllPackageInfo() {
  if (packageInfo && cwdForPackageInfo === process.cwd()) {
    return packageInfo;
  }

  // Get mapping from package name to package path
  // (rollup helper happens to be good for getting basic package name/path pairs)
  const packagePaths = getLernaAliases({
    type: 'rollup',
    sourceDirectory: false,
    excludedPackages: [
      // not a real package
      '@fluentui/noop',
    ],
  });

  packageInfo = {};
  cwdForPackageInfo = process.cwd();
  const gitRoot = findGitRoot();

  for (const [packageName, packagePath] of Object.entries(packagePaths)) {
    packageInfo[packageName] = {
      packagePath: path.relative(gitRoot, packagePath),
      packageJson: JSON.parse(fs.readFileSync(path.join(packagePath, 'package.json'), 'utf-8')),
    };
  }

  return packageInfo;
}

module.exports = getAllPackageInfo;
