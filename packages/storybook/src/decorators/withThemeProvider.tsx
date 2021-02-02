import * as React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ThemeProvider } from '@fluentui/react-theme-provider/lib/compat/index';
import { Theme } from '@fluentui/theme';
import { useTheme } from '../knobs/useTheme';

const ThemeProviderWrapper: React.FunctionComponent<{ theme?: Theme | undefined }> = props => {
  const { theme, isDark } = useTheme();
  const style = {
    background: isDark ? 'black' : undefined,
  };

  return (
    <ThemeProvider style={style} theme={props.theme || theme}>
      {props.children}
    </ThemeProvider>
  );
};

export const withThemeProvider = makeDecorator({
  name: 'withThemeProvider',
  parameterName: 'theme',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { options, parameters }) => {
    const theme = (options?.theme || parameters) as Theme;
    return <ThemeProviderWrapper theme={theme}>{storyFn(context)}</ThemeProviderWrapper>;
  },
});
