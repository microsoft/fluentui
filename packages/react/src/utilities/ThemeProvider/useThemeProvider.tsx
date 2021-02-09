import { ThemeProviderProps, ThemeProviderState } from './ThemeProvider.types';
import { renderThemeProvider as render } from './renderThemeProvider';
import { useThemeProviderState } from './useThemeProviderState';
import { getPropsWithDefaults } from '@fluentui/utilities';

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
