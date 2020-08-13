import { useContext } from 'react';
import { useCustomizationSettings } from '@uifabric/utilities';
import { ITheme } from '@uifabric/styling';
import { ThemeContext } from './ThemeContext';
import { Theme } from './types';
import { createDefaultTheme } from './createDefaultTheme';

const defaultTheme = createDefaultTheme();

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

  return defaultTheme;
};
