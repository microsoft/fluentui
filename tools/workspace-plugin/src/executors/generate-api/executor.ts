import { type ExecutorContext, type PromiseExecutor, logger, parseJson } from '@nx/devkit';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

import { Extractor, ExtractorConfig, type IConfigFile } from '@microsoft/api-extractor';

import type { GenerateApiExecutorSchema } from './schema';
import type { PackageJson, TsConfig } from '../../types';
import { measureEnd, measureStart } from '../../utils';
import { isCI } from './lib/shared';

const runExecutor: PromiseExecutor<GenerateApiExecutorSchema> = async (schema, context) => {
  measureStart('GenerateApiExecutor');

  const options = normalizeOptions(schema, context);

  const success = await runGenerateApi(options, context);

  measureEnd('GenerateApiExecutor');

  return { success };
};

export default runExecutor;

// ===========

interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}

async function runGenerateApi(options: NormalizedOptions, context: ExecutorContext): Promise<boolean> {
  if (generateTypeDeclarations(options)) {
    return apiExtractor(options, context);
  }

  return false;
}

function normalizeOptions(schema: GenerateApiExecutorSchema, context: ExecutorContext) {
  const defaults = {
    config: '{projectRoot}/config/api-extractor.json',
    local: true,
    diagnostics: false,
  };
  const resolvedSchema = { ...defaults, ...schema };

  const project = context.projectsConfigurations!.projects[context.projectName!];

  const resolveLocalFlag = Boolean(process.env.__FORCE_API_MD_UPDATE__) || (isCI() ? false : resolvedSchema.local);

  const projectAbsolutePath = join(context.root, project.root);
  const resolveConfig = getApiExtractorConfigPath(resolvedSchema, projectAbsolutePath);
  const tsConfigPathForCompilation = getTsConfigPathUsedForProduction(projectAbsolutePath);
  const packageJsonPath = join(projectAbsolutePath, 'package.json');

  if (tsConfigPathForCompilation.error) {
    throw new Error(tsConfigPathForCompilation.error);
  }
  if (resolveConfig.error) {
    throw new Error(resolveConfig.error);
  }

  return {
    ...resolvedSchema,
    local: resolveLocalFlag,
    config: resolveConfig.result!,
    project,
    projectAbsolutePath,
    tsConfigPathForCompilation: tsConfigPathForCompilation.result!,
    packageJsonPath,
  };
}

function generateTypeDeclarations(options: NormalizedOptions) {
  const cmd = [
    'tsc',
    `-p ${options.tsConfigPathForCompilation}`,
    '--pretty',
    '--emitDeclarationOnly',
    // turn off path aliases.
    `--baseUrl ${options.projectAbsolutePath}`,
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

function apiExtractor(options: NormalizedOptions, context: ExecutorContext) {
  const extractorConfigPath = options.config;

  // Load,parse,customize and prepare the api-extractor.json file for API Extractor API
  const rawExtractorConfig = ExtractorConfig.loadFile(extractorConfigPath);
  customizeExtractorConfig(rawExtractorConfig);
  const extractorConfig = ExtractorConfig.prepare({
    configObject: rawExtractorConfig,
    configObjectFullPath: extractorConfigPath,
    packageJsonFullPath: options.packageJsonPath,
  });

  // Invoke API Extractor
  const extractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: options.local,

    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: context.isVerbose,
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
    apiExtractorConfig.compiler = getTsConfigForApiExtractor({
      packageJson: parseJson(readFileSync(options.packageJsonPath, 'utf-8')),
      tsConfig: parseJson(readFileSync(options.tsConfigPathForCompilation, 'utf-8')),
      apiExtractorConfig,
    });

    return apiExtractorConfig;
  }
}

function getTsConfigForApiExtractor(options: {
  tsConfig: TsConfig;
  packageJson: PackageJson;
  apiExtractorConfig: IConfigFile;
}) {
  const { packageJson, tsConfig, apiExtractorConfig } = options;

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
       * TODO: this will be used only on v9 packages so we can remove this once all v9 uses executor instead just-scripts
       */
      isolatedModules: false,
      /**
       *
       * Set to `false` by default so errors propagate to api-extractor
       * support api-extractor.json compiler override if specified in user land, to allow exotic behaviors like using different major version of `@types/` packages
       *
       * TODO: make this configurable via schema api to take precedence over api-extractor compiler.skipLibCheck config
       *
       */
      skipLibCheck: apiExtractorConfig.compiler?.skipLibCheck ?? false,
      /**
       * api-extractor introduced a "feature" which is actually a bug and makes using path aliases impossible
       * - with this api extractor change, user is forced to rely on yarn/npm "workspace" symlinks in order to determine that inner workspace package should not be bundled in type definition rollup/api.md
       * - see https://github.com/microsoft/rushstack/pull/3321, https://github.com/microsoft/rushstack/pull/3339
       *
       */
      paths: undefined,
      /**
       * Turn off path aliases.
       */
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
  // TODO: make this configurable via schema api
  const packagesWithInvalidTypes: string[] = [];
  const dependencies = Object.keys({ ...options.pkgJson.dependencies, ...options.pkgJson.peerDependencies });
  const shouldEnable = dependencies.some(dependency => packagesWithInvalidTypes.includes(dependency));

  return shouldEnable ? { allowSyntheticDefaultImports: true } : null;
}

function getApiExtractorConfigPath(schema: Required<GenerateApiExecutorSchema>, projectRoot: string) {
  const configPath = schema.config.replace('{projectRoot}', projectRoot);

  if (!existsSync(configPath)) {
    return { error: `Cannot find api-extractor.json at "${configPath}"`, result: null };
  }

  return { error: null, result: configPath };
}

function getTsConfigPathUsedForProduction(projectRoot: string) {
  const tsConfigPath = join(projectRoot, `./tsconfig.json`);
  // TODO: make this configurable via schema api
  const tsConfigFilesWithAliases = ['tsconfig.app.json', 'tsconfig.lib.json', 'tsconfig.json'].map(fileName =>
    join(projectRoot, fileName),
  );

  if (!existsSync(tsConfigPath)) {
    return { error: `${tsConfigPath} doesn't exist`, result: null };
  }

  const tsConfigFileForCompilation = tsConfigFilesWithAliases.find(fileName => existsSync(fileName));

  if (!tsConfigFileForCompilation) {
    return { error: `no tsconfig from one of [${tsConfigFilesWithAliases}] found!`, result: null };
  }

  return { error: null, result: tsConfigFileForCompilation };
}

function verboseLog(message: string, kind: keyof typeof logger = 'info') {
  if (process.env.NX_VERBOSE_LOGGING === 'true') {
    logger[kind](message);
  }
}
