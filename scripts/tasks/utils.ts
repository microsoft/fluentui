import * as fs from 'fs';
import * as path from 'path';
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

const rootTsConfig = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../tsconfig.base.json'), 'utf-8'),
) as TsConfig;

function createNormalizedTsPaths(options: { definitionsRootPath: string; rootTsConfig: TsConfig }) {
  const paths = (options.rootTsConfig.compilerOptions.paths as unknown) as Record<string, string[]>;

  const normalizedPaths = Object.entries(paths).reduce((acc, [pkgName, pathAliases]) => {
    acc[pkgName] = [path.join(options.definitionsRootPath, pathAliases[0].replace('index.ts', 'index.d.ts'))];
    return acc;
  }, {} as typeof paths);

  return normalizedPaths;
}

export function getTsPathAliasesApiExtractorConfig(options: {
  tsConfig: TsConfig;
  tsConfigPath: string;
  packageJson: PackageJson;
  definitionsRootPath: string;
}) {
  const hasNewCompilationSetup = ((options.tsConfig.compilerOptions as unknown) as { outDir: string }).outDir.includes(
    'dist/out-tsc',
  );
  // TODO: after all v9 is migrated to new tsc processing use only createNormalizedTsPaths
  const normalizedPaths = hasNewCompilationSetup
    ? createNormalizedTsPaths({ definitionsRootPath: options.definitionsRootPath, rootTsConfig })
    : undefined;

  /**
   * Customized TSConfig that uses `tsconfig.lib.json` as base with some required overrides:
   *
   * NOTES:
   * - `extends` is properly resolved via api-extractor which uses TS api
   * - `skipLibCheck` needs to be explicitly set to `false` so errors propagate to api-extractor
   * - `paths` is overriden to path mapping that points to generated declaration files. This also enables creation of dts rollup without a need of generating rollups for all dependencies 🫡
   *
   */
  const apiExtractorTsConfig: TsConfig = {
    ...options.tsConfig,
    compilerOptions: {
      ...options.tsConfig.compilerOptions,
      ...enableAllowSyntheticDefaultImports({ pkgJson: options.packageJson }),
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
