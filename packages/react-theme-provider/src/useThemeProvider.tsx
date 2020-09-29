import { ThemeProviderProps, ThemeProviderState } from './ThemeProvider.types';
import * as React from 'react';
import { renderThemeProvider as render } from './renderThemeProvider';
import { makeMergeProps } from '@fluentui/react-compose/lib/next/index';
import { useThemeProviderState } from './useThemeProviderState';

const mergeProps = makeMergeProps<ThemeProviderState>();

/**
 * Returns the ThemeProvider render function and calculated state, given user input, ref, and
 * a set of default prop values.
 */
export const useThemeProvider = (
  props: ThemeProviderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps: ThemeProviderProps,
) => {
  const state = mergeProps(
    {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      ref: ref || React.useRef(),
      as: 'div',
    },
    defaultProps,
    props,
  );
  // Apply changes to state.
  useThemeProviderState(state);

  return {
    state,
    render,
  };
};
