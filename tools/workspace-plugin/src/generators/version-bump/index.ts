import { Tree, updateJson, getProjects, formatFiles, joinPathFragments } from '@nx/devkit';
import semver from 'semver';
import { VersionBumpGeneratorSchema } from './schema';
import {
  getProjectConfig,
  packageJsonHasBeachballConfig,
  printUserLogs,
  UserLog,
  isPackageConverged,
  getNpmScope,
} from '../../utils';
import { PackageJson } from '../../types';

export default async function (tree: Tree, schema: VersionBumpGeneratorSchema) {
  const userLog: UserLog = [];
  const validatedSchema = validateSchema(tree, schema);

  if (validatedSchema.all) {
    runBatchMigration(tree, validatedSchema, userLog);
  } else {
    runMigrationOnProject(tree, validatedSchema, userLog);
  }

  await formatFiles(tree);

  return () => {
    printUserLogs(userLog);
  };
}

function runMigrationOnProject(tree: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const options = normalizeOptions(tree, schema);
  const packageJsonPath = options.paths.packageJson;
  let nextVersion = '';

  if (schema.exclude.includes(schema.name)) {
    userLog.push({ type: 'info', message: `excluding ${schema.name} from version bump` });
    return;
  }

  updateJson(tree, packageJsonPath, (packageJson: PackageJson) => {
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
    updatePackageDependents({ tree, nextVersion, userLog, schema });
  }
}

function updatePackageDependents(options: {
  tree: Tree;
  nextVersion: string;
  userLog: UserLog;
  schema: ValidatedSchema;
}) {
  const { tree, nextVersion, userLog, schema } = options;
  const npmScope = getNpmScope(tree);
  const projects = getProjects(tree);

  projects.forEach((project, projectName) => {
    const projectConfig = projects.get(projectName)!;

    updatePackageDependent({
      tree,
      nextVersion,
      dependencyName: `@${npmScope}/${schema.name}`,
      packageJsonPath: joinPathFragments(projectConfig?.root, 'package.json'),
      userLog,
      bumpType: schema.bumpType,
    });
  });
}

function updatePackageDependent(options: {
  tree: Tree;
  nextVersion: string;
  dependencyName: string;
  packageJsonPath: string;
  userLog: UserLog;
  bumpType: ValidatedSchema['bumpType'];
}) {
  const { tree, nextVersion, dependencyName, packageJsonPath, userLog, bumpType } = options;

  updateJson(tree, packageJsonPath, (packageJson: PackageJson) => {
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

function runBatchMigration(tree: Tree, schema: ValidatedSchema, userLog: UserLog) {
  const projects = getProjects(tree);

  projects.forEach((project, projectName) => {
    if (isPackageConverged(tree, project)) {
      runMigrationOnProject(
        tree,
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

function normalizeOptions(tree: Tree, options: ValidatedSchema) {
  const defaults = {};
  const project = getProjectConfig(tree, { packageName: options.name });

  return {
    ...defaults,
    ...options,
    ...project,
  };
}

export const validBumpTypes = [
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
  bumpType: (typeof validBumpTypes)[number];

  exclude: string[];
}

function validateSchema(tree: Tree, schema: VersionBumpGeneratorSchema) {
  if ((schema.name && schema.all) || (!schema.name && !schema.all)) {
    throw new Error('--name and --all are mutually exclusive');
  }

  const validateBumpType = (type: string): type is ValidatedSchema['bumpType'] => {
    return validBumpTypes.includes(type as ValidatedSchema['bumpType']);
  };
  if (!validateBumpType(schema.bumpType)) {
    throw new Error(`${schema.bumpType} is not a valid bumpType, please use one of ${validBumpTypes}`);
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
