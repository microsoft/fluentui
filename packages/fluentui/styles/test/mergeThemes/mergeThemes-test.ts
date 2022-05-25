import {
  ComponentStyleFunctionParam,
  ICSSInJSStyle,
  mergeThemes,
  mergeStyles,
  ThemeInput,
  withDebugId,
  emptyTheme,
} from '@fluentui/styles';

import * as debugEnabled from '../../src/debugEnabled';

const styleParam: ComponentStyleFunctionParam = {
  disableAnimations: false,
  props: {},
  rtl: false,
  theme: emptyTheme,
  variables: {},
};

describe('mergeThemes', () => {
  test(`always returns an object`, () => {
    expect(mergeThemes({}, {})).toMatchObject({});
    expect(mergeThemes(undefined, undefined)).toMatchObject({});

    expect(mergeThemes({}, undefined)).toMatchObject({});
    expect(mergeThemes(undefined, {})).toMatchObject({});
  });

  test('gracefully handles merging a theme in with undefined values', () => {
    const target = {
      siteVariables: { color: 'black' },
      componentVariables: { Button: { color: 'black' } },
      componentStyles: { Button: { root: { color: 'black' } } },
      rtl: true,
    };
    const source = {
      siteVariables: undefined,
      componentVariables: undefined,
      componentStyles: undefined,
      rtl: undefined,
    };
    expect(() => mergeThemes(target, source)).not.toThrow();
  });

  test('gracefully handles merging onto a theme with undefined values', () => {
    const target = {
      siteVariables: undefined,
      componentVariables: undefined,
      componentStyles: undefined,
      rtl: undefined,
    };
    const source = {
      siteVariables: { color: 'black' },
      componentVariables: { Button: { color: 'black' } },
      componentStyles: { Button: { root: { color: 'black' } } },
      rtl: true,
    };
    expect(() => mergeThemes(target, source)).not.toThrow();
  });

  describe('siteVariables', () => {
    test('merges top level keys', () => {
      const target = { siteVariables: { overridden: false, keep: true } };
      const source = { siteVariables: { overridden: true, add: true } };

      expect(mergeThemes(target, source)).toMatchObject({
        siteVariables: { overridden: true, keep: true, add: true },
      });
    });

    test('deep merges nested keys', () => {
      const target = { siteVariables: { nested: { replaced: false, deep: { dOne: 1 } } } };
      const source = { siteVariables: { nested: { other: 'value', deep: { dTwo: 'two' } } } };

      expect(mergeThemes(target, source)).toMatchObject({
        siteVariables: {
          nested: { replaced: false, other: 'value', deep: { dOne: 1, dTwo: 'two' } },
        },
      });
    });
  });

  describe('componentVariables', () => {
    test('component names are merged', () => {
      const target = { componentVariables: { Button: {} } };
      const source = { componentVariables: { Icon: {} } };

      const merged = mergeThemes(target, source);

      expect(merged.componentVariables).toHaveProperty('Button');
      expect(merged.componentVariables).toHaveProperty('Icon');
    });

    test('objects are converted to functions', () => {
      const target = { componentVariables: { Button: { color: 'red' } } };
      const source = { componentVariables: { Icon: { color: 'blue' } } };

      const merged = mergeThemes(target, source);

      expect(merged.componentVariables.Button).toBeInstanceOf(Function);
      expect(merged.componentVariables.Icon).toBeInstanceOf(Function);
    });

    test('functions return merged variables', () => {
      const target = { componentVariables: { Button: () => ({ one: 1, three: 3 }) } };
      const source = {
        componentVariables: { Button: () => ({ one: 'one', two: 'two' }) },
      };

      const merged = mergeThemes(target, source);

      expect(merged.componentVariables.Button()).toMatchObject({
        one: 'one',
        two: 'two',
        three: 3,
      });
    });

    test('variables are deep merged', () => {
      const target = {
        componentVariables: {
          Button: () => ({ one: { nestedOne: 1, nestedThree: 3, deep: { dOne: 1 } } }),
        },
      };
      const source = {
        componentVariables: {
          Button: () => ({ one: { nestedOne: 'one', nestedTwo: 'two', deep: { dTwo: 'two' } } }),
        },
      };

      const merged = mergeThemes(target, source);

      expect(merged.componentVariables.Button()).toMatchObject({
        one: {
          nestedOne: 'one',
          nestedTwo: 'two',
          nestedThree: 3,
          deep: { dOne: 1, dTwo: 'two' },
        },
      });
    });

    test('functions accept and apply siteVariables', () => {
      const target = {
        componentVariables: {
          Button: siteVariables => ({ one: 1, target: true, ...siteVariables }),
        },
      };

      const source = {
        componentVariables: {
          Button: siteVariables => ({ two: 2, source: true, ...siteVariables }),
        },
      };

      const merged = mergeThemes(target, source);

      const siteVariables = { one: 'one', two: 'two', fontSizes: {} };

      expect(merged.componentVariables.Button(siteVariables)).toMatchObject({
        one: 'one',
        two: 'two',
        source: true,
        target: true,
      });
    });
  });

  describe('componentStyles', () => {
    test('component names are merged', () => {
      const target = { componentStyles: { Button: {} } };
      const source = { componentStyles: { Icon: {} } };

      const merged = mergeThemes(target, source);

      expect(merged.componentStyles).toHaveProperty('Button');
      expect(merged.componentStyles).toHaveProperty('Icon');
    });

    test('component parts with style properties are merged', () => {
      const target = { componentStyles: { Button: { root: { color: 'red' } } } };
      const source = { componentStyles: { Icon: { root: { color: 'red' } } } };

      const merged = mergeThemes(target, source);

      expect(merged.componentStyles.Button).toHaveProperty('root');
      expect(merged.componentStyles.Icon).toHaveProperty('root');
    });

    test('converts merged component parts to functions', () => {
      const target = { componentStyles: { Button: { root: { color: 'red' } } } };
      const source = { componentStyles: { Icon: { root: { color: 'red' } } } };

      const merged = mergeThemes(target, source);

      expect(merged.componentStyles.Button?.root).toBeInstanceOf(Function);
      expect(merged.componentStyles.Icon?.root).toBeInstanceOf(Function);
    });

    test('converts target only component parts to functions', () => {
      const target = { componentStyles: { Button: { root: { color: 'red' } } } };
      const merged = mergeThemes(undefined, target);

      expect(merged.componentStyles.Button?.root).toBeInstanceOf(Function);
    });

    test('component part styles are deeply merged', () => {
      const target = {
        componentStyles: {
          Button: {
            root: {
              display: 'inline-block',
              color: 'green',
              '::before': {
                content: 'before content',
              },
            },
          },
        },
      };

      const source = {
        componentStyles: {
          Button: {
            root: {
              color: 'blue',
              '::before': {
                color: 'red',
              },
            },
          },
        },
      };

      const merged = mergeThemes(target, source);

      expect(merged.componentStyles.Button?.root(styleParam)).toMatchObject({
        display: 'inline-block',
        color: 'blue',
        '::before': {
          content: 'before content',
          color: 'red',
        },
      });
    });

    test('functions can accept and apply params', () => {
      const target = {
        componentStyles: {
          Button: {
            root: param => ({ target: true, ...param }),
          },
        },
      };

      const source = {
        componentStyles: {
          Button: {
            root: param => ({ source: true, ...param }),
          },
        },
      };

      const merged = mergeThemes(target, source);

      const styleParam: ComponentStyleFunctionParam = {
        variables: { iconSize: 'large' },
        props: { primary: true },
      } as any;

      expect(merged.componentStyles.Button?.root(styleParam)).toMatchObject({
        source: true,
        target: true,
        ...styleParam,
      });
    });
  });

  describe('font faces', () => {
    test('returns a compact array', () => {
      expect(
        mergeThemes(
          { fontFaces: undefined },
          {
            fontFaces: [
              {
                name: 'Segoe UI',
                paths: ['public/fonts/segoe-ui-regular.woff2'],
                props: { fontWeight: 400 },
              },
              {
                name: 'Segoe UI',
                paths: ['public/fonts/segoe-ui-semibold.woff2'],
                props: { fontWeight: 600 },
              },
            ],
          },
        ),
      ).toMatchObject({
        fontFaces: [
          {
            name: 'Segoe UI',
            paths: ['public/fonts/segoe-ui-regular.woff2'],
            props: { fontWeight: 400 },
          },
          {
            name: 'Segoe UI',
            paths: ['public/fonts/segoe-ui-semibold.woff2'],
            props: { fontWeight: 600 },
          },
        ],
      });
    });
  });

  describe('static styles', () => {
    test('returns a compact array', () => {
      expect(
        mergeThemes(
          { staticStyles: undefined },
          { staticStyles: [{ body: { color: 'red' } }, '*{box-sizing:border-box;}'] },
        ),
      ).toMatchObject({
        staticStyles: [{ body: { color: 'red' } }, '*{box-sizing:border-box;}'],
      });
    });
  });

  describe('styles', () => {
    test('merges styles object and function', () => {
      const stylesAsObject: ICSSInJSStyle = {
        margin: '0px',
        color: 'override',
        ':hover': {
          margin: '0px',
          color: 'override',
        },
      };

      const stylesAsFunction = () => ({
        color: 'black',
        ':hover': {
          color: 'blue',
        },
      });

      expect(mergeStyles(stylesAsObject, stylesAsFunction)()).toMatchObject({
        margin: '0px',
        color: 'black',
        ':hover': {
          margin: '0px',
          color: 'blue',
        },
      });
    });

    test('merges styles function and object', () => {
      const stylesAsFunction = () => ({
        margin: '0px',
        color: 'override',
        ':hover': {
          margin: '0px',
          color: 'override',
        },
      });

      const stylesAsObject = {
        color: 'black',
        ':hover': {
          color: 'blue',
        },
      };

      expect(mergeStyles(stylesAsFunction, stylesAsObject)()).toMatchObject({
        margin: '0px',
        color: 'black',
        ':hover': {
          margin: '0px',
          color: 'blue',
        },
      });
    });
  });

  describe('debug frames', () => {
    let originalDebugEnabled;

    beforeEach(() => {
      originalDebugEnabled = debugEnabled.isEnabled;
    });

    afterEach(() => {
      Object.defineProperty(debugEnabled, 'isEnabled', {
        get: () => originalDebugEnabled,
      });
    });

    function mockIsDebugEnabled(enabled: boolean) {
      Object.defineProperty(debugEnabled, 'isEnabled', {
        get: jest.fn(() => enabled),
      });
    }

    test('are saved if debug is enabled', () => {
      mockIsDebugEnabled(true);
      const target: ThemeInput = {
        siteVariables: { varA: 'tVarA' },
        componentVariables: { Button: { btnVar: 'tBtnVar' } },
        componentStyles: { Button: { root: { style: 'tStyleA' } } },
      };
      const source: ThemeInput = {
        siteVariables: { varA: 'sVarA' },
        componentVariables: { Button: sv => ({ btnVar: sv.varA }) },
        componentStyles: { Button: { root: ({ variables }) => ({ style: variables.btnVar }) } },
      };

      const merged = mergeThemes(target, source);

      expect(merged.siteVariables).toMatchObject({
        _debug: [{ resolved: { varA: 'tVarA' } }, { resolved: { varA: 'sVarA' } }],
      });

      const buttonVariables = merged.componentVariables.Button(merged.siteVariables);
      expect(buttonVariables).toMatchObject({
        _debug: [{ resolved: { btnVar: 'tBtnVar' } }, { resolved: { btnVar: 'sVarA' } }],
      });

      const buttonRootStyles = merged.componentStyles.Button?.root({
        variables: buttonVariables,
      } as any);
      expect(buttonRootStyles).toMatchObject({
        _debug: [{ styles: { style: 'tStyleA' } }, { styles: { style: 'sVarA' } }],
      });
    });

    test('are not saved if debug is disabled', () => {
      mockIsDebugEnabled(false);
      const target: ThemeInput = {
        siteVariables: { varA: 'tVarA' },
        componentVariables: { Button: { btnVar: 'tBtnVar' } },
        componentStyles: { Button: { root: { style: 'tStyleA' } } },
      };
      const source = {
        siteVariables: { varA: 'sVarA' },
        componentVariables: { Button: sv => ({ btnVar: sv.varA }) },
        componentStyles: { Button: { root: ({ variables }) => ({ style: variables.btnVar }) } },
      };

      const merged = mergeThemes(target, source);
      expect(merged.siteVariables._debug).toBe(undefined);
      const buttonVariables = merged.componentVariables.Button(merged.siteVariables);
      expect(buttonVariables._debug).toBe(undefined);
      const buttonRootStyles = merged.componentStyles.Button?.root({
        variables: buttonVariables,
      } as any);
      expect((buttonRootStyles as any)._debug).toBe(undefined);
    });

    test('contain debugId', () => {
      mockIsDebugEnabled(true);
      const target: ThemeInput = withDebugId(
        {
          siteVariables: { varA: 'tVarA' },
          componentVariables: { Button: { btnVar: 'tBtnVar' } },
          componentStyles: { Button: { root: { style: 'tStyleA' } } },
        },
        'target',
      );
      const source = withDebugId(
        {
          siteVariables: { varA: 'sVarA' },
          componentVariables: { Button: sv => ({ btnVar: sv.varA }) },
          componentStyles: { Button: { root: ({ variables }) => ({ style: variables.btnVar }) } },
        },
        'source',
      );

      const merged = mergeThemes(target, source);

      expect(merged.siteVariables).toMatchObject({
        _debug: [{ debugId: 'target' }, { debugId: 'source' }],
      });

      const buttonVariables = merged.componentVariables.Button(merged.siteVariables);
      expect(buttonVariables).toMatchObject({
        _debug: [{ debugId: 'target' }, { debugId: 'source' }],
      });

      const buttonRootStyles = merged.componentStyles.Button?.root({
        variables: buttonVariables,
      } as any);
      expect(buttonRootStyles).toMatchObject({
        _debug: [{ debugId: 'target' }, { debugId: 'source' }],
      });
    });
  });

  // This test is disabled by default
  // It's purpose is to be executed manually to measure performance of mergeThemes
  // xdescribe('performance', () => {
  //   let originalDebugEnabled
  //
  //   beforeEach(() => {
  //     originalDebugEnabled = debugEnabled.isEnabled
  //   })
  //
  //   afterEach(() => {
  //     Object.defineProperty(debugEnabled, 'isEnabled', {
  //       get: () => originalDebugEnabled,
  //     })
  //   })
  //
  //   function mockIsDebugEnabled(enabled: boolean) {
  //     Object.defineProperty(debugEnabled, 'isEnabled', {
  //       get: jest.fn(() => enabled),
  //     })
  //   }
  //
  //   test('100 themes with debug disabled', () => {
  //     mockIsDebugEnabled(false)
  //
  //     const merged = mergeThemes(..._.times(100, n => themes.teams))
  //     const resolvedStyles = _.mapValues(
  //       merged.componentStyles,
  //       (componentStyle, componentName) => {
  //         const compVariables = _.get(
  //           merged.componentVariables,
  //           componentName,
  //           callable({}),
  //         )(merged.siteVariables)
  //         const styleParam: ComponentStyleFunctionParam = {
  //           displayName: componentName,
  //           props: {},
  //           variables: compVariables,
  //           theme: merged,
  //           rtl: false,
  //           disableAnimations: false,
  //         }
  //         return _.mapValues(componentStyle, (partStyle, partName) => {
  //           if (partName === '_debug') {
  //             // TODO: fix in code, happens only with mergeThemes(singleTheme)
  //             return undefined
  //           }
  //           if (typeof partStyle !== 'function') {
  //             fail(`Part style is not a function??? ${componentName} ${partStyle} ${partName}`)
  //           }
  //           return partStyle(styleParam)
  //         })
  //       },
  //     )
  //     expect(resolvedStyles.Button.root).toMatchObject({})
  //     // console.log(resolvedStyles.Button.root)
  //   })
  // })
});
