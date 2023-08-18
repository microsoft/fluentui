import { DEFAULT_SHADOW_CONFIG, GLOBAL_STYLESHEET_KEY, isShadowConfig } from './shadowConfig';

describe('shadowConfig', () => {
  it('is a ShadowConfig', () => {
    expect(isShadowConfig(DEFAULT_SHADOW_CONFIG)).toBe(true);

    expect(
      isShadowConfig({
        stylesheetKey: 'foo',
        inShadow: true,
      }),
    ).toBe(true);

    expect(
      isShadowConfig({
        stylesheetKey: 'cats',
        inShadow: false,
      }),
    ).toBe(true);

    expect(
      isShadowConfig({
        stylesheetKey: GLOBAL_STYLESHEET_KEY,
        inShadow: false,
        window: {},
      }),
    ).toBe(true);

    expect(
      isShadowConfig({
        stylesheetKey: 'Button',
        inShadow: true,
        window: {},
      }),
    ).toBe(true);

    expect(
      isShadowConfig({
        stylesheetKey: GLOBAL_STYLESHEET_KEY,
        inShadow: true,
        window: undefined,
      }),
    ).toBe(true);
  });

  it('is not a ShadowConfig', () => {
    expect(isShadowConfig(false)).toBe(false);
    expect(isShadowConfig(null)).toBe(false);
    expect(isShadowConfig(undefined)).toBe(false);
    expect(isShadowConfig({})).toBe(false);
    expect(isShadowConfig({ foo: 'bar', cats: 'dogs' })).toBe(false);

    expect(
      isShadowConfig({
        stylesheetKey: 'foo',
        inShadow: null,
      }),
    ).toBe(false);

    expect(
      isShadowConfig({
        stylesheetKey: 123,
        inShadow: true,
      }),
    ).toBe(false);

    expect(
      isShadowConfig({
        stylesheetKey: GLOBAL_STYLESHEET_KEY,
        inShadow: true,
        window: null,
      }),
    ).toBe(false);

    expect(
      isShadowConfig({
        stylesheetKey: 123,
        inShadow: 'cats',
        window: {},
      }),
    ).toBe(false);
  });
});
