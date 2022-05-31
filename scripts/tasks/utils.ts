import * as fs from 'fs';
import * as path from 'path';
import * as jju from 'jju';
import type { TscTaskOptions } from 'just-scripts';
import { offsetFromRoot } from '@nrwl/devkit';
import { appRootPath } from '@nrwl/tao/src/utils/app-root';

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

export function getTsPathAliasesApiExtractorConfig(options: {
  tsConfig: TsConfig;
  tsConfigPath: string;
  packageJson: PackageJson;
}) {
  const rootOffset = offsetFromRoot(path.dirname(options.tsConfigPath.replace(appRootPath, '')));
  /**
   * This special TSConfig config is all that's needed for api-extractor so it has all type information used for package:
   *
   * NOTES:
   * - `compilerOptions.paths` doesn't work, nor is possible to turn them off when `extends` is used
   *
   */
  const apiExtractorTsConfig: TsConfig = {
    include: options.tsConfig.include,
    /**
     * `files` might be used to specify additional `d.ts` or global type definitions. IF they exist in package tsconfig we need to include them
     */
    ...(options.tsConfig.files ? { files: options.tsConfig.files } : null),
    compilerOptions: {
      ...enableAllowSyntheticDefaultImports({ pkgJson: options.packageJson }),
      strict: true,
      lib: options.tsConfig.compilerOptions.lib,
      typeRoots: ['node_modules/@types', `${rootOffset}typings`],
      types: options.tsConfig.compilerOptions.types,
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
