import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import * as path from 'node:path';
import type { ApiSymbol } from '@fluentui/api-metadata';

import { getApiImportIssue, selectApiImport } from './api-import';
import type { ApiRouteSummary, CatalogRoot } from './api-query';

const symbol: ApiSymbol = {
  id: 'Button',
  name: 'Button',
  namespaces: ['value'],
  declarations: [],
  relationships: [],
  classifications: [],
  fingerprint: { algorithm: 'sha256', value: 'a'.repeat(64) },
};

function root(name: string, source: CatalogRoot['source'] = 'config'): CatalogRoot {
  return {
    packageName: name,
    requestedPackage: name,
    packageRoot: `/consumer/node_modules/${name}`,
    importer: '/consumer',
    systems: ['example'],
    source,
  };
}

function route(owner: CatalogRoot, overrides: Partial<ApiRouteSummary> = {}): ApiRouteSummary {
  return {
    package: owner.packageName,
    requestedPackage: owner.requestedPackage,
    version: '1.0.0',
    entrypoint: '.',
    export: 'Button',
    namespace: 'value',
    exportKind: 'named',
    typeOnly: false,
    conditions: ['types', 'import'],
    systems: owner.systems,
    source: owner.source,
    metadata: true,
    command: '',
    ...overrides,
  };
}

describe('public import selection', () => {
  const suite = root('@scope/suite');
  const leaf = root('@scope/button', 'dependency');
  const valid = () => undefined;

  it('recommends the configured facade while retaining dependency definitions', () => {
    const result = selectApiImport([route(leaf), route(suite)], [leaf, suite], {}, symbol, valid);
    expect(result).toEqual(
      expect.objectContaining({
        importStatus: 'selected',
        recommendedImport: expect.objectContaining({
          moduleSpecifier: '@scope/suite',
          reason: 'configured-catalog',
          statement: 'import { Button } from "@scope/suite";',
        }),
      }),
    );
  });

  it('uses preset catalogs when no configured catalog overrides them', () => {
    const preset = root('@scope/suite', 'preset');
    expect(selectApiImport([route(leaf), route(preset)], [leaf, preset], {}, symbol, valid).recommendedImport).toEqual(
      expect.objectContaining({ moduleSpecifier: '@scope/suite', reason: 'system-preset' }),
    );
  });

  it('uses a verified headless subpath, never the declaration-owner package', () => {
    const headless = root('@scope/headless');
    const result = selectApiImport(
      [route(leaf), route(headless, { entrypoint: './button' })],
      [headless, leaf],
      {},
      symbol,
      valid,
    );
    expect(result.recommendedImport?.statement).toBe('import { Button } from "@scope/headless/button";');
  });

  it('honors an explicit import path over catalog and root-export preferences', () => {
    const routes = [route(suite), route(suite, { entrypoint: './unstable' }), route(leaf)];
    for (const [from, expected] of [
      ['@scope/button', '@scope/button'],
      ['@scope/suite/unstable', '@scope/suite/unstable'],
    ]) {
      expect(selectApiImport(routes, [suite, leaf], { from }, symbol, valid).recommendedImport).toEqual(
        expect.objectContaining({ moduleSpecifier: expected, reason: 'explicit-from' }),
      );
    }
  });

  it('prefers the root within a package, but not over another configured package', () => {
    const other = root('@scope/other');
    const routes = [route(suite, { entrypoint: './unstable' }), route(suite), route(other, { entrypoint: './button' })];
    const result = selectApiImport(routes, [suite, other], {}, symbol, valid);
    expect(result.importStatus).toBe('ambiguous');
    expect(result.recommendedImport).toBeNull();
    expect(result.importCandidates.map(value => value.moduleSpecifier)).toEqual([
      '@scope/other/button',
      '@scope/suite',
    ]);
  });

  it('does not pick alphabetically between equally preferred subpaths', () => {
    const result = selectApiImport(
      [route(suite, { entrypoint: './a' }), route(suite, { entrypoint: './b' })],
      [suite],
      {},
      symbol,
      valid,
    );
    expect(result.importStatus).toBe('ambiguous');
    expect(result.recommendedImport).toBeNull();
  });

  it('does not use a dependency when the configured facade lacks the API or cannot be verified', () => {
    for (const routes of [[route(leaf)], [route(leaf), route(suite)]]) {
      const result = selectApiImport(routes, [leaf, suite], {}, symbol, candidate =>
        candidate.requestedPackage === suite.requestedPackage ? 'Missing runtime file.' : undefined,
      );
      expect(result.importStatus).toBe('unavailable');
      expect(result.recommendedImport).toBeNull();
    }
  });

  it('deduplicates equivalent conditions and type/value spaces without changing the input', () => {
    const routes = [
      route(suite, { namespace: 'type' }),
      route(suite),
      route(suite, { conditions: ['types', 'require'] }),
    ];
    const before = JSON.stringify(routes);
    const result = selectApiImport(routes, [suite], {}, symbol, candidate =>
      candidate.conditions.includes('require') ? 'CommonJS only.' : undefined,
    );
    expect(result.importCandidates).toHaveLength(1);
    expect(result.recommendedImport?.typeOnly).toBe(false);
    expect(JSON.stringify(routes)).toBe(before);
  });

  it.each([
    [{ namespace: 'type' as const, export: 'ButtonProps' }, 'import type { ButtonProps } from "@scope/suite";'],
    [{ typeOnly: true }, 'import type { Button } from "@scope/suite";'],
    [{ exportKind: 'default' as const, export: 'default' }, 'import Button from "@scope/suite";'],
    [{ exportKind: 'namespace' as const, export: 'Controls' }, 'import { Controls } from "@scope/suite";'],
    [{ export: 'RenamedButton' }, 'import { RenamedButton } from "@scope/suite";'],
    [{ export: 'not-an-identifier' }, 'import { "not-an-identifier" as ImportedApi } from "@scope/suite";'],
  ])('preserves public export syntax: %j', (overrides, statement) => {
    expect(selectApiImport([route(suite, overrides)], [suite], {}, symbol, valid).recommendedImport?.statement).toBe(
      statement,
    );
  });

  it('preserves installed npm alias names in the import', () => {
    const alias = { ...suite, requestedPackage: '@consumer/design' };
    expect(selectApiImport([route(alias)], [alias], {}, symbol, valid).recommendedImport?.moduleSpecifier).toBe(
      '@consumer/design',
    );
  });
});

describe('installed export-map verification', () => {
  let directory: string;
  let owner: CatalogRoot;
  beforeEach(() => {
    directory = realpathSync(mkdtempSync(path.join(tmpdir(), 'fluentui-import-')));
    const packageRoot = path.join(directory, 'node_modules', '@scope', 'design');
    mkdirSync(path.join(packageRoot, 'dist'), { recursive: true });
    mkdirSync(path.join(packageRoot, 'lib'), { recursive: true });
    writeFileSync(path.join(packageRoot, 'dist/button.d.ts'), 'export declare const Button: unknown;');
    writeFileSync(path.join(packageRoot, 'lib/button.js'), 'export const Button = {};');
    owner = { ...root('@scope/design'), packageRoot, importer: directory };
  });
  afterEach(() => rmSync(directory, { recursive: true, force: true }));

  const branch = {
    import: { types: './dist/button.d.ts', default: './lib/button.js' },
    require: { types: './dist/button.d.ts', default: './lib/button.js' },
  };
  function manifest(exports: unknown, extra: Record<string, unknown> = {}) {
    writeFileSync(
      path.join(owner.packageRoot, 'package.json'),
      JSON.stringify({
        name: '@scope/design',
        version: '1.0.0',
        type: 'module',
        exports,
        ...extra,
      }),
    );
  }

  it('verifies a subpath without a root entrypoint or package.json export', () => {
    manifest({ './button': branch });
    expect(getApiImportIssue(route(owner, { entrypoint: './button' }), owner)).toBeUndefined();
    expect(getApiImportIssue(route(owner), owner)).toMatch(/No matching ESM declaration/);
  });

  it('expands wildcard routes and honors exact and specific null exclusions', () => {
    manifest({
      './*': { import: { types: './dist/*.d.ts', default: './lib/*.js' } },
      './blocked': null,
      './private/*': null,
    });
    expect(getApiImportIssue(route(owner, { entrypoint: './button' }), owner)).toBeUndefined();
    for (const entrypoint of ['./blocked', './private/button']) {
      expect(getApiImportIssue(route(owner, { entrypoint }), owner)).toMatch(/No matching ESM declaration/);
    }
  });

  it('uses exact export overrides instead of a matching wildcard', () => {
    manifest({ './*': { import: { types: './dist/*.d.ts', default: './lib/*.js' } }, './button': null });
    expect(getApiImportIssue(route(owner, { entrypoint: './button' }), owner)).toMatch(/No matching ESM declaration/);
  });

  it('does not mistake a types-only export for a runtime export', () => {
    manifest({ '.': { types: './dist/button.d.ts' } });
    const value = route(owner, { conditions: ['types'] });
    expect(getApiImportIssue(value, owner)).toMatch(/No public ESM runtime target/);
    expect(getApiImportIssue({ ...value, namespace: 'type', typeOnly: true }, owner)).toBeUndefined();
  });

  it('reports require-only and custom-condition branches instead of guessing an environment', () => {
    manifest({ '.': { require: branch.require } });
    expect(getApiImportIssue(route(owner), owner)).toMatch(/No matching ESM declaration/);
    expect(getApiImportIssue(route(owner, { conditions: ['types', 'require'] }), owner)).toMatch(
      /requiring types, require/,
    );
    manifest({ '.': { browser: branch.import, default: branch.import } });
    expect(getApiImportIssue(route(owner), owner)).toMatch(/custom export conditions/);
  });

  it('honors conditional ordering and blocked branches', () => {
    manifest({ '.': { types: [], default: './dist/button.d.ts' } });
    expect(getApiImportIssue(route(owner, { namespace: 'type', conditions: ['types'] }), owner)).toMatch(
      /No matching ESM declaration/,
    );
    manifest({ '.': { default: null, ...branch } });
    expect(getApiImportIssue(route(owner), owner)).toMatch(/No matching ESM declaration/);
  });

  it('supports valid fallback arrays without treating null as a public path', () => {
    manifest({ '.': [null, branch] });
    expect(getApiImportIssue(route(owner), owner)).toBeUndefined();
  });

  it('does not recommend malformed maps or normalized traversal targets', () => {
    manifest({ '.': branch, import: './lib/button.js' });
    expect(getApiImportIssue(route(owner), owner)).toMatch(/mixes subpath keys/);
    manifest({ '.': { import: { types: './dist/button.d.ts', default: './lib/../lib/button.js' } } });
    expect(getApiImportIssue(route(owner), owner)).toMatch(/forbidden path segments/);
  });

  it('rejects missing targets and metadata-only local packages', () => {
    manifest({ '.': { import: { types: './dist/button.d.ts', default: './lib/missing.js' } } });
    expect(getApiImportIssue(route(owner), owner)).toMatch(/not an existing package-contained file/);
    expect(getApiImportIssue(route(owner), { ...owner, packageRoot: path.join(directory, 'other') })).toMatch(
      /not resolvable to this catalog/,
    );
  });

  it('supports a legacy root, without inventing deep imports', () => {
    manifest(undefined, { types: './dist/button.d.ts', main: './lib/button.js' });
    expect(getApiImportIssue(route(owner, { conditions: ['types'] }), owner)).toBeUndefined();
    expect(getApiImportIssue(route(owner, { conditions: ['types'], entrypoint: './button' }), owner)).toMatch(
      /only support verified root/,
    );
  });
});
