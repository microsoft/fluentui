import {
  Tree,
  formatFiles,
  getProjects,
  ProjectConfiguration,
  updateJson,
  joinPathFragments,
  readJson,
  logger,
  createProjectGraphAsync,
  ProjectGraph,
} from '@nx/devkit';
import chalk from 'chalk';
import semver from 'semver';

import { NormalizePackageDependenciesGeneratorSchema } from './schema';
import { PackageJson } from '../../types';
import { getNpmScope } from '../../utils';

type ProjectIssues = { [projectName: string]: { [depName: string]: string } };

const NORMALIZED_INNER_WORKSPACE_VERSION = '*';
const NORMALIZED_PRERELEASE_RANGE_VERSION_REGEXP = /^>=\d\.\d\.\d-alpha$/;
const BEACHBALL_UNWANTED_PRERELEASE_RANGE_VERSION_REGEXP = /\s<\d\.0\.0$/;

export default async function (tree: Tree, schema: NormalizePackageDependenciesGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, schema);

  const graph = await createProjectGraphAsync();

  const npmScope = getNpmScope(tree);
  const projects = getProjects(tree);
  const issues: ProjectIssues = {};

  projects.forEach(projectConfig => {
    if (normalizedOptions.verify) {
      const foundIssues = getPackageJsonDependenciesIssues(tree, {
        allProjects: projects,
        projectConfig,
        graph,
        npmScope,
      });

      if (foundIssues) {
        issues[projectConfig.name!] = foundIssues;
      }

      return;
    }

    normalizePackageJsonDependencies(tree, { allProjects: projects, projectConfig, graph, npmScope });
  });

  reportPackageJsonDependenciesIssues(issues);

  await formatFiles(tree);
}

function normalizePackageJsonDependencies(
  tree: Tree,
  options: {
    allProjects: ReturnType<typeof getProjects>;
    projectConfig: ProjectConfiguration;
    graph: ProjectGraph;
    npmScope: string;
  },
) {
  const { allProjects, graph, projectConfig, npmScope } = options;
  const projectDependencies = getProjectDependenciesFromGraph(projectConfig.name!, graph);
  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json');

  updateJson(tree, packageJsonPath, json => {
    updateDepType(json, 'devDependencies');

    if (projectConfig.projectType === 'application') {
      updateDepType(json, 'dependencies');
      updateDepType(json, 'peerDependencies');
    }

    return json;
  });

  return tree;

  function updateDepType(json: PackageJson, depType: DepType) {
    processDepType(json, depType, npmScope, (deps, npmPackageName, projectName) => {
      if (isProjectDependencyAnWorkspaceProject(graph, projectName, projectDependencies)) {
        const { updated } = getVersion(tree, {
          allProjects,
          deps,
          npmPackageName,
          projectName,
        });

        deps[npmPackageName] = updated;
      }
    });
  }
}

function reportPackageJsonDependenciesIssues(issues: ProjectIssues) {
  const issueEntries = Object.entries(issues);

  if (issueEntries.length === 0) {
    return;
  }

  issueEntries.forEach(([projectName, dependencyIssues]) => {
    logger.log(chalk.red(`[${chalk.bold(projectName)}] project has following dependency version issues:`));
    // eslint-disable-next-line guard-for-in
    for (const dep in dependencyIssues) {
      logger.log(chalk.red(`  - ${dep}@${dependencyIssues[dep]}`));
    }
    logger.log('');
  });

  logger.info(
    `All these dependencies version should be specified as '${NORMALIZED_INNER_WORKSPACE_VERSION}' or '>={MAJOR}.0.0-alpha' (NOTE: 'MAJOR' equals to specified package major version)`,
  );
  logger.info(`🛠️ FIX: run 'nx g @fluentui/workspace-plugin:normalize-package-dependencies'`);

  throw new Error('package dependency violations found');
}

function getVersion(
  tree: Tree,
  options: {
    allProjects: ReturnType<typeof getProjects>;
    /**
     * dependencies from package.json -> including npm scope
     */
    deps: Record<string, string>;
    /**
     * name from package.json - must contain npm scope
     */
    npmPackageName: string;
    /**
     * project name - doesn't contain npm scope
     */
    projectName: string;
  },
) {
  const { allProjects, deps, npmPackageName, projectName } = options;
  const current = deps[npmPackageName];
  const updated = getUpdatedVersion(current);

  const match = current === updated;

  return { updated, match };

  function getUpdatedVersion(currentVersion: string) {
    if (BEACHBALL_UNWANTED_PRERELEASE_RANGE_VERSION_REGEXP.test(currentVersion)) {
      return transformVersionToPreReleaseWorkspaceRange(currentVersion);
    }

    if (NORMALIZED_PRERELEASE_RANGE_VERSION_REGEXP.test(currentVersion)) {
      const prereleasePkg = allProjects.get(projectName);
      if (!prereleasePkg) {
        throw new Error(`Package ${projectName} not found in the workspace`);
      }
      const prereleasePkgJson = readJson<PackageJson>(tree, joinPathFragments(prereleasePkg.root, 'package.json'));
      const isPrerelease = semver.prerelease(prereleasePkgJson.version) !== null;

      return isPrerelease
        ? transformVersionToPreReleaseWorkspaceRange(currentVersion)
        : NORMALIZED_INNER_WORKSPACE_VERSION;
    }

    if (semver.prerelease(currentVersion)) {
      return transformVersionToPreReleaseWorkspaceRange(currentVersion);
    }

    return NORMALIZED_INNER_WORKSPACE_VERSION;
  }
}

function getPackageJsonDependenciesIssues(
  tree: Tree,
  options: {
    allProjects: ReturnType<typeof getProjects>;
    projectConfig: ProjectConfiguration;
    graph: ProjectGraph;
    npmScope: string;
  },
): Record<string, string> | null {
  const { allProjects, projectConfig, graph, npmScope } = options;
  const projectDependencies = getProjectDependenciesFromGraph(projectConfig.name!, graph);
  const packageJson = readJson<PackageJson>(tree, joinPathFragments(projectConfig.root, 'package.json'));

  let issues: Record<string, string> | null = null;

  checkDepType(packageJson, 'devDependencies');

  if (projectConfig.projectType === 'application') {
    checkDepType(packageJson, 'dependencies');
    checkDepType(packageJson, 'peerDependencies');
  }

  return issues;

  function checkDepType(json: PackageJson, depType: DepType) {
    processDepType(json, depType, npmScope, (deps, npmPackageName, projectName) => {
      const { match } = getVersion(tree, {
        allProjects,
        deps,
        npmPackageName,
        projectName,
      });

      if (isProjectDependencyAnWorkspaceProject(graph, projectName, projectDependencies) && !match) {
        issues = issues ?? {};
        issues[npmPackageName] = deps[npmPackageName];
      }
    });
  }
}

type DepType = 'dependencies' | 'devDependencies' | 'peerDependencies';
type Callback = (
  /** package.json dependencies - names include npm scope */
  deps: Record<string, string>,
  /** npm valid package name - can include npm scope */
  npmPackageName: string,
  /** workspace project name - wont include npm scope */
  projectName: string,
) => void;

function processDepType(json: PackageJson, depType: DepType, npmScope: string, callback: Callback) {
  const deps = json[depType];

  if (!deps) {
    return;
  }

  const npmScopeToCheck = `@${npmScope}/`;

  for (const npmPackageName in deps) {
    if (!npmPackageName.startsWith(npmScopeToCheck)) {
      continue;
    }

    const projectName = npmPackageName.replace(npmScopeToCheck, '');

    callback(deps, npmPackageName, projectName);
  }
}

function getProjectDependenciesFromGraph(projectName: string, graph: ProjectGraph): string[] {
  const projectDeps = graph.dependencies[projectName];
  return projectDeps.map(value => value.target);
}

function isProjectDependencyAnWorkspaceProject(
  graph: ProjectGraph,
  dependencyName: string,
  projectDependenciesFromGraph: string[],
) {
  const projectDeps = graph.dependencies[dependencyName];

  if (!projectDeps) {
    return false;
  }

  return projectDependenciesFromGraph.indexOf(dependencyName) !== -1;
}

function normalizeOptions(tree: Tree, schema: NormalizePackageDependenciesGeneratorSchema) {
  const options = { verify: false, ...schema } as const;

  return {
    ...options,
  };
}

function transformVersionToPreReleaseWorkspaceRange(version: string) {
  const coercedVersion = semver.coerce(version);

  if (!coercedVersion) {
    throw new Error(`Invalid version: ${version}`);
  }

  return `>=${coercedVersion.major}.${coercedVersion.minor}.${coercedVersion.patch}-alpha`;
}
