import { useMergedRefs } from '@fluentui/react-hooks';
import { mergeThemes, themeToCSSVariables, PartialTheme, Theme } from '@fluentui/react-theme';
import { getSlots, makeMergeProps } from '@fluentui/react-utils';
import * as React from 'react';

import { internal__ThemeContext, useTheme } from './context';

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLElement> {
  theme?: PartialTheme | Theme;
}
export interface ThemeProviderState extends React.HTMLAttributes<HTMLElement> {
  theme: Theme;
}

const mergeProps = makeMergeProps<ThemeProviderState>();

export function useThemeProviderState(draftState: ThemeProviderState) {
  const parentTheme = useTheme();
  const localTheme = draftState.theme;

  draftState.theme = mergeThemes(parentTheme, localTheme);
  draftState.style = React.useMemo(() => {
    // TODO: should we consider insertion to head?
    //       - how to modify, remove styles?
    //       - SSR rendering

    // TODO: what variables should be rendered? Merged or only changed?
    // TODO: how we will proceed with Portals?
    return {
      ...draftState.style,
      ...themeToCSSVariables(draftState.theme),
    };
  }, [draftState.style, draftState.theme]);
}

export function renderThemeProvider(state: ThemeProviderState) {
  const { slots, slotProps } = getSlots(state);
  const { theme } = state;

  return (
    <internal__ThemeContext.Provider value={theme}>
      <slots.root {...slotProps.root} />
    </internal__ThemeContext.Provider>
  );
}

/**
 * Returns the ThemeProvider render function and calculated state, given user input, ref, and
 * a set of default prop values.
 */
export function useThemeProvider(props: ThemeProviderProps, ref: React.Ref<HTMLElement>) {
  const rootRef = useMergedRefs(ref, React.useRef<HTMLElement>(null));
  const state = mergeProps(
    {
      ref: rootRef,
      as: 'div',
    },
    {},
    props,
  );

  useThemeProviderState(state);

  return {
    state,
    render: renderThemeProvider,
  };
}

/**
 * Used to provide CSS variables to DOM and theme tokens via React Context.
 */
export const ThemeProvider: React.FunctionComponent<ThemeProviderProps> = React.forwardRef<
  HTMLDivElement,
  ThemeProviderProps
>((props: ThemeProviderProps, ref: React.Ref<HTMLDivElement>) => {
  const { render, state } = useThemeProvider(props, ref);

  return render(state);
});

ThemeProvider.displayName = 'ThemeProvider';
