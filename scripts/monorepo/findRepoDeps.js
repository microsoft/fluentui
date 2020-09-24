// @ts-check

const { readConfig } = require('../read-config');
const getAllPackageInfo = require('./getAllPackageInfo');

/**
 * @param {import('./index').PackageJson} packageJson
 */
function getDeps(packageJson) {
  if (!packageJson) {
    return [];
  }

  return Object.keys({ ...(packageJson.dependencies || {}), ...(packageJson.devDependencies || {}) });
}

/** @type {import('./index').PackageInfo[]} */
let repoDeps;
let cwdForRepoDeps;

/**
 * Find all the dependencies (and their dependencies) within the repo for a specific package (in the CWD when this was called)
 * @param {string} [cwd] optional different cwd
 * @returns {import('./index').PackageInfo[]}
 */
function findRepoDeps(cwd) {
  cwd = cwd || process.cwd();
  if (repoDeps && cwdForRepoDeps === cwd) {
    return repoDeps;
  }

  const packageInfo = getAllPackageInfo();
  const packageJson = readConfig('package.json');
  const packageDeps = getDeps(packageJson);
  /** @type {Set<string>} */
  const result = new Set();

  while (packageDeps.length > 0) {
    const dep = packageDeps.pop();

    if (dep && packageInfo[dep]) {
      result.add(dep);

      getDeps(packageInfo[dep].packageJson).forEach(child => {
        if (child && packageInfo[child] && !result.has(child)) {
          packageDeps.push(child);
        }
      });
    }
  }

  repoDeps = [...result].map(dep => packageInfo[dep]);
  cwdForRepoDeps = cwd;
  return repoDeps;
}

module.exports = findRepoDeps;

// @ts-ignore
if (require.main === module) {
  console.log(findRepoDeps());
}
