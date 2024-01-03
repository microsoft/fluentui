import { Tree, updateJson, getProjects, formatFiles } from '@nx/devkit';
import semver from 'semver';
import { VersionBumpGeneratorSchema } from './schema';
import { getProjectConfig, isPackageVersionConverged, printUserLogs, UserLog } from '../../utils';
import { PackageJson } from '../../types';

export default async function (host: Tree, schema: VersionBumpGeneratorSchema) {
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

function runMigrationOnProject(tree: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const options = normalizeOptions(tree, schema);
  const packageJsonPath = options.paths.packageJson;
  userLog.push({ type: 'info', message: `Converting ${options.name} v9 RC dependencies to carets` });

  updateJson(tree, packageJsonPath, (packageJson: PackageJson) => {
    if (!packageJson.dependencies) {
      userLog.push({ type: 'info', message: `${options.name} has no dependencies` });
      return packageJson;
    }

    function convertDependenciesToCaret(dependencies: Record<string, string>) {
      Object.entries(dependencies).forEach(([dependency, dependencyRange]) => {
        const range = semver.validRange(dependencyRange);
        const minVersion = semver.minVersion(dependencyRange);

        if (!minVersion) {
          throw new Error(`${dependency} range ${dependencyRange} cannot be parsed to a min version`);
        }

        if (
          !isPackageVersionConverged(minVersion.raw) ||
          minVersion.prerelease[0] !== 'rc' ||
          range !== minVersion.raw
        ) {
          return;
        }

        dependencies[dependency] = `^${minVersion}`;
      });
    }

    if (packageJson.dependencies) {
      convertDependenciesToCaret(packageJson.dependencies);
    }

    if (packageJson.devDependencies) {
      convertDependenciesToCaret(packageJson.devDependencies);
    }

    return packageJson;
  });
}

function runBatchMigration(tree: Tree, userLog: UserLog) {
  const projects = getProjects(tree);

  projects.forEach((project, projectName) => {
    runMigrationOnProject(
      tree,
      {
        name: projectName,
        all: false,
      },
      userLog,
    );
  });
}

function normalizeOptions(tree: Tree, options: ValidatedSchema) {
  const defaults = {};
  const project = getProjectConfig(tree, { packageName: options.name });

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

interface ValidatedSchema extends Required<Omit<VersionBumpGeneratorSchema, 'exclude'>> {}

function validateSchema(tree: Tree, schema: VersionBumpGeneratorSchema) {
  if ((schema.name && schema.all) || (!schema.name && !schema.all)) {
    throw new Error('--name and --all are mutually exclusive');
  }

  if (schema.name) {
    const project = getProjects(tree).get(schema.name);
    if (!project) {
      throw new Error(`${schema.name} does not exist in the workspace.`);
    }
  }

  const validatedSchema: ValidatedSchema = {
    all: schema.all ?? false,
    name: schema.name ?? '',
  };

  return validatedSchema;
}
