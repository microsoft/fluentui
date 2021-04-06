import * as React from 'react';
import { makeMergePropsCompat, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { ThemeProviderProps, ThemeProviderState } from './ThemeProvider.types';
import { useTheme } from '@fluentui/react-shared-contexts';
import { mergeThemes, PartialTheme, Theme, themeToCSSVariables } from '@fluentui/react-theme';

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
  const [theme, style] = useCreateTheme(state.theme, state.style);
  Object.assign(state, { theme, style });

  return state;
};

export function useCreateTheme(localTheme?: Theme | PartialTheme, localStyle?: React.CSSProperties) {
  const parentTheme = useTheme();

  const theme = mergeThemes(parentTheme, localTheme ?? {});
  const style = React.useMemo<React.CSSProperties>(() => {
    // TODO: should we consider insertion to head?
    //       - how to modify, remove styles?
    //       - SSR rendering

    // TODO: what variables should be rendered? Merged or only changed?
    // TODO: how we will proceed with Portals?
    return {
      ...localStyle,
      ...themeToCSSVariables(theme),
    };
  }, [localStyle, theme]);
  return [theme, style] as const;
}
