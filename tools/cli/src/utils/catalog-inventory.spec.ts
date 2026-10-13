import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

import { getCatalogInventory } from './catalog-inventory';
import * as packageInventory from './package-inventory';
import { CATALOG_SYSTEM_PRESETS } from './system-presets';

jest.mock('./package-inventory', () => ({
  ...jest.requireActual('./package-inventory'),
  resolveInstalledPackage: jest.fn(
    jest.requireActual<typeof import('./package-inventory')>('./package-inventory').resolveInstalledPackage,
  ),
}));

const testRoot = path.join(os.tmpdir(), `fluentui-cli-catalog-inventory-${process.pid}`);

describe('catalog inventory', () => {
  beforeEach(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
    fs.mkdirSync(testRoot, { recursive: true });
  });

  afterAll(() => {
    fs.rmSync(testRoot, { recursive: true, force: true });
  });

  afterEach(() => {
    jest
      .mocked(packageInventory.resolveInstalledPackage)
      .mockImplementation(
        jest.requireActual<typeof import('./package-inventory')>('./package-inventory').resolveInstalledPackage,
      );
  });

  it('loads headless and private local catalogs and applies replacement, exclusions, and subpath selection', () => {
    const headless = writeCatalog('@fluentui/react-headless-components-preview', 'headless');
    const product = writeCatalog('@company/design-system', 'product');
    fs.writeFileSync(
      path.join(testRoot, 'package.json'),
      JSON.stringify({
        name: 'app',
        dependencies: {
          '@fluentui/react-headless-components-preview': '1.0.0',
        },
      }),
    );
    linkPackage(headless.root, '@fluentui/react-headless-components-preview');
    fs.writeFileSync(
      path.join(testRoot, 'fluentui.config.json'),
      JSON.stringify({
        schemaVersion: 1,
        systems: {
          'fluent-v9': { disabled: true },
          headless: { catalogs: [{ package: '@fluentui/react-headless-components-preview' }] },
          product: {
            catalogs: [{ path: path.relative(testRoot, product.indexPath) }],
            packages: ['@company/ui-*'],
            exclusions: ['@company/ui-private'],
          },
        },
      }),
    );

    const inventory = getCatalogInventory({ cwd: testRoot });
    expect(inventory.roots.map(root => root.packageName)).toEqual([
      '@company/design-system',
      '@fluentui/react-headless-components-preview',
    ]);
    expect(inventory.diagnostics).toEqual([]);
    expect(inventory.roots.every(root => root.catalog)).toBe(true);
    expect(inventory.selection.matches('@fluentui/react-headless-components-preview/button')).toBe(true);
    expect(inventory.selection.matches('@company/ui-button/nested')).toBe(true);
    expect(inventory.selection.matches('@company/ui-private')).toBe(false);
    expect(inventory.selection.matches('@fluentui/react-components')).toBe(false);
  });

  it('keeps selection active when metadata is missing and makes required mode visible', () => {
    fs.writeFileSync(
      path.join(testRoot, 'package.json'),
      JSON.stringify({ name: 'app', dependencies: { '@company/ui-button': '1.0.0' } }),
    );
    writePlainPackage('@company/ui-button');
    fs.writeFileSync(
      path.join(testRoot, 'fluentui.config.json'),
      JSON.stringify({
        schemaVersion: 1,
        systems: { product: { catalogs: [{ package: '@company/ui-button' }], packages: ['@company/ui-*'] } },
      }),
    );

    const preferred = getCatalogInventory({ cwd: testRoot, system: ['product'] });
    expect(preferred.selection.matches('@company/ui-button/subpath')).toBe(true);
    expect(preferred.roots[0].catalog).toBeUndefined();
    expect(preferred.diagnostics[0].severity).toBe('warning');

    const required = getCatalogInventory({ cwd: testRoot, system: ['product'], metadataMode: 'required' });
    expect(required.selection.matches('@company/ui-button/subpath')).toBe(true);
    expect(required.diagnostics[0].severity).toBe('error');
  });

  it.each(['prefer', 'required', 'off'] as const)(
    'skips unavailable automatic presets without roots or diagnostics in %s mode',
    metadataMode => {
      hidePresetCatalogs();
      fs.writeFileSync(path.join(testRoot, 'package.json'), JSON.stringify({ name: 'app' }));

      const inventory = getCatalogInventory({ cwd: testRoot, metadataMode });
      expect(inventory.roots).toEqual([]);
      expect(inventory.diagnostics).toEqual([]);
      expect(inventory.selection.packages).toEqual([]);
    },
  );

  it('reports an unavailable explicitly selected preset and package', () => {
    hidePresetCatalogs();
    fs.writeFileSync(path.join(testRoot, 'package.json'), JSON.stringify({ name: 'app' }));

    const selectedSystem = getCatalogInventory({ cwd: testRoot, system: ['headless'], metadataMode: 'required' });
    expect(selectedSystem.roots.map(root => root.requestedPackage)).toEqual([
      '@fluentui/react-headless-components-preview',
    ]);
    expect(selectedSystem.diagnostics).toEqual([
      expect.objectContaining({ code: 'catalog.packageNotFound', severity: 'error', system: 'headless' }),
    ]);

    const selectedPackage = getCatalogInventory({ cwd: testRoot, package: '@company/missing' });
    expect(selectedPackage.roots.map(root => root.requestedPackage)).toEqual(['@company/missing']);
    expect(selectedPackage.diagnostics).toEqual([
      expect.objectContaining({ code: 'catalog.packageNotFound', package: '@company/missing' }),
    ]);
  });

  it('narrows catalog roots and diagnostics to the explicitly selected package', () => {
    hidePresetCatalogs();
    fs.writeFileSync(path.join(testRoot, 'package.json'), JSON.stringify({ name: 'app' }));
    fs.writeFileSync(
      path.join(testRoot, 'fluentui.config.json'),
      JSON.stringify({
        schemaVersion: 1,
        systems: {
          product: { catalogs: [{ package: '@company/ui-button' }], packages: ['@company/ui-*'] },
          unrelated: { catalogs: [{ package: '@company/unrelated' }], packages: ['@company/other-*'] },
        },
      }),
    );

    const inventory = getCatalogInventory({ cwd: testRoot, package: '@company/ui-button', metadataMode: 'required' });
    expect(inventory.roots.map(root => root.requestedPackage)).toEqual(['@company/ui-button']);
    expect(inventory.diagnostics).toEqual([
      expect.objectContaining({ code: 'catalog.packageNotFound', package: '@company/ui-button', system: 'product' }),
    ]);
    expect(inventory.selection.systems).toEqual(['product']);
  });

  it('keeps a configured provider without package patterns when narrowing to a consumer package', () => {
    hidePresetCatalogs();
    const provider = writeCatalog('@company/design-system', 'product');
    fs.writeFileSync(path.join(testRoot, 'package.json'), JSON.stringify({ name: 'app' }));
    fs.writeFileSync(
      path.join(testRoot, 'fluentui.config.json'),
      JSON.stringify({
        schemaVersion: 1,
        systems: {
          product: { catalogs: [{ path: path.relative(testRoot, provider.indexPath) }] },
          unrelated: { catalogs: [{ package: '@company/unrelated' }], packages: ['@company/other-*'] },
        },
      }),
    );

    const inventory = getCatalogInventory({ cwd: testRoot, package: '@company/ui-button' });
    expect(inventory.selection.systems).toEqual(['product']);
    expect(inventory.roots.map(root => root.requestedPackage)).toEqual([
      '@company/design-system',
      '@company/ui-button',
    ]);
    expect(inventory.roots[0].catalog).toBeDefined();
    expect(inventory.diagnostics.map(diagnostic => diagnostic.package)).toEqual(['@company/ui-button']);
  });

  it('discovers the v8 library and matches only its public package and subpaths', () => {
    hidePresetCatalogs(['@fluentui/react']);
    fs.writeFileSync(
      path.join(testRoot, 'package.json'),
      JSON.stringify({ name: 'app', dependencies: { '@fluentui/react': '8.0.0' } }),
    );
    writePlainPackage('@fluentui/react');

    const preferred = getCatalogInventory({ cwd: testRoot });
    expect(preferred.roots.map(root => root.requestedPackage)).toEqual(['@fluentui/react']);
    expect(preferred.selection.systems).toEqual(['fluent-v8']);
    expect(preferred.selection.matches('@fluentui/react')).toBe(true);
    expect(preferred.selection.matches('@fluentui/react/lib/Button')).toBe(true);
    expect(preferred.selection.matches('@fluentui/react-components')).toBe(false);
    expect(preferred.selection.matches('@fluentui/react-button')).toBe(false);
    expect(preferred.selection.matches('@fluentui/react-headless-components-preview')).toBe(false);
    expect(preferred.roots[0].catalog).toBeUndefined();
    expect(preferred.diagnostics).toEqual([
      expect.objectContaining({ code: 'catalog.metadataUnavailable', severity: 'warning', system: 'fluent-v8' }),
    ]);

    const required = getCatalogInventory({ cwd: testRoot, system: ['fluent-v8'], metadataMode: 'required' });
    expect(required.diagnostics).toEqual([
      expect.objectContaining({ code: 'catalog.metadataUnavailable', severity: 'error', system: 'fluent-v8' }),
    ]);

    const off = getCatalogInventory({ cwd: testRoot, metadataMode: 'off' });
    expect(off.roots).toHaveLength(1);
    expect(off.diagnostics).toEqual([]);

    const selectedSubpath = getCatalogInventory({
      cwd: testRoot,
      package: '@fluentui/react/lib/Button',
      metadataMode: 'off',
    });
    expect(selectedSubpath.selection.explicitPackage).toBe('@fluentui/react');
    expect(selectedSubpath.selection.systems).toEqual(['fluent-v8']);
    expect(selectedSubpath.roots.map(root => root.requestedPackage)).toEqual(['@fluentui/react']);
  });

  it('retains configured missing catalogs for matching packages and explicitly requested systems', () => {
    hidePresetCatalogs();
    fs.writeFileSync(path.join(testRoot, 'package.json'), JSON.stringify({ name: 'app' }));
    fs.writeFileSync(
      path.join(testRoot, 'fluentui.config.json'),
      JSON.stringify({
        schemaVersion: 1,
        systems: {
          product: {
            catalogs: [{ path: './missing-catalog' }],
            packages: ['@company/ui-*'],
          },
          unrelated: { catalogs: [{ package: '@company/unrelated' }], packages: ['@company/other-*'] },
        },
      }),
    );

    const automatic = getCatalogInventory({ cwd: testRoot, metadataMode: 'off' });
    expect(automatic.diagnostics.map(diagnostic => diagnostic.code)).toEqual([
      'catalog.localPathNotFound',
      'catalog.packageNotFound',
    ]);

    const narrowed = getCatalogInventory({ cwd: testRoot, package: '@company/ui-button', metadataMode: 'required' });
    expect(narrowed.roots.map(root => root.source)).toEqual(['dependency', 'local']);
    expect(narrowed.diagnostics.map(diagnostic => diagnostic.code)).toEqual([
      'catalog.localPathNotFound',
      'catalog.packageNotFound',
    ]);
    expect(narrowed.diagnostics.every(diagnostic => diagnostic.severity === 'error')).toBe(true);

    const explicitSystem = getCatalogInventory({
      cwd: testRoot,
      system: ['unrelated'],
      package: '@company/ui-button',
      metadataMode: 'required',
    });
    expect(explicitSystem.selection.systems).toEqual(['unrelated']);
    expect(explicitSystem.diagnostics.map(diagnostic => diagnostic.package)).toEqual([
      '@company/unrelated',
      '@company/ui-button',
    ]);
  });

  it('discovers a declared standalone catalog from its installed marker and system identity', () => {
    const standalone = writeCatalog('@company/standalone', 'product');
    fs.writeFileSync(
      path.join(testRoot, 'package.json'),
      JSON.stringify({ name: 'app', dependencies: { '@company/standalone': '1.0.0' } }),
    );
    linkPackage(standalone.root, '@company/standalone');
    fs.writeFileSync(
      path.join(testRoot, 'fluentui.config.json'),
      JSON.stringify({
        schemaVersion: 1,
        systems: { product: { packages: ['@company/*'] } },
      }),
    );

    const inventory = getCatalogInventory({ cwd: testRoot, system: ['product'] });
    expect(inventory.roots).toHaveLength(1);
    expect(inventory.roots[0]).toMatchObject({
      packageName: '@company/standalone',
      requestedPackage: '@company/standalone',
      systems: ['product'],
      source: 'dependency',
    });
    expect(inventory.roots[0].catalog).toBeDefined();
  });

  it('keeps curated standalone v9 pilot leaves when their index has no system field', () => {
    const button = writeCatalog('@fluentui/react-button');
    fs.writeFileSync(
      path.join(testRoot, 'package.json'),
      JSON.stringify({ name: 'app', dependencies: { '@fluentui/react-button': '1.0.0' } }),
    );
    linkPackage(button.root, '@fluentui/react-button');

    const inventory = getCatalogInventory({
      cwd: testRoot,
      system: ['fluent-v9'],
      package: '@fluentui/react-button',
      metadataMode: 'required',
    });
    const buttonRoot = inventory.roots.find(root => root.packageName === '@fluentui/react-button');

    expect(buttonRoot).toMatchObject({
      requestedPackage: '@fluentui/react-button',
      systems: ['fluent-v9'],
      source: 'dependency',
    });
    expect(buttonRoot?.catalog).toBeDefined();
    expect(inventory.selection.matches('@fluentui/react-button')).toBe(true);
  });

  it('deduplicates a catalog selected through overlapping systems', () => {
    const shared = writeCatalog('@company/shared', 'shared');
    fs.writeFileSync(path.join(testRoot, 'package.json'), JSON.stringify({ name: 'app' }));
    fs.writeFileSync(
      path.join(testRoot, 'fluentui.config.json'),
      JSON.stringify({
        schemaVersion: 1,
        systems: {
          alpha: { catalogs: [{ path: path.relative(testRoot, shared.indexPath) }], packages: ['@company/shared'] },
          beta: { catalogs: [{ path: path.relative(testRoot, shared.indexPath) }], packages: ['@company/shared'] },
        },
      }),
    );

    const inventory = getCatalogInventory({ cwd: testRoot, system: ['alpha', 'beta'] });
    expect(inventory.roots).toHaveLength(1);
    expect(inventory.roots[0].systems).toEqual(['alpha', 'beta']);
    expect(inventory.selection.matches('@company/shared/subpath')).toBe(true);
  });

  it('rejects conflicting installed instances in one system', () => {
    const first = writeCatalog('@company/conflict', 'product');
    const second = writeCatalog('@company/conflict', 'product', 'second');
    const secondIndex = JSON.parse(fs.readFileSync(second.indexPath, 'utf8'));
    secondIndex.completeness.api = { status: 'partial', reasons: ['different coverage'] };
    fs.writeFileSync(second.indexPath, JSON.stringify(secondIndex));
    fs.writeFileSync(path.join(testRoot, 'package.json'), JSON.stringify({ name: 'app' }));
    fs.writeFileSync(
      path.join(testRoot, 'fluentui.config.json'),
      JSON.stringify({
        schemaVersion: 1,
        systems: {
          product: {
            catalogs: [
              { path: path.relative(testRoot, first.indexPath) },
              { path: path.relative(testRoot, second.indexPath) },
            ],
          },
        },
      }),
    );

    expect(() => getCatalogInventory({ cwd: testRoot, system: ['product'] })).toThrow(
      expect.objectContaining({ code: 'catalog.conflict' }),
    );
  });
});

function hidePresetCatalogs(available: string[] = []): void {
  const original =
    jest.requireActual<typeof import('./package-inventory')>('./package-inventory').resolveInstalledPackage;
  const presetCatalogs = new Set(
    Object.values(CATALOG_SYSTEM_PRESETS)
      .flatMap(preset => preset.catalogs)
      .filter(packageName => !available.includes(packageName)),
  );
  jest
    .mocked(packageInventory.resolveInstalledPackage)
    .mockImplementation((packageName, importer, dependencyKind) =>
      presetCatalogs.has(packageName) ? undefined : original(packageName, importer, dependencyKind),
    );
}

function writeCatalog(packageName: string, system?: string, suffix = ''): { root: string; indexPath: string } {
  const root = path.join(testRoot, 'catalogs', `${packageName.replace('/', '__')}${suffix}`);
  const indexPath = path.join(root, 'custom/catalog.json');
  fs.mkdirSync(path.dirname(indexPath), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify({
      name: packageName,
      version: '1.0.0',
      fluentuiCatalog: './metadata.json',
      exports: {
        '.': { types: './index.d.ts', default: './index.js' },
        './metadata.json': './custom/catalog.json',
      },
    }),
  );
  fs.writeFileSync(path.join(root, 'index.d.ts'), 'export declare const Button: unknown;\n');
  fs.writeFileSync(path.join(root, 'index.js'), '');
  fs.writeFileSync(
    indexPath,
    JSON.stringify({
      kind: 'package-index',
      schema: { major: 1, revision: 0 },
      generator: { name: '@fluentui/api-metadata', version: '0.0.0' },
      package: { name: packageName, version: '1.0.0' },
      system,
      capabilities: {
        api: { status: 'supported' },
        effectiveTypes: { status: 'unsupported', reasons: ['not generated'] },
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
    }),
  );
  return { root, indexPath };
}

function writePlainPackage(packageName: string): void {
  const root = path.join(testRoot, 'node_modules', ...packageName.split('/'));
  fs.mkdirSync(root, { recursive: true });
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ name: packageName, version: '1.0.0' }));
  fs.writeFileSync(path.join(root, 'index.js'), '');
}

function linkPackage(packageRoot: string, packageName: string): void {
  const link = path.join(testRoot, 'node_modules', ...packageName.split('/'));
  fs.mkdirSync(path.dirname(link), { recursive: true });
  fs.symlinkSync(packageRoot, link, 'dir');
}
