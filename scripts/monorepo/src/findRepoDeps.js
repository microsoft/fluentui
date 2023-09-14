const { readConfig } = require('@fluentui/scripts-utils');
const getAllPackageInfo = require('./getAllPackageInfo');

/**
 * @param {import('./types').PackageJson} packageJson
 * @param {boolean|undefined} dev
 */
function getDeps(packageJson, dev) {
  if (!packageJson) {
    return [];
  }

  return Object.keys({ ...packageJson.dependencies, ...(dev && packageJson.devDependencies) });
}

/** @type {import('./types').PackageInfo[]} */
let repoDeps;
/**
 * @type {string}
 */
let cwdForRepoDeps;

/**
 * Find all the dependencies (and their dependencies) within the repo for a specific package (by default, in the CWD when this was called)
 * @param {Object} [options]
 * @param {string} [options.cwd] optional different cwd
 * @param {boolean} [options.dev] include dev deps, default true
 * @returns {import('./types').PackageInfo[]}
 */
function findRepoDeps(options = {}) {
  const { cwd = process.cwd(), dev = true } = options;
  if (repoDeps && cwdForRepoDeps === cwd) {
    return repoDeps;
  }

  const packageInfo = getAllPackageInfo();
  const packageJson = readConfig('package.json', cwd);
  const packageDeps = getDeps(packageJson, dev);
  /** @type {Set<string>} */
  const result = new Set();

  while (packageDeps.length > 0) {
    const dep = packageDeps.pop();

    if (dep && packageInfo[dep]) {
      result.add(dep);

      getDeps(packageInfo[dep].packageJson, dev).forEach(child => {
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
