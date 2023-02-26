import * as fs from 'fs';
import * as path from 'path';

import { stripJsonComments } from '@nrwl/devkit';
import * as jju from 'jju';
import type { TscTaskOptions } from 'just-scripts';

export function getTsPathAliasesConfig() {
  const cwd = process.cwd();
  const tsConfigFile = 'tsconfig.lib.json';
  const tsConfigPath = path.join(cwd, './tsconfig.lib.json');
  const tsConfig: TsConfig | null = fs.existsSync(tsConfigPath)
    ? jju.parse(fs.readFileSync(tsConfigPath, 'utf-8'))
    : null;
  const packageJson: PackageJson = JSON.parse(fs.readFileSync(path.join(cwd, './package.json'), 'utf-8'));

  const isUsingTsSolutionConfigs = Boolean(tsConfig);

  return { tsConfig, isUsingTsSolutionConfigs, tsConfigFile, tsConfigPath, packageJson };
}

export function getTsPathAliasesConfigV8() {
  const cwd = process.cwd();
  const tsConfigFile = 'tsconfig.json';
  const tsConfigPath = path.join(cwd, `./${tsConfigFile}`);
  const tsConfig = JSON.parse(stripJsonComments(fs.readFileSync(tsConfigPath, 'utf-8')));
  const isUsingV8pathAliases = tsConfig.extends && tsConfig.extends.includes('tsconfig.base.v8.json');
  return { isUsingV8pathAliases, tsConfigFileV8: tsConfigFile };
}

const packagesWithInvalidTypes = [
  /**
   * @see @storybook/api/dist/ts3.9/lib/stories.d.ts:1:8 - `import React from 'react'`
   */
  '@storybook/api',
];

/**
 * Some 3rd party packages might ship invalid types for consumers that don't have synthetic default imports enabled
 * In that case our package needs to have `allowSyntheticDefaultImports` to pass the TS lib check.
 *
 * NOTE: This is safe to use on type declaration level for following reasons:
 *  - it doesn't affect emitted runtime code
 *  - it doesn't affect our declaration types emit
 */
function enableAllowSyntheticDefaultImports(options: { pkgJson: PackageJson }) {
  const dependencies = Object.keys({ ...options.pkgJson.dependencies, ...options.pkgJson.peerDependencies });
  const shouldEnable = dependencies.some(dependency => packagesWithInvalidTypes.includes(dependency));

  return shouldEnable ? { allowSyntheticDefaultImports: true } : null;
}

function createNormalizedTsPaths(options: { definitionsRootPath: string; pathAliasesTsConfigPath: string }) {
  type PathAliases = Record<string, string[]>;
  const { definitionsRootPath, pathAliasesTsConfigPath } = options;
  const tsConfigRoot = JSON.parse(fs.readFileSync(pathAliasesTsConfigPath, 'utf-8')) as TsConfig;
  const paths = (tsConfigRoot.compilerOptions.paths as unknown) as undefined | PathAliases;

  if (!paths) {
    throw new Error(`Provided "${pathAliasesTsConfigPath}" has no compilerOptions.path defined`);
  }

  const normalizedPaths = Object.entries(paths).reduce((acc, [pkgName, pathAliases]) => {
    acc[pkgName] = [path.join(definitionsRootPath, pathAliases[0].replace('index.ts', 'index.d.ts'))];
    return acc;
  }, {} as PathAliases);

  return normalizedPaths;
}

export function getTsPathAliasesApiExtractorConfig(options: {
  tsConfig: TsConfig;
  packageJson: PackageJson;
  definitionsRootPath: string;
  pathAliasesTsConfigPath?: string;
}) {
  const { packageJson, tsConfig, pathAliasesTsConfigPath, definitionsRootPath } = options;
  /**
   * Because api-extractor ran into race conditions when executing via lage (https://github.com/microsoft/fluentui/issues/25766),
   * we won't use path aliases on CI, rather serving api-extractor rolluped dts files cross package, that will be referenced via yarn workspace sym-links
   */
  const normalizedPaths = pathAliasesTsConfigPath
    ? createNormalizedTsPaths({ definitionsRootPath, pathAliasesTsConfigPath })
    : undefined;

  /**
   * Customized TSConfig that uses `tsconfig.lib.json` as base with some required overrides:
   *
   * NOTES:
   * - `extends` is properly resolved via api-extractor which uses TS api
   * - `skipLibCheck` needs to be explicitly set to `false` so errors propagate to api-extractor
   * - `paths` if usePathAliases is enabled, we override it to path mapping that points to generated declaration files. This also enables creation of dts rollup without a need of generating rollups for all dependencies 🫡
   *
   */
  const apiExtractorTsConfig: TsConfig = {
    ...tsConfig,
    compilerOptions: {
      ...tsConfig.compilerOptions,
      ...enableAllowSyntheticDefaultImports({ pkgJson: packageJson }),
      /**
       * This option has no effect on type declarations '.d.ts' thus can be turned off. For more info see https://www.typescriptlang.org/tsconfig#non-module-files
       *
       * NOTE: Some v8 packages (font-icons-mdl2) use `preserveConstEnums: false` which clashes with isolateModules - TSC will error
       */
      isolatedModules: false,
      /**
       * needs to be explicitly set to `false` so errors propagate to api-extractor
       */
      skipLibCheck: false,
      /**
       * just-scripts provides invalid types for tsconfig, thus `paths` cannot be set to dictionary,nor null or `{}`
       */
      // @ts-expect-error - just-scripts provides invalid types
      paths: normalizedPaths,
    },
  };

  return {
    /**
     * explicitly turned off, as we wanna check use-cases where package B re-exports/uses `@internal` API from package A
     * With this TS compiler will check for package A definition file and throw error if we violate aforementioned rule
     */
    skipLibCheck: false,
    overrideTsconfig: apiExtractorTsConfig,
  };
}

interface PackageJson {
  name: string;
  version: string;
  main: string;
  module?: string;
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

export interface TsConfig {
  extends?: string;

  /**
   * typescript doesn't provide a correct type for the compiler options file
   * (`typescript.CompilerOptions` has enum values instead of raw options in some cases)
   */
  compilerOptions: Omit<TscTaskOptions, 'nodeArgs'>;
  files?: string[];
  include?: string[];
  exclude?: string[];
  references?: Array<{ path: string }>;
}
