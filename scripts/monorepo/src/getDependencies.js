const lernaUtils = require('lerna/utils');

/**
* @typedef {{
    name: string,
    isTopLevel: boolean,
    dependencyType: lernaUtils.ProjectGraphWorkspacePackageDependency['dependencyCollection'],
  }} Dependency
 */

/**
 *
 * @param {string} project
 * @param {lernaUtils.ProjectGraphWithPackages} projectGraph
 * @param {*} options
 * @param {Dependency[]} _acc
 * @param {boolean} _areTopLevelDeps
 * @returns {Dependency[]}
 */
function collectDependencies(
  project,
  projectGraph,
  options = {
    shallow: true,
    dependenciesOnly: false,
  },
  _acc = [],
  _areTopLevelDeps = true,
) {
  if (!projectGraph.localPackageDependencies[project]) {
    return _acc;
  }

  projectGraph.localPackageDependencies[project].forEach(dependency => {
    const isDependencyAlreadyCollected = _acc.some(dep => dep.name === dependency.target);

    if (isDependencyAlreadyCollected) {
      return;
    }

    if (
      options.dependenciesOnly &&
      dependency.dependencyCollection &&
      dependency.dependencyCollection !== 'dependencies'
    ) {
      return;
    }

    _acc.push({
      name: dependency.target,
      dependencyType: dependency.dependencyCollection,
      isTopLevel: _areTopLevelDeps,
    });

    if (!options.shallow) {
      collectDependencies(dependency.target, projectGraph, options, _acc, false);
    }
  });

  return _acc;
}

/**
 * Returns dependencies metadata build from dependency graph for provided package
 * @param {string} packageName - including `@fluentui/` prefix
 */
async function getDependencies(packageName) {
  const { projectGraph } = await lernaUtils.detectProjects();

  const allDepsGraph = collectDependencies(packageName, projectGraph, { shallow: false, dependenciesOnly: false });
  const depsGraph = collectDependencies(packageName, projectGraph, { shallow: false, dependenciesOnly: true });
  const devDepsGraph = allDepsGraph.filter(anyDep => !depsGraph.find(prodDep => prodDep.name === anyDep.name));

  return {
    dependencies: depsGraph,
    devDependencies: devDepsGraph,
    all: allDepsGraph,
    projectGraph,
  };
}

exports.getDependencies = getDependencies;
