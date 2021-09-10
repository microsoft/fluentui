import { Tree, updateJson, getProjects, formatFiles, readJson } from '@nrwl/devkit';
import { VersionStringReplaceGeneratorSchema } from './schema';
import { getProjectConfig, printUserLogs, UserLog } from '../../utils';
import { PackageJson } from '../../types';
import { Schema } from '@nrwl/tao/src/shared/params';

export default async function (host: Tree, schema: VersionStringReplaceGeneratorSchema) {
  const userLog: UserLog = [];
  const validatedSchema = validateSchema(host, schema);

  if (validatedSchema.all) {
    runBatchMigration(host, validatedSchema, userLog);
  } else {
    runMigrationOnProject(host, validatedSchema, userLog);
  }

  formatFiles(host);

  return () => {
    printUserLogs(userLog);
  };
}

function runMigrationOnProject(host: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const options = normalizeOptions(host, schema);
  const packageJsonPath = options.paths.packageJson;

  if (schema.replace !== '' && (readJson(host, packageJsonPath) as PackageJson).version.includes(schema.replace)) {
    throw new Error(`package ${schema.name} already contains ${schema.replace} in its version`);
  }

  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    packageJson.version = packageJson.version.replace(schema.match, schema.replace);

    return packageJson;
  });

  updatePackageDependents(host, schema, userLog);
}

function updatePackageDependents(host: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const projects = getProjects(host);

  projects.forEach((project, projectName) => {
    const projectConfig = getProjectConfig(host, { packageName: projectName });
    updatePackageDependent(host, schema, projectConfig.paths.packageJson, userLog);
  });
}

function updatePackageDependent(host: Tree, schema: ValidatedSchema, packageJsonPath: string, userLog: UserLog) {
  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    if (packageJson.dependencies?.[schema.name]) {
      userLog.push({
        type: 'info',
        message: `bumping dependendcy ${schema.name} in ${packageJsonPath}`,
      });
      packageJson.dependencies[schema.name] = packageJson.dependencies[schema.name].replace(
        schema.match,
        schema.replace,
      );
    }

    if (packageJson.devDependencies?.[schema.name]) {
      userLog.push({
        type: 'info',
        message: `bumping devDependency ${schema.name} in ${packageJsonPath}`,
      });
      packageJson.devDependencies[schema.name] = packageJson.devDependencies[schema.name].replace(
        /alpha.\d+/,
        'beta.0',
      );
    }

    return packageJson;
  });
}

function runBatchMigration(host: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const projects = getProjects(host);

  projects.forEach((project, projectName) => {
    if (isPackageConverged(projectName, host, schema)) {
      runMigrationOnProject(
        host,
        { name: projectName, all: false, match: schema.match, replace: schema.replace },
        userLog,
      );
    }
  });
}

/**
 * @returns whether the package is converged
 */
function isPackageConverged(packageName: string, host: Tree, schema: Pick<ValidatedSchema, 'match'>) {
  let config: ReturnType<typeof getProjectConfig>;
  try {
    config = getProjectConfig(host, { packageName });
  } catch (err) {
    if (!(err as Error).message.startsWith('Cannot find configuration for')) {
      throw err;
    }

    return false;
  }

  const packageJson = readJson(host, config.paths.packageJson);
  return packageJson.version.startsWith('9.') && packageJson.version.match(schema.match) !== null;
}

type NormalizedSchema = ReturnType<typeof normalizeOptions>;

function normalizeOptions(host: Tree, options: ValidatedSchema) {
  const defaults = {};
  const project = getProjectConfig(host, { packageName: options.name });

  return {
    ...defaults,
    ...options,
    ...project,

    /**
     * package name without npmScope (@scopeName)
     */
    normalizedPkgName: options.name.replace(`@${project.workspaceConfig.npmScope}/`, ''),
  };
}

interface ValidatedSchema extends Required<Omit<VersionStringReplaceGeneratorSchema, 'match'>> {
  match: RegExp;
}

function validateSchema(tree: Tree, schema: VersionStringReplaceGeneratorSchema) {
  if ((schema.name && schema.all) || (!schema.name && !schema.all)) {
    throw new Error('--name and --all are mutually exclusive');
  }

  const matchRegex = new RegExp(schema.match);

  if (schema.name) {
    if (!isPackageConverged(schema.name, tree, { match: matchRegex })) {
      throw new Error(
        `${schema.name} is not converged package consumed by customers.
        Make sure to run the migration on packages with version 9.x.x and has the alpha tag`,
      );
    }
  }

  const validatedSchema: ValidatedSchema = {
    all: schema.all ?? false,
    name: schema.name ?? '',
    match: matchRegex,
    replace: schema.replace,
  };

  return validatedSchema;
}
