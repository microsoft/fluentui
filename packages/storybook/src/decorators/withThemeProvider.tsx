import * as React from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { useTheme } from '../knobs/useTheme';

export const withThemeProvider = (storyFn: () => React.ReactNode) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme } = useTheme();

  return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
};
