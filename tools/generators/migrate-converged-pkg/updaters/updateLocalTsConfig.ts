import { Tree, updateJson, writeJson } from '@nrwl/devkit';
import { TsConfig } from '../../../types';
import { NormalizedSchema } from '../types';
import * as templates from '../templates';
import { getPackageType, isJs, uniqueArray } from '../utils';

export function updateLocalTsConfig(tree: Tree, options: NormalizedSchema) {
  createTsSolutionConfig(tree, options);

  updateTsGlobalTypes(tree, options);

  return tree;
}

function hasConformanceSetup(tree: Tree, options: NormalizedSchema) {
  return tree.exists(options.paths.conformanceSetup);
}

function createTsSolutionConfig(tree: Tree, options: NormalizedSchema) {
  const packageType = getPackageType(tree, options);
  const js = isJs(tree, options);
  const hasConformance = hasConformanceSetup(tree, options);

  const tsConfigs = templates.tsconfig({ platform: packageType, js, hasConformance });
  writeJson(tree, options.paths.tsconfig.main, tsConfigs.main());
  writeJson(tree, options.paths.tsconfig.lib, tsConfigs.lib());
  writeJson(tree, options.paths.tsconfig.test, tsConfigs.test());

  return tree;
}

function updateTsGlobalTypes(tree: Tree, options: NormalizedSchema) {
  // update test TS config
  updateJson(tree, options.paths.tsconfig.test, (json: TsConfig) => {
    if (tree.exists(options.paths.jestSetupFile)) {
      const jestSetupFile = tree.read(options.paths.jestSetupFile)?.toString('utf-8')!;

      if (jestSetupFile.includes(`require('@testing-library/jest-dom')`)) {
        json.compilerOptions.types = json.compilerOptions.types ?? [];
        json.compilerOptions.types.push('@testing-library/jest-dom');
      }
    }

    if (Array.isArray(json.compilerOptions.types)) {
      json.compilerOptions.types = uniqueArray(json.compilerOptions.types);
    }

    return json;
  });

  // update lib TS config
  // put your code here

  // update main TS config
  // put your code here

  return tree;
}
