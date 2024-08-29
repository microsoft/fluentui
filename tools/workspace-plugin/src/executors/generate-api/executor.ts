import { ExecutorContext, PromiseExecutor, logger, parseJson } from '@nx/devkit';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

import { Extractor, ExtractorConfig, type IConfigFile } from '@microsoft/api-extractor';

import { GenerateApiExecutorSchema } from './schema';
import { PackageJson, TsConfig } from '../../types';

const runExecutor: PromiseExecutor<GenerateApiExecutorSchema> = async (schema, context) => {
  const options = normalizeOptions(schema, context);

  const success = await runGenerateApi(options, context);

  return { success };
};
export default runExecutor;

// ===========

interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}

async function runGenerateApi(options: NormalizedOptions, _context: ExecutorContext): Promise<boolean> {
  if (generateTypeDeclarations(options)) {
    return apiExtractor(options);
  }

  return false;
}

function normalizeOptions(schema: GenerateApiExecutorSchema, context: ExecutorContext) {
  const defaults = {
    config: 'config/api-extractor.json',
    local: true,
    diagnostics: false,
  };
  const resolveLocalFlag = Boolean((schema.local || process.env.__FORCE_API_MD_UPDATE__) ?? !isCI());
  const project = context.projectsConfigurations!.projects[context.projectName!];
  const projectAbsolutePath = join(context.root, project.root);
  const tsConfigPathForCompilation = getTsConfigPathUsedForProduction(projectAbsolutePath);

  return { ...defaults, ...schema, local: resolveLocalFlag, project, projectAbsolutePath, tsConfigPathForCompilation };

  function isCI() {
    return (
      (process.env.CI && process.env.CI !== 'false') ||
      process.env.TF_BUILD === 'true' ||
      process.env.GITHUB_ACTIONS === 'true'
    );
  }
}

function generateTypeDeclarations(options: NormalizedOptions) {
  const cmd = [
    'tsc',
    `-p ./${options.tsConfigPathForCompilation}`,
    '--emitDeclarationOnly',
    // turn off path aliases.
    '--baseUrl .',
  ].join(' ');

  verboseLog(`Emitting '.d.ts' files via: "${cmd}"`);

  try {
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
}

function apiExtractor(options: NormalizedOptions) {
  const extractorConfigPath = join(options.projectAbsolutePath, options.config);

  if (!existsSync(extractorConfigPath)) {
    throw new Error(`api-extractor.json not found at "${extractorConfigPath}"`);
  }

  // Load,parse,customize and prepare the api-extractor.json file for API Extractor API
  const rawExtractorConfig = ExtractorConfig.loadFile(extractorConfigPath);
  customizeExtractorConfig(rawExtractorConfig);
  const extractorConfig = ExtractorConfig.prepare({
    configObject: rawExtractorConfig,
    configObjectFullPath: extractorConfigPath,
    packageJsonFullPath: undefined,
  });

  // Invoke API Extractor
  const extractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: options.local,

    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: process.env.NX_VERBOSE_LOGGING === 'true',
    showDiagnostics: options.diagnostics,
  });

  if (extractorResult.succeeded) {
    verboseLog(`API Extractor completed successfully`);
    return true;
  }

  logger.error(
    `API Extractor completed with ${extractorResult.errorCount} errors` +
      ` and ${extractorResult.warningCount} warnings`,
  );
  return false;

  function customizeExtractorConfig(apiExtractorConfig: IConfigFile) {
    apiExtractorConfig.compiler = getTsPathAliasesApiExtractorConfig({
      packageJson: parseJson(readFileSync(join(options.projectAbsolutePath, 'package.json'), 'utf-8')),
      tsConfig: parseJson(readFileSync(options.tsConfigPathForCompilation, 'utf-8')),
    });

    return apiExtractorConfig;
  }
}

function getTsPathAliasesApiExtractorConfig(options: { tsConfig: TsConfig; packageJson: PackageJson }) {
  const { packageJson, tsConfig } = options;

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
       * api-extractor introduced a "feature" which is actually a bug and makes using path aliases impossible
       * - with this api extractor change user is forced to rely on yarn/npm "workspace" symlinks in order to determine that inner workspace package should not be bundled in type definition rollup/api.md
       * - see https://github.com/microsoft/rushstack/pull/3321, https://github.com/microsoft/rushstack/pull/3339
       *
       */
      paths: undefined,
      baseUrl: '.',
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

/**
 * Some 3rd party packages might ship invalid types for consumers that don't have synthetic default imports enabled
 * In that case our package needs to have `allowSyntheticDefaultImports` to pass the TS lib check.
 *
 * NOTE: This is safe to use on type declaration level for following reasons:
 *  - it doesn't affect emitted runtime code
 *  - it doesn't affect our declaration types emit
 */
function enableAllowSyntheticDefaultImports(options: { pkgJson: PackageJson }) {
  const packagesWithInvalidTypes = [
    /**
     * TODO: check if this is still needed (we are at SB v7)
     * @see @storybook/api/dist/ts3.9/lib/stories.d.ts:1:8 - `import React from 'react'`
     */
    '@storybook/api',
  ];
  const dependencies = Object.keys({ ...options.pkgJson.dependencies, ...options.pkgJson.peerDependencies });
  const shouldEnable = dependencies.some(dependency => packagesWithInvalidTypes.includes(dependency));

  return shouldEnable ? { allowSyntheticDefaultImports: true } : null;
}

function getTsConfigPathUsedForProduction(projectRoot: string) {
  const tsConfigFilesWithAliases = ['tsconfig.app.json', 'tsconfig.lib.json', 'tsconfig.json'];

  const tsConfigPath = join(projectRoot, `./tsconfig.json`);

  if (!existsSync(tsConfigPath)) {
    throw new Error(`${tsConfigPath} doesn't exist`);
  }

  const tsConfigFileForCompilation = tsConfigFilesWithAliases.find(fileName => existsSync(join(projectRoot, fileName)));

  if (!tsConfigFileForCompilation) {
    throw new Error(`no tsconfig from one of [${tsConfigFilesWithAliases}] found!`);
  }

  return tsConfigFileForCompilation;
}

function verboseLog(message: string, kind: keyof typeof logger = 'info') {
  if (process.env.NX_VERBOSE_LOGGING === 'true') {
    logger[kind](message);
  }
}
