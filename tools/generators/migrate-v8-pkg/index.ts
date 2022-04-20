import * as path from 'path';
import type { Linter } from 'eslint';
import {
  logger,
  Tree,
  formatFiles,
  names,
  readProjectConfiguration,
  readJson,
  joinPathFragments,
  ProjectConfiguration,
} from '@nrwl/devkit';
import { fileExists } from '@nrwl/tao/src/utils/app-root';

import { getProjectConfig, getProjects } from '../../utils';

import { MigrateV8PkgGeneratorSchema } from './schema';
import { PackageJson, TsConfig } from '../../types';
import { getCjsConfigObjectAst, getASTconfigObjectProp } from './lib/utils';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}
interface AssertedSchema extends MigrateV8PkgGeneratorSchema {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export default async function (tree: Tree, schema: MigrateV8PkgGeneratorSchema) {
  const validatedSchema = await validateSchema(tree, schema);

  if (hasSchemaFlag(validatedSchema, 'stats')) {
    printStats(tree, validatedSchema);

    return noop;
  }

  if (hasSchemaFlag(validatedSchema, 'name')) {
    console.log('THIS ISNT DOING ANYTHING YET, use --stats 🤝');
    const normalizedOptions = normalizeOptions(tree, validatedSchema);
  }

  await formatFiles(tree);

  return noop;
}

function normalizeOptions(tree: Tree, options: AssertedSchema) {
  const project = getProjectConfig(tree, { packageName: options.name });

  return {
    ...options,
    ...project,
    ...names(options.name),
  };
}

/**
 *
 * Narrows down Schema definition to true runtime shape after {@link validateSchema} is executed
 * - also properly checks the truthiness of the provided value
 */
function hasSchemaFlag<T extends MigrateV8PkgGeneratorSchema, K extends keyof T>(
  schema: T,
  flag: K,
): schema is T & Record<K, NonNullable<T[K]>> {
  return Boolean(schema[flag]);
}
async function validateSchema(tree: Tree, schema: MigrateV8PkgGeneratorSchema) {
  const newSchema = { ...schema };

  if (newSchema.name && newSchema.stats) {
    throw new Error('--name and --stats are mutually exclusive');
  }

  const shouldValidateNameInput = () => {
    return !newSchema.name && !newSchema.stats;
  };

  if (shouldValidateNameInput()) {
    throw new Error(`--name cannot be empty. Please provide name of the package.`);
  }

  if (newSchema.name) {
    const projectNames = newSchema.name.split(',').filter(Boolean);

    projectNames.forEach(projectName => {
      const projectConfig = readProjectConfiguration(tree, projectName);

      if (!isPackageV8(tree, projectConfig)) {
        throw new Error(
          `${newSchema.name} is not v8 package. Make sure to run the migration on packages with version 8.x.x`,
        );
      }
    });
  }

  return newSchema;
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
  return {
    packageJson: readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json')),
    eslintConfig: getEslint(),
  };

  function getEslint() {
    const paths = {
      json: joinPathFragments(project.root, '.eslintrc.json'),
      js: joinPathFragments(project.root, '.eslintrc.js'),
    };

    if (tree.exists(paths.json)) {
      const eslintConfig: Linter.Config = readJson<Record<string, unknown>>(tree, paths.json);
      return eslintConfig;
    }

    if (tree.exists(paths.js)) {
      const eslintConfigAST = getCjsConfigObjectAst(tree.read(paths.js, 'utf8') as string);
      const extendsFieldValue = getASTconfigObjectProp(eslintConfigAST, 'extends');

      const eslintConfig: Linter.Config = { extends: extendsFieldValue };

      return eslintConfig;
    }
  }
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

  function createProjectInfoMessage(projectStat: ProjectStats) {
    return `- ${projectStat.projectName} | lint:${projectStat.metadata.eslintConfig?.extends}`;
  }

  logger.info('V8 DX migration stats:');
  logger.info('='.repeat(80));

  logger.info(`Migrated (${stats.migrated.length}):`);
  logger.info(stats.migrated.map(createProjectInfoMessage).join('\n'));

  logger.info('='.repeat(80));
  logger.info(`Not migrated (${stats.notMigrated.length}):`);
  logger.info(stats.notMigrated.map(createProjectInfoMessage).join('\n'));

  return tree;
}
