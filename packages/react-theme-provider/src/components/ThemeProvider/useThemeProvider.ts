import * as React from 'react';
import { assign, makeMergeProps, resolveShorthandProps, useMergedRefs } from '@fluentui/react-utilities';
import { ThemeProviderProps, ThemeProviderState, themeProviderShorthandProps } from './ThemeProvider.types';
import { useTheme } from '@fluentui/react-shared-contexts';
import { mergeThemes, themeToCSSVariables } from '@fluentui/react-theme';

type ThemeProviderDraftState = Omit<ThemeProviderState, 'theme'> & Pick<ThemeProviderProps, 'theme'>;

const mergeProps = makeMergeProps<ThemeProviderDraftState>({ deepMerge: themeProviderShorthandProps });

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
  const draftState = mergeProps(
    {
      ref: useMergedRefs(ref, React.useRef(null)),
      as: 'div',
    },
    defaultProps,
    resolveShorthandProps(props, themeProviderShorthandProps),
  );

  const parentTheme = useTheme();
  const localTheme = draftState.theme;

  const state = assign(draftState, { theme: mergeThemes(parentTheme, localTheme) });

  state.style = React.useMemo(() => {
    // TODO: should we consider insertion to head?
    //       - how to modify, remove styles?
    //       - SSR rendering

    // TODO: what variables should be rendered? Merged or only changed?
    // TODO: how we will proceed with Portals?
    return {
      ...state.style,
      ...themeToCSSVariables(state.theme),
    };
  }, [state.style, state.theme]);

  return state;
};
