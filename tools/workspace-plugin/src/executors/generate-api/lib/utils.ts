import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { parseJson } from '@nx/devkit';
import { type IConfigFile } from '@microsoft/api-extractor';

import type { PackageJson } from '../../../types';

import type { NormalizedOptions } from '../executor';
import { verboseLog } from './shared';

function isTypedEntry(exportValue: unknown): exportValue is { types: string } & Record<string, unknown> {
  return typeof exportValue === 'object' && exportValue !== null && 'types' in exportValue;
}

/**
 * Checks whether a single export map entry is a wildcard entry with a `types` field.
 */
function isWildcardTypedEntry(
  exportKey: string,
  exportValue: unknown,
): exportValue is { types: string } & Record<string, unknown> {
  return exportKey.includes('*') && isTypedEntry(exportValue);
}

/**
 * Checks whether a single export map entry is a named (non-wildcard, non-root) entry with a `types` field.
 * Skips `"."` and `"./package.json"`.
 */
function isNamedTypedEntry(
  exportKey: string,
  exportValue: unknown,
): exportValue is { types: string } & Record<string, unknown> {
  if (exportKey === '.' || exportKey === './package.json' || exportKey.includes('*')) {
    return false;
  }
  return isTypedEntry(exportValue);
}

/**
 * Reads the package.json exports map and resolves both wildcard entries (e.g. "./*") and named
 * entries (e.g. "./utils") into individual api-extractor config objects.
 *
 * - Wildcard entries are expanded into one config per sub-directory found under the resolved source path.
 * - Named entries produce a single config each, derived directly from their types field.
 * - The root export (".") and "./package.json" are always skipped.
 */
export function getExportSubpathConfigs(options: NormalizedOptions): IConfigFile[] {
  const packageJson: PackageJson = parseJson(readFileSync(options.packageJsonPath, 'utf-8'));

  const exports = packageJson.exports ?? {};

  const declarationBase = resolveDeclarationBase(options, packageJson);
  if (!declarationBase) {
    return [];
  }

  const apiReportEnabled = options.exportSubpaths.apiReport;

  const configs: IConfigFile[] = [];

  for (const [exportKey, exportValue] of Object.entries(exports)) {
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
