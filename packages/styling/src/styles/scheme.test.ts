import { getSchemedContext } from './scheme';
import { createTheme } from './theme';
import { IPartialTheme, ISchemeNames, ITheme, ITypography } from '../interfaces/index';
import { mergeCustomizations, ICustomizerContext } from '@uifabric/utilities';

describe('getSchemedCustomizations', () => {
  const testSchemeNameInvalid = 'neutral';
  const textSchemeNameUnused = 'strong';
  const testSchemeName = 'soft';

  let emptyContext: ICustomizerContext;
  let testContextScheme: ITheme;
  let testSettingsScheme: ITheme;

  let testSettingsSchemes: { [P in ISchemeNames]?: ITheme };
  let testContextSchemes: { [P in ISchemeNames]?: ITheme };

  let testContextTheme: ITheme;
  let testSettingsTheme: ITheme;

  let testContext: ICustomizerContext;

  beforeEach(() => {
    // Reinit on every test to guard against false positives due to mutation
    emptyContext = {
      customizations: {
        settings: {
          theme: {}
        },
        scopedSettings: {}
      }
    };

    testContextScheme = createTheme({ semanticColors: { bodyBackground: 'testContextSchemeValue' } });
    testSettingsScheme = createTheme({ semanticColors: { bodyBackground: 'testSettingsSchemeValue' } });

    testContextSchemes = {
      [testSchemeName]: testContextScheme
    };
    testSettingsSchemes = {
      [testSchemeName]: testSettingsScheme
    };

    testContextTheme = createTheme({ semanticColors: { bodyBackground: 'this value should be overwritten' } });
    testSettingsTheme = createTheme({ semanticColors: { bodyBackground: 'this value should be overwritten' } });

    testContextTheme.schemes = testContextSchemes;
    testSettingsTheme.schemes = testSettingsSchemes;

    testContext = {
      customizations: {
        settings: {
          theme: testContextTheme
        },
        scopedSettings: {}
      }
    };
  });

  it('gets scheme from context', () => {
    const newContext = getSchemedContext(testSchemeName, testContext);
    const expectedTheme = {
      ...testContextScheme,
      schemes: testContextSchemes
    };

    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });

  it('gets scheme from context over theme', () => {
    const newContext = getSchemedContext(testSchemeName, testContext, testSettingsTheme);
    const expectedTheme = {
      ...testContextScheme,
      schemes: testContextSchemes
    };
    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });

  it('gets scheme from theme when not in context', () => {
    const newContext = getSchemedContext(testSchemeName, emptyContext, testSettingsTheme);
    const expectedTheme = {
      ...testSettingsScheme,
      schemes: testSettingsSchemes
    };
    expect(newContext).toBeDefined();
    expect(newContext!.customizations.settings.theme).toEqual(expectedTheme);
  });

  it('returns undefined context for unavailable scheme', () => {
    const newContext = getSchemedContext(testSchemeNameInvalid, testContext, testSettingsTheme);
    expect(newContext).toBeUndefined();
  });
});
