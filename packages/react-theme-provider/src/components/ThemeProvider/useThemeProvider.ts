import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { ThemeProviderProps, ThemeProviderState } from './ThemeProvider.types';
import { useTheme } from '@fluentui/react-shared-contexts';
import { mergeThemes } from '@fluentui/react-theme';
import { useThemeStyleTag } from './useThemeStyleTag';

export const themeProviderShorthandProps: (keyof ThemeProviderProps)[] = [];

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<ThemeProviderState>({ deepMerge: themeProviderShorthandProps });

/**
 * Create the state required to render ThemeProvider.
 *
 * The returned state can be modified with hooks such as useThemeProviderStyles,
 * before being passed to renderThemeProvider.
 *
 * @param props - props from this instance of ThemeProvider
 * @param ref - reference to root HTMLElement of ThemeProvider
 * @param defaultProps - (optional) default prop values provided by the implementing type
 */
export const useThemeProvider = (
  props: ThemeProviderProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: ThemeProviderProps,
): ThemeProviderState => {
  const state = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      as: 'div',
    },
    defaultProps,
    resolveShorthandProps(props, themeProviderShorthandProps),
  );

  const parentTheme = useTheme();
  const localTheme = state.theme;

  state.theme = mergeThemes(parentTheme, localTheme);
  const themeClassName = useThemeStyleTag({ theme: state.theme, targetDocument: state.targetDocument });

  state.themeClassName = themeClassName;
  state.className = [state.className, state.themeClassName].filter(Boolean).join(' ');
  return state;
};
