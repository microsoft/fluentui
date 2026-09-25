import { mkdirSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { fingerprintDeclarationContent, MetadataReaderError } from './load';
import {
  packagePath,
  readPackageManifest,
  rewriteIndex,
  rewriteRecord,
  writeLocalCatalog,
  type WrittenCatalog,
} from './reader.test-utils';
import { createMetadataReader } from './resolve';
import { serializeMetadata } from './serialize';

const testRoot = join(process.cwd(), '.reader-test-data', 'load');

describe('metadata loading', () => {
  beforeEach(() => {
    rmSync(testRoot, { force: true, recursive: true });
    mkdirSync(testRoot, { recursive: true });
  });

  afterAll(() => {
    rmSync(testRoot, { force: true, recursive: true });
  });

  it('loads only the selected shard and reuses package, index, record, and declaration reads', () => {
    const app = createApp('targeted');
    writeLocalCatalog(app.nodeModules, '@scope/targeted', { unrelatedRecord: true });
    const filesRead: string[] = [];
    const reader = createMetadataReader({ onFileRead: path => filesRead.push(path) });

    const first = reader.resolveExport(query('@scope/targeted', app.root));
    expect(first.status).toBe('complete');
    expect(first.definition?.symbol.name).toBe('Widget');
    expect(filesRead.some(path => path.endsWith('unrelated.json'))).toBe(false);
    const firstStats = reader.getStats();

    const second = reader.resolveExport(query('@scope/targeted', app.root));
    expect(second.status).toBe('complete');
    expect(reader.getStats().filesRead).toBe(firstStats.filesRead);
    expect(reader.getStats().cacheHits).toBeGreaterThan(firstStats.cacheHits);
  });

  it('rejects declaration drift in the requested public route authority', () => {
    const app = createApp('drift');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/drift');
    const reader = createMetadataReader();

    expect(reader.resolveExport(query('@scope/drift', app.root)).status).toBe('complete');
    writeFileSync(catalog.declarationPath!, 'export declare const Widget: number;\n');

    expectReaderError(() => reader.resolveExport(query('@scope/drift', app.root)), 'reader.declarationDrift');
  });

  it('keeps symbolic detail available when a checker-derived dependency input drifts', () => {
    const app = createApp('dependency-drift');
    const dependency = writeLocalCatalog(app.nodeModules, '@scope/dependency');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/consumer');
    catalog.record!.dependencyInputs.push({
      requested: '@scope/dependency',
      package: { name: '@scope/dependency', version: '1.0.0' },
      entrypoint: '.',
      conditions: ['types', 'import'],
      declarationFingerprint: dependency.index.declarationInputs[0].fingerprint,
    });
    catalog.record!.symbols[0].effectiveType = {
      status: { status: 'complete' },
      type: { text: 'string', references: [] },
      members: [
        {
          name: 'derived',
          kind: 'property',
          optional: false,
          readonly: false,
          type: { text: 'string', references: [] },
          presentation: {
            kind: 'slot',
            summary: "Slot<'span'>",
            basis: 'declaration',
            targets: [],
            slotType: {
              kind: 'dependency',
              package: '@scope/dependency',
              entrypoint: '.',
              export: 'Widget',
              namespace: 'value',
            },
          },
          sources: [
            {
              kind: 'dependency',
              package: '@scope/dependency',
              entrypoint: '.',
              export: 'Widget',
              namespace: 'value',
            },
          ],
          status: { status: 'complete' },
        },
      ],
      signatures: [
        {
          id: 'signature:call:0',
          kind: 'call',
          overload: 0,
          typeParameters: [],
          parameters: [{ name: 'props', optional: false, rest: false, type: { text: 'Props', references: [] } }],
          returnType: { text: 'void', references: [] },
        },
      ],
    };
    catalog.record!.symbols[0].props = [
      {
        signature: 'signature:call:0',
        type: { ...catalog.record!.symbols[0].effectiveType, signatures: [] },
      },
    ];
    rewriteRecord(catalog, serializeMetadata(catalog.record!));
    const reader = createMetadataReader();

    expect(reader.resolveExport(query('@scope/consumer', app.root)).status).toBe('complete');
    writeFileSync(dependency.declarationPath!, 'changed dependency declaration\n');

    const result = reader.resolveExport(query('@scope/consumer', app.root));
    expect(result.status).toBe('partial');
    expect(result.definition?.symbol.name).toBe('Widget');
    expect(result.diagnostics[0].causeCode).toBe('reader.declarationDrift');
    expect(result.definition?.symbol.effectiveType?.status.status).toBe('unsupported');
    expect(result.definition?.symbol.effectiveType?.members).toEqual([]);
    expect(result.definition?.record.symbols[0].effectiveType?.status.status).toBe('unsupported');
    expect(result.definition?.symbol.props?.[0].type.status.status).toBe('unsupported');
    expect(result.definition?.symbol.props?.[0].type.members).toEqual([]);
  });

  it('allows dependency version-only changes when declaration fingerprints still match', () => {
    const app = createApp('dependency-version');
    const dependency = writeLocalCatalog(app.nodeModules, '@scope/versioned-dependency');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/versioned-consumer');
    catalog.record!.dependencyInputs.push({
      requested: '@scope/versioned-dependency',
      package: { name: '@scope/versioned-dependency', version: '1.0.0' },
      entrypoint: '.',
      conditions: ['types', 'import'],
      declarationFingerprint: dependency.index.declarationInputs[0].fingerprint,
    });
    rewriteRecord(catalog, serializeMetadata(catalog.record!));
    const reader = createMetadataReader();
    expect(reader.resolveExport(query('@scope/versioned-consumer', app.root)).status).toBe('complete');

    const manifest = readPackageManifest(dependency.packageRoot);
    manifest.version = '2.0.0';
    writeFileSync(join(dependency.packageRoot, 'package.json'), JSON.stringify(manifest));
    dependency.index.package.version = '2.0.0';
    dependency.record!.package.version = '2.0.0';
    rewriteRecord(dependency, serializeMetadata(dependency.record!));

    expect(reader.resolveExport(query('@scope/versioned-consumer', app.root)).status).toBe('complete');
  });

  it('verifies declaration-backed dependency inputs without requiring dependency metadata', () => {
    const app = createApp('declaration-backed-dependency');
    const reactRoot = packagePath(app.nodeModules, 'react');
    mkdirSync(reactRoot, { recursive: true });
    writeFileSync(join(reactRoot, 'package.json'), JSON.stringify({ name: 'react', version: '19.0.0' }));
    writeFileSync(join(reactRoot, 'index.js'), '');

    const reactTypesRoot = packagePath(app.nodeModules, '@types/react');
    const declarationPath = join(reactTypesRoot, 'index.d.ts');
    const declarationContent = 'export interface ReactElement { type: unknown; }\n';
    mkdirSync(reactTypesRoot, { recursive: true });
    writeFileSync(
      join(reactTypesRoot, 'package.json'),
      JSON.stringify({ name: '@types/react', version: '19.0.0', types: './index.d.ts' }),
    );
    writeFileSync(declarationPath, declarationContent);

    const catalog = writeLocalCatalog(app.nodeModules, '@scope/declaration-consumer');
    catalog.record!.dependencyInputs.push({
      requested: 'react',
      package: { name: '@types/react', version: '19.0.0' },
      entrypoint: '.',
      conditions: ['types', 'import'],
      declarationPath: 'index.d.ts',
      declarationFingerprint: {
        algorithm: 'sha256',
        value: fingerprintDeclarationContent(declarationContent),
      },
    });
    catalog.record!.symbols[0].effectiveType = {
      status: { status: 'complete' },
      type: { text: 'ReactElement', references: [] },
      members: [
        {
          name: 'type',
          kind: 'property',
          optional: false,
          readonly: false,
          type: { text: 'unknown', references: [] },
          sources: [
            {
              kind: 'dependency',
              package: '@types/react',
              entrypoint: '.',
              export: 'ReactElement',
              namespace: 'type',
            },
          ],
          status: { status: 'complete' },
        },
      ],
      signatures: [],
    };
    rewriteRecord(catalog, serializeMetadata(catalog.record!));
    const reader = createMetadataReader();

    const current = reader.resolveExport(query('@scope/declaration-consumer', app.root));
    expect(current.status).toBe('complete');
    expect(current.definition?.symbol.effectiveType?.members).toHaveLength(1);
    expect(current.diagnostics).toEqual([]);

    writeFileSync(declarationPath, 'export interface ReactElement { type: string; }\n');
    const stale = reader.resolveExport(query('@scope/declaration-consumer', app.root));
    expect(stale.status).toBe('partial');
    expect(stale.diagnostics[0].causeCode).toBe('reader.dependencyDeclarationDrift');
    expect(stale.definition?.symbol.effectiveType?.status.status).toBe('unsupported');
    expect(stale.definition?.symbol.effectiveType?.members).toEqual([]);
  });

  it.each([
    {
      name: 'missing',
      arrange(catalog: WrittenCatalog) {
        unlinkSync(catalog.recordPath!);
      },
      causeCode: 'reader.artifactMissing',
    },
    {
      name: 'corrupt',
      arrange(catalog: WrittenCatalog) {
        rewriteRecord(catalog, '{"kind":');
      },
      causeCode: 'reader.invalidJson',
    },
  ])('returns partial detail for a $name advertised record', ({ arrange, causeCode }) => {
    const app = createApp(`record-${causeCode}`);
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/record');
    arrange(catalog);

    const result = createMetadataReader().resolveExport(query('@scope/record', app.root));
    expect(result.status).toBe('partial');
    expect(result.diagnostics[0].causeCode).toBe(causeCode);
  });

  it('bounds record bytes and total artifact fan-out', () => {
    const oversizedApp = createApp('oversized');
    const oversized = writeLocalCatalog(oversizedApp.nodeModules, '@scope/oversized');
    oversized.record!.symbols[0].declarations[0].documentation = 'x'.repeat(8_000);
    rewriteRecord(oversized, serializeMetadata(oversized.record!));
    const oversizedResult = createMetadataReader({ limits: { maxBytes: 4_000 } }).resolveExport(
      query('@scope/oversized', oversizedApp.root),
    );
    expect(oversizedResult.status).toBe('partial');
    expect(oversizedResult.diagnostics[0].causeCode).toBe('reader.maxBytes');

    const fanoutApp = createApp('fanout');
    writeLocalCatalog(fanoutApp.nodeModules, '@scope/fanout');
    const fanoutResult = createMetadataReader({ limits: { maxFanout: 2 } }).resolveExport(
      query('@scope/fanout', fanoutApp.root),
    );
    expect(fanoutResult.status).toBe('partial');
    expect(fanoutResult.diagnostics[0].causeCode).toBe('reader.maxFanout');
  });

  it('rejects lexical traversal and realpath symlink escapes', () => {
    const traversalApp = createApp('traversal');
    const traversal = writeLocalCatalog(traversalApp.nodeModules, '@scope/traversal');
    traversal.index.records[0].path = '../outside.json';
    rewriteIndex(traversal);
    expectReaderError(
      () => createMetadataReader().resolveExport(query('@scope/traversal', traversalApp.root)),
      'reader.invalidDocument',
    );

    const symlinkApp = createApp('symlink-escape');
    const symlink = writeLocalCatalog(symlinkApp.nodeModules, '@scope/symlink-escape');
    const outside = join(symlink.packageRoot, 'outside.json');
    writeFileSync(outside, serializeMetadata(symlink.record!));
    unlinkSync(symlink.recordPath!);
    symlinkSync(outside, symlink.recordPath!);

    const result = createMetadataReader().resolveExport(query('@scope/symlink-escape', symlinkApp.root));
    expect(result.status).toBe('partial');
    expect(result.diagnostics[0].causeCode).toBe('reader.symlinkEscape');
  });

  it('rejects corrupt roots, installed identity mismatches, excessive nesting, and record inventories', () => {
    const corruptApp = createApp('corrupt-root');
    const corrupt = writeLocalCatalog(corruptApp.nodeModules, '@scope/corrupt-root');
    writeFileSync(corrupt.indexPath, '{"kind":');
    expectReaderError(
      () => createMetadataReader().resolveExport(query('@scope/corrupt-root', corruptApp.root)),
      'reader.invalidJson',
    );

    const identityApp = createApp('identity');
    const identity = writeLocalCatalog(identityApp.nodeModules, '@scope/identity');
    identity.index.package.version = '2.0.0';
    rewriteIndex(identity);
    expectReaderError(
      () => createMetadataReader().resolveExport(query('@scope/identity', identityApp.root)),
      'reader.packageIdentityMismatch',
    );

    const depthApp = createApp('depth');
    const depth = writeLocalCatalog(depthApp.nodeModules, '@scope/depth');
    const depthDocument = JSON.parse(serializeMetadata(depth.index)) as Record<string, unknown>;
    depthDocument.unexpected = { one: { two: { three: true } } };
    writeFileSync(depth.indexPath, JSON.stringify(depthDocument));
    expectReaderError(
      () => createMetadataReader({ limits: { maxJsonDepth: 3 } }).resolveExport(query('@scope/depth', depthApp.root)),
      'reader.invalidDocument',
    );

    const recordsApp = createApp('records');
    writeLocalCatalog(recordsApp.nodeModules, '@scope/records', { unrelatedRecord: true });
    expectReaderError(
      () =>
        createMetadataReader({ limits: { maxCatalogRecords: 1 } }).resolveExport(
          query('@scope/records', recordsApp.root),
        ),
      'reader.invalidDocument',
    );
  });

  it('requires the public marker key and diagnoses unsupported Plug’n’Play resolution', () => {
    const markerApp = createApp('marker');
    const marker = writeLocalCatalog(markerApp.nodeModules, '@scope/marker');
    const manifest = readPackageManifest(marker.packageRoot);
    manifest.fluentuiCatalog = './dist/metadata/index.json';
    writeFileSync(join(marker.packageRoot, 'package.json'), JSON.stringify(manifest));
    expectReaderError(
      () => createMetadataReader().resolveExport(query('@scope/marker', markerApp.root)),
      'reader.catalogMarker',
    );

    const pnpApp = createApp('pnp');
    writeLocalCatalog(pnpApp.nodeModules, '@scope/pnp');
    const previous = Object.getOwnPropertyDescriptor(process.versions, 'pnp');
    Object.defineProperty(process.versions, 'pnp', { configurable: true, value: '1' });
    try {
      expectReaderError(
        () => createMetadataReader().resolveExport(query('@scope/pnp', pnpApp.root)),
        'reader.pnpUnsupported',
      );
    } finally {
      if (previous) {
        Object.defineProperty(process.versions, 'pnp', previous);
      } else {
        delete (process.versions as { pnp?: string }).pnp;
      }
    }
  });

  it('loads a registered local index without requiring a public metadata export', () => {
    const app = createApp('registered-local');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/registered-local');
    const manifest = readPackageManifest(catalog.packageRoot);
    delete manifest.fluentuiCatalog;
    delete (manifest.exports as Record<string, unknown>)['./metadata.json'];
    writeFileSync(join(catalog.packageRoot, 'package.json'), JSON.stringify(manifest));

    const reader = createMetadataReader();
    reader.registerPackageCatalog({
      requested: '@scope/registered-local',
      importer: app.root,
      packageRoot: catalog.packageRoot,
      metadataFile: catalog.indexPath,
      index: catalog.index,
    });

    const result = reader.resolveExport(query('@scope/registered-local', app.root));
    expect(result.status).toBe('complete');
    expect(result.definition?.symbol.name).toBe('Widget');
  });

  it('does not let local registration bypass package identity or declaration provenance', () => {
    const identityApp = createApp('registered-identity');
    const identityCatalog = writeLocalCatalog(identityApp.nodeModules, '@scope/registered-identity');
    identityCatalog.index.package.version = '2.0.0';
    rewriteIndex(identityCatalog);

    expectReaderError(
      () =>
        createMetadataReader().registerPackageCatalog({
          requested: '@scope/registered-identity',
          importer: identityApp.root,
          packageRoot: identityCatalog.packageRoot,
          metadataFile: identityCatalog.indexPath,
          index: identityCatalog.index,
        }),
      'reader.packageIdentityMismatch',
    );

    const malformedApp = createApp('registered-malformed');
    const malformedCatalog = writeLocalCatalog(malformedApp.nodeModules, '@scope/registered-malformed');
    writeFileSync(malformedCatalog.indexPath, '{"kind":');
    expectReaderError(
      () =>
        createMetadataReader().registerPackageCatalog({
          requested: '@scope/registered-malformed',
          importer: malformedApp.root,
          packageRoot: malformedCatalog.packageRoot,
          metadataFile: malformedCatalog.indexPath,
          index: malformedCatalog.index,
        }),
      'reader.invalidJson',
    );

    const changedIndexApp = createApp('registered-index-change');
    const changedIndexCatalog = writeLocalCatalog(changedIndexApp.nodeModules, '@scope/registered-index-change');
    const changedIndexReader = createMetadataReader();
    changedIndexReader.registerPackageCatalog({
      requested: '@scope/registered-index-change',
      importer: changedIndexApp.root,
      packageRoot: changedIndexCatalog.packageRoot,
      metadataFile: changedIndexCatalog.indexPath,
      index: changedIndexCatalog.index,
    });
    writeFileSync(changedIndexCatalog.indexPath, '{"kind":');
    expectReaderError(
      () => changedIndexReader.loadPackageIndex('@scope/registered-index-change', changedIndexApp.root),
      'reader.invalidJson',
    );

    const provenanceApp = createApp('registered-provenance');
    const provenanceCatalog = writeLocalCatalog(provenanceApp.nodeModules, '@scope/registered-provenance');
    const reader = createMetadataReader();
    reader.registerPackageCatalog({
      requested: '@scope/registered-provenance',
      importer: provenanceApp.root,
      packageRoot: provenanceCatalog.packageRoot,
      metadataFile: provenanceCatalog.indexPath,
      index: provenanceCatalog.index,
    });
    writeFileSync(provenanceCatalog.declarationPath!, 'changed after local registration\n');

    expectReaderError(
      () => reader.resolveExport(query('@scope/registered-provenance', provenanceApp.root)),
      'reader.declarationDrift',
    );
  });

  it('invalidates resolved package identity when the installed manifest changes', () => {
    const app = createApp('manifest-invalidation');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/manifest-invalidation');
    const reader = createMetadataReader();
    expect(
      reader.resolveExport(query('@scope/manifest-invalidation', app.root)).definition?.catalog.instance.package
        .version,
    ).toBe('1.0.0');

    const manifest = readPackageManifest(catalog.packageRoot);
    manifest.version = '2.0.0';
    writeFileSync(join(catalog.packageRoot, 'package.json'), JSON.stringify(manifest));
    catalog.index.package.version = '2.0.0';
    catalog.record!.package.version = '2.0.0';
    rewriteRecord(catalog, serializeMetadata(catalog.record!));

    expect(
      reader.resolveExport(query('@scope/manifest-invalidation', app.root)).definition?.catalog.instance.package
        .version,
    ).toBe('2.0.0');
  });

  it('propagates unexpected package manifest I/O failures while checking the resolution cache', () => {
    const app = createApp('manifest-io');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/manifest-io');
    const reader = createMetadataReader();
    expect(reader.resolveExport(query('@scope/manifest-io', app.root)).status).toBe('complete');

    const manifestPath = join(catalog.packageRoot, 'package.json');
    rmSync(manifestPath);
    mkdirSync(manifestPath);

    expectReaderError(() => reader.resolveExport(query('@scope/manifest-io', app.root)), 'reader.packageManifestRead');
  });

  it('keeps the catalog inventory bound separate from records loaded by a targeted query', () => {
    const app = createApp('large-index');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/large-index');
    for (let index = 0; index < 40; index++) {
      catalog.index.records.push({
        id: `unrelated-${index}`,
        kind: 'api',
        path: `api/unrelated-${index}.json`,
        fingerprint: { algorithm: 'sha256', value: index.toString(16).padStart(64, '0') },
        symbols: [`Unrelated${index}:value`],
      });
    }
    rewriteIndex(catalog);

    expect(createMetadataReader().resolveExport(query('@scope/large-index', app.root)).status).toBe('complete');
    const noLoads = createMetadataReader({ limits: { maxLoadedRecords: 0 } }).resolveExport(
      query('@scope/large-index', app.root),
    );
    expect(noLoads.status).toBe('partial');
    expect(noLoads.diagnostics[0].causeCode).toBe('reader.maxLoadedRecords');
  });

  it.each([{ maxFanout: Number.NaN }, { maxBytes: Number.POSITIVE_INFINITY }, { maxLoadedRecords: -1 }])(
    'rejects invalid reader limits: %p',
    limits => {
      expectReaderError(() => createMetadataReader({ limits }), 'reader.limits');
    },
  );
});

function createApp(name: string): { root: string; nodeModules: string } {
  const root = join(testRoot, name);
  const nodeModules = join(root, 'node_modules');
  mkdirSync(nodeModules, { recursive: true });
  writeFileSync(join(root, 'package.json'), JSON.stringify({ name: `test-${name}`, private: true }));
  return { root, nodeModules };
}

function query(packageName: string, importer: string) {
  return {
    package: packageName,
    importer,
    entrypoint: '.',
    export: 'Widget',
    namespace: 'value' as const,
    conditions: ['types', 'import'],
  };
}

function expectReaderError(action: () => unknown, code: string): void {
  try {
    action();
    throw new Error(`Expected ${code}`);
  } catch (error) {
    expect(error).toBeInstanceOf(MetadataReaderError);
    expect((error as MetadataReaderError).code).toBe(code);
  }
}
