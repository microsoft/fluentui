import { mkdirSync, symlinkSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { createModuleResolver, createResolverStats } from '../module-resolver';
import { createWorkspace } from './workspace-helpers';

describe('Oxc first-party module resolver', () => {
  let workspace: ReturnType<typeof createWorkspace>;
  beforeEach(() => {
    workspace = createWorkspace();
  });
  afterEach(() => workspace.cleanup());

  function source(path: string, text: string) {
    const file = workspace.file(path);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, text);
    return file;
  }

  const app = 'packages/app/src/index.tsx';

  it('resolves paths, relatives, barrels, NodeNext extensions and package imports without aliases', () => {
    const resolve = createModuleResolver();
    const from = workspace.file(app);
    expect(resolve('@ws/store', from)).toBe(workspace.file('packages/store/src/index.ts'));
    expect(resolve('./relative', from)).toBe(workspace.file('packages/app/src/relative.ts'));
    expect(resolve('./barrel', from)).toBe(workspace.file('packages/app/src/barrel.ts'));
    expect(resolve('../../shared/util.js', from)).toBe(workspace.file('packages/shared/util.ts'));
    expect(resolve('#internal/internal', from)).toBe(workspace.file('packages/app/src/internal.ts'));
  });

  it('discovers tsconfig per importer instead of caching one global paths map', () => {
    const stats = createResolverStats();
    const resolve = createModuleResolver({ stats });
    expect(resolve('~/leaf', workspace.file('packages/feature/src/index.ts'))).toBe(
      workspace.file('packages/feature/src/leaf.ts'),
    );
    expect(resolve('~/leaf', workspace.file(app))).toBeNull();
    expect(stats.tsconfigsUsed).toEqual(
      new Set([workspace.file('packages/feature/tsconfig.json'), workspace.file('packages/app/tsconfig.json')]),
    );
  });

  it('uses exact and longest-prefix tsconfig aliases before broader wildcard aliases', () => {
    source(
      'packages/app/tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@local/*': ['broad/*'],
            '@local/button/*': ['specific/*'],
            '@local/button/exact': ['exact.ts'],
          },
        },
      }),
    );
    source('packages/app/broad/button/view.ts', 'export const value = 1;');
    const specific = source('packages/app/specific/view.ts', 'export const value = 2;');
    const exact = source('packages/app/exact.ts', 'export const value = 3;');
    const resolve = createModuleResolver();
    expect(resolve('@local/button/view', workspace.file(app))).toBe(specific);
    expect(resolve('@local/button/exact', workspace.file(app))).toBe(exact);
  });

  it('keeps target order and does not fall through from a selected alias to a broader pattern', () => {
    source(
      'packages/app/tsconfig.json',
      JSON.stringify({
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@local/*': ['first/*', 'second/*'],
            '@local/button/*': ['missing/*'],
          },
        },
      }),
    );
    const first = source('packages/app/first/present.ts', 'export const value = 1;');
    source('packages/app/second/present.ts', 'export const value = 2;');
    const fallback = source('packages/app/second/fallback.ts', 'export const value = 3;');
    source('packages/app/first/button/view.ts', 'export const value = 4;');
    const resolve = createModuleResolver();
    expect(resolve('@local/present', workspace.file(app))).toBe(first);
    expect(resolve('@local/fallback', workspace.file(app))).toBe(fallback);
    expect(resolve('@local/button/view', workspace.file(app))).toBeNull();
  });

  it('follows workspace symlinks to first-party realpaths but not real node_modules files', () => {
    const stats = createResolverStats();
    const resolve = createModuleResolver({ stats });
    expect(resolve('@ws/feature', workspace.file(app))).toBe(workspace.file('packages/feature/src/index.ts'));
    expect(resolve('third-party-store', workspace.file(app))).toBeNull();
    // A first-party-looking symlink must not hide an external implementation.
    symlinkSync(
      workspace.file('node_modules/third-party-store/index.js'),
      workspace.file('packages/app/src/external.js'),
    );
    expect(resolve('./external.js', workspace.file(app))).toBeNull();
    expect(resolve('node:fs', workspace.file(app))).toBeNull();
    expect(stats.resolved).toBe(1);
    expect(stats.packageBoundaries).toBe(3);
  });

  it('follows built ESM without dist/source redirects and visibly reports unbuilt and CommonJS targets', () => {
    const stats = createResolverStats();
    const resolve = createModuleResolver({ stats });
    expect(resolve('@ws/refs-built', workspace.file(app))).toBe(workspace.file('packages/refs-built/dist/index.js'));
    expect(resolve('@ws/refs-unbuilt', workspace.file(app))).toBeNull();
    expect(resolve('@ws/cjs-dist', workspace.file(app))).toBeNull();
    expect(stats.unresolved.get('@ws/refs-unbuilt')).toBe(1);
    expect(stats.unsupportedTargets).toBe(1);
    expect(stats.diagnostics).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ kind: 'unresolved', specifier: '@ws/refs-unbuilt' }),
        expect.objectContaining({
          kind: 'unsupported-target',
          target: workspace.file('packages/cjs-dist/dist/index.js'),
        }),
      ]),
    );
  });

  it('accepts executable mts/mjs and syntax-detected ESM js, not cts/cjs/json/declarations', () => {
    const resolve = createModuleResolver();
    for (const extension of ['mts', 'mjs', 'js']) {
      const file = source(`standalone/esm-${extension}.${extension}`, 'export const value = 1;');
      expect(resolve(file, workspace.file(app))).toBe(file);
    }
    for (const extension of ['cts', 'cjs', 'json', 'd.ts', 'd.mts', 'd.cts']) {
      const file = source(`standalone/opaque.${extension}`, extension === 'json' ? '{}' : 'export const value = 1;');
      expect(resolve(file, workspace.file(app))).toBeNull();
    }
  });

  it('retries only a recognized missing reference without tsconfig and warns once per project', () => {
    const stats = createResolverStats();
    const onDiagnostic = jest.fn();
    const resolve = createModuleResolver({ stats, onDiagnostic });
    const from = workspace.file('packages/broken-refs/index.ts');
    expect(resolve('./leaf', from)).toBe(workspace.file('packages/broken-refs/leaf.ts'));
    expect(resolve('./leaf', from)).toBe(workspace.file('packages/broken-refs/leaf.ts'));
    expect(stats.diagnostics.filter(d => d.kind === 'tsconfig-fallback')).toHaveLength(1);
    expect(stats.diagnostics[0].message).toContain('without tsconfig');
    expect(onDiagnostic).toHaveBeenCalledWith(expect.objectContaining({ kind: 'tsconfig-fallback' }));
  });

  it.each([
    ['missing extends', '{ "extends": "../absent.json" }'],
    ['malformed config', '{ "compilerOptions": '],
  ])('does not silently retry %s', (_name, config) => {
    source('packages/invalid/tsconfig.json', config);
    const from = source('packages/invalid/index.ts', '');
    source('packages/invalid/leaf.ts', 'export const value = 1;');
    const stats = createResolverStats();
    expect(createModuleResolver({ stats })('./leaf', from)).toBeNull();
    expect(stats.diagnostics.some(d => d.kind === 'tsconfig-fallback')).toBe(false);
    expect(stats.diagnostics.some(d => d.kind === 'unresolved' || d.kind === 'error')).toBe(true);
  });

  it('does not retry a missing reference mentioned only in a comment', () => {
    const from = source('packages/invalid/index.ts', '');
    source('packages/invalid/leaf.ts', 'export const value = 1;');
    source(
      'packages/invalid/tsconfig.json',
      '{ "extends": "../absent.json" /* "references": [{"path":"../absent.json"}] */ }',
    );
    const stats = createResolverStats();
    expect(createModuleResolver({ stats })('./leaf', from)).toBeNull();
    expect(stats.diagnostics.some(d => d.kind === 'tsconfig-fallback')).toBe(false);
  });

  it('accepts JSONC references in the narrowly scoped fallback', () => {
    source('packages/broken-refs/tsconfig.json', '{ /* comment */ "references": [{ "path": "../does-not-exist", }], }');
    const stats = createResolverStats();
    expect(createModuleResolver({ stats })('./leaf', workspace.file('packages/broken-refs/index.ts'))).toBe(
      workspace.file('packages/broken-refs/leaf.ts'),
    );
    expect(stats.diagnostics.filter(d => d.kind === 'tsconfig-fallback')).toHaveLength(1);
  });

  it('does not warn for nested references that the resolver never needs to load', () => {
    source('packages/broken-refs/tsconfig.json', '{ "references": [{ "path": "../intermediate" }] }');
    source('packages/intermediate/tsconfig.json', '{ "references": [{ "path": "../does-not-exist" }] }');
    const stats = createResolverStats();
    expect(createModuleResolver({ stats })('./leaf', workspace.file('packages/broken-refs/index.ts'))).toBe(
      workspace.file('packages/broken-refs/leaf.ts'),
    );
    expect(stats.diagnostics.filter(d => d.kind === 'tsconfig-fallback')).toHaveLength(0);
  });

  it('keeps actionable diagnostics for malformed package metadata without guessing another target', () => {
    source('packages/entries/package.json', '{ "exports": ');
    const stats = createResolverStats();
    const onDiagnostic = jest.fn();
    expect(createModuleResolver({ stats, onDiagnostic })('@ws/entries', workspace.file(app))).toBeNull();
    expect(stats.unresolved.get('@ws/entries')).toBe(1);
    expect(onDiagnostic).toHaveBeenCalledWith(
      expect.objectContaining({ kind: expect.stringMatching(/^(error|unresolved)$/), message: expect.any(String) }),
    );
    expect(stats.diagnostics.some(d => d.kind === 'tsconfig-fallback')).toBe(false);
  });

  describe('conditional exports and ordered entry fields', () => {
    it('uses import/node/default conditions and module/main fields by default', () => {
      const stats = createResolverStats();
      const resolve = createModuleResolver({ stats });
      for (const name of ['typography', 'node', 'import']) {
        expect(resolve(`@ws/controls/${name}`, workspace.file(app))).toBe(
          workspace.file('packages/controls/lib/typography.js'),
        );
      }
      expect(resolve('@ws/entries', workspace.file(app))).toBe(workspace.file('packages/entries/esm/index.js'));
      expect(stats.conditionNames).toEqual(['import', 'node', 'default']);
      expect(stats.mainFields).toEqual(['module', 'main']);
    });

    it('activates source only when requested, keeps package key order and exposes the actual policy/target', () => {
      const stats = createResolverStats();
      const resolve = createModuleResolver({ additionalConditionNames: ['source', 'import', 'source'], stats });
      expect(resolve('@ws/controls/typography', workspace.file(app))).toBe(
        workspace.file('packages/controls/src/typography.ts'),
      );
      expect(resolve('@ws/controls/teaching-popover', workspace.file(app))).toBe(
        workspace.file('packages/controls/lib/teaching-popover.js'),
      );
      expect(stats.conditionNames).toEqual(['import', 'node', 'default', 'source']);
      expect(stats.diagnostics[0]).toEqual(
        expect.objectContaining({
          kind: 'resolved',
          target: workspace.file('packages/controls/src/typography.ts'),
          message: expect.stringContaining('import, node, default, source'),
        }),
      );
    });

    it('does not redirect unbuilt defaults to source, but source opt-in can resolve them', () => {
      const stats = createResolverStats();
      expect(createModuleResolver({ stats })('@ws/controls/search-box', workspace.file(app))).toBeNull();
      expect(stats.unresolved.get('@ws/controls/search-box')).toBe(1);
      expect(
        createModuleResolver({ additionalConditionNames: ['source'] })('@ws/controls/search-box', workspace.file(app)),
      ).toBe(workspace.file('packages/controls/src/search-box.ts'));
    });

    it.each([
      [['source', 'module', 'main'], 'src/index.ts'],
      [['main', 'source', 'module'], 'main/index.js'],
      [['module', 'source', 'main'], 'esm/index.js'],
    ])('respects mainFields replacement order %j', (mainFields, expected) => {
      expect(createModuleResolver({ mainFields })('@ws/entries', workspace.file(app))).toBe(
        workspace.file(`packages/entries/${expected}`),
      );
    });

    it('never bypasses exports restrictions with mainFields, even for missing/unexported subpaths', () => {
      const resolve = createModuleResolver({ mainFields: ['source'], additionalConditionNames: ['source'] });
      expect(resolve('@ws/controls', workspace.file(app))).toBeNull();
      expect(resolve('@ws/controls/not-exported', workspace.file(app))).toBeNull();
      expect(resolve('@ws/controls/lib/typography.js', workspace.file(app))).toBeNull();
      expect(resolve('@ws/controls/typography', workspace.file(app))).toBe(
        workspace.file('packages/controls/src/typography.ts'),
      );
      expect(createModuleResolver({ mainFields: ['source'] })('@ws/controls/typography', workspace.file(app))).toBe(
        workspace.file('packages/controls/lib/typography.js'),
      );
    });

    it.each(['declaration', 'declaration-mts', 'declaration-cts'])('excludes %s export targets', subpath => {
      const stats = createResolverStats();
      expect(createModuleResolver({ stats })(`@ws/controls/${subpath}`, workspace.file(app))).toBeNull();
      expect(stats.unsupportedTargets).toBe(1);
      expect(stats.diagnostics[0].kind).toBe('unsupported-target');
    });

    it('excludes declarations even when types is explicitly activated or selected as an entry field', () => {
      for (const options of [{ additionalConditionNames: ['types'] }, { mainFields: ['declaration'] }]) {
        const stats = createResolverStats();
        const specifier = 'mainFields' in options ? '@ws/entries' : '@ws/controls/typography';
        expect(createModuleResolver({ ...options, stats })(specifier, workspace.file(app))).toBeNull();
        expect(stats.unsupportedTargets).toBe(1);
      }
    });

    it.each([{}, [], ['src/index.ts'], 42, true, null])(
      'reports non-string selected main fields rather than guessing: %j',
      value => {
        source(
          'packages/entries/package.json',
          JSON.stringify({ name: '@ws/entries', type: 'module', source: value, main: './main/index.js' }),
        );
        const stats = createResolverStats();
        expect(
          createModuleResolver({ mainFields: ['source', 'main'], stats })('@ws/entries', workspace.file(app)),
        ).toBeNull();
        expect(stats.diagnostics[0]).toEqual(
          expect.objectContaining({ kind: 'unsupported-target', message: expect.stringContaining('non-string') }),
        );
      },
    );

    it('does not skip an unsupported field after a missing earlier string target', () => {
      source(
        'packages/entries/package.json',
        JSON.stringify({ name: '@ws/entries', source: './missing.ts', module: {}, main: './main/index.js' }),
      );
      const stats = createResolverStats();
      expect(
        createModuleResolver({ mainFields: ['source', 'module', 'main'], stats })('@ws/entries', workspace.file(app)),
      ).toBeNull();
      expect(stats.diagnostics[0]).toEqual(
        expect.objectContaining({ kind: 'unsupported-target', message: expect.stringContaining('"module"') }),
      );
    });
  });
});
