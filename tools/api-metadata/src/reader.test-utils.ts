import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

import { fingerprintDeclarationContent } from './load';
import { fingerprintSerializedMetadata, serializeMetadata } from './serialize';
import type { ApiRecord, ExportRoute, ExportTarget, MetadataNamespace, PackageIndex } from './types';

export interface WrittenCatalog {
  packageRoot: string;
  index: PackageIndex;
  indexPath: string;
  record?: ApiRecord;
  recordPath?: string;
  declarationPath?: string;
}

export interface LocalCatalogOptions {
  actualName?: string;
  version?: string;
  symbolId?: string;
  symbolName?: string;
  namespace?: MetadataNamespace;
  declarationContent?: string;
  unrelatedRecord?: boolean;
}

export function packagePath(nodeModules: string, packageName: string): string {
  return join(nodeModules, ...packageName.split('/'));
}

export function writeLocalCatalog(
  nodeModules: string,
  installedName: string,
  options: LocalCatalogOptions = {},
): WrittenCatalog {
  return writeLocalCatalogAt(packagePath(nodeModules, installedName), options.actualName ?? installedName, options);
}

export function writeLocalCatalogAt(
  packageRoot: string,
  actualName: string,
  options: LocalCatalogOptions = {},
): WrittenCatalog {
  const version = options.version ?? '1.0.0';
  const symbolId = options.symbolId ?? 'Widget:value';
  const symbolName = options.symbolName ?? 'Widget';
  const namespace = options.namespace ?? 'value';
  const declarationContent = options.declarationContent ?? `export declare const ${symbolName}: string;\n`;
  const declarationPath = join(packageRoot, 'dist/index.d.ts');
  mkdirSync(dirname(declarationPath), { recursive: true });
  writeFileSync(declarationPath, declarationContent);

  const record: ApiRecord = {
    kind: 'api-record',
    schema: { major: 1, revision: 0 },
    generator: { name: '@fluentui/api-metadata', version: '0.0.0' },
    package: { name: actualName, version },
    recordId: 'main-api',
    declarationInputs: [
      {
        path: 'dist/index.d.ts',
        conditions: ['types', 'import'],
        fingerprint: {
          algorithm: 'sha256',
          value: fingerprintDeclarationContent(declarationContent),
        },
      },
    ],
    dependencyInputs: [],
    completeness: { status: 'complete' },
    symbols: [
      {
        id: symbolId,
        name: symbolName,
        namespaces: [namespace],
        declarations: [
          {
            id: `${symbolId}#0`,
            kind: namespace === 'type' ? 'type-alias' : 'const',
            namespaces: [namespace],
            source: { file: 'dist/index.d.ts' },
          },
        ],
        relationships: [],
        classifications: [],
        fingerprint: { algorithm: 'sha256', value: 'c'.repeat(64) },
      },
    ],
    diagnostics: [],
  };
  const recordText = serializeMetadata(record);
  const recordPath = join(packageRoot, 'dist/metadata/api/main.json');
  mkdirSync(dirname(recordPath), { recursive: true });
  writeFileSync(recordPath, recordText);

  const index = createIndex(actualName, version);
  index.declarationInputs.push(record.declarationInputs[0]);
  index.records.push({
    id: record.recordId,
    kind: 'api',
    path: 'api/main.json',
    fingerprint: fingerprintSerializedMetadata(recordText),
    symbols: [symbolId],
  });
  index.exports.push(
    createRoute({
      id: `route.${symbolName}.${namespace}`,
      exportName: symbolName,
      namespace,
      target: { kind: 'local', record: record.recordId, symbol: symbolId },
    }),
  );
  if (options.unrelatedRecord) {
    index.records.push({
      id: 'unrelated-api',
      kind: 'api',
      path: 'api/unrelated.json',
      fingerprint: { algorithm: 'sha256', value: 'd'.repeat(64) },
      symbols: ['Unrelated:value'],
    });
  }

  const indexPath = writeIndex(packageRoot, index);
  writeManifest(packageRoot, actualName, version);
  return { packageRoot, index, indexPath, record, recordPath, declarationPath };
}

export function writeRoutingCatalog(
  nodeModules: string,
  installedName: string,
  target: ExportTarget,
  options: { actualName?: string; version?: string; exportName?: string; namespace?: MetadataNamespace } = {},
): WrittenCatalog {
  const packageRoot = packagePath(nodeModules, installedName);
  const actualName = options.actualName ?? installedName;
  const version = options.version ?? '1.0.0';
  const exportName = options.exportName ?? 'Widget';
  const namespace = options.namespace ?? 'value';
  const index = createIndex(actualName, version);
  const declarationContent = `export declare const ${exportName}: unknown;\n`;
  const declarationPath = join(packageRoot, 'dist/index.d.ts');
  mkdirSync(dirname(declarationPath), { recursive: true });
  writeFileSync(declarationPath, declarationContent);
  index.declarationInputs.push({
    path: 'dist/index.d.ts',
    conditions: ['types', 'import'],
    fingerprint: {
      algorithm: 'sha256',
      value: fingerprintDeclarationContent(declarationContent),
    },
  });
  index.exports.push(
    createRoute({
      id: `route.${exportName}.${namespace}`,
      exportName,
      namespace,
      target,
    }),
  );
  const indexPath = writeIndex(packageRoot, index);
  writeManifest(packageRoot, actualName, version);
  return { packageRoot, index, indexPath, declarationPath };
}

export function rewriteIndex(catalog: WrittenCatalog): void {
  writeFileSync(catalog.indexPath, serializeMetadata(catalog.index));
}

export function rewriteRecord(catalog: WrittenCatalog, text: string): void {
  if (!catalog.recordPath) {
    throw new Error('Catalog has no record');
  }
  writeFileSync(catalog.recordPath, text);
  const descriptor = catalog.index.records.find(record => record.id === 'main-api');
  if (!descriptor) {
    throw new Error('Catalog has no main record descriptor');
  }
  descriptor.fingerprint = fingerprintSerializedMetadata(text);
  rewriteIndex(catalog);
}

export function readPackageManifest(packageRoot: string): Record<string, unknown> {
  return JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8')) as Record<string, unknown>;
}

function createIndex(name: string, version: string): PackageIndex {
  return {
    kind: 'package-index',
    schema: { major: 1, revision: 0 },
    generator: { name: '@fluentui/api-metadata', version: '0.0.0' },
    package: { name, version },
    capabilities: {
      api: { status: 'supported' },
      effectiveTypes: { status: 'partial', reasons: ['bounded views'] },
      guidance: { status: 'unsupported', reasons: ['not generated'] },
      search: { status: 'unsupported', reasons: ['not generated'] },
    },
    completeness: {
      api: { status: 'complete' },
      guidance: { status: 'unavailable', reasons: ['not generated'] },
      search: { status: 'unavailable', reasons: ['not generated'] },
    },
    declarationInputs: [],
    records: [],
    exports: [],
    diagnostics: [],
  };
}

function createRoute(options: {
  id: string;
  exportName: string;
  namespace: MetadataNamespace;
  target: ExportTarget;
}): ExportRoute {
  return {
    id: options.id,
    entrypoint: '.',
    export: options.exportName,
    namespace: options.namespace,
    conditions: ['types', 'import'],
    exportKind: 'named',
    typeOnly: options.namespace === 'type',
    target: options.target,
    classifications: [],
  };
}

function writeIndex(packageRoot: string, index: PackageIndex): string {
  const indexPath = join(packageRoot, 'dist/metadata/index.json');
  mkdirSync(dirname(indexPath), { recursive: true });
  writeFileSync(indexPath, serializeMetadata(index));
  return indexPath;
}

function writeManifest(packageRoot: string, name: string, version: string): void {
  mkdirSync(packageRoot, { recursive: true });
  writeFileSync(
    join(packageRoot, 'package.json'),
    JSON.stringify({
      name,
      version,
      fluentuiCatalog: './metadata.json',
      exports: {
        '.': {
          types: './dist/index.d.ts',
          default: './dist/index.d.ts',
        },
        './metadata.json': './dist/metadata/index.json',
      },
    }),
  );
}
