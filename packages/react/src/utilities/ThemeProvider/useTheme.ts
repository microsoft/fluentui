import { useContext } from 'react';
import { useCustomizationSettings } from '@fluentui/utilities';
import { createTheme } from '@fluentui/theme';
import { ThemeContext } from './ThemeContext';
import type { ITheme, Theme } from '@fluentui/theme';

/**
 * Get theme from CustomizerContext or Customizations singleton.
 */
function useCompatTheme(): ITheme | undefined {
  const customizationSettings = useCustomizationSettings(['theme', 'scopedSettings']);
  return { ...customizationSettings.theme, components: customizationSettings.scopedSettings };
}

/**
 * React hook for programmatically accessing the theme.
 */
export const useTheme = (): Theme => {
  const theme = useContext(ThemeContext);
  const legacyTheme = useCompatTheme();

  return theme || legacyTheme || createTheme({});
};
