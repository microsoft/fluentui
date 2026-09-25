import * as fs from 'node:fs';
import * as path from 'node:path';

import {
  API_METADATA_DEFAULT_BOUNDS,
  MetadataLoader,
  MetadataReaderError,
  fingerprintSerializedMetadata,
  validateCatalog,
  validateSerializedMetadata,
  type ApiRecord,
  type MetadataDocument,
  type PackageIndex,
  type ValidationIssue,
} from '@fluentui/api-metadata';

import { CliError, type CliDiagnostic } from '../../utils/diagnostics';

export interface MetadataValidationResult {
  input: string;
  kind?: MetadataDocument['kind'];
  package?: { name: string; version: string };
  recordsAdvertised: number;
  recordsValidated: number;
  valid: boolean;
  diagnostics: CliDiagnostic[];
}

interface ResolvedMetadataInput {
  path: string;
  packageRoot?: string;
}

export function validateMetadataInput(input: string): MetadataValidationResult {
  const resolvedInput = resolveMetadataInput(input);
  let serialized: string;
  try {
    serialized = readBoundedFile(resolvedInput.path);
  } catch (error) {
    return invalidFileResult(resolvedInput.path, error);
  }
  const document = validateSerializedMetadata(serialized);
  if (!document.valid) {
    return invalidResult(resolvedInput.path, document.diagnostics);
  }

  if (document.value.kind === 'api-record') {
    return {
      input: resolvedInput.path,
      kind: document.value.kind,
      package: document.value.package,
      recordsAdvertised: 1,
      recordsValidated: 1,
      valid: true,
      diagnostics: [],
    };
  }

  return validatePackageCatalog(resolvedInput.path, document.value, resolvedInput.packageRoot);
}

function validatePackageCatalog(
  indexPath: string,
  index: PackageIndex,
  packageRoot?: string,
): MetadataValidationResult {
  const metadataRoot = path.dirname(indexPath);
  const records: ApiRecord[] = [];
  const diagnostics: CliDiagnostic[] = [];

  for (const descriptor of index.records) {
    if (descriptor.kind !== 'api') {
      diagnostics.push({
        code: 'CLI_METADATA_RECORD_KIND_UNSUPPORTED',
        severity: 'error',
        message: `Strict validation does not support advertised ${descriptor.kind} record ${descriptor.id}.`,
        path: descriptor.path,
      });
      continue;
    }

    let recordPath: string;
    try {
      recordPath = resolveContained(metadataRoot, descriptor.path);
    } catch (error) {
      diagnostics.push({
        code: 'CLI_METADATA_PATH_ESCAPE',
        severity: 'error',
        message: error instanceof Error ? error.message : String(error),
        path: descriptor.path,
      });
      continue;
    }

    let serialized: string;
    try {
      serialized = readBoundedFile(recordPath);
    } catch (error) {
      diagnostics.push({
        code:
          error instanceof CliError && error.code !== 'CLI_METADATA_INPUT_NOT_FOUND'
            ? error.code
            : 'CLI_METADATA_RECORD_MISSING',
        severity: 'error',
        message: error instanceof Error ? error.message : String(error),
        path: recordPath,
      });
      continue;
    }

    const result = validateSerializedMetadata(serialized);
    if (!result.valid) {
      diagnostics.push(...result.diagnostics.map(issue => toDiagnostic(issue, recordPath)));
    } else if (result.value.kind !== 'api-record') {
      diagnostics.push({
        code: 'CLI_METADATA_RECORD_KIND',
        severity: 'error',
        message: `Advertised API record ${descriptor.id} contains ${result.value.kind}.`,
        path: recordPath,
      });
    } else {
      const fingerprint = fingerprintSerializedMetadata(serialized);
      if (fingerprint.value !== descriptor.fingerprint.value) {
        diagnostics.push({
          code: 'CLI_METADATA_RECORD_FINGERPRINT',
          severity: 'error',
          message: `Advertised API record ${descriptor.id} does not match its sha256 fingerprint.`,
          path: recordPath,
        });
      }
      records.push(result.value);
    }
  }

  const catalog = validateCatalog(index, records, { requireAllApiRecords: true });
  if (!catalog.valid) {
    diagnostics.push(...catalog.diagnostics.map(issue => toDiagnostic(issue, indexPath)));
  }
  if (packageRoot) {
    validateInstalledPackage(packageRoot, indexPath, index, diagnostics);
  }

  return {
    input: indexPath,
    kind: index.kind,
    package: index.package,
    recordsAdvertised: index.records.length,
    recordsValidated: records.length,
    valid: diagnostics.length === 0,
    diagnostics,
  };
}

function validateInstalledPackage(
  packageRoot: string,
  indexPath: string,
  index: PackageIndex,
  diagnostics: CliDiagnostic[],
): void {
  try {
    const loader = new MetadataLoader();
    loader.registerPackageCatalog({
      requested: index.package.name,
      importer: packageRoot,
      packageRoot,
      metadataFile: indexPath,
      index,
    });
    const catalog = loader.loadPackageIndex(index.package.name, packageRoot);
    for (const route of index.exports) {
      loader.verifyRouteDeclaration(catalog, route, loader.createOperation());
    }
    for (const descriptor of index.records.filter(record => record.kind === 'api')) {
      loader.loadApiRecord(catalog, descriptor.id, loader.createOperation());
    }
  } catch (error) {
    diagnostics.push(toPackageDiagnostic(error, packageRoot));
  }
}

function resolveMetadataInput(input: string): ResolvedMetadataInput {
  const resolved = path.resolve(input);
  let stats: fs.Stats;
  try {
    stats = fs.statSync(resolved);
  } catch (error) {
    throw new CliError('CLI_METADATA_INPUT_NOT_FOUND', `Metadata input does not exist: ${resolved}`, 2, [], error);
  }

  if (stats.isFile()) {
    return { path: resolved };
  }
  if (!stats.isDirectory()) {
    throw new CliError('CLI_METADATA_INPUT_TYPE', `Metadata input must be a file or directory: ${resolved}`, 2);
  }

  const packageManifest = path.join(resolved, 'package.json');
  if (fs.existsSync(packageManifest)) {
    let manifest: {
      fluentuiCatalog?: unknown;
      exports?: Record<string, unknown>;
    };
    try {
      manifest = JSON.parse(readBoundedFile(packageManifest)) as typeof manifest;
    } catch (error) {
      if (error instanceof CliError) {
        throw error;
      }
      throw new CliError(
        'CLI_METADATA_PACKAGE_JSON',
        `Unable to parse package manifest ${packageManifest}: ${
          error instanceof Error ? error.message : String(error)
        }`,
        2,
      );
    }
    if (manifest.fluentuiCatalog !== './metadata.json') {
      throw new CliError(
        'CLI_METADATA_CATALOG_MARKER',
        `${packageManifest} must declare "fluentuiCatalog": "./metadata.json".`,
        2,
      );
    }
    const metadataExport = manifest.exports?.['./metadata.json'];
    if (metadataExport === undefined) {
      throw new CliError('CLI_METADATA_EXPORT_MISSING', `${packageManifest} must publicly export ./metadata.json.`, 2);
    }
    const target = findExportTarget(metadataExport);
    if (!target) {
      throw new CliError(
        'CLI_METADATA_EXPORT_TARGET',
        `${packageManifest} has no supported file target for ./metadata.json.`,
        2,
      );
    }
    let exportedIndex: string;
    try {
      exportedIndex = resolveContained(resolved, target);
    } catch (error) {
      throw new CliError('CLI_METADATA_EXPORT_ESCAPE', error instanceof Error ? error.message : String(error), 2);
    }
    if (!fs.existsSync(exportedIndex)) {
      throw new CliError('CLI_METADATA_INPUT_NOT_FOUND', `Exported metadata index does not exist: ${exportedIndex}`, 2);
    }
    return { path: exportedIndex, packageRoot: resolved };
  }

  for (const candidate of [
    path.join(resolved, 'index.json'),
    path.join(resolved, 'metadata.json'),
    path.join(resolved, 'dist/metadata/index.json'),
  ]) {
    if (fs.existsSync(candidate)) {
      return { path: candidate };
    }
  }

  throw new CliError(
    'CLI_METADATA_INDEX_NOT_FOUND',
    `No metadata index was found under ${resolved}. Expected index.json, metadata.json, or dist/metadata/index.json.`,
    2,
  );
}

function findExportTarget(value: unknown): string | undefined {
  if (typeof value === 'string') {
    return value;
  }
  if (!value || typeof value !== 'object') {
    return undefined;
  }
  for (const key of ['default', 'require', 'import']) {
    const target = findExportTarget((value as Record<string, unknown>)[key]);
    if (target) {
      return target;
    }
  }
  return undefined;
}

function resolveContained(root: string, relativePath: string): string {
  if (path.isAbsolute(relativePath)) {
    throw new Error(`Metadata record paths must be relative: ${relativePath}`);
  }
  const resolved = path.resolve(root, relativePath);
  const relative = path.relative(root, resolved);
  if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error(`Metadata record path escapes its index directory: ${relativePath}`);
  }
  if (fs.existsSync(resolved)) {
    const physicalRoot = fs.realpathSync(root);
    const physicalPath = fs.realpathSync(resolved);
    const physicalRelative = path.relative(physicalRoot, physicalPath);
    if (
      physicalRelative === '..' ||
      physicalRelative.startsWith(`..${path.sep}`) ||
      path.isAbsolute(physicalRelative)
    ) {
      throw new Error(`Metadata record path escapes its index directory through a symlink: ${relativePath}`);
    }
  }
  return resolved;
}

function readBoundedFile(filePath: string): string {
  let stats: fs.Stats;
  try {
    stats = fs.statSync(filePath);
  } catch (error) {
    throw new CliError('CLI_METADATA_INPUT_NOT_FOUND', `Metadata file does not exist: ${filePath}`, 2, [], error);
  }
  if (!stats.isFile()) {
    throw new CliError('CLI_METADATA_FILE_TYPE', `Metadata input must be a regular file: ${filePath}`, 2);
  }
  if (stats.size > API_METADATA_DEFAULT_BOUNDS.maxBytes) {
    throw new CliError(
      'CLI_METADATA_FILE_TOO_LARGE',
      `Metadata file exceeds ${API_METADATA_DEFAULT_BOUNDS.maxBytes} bytes: ${filePath}`,
      2,
    );
  }
  const content = fs.readFileSync(filePath);
  if (content.byteLength > API_METADATA_DEFAULT_BOUNDS.maxBytes) {
    throw new CliError(
      'CLI_METADATA_FILE_TOO_LARGE',
      `Metadata file exceeds ${API_METADATA_DEFAULT_BOUNDS.maxBytes} bytes: ${filePath}`,
      2,
    );
  }
  return content.toString('utf8');
}

function invalidResult(input: string, issues: readonly ValidationIssue[]): MetadataValidationResult {
  return {
    input,
    recordsAdvertised: 0,
    recordsValidated: 0,
    valid: false,
    diagnostics: issues.map(issue => toDiagnostic(issue, input)),
  };
}

function invalidFileResult(input: string, error: unknown): MetadataValidationResult {
  const diagnostic =
    error instanceof CliError
      ? {
          code: error.code,
          severity: 'error' as const,
          message: error.message,
          path: input,
        }
      : {
          code: 'CLI_METADATA_FILE_READ',
          severity: 'error' as const,
          message: error instanceof Error ? error.message : String(error),
          path: input,
        };
  return {
    input,
    recordsAdvertised: 0,
    recordsValidated: 0,
    valid: false,
    diagnostics: [diagnostic],
  };
}

function toPackageDiagnostic(error: unknown, packageRoot: string): CliDiagnostic {
  if (error instanceof MetadataReaderError) {
    return {
      code: error.code,
      severity: 'error',
      message: error.message,
      path: error.path ?? packageRoot,
    };
  }
  return {
    code: 'CLI_METADATA_PACKAGE_INVALID',
    severity: 'error',
    message: error instanceof Error ? error.message : String(error),
    path: packageRoot,
  };
}

function toDiagnostic(issue: ValidationIssue, input: string): CliDiagnostic {
  return {
    code: issue.code,
    severity: 'error',
    message: issue.message,
    path: `${input}:${issue.path}`,
  };
}
