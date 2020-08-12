import * as React from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { useTheme } from '../knobs/useTheme';

const ThemeProviderWrapper: React.FunctionComponent<{}> = props => {
  const { theme, isDark } = useTheme();
  const style = {
    background: isDark ? 'black' : undefined,
  };

  return (
    <ThemeProvider style={style} theme={theme}>
      {props.children}
    </ThemeProvider>
  );
};

export const withThemeProvider = (storyFn: () => React.ReactNode) => {
  return <ThemeProviderWrapper>{storyFn()}</ThemeProviderWrapper>;
};
