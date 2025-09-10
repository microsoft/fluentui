const fs = require('node:fs');

const { createProjectGraphAsync, joinPathFragments, workspaceRoot } = require('@nx/devkit');

/**
 * @import { PackageJson } from './types';
 * @import { ProjectGraph } from '@nx/devkit';
 */

/**
* @typedef {{
    name: string,
    isTopLevel: boolean,
    dependencyType: 'dependencies' | 'devDependencies' | 'optionalDependencies' | null,
  }} Dependency
 */

/** @typedef {PackageJson & {absoluteRootPath:string}} PackageJsonInfoData */

/**
 * @type {Record<string,PackageJsonInfoData>}
 */
const packageJsonInfo = {};

/**
 *
 * @param {string} project
 * @param {ProjectGraph} projectGraph
 */
function getProjectPackageJsonInfo(project, projectGraph) {
  const normalizedProjectName = getNormalizedName(project);

  const cachedInfo = packageJsonInfo[normalizedProjectName];
  if (cachedInfo) {
    return cachedInfo;
  }

  const metadata = projectGraph.nodes[normalizedProjectName];

  const absoluteRootPath = joinPathFragments(workspaceRoot, metadata.data.root);
  const pkgJsonContent = fs.readFileSync(joinPathFragments(workspaceRoot, metadata.data.root, 'package.json'), 'utf-8');

  /** @type {PackageJsonInfoData} */
  const pkgJson = JSON.parse(pkgJsonContent);
  pkgJson.absoluteRootPath = absoluteRootPath;

  // store in cache
  packageJsonInfo[normalizedProjectName] = pkgJson;

  return pkgJson;
}

/**
 * Returns local dependencies of provided project. Local means dependency from within workspace
 * @param {string} project
 * @param {ProjectGraph} projectGraph
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
 * @param {PackageJson} json
 * @returns
 */
function getDepType(pkgName, json) {
  // need to check against real npmPackageName (including scope) - NOTE: once we move to dynamic project graph creation with nx this will no longer work - redo/simplify implementation
  const npmPackageName = `@fluentui/${pkgName}`;
  if (json.dependencies?.[npmPackageName]) {
    return 'dependencies';
  }
  if (json.devDependencies?.[npmPackageName]) {
    return 'devDependencies';
  }
  if (json.optionalDependencies?.[npmPackageName]) {
    return 'optionalDependencies';
  }
  return null;
}

/**
 *
 * @param {string} project
 * @param {ProjectGraph} projectGraph
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

  /** @type {Dependency[]} */
  const collectedDeps = [];

  localDeps.forEach(dependency => {
    const isDependencyAlreadyCollected = _acc.some(dep => dep.name === dependency.target);

    if (isDependencyAlreadyCollected) {
      return;
    }

    if (options.dependenciesOnly && dependency.dependencyType && dependency.dependencyType !== 'dependencies') {
      return;
    }

    collectedDeps.push({
      name: dependency.target,
      dependencyType: dependency.dependencyType,
      isTopLevel: _areTopLevelDeps,
    });
  });

  // update main dep stack with actual collected deps
  _acc.push(...collectedDeps);

  if (!options.shallow) {
    for (const collectedDep of collectedDeps) {
      collectDependencies(collectedDep.name, projectGraph, options, _acc, false);
    }
  }

  return _acc;
}

function getNormalizedName(/** @type {string} */ value) {
  return value.replace('@fluentui/', '');
}

/**
 * Returns dependencies metadata build from dependency graph for provided package
 * @param {string} packageName - workspace project name. you don't have to use `@fluentui/` scope prefix
 */
async function getDependencies(packageName) {
  const normalizedPackageName = getNormalizedName(packageName);
  const projectGraph = await createProjectGraphAsync();

  const allDepsGraph = collectDependencies(normalizedPackageName, projectGraph, {
    shallow: false,
    dependenciesOnly: false,
  });
  const depsGraph = collectDependencies(normalizedPackageName, projectGraph, {
    shallow: false,
    dependenciesOnly: true,
  });
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
