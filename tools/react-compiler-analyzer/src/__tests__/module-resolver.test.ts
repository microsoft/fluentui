import { join } from 'path';

import { createModuleResolver, compilePathAliases } from '../module-resolver';

const FIXTURES = join(__dirname, '__fixtures__', 'risk', 'wrappers');
const COMPONENT = join(FIXTURES, 'component.tsx');

describe('createModuleResolver', () => {
  const resolve = createModuleResolver();

  it('resolves a relative specifier with extension inference', () => {
    expect(resolve('./store', COMPONENT)).toBe(join(FIXTURES, 'store.ts'));
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
