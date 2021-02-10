import { useContext } from 'react';
import { useCustomizationSettings } from '@fluentui/utilities';
import { createTheme } from '@fluentui/theme';
import { ThemeContext } from './ThemeContext';
import { Theme } from './types';

/**
 * Get theme from CustomizerContext or Customizations singleton.
 */
function useCompatTheme(): Theme | undefined {
  return useCustomizationSettings(['theme']).theme;
}

/**
 * React hook for programmatically accessing the theme.
 */
export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  const legacyTheme = useCompatTheme();

  return theme || legacyTheme || createTheme({});
};
