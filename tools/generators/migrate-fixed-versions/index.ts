import { Tree, updateJson, getProjects, formatFiles, readJson } from '@nx/devkit';
import { MigrateFixedVersionsGeneratorSchema } from './schema';
import { getProjectConfig, printUserLogs, UserLog } from '../../utils';
import { PackageJson } from '../../types';

export default async function (host: Tree, schema: MigrateFixedVersionsGeneratorSchema) {
  const userLog: UserLog = [];
  const validatedSchema = validateSchema(host, schema);

  if (validatedSchema.all) {
    runBatchMigration(host, userLog);
  } else {
    runMigrationOnProject(host, validatedSchema, userLog);
  }

  await formatFiles(host);

  return () => {
    printUserLogs(userLog);
  };
}

function runMigrationOnProject(host: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const options = normalizeOptions(host, schema);
  const packageJsonPath = options.paths.packageJson;

  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach(dependency => {
        if (isPackageConverged(dependency, host) && packageJson.dependencies) {
          userLog.push({
            type: 'info',
            message: `Updating package ${schema.name}`,
          });
          packageJson.dependencies[dependency] = packageJson.dependencies[dependency].replace('^', '');
        }
      });
    }

    if (packageJson.devDependencies) {
      Object.keys(packageJson.devDependencies).forEach(dependency => {
        if (isPackageConverged(dependency, host) && packageJson.devDependencies) {
          userLog.push({
            type: 'info',
            message: `Updating package ${schema.name}`,
          });
          packageJson.devDependencies[dependency] = packageJson.devDependencies[dependency].replace('^', '');
        }
      });
    }

    return packageJson;
  });
}

function runBatchMigration(host: Tree, userLog: UserLog) {
  const projects = getProjects(host);

  projects.forEach((project, projectName) => {
    runMigrationOnProject(host, { name: projectName, all: false }, userLog);
  });
}

/**
 * Helper function that assumes correct tags are set in the NX project
 * @returns whether the package name is a converged package
 */
function isPackageConverged(packageName: string, host: Tree) {
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
  return packageJson.version.startsWith('9.');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

type ValidatedSchema = Required<MigrateFixedVersionsGeneratorSchema>;

function validateSchema(tree: Tree, schema: MigrateFixedVersionsGeneratorSchema) {
  const newSchema = { ...schema };

  if ((newSchema.name && newSchema.all) || (!newSchema.name && !newSchema.all)) {
    throw new Error('--name and --all are mutually exclusive');
  }

  if (newSchema.name) {
    if (!isPackageConverged(newSchema.name, tree)) {
      throw new Error(
        `${newSchema.name} is not converged package consumed by customers.
        Make sure to run the migration on packages with version 9.x.x and has tag`,
      );
    }
  }

  return newSchema as ValidatedSchema;
}
