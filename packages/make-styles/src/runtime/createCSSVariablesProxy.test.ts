import { createCSSVariablesProxy, isProxy, resolveProxyValues } from './createCSSVariablesProxy';
import { expand } from 'inline-style-expand-shorthand';

describe('createCSSVariablesProxy', () => {
  it('should be able to identify as a proxy', () => {
    const proxy = createCSSVariablesProxy() as object;
    expect(isProxy(proxy)).toEqual(true);
  });
  it('should allow recursive string creation', () => {
    const proxy = createCSSVariablesProxy() as { to: { string: object } };
    expect(proxy.to.string.toString()).toStrictEqual('var(--to-string)');
  });
  it('should support prefixing', () => {
    const proxy = createCSSVariablesProxy('prefix') as { to: { string: object } };
    expect(proxy.to.string.toString()).toStrictEqual('var(--prefix-to-string)');
  });
  it('should be able to expand objects containing proxies as properties', () => {
    const proxy = createCSSVariablesProxy() as { to: { string: object } };
    expect(Array.isArray(proxy)).toEqual(false);
    const expanded = expand(
      resolveProxyValues({
        padding: proxy.to.string,
        animationName: {
          from: {
            transform: proxy.to.string,
          },
          to: {
            transform: proxy.to.string,
          },
        },
        animationIterationCount: proxy.to.string,
        animationDuration: proxy.to.string,
      }),
    );
    expect(expanded).toEqual({
      paddingTop: 'var(--to-string)',
      paddingRight: 'var(--to-string)',
      paddingBottom: 'var(--to-string)',
      paddingLeft: 'var(--to-string)',
      animationName: {
        from: {
          transform: 'var(--to-string)',
        },
        to: {
          transform: 'var(--to-string)',
        },
      },
      animationIterationCount: 'var(--to-string)',
      animationDuration: 'var(--to-string)',
    });
  });
});
