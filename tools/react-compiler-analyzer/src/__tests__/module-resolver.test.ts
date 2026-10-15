import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { createModuleResolver, compilePathAliases, createResolverStats, findDeadAliases } from '../module-resolver';

const FIXTURES = join(__dirname, '__fixtures__', 'risk', 'wrappers');
const COMPONENT = join(FIXTURES, 'component.tsx');

describe('createModuleResolver', () => {
  const resolve = createModuleResolver();

  it('resolves a relative specifier with extension inference', () => {
    expect(resolve('./store', COMPONENT)).toBe(join(FIXTURES, 'store.ts'));
  });

  describe('tsconfig path alias matching', () => {
    let root: string;

    beforeEach(() => {
      root = mkdtempSync(join(tmpdir(), 'rca-aliases-'));
    });

    afterEach(() => {
      rmSync(root, { recursive: true, force: true });
    });

    function sourceFile(path: string): string {
      const absolutePath = join(root, path);
      mkdirSync(dirname(absolutePath), { recursive: true });
      writeFileSync(absolutePath, 'export const value = 1;\n');
      return absolutePath;
    }

    it.each(['button', 'group/button', '$&'])('substitutes %s within a target path', name => {
      const filePath = sourceFile(`packages/${name}/src/index.tsx`);
      const aliases = compilePathAliases({ '@app/*': ['packages/*/src'] }, root);
      const stats = createResolverStats();
      const resolve = createModuleResolver({ aliases, stats });

      expect(resolve(`@app/${name}`, COMPONENT)).toBe(filePath);
      expect(findDeadAliases(aliases)).toEqual([]);
      expect(stats.resolved).toBe(1);
      expect(stats.aliasHits.get('@app/')).toBe(1);
    });

    it.each(['button', '$&'])('substitutes %s literally at every target wildcard', name => {
      const filePath = sourceFile(`packages/${name}/generated/${name}/src/index.tsx`);
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ '@app/*': ['packages/*/generated/*/src'] }, root),
      });

      expect(resolve(`@app/${name}`, COMPONENT)).toBe(filePath);
    });

    it('matches the whole alias pattern and substitutes only its wildcard', () => {
      const filePath = sourceFile('packages/button/src/index.ts');
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ '@app/*/view': ['packages/*/src'] }, root),
      });
      expect(resolve('@app/button/view', COMPONENT)).toBe(filePath);
      expect(resolve('@app/button', COMPONENT)).toBeNull();
      expect(resolve('@app/button/view/extra', COMPONENT)).toBeNull();
      expect(resolve('@other/button/view', COMPONENT)).toBeNull();
    });

    it('tracks suffixed patterns with a shared prefix separately', () => {
      sourceFile('packages/button/src/index.ts');
      const stats = createResolverStats();
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ '@app/*/view': ['packages/*/src'], '@app/*/unused': ['packages/*/src'] }, root),
        stats,
      });
      resolve('@app/button/view', COMPONENT);
      expect(stats.aliasHits).toEqual(
        new Map([
          ['@app/*/view', 1],
          ['@app/*/unused', 0],
        ]),
      );
    });

    it('allows an empty wildcard but does not overlap prefix and suffix', () => {
      const filePath = sourceFile('index.ts');
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ 'app*app': ['index.ts'] }, root),
      });
      expect(resolve('appapp', COMPONENT)).toBe(filePath);
      expect(resolve('app', COMPONENT)).toBeNull();
    });

    it('uses a fixed target without appending the wildcard capture', () => {
      const filePath = sourceFile('shared/index.ts');
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ '@app/*': ['shared/index.ts'] }, root),
      });
      expect(resolve('@app/button', COMPONENT)).toBe(filePath);
    });

    it('tries targets in declaration order, falling back only when the file is missing', () => {
      const first = sourceFile('first/button/src.ts');
      sourceFile('second/button/src.ts');
      const fallback = sourceFile('second/other/src.ts');
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ '@app/*': ['first/*/src', 'second/*/src'] }, root),
      });
      expect(resolve('@app/button', COMPONENT)).toBe(first);
      expect(resolve('@app/other', COMPONENT)).toBe(fallback);
    });

    it('prefers an exact alias over a wildcard with the same prefix length', () => {
      sourceFile('wildcard/index.ts');
      const exact = sourceFile('exact.ts');
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ '@app*': ['wildcard/*'], '@app': ['exact.ts'] }, root),
      });
      expect(resolve('@app', COMPONENT)).toBe(exact);
    });

    it('uses the longest matching prefix even when a shorter alias appears first', () => {
      sourceFile('broad/button/view.ts');
      const specific = sourceFile('specific/view.ts');
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ '@app/*': ['broad/*'], '@app/button/*': ['specific/*'] }, root),
      });
      expect(resolve('@app/button/view', COMPONENT)).toBe(specific);
    });

    it.each<Record<string, string[]>>([
      { '@app/*': ['fallback/*'], '@app/button/*': ['missing/*'] },
      { '@app/*': ['fallback/*'], '@app/button/view': ['missing.ts'] },
    ])('does not fall through to a broader alias when the selected alias has no file: %j', paths => {
      sourceFile('fallback/button/view.ts');
      const resolve = createModuleResolver({ aliases: compilePathAliases(paths, root) });
      expect(resolve('@app/button/view', COMPONENT)).toBeNull();
    });

    it('preserves declaration order when matching wildcard prefixes have equal length', () => {
      const first = sourceFile('first/button/view.ts');
      sourceFile('second/button.ts');
      const resolve = createModuleResolver({
        aliases: compilePathAliases({ '@app/*': ['first/*'], '@app/*/view': ['second/*'] }, root),
      });
      expect(resolve('@app/button/view', COMPONENT)).toBe(first);
    });

    it('only marks wildcard targets dead when their static parent directory is absent', () => {
      mkdirSync(join(root, 'packages'));
      const aliases = compilePathAliases(
        {
          '@live/*': ['packages/*/src'],
          '@partial/*': ['packages/pkg-*/src'],
          '@mixed/*': ['missing/*/src', 'packages/*/src'],
          '@dead/*': ['missing/*/src'],
        },
        root,
      );
      expect(findDeadAliases(aliases).map(alias => alias.prefix)).toEqual(['@dead/']);
    });

    it('does not mark an extensionless exact file target dead', () => {
      sourceFile('store.ts');
      expect(findDeadAliases(compilePathAliases({ '@store': ['store'] }, root))).toEqual([]);
    });
  });

  it('resolves a relative directory to its index file', () => {
    expect(resolve('./index', COMPONENT)).toBe(join(FIXTURES, 'index.ts'));
    // bare folder reference also resolves to index
    expect(resolve('.', join(FIXTURES, 'store.ts'))).toBe(join(FIXTURES, 'index.ts'));
  });

  it('returns null for a bare package specifier (node_modules boundary)', () => {
    expect(resolve('react', COMPONENT)).toBeNull();
    expect(resolve('@scope/pkg', COMPONENT)).toBeNull();
  });

  it('returns null for an unresolvable relative path', () => {
    expect(resolve('./does-not-exist', COMPONENT)).toBeNull();
  });

  it('resolves configured wildcard path aliases', () => {
    const aliases = compilePathAliases({ '@wrappers/*': ['*'] }, FIXTURES);
    const withAlias = createModuleResolver({ aliases });
    expect(withAlias('@wrappers/store', COMPONENT)).toBe(join(FIXTURES, 'store.ts'));
  });

  it('prefers the longest matching alias prefix', () => {
    const aliases = compilePathAliases({ '@w/*': ['other/*'], '@w/store': ['store.ts'] }, FIXTURES);
    const withAlias = createModuleResolver({ aliases });
    // exact `@w/store` alias wins over the `@w/*` wildcard
    expect(withAlias('@w/store', COMPONENT)).toBe(join(FIXTURES, 'store.ts'));
  });
});
