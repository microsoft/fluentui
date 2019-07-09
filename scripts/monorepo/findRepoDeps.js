const { spawnSync } = require('child_process');
const { readConfig } = require('../read-config');
const path = require('path');
const findGitRoot = require('./findGitRoot');

function getAllPackageInfo() {
  const gitRoot = findGitRoot();
  const results = spawnSync('git', ['ls-tree', '-r', '--name-only', '--full-tree', 'HEAD']);
  const packageInfo = {};

  results.stdout
    .toString()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.endsWith('package.json'))
    .forEach(packageJsonFile => {
      const packageJson = readConfig(path.join(gitRoot, packageJsonFile));
      packageInfo[packageJson.name] = {
        packagePath: path.dirname(packageJsonFile),
        packageJson
      };
    });

  return packageInfo;
}

function getDeps(packageJson) {
  if (!packageJson) {
    return [];
  }

  return Object.keys({ ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) });
}

/**
 * Find all the dependencies (and their dependencies) within the repo for a specific package (in the CWD when this was called)
 * @returns {{ packagePath: string; packageJson: any }[]}
 */
function findRepoDeps() {
  const packageInfo = getAllPackageInfo();
  let cwd = process.cwd();
  const packageJson = readConfig(path.join(cwd, 'package.json'));
  const packageDeps = getDeps(packageJson);
  const result = new Set();

  while (packageDeps.length > 0) {
    const dep = packageDeps.pop();

    if (dep && packageInfo[dep]) {
      result.add(dep);
    }

    getDeps(dep.packageJson).forEach(child => {
      if (!result.has(child)) {
        packageDeps.push(child);
      }
    });
  }

  return [...result].map(dep => packageInfo[dep]);
}

module.exports = findRepoDeps;

if (require.main === module) {
  console.log(findRepoDeps());
}
