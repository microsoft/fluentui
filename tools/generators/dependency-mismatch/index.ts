import * as semver from 'semver';
import { Tree, formatFiles, updateJson, readJson, readProjectConfiguration, ProjectConfiguration } from '@nrwl/devkit';

import { getProjectPaths, getProjects, isPackageVersionPrerelease } from '../../utils';
import type { PackageJson } from '../../types';

export default async function (tree: Tree) {
  console.time('generator');
  const projects = getProjects(tree);

  projects.forEach(project => {
    const projectPaths = getProjectPaths(project);
    const scope = getProjectScope(project);

    updateJson(tree, projectPaths.packageJson, (packageJson: PackageJson) => {
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

  console.timeEnd('generator');
}

function ensureIsInWorkspace(tree: Tree, projectName: string) {
  try {
    return readProjectConfiguration(tree, projectName);
  } catch {
    return null;
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

    const dependencyProjectConfig = ensureIsInWorkspace(tree, dependencyName);

    if (!dependencyProjectConfig) {
      return acc;
    }

    const minVersion = semver.minVersion(versionRange);

    if (!minVersion) {
      return acc;
    }

    const depPackagePaths = getProjectPaths(dependencyProjectConfig);
    const depScope = getProjectScope(dependencyProjectConfig);

    const isNorthstarUnsupportedDepBump = scope.isReactNorthstarPackage && !depScope.isReactComponentsPackage;
    if (isNorthstarUnsupportedDepBump) {
      return acc;
    }

    const shouldHaveCaret = !isPackageVersionPrerelease(minVersion.raw) || versionRange[0] === '^';

    acc[dependencyName] = `${shouldHaveCaret ? '^' : ''}${
      readJson<PackageJson>(tree, depPackagePaths.packageJson).version
    }`;

    return acc;
  }, dependencies);
}

function getProjectScope(project: ProjectConfiguration) {
  const tags = project.tags ?? [];
  const isReactPackage = tags.includes('v8');
  const isReactNorthstarPackage = tags.includes('react-northstar');
  const isReactComponentsPackage = tags.includes('vNext');
  return { isReactPackage, isReactNorthstarPackage, isReactComponentsPackage };
}
