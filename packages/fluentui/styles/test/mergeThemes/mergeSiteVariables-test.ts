import { withDebugId } from '@fluentui/styles';

import * as debugEnabled from '../../src/debugEnabled';
import { mergeSiteVariables__PROD, mergeSiteVariables__DEV } from '../../src/mergeThemes';

describe('mergeSiteVariables', () => {
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

  function testMergeSiteVariables(mergeSiteVariables: typeof mergeSiteVariables__PROD) {
    test(`always returns an object`, () => {
      expect(mergeSiteVariables({}, {})).toMatchObject({});

      expect(mergeSiteVariables(undefined, undefined)).toMatchObject({});
      expect(mergeSiteVariables({}, undefined)).toMatchObject({});
      expect(mergeSiteVariables(undefined, {})).toMatchObject({});
    });

    test('always adds fontSizes', () => {
      const target = {};
      const source = {};

      expect(mergeSiteVariables(target, source)).toMatchObject({ fontSizes: {} });
    });

    test('gracefully handles null and undefined', () => {
      expect(() => mergeSiteVariables({ color: 'black' }, undefined)).not.toThrow();
      expect(() => mergeSiteVariables({ color: 'black' }, { color: undefined })).not.toThrow();

      expect(() => mergeSiteVariables(undefined, { color: 'black' })).not.toThrow();
      expect(() => mergeSiteVariables({ color: undefined }, { color: 'black' })).not.toThrow();
    });

    test('undefined overwrites previously set value', () => {
      const merged = mergeSiteVariables({ color: 'black' }, { color: undefined });

      expect(merged).toMatchObject({
        color: undefined,
      });
    });

    test('null overwrites previously set value', () => {
      const merged = mergeSiteVariables({ color: 'black' }, { color: null });

      expect(merged).toMatchObject({
        color: null,
      });
    });

    test('merges top level keys', () => {
      const target = { overridden: false, keep: true };
      const source = { overridden: true, add: true };

      expect(mergeSiteVariables(target, source)).toMatchObject({
        overridden: true,
        keep: true,
        add: true,
      });
    });

    test('deep merges nested keys', () => {
      const target = { nested: { replaced: false, deep: { dOne: 1 } } };
      const source = { nested: { other: 'value', deep: { dTwo: 'two' } } };

      expect(mergeSiteVariables(target, source)).toMatchObject({
        nested: { replaced: false, other: 'value', deep: { dOne: 1, dTwo: 'two' } },
      });
    });
  }

  describe('prod version', () => {
    beforeEach(() => {
      mockIsDebugEnabled(true); // it is not possible to enable debug in prod
    });
    testMergeSiteVariables(mergeSiteVariables__PROD);

    test('debug frames are not saved', () => {
      const target = { one: 1, a: 'tA' };
      const source = { two: 2, a: 'sA' };

      const merged = mergeSiteVariables__PROD(target, source);

      expect(merged._debug).toBe(undefined);
    });
  });

  describe('dev version, debug disabled', () => {
    beforeEach(() => {
      mockIsDebugEnabled(false);
    });
    testMergeSiteVariables(mergeSiteVariables__DEV);

    test('debug frames are not saved', () => {
      const target = { one: 1, a: 'tA' };
      const source = { two: 2, a: 'sA' };

      const merged = mergeSiteVariables__DEV(target, source);

      expect(merged._debug).toBe(undefined);
    });
  });

  describe('dev version, debug enabled', () => {
    beforeEach(() => {
      mockIsDebugEnabled(true);
    });
    testMergeSiteVariables(mergeSiteVariables__DEV);

    describe('debug frames', () => {
      test('are saved', () => {
        const target = { one: 1, a: 'tA' };
        const source = { two: 2, a: 'sA' };

        const merged = mergeSiteVariables__DEV(target, source);

        expect(merged).toMatchObject({
          _debug: [{ resolved: { one: 1, a: 'tA' } }, { resolved: { two: 2, a: 'sA' } }],
        });
      });

      test('contain debugId', () => {
        const target = withDebugId({ one: 1, a: 'tA', target: true }, 'target');
        const source = withDebugId({ two: 2, a: 'sA', source: true }, 'source');

        const merged = mergeSiteVariables__DEV(target, source);
        expect(merged).toMatchObject({
          _debug: [{ debugId: 'target' }, { debugId: 'source' }],
        });
      });
    });
  });
});
