import { useContext } from 'react';
import { useCustomizationSettings } from '@uifabric/utilities';
import { ITheme } from '@uifabric/styling';
import { Theme } from '@fluentui/theme';
import { FluentTheme } from '@uifabric/fluent-theme';
import { ThemeContext } from './ThemeContext';

/**
 * Get theme from CustomizerContext or Customizations singleton.
 */
function useCompatTheme(): ITheme {
  return useCustomizationSettings(['theme']).theme;
}

/**
 * React hook for programatically accessing the theme.
 */
export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  const legacyTheme = useCompatTheme();
  if (theme) {
    return theme;
  }

  if (legacyTheme) {
    return legacyTheme;
  }

  return FluentTheme;
};
