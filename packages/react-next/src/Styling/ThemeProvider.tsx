import * as React from 'react';
import { ThemeProvider as ReactThemeProvider, ThemeProviderProps } from '@fluentui/react-theme-provider';
import { useCustomizationSettings } from '../Utilities';
import { convertLegacyTheme } from './convertLegacyTheme';
import { ITheme } from '../Styling';

export { ThemeProviderProps, useTheme } from '@fluentui/react-theme-provider';

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
