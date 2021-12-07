import { Tree, readJson } from '@nrwl/devkit';
import * as path from 'path';
import { PackageJson } from '../../../types';
import { NormalizedSchema } from '../types';
import * as templates from '../templates';

export function updateLocalJestConfig(tree: Tree, options: NormalizedSchema) {
  const jestSetupFilePath = options.paths.jestSetupFile;
  const packagesThatTriggerAddingSnapshots = [`@${options.workspaceConfig.npmScope}/react-make-styles`];

  const packageJson = readJson<PackageJson>(tree, options.paths.packageJson);
  packageJson.dependencies = packageJson.dependencies ?? {};

  const config = {
    pkgName: options.normalizedPkgName,
    addSnapshotSerializers: Object.keys(packageJson.dependencies).some(pkgDepName =>
      packagesThatTriggerAddingSnapshots.includes(pkgDepName),
    ),
    testSetupFilePath: `./${path.basename(options.paths.configRoot)}/tests.js`,
  };

  tree.write(options.paths.jestConfig, templates.jestConfig(config));

  if (!tree.exists(jestSetupFilePath)) {
    tree.write(jestSetupFilePath, templates.jestSetup);
  }

  return tree;
}
