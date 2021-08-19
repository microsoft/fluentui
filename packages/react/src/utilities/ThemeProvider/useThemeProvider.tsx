import { renderThemeProvider as render } from './renderThemeProvider';
import { useThemeProviderState } from './useThemeProviderState';
import { getPropsWithDefaults } from '@fluentui/utilities';
import type { ThemeProviderProps, ThemeProviderState } from './ThemeProvider.types';

/**
 * Returns the ThemeProvider render function and calculated state, given user input, ref, and
 * a set of default prop values.
 */
export const useThemeProvider = (props: ThemeProviderProps, defaultProps: ThemeProviderProps) => {
  const state = getPropsWithDefaults(defaultProps, props) as ThemeProviderState;

  // Apply changes to state.
  useThemeProviderState(state);

  return {
    state,
    render,
  };
};
