const fs = require('node:fs');

const { createProjectGraphAsync, joinPathFragments, workspaceRoot } = require('@nx/devkit');

/**
* @typedef {{
    name: string,
    isTopLevel: boolean,
    dependencyType: 'dependencies' | 'devDependencies' | 'optionalDependencies' | null,
  }} Dependency
 */

/** @typedef {import('./types').PackageJson & {absoluteRootPath:string}} PackageJsonInfoData */

/**
 * @type {Record<string,PackageJsonInfoData>}
 */
const packageJsonInfo = {};

/**
 *
 * @param {string} project
 * @param {import('@nx/devkit').ProjectGraph} projectGraph
 */
function getProjectPackageJsonInfo(project, projectGraph) {
  const cachedInfo = packageJsonInfo[project];
  if (cachedInfo) {
    return cachedInfo;
  }

  const metadata = projectGraph.nodes[project];
  const absoluteRootPath = joinPathFragments(workspaceRoot, metadata.data.root);
  const pkgJsonContent = fs.readFileSync(joinPathFragments(workspaceRoot, metadata.data.root, 'package.json'), 'utf-8');

  /** @type {PackageJsonInfoData} */
  const pkgJson = JSON.parse(pkgJsonContent);
  pkgJson.absoluteRootPath = absoluteRootPath;

  // store in cache
  packageJsonInfo[project] = pkgJson;

  return pkgJson;
}

/**
 * Returns local dependencies of provided project. Local means dependency from within workspace
 * @param {string} project
 * @param {import('@nx/devkit').ProjectGraph} projectGraph
 */
function getLocalDeps(project, projectGraph) {
  const deps = projectGraph.dependencies[project];
  const pkgJson = getProjectPackageJsonInfo(project, projectGraph);

  /**
   * @type {Array<{target:string;dependencyType:ReturnType<typeof getDepType>}>}
   */
  const localDeps = [];
  for (const dep of deps) {
    if (!dep.target.startsWith('npm:')) {
      const dependencyType = getDepType(dep.target, pkgJson);
      localDeps.push({ target: dep.target, dependencyType });
    }
  }

  if (localDeps.length > 0) {
    return localDeps;
  }

  return null;
}
/**
 *
 * @param {string} pkgName
 * @param {import('./types').PackageJson} json
 * @returns
 */
function getDepType(pkgName, json) {
  if (json.dependencies?.[pkgName]) {
    return 'dependencies';
  }
  if (json.devDependencies?.[pkgName]) {
    return 'devDependencies';
  }
  if (json.optionalDependencies?.[pkgName]) {
    return 'optionalDependencies';
  }
  return null;
}

/**
 *
 * @param {string} project
 * @param {import('@nx/devkit').ProjectGraph} projectGraph
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
  const localDeps = getLocalDeps(project, projectGraph);

  if (!localDeps) {
    return _acc;
  }

  localDeps.forEach(dependency => {
    const isDependencyAlreadyCollected = _acc.some(dep => dep.name === dependency.target);

    if (isDependencyAlreadyCollected) {
      return;
    }

    if (options.dependenciesOnly && dependency.dependencyType && dependency.dependencyType !== 'dependencies') {
      return;
    }

    _acc.push({
      name: dependency.target,
      dependencyType: dependency.dependencyType,
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
  const projectGraph = await createProjectGraphAsync();

  const allDepsGraph = collectDependencies(packageName, projectGraph, { shallow: false, dependenciesOnly: false });
  const depsGraph = collectDependencies(packageName, projectGraph, { shallow: false, dependenciesOnly: true });
  const devDepsGraph = allDepsGraph.filter(anyDep => !depsGraph.find(prodDep => prodDep.name === anyDep.name));

  return {
    dependencies: depsGraph,
    devDependencies: devDepsGraph,
    all: allDepsGraph,
    projectGraph,
    getProjectPackageJsonInfo,
  };
}

exports.getDependencies = getDependencies;
