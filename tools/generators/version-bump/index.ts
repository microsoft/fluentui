import { Tree, updateJson, getProjects, formatFiles, readJson } from '@nrwl/devkit';
import * as semver from 'semver';
import { VersionBumpGeneratorSchema } from './schema';
import { getProjectConfig, printUserLogs, UserLog } from '../../utils';
import { PackageJson } from '../../types';

export default async function (host: Tree, schema: VersionBumpGeneratorSchema) {
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
  let nextVersion = '';

  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    nextVersion = bumpVersion(packageJson, schema.bumpType, schema.prereleaseTag);
    packageJson.version = nextVersion;

    return packageJson;
  });

  if (nextVersion) {
    updatePackageDependents(host, nextVersion, schema.name, userLog);
  }
}

function updatePackageDependents(host: Tree, nextVersion: string, dependencyName: string, userLog: UserLog) {
  const projects = getProjects(host);

  projects.forEach((project, projectName) => {
    const projectConfig = getProjectConfig(host, { packageName: projectName });
    updatePackageDependent(host, nextVersion, dependencyName, projectConfig.paths.packageJson, userLog);
  });
}

function updatePackageDependent(
  host: Tree,
  nextVersion: string,
  dependencyName: string,
  packageJsonPath: string,
  userLog: UserLog,
) {
  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    if (packageJson.dependencies?.[dependencyName]) {
      userLog.push({
        type: 'info',
        message: `bumping dependendcy ${dependencyName} in ${packageJsonPath}`,
      });

      bumpDependency(packageJson.dependencies, dependencyName, nextVersion);
    }

    if (packageJson.devDependencies?.[dependencyName]) {
      userLog.push({
        type: 'info',
        message: `bumping devDependency ${dependencyName} in ${packageJsonPath}`,
      });
      bumpDependency(packageJson.devDependencies, dependencyName, nextVersion);
    }

    return packageJson;
  });
}

const bumpDependency = (
  dependencies: NonNullable<PackageJson['dependencies'] | PackageJson['devDependencies']>,
  dependencyName: string,
  version: string,
) => {
  const hasCaret = dependencies[dependencyName].includes('^');
  const versionToBump = hasCaret ? `^${version}` : version;
  dependencies[dependencyName] = versionToBump;
};

function runBatchMigration(host: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const projects = getProjects(host);

  projects.forEach((project, projectName) => {
    if (isPackageConverged(projectName, host)) {
      runMigrationOnProject(
        host,
        { name: projectName, all: false, bumpType: schema.bumpType, prereleaseTag: schema.prereleaseTag },
        userLog,
      );
    }
  });
}

function bumpVersion(packageJson: PackageJson, bumpType: ValidatedSchema['bumpType'], prereleaseTag?: string) {
  const semverVersion = semver.parse(packageJson.version);
  if (!semverVersion) {
    throw new Error(`Cannot parse version ${packageJson.version} of ${packageJson.name}`);
  }

  semverVersion.inc(bumpType, prereleaseTag);
  return semverVersion.version;
}

/**
 * @returns whether the package is converged
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

export const validbumpTypes = ['prerelease', 'major', 'premajor', 'minor', 'preminor', 'patch', 'prepatch'] as const;

interface ValidatedSchema extends Required<VersionBumpGeneratorSchema> {
  bumpType: typeof validbumpTypes[number];
}

function validateSchema(tree: Tree, schema: VersionBumpGeneratorSchema) {
  if ((schema.name && schema.all) || (!schema.name && !schema.all)) {
    throw new Error('--name and --all are mutually exclusive');
  }

  const validateBumpType = (type: string): type is ValidatedSchema['bumpType'] => {
    return validbumpTypes.includes(type as ValidatedSchema['bumpType']);
  };
  if (!validateBumpType(schema.bumpType)) {
    throw new Error(`${schema.bumpType} is not a valid bumpType, please use one of ${validbumpTypes}`);
  }

  if (schema.name) {
    if (!isPackageConverged(schema.name, tree)) {
      throw new Error(
        `${schema.name} is not converged package consumed by customers.
        Make sure to run the migration on packages with version 9.x.x and has the alpha tag`,
      );
    }
  }

  const validatedSchema: ValidatedSchema = {
    bumpType: schema.bumpType,
    prereleaseTag: schema.prereleaseTag ?? '',
    all: schema.all ?? false,
    name: schema.name ?? '',
  };

  return validatedSchema;
}
