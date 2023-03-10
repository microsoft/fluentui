import * as semver from 'semver';
import { Tree, formatFiles, updateJson, readJson, readProjectConfiguration } from '@nrwl/devkit';

import { getProjectConfig, getProjects, isPackageVersionPrerelease } from '../../utils';
import type { PackageJson } from '../../types';

export default async function (tree: Tree) {
  const projects = getProjects(tree);

  projects.forEach((_project, projectName) => {
    const config = getProjectConfig(tree, { packageName: projectName });
    const scope = getProjectScope(config);

    updateJson(tree, config.paths.packageJson, (packageJson: PackageJson) => {
      if (packageJson.dependencies) {
        packageJson.dependencies = getUpdatedDependencies(tree, { dependencies: packageJson.dependencies, scope });
      }

      if (packageJson.devDependencies) {
        packageJson.devDependencies = getUpdatedDependencies(tree, {
          dependencies: packageJson.devDependencies,
          scope,
        });
      }

      if (packageJson.peerDependencies) {
        packageJson.peerDependencies = getUpdatedDependencies(tree, {
          dependencies: packageJson.peerDependencies,
          scope,
        });
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

function getUpdatedDependencies(
  tree: Tree,
  options: { dependencies: Record<string, string>; scope: ReturnType<typeof getProjectScope> },
) {
  const { dependencies, scope } = options;
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

    const depPackageConfig = getProjectConfig(tree, { packageName: dependencyName });
    const depScope = getProjectScope(depPackageConfig);

    const isNorthstarUnsupportedDepBump = scope.isReactNorthstarPackage && !depScope.isReactComponentsPackage;
    if (isNorthstarUnsupportedDepBump) {
      return acc;
    }

    const shouldHaveCaret = !isPackageVersionPrerelease(minVersion.raw) || versionRange[0] === '^';

    acc[dependencyName] = `${shouldHaveCaret ? '^' : ''}${
      readJson<PackageJson>(tree, depPackageConfig.paths.packageJson).version
    }`;

    return acc;
  }, dependencies);
}

function getProjectScope(project: ReturnType<typeof getProjectConfig>) {
  const tags = project.projectConfig.tags ?? [];
  const isReactPackage = tags.includes('v8');
  const isReactNorthstarPackage = tags.includes('react-northstar');
  const isReactComponentsPackage = tags.includes('vNext');
  return { isReactPackage, isReactNorthstarPackage, isReactComponentsPackage };
}
