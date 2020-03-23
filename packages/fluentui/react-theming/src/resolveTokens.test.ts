import { resolveTokens } from './resolveTokens';
import { ITheme, IColorRamp, IThemeColorDefinition } from './theme.types';

const reifyTheme = (partial: Partial<ITheme>): ITheme => {
  const result = { components: {}, ...partial };

  return result as ITheme;
};

const reifyColors = (partial: Partial<IThemeColorDefinition>): IThemeColorDefinition => {
  const defaultRamp: IColorRamp = { values: [], index: -1 };
  const result: Partial<IThemeColorDefinition> = {
    background: '#000',
    brand: defaultRamp,
    accent: defaultRamp,
    neutral: defaultRamp,
    success: defaultRamp,
    warning: defaultRamp,
    danger: defaultRamp,
    ...partial,
  };
  return result as IThemeColorDefinition;
};

describe('resolveTokens', () => {
  it('can resolve a literal', () => {
    expect(resolveTokens('', reifyTheme({}), [{ value: 'abc' }])).toEqual({
      value: 'abc',
    });
  });

  it('can resolve a color from the theme', () => {
    expect(
      resolveTokens(
        '',
        reifyTheme({
          colors: reifyColors({
            brand: {
              index: 1,
              values: ['#aaa', '#bbb', '#ccc'],
            },
          }),
        }),
        [
          {
            value: (_: any, t: ITheme) => t.colors.brand.values[t.colors.brand.index],
          },
        ],
      ),
    ).toEqual({ value: '#bbb' });
  });

  it('can resolve a token related to another', () => {
    expect(
      resolveTokens('', reifyTheme({}), [
        {
          value: 'abc',
          value2: {
            dependsOn: ['value'],
            resolve: ([value]: any, theme: any) => `${value}def`,
          },
        },
      ]),
    ).toEqual({ value: 'abc', value2: 'abcdef' });
  });

  it('can resolve a token related to a late resolving dependency', () => {
    expect(
      resolveTokens(
        '',
        reifyTheme({
          colors: reifyColors({
            brand: {
              index: 1,
              values: ['#aaa', '#bbb', '#ccc'],
            },
          }),
        }),
        [
          {
            value2: {
              dependsOn: ['value'],
              resolve: ([value]: any, theme: ITheme) => `${value}def`,
            },
            value: (_: any, t: ITheme) => t.colors.brand.values[0],
          },
        ],
      ),
    ).toEqual({ value: '#aaa', value2: '#aaadef' });
  });

  describe('theme overrides', () => {
    it('pulls overrides from theme', () => {
      const theme = reifyTheme({
        components: {
          MyComponent: {
            tokens: {
              value: 'bar',
            },
          },
        },
      });
      expect(resolveTokens('MyComponent', theme, [{ value: 'foo' }])).toEqual({
        value: 'bar',
      });
    });

    it('lets the theme declare interdependent tokens', () => {
      const theme: ITheme = reifyTheme({
        components: {
          MyComponent: {
            tokens: {
              value2: {
                dependsOn: ['value'],
                resolve: ([value]: any, theme: ITheme) => `${value}bar`,
              },
            },
          },
        },
      });
      const baseTokens = {
        value: 'foo',
        value2: {
          dependsOn: ['value'],
          resolve: ([value]: any, theme: ITheme) => `${value}foo`,
        },
      };
      const result = resolveTokens('MyComponent', theme, [baseTokens]);
      expect(result).toEqual({ value: 'foo', value2: 'foobar' });
    });
  });
});
