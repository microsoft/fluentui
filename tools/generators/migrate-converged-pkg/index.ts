import { Tree, formatFiles, readProjectConfiguration, joinPathFragments, readJson, logger } from '@nrwl/devkit';

import { PackageJson, TsConfig } from '../../types';
import { arePromptsEnabled, getProjectConfig, getProjects, printUserLogs, prompt, UserLog } from '../../utils';

import { MigrateConvergedPkgGeneratorSchema } from './schema';
import { AssertedSchema, NormalizedSchema } from './types';
import {
  updateApiExtractorForLocalBuilds,
  updateBabel,
  updateBaseTsConfig,
  updateE2E,
  updateLocalJestConfig,
  updateLocalTsConfig,
  updateNpmIgnore,
  updateNpmScripts,
  updateNxWorkspace,
  updateRootJestConfig,
  updateStorybook,
} from './updaters';

interface ProjectConfiguration extends ReturnType<typeof readProjectConfiguration> {}

export default async function (tree: Tree, schema: MigrateConvergedPkgGeneratorSchema) {
  const userLog: UserLog = [];

  const validatedSchema = await validateSchema(tree, schema);

  if (hasSchemaFlag(validatedSchema, 'stats')) {
    printStats(tree, validatedSchema);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  if (hasSchemaFlag(validatedSchema, 'all')) {
    runBatchMigration(tree, userLog);
  } else if (hasSchemaFlag(validatedSchema, 'name')) {
    const projectNames = validatedSchema.name.split(',').filter(Boolean);

    if (projectNames.length > 1) {
      runBatchMigration(tree, userLog, projectNames);
    } else {
      runMigrationOnProject(tree, validatedSchema, userLog);
    }
  }

  await formatFiles(tree);

  return () => {
    printUserLogs(userLog);
  };
}

function runBatchMigration(tree: Tree, userLog: UserLog, projectNames?: string[]) {
  const projects = getProjects(tree, projectNames);

  projects.forEach((projectConfig, projectName) => {
    if (!isPackageConverged(tree, projectConfig)) {
      userLog.push({ type: 'error', message: `${projectName} is not converged package. Skipping migration...` });
      return;
    }

    runMigrationOnProject(tree, { name: projectName }, userLog);
  });
}

function runMigrationOnProject(tree: Tree, schema: AssertedSchema, userLog: UserLog) {
  const options = normalizeOptions(tree, schema);

  updateLocalTsConfig(tree, options);
  updateBaseTsConfig(tree, options);

  updateLocalJestConfig(tree, options);
  updateRootJestConfig(tree, options);

  updateNpmScripts(tree, options);
  updateApiExtractorForLocalBuilds(tree, options);

  updateStorybook(tree, options);

  updateE2E(tree, options);

  updateNpmIgnore(tree, options);
  updateBabel(tree, options);

  updateNxWorkspace(tree, options);
}

function normalizeOptions(host: Tree, options: AssertedSchema): NormalizedSchema {
  const defaults = {};
  const project = getProjectConfig(host, { packageName: options.name });

  return {
    ...defaults,
    ...options,
    ...project,
    normalizedPkgName: options.name.replace(`@${project.workspaceConfig.npmScope}/`, ''),
  };
}

/**
 *
 * Narrows down Schema definition to true runtime shape after {@link validateSchema} is executed
 * - also properly checks of truthiness of provided value
 */
function hasSchemaFlag<T extends MigrateConvergedPkgGeneratorSchema, K extends keyof T>(
  schema: T,
  flag: K,
): schema is T & Record<K, NonNullable<T[K]>> {
  return Boolean(schema[flag]);
}

async function validateSchema(tree: Tree, schema: MigrateConvergedPkgGeneratorSchema) {
  let newSchema = { ...schema };

  if (newSchema.name && newSchema.stats) {
    throw new Error('--name and --stats are mutually exclusive');
  }

  if (newSchema.name && newSchema.all) {
    throw new Error('--name and --all are mutually exclusive');
  }

  if (newSchema.stats && newSchema.all) {
    throw new Error('--stats and --all are mutually exclusive');
  }

  const shouldValidateNameInput = () => {
    return !newSchema.name && !(newSchema.all || newSchema.stats);
  };

  const shouldTriggerPrompt = arePromptsEnabled() && shouldValidateNameInput();

  if (shouldTriggerPrompt) {
    const schemaPromptsResponse = await triggerDynamicPrompts();

    newSchema = { ...newSchema, ...schemaPromptsResponse };
  }

  if (shouldValidateNameInput()) {
    throw new Error(`--name cannot be empty. Please provide name of the package.`);
  }

  if (newSchema.name) {
    const projectNames = newSchema.name.split(',').filter(Boolean);

    projectNames.forEach(projectName => {
      const projectConfig = readProjectConfiguration(tree, projectName);

      if (!isPackageConverged(tree, projectConfig)) {
        throw new Error(
          `${newSchema.name} is not converged package. Make sure to run the migration on packages with version 9.x.x`,
        );
      }
    });
  }

  return newSchema as AssertedSchema;
}

async function triggerDynamicPrompts() {
  type PromptResponse = Required<Pick<MigrateConvergedPkgGeneratorSchema, 'name'>>;

  return prompt<PromptResponse>([
    {
      message: 'Which converged package(s) would you like migrate to new DX? (ex: @fluentui/react-menu)',
      type: 'input',
      name: 'name',
    },
  ]);
}

function printStats(tree: Tree, options: MigrateConvergedPkgGeneratorSchema) {
  const allProjects = getProjects(tree);
  const stats = {
    migrated: [] as Array<ProjectConfiguration & { projectName: string }>,
    notMigrated: [] as Array<ProjectConfiguration & { projectName: string }>,
  };

  allProjects.forEach((project, projectName) => {
    if (!isPackageConverged(tree, project)) {
      return;
    }

    if (isProjectMigrated(tree, project)) {
      stats.migrated.push({ projectName, ...project });

      return;
    }
    stats.notMigrated.push({ projectName, ...project });
  });

  logger.info('Convergence DX migration stats:');
  logger.info('='.repeat(80));

  logger.info(`Migrated (${stats.migrated.length}):`);
  logger.info(stats.migrated.map(projectStat => `- ${projectStat.projectName}`).join('\n'));

  logger.info('='.repeat(80));
  logger.info(`Not migrated (${stats.notMigrated.length}):`);
  logger.info(stats.notMigrated.map(projectStat => `- ${projectStat.projectName}`).join('\n'));

  return tree;
}

function isPackageConverged(tree: Tree, project: ProjectConfiguration) {
  const packageJson = readJson<PackageJson>(tree, joinPathFragments(project.root, 'package.json'));
  return packageJson.version.startsWith('9.');
}

function isProjectMigrated<T extends ProjectConfiguration>(
  tree: Tree,
  project: T,
): project is T & Required<Pick<ProjectConfiguration, 'tags' | 'sourceRoot'>> {
  const hasTsSolutionConfigSetup = Array.isArray(
    readJson<TsConfig>(tree, joinPathFragments(project.root, 'tsconfig.json')).references,
  );
  // eslint-disable-next-line eqeqeq
  return project.sourceRoot != null && Boolean(project.tags?.includes('vNext')) && hasTsSolutionConfigSetup;
}
