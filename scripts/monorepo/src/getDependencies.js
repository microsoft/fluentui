const { utils: lernaUtils } = require('./lerna-utils');

/**
 *
 * @param {string[]} packageNames
 * @param {import('./lerna-utils').ProjectGraphWithPackages} projectGraph
 * @param {{dependenciesOnly?:boolean}} options
 * @param {string[]} _packagesList
 * @returns
 */
function getPackageDependencyGraph(
  packageNames,
  projectGraph,
  options = { dependenciesOnly: false },
  _packagesList = [],
) {
  packageNames.forEach(packageName => {
    _packagesList.push(packageName);

    if (!projectGraph.localPackageDependencies[packageName]) {
      return;
    }

    const localDepsTargets = /** @type {string[]}*/ (
      projectGraph.localPackageDependencies[packageName]
        .map(localDepDefinition => {
          if (options.dependenciesOnly && localDepDefinition.dependencyCollection) {
            return localDepDefinition.dependencyCollection === 'dependencies' ? localDepDefinition.target : undefined;
          }

          return localDepDefinition.target;
        })
        .filter(Boolean)
    );

    getPackageDependencyGraph(localDepsTargets, projectGraph, options, _packagesList);
  });

  return _packagesList.sort().filter((v, i, a) => a.indexOf(v) === i);
}

/**
 * Returns all the dependencies of a given package name
 * @param {string | string[]} packageName - including `@fluentui/` prefix
 */
async function getDependencies(packageName) {
  const packagesToProcess = Array.isArray(packageName) ? packageName : [packageName];
  const { projectGraph } = await lernaUtils.detectProjects();

  const allDepsGraph = getPackageDependencyGraph(packagesToProcess, projectGraph);
  const depsGraph = getPackageDependencyGraph(packagesToProcess, projectGraph, { dependenciesOnly: true });
  const devDepsGraph = allDepsGraph.filter(dep => !depsGraph.includes(dep));

  return {
    dependencies: depsGraph,
    devDependencies: devDepsGraph,
    all: allDepsGraph,
    projectGraph,
  };
}

exports.getDependencies = getDependencies;
