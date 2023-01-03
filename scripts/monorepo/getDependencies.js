const path = require('path');

const { Project } = require('@lerna/project');

const { PackageGraph } = require('@lerna/package-graph');

const findGitRoot = require('./findGitRoot');

/**
 *
 * @param {string[]} rootPackages
 * @param {Map<any,any>} projectGraph
 * @param {string[]} packageList
 * @returns
 */
function flattenPackageGraph(rootPackages, projectGraph, packageList = []) {
  rootPackages.forEach(packageName => {
    packageList.push(packageName);

    flattenPackageGraph([...projectGraph.get(packageName).localDependencies.keys()], projectGraph, packageList);
  });

  return packageList.sort().filter((v, i, a) => a.indexOf(v) === i);
}

/**
 * Returns all the dependencies of a given package name
 * @param {string} packageName including `@fluentui/` prefix
 * @param {Object} options
 * @param {boolean} [options.dev] include dev dependencies
 * @param {boolean} [options.production] include production dependencies
 */
async function getDependencies(packageName, options = { production: true }) {
  const lernaProject = new Project(path.resolve(findGitRoot(), 'packages'));
  const projectPackages = await lernaProject.getPackages();

  const allDepsGraph = flattenPackageGraph([packageName], new PackageGraph(projectPackages));
  const productionDepsGraph = flattenPackageGraph([packageName], new PackageGraph(projectPackages, 'dependencies'));

  const devDependencies = allDepsGraph.filter(dep => !productionDepsGraph.includes(dep));

  /**
   * @type {string[]}
   */
  let res = [];

  if (options.dev) {
    res = res.concat(devDependencies);
  }

  if (options.production) {
    res = res.concat(productionDepsGraph);
  }

  return res;
}

module.exports = getDependencies;
