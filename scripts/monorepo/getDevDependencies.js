const Project = require('@lerna/project');
const PackageGraph = require('@lerna/package-graph');
const path = require('path');
const findGitRoot = require('./findGitRoot');

function flattenPackageGraph(rootPackages, projectGraph, packageList = []) {
  rootPackages.forEach(packageName => {
    packageList.push(packageName);

    flattenPackageGraph([...projectGraph.get(packageName).localDependencies.keys()], projectGraph, packageList);
  });

  return packageList.sort().filter((v, i, a) => a.indexOf(v) === i);
}

/**
 * Returns all the dev dependencies of a given package name
 * @param {string} packageName including `@fluentui/` prefix
 */
async function getDevDependencies(packageName) {
  const lernaProject = new Project(path.resolve(findGitRoot(), 'packages'));
  const projectPackages = await lernaProject.getPackages();

  const allDepsGraph = flattenPackageGraph([packageName], new PackageGraph(projectPackages));
  const productionDepsGraph = flattenPackageGraph([packageName], new PackageGraph(projectPackages, 'dependencies'));

  const devDependencies = allDepsGraph.filter(dep => !productionDepsGraph.includes(dep));

  return devDependencies;
}

module.exports = getDevDependencies;
