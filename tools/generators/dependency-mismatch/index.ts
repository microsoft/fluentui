import * as semver from 'semver';
import { Tree, formatFiles, updateJson, readJson } from '@nrwl/devkit';

import { getProjectConfig, getProjects, isPackageVersionConverged } from '../../utils';
import { PackageJson } from '../../types';

export default async function (tree: Tree) {
  const projects = getProjects(tree);

  projects.forEach((project, projectName) => {
    const config = getProjectConfig(tree, { packageName: projectName });

    const checkDependencies = (dependencies: Record<string, string>) => {
      Object.entries(dependencies).forEach(([dependencyName, versionRange]) => {
        try {
          const depPackageConfig = getProjectConfig(tree, { packageName: dependencyName });
          const minVersion = semver.minVersion(versionRange);

          if (minVersion && !isPackageVersionConverged(minVersion.raw)) {
            return;
          }

          dependencies![dependencyName] = `^${readJson<PackageJson>(tree, depPackageConfig.paths.packageJson).version}`;
        } catch (err) {
          if (err instanceof Error && err.message.includes('Cannot find configuration for')) {
            return;
          }

          throw err;
        }
      });
    };

    updateJson(tree, config.paths.packageJson, (packageJson: PackageJson) => {
      if (packageJson.dependencies) {
        checkDependencies(packageJson.dependencies);
      }

      if (packageJson.devDependencies) {
        checkDependencies(packageJson.devDependencies);
      }

      return packageJson;
    });
  });

  await formatFiles(tree);
}
