import * as path from 'path';
import * as fs from 'fs';
import type { Linter } from 'eslint';
import {
  logger,
  Tree,
  formatFiles,
  installPackagesTask,
  names,
  generateFiles,
  readProjectConfiguration,
  readJson,
  joinPathFragments,
} from '@nrwl/devkit';
import { appRootPath, fileExists } from '@nrwl/tao/src/utils/app-root';

import { getProjectConfig, getProjects } from '../../utils';

import { MigrateV8PkgGeneratorSchema } from './schema';
import { PackageJson, TsConfig } from '../../types';

interface ProjectConfiguration extends ReturnType<typeof readProjectConfiguration> {}
interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}

export default async function (tree: Tree, schema: MigrateV8PkgGeneratorSchema) {
  if (schema.stats) {
    printStats(tree, schema);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  const normalizedOptions = normalizeOptions(tree, schema);

  addFiles(tree, normalizedOptions);

  await formatFiles(tree);

  return () => {
    installPackagesTask(tree);
  };
}

function normalizeOptions(tree: Tree, options: MigrateV8PkgGeneratorSchema) {
  const project = getProjectConfig(tree, { packageName: options.name });

  return {
    ...options,
    ...project,
    ...names(options.name),
  };
}

/**
 * NOTE: remove this if your generator doesn't process any static/dynamic templates
 */
function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    tmpl: '',
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    path.join(options.projectConfig.root, options.name),
    templateOptions,
  );
}

function isPackageV8(tree: Tree, project: ProjectConfiguration) {
  const packageJson = readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'));
  return packageJson.version.startsWith('8.');
}

function isProjectMigrated<T extends ProjectConfiguration>(
  tree: Tree,
  project: T,
): project is T & Required<Pick<ProjectConfiguration, 'tags' | 'sourceRoot'>> {
  const hasTsSolutionConfigSetup = Array.isArray(
    readJson<TsConfig>(tree, joinPathFragments(project.root, 'tsconfig.json')).references,
  );
  // eslint-disable-next-line eqeqeq
  return project.sourceRoot != null && Boolean(project.tags?.includes('v8')) && hasTsSolutionConfigSetup;
}

function getProjectMetadata(tree: Tree, project: ProjectConfiguration) {
  let eslintConfig: Linter.Config = {};
  if (fileExists(joinPathFragments(project.root, '.eslintrc.json'))) {
    eslintConfig = readJson<Record<string, unknown>>(tree, joinPathFragments(project.root, '.eslintrc.json'));
  } else if (fileExists(joinPathFragments(project.root, '.eslintrc.js'))) {
    eslintConfig = require(joinPathFragments(appRootPath, project.root, '.eslintrc.js'));
  }

  return {
    packageJson: readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json')),
    eslintConfig: eslintConfig,
  };
}

function printStats(tree: Tree, options: MigrateV8PkgGeneratorSchema) {
  type ProjectStats = ProjectConfiguration & {
    projectName: string;
    metadata: ReturnType<typeof getProjectMetadata>;
  };
  const allProjects = getProjects(tree);
  const stats = {
    migrated: [] as Array<ProjectStats>,
    notMigrated: [] as Array<ProjectStats>,
  };

  allProjects.forEach((project, projectName) => {
    if (!isPackageV8(tree, project)) {
      return;
    }

    const metadata = getProjectMetadata(tree, project);

    if (isProjectMigrated(tree, project)) {
      stats.migrated.push({ projectName, metadata, ...project });

      return;
    }
    stats.notMigrated.push({ projectName, metadata, ...project });
  });

  function printProjectInfo(projectStat: ProjectStats) {
    return `- ${projectStat.projectName} | ${projectStat.metadata.eslintConfig.extends}`;
  }

  logger.info('Convergence DX migration stats:');
  logger.info('='.repeat(80));

  logger.info(`Migrated (${stats.migrated.length}):`);
  logger.info(stats.migrated.map(printProjectInfo).join('\n'));

  logger.info('='.repeat(80));
  logger.info(`Not migrated (${stats.notMigrated.length}):`);
  logger.info(stats.notMigrated.map(printProjectInfo).join('\n'));

  return tree;
}
