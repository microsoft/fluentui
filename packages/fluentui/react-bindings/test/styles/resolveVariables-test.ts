import {
  ComponentVariablesPrepared,
  emptyTheme,
  ThemeComponentVariablesPrepared,
  ThemePrepared,
} from '@fluentui/styles';
import * as _ from 'lodash';

import { resolveVariables } from '../../src/styles/resolveVariables';

const siteVariables = {
  ...emptyTheme.siteVariables,
  brand: 'blue',
};
const testVariables: ComponentVariablesPrepared = (siteVariables = emptyTheme.siteVariables) => ({
  backgroundColor: siteVariables.brand,
});

const createTheme: (componentVariables?: ThemeComponentVariablesPrepared) => ThemePrepared = componentVariables => ({
  ...emptyTheme,
  siteVariables,
  componentVariables: {
    Test: testVariables,
    ...componentVariables,
  },
});

describe('resolveVariables', () => {
  test('resolved variables', () => {
    const variables = resolveVariables(['Test'], createTheme(), {}, false);
    expect(variables).toMatchObject({ backgroundColor: 'blue' });
  });

  test('merges theme with input variables', () => {
    const propsVariables = () => ({
      color: 'red',
    });
    const variables = resolveVariables(['Test'], createTheme(), propsVariables, false);
    expect(variables).toMatchObject({ backgroundColor: 'blue', color: 'red' });
  });

  test("allows input variables to override theme's", () => {
    const propsVariables = {
      backgroundColor: 'green',
    };
    const variables = resolveVariables(['Test'], createTheme(), propsVariables, false);
    expect(variables).toMatchObject({ backgroundColor: 'green' });
  });

  test('avoids merging if variables are undefined', () => {
    const theme = createTheme();
    const variables = resolveVariables(['Test'], theme, undefined, false);

    expect(variables).toMatchObject({ backgroundColor: 'blue' });
  });

  test('avoids merging for multiple display names if variables are undefined', () => {
    const theme = createTheme({ Foo: testVariables, Bar: testVariables });
    const variables = resolveVariables(['Foo', 'Bar'], theme, undefined, false);

    expect(variables).toMatchObject({ backgroundColor: 'blue' });
  });

  describe('enabledVariablesCaching', () => {
    test('caches resolved variables', () => {
      const fooVariables = jest.fn().mockReturnValue({ backgroundColor: 'blue' });
      const theme = createTheme({ Foo: fooVariables });

      const variables = resolveVariables(['Foo'], theme, {}, true);
      const secondVariables = resolveVariables(['Foo'], theme, {}, true);

      expect(variables).toMatchObject(secondVariables);
      expect(fooVariables).toHaveBeenCalledTimes(1);
    });

    test('omits usage of undefined variables', () => {
      const fooVariables = jest.fn().mockReturnValue({ content: 'foo' });
      const theme = createTheme({ Foo: fooVariables, Bar: undefined });

      expect(resolveVariables(['Foo', 'Bar'], theme, {}, true)).toMatchObject({ content: 'foo' });
      expect(fooVariables).toHaveBeenCalledTimes(1);
    });

    test('handles multiple displayNames', () => {
      const fooVariables = jest.fn().mockReturnValue({ backgroundColor: 'blue', borderColor: 'black' });
      const barVariables = jest.fn().mockReturnValue({ backgroundColor: 'green', color: 'red' });
      const theme = createTheme({ Foo: fooVariables, Bar: barVariables });

      expect(resolveVariables(['Foo', 'Bar'], theme, {}, true)).toMatchObject({
        backgroundColor: 'green',
        borderColor: 'black',
        color: 'red',
      });

      // Runs to check cache
      _.times(3, () => resolveVariables(['Foo', 'Bar'], theme, {}, true));

      expect(fooVariables).toHaveBeenCalledTimes(1);
      expect(barVariables).toHaveBeenCalledTimes(1);
    });

    test('considers displayName while caching resolved variables', () => {
      const fooVariables = jest.fn().mockReturnValue({ backgroundColor: 'blue' });
      const barVariables = jest.fn().mockReturnValue({ color: 'red' });
      const theme = createTheme({ Foo: fooVariables, Bar: barVariables });

      const variables = resolveVariables(['Foo'], theme, {}, true);
      const secondVariables = resolveVariables(['Bar'], theme, {}, true);

      expect(variables).toMatchObject({ backgroundColor: 'blue' });
      expect(secondVariables).toMatchObject({ color: 'red' });
      expect(fooVariables).toHaveBeenCalledTimes(1);
      expect(barVariables).toHaveBeenCalledTimes(1);
    });

    test('considers theme while caching resolved variables', () => {
      const fooVariables = jest.fn().mockReturnValue({ backgroundColor: 'blue' });
      const theme = createTheme({ Foo: fooVariables });
      const secondTheme = createTheme({ Foo: fooVariables });

      const variables = resolveVariables(['Foo'], theme, {}, true);
      const secondVariables = resolveVariables(['Foo'], secondTheme, {}, true);

      expect(variables).toMatchObject({ backgroundColor: 'blue' });
      expect(secondVariables).toMatchObject({ backgroundColor: 'blue' });
      expect(fooVariables).toHaveBeenCalledTimes(2);
    });
  });
});
