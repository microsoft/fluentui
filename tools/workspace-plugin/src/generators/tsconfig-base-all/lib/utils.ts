// use this module to define any kind of generic utilities that are used in more than 1 place within the generator implementation
import path from 'path';
import { readJson, Tree } from '@nx/devkit';

/**
 *
 * Create tsconfig.json with merged "compilerOptions.paths" from v0,v8,v9 tsconfigs.
 */
export function createPathAliasesConfig(tree: Tree) {
  const tsConfigAllPath = '/tsconfig.base.all.json';
  const existingTsConfig = tree.exists(tsConfigAllPath) ? readJson(tree, tsConfigAllPath) : null;

  const baseConfigs = {
    v0: readJson(tree, path.join('/tsconfig.base.v0.json')),
    v8: readJson(tree, path.join('/tsconfig.base.v8.json')),
    v9: readJson(tree, path.join('/tsconfig.base.json')),
  };
  const tsConfigBase = '.';
  const mergedTsConfig = {
    compilerOptions: {
      moduleResolution: 'node',
      forceConsistentCasingInFileNames: true,
      skipLibCheck: true,
      typeRoots: ['node_modules/@types', './typings'],
      isolatedModules: true,
      preserveConstEnums: true,
      sourceMap: true,
      pretty: true,
      rootDir: tsConfigBase,
      baseUrl: tsConfigBase,
      paths: {
        ...baseConfigs.v0.compilerOptions.paths,
        ...baseConfigs.v8.compilerOptions.paths,
        ...baseConfigs.v9.compilerOptions.paths,
      },
    },
  };

  return { tsConfigAllPath, mergedTsConfig, existingTsConfig };
}
