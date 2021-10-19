import { getThemedContext } from './scheme';
import { createTheme } from './theme';
import { loadTheme } from './theme';
import type { ISchemeNames, ITheme } from '../interfaces/index';
import type { ICustomizerContext } from '@fluentui/utilities';

describe('getSchemedCustomizations', () => {
  const testSchemeName = 'soft';

  let emptyContext: ICustomizerContext;

  let testArgScheme: ITheme;
  let testArgSchemes: { [P in ISchemeNames]?: ITheme };
  let testArgTheme: ITheme;

  let testContextScheme: ITheme;
  let testContextSchemes: { [P in ISchemeNames]?: ITheme };
  let testContextTheme: ITheme;
  let testContext: ICustomizerContext;

  let testSettingsScheme: ITheme;
  let testSettingsSchemes: { [P in ISchemeNames]?: ITheme };
  let testSettingsTheme: ITheme;

  beforeEach(() => {
    // Reinit on every test to guard against false positives due to mutation
    emptyContext = {
      customizations: {
        settings: {},
        scopedSettings: {},
      },
    };

    testArgScheme = createTheme({ semanticColors: { bodyBackground: 'testArgSchemeValue' } });
    testArgSchemes = {
      [testSchemeName]: testArgScheme,
    };

    testArgTheme = createTheme({ semanticColors: { bodyBackground: 'this value should be overwritten' } });
    testArgTheme.schemes = testArgSchemes;

    testContextScheme = createTheme({ semanticColors: { bodyBackground: 'testContextSchemeValue' } });
    testContextSchemes = {
      [testSchemeName]: testContextScheme,
    };

    testContextTheme = createTheme({ semanticColors: { bodyBackground: 'this value should be overwritten' } });
    testContextTheme.schemes = testContextSchemes;

    testContext = {
      customizations: {
        settings: {
          theme: testContextTheme,
        },
        scopedSettings: {},
      },
    };

    testSettingsScheme = createTheme({ semanticColors: { bodyBackground: 'testSettingsSchemeValue' } });
    testSettingsSchemes = {
      [testSchemeName]: testSettingsScheme,
    };
    testSettingsTheme = createTheme({ semanticColors: { bodyBackground: 'this value should be overwritten' } });

    // loadTheme strips out schemes so add them after load:
    const loadedTheme = loadTheme(testSettingsTheme);
    loadedTheme.schemes = testSettingsSchemes;
  });

  it('does not change context when given no theme and scheme', () => {
    const newContext = getThemedContext(testContext);

    expect(newContext).toBeDefined();
    expect(newContext).toBe(testContext);
  });

  it('merges theme arg', () => {
    const newContext = getThemedContext(testContext, undefined, testArgTheme);

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(testArgTheme);
  });

  it('merges scheme from theme arg', () => {
    const newContext = getThemedContext(testContext, testSchemeName, testArgTheme);
    const expectedTheme = {
      ...testArgScheme,
      schemes: testArgSchemes,
    };

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });

  it('falls back to theme arg when scheme is invalid', () => {
    testArgTheme.schemes = undefined;

    const newContext = getThemedContext(testContext, testSchemeName, testArgTheme);

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(testArgTheme);
  });

  it('merges scheme from context', () => {
    const newContext = getThemedContext(testContext, testSchemeName);
    const expectedTheme = {
      ...testContextScheme,
      schemes: testContextSchemes,
    };

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });

  it('merges scheme from context over settings', () => {
    const expectedTheme = {
      ...testContextScheme,
      schemes: testContextSchemes,
    };

    const newContext = getThemedContext(testContext, testSchemeName);

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });

  it('falls back to Customizations when scheme is not in context', () => {
    const expectedTheme = {
      ...testSettingsScheme,
      schemes: testSettingsSchemes,
    };

    const newContext = getThemedContext(emptyContext, testSchemeName);

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });
});
