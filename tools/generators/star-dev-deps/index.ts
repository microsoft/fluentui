import { Tree, updateJson, getProjects, formatFiles, readWorkspaceConfiguration, readJson } from '@nrwl/devkit';
import { getProjectConfig, printUserLogs, UserLog } from '../../utils';
import { PackageJson } from '../../types';

export default async function (host: Tree) {
  const userLog: UserLog = [];

  runMigration(host, userLog);

  formatFiles(host);

  return () => {
    printUserLogs(userLog);
  };
}

function runMigrationOnProject(host: Tree, packageName: string, userLog: UserLog) {
  const projectConfig = getProjectConfig(host, { packageName });
  const packageJsonPath = projectConfig.paths.packageJson;

  updateJson(host, packageJsonPath, (packageJson: PackageJson) => {
    if (packageJson.devDependencies) {
      Object.keys(packageJson.devDependencies).forEach(dependency => {
        if (isPackageInMonorepo(dependency, host) && packageJson.devDependencies) {
          userLog.push({
            type: 'info',
            message: `Updating package ${packageName}`,
          });
          packageJson.devDependencies[dependency] = '*';
        }
      });
    }

    return packageJson;
  });
}

function runMigration(host: Tree, userLog: UserLog) {
  const projects = getProjects(host);

  projects.forEach((project, projectName) => {
    runMigrationOnProject(host, projectName, userLog);
  });
}

/**
 * @returns whether the packageName is internally in the monorepo
 */
function isPackageInMonorepo(packageName: string, host: Tree) {
  let config: ReturnType<typeof getProjectConfig>;
  try {
    config = getProjectConfig(host, { packageName });
  } catch (err) {
    if (!(err as Error).message.startsWith('Error: Cannot find configuration for')) {
      throw err;
    }

    return false;
  }

  return true;
}
