import { mergeBooleanValues } from '../../../../src/utils/mergeProviderContexts';

describe('mergeBooleanValues', () => {
  test('latest boolean value wins', () => {
    expect(mergeBooleanValues(false, true)).toEqual(true);
    expect(mergeBooleanValues(true, false)).toEqual(false);

    expect(mergeBooleanValues(null, true)).toEqual(true);
    expect(mergeBooleanValues(null, false)).toEqual(false);

    expect(mergeBooleanValues(undefined, true)).toEqual(true);
    expect(mergeBooleanValues(undefined, false)).toEqual(false);
  });

  test('null values do not override boolean values', () => {
    expect(mergeBooleanValues(false, null)).toEqual(false);
    expect(mergeBooleanValues(true, null)).toEqual(true);
  });

  test('undefined values do not override boolean values', () => {
    expect(mergeBooleanValues(false, undefined)).toEqual(false);
    expect(mergeBooleanValues(true, undefined)).toEqual(true);
  });

  test('first value wins if no boolean was provided', () => {
    // if a theme is created using mergeThemes() its rtl or disableAnimations should remain `undefined` to be able to inherit it from parent Provider
    expect(mergeBooleanValues(null, null)).toEqual(null);
    expect(mergeBooleanValues(undefined, null)).toEqual(undefined);

    expect(mergeBooleanValues(null, undefined)).toEqual(null);
    expect(mergeBooleanValues(undefined, undefined)).toEqual(undefined);
  });
});
