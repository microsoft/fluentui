import * as React from 'react';
import { ThemeProvider as ReactThemeProvider, ThemeProviderProps } from '../ThemeProvider';
import { useCustomizationSettings } from '@uifabric/utilities';
import { convertLegacyTheme } from './convertLegacyTheme';
import { ITheme } from '@uifabric/styling';

export { ThemeProviderProps } from '../ThemeProvider';
export { useTheme } from '../useTheme';

/**
 * A wrapper of ThemeProvider from react-theme-provider package.
 *
 * It also updates the theme when Customizations changes, which ensures backward compatibility with legacy ways of
 * providing theme (e.g. loadTheme, Customizations.applySettings).
 */
export const ThemeProvider: React.FunctionComponent<ThemeProviderProps & {
  ref?: React.Ref<HTMLDivElement>;
}> = props => {
  const legacyTheme = useThemeCustomizationSettings();
  const theme = props.theme || (legacyTheme && convertLegacyTheme(legacyTheme));

  return <ReactThemeProvider {...props} theme={theme} />;
};

function useThemeCustomizationSettings(): ITheme {
  return useCustomizationSettings(['theme']).theme;
}
