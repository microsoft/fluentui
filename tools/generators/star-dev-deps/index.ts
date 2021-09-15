import { Tree, updateJson, getProjects, formatFiles, readJson, addDependenciesToPackageJson } from '@nrwl/devkit';
import { getProjectConfig, printUserLogs, UserLog } from '../../utils';
import { PackageJson } from '../../types';

const dependenciesUpdated = new Set<string>();

export default async function (host: Tree) {
  const userLog: UserLog = [];

  const { versionGroupDependencies, versionGroupPackages } = runMigration(host, userLog);
  updateVersionGroups(host, versionGroupPackages, versionGroupDependencies);

  formatFiles(host);

  return () => {
    printUserLogs(userLog);
  };
}

type SyncPack = {
  syncpack: {
    versionGroups: {
      packages: string[];
      dependencies: string[];
    }[];
  };
};

function updateVersionGroups(host: Tree, versionGroupPackages: string[], versionGroupDependencies: string[]) {
  const vNextVersionGroup = 'fluent-ui-vnext';
  updateJson(host, 'package.json', (packageJson: PackageJson & SyncPack) => {
    const existingVersionGroup = Object.values(packageJson.syncpack.versionGroups).find(versionGroup => {
      if (versionGroup.packages.includes(vNextVersionGroup)) {
        return true;
      }

      return false;
    });

    if (existingVersionGroup) {
      existingVersionGroup.dependencies = Array.from(versionGroupDependencies);
      existingVersionGroup.packages = [...Array.from(versionGroupPackages), vNextVersionGroup];
    } else {
      packageJson.syncpack.versionGroups.push({
        dependencies: Array.from(versionGroupDependencies),
        packages: [...Array.from(versionGroupPackages), vNextVersionGroup],
      });
    }

    return packageJson;
  });
}

function runMigrationOnProject(
  host: Tree,
  packageName: string,
  versionGroupDependencies: Set<string>,
  userLog: UserLog,
) {
  const projectConfig = getProjectConfig(host, { packageName });
  const packageJsonPath = projectConfig.paths.packageJson;

  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    if (packageJson.devDependencies) {
      Object.keys(packageJson.devDependencies).forEach(dependency => {
        if (shouldUseWildcardVersion(dependency, host) && packageJson.devDependencies) {
          userLog.push({
            type: 'info',
            message: `Updating dependency ${dependency} in package ${packageName}`,
          });
          packageJson.devDependencies[dependency] = '*';
          dependenciesUpdated.add(dependency);
          versionGroupDependencies.add(dependency);
        }
      });
    }

    return packageJson;
  });

  return Array.from(versionGroupDependencies);
}

function runMigration(host: Tree, userLog: UserLog) {
  const projects = getProjects(host);
  const versionGroupPackages = new Set<string>();
  const versionGroupDependencies = new Set<string>();

  projects.forEach((project, projectName) => {
    if (isPackageConverged(projectName, host)) {
      versionGroupPackages.add(projectName);
      runMigrationOnProject(host, projectName, versionGroupDependencies, userLog);
    }
  });

  return {
    versionGroupDependencies: Array.from(versionGroupDependencies),
    versionGroupPackages: Array.from(versionGroupPackages),
  };
}

function shouldUseWildcardVersion(packageName: string, host: Tree) {
  let config: ReturnType<typeof getProjectConfig>;
  try {
    config = getProjectConfig(host, { packageName });
  } catch (err) {
    if (!(err as Error).message.startsWith('Cannot find configuration for')) {
      throw err;
    }

    return false;
  }

  const pkgJson: PackageJson = readJson(host, config.paths.packageJson);
  return !pkgJson.private && !pkgJson.version.startsWith('9.');
}

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
