import * as React from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider/lib/compat';
import { useTheme } from '../knobs/useTheme';

export const withThemeProvider = (storyFn: () => React.ReactNode) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { theme, isDark } = useTheme();
  const style = {
    background: isDark ? 'black' : undefined,
  };

  return (
    <ThemeProvider style={style} theme={theme}>
      {storyFn()}
    </ThemeProvider>
  );
};
