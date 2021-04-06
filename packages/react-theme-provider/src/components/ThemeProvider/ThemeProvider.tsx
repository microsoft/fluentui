import * as React from 'react';
import { ThemeProviderProps } from './ThemeProvider.types';
import { useCreateTheme, useThemeProvider, themeProviderShorthandProps } from './useThemeProvider';
import { ThemeContext } from '@fluentui/react-shared-contexts';
import { useThemeProviderStyles } from './useThemeProviderStyles';
import { getSlots } from '@fluentui/react-utilities';

const InternalStyles = React.forwardRef<HTMLElement, ThemeProviderProps>((props: ThemeProviderProps, ref) => {
  const state = useThemeProvider(props, ref);
  useThemeProviderStyles(state);
  const { slots, slotProps } = getSlots(state, themeProviderShorthandProps);
  return (
    <slots.root ref={ref} {...slotProps.root}>
      {state.children}
    </slots.root>
  );
});

export const ThemeProvider = React.forwardRef<HTMLElement, ThemeProviderProps>((props, ref) => {
  const [theme] = useCreateTheme(props.theme, props.style);
  return (
    <ThemeContext.Provider value={theme}>
      <InternalStyles ref={ref} {...props} />
    </ThemeContext.Provider>
  );
});

ThemeProvider.displayName = 'ThemeProvider';
