import { mkdirSync, readFileSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

import { MetadataReaderError } from './load';
import {
  packagePath,
  rewriteRecord,
  writeLocalCatalog,
  writeLocalCatalogAt,
  writeRoutingCatalog,
} from './reader.test-utils';
import { createMetadataReader } from './resolve';
import { serializeMetadata } from './serialize';

const testRoot = join(process.cwd(), '.reader-test-data', 'resolve');

describe('contextual metadata resolution', () => {
  beforeEach(() => {
    rmSync(testRoot, { force: true, recursive: true });
    mkdirSync(testRoot, { recursive: true });
  });

  afterAll(() => {
    rmSync(testRoot, { force: true, recursive: true });
  });

  it('follows dependency routes from the referring package instance, not the workspace root', () => {
    const app = createApp('nested');
    writeLocalCatalog(app.nodeModules, '@scope/leaf', { version: '1.0.0', declarationContent: 'root leaf\n' });
    const suite = writeRoutingCatalog(app.nodeModules, '@scope/suite', dependencyTarget('@scope/leaf'));
    writeLocalCatalog(join(suite.packageRoot, 'node_modules'), '@scope/leaf', {
      version: '2.0.0',
      declarationContent: 'nested leaf\n',
    });

    const result = createMetadataReader().resolveExport(query('@scope/suite', app.root));
    expect(result.status).toBe('complete');
    expect(result.routes.map(route => route.catalog.instance.package.version)).toEqual(['1.0.0', '2.0.0']);
    expect(result.definition?.catalog.instance.packageRoot).toContain(
      `${relative(testRoot, suite.packageRoot)}/node_modules`,
    );
  });

  it('preserves npm alias requested identity while validating the actual package identity', () => {
    const app = createApp('alias');
    const suite = writeRoutingCatalog(
      app.nodeModules,
      '@scope/suite',
      dependencyTarget('@scope/leaf', '@scope/leaf-alias'),
    );
    writeLocalCatalog(join(suite.packageRoot, 'node_modules'), '@scope/leaf-alias', {
      actualName: '@scope/leaf',
      version: '3.0.0',
    });

    const result = createMetadataReader().resolveExport(query('@scope/suite', app.root));
    expect(result.status).toBe('complete');
    expect(result.routes[1].catalog.instance.requested).toBe('@scope/leaf-alias');
    expect(result.routes[1].catalog.instance.package.name).toBe('@scope/leaf');
  });

  it('resolves workspace and pnpm-style symlinked package layouts', () => {
    const workspaceApp = createApp('workspace-link');
    const workspacePackage = join(testRoot, 'workspace-package');
    writeLocalCatalogAt(workspacePackage, '@scope/workspace', { version: '4.0.0' });
    const workspaceLink = packagePath(workspaceApp.nodeModules, '@scope/workspace');
    mkdirSync(dirname(workspaceLink), { recursive: true });
    symlinkSync(workspacePackage, workspaceLink, 'dir');

    const workspaceResult = createMetadataReader().resolveExport(query('@scope/workspace', workspaceApp.root));
    expect(workspaceResult.status).toBe('complete');
    expect(workspaceResult.definition?.catalog.instance.packageRoot).toBe(workspacePackage);

    const pnpmApp = createApp('pnpm-link');
    const storePackage = join(pnpmApp.nodeModules, '.pnpm', '@scope+pnpm@5.0.0', 'node_modules', '@scope', 'pnpm');
    writeLocalCatalogAt(storePackage, '@scope/pnpm', { version: '5.0.0' });
    const pnpmLink = packagePath(pnpmApp.nodeModules, '@scope/pnpm');
    mkdirSync(dirname(pnpmLink), { recursive: true });
    symlinkSync(storePackage, pnpmLink, 'dir');

    const pnpmResult = createMetadataReader().resolveExport(query('@scope/pnpm', pnpmApp.root));
    expect(pnpmResult.status).toBe('complete');
    expect(pnpmResult.definition?.catalog.instance.packageRoot).toBe(storePackage);
  });

  it('keeps patched same-version instances separate by physical package and content identity', () => {
    const firstApp = createApp('patched-one');
    const secondApp = createApp('patched-two');
    writeLocalCatalog(firstApp.nodeModules, '@scope/patched', {
      version: '1.0.0',
      symbolId: 'First:value',
      symbolName: 'Widget',
      declarationContent: 'first patch\n',
    });
    writeLocalCatalog(secondApp.nodeModules, '@scope/patched', {
      version: '1.0.0',
      symbolId: 'Second:value',
      symbolName: 'Widget',
      declarationContent: 'second patch\n',
    });
    const reader = createMetadataReader();

    const first = reader.resolveExport(query('@scope/patched', firstApp.root));
    const second = reader.resolveExport(query('@scope/patched', secondApp.root));
    expect(first.definition?.symbol.id).toBe('First:value');
    expect(second.definition?.symbol.id).toBe('Second:value');
    expect(first.definition?.catalog.instance.identity).not.toBe(second.definition?.catalog.instance.identity);
  });

  it('does not invent missing suite exports from a dependency catalog', () => {
    const app = createApp('missing-suite-route');
    const suite = writeRoutingCatalog(app.nodeModules, '@scope/suite', dependencyTarget('@scope/leaf'));
    writeLocalCatalog(join(suite.packageRoot, 'node_modules'), '@scope/leaf');

    expectReaderError(
      () =>
        createMetadataReader().resolveExport({
          ...query('@scope/suite', app.root),
          export: 'LeafOnlyExport',
        }),
      'reader.routeNotFound',
    );
  });

  it('reports dependency cycles and unavailable dependency routes as partial references', () => {
    const cycleApp = createApp('cycle');
    writeRoutingCatalog(cycleApp.nodeModules, '@scope/a', dependencyTarget('@scope/b'));
    writeRoutingCatalog(cycleApp.nodeModules, '@scope/b', dependencyTarget('@scope/a'));

    const cycle = createMetadataReader().resolveExport(query('@scope/a', cycleApp.root));
    expect(cycle.status).toBe('partial');
    expect(cycle.diagnostics[0].causeCode).toBe('reader.cycle');
    expect(cycle.routes).toHaveLength(3);

    const missingRouteApp = createApp('missing-dependency-route');
    writeRoutingCatalog(
      missingRouteApp.nodeModules,
      '@scope/suite',
      dependencyTarget('@scope/leaf', undefined, 'Missing'),
    );
    writeLocalCatalog(missingRouteApp.nodeModules, '@scope/leaf');
    const missingRoute = createMetadataReader().resolveExport(query('@scope/suite', missingRouteApp.root));
    expect(missingRoute.status).toBe('partial');
    expect(missingRoute.diagnostics[0].causeCode).toBe('reader.dependencyRouteNotFound');

    const depthApp = createApp('route-depth');
    writeRoutingCatalog(depthApp.nodeModules, '@scope/depth-a', dependencyTarget('@scope/depth-b'));
    writeRoutingCatalog(depthApp.nodeModules, '@scope/depth-b', dependencyTarget('@scope/depth-c'));
    writeLocalCatalog(depthApp.nodeModules, '@scope/depth-c');
    const depth = createMetadataReader({ limits: { maxReferenceDepth: 1 } }).resolveExport(
      query('@scope/depth-a', depthApp.root),
    );
    expect(depth.status).toBe('partial');
    expect(depth.diagnostics[0].causeCode).toBe('reader.maxReferenceDepth');
  });

  it('rejects unsupported custom conditions and distinguishes ambiguous condition routes', () => {
    const app = createApp('conditions');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/conditions');

    expectReaderError(
      () =>
        createMetadataReader().resolveExport({
          ...query('@scope/conditions', app.root),
          conditions: ['types', 'react-server'],
        }),
      'reader.conditionsUnsupported',
    );

    catalog.index.exports.push({
      ...catalog.index.exports[0],
      id: 'route.Widget.require',
      conditions: ['types', 'require'],
      target: { kind: 'local', record: 'main-api', symbol: 'Different:value' },
    });
    catalog.index.records[0].symbols?.push('Different:value');
    writeFileSync(catalog.indexPath, JSON.stringify(catalog.index));
    expectReaderError(
      () => createMetadataReader().resolveExport({ ...query('@scope/conditions', app.root), conditions: undefined }),
      'reader.routeAmbiguous',
    );
  });

  it('propagates explicit index, record, and effective-type partial status', () => {
    const app = createApp('partial-status');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/partial-status');
    catalog.index.completeness.api = { status: 'partial', reasons: ['pilot route coverage'] };
    catalog.record!.completeness = { status: 'partial', reasons: ['unsupported declaration'] };
    catalog.record!.symbols[0].effectiveType = {
      status: { status: 'partial', reasons: ['bounded expansion'] },
      members: [],
      signatures: [],
    };
    rewriteRecord(catalog, serializeMetadata(catalog.record!));

    const result = createMetadataReader().resolveExport(query('@scope/partial-status', app.root));
    expect(result.status).toBe('partial');
    expect(result.diagnostics.map(diagnostic => diagnostic.causeCode)).toEqual(
      expect.arrayContaining(['reader.indexPartial', 'reader.recordPartial', 'reader.effectiveTypePartial']),
    );

    catalog.index.completeness.api = { status: 'unavailable', reasons: ['route detail unavailable'] };
    catalog.record!.completeness = { status: 'unavailable', reasons: ['record unavailable'] };
    catalog.record!.symbols[0].effectiveType!.status = {
      status: 'unsupported',
      reasons: ['expansion unsupported'],
    };
    rewriteRecord(catalog, serializeMetadata(catalog.record!));
    const unavailable = createMetadataReader().resolveExport(query('@scope/partial-status', app.root));
    expect(unavailable.diagnostics.map(diagnostic => diagnostic.causeCode)).toEqual(
      expect.arrayContaining([
        'reader.indexUnavailable',
        'reader.recordUnavailable',
        'reader.effectiveTypeUnsupported',
      ]),
    );
  });

  it('rejects stale selected suite declarations and removed live entrypoint exports', () => {
    const declarationApp = createApp('suite-declaration');
    const declarationSuite = writeRoutingCatalog(
      declarationApp.nodeModules,
      '@scope/declaration-suite',
      dependencyTarget('@scope/declaration-leaf'),
    );
    writeLocalCatalog(declarationApp.nodeModules, '@scope/declaration-leaf');
    const declarationManifest = JSON.parse(
      readFileSync(join(declarationSuite.packageRoot, 'package.json'), 'utf8'),
    ) as {
      exports: Record<string, unknown>;
    };
    declarationManifest.exports['.'] = {
      import: {
        types: './dist/index.d.ts',
        default: './dist/index.js',
      },
      require: {
        types: './dist/index.d.ts',
        default: './dist/index.cjs',
      },
    };
    writeFileSync(join(declarationSuite.packageRoot, 'package.json'), JSON.stringify(declarationManifest));
    writeFileSync(declarationSuite.declarationPath!, 'changed suite declaration\n');
    expectReaderError(
      () => createMetadataReader().resolveExport(query('@scope/declaration-suite', declarationApp.root)),
      'reader.declarationDrift',
    );

    const exportsApp = createApp('removed-export');
    const exportsCatalog = writeLocalCatalog(exportsApp.nodeModules, '@scope/removed-export');
    const manifest = JSON.parse(readFileSync(join(exportsCatalog.packageRoot, 'package.json'), 'utf8')) as {
      exports: Record<string, unknown>;
    };
    delete manifest.exports['.'];
    writeFileSync(join(exportsCatalog.packageRoot, 'package.json'), JSON.stringify(manifest));
    expectReaderError(
      () => createMetadataReader().resolveExport(query('@scope/removed-export', exportsApp.root)),
      'reader.entrypointNotExported',
    );

    const pathApp = createApp('changed-export-path');
    const pathCatalog = writeLocalCatalog(pathApp.nodeModules, '@scope/changed-export-path');
    writeFileSync(join(pathCatalog.packageRoot, 'dist/alternate.d.ts'), 'export declare const Widget: string;\n');
    const pathManifest = JSON.parse(readFileSync(join(pathCatalog.packageRoot, 'package.json'), 'utf8')) as {
      exports: Record<string, unknown>;
    };
    pathManifest.exports['.'] = {
      types: './dist/alternate.d.ts',
      default: './dist/alternate.d.ts',
    };
    writeFileSync(join(pathCatalog.packageRoot, 'package.json'), JSON.stringify(pathManifest));
    expectReaderError(
      () => createMetadataReader().resolveExport(query('@scope/changed-export-path', pathApp.root)),
      'reader.routeDeclarationMismatch',
    );
  });

  it('resolves wildcard exports using Node precedence and honors more-specific null exclusions', () => {
    const app = createApp('wildcard-export');
    const catalog = writeLocalCatalog(app.nodeModules, '@scope/wildcard-export');
    const declarationContent = readFileSync(catalog.declarationPath!, 'utf8');
    const featureDeclaration = join(catalog.packageRoot, 'dist/features/alpha.d.ts');
    mkdirSync(dirname(featureDeclaration), { recursive: true });
    writeFileSync(featureDeclaration, declarationContent);

    catalog.record!.declarationInputs[0].path = 'dist/features/alpha.d.ts';
    catalog.record!.symbols[0].declarations[0].source.file = 'dist/features/alpha.d.ts';
    catalog.index.declarationInputs[0].path = 'dist/features/alpha.d.ts';
    catalog.index.exports[0].entrypoint = './features/alpha';
    catalog.index.exports.push({
      ...catalog.index.exports[0],
      id: 'route.Widget.value.private',
      entrypoint: './features/private/secret',
    });
    rewriteRecord(catalog, serializeMetadata(catalog.record!));

    const manifest = JSON.parse(readFileSync(join(catalog.packageRoot, 'package.json'), 'utf8')) as {
      exports: Record<string, unknown>;
    };
    manifest.exports = {
      './features/private/*': null,
      './features/*': {
        types: './dist/features/*.d.ts',
        default: './dist/features/*.d.ts',
      },
      './metadata.json': './dist/metadata/index.json',
    };
    writeFileSync(join(catalog.packageRoot, 'package.json'), JSON.stringify(manifest));

    const reader = createMetadataReader();
    expect(
      reader.resolveExport({
        ...query('@scope/wildcard-export', app.root),
        entrypoint: './features/alpha',
      }).status,
    ).toBe('complete');
    expectReaderError(
      () =>
        reader.resolveExport({
          ...query('@scope/wildcard-export', app.root),
          entrypoint: './features/private/secret',
        }),
      'reader.entrypointNotExported',
    );
  });
});

function createApp(name: string): { root: string; nodeModules: string } {
  const root = join(testRoot, name);
  const nodeModules = join(root, 'node_modules');
  mkdirSync(nodeModules, { recursive: true });
  writeFileSync(join(root, 'package.json'), JSON.stringify({ name: `test-${name}`, private: true }));
  return { root, nodeModules };
}

function dependencyTarget(packageName: string, requested?: string, exportName = 'Widget') {
  return {
    kind: 'dependency' as const,
    package: packageName,
    entrypoint: '.',
    export: exportName,
    namespace: 'value' as const,
    ...(requested ? { requested } : {}),
  };
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
