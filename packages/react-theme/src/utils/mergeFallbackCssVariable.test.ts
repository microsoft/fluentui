import { mergeFallbackCssVariable } from './mergeFallbackCssVariable';

describe('mergeFallbackCssVariable', () => {
  it('adds a fallback to a var()', () => {
    expect(mergeFallbackCssVariable('var(--x)', 'y')).toEqual('var(--x, y)');
    expect(mergeFallbackCssVariable(' var(something) ', 'else')).toEqual('var(something, else)');
    expect(mergeFallbackCssVariable('var(--123.xyc-5_final.v2)', '456.$$-oops_final-final.v3')).toEqual(
      'var(--123.xyc-5_final.v2, 456.$$-oops_final-final.v3)',
    );
    expect(mergeFallbackCssVariable('var(--x)', 'var(--y, z)')).toEqual('var(--x, var(--y, z))');
  });
  it('replaces an existing fallback', () => {
    expect(mergeFallbackCssVariable('var(--x, y)', 'z')).toEqual('var(--x, z)');
  });
  it('creates a var() with fallback from a css --prop', () => {
    expect(mergeFallbackCssVariable('--x', 'y')).toEqual('var(--x, y)');
    expect(mergeFallbackCssVariable('something', 'var(--else)')).toEqual('var(something, var(--else))');
  });
  it('returns only the fallback with a missing cssVariable', () => {
    expect(mergeFallbackCssVariable(undefined, 'fallback')).toEqual('fallback');
    expect(mergeFallbackCssVariable(null as any, 'fallback')).toEqual('fallback');
    expect(mergeFallbackCssVariable('', 'fallback')).toEqual('fallback');
    expect(mergeFallbackCssVariable('var()', 'fallback')).toEqual('fallback');
    expect(mergeFallbackCssVariable('var( )', 'fallback')).toEqual('fallback');
    expect(mergeFallbackCssVariable(' ', 'fallback')).toEqual('fallback');
    expect(mergeFallbackCssVariable({} as any, 'fallback')).toEqual('fallback');
  });
  it('returns the original cssVariable with no fallback', () => {
    expect(mergeFallbackCssVariable('var(--x)', undefined)).toEqual('var(--x)');
    expect(mergeFallbackCssVariable('#333', undefined)).toEqual('#333');
  });
});
