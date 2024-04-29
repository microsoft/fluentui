import { ComponentStyleFunctionParam, emptyTheme, withDebugId } from '@fluentui/styles';

import * as debugEnabled from '../../src/debugEnabled';
import { mergeComponentStyles__PROD, mergeComponentStyles__DEV } from '../../src/mergeThemes';

const styleParam: ComponentStyleFunctionParam = {
  disableAnimations: false,
  props: {},
  rtl: false,
  theme: emptyTheme,
  variables: {},
};

describe('mergeComponentStyles', () => {
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

  function testMergeComponentStyles(mergeComponentStyles: typeof mergeComponentStyles__PROD) {
    test(`always returns an object`, () => {
      expect(mergeComponentStyles({}, {})).toMatchObject({});
      expect(mergeComponentStyles(null, null)).toMatchObject({});
      expect(mergeComponentStyles(undefined, undefined)).toMatchObject({});

      expect(mergeComponentStyles(null, undefined)).toMatchObject({});
      expect(mergeComponentStyles(undefined, null)).toMatchObject({});

      expect(mergeComponentStyles({}, undefined)).toMatchObject({});
      expect(mergeComponentStyles(undefined, {})).toMatchObject({});

      expect(mergeComponentStyles({}, null)).toMatchObject({});
      expect(mergeComponentStyles(null, {})).toMatchObject({});
    });

    test('gracefully handles undefined', () => {
      const styles = { root: { color: 'black' } };
      const stylesWithUndefined = { root: { color: undefined }, icon: undefined };

      expect(() => mergeComponentStyles(styles, null)).not.toThrow();
      expect(() => mergeComponentStyles(null, styles)).not.toThrow();

      expect(() => mergeComponentStyles(styles, undefined)).not.toThrow();

      expect(() => mergeComponentStyles(styles, stylesWithUndefined)).not.toThrow();

      expect(() => mergeComponentStyles(undefined, styles)).not.toThrow();

      expect(() => mergeComponentStyles(stylesWithUndefined, styles)).not.toThrow();
    });

    test('component parts with style properties are merged', () => {
      const target = { root: { color: 'red' } };
      const source = { icon: { color: 'red' } };

      const merged = mergeComponentStyles(target, source);

      expect(merged).toHaveProperty('root');
      expect(merged).toHaveProperty('icon');
    });

    test('converts merged component parts to functions', () => {
      const target = { root: { color: 'red' } };
      const source = { root: { color: 'red' } };

      const merged = mergeComponentStyles(target, source);

      expect(merged.root).toBeInstanceOf(Function);
    });

    test('converts target only component parts to functions', () => {
      const target = { root: { color: 'red' } };
      const merged = mergeComponentStyles(undefined, target);

      expect(merged.root).toBeInstanceOf(Function);
    });

    test('component part styles are deeply merged', () => {
      const target = {
        root: {
          display: 'inline-block',
          color: 'green',
          '::before': {
            content: 'before content',
          },
        },
      };
      const source = {
        root: {
          color: 'blue',
          '::before': {
            color: 'red',
          },
        },
      };
      const merged = mergeComponentStyles(target, source);

      const styleFunctionParams = {
        props: {},
        variables: {},
        theme: emptyTheme,
        disableAnimations: false,
        rtl: false,
      };

      expect(merged.root(styleFunctionParams)).toMatchObject({
        display: 'inline-block',
        color: 'blue',
        '::before': {
          content: 'before content',
          color: 'red',
        },
      });
    });

    test('functions can accept and apply params', () => {
      const target = { root: param => ({ target: true, ...param }) };
      const source = { root: param => ({ source: true, ...param }) };

      const merged = mergeComponentStyles(target, source);

      const styleParam: ComponentStyleFunctionParam = {
        variables: { iconSize: 'large' },
        props: { primary: true },
      } as any;

      expect(merged.root(styleParam)).toMatchObject({
        source: true,
        target: true,
        ...styleParam,
      });
    });
  }

  describe('prod version', () => {
    beforeEach(() => {
      mockIsDebugEnabled(true); // it is not possible to enable debug in prod
    });

    testMergeComponentStyles(mergeComponentStyles__PROD);

    test('debug frames are not saved', () => {
      const target = { root: { a: 'tA', b: 'tB' } };
      const source = { root: { a: 'sA', c: { deep: 'c' } } };

      const merged = mergeComponentStyles__PROD(target, source);

      const resolvedRoot = merged.root(styleParam);
      expect((resolvedRoot as any)._debug).toBe(undefined);
    });

    test('keeps references if possible', () => {
      const styleRoot = jest.fn();

      const firstMerge = mergeComponentStyles__PROD({ root: styleRoot }, { root: styleRoot });
      const secondMerge = mergeComponentStyles__PROD(firstMerge, { root: styleRoot });

      expect(secondMerge.root).toBe(styleRoot);

      secondMerge.root(styleParam);
      expect(styleRoot).toHaveBeenCalledTimes(1);
    });
  });

  describe('dev version, debug disabled', () => {
    beforeEach(() => {
      mockIsDebugEnabled(false);
    });

    testMergeComponentStyles(mergeComponentStyles__DEV);

    test('debug frames are not saved', () => {
      const target = { root: { a: 'tA', b: 'tB' } };
      const source = { root: { a: 'sA', c: { deep: 'c' } } };

      const merged = mergeComponentStyles__DEV(target, source);

      const resolvedRoot = merged.root(styleParam);
      expect((resolvedRoot as any)._debug).toBe(undefined);
    });
  });

  describe('dev version, debug enabled', () => {
    beforeEach(() => {
      mockIsDebugEnabled(true);
    });

    testMergeComponentStyles(mergeComponentStyles__DEV);

    describe('debug frames', () => {
      test('are saved', () => {
        const target = { root: { a: 'tA', b: 'tB' } };
        const source = {
          root: ({ variables }) => ({ a: 'sA', c: { deep: variables.varC } }),
          icon: { d: 'sD' },
        };

        const merged = mergeComponentStyles__DEV(target, source);

        const resolvedRoot = merged.root({ variables: { varC: 'vC' } } as any);
        expect(resolvedRoot).toMatchObject({
          _debug: [{ styles: { a: 'tA', b: 'tB' } }, { styles: { a: 'sA', c: { deep: 'vC' } } }],
        });

        const resolvedIcon = merged.icon(styleParam);
        expect(resolvedIcon).toMatchObject({
          _debug: [{ styles: { d: 'sD' } }],
        });
      });

      test('contain debugId', () => {
        const target = withDebugId({ root: { a: 'tA', b: 'tB' } }, 'target');
        const source = withDebugId({ root: { a: 'sA', c: { deep: 'c' } } }, 'source');

        const merged = mergeComponentStyles__DEV(target, source);
        const resolvedRoot = merged.root(styleParam);
        expect(resolvedRoot).toMatchObject({
          _debug: [{ debugId: 'target' }, { debugId: 'source' }],
        });
      });

      test('are flat for recursive merge', () => {
        const target = withDebugId({ root: { a: 'tA' } }, 'target');
        const source = withDebugId({ root: { a: 'tB' } }, 'source');

        const merged1 = mergeComponentStyles__DEV(target, source);
        const resolvedRoot1 = merged1.root(styleParam);
        expect(resolvedRoot1).toMatchObject({
          _debug: [{ debugId: 'target' }, { debugId: 'source' }],
        });

        const merged2 = mergeComponentStyles__DEV(mergeComponentStyles__DEV(target, source), source);
        const resolvedRoot2 = merged2.root(styleParam);
        expect(resolvedRoot2).toMatchObject({
          _debug: [{ debugId: 'target' }, { debugId: 'source' }, { debugId: 'source' }],
        });

        const merged3 = mergeComponentStyles__DEV(target, mergeComponentStyles__DEV(source, source));
        const resolvedRoot3 = merged3.root(styleParam);
        expect(resolvedRoot3).toMatchObject({
          _debug: [{ debugId: 'target' }, { debugId: 'source' }, { debugId: 'source' }],
        });
      });
    });
  });
});
