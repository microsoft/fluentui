// @ts-check

const { readConfig } = require('../read-config');
const getAllPackageInfo = require('./getAllPackageInfo');

/**
 * @param {import('./index').PackageJson} packageJson
 * @param {boolean|undefined} dev
 */
function getDeps(packageJson, dev) {
  if (!packageJson) {
    return [];
  }

  return Object.keys({ ...packageJson.dependencies, ...(dev && packageJson.devDependencies) });
}

/** @type {import('./index').PackageInfo[]} */
let repoDeps;
let cwdForRepoDeps;

/**
 * Find all the dependencies (and their dependencies) within the repo for a specific package (in the CWD when this was called)
 * @param {object} [options]
 * @param {string} [options.cwd] optional different cwd
 * @param {boolean} [options.dev] include dev deps, default true
 * @returns {import('./index').PackageInfo[]}
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
