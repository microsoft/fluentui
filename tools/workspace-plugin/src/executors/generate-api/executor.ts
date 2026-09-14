import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { execSync } from 'node:child_process';
import { type ExecutorContext, type PromiseExecutor, logger, parseJson } from '@nx/devkit';
import {
  CompilerState,
  ConsoleMessageId,
  Extractor,
  ExtractorConfig,
  type ExtractorMessage,
  type IConfigFile,
} from '@microsoft/api-extractor';

import type { GenerateApiExecutorSchema } from './schema';
import type { PackageJson, TsConfig } from '../../types';
import { measureEnd, measureStart } from '../../utils';
import { isCI, verboseLog } from './lib/shared';
import { getExportSubpathConfigs } from './lib/utils';

const runExecutor: PromiseExecutor<GenerateApiExecutorSchema> = async (schema, context) => {
  measureStart('GenerateApiExecutor');

  const options = normalizeOptions(schema, context);

  const success = await runGenerateApi(options, context);

  measureEnd('GenerateApiExecutor');

  return { success };
};

export default runExecutor;

// ===========

export interface NormalizedOptions extends ReturnType<typeof normalizeOptions> {}

type ConfigSource = { configPath: string } | { configObject: IConfigFile };

async function runGenerateApi(options: NormalizedOptions, context: ExecutorContext): Promise<boolean> {
  if (!generateTypeDeclarations(options)) {
    return false;
  }

  const configSources: ConfigSource[] = [{ configPath: options.config }];

  // Expand export subpaths into one api-extractor config per resolved entry
  if (options.exportSubpaths.enabled) {
    for (const configObject of getExportSubpathConfigs(options)) {
      verboseLog(`Resolved api-extractor config for export subpath entry: ${configObject.mainEntryPointFilePath}`);
      configSources.push({ configObject });
    }
  }

  const extractorConfigs = configSources.map(configSource => prepareExtractorConfig(configSource, options));
  const compilerState = createCompilerState(extractorConfigs);
  const messageCallback = createConsoleMessageDeduper();

  for (const [index, extractorConfig] of extractorConfigs.entries()) {
    const invoked = invokeExtractor(
      {
        extractorConfig,
        compilerState,
        messageCallback,
        progress: { current: index + 1, total: extractorConfigs.length },
      },
      options,
      context,
    );

    if (!invoked) {
      return false;
    }
  }

  return true;
}

/**
 * api-extractor repeats its compiler version notices on every invocation, so keep only the first of each.
 */
function createConsoleMessageDeduper() {
  const dedupedMessageIds: string[] = [ConsoleMessageId.Preamble, ConsoleMessageId.CompilerVersionNotice];
  const alreadyReported = new Set<string>();

  return (message: ExtractorMessage) => {
    if (!dedupedMessageIds.includes(message.messageId)) {
      return;
    }

    if (alreadyReported.has(message.messageId)) {
      message.handled = true;
      return;
    }

    alreadyReported.add(message.messageId);
  };
}

/**
 * Every config compiles with the same tsconfig, so one TS program can serve all entry points
 * instead of api-extractor creating a new one per invocation.
 */
function createCompilerState(extractorConfigs: ExtractorConfig[]): CompilerState {
  const [primaryConfig, ...subpathConfigs] = extractorConfigs;

  verboseLog(`Creating shared api-extractor compiler state for ${extractorConfigs.length} entry point(s)`);

  return CompilerState.create(primaryConfig, {
    additionalEntryPoints: subpathConfigs.map(config => config.mainEntryPointFilePath),
  });
}

function normalizeOptions(schema: GenerateApiExecutorSchema, context: ExecutorContext) {
  const defaults = {
    config: '{projectRoot}/config/api-extractor.json',
    local: true,
    diagnostics: false,
  };
  const resolvedSchema = { ...defaults, ...schema };

  // Normalize exportSubpaths into { enabled, apiReport }
  const rawExportSubpaths = resolvedSchema.exportSubpaths;
  const exportSubpaths =
    typeof rawExportSubpaths === 'object' && rawExportSubpaths !== null
      ? { enabled: true, apiReport: rawExportSubpaths.apiReport !== false }
      : { enabled: rawExportSubpaths === true, apiReport: true };

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
    exportSubpaths,
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

/**
 * Loads, parses, customizes and prepares the api-extractor config for the API Extractor API.
 */
function prepareExtractorConfig(configSource: ConfigSource, options: NormalizedOptions): ExtractorConfig {
  const { rawConfig, fullPath } = resolveConfigSource();

  customizeExtractorConfig(rawConfig);

  return ExtractorConfig.prepare({
    configObject: rawConfig,
    configObjectFullPath: fullPath,
    packageJsonFullPath: options.packageJsonPath,
  });

  /**
   * Resolves the config source into a raw IConfigFile and the full path used for token resolution.
   * File-based sources are loaded from disk; programmatic configs reuse the primary config path.
   */
  function resolveConfigSource(): { rawConfig: IConfigFile; fullPath: string } {
    if ('configPath' in configSource) {
      return {
        rawConfig: ExtractorConfig.loadFile(configSource.configPath),
        fullPath: configSource.configPath,
      };
    }

    return {
      rawConfig: configSource.configObject,
      // Reuse the primary config path so that token resolution matches file-based configs.
      fullPath: options.config,
    };
  }

  function customizeExtractorConfig(apiExtractorConfig: IConfigFile) {
    apiExtractorConfig.compiler = getTsConfigForApiExtractor({
      packageJson: parseJson(readFileSync(options.packageJsonPath, 'utf-8')),
      tsConfig: parseJson(readFileSync(options.tsConfigPathForCompilation, 'utf-8')),
      apiExtractorConfig,
    });

    return apiExtractorConfig;
  }
}

function invokeExtractor(
  params: {
    extractorConfig: ExtractorConfig;
    compilerState: CompilerState;
    messageCallback: (message: ExtractorMessage) => void;
    progress: { current: number; total: number };
  },
  options: NormalizedOptions,
  context: ExecutorContext,
) {
  const { extractorConfig, compilerState, messageCallback, progress } = params;

  logEntryPoint();

  const extractorResult = Extractor.invoke(extractorConfig, {
    compilerState,
    messageCallback,

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

  function logEntryPoint() {
    const outputPath = extractorConfig.untrimmedFilePath || extractorConfig.mainEntryPointFilePath;
    const label = relative(options.projectAbsolutePath, outputPath);

    if (progress.total === 1) {
      verboseLog(`Generating API for ${label}`);
      return;
    }

    logger.info(`[${progress.current}/${progress.total}] Generating API for ${label}`);
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

function getApiExtractorConfigPath(schema: Required<Pick<GenerateApiExecutorSchema, 'config'>>, projectRoot: string) {
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
