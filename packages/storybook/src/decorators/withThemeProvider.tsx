import * as React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ThemeProvider, Theme } from '@fluentui/react-theme-provider';
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
