import * as semver from 'semver';
import { Tree, formatFiles, updateJson, readJson, readProjectConfiguration } from '@nrwl/devkit';

import { getProjectConfig, getProjects, isPackageVersionPrerelease } from '../../utils';
import { PackageJson } from '../../types';

export default async function (tree: Tree) {
  const projects = getProjects(tree);

  projects.forEach((_project, projectName) => {
    const config = getProjectConfig(tree, { packageName: projectName });

    const { tags = [] } = readProjectConfiguration(tree, projectName);
    // Ignore northstar packages
    if (tags.includes('react-northstar')) {
      return;
    }

    updateJson(tree, config.paths.packageJson, (packageJson: PackageJson) => {
      if (packageJson.dependencies) {
        packageJson.dependencies = getUpdatedDependencies(tree, packageJson.dependencies);
      }

      if (packageJson.devDependencies) {
        packageJson.devDependencies = getUpdatedDependencies(tree, packageJson.devDependencies);
      }

      if (packageJson.peerDependencies) {
        packageJson.peerDependencies = getUpdatedDependencies(tree, packageJson.peerDependencies);
      }

      return packageJson;
    });
  });

  await formatFiles(tree);
}

function isProjectInWorkspace(tree: Tree, projectName: string) {
  try {
    readProjectConfiguration(tree, projectName);

    return true;
  } catch (err: unknown) {
    return false;
  }
}

function getUpdatedDependencies(tree: Tree, dependencies: Record<string, string>) {
  return Object.entries(dependencies).reduce((acc, [dependencyName, versionRange]) => {
    if (versionRange === '*') {
      return acc;
    }

    if (!isProjectInWorkspace(tree, dependencyName)) {
      return acc;
    }

    const minVersion = semver.minVersion(versionRange);

    if (!minVersion) {
      return acc;
    }

    const shouldHaveCaret = !isPackageVersionPrerelease(minVersion.raw) || versionRange[0] === '^';

    const depPackageConfig = getProjectConfig(tree, { packageName: dependencyName });

    acc[dependencyName] = `${shouldHaveCaret ? '^' : ''}${
      readJson<PackageJson>(tree, depPackageConfig.paths.packageJson).version
    }`;

    return acc;
  }, dependencies);
}
