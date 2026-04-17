import { type ExecutorContext, type PromiseExecutor, logger, parseJson } from '@nx/devkit';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { execSync } from 'node:child_process';

import { Extractor, ExtractorConfig, type IConfigFile } from '@microsoft/api-extractor';

import type { GenerateApiExecutorSchema } from './schema';
import type { PackageJson, TsConfig } from '../../types';
import { measureEnd, measureStart } from '../../utils';
import { isCI } from './lib/shared';
import { isWildcardTypedEntry, isNamedTypedEntry } from './utils';

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
  if (!generateTypeDeclarations(options)) {
    return false;
  }

  // Run primary api-extractor config
  if (!apiExtractor({ configPath: options.config }, options, context)) {
    return false;
  }

  // Expand export subpaths and run api-extractor for each resolved entry
  if (options.exportSubpaths.enabled) {
    const subpathConfigs = getExportSubpathConfigs(options);
    for (const configObject of subpathConfigs) {
      verboseLog(`Running api-extractor for export subpath entry: ${configObject.mainEntryPointFilePath}`);
      if (!apiExtractor({ configObject }, options, context)) {
        return false;
      }
    }
  }

  return true;
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

function apiExtractor(
  configSource: { configPath: string } | { configObject: IConfigFile },
  options: NormalizedOptions,
  context: ExecutorContext,
) {
  const { rawConfig, fullPath } = resolveConfigSource();

  // Load,parse,customize and prepare the api-extractor.json file for API Extractor API
  customizeExtractorConfig(rawConfig);
  const extractorConfig = ExtractorConfig.prepare({
    configObject: rawConfig,
    configObjectFullPath: fullPath,
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

/**
 * Reads the package.json exports map and resolves both wildcard entries (e.g. "./*") and named
 * entries (e.g. "./utils") into individual api-extractor config objects.
 *
 * - Wildcard entries are expanded into one config per sub-directory found under the resolved source path.
 * - Named entries produce a single config each, derived directly from their types field.
 * - The root export (".") and "./package.json" are always skipped.
 */
function getExportSubpathConfigs(options: NormalizedOptions): IConfigFile[] {
  const packageJson: PackageJson = parseJson(readFileSync(options.packageJsonPath, 'utf-8'));

  const exports = packageJson.exports ?? {};

  const declarationBase = resolveDeclarationBase(options, packageJson);
  if (!declarationBase) {
    return [];
  }

  const apiReportEnabled = options.exportSubpaths.apiReport;

  const configs: IConfigFile[] = [];

  for (const [exportKey, exportValue] of Object.entries(exports)) {
    // Skip root and package.json entries
    if (exportKey === '.' || exportKey === './package.json') {
      continue;
    }

    // Wildcard entries: expand into sub-directories
    if (isWildcardTypedEntry(exportKey, exportValue)) {
      const pathPrefixes = parseWildcardTypesPattern(exportValue.types);
      if (!pathPrefixes) {
        continue;
      }

      const declarationScanDir = join(declarationBase, pathPrefixes.wildcardSubPath);
      const subDirs = listSubDirectories(declarationScanDir);
      if (!subDirs) {
        continue;
      }

      for (const dirName of subDirs) {
        configs.push(
          createSubpathEntryConfig({
            projectAbsolutePath: options.projectAbsolutePath,
            declarationBase,
            subPath: pathPrefixes.wildcardSubPath + dirName,
            distRelativePath: pathPrefixes.distRelativePrefix + dirName,
            reportFileName: dirName,
            apiReportEnabled,
          }),
        );
      }
      continue;
    }

    // Named entries: create config directly from types field
    if (isNamedTypedEntry(exportKey, exportValue)) {
      const parsed = parseNamedTypesPattern(exportValue.types);
      if (!parsed) {
        continue;
      }

      const subpathName = exportKey.replace(/^\.\//, '');

      configs.push(
        createSubpathEntryConfig({
          projectAbsolutePath: options.projectAbsolutePath,
          declarationBase,
          subPath: parsed.declarationSubPath,
          distRelativePath: parsed.distRelativePath,
          reportFileName: subpathName,
          apiReportEnabled,
        }),
      );
    }
  }

  return configs;

  /**
   * Resolves the declaration base path from the primary api-extractor config's mainEntryPointFilePath.
   * The primary config uses tokens (<projectFolder>, <projectRoot>, <unscopedPackageName>) which we
   * resolve here so that programmatic configs for wildcard entries land in the same output tree.
   *
   * @returns The absolute path to the declaration base, or `null` if it cannot be resolved.
   */
  function resolveDeclarationBase(opts: NormalizedOptions, pkgJson: PackageJson): string | null {
    const primaryRawConfig = parseJson<{ mainEntryPointFilePath?: string }>(readFileSync(opts.config, 'utf-8'));
    const primaryMainEntryTemplate = primaryRawConfig?.mainEntryPointFilePath;
    if (!primaryMainEntryTemplate) {
      return null;
    }

    const unscopedPackageName = (pkgJson.name ?? '').replace(/^@[^/]+\//, '');
    // <projectRoot> and <projectFolder> in api-extractor.json are NOT replaced before path.resolve —
    // they act as literal path segments that the subsequent "../" chain traverses through.
    // path.resolve(configDir, "<projectRoot>/../../../../../../...") naturally normalizes to the correct path.
    const configDir = dirname(opts.config);
    const resolvedPrimaryEntry = resolve(
      configDir,
      primaryMainEntryTemplate.replace(/<unscopedPackageName>/g, unscopedPackageName),
    );

    const indexDtsSuffix = '/index.d.ts';
    if (!resolvedPrimaryEntry.endsWith(indexDtsSuffix)) {
      verboseLog(
        `Primary mainEntryPointFilePath "${resolvedPrimaryEntry}" does not end with "${indexDtsSuffix}". ` +
          `Skipping export subpath expansion.`,
        'warn',
      );
      return null;
    }

    return resolvedPrimaryEntry.slice(0, -indexDtsSuffix.length);
  }

  /**
   * Parses a wildcard types pattern and derives the dist-relative prefix and the
   * wildcard sub-path (the portion after the first path segment).
   *
   * Example: "./dist/items/STAR/index.d.ts"
   *  → distRelativePrefix: "dist/items/"
   *  → wildcardSubPath: "items/"
   *
   * @returns The path prefixes, or `null` if the pattern cannot be parsed.
   */
  function parseWildcardTypesPattern(typesPattern: string): {
    distRelativePrefix: string;
    wildcardSubPath: string;
  } | null {
    const starIdx = typesPattern.indexOf('*');
    if (starIdx === -1) {
      return null;
    }

    const typesPrefix = typesPattern.slice(0, starIdx);
    const distRelativePrefix = typesPrefix.replace(/^\.\//, '');

    // Extract the sub-path by stripping the first path segment (the dist directory name).
    // e.g. "dist/items/" → "items/"
    const firstSlashIdx = distRelativePrefix.indexOf('/');
    const wildcardSubPath = firstSlashIdx === -1 ? '' : distRelativePrefix.slice(firstSlashIdx + 1);

    return { distRelativePrefix, wildcardSubPath };
  }

  /**
   * Parses a named (non-wildcard) types pattern and derives the dist-relative path and
   * the declaration sub-path (the portion after the first path segment, minus index.d.ts).
   *
   * Example: "./dist/utils/index.d.ts"
   *  → distRelativePath: "dist/utils"
   *  → declarationSubPath: "utils"
   *
   * @returns The path components, or `null` if the pattern cannot be parsed.
   */
  function parseNamedTypesPattern(typesPattern: string): {
    distRelativePath: string;
    declarationSubPath: string;
  } | null {
    const indexDtsSuffix = '/index.d.ts';
    if (!typesPattern.endsWith(indexDtsSuffix)) {
      return null;
    }

    // Strip "./" prefix and trailing "/index.d.ts"
    const distRelativePath = typesPattern.replace(/^\.\//, '').slice(0, -indexDtsSuffix.length);

    // Strip the first path segment (the dist directory name)
    const firstSlashIdx = distRelativePath.indexOf('/');
    const declarationSubPath = firstSlashIdx === -1 ? '' : distRelativePath.slice(firstSlashIdx + 1);

    if (!declarationSubPath) {
      return null;
    }

    return { distRelativePath, declarationSubPath };
  }

  /**
   * Lists immediate sub-directories of the given path.
   *
   * @returns Array of directory names, or `null` if the path does not exist or cannot be read.
   */
  function listSubDirectories(dirPath: string): string[] | null {
    if (!existsSync(dirPath)) {
      verboseLog(`Export subpath source dir not found, skipping: ${dirPath}`, 'warn');
      return null;
    }

    try {
      return readdirSync(dirPath, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => e.name);
    } catch {
      return null;
    }
  }

  /**
   * Creates an api-extractor IConfigFile for a single export sub-path entry.
   */
  function createSubpathEntryConfig(params: {
    projectAbsolutePath: string;
    declarationBase: string;
    subPath: string;
    distRelativePath: string;
    reportFileName: string;
    apiReportEnabled: boolean;
  }): IConfigFile {
    const mainEntryPointFilePath = join(params.declarationBase, params.subPath, 'index.d.ts');
    const dtsRollupPath = join(params.projectAbsolutePath, params.distRelativePath, 'index.d.ts');

    return {
      projectFolder: params.projectAbsolutePath,
      mainEntryPointFilePath,
      apiReport: {
        enabled: params.apiReportEnabled,
        reportFileName: params.reportFileName,
        reportFolder: '<projectFolder>/etc/',
        reportTempFolder: '<projectFolder>/temp/',
      },
      docModel: { enabled: false },
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: dtsRollupPath,
      },
      tsdocMetadata: { enabled: false },
    };
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

function verboseLog(message: string, kind: keyof typeof logger = 'info') {
  if (process.env.NX_VERBOSE_LOGGING === 'true') {
    logger[kind](message);
  }
}
