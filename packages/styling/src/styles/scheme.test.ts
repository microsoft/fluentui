import { getSchemedContext } from './scheme';
import { createTheme } from './theme';
import { IPartialTheme, ISchemeNames, ITheme, ITypography } from '../interfaces/index';
import { loadTheme } from './theme';
import { Customizations, mergeCustomizations, ICustomizerContext } from '@uifabric/utilities';

describe('getSchemedCustomizations', () => {
  const testSchemeNameInvalid = 'neutral';
  const textSchemeNameUnused = 'strong';
  const testSchemeName = 'soft';

  let emptyContext: ICustomizerContext;
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
        scopedSettings: {}
      }
    };

    testContextScheme = createTheme({ semanticColors: { bodyBackground: 'testContextSchemeValue' } });
    testContextSchemes = {
      [testSchemeName]: testContextScheme
    };

    testContextTheme = createTheme({ semanticColors: { bodyBackground: 'this value should be overwritten' } });
    testContextTheme.schemes = testContextSchemes;

    testContext = {
      customizations: {
        settings: {
          theme: testContextTheme
        },
        scopedSettings: {}
      }
    };

    testSettingsScheme = createTheme({ semanticColors: { bodyBackground: 'testSettingsSchemeValue' } });
    testSettingsSchemes = {
      [testSchemeName]: testSettingsScheme
    };
    testSettingsTheme = createTheme({ semanticColors: { bodyBackground: 'this value should be overwritten' } });
  });

  it('gets scheme from context', () => {
    const newContext = getSchemedContext(testSchemeName, testContext);
    const expectedTheme = {
      ...testContextScheme,
      schemes: testContextSchemes
    };

    loadTheme({});

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });

  it('gets scheme from context over settings', () => {
    const expectedTheme = {
      ...testContextScheme,
      schemes: testContextSchemes
    };

    const loadedTheme = loadTheme(testSettingsTheme);

    // loadTheme strips out schemes so add them after load:
    loadedTheme.schemes = testSettingsSchemes;

    const newContext = getSchemedContext(testSchemeName, testContext);

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });

  it('falls back to Customizations when scheme is not in context', () => {
    const expectedTheme = {
      ...testSettingsScheme,
      schemes: testSettingsSchemes
    };
    const loadedTheme = loadTheme(testSettingsTheme);

    // loadTheme strips out schemes so add them after load:
    loadedTheme.schemes = testSettingsSchemes;

    const newContext = getSchemedContext(testSchemeName, emptyContext);

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });
});
