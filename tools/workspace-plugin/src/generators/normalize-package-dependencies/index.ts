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

type ProjectIssues = { [projectName: string]: { [depName: string]: string } };

const NORMALIZED_INNER_WORKSPACE_VERSION = '*';
const NORMALIZED_PRERELEASE_RANGE_VERSION_REGEXP = /^>=\d\.\d\.\d-alpha$/;
const BEACHBALL_UNWANTED_PRERELEASE_RANGE_VERSION_REGEXP = /\s<\d\.0\.0$/;

export default async function (tree: Tree, schema: NormalizePackageDependenciesGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, schema);

  const graph = await createProjectGraphAsync();

  const projects = getProjects(tree);
  const issues: ProjectIssues = {};

  projects.forEach(projectConfig => {
    if (normalizedOptions.verify) {
      const foundIssues = getPackageJsonDependenciesIssues(tree, { allProjects: projects, projectConfig, graph });

      if (foundIssues) {
        issues[projectConfig.name!] = foundIssues;
      }

      return;
    }

    normalizePackageJsonDependencies(tree, { allProjects: projects, projectConfig, graph });
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
  },
) {
  const { allProjects, graph, projectConfig } = options;
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

  function updateDepType(json: PackageJson, depType: 'dependencies' | 'devDependencies' | 'peerDependencies') {
    const deps = json[depType];
    if (!deps) {
      return;
    }

    for (const packageName in deps) {
      if (isProjectDependencyAnWorkspaceProject(graph, packageName, projectDependencies)) {
        const { updated } = getVersion(tree, { allProjects, deps, packageName });
        deps[packageName] = updated;
      }
    }
  }
}

function reportPackageJsonDependenciesIssues(issues: ProjectIssues) {
  const issueEntries = Object.entries(issues);

  if (issueEntries.length === 0) {
    return;
  }

  issueEntries.forEach(([projectName, dependencyIssues]) => {
    logger.log(chalk.bold(chalk.red(`${projectName} has following dependency version issues:`)));
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
    deps: Record<string, string>;
    packageName: string;
  },
) {
  const { allProjects, deps, packageName } = options;
  const current = deps[packageName];
  const updated = getUpdatedVersion(current);

  const match = current === updated;

  return { updated, match };

  function getUpdatedVersion(currentVersion: string) {
    if (BEACHBALL_UNWANTED_PRERELEASE_RANGE_VERSION_REGEXP.test(currentVersion)) {
      return transformVersionToPreReleaseWorkspaceRange(currentVersion);
    }

    if (NORMALIZED_PRERELEASE_RANGE_VERSION_REGEXP.test(currentVersion)) {
      const prereleasePkg = allProjects.get(packageName);
      if (!prereleasePkg) {
        throw new Error(`Package ${packageName} not found in the workspace`);
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
  },
): Record<string, string> | null {
  const { allProjects, projectConfig, graph } = options;
  const projectDependencies = getProjectDependenciesFromGraph(projectConfig.name!, graph);
  const packageJson = readJson<PackageJson>(tree, joinPathFragments(projectConfig.root, 'package.json'));

  let issues: Record<string, string> | null = null;
  checkDepType(packageJson, 'devDependencies');

  if (projectConfig.projectType === 'application') {
    checkDepType(packageJson, 'dependencies');
    checkDepType(packageJson, 'peerDependencies');
  }

  return issues;

  function checkDepType(json: PackageJson, depType: 'dependencies' | 'devDependencies' | 'peerDependencies') {
    const deps = json[depType];
    if (!deps) {
      return null;
    }

    // eslint-disable-next-line guard-for-in
    for (const packageName in deps) {
      const { match } = getVersion(tree, { allProjects, deps, packageName });

      if (isProjectDependencyAnWorkspaceProject(graph, packageName, projectDependencies) && !match) {
        issues = issues ?? {};
        issues[packageName] = deps[packageName];
      }
    }

    return issues;
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
