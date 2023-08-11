import { Tree, updateJson, getProjects, formatFiles } from '@nx/devkit';
import semver from 'semver';
import { VersionBumpGeneratorSchema } from './schema';
import {
  getProjectConfig,
  packageJsonHasBeachballConfig,
  printUserLogs,
  UserLog,
  isPackageConverged,
} from '../../utils';
import { PackageJson } from '../../types';

export default async function (host: Tree, schema: VersionBumpGeneratorSchema) {
  const userLog: UserLog = [];
  const validatedSchema = validateSchema(host, schema);

  if (validatedSchema.all) {
    runBatchMigration(host, validatedSchema, userLog);
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
  let nextVersion = '';

  if (schema.exclude.includes(schema.name)) {
    userLog.push({ type: 'info', message: `excluding ${schema.name} from version bump` });
    return;
  }

  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    nextVersion = bumpVersion(packageJson, schema.bumpType, schema.prereleaseTag);

    // nightly releases should bypass beachball disallowed changetypes
    if (
      schema.bumpType === 'nightly' &&
      packageJsonHasBeachballConfig(packageJson) &&
      packageJson.beachball?.disallowedChangeTypes
    ) {
      packageJson.beachball.disallowedChangeTypes = undefined;
    }
    packageJson.version = nextVersion;

    return packageJson;
  });

  if (nextVersion) {
    updatePackageDependents({ host, nextVersion, userLog, schema });
  }
}

function updatePackageDependents(options: {
  host: Tree;
  nextVersion: string;
  userLog: UserLog;
  schema: ValidatedSchema;
}) {
  const { host, nextVersion, userLog, schema } = options;
  const projects = getProjects(host);

  projects.forEach((project, projectName) => {
    const projectConfig = getProjectConfig(host, { packageName: projectName });
    updatePackageDependent({
      host,
      nextVersion,
      dependencyName: schema.name,
      packageJsonPath: projectConfig.paths.packageJson,
      userLog,
      bumpType: schema.bumpType,
    });
  });
}

function updatePackageDependent(options: {
  host: Tree;
  nextVersion: string;
  dependencyName: string;
  packageJsonPath: string;
  userLog: UserLog;
  bumpType: ValidatedSchema['bumpType'];
}) {
  const { host, nextVersion, dependencyName, packageJsonPath, userLog, bumpType } = options;

  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    if (packageJson.dependencies?.[dependencyName]) {
      userLog.push({
        type: 'info',
        message: `bumping dependency ${dependencyName} in ${packageJsonPath}`,
      });

      bumpDependency({ dependencies: packageJson.dependencies, dependencyName, version: nextVersion, bumpType });
    }

    if (packageJson.devDependencies?.[dependencyName]) {
      userLog.push({
        type: 'info',
        message: `bumping devDependency ${dependencyName} in ${packageJsonPath}`,
      });
      bumpDependency({ dependencies: packageJson.devDependencies, dependencyName, version: nextVersion, bumpType });
    }

    return packageJson;
  });
}

const bumpDependency = (options: {
  dependencies: NonNullable<PackageJson['dependencies'] | PackageJson['devDependencies']>;
  dependencyName: string;
  version: string;
  bumpType: ValidatedSchema['bumpType'];
}) => {
  const { dependencies, dependencyName, version, bumpType } = options;

  const hasCaret = dependencies[dependencyName].includes('^');
  const versionToBump = hasCaret && bumpType !== 'nightly' ? `^${version}` : version;
  dependencies[dependencyName] = versionToBump;
};

function runBatchMigration(host: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const projects = getProjects(host);

  projects.forEach((project, projectName) => {
    if (isPackageConverged(host, project)) {
      runMigrationOnProject(
        host,
        {
          name: projectName,
          all: false,
          bumpType: schema.bumpType,
          prereleaseTag: schema.prereleaseTag,
          exclude: schema.exclude,
        },
        userLog,
      );
    }
  });
}

function bumpVersion(packageJson: PackageJson, bumpType: ValidatedSchema['bumpType'], prereleaseTag?: string) {
  if (bumpType === 'nightly') {
    // initialize the prerelease tag so that prerelease doesn't bump to 0.0.1
    packageJson.version = '0.0.0-empty';
  }

  const semverVersion = semver.parse(packageJson.version);
  if (!semverVersion) {
    throw new Error(`Cannot parse version ${packageJson.version} of ${packageJson.name}`);
  }

  if (bumpType === 'nightly') {
    semverVersion.inc('prerelease', prereleaseTag);
  } else {
    semverVersion.inc(bumpType, prereleaseTag);
  }

  return semverVersion.version;
}

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

export const validbumpTypes = [
  'prerelease',
  'major',
  'premajor',
  'minor',
  'preminor',
  'patch',
  'prepatch',
  'nightly',
] as const;

interface ValidatedSchema extends Required<Omit<VersionBumpGeneratorSchema, 'exclude'>> {
  bumpType: (typeof validbumpTypes)[number];

  exclude: string[];
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

  const validatedSchema: ValidatedSchema = {
    bumpType: schema.bumpType,
    prereleaseTag: schema.prereleaseTag ?? '',
    all: schema.all ?? false,
    name: schema.name ?? '',
    exclude: schema.exclude ? schema.exclude.split(',') : [],
  };

  return validatedSchema;
}
