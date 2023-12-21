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
  readProjectConfiguration,
} from '@nx/devkit';
import chalk from 'chalk';
import semver from 'semver';

import { NormalizePackageDependenciesGeneratorSchema } from './schema';
import { PackageJson } from '../../types';

type ProjectIssues = { [projectName: string]: { [depName: string]: string } };

const NORMALIZED_INNER_WORKSPACE_VERSION = '*';
const NORMALIZED_PRERELEASE_RANGE_VERSION = '>=9.0.0-alpha';
const NORMALIZED_COMPAT_PRERELEASE_RANGE_VERSION = '>=0.0.0-alpha';
const BEACHBALL_UNWANTED_PRERELEASE_RANGE_VERSION_REGEXP = /<9.0.0$/;

export default async function (tree: Tree, schema: NormalizePackageDependenciesGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, schema);

  const graph = await createProjectGraphAsync();

  const projects = getProjects(tree);
  const issues: ProjectIssues = {};

  projects.forEach(projectConfig => {
    if (normalizedOptions.verify) {
      const foundIssues = getPackageJsonDependenciesIssues(tree, projectConfig, graph);

      if (foundIssues) {
        issues[projectConfig.name!] = foundIssues;
      }
      return;
    }

    normalizePackageJsonDependencies(tree, projectConfig, graph);
  });

  reportPackageJsonDependenciesIssues(issues);

  await formatFiles(tree);
}

function normalizePackageJsonDependencies(tree: Tree, projectConfig: ProjectConfiguration, graph: ProjectGraph) {
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
        const { updated } = getVersion(tree, deps, packageName);
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
    `All these dependencies version should be specified as '${NORMALIZED_INNER_WORKSPACE_VERSION}' or '${NORMALIZED_PRERELEASE_RANGE_VERSION}' `,
  );
  logger.info(`Fix this by running 'nx g @fluentui/workspace-plugin:normalize-package-dependencies'`);

  throw new Error('package dependency violations found');
}

function getVersion(tree: Tree, deps: Record<string, string>, packageName: string) {
  const current = deps[packageName];
  const updated = getUpdatedVersion(current);

  const match = current === updated;

  return { updated, match };

  function getUpdatedVersion(currentVersion: string) {
    const isCompatPackage = packageName.endsWith('-compat');

    if (BEACHBALL_UNWANTED_PRERELEASE_RANGE_VERSION_REGEXP.test(current)) {
      return NORMALIZED_PRERELEASE_RANGE_VERSION;
    }

    const expectedVersion = isCompatPackage
      ? NORMALIZED_COMPAT_PRERELEASE_RANGE_VERSION
      : NORMALIZED_PRERELEASE_RANGE_VERSION;
    if (currentVersion === expectedVersion) {
      const prereleasePkg = readProjectConfiguration(tree, packageName);
      const prereleasePkgJson = readJson<PackageJson>(tree, joinPathFragments(prereleasePkg.root, 'package.json'));
      const isPrerelease = semver.prerelease(prereleasePkgJson.version) !== null;

      return isPrerelease ? expectedVersion : NORMALIZED_INNER_WORKSPACE_VERSION;
    }

    if (semver.prerelease(current)) {
      return NORMALIZED_PRERELEASE_RANGE_VERSION;
    }

    return NORMALIZED_INNER_WORKSPACE_VERSION;
  }
}

function getPackageJsonDependenciesIssues(
  tree: Tree,
  projectConfig: ProjectConfiguration,
  graph: ProjectGraph,
): Record<string, string> | null {
  const projectDependencies = getProjectDependenciesFromGraph(projectConfig.name!, graph);
  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json');
  const packageJson = readJson<PackageJson>(tree, packageJsonPath);

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
      const { match } = getVersion(tree, deps, packageName);

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
