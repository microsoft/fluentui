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
  stripIndents,
  updateProjectConfiguration,
  writeJson,
} from '@nx/devkit';

import { printStats } from '../print-stats';

import { getProjectConfig, getProjects, isV8Package, printUserLogs, UserLog } from '../../utils';

import { MigrateV8PkgGeneratorSchema } from './schema';
import { PackageJson, TsConfig } from '../../types';
import { getCjsConfigObjectAst, getASTconfigObjectProp } from './lib/utils';

interface NormalizedSchema extends ReturnType<typeof normalizeOptions> {}
interface AssertedSchema extends MigrateV8PkgGeneratorSchema {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

interface ExtendedProjectConfiguration extends ProjectConfiguration {
  metadata: ReturnType<typeof getProjectMetadata> & ProjectConfiguration['metadata'];
}

export default async function (tree: Tree, schema: MigrateV8PkgGeneratorSchema) {
  const userLog: UserLog = [];
  const validatedSchema = await validateSchema(tree, schema);

  if (hasSchemaFlag(validatedSchema, 'stats')) {
    const allProjects = new Map<string, ExtendedProjectConfiguration>(
      Array.from(getProjects(tree).entries()).map(([projectName, project]) => {
        const metadata = getProjectMetadata(tree, project);
        const extendedProject = { ...project, metadata };
        return [projectName, extendedProject] as const;
      }),
    );

    printStats<ExtendedProjectConfiguration>(tree, {
      title: 'V8 DX',
      projects: allProjects,
      shouldProcessPackage: isV8Package,
      isMigratedCheck: isProjectMigrated,
      projectInfoFormat: data => {
        return `- ${data.projectName} | lint:${data.metadata.eslintConfig?.extends}`;
      },
    });

    return noop;
  }

  if (hasSchemaFlag(validatedSchema, 'all')) {
    runBatchMigration(tree, userLog);
  }

  if (hasSchemaFlag(validatedSchema, 'name')) {
    runMigrationOnProject(tree, validatedSchema);
  }

  await formatFiles(tree);

  return () => {
    printUserLogs(userLog);
  };
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

  if (newSchema.name && newSchema.all) {
    throw new Error('--name and --all are mutually exclusive');
  }

  if (newSchema.stats && newSchema.all) {
    throw new Error('--stats and --all are mutually exclusive');
  }

  const shouldValidateNameInput = () => {
    return !newSchema.name && !(newSchema.all || newSchema.stats);
  };

  if (shouldValidateNameInput()) {
    throw new Error(`--name cannot be empty. Please provide name of the package.`);
  }

  if (newSchema.name) {
    const projectNames = newSchema.name.split(',').filter(Boolean);

    projectNames.forEach(projectName => {
      const projectConfig = readProjectConfiguration(tree, projectName);

      if (!isV8Package(tree, projectConfig)) {
        throw new Error(
          `${newSchema.name} is not v8 package. Make sure to run the migration on packages with version 8.x.x`,
        );
      }
    });
  }

  return newSchema;
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

function runBatchMigration(tree: Tree, userLog: UserLog) {
  const projects = getProjects(tree);
  projects.forEach((projectConfig, projectName) => {
    if (!isV8Package(tree, projectConfig)) {
      userLog.push({ type: 'error', message: `${projectName} is not v8 package. Skipping migration...` });
      return;
    }

    runMigrationOnProject(tree, { name: projectName });
  });

  return tree;
}

function runMigrationOnProject(tree: Tree, schema: AssertedSchema) {
  const options = normalizeOptions(tree, schema);

  if (options.projectConfig.projectType === 'application') {
    logger.warn(
      stripIndents`
      NOTE: you're trying to migrate an Application - ${options.name}.
      We apply limited migration steps at the moment.
      `,
    );
    return;
  }

  // updates start

  updatePackageJson(tree, options);
  updateNxProject(tree, options);

  return tree;
}

function updatePackageJson(tree: Tree, options: NormalizedSchema) {
  let packageJson = readJson(tree, options.paths.packageJson);

  packageJson = setupNpmPublishFiles(packageJson);

  writeJson(tree, options.paths.packageJson, packageJson);

  function setupNpmPublishFiles(json: PackageJson) {
    json.files = json.files ?? [];
    json.files = ['lib', 'lib-commonjs', 'lib-amd', 'dist'];

    tree.delete(options.paths.npmConfig);

    return json;
  }
}

function updateNxProject(tree: Tree, options: NormalizedSchema) {
  updateProjectConfiguration(tree, options.name, {
    ...options.projectConfig,
    sourceRoot: joinPathFragments(options.projectConfig.root, 'src'),
    tags: uniqueArray([...(options.projectConfig.tags ?? []), 'v8']),
    implicitDependencies: uniqueArray([...(options.projectConfig.implicitDependencies ?? [])]),
  });

  return tree;
}

const _templates = {};

function uniqueArray<T extends unknown>(value: T[]) {
  return Array.from(new Set(value));
}
