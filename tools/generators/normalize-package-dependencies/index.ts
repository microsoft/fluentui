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
} from '@nrwl/devkit';

import { NormalizePackageDependenciesGeneratorSchema } from './schema';
import { PackageJson } from '../../types';
import * as chalk from 'chalk';

type ProjectIssues = { [projectName: string]: { [depName: string]: string } };

type NormalizedSchema = ReturnType<typeof normalizeOptions>;

export default async function (tree: Tree, schema: NormalizePackageDependenciesGeneratorSchema) {
  const normalizedOptions = normalizeOptions(tree, schema);

  const graph = await createProjectGraphAsync();

  const filters = getActiveFilters(normalizedOptions);
  const projects = getProjects(tree);
  const issues: ProjectIssues = {};

  projects.forEach(projectConfig => {
    if (!shouldBeProjectProcessed(projectConfig, filters)) {
      return;
    }

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

function getActiveFilters(options: NormalizedSchema) {
  const active: Partial<
    Record<keyof Omit<NormalizedSchema, 'verify'>, (projectConfig: ProjectConfiguration) => boolean>
  > = {};

  if (options.projectType !== 'any') {
    active.projectType = (projectConfig: ProjectConfiguration) => {
      return projectConfig.projectType === options.projectType;
    };
  }
  if (options.tag) {
    active.tag = (projectConfig: ProjectConfiguration) => {
      return Array.isArray(projectConfig.tags) && projectConfig.tags.includes(options.tag!);
    };
  }

  const activeCount = Object.keys(active).length;

  return {
    hasActive: activeCount > 0,
    hasActiveMultiple: activeCount > 1,
    filters: active,
  };
}

function shouldBeProjectProcessed(projectConfig: ProjectConfiguration, filters: ReturnType<typeof getActiveFilters>) {
  const filterPredicates = Object.values(filters.filters);

  if (filters.hasActiveMultiple) {
    return filterPredicates.every(predicate => predicate(projectConfig));
  }

  if (filters.hasActive) {
    return filterPredicates.some(predicate => predicate(projectConfig));
  }

  return true;
}

function normalizePackageJsonDependencies(tree: Tree, projectConfig: ProjectConfiguration, graph: ProjectGraph) {
  const projectDependencies = getProjectDependenciesFromGraph(projectConfig.name!, graph);
  const packageJsonPath = joinPathFragments(projectConfig.root, 'package.json');

  updateJson(tree, packageJsonPath, json => {
    updateDepType(json, 'dependencies');
    updateDepType(json, 'devDependencies');
    updateDepType(json, 'peerDependencies');

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
        deps[packageName] = '*';
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
      logger.log(chalk.red(`  - ${dep}`));
    }
  });

  logger.info(`All these dependencies version should be specified as '*'`);
  logger.info(`Fix this by running 'nx workspace-generator normalize-package-dependencies'`);

  throw new Error('package dependency violations found');
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
  checkDepType(packageJson, 'dependencies');
  checkDepType(packageJson, 'devDependencies');
  checkDepType(packageJson, 'peerDependencies');

  return issues;

  function checkDepType(json: PackageJson, depType: 'dependencies' | 'devDependencies' | 'peerDependencies') {
    const deps = json[depType];
    if (!deps) {
      return null;
    }

    for (const packageName in deps) {
      if (isProjectDependencyAnWorkspaceProject(graph, packageName, projectDependencies) && deps[packageName] !== '*') {
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
  const options = { projectType: 'any', verify: false, ...schema } as const;

  return {
    ...options,
  };
}
