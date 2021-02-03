import * as React from 'react';
import { makeDecorator } from '@storybook/addons';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { webLightTheme } from '@fluentui/react-theme';

const ThemeProviderWrapper: React.FunctionComponent = props => {
  return <ThemeProvider theme={webLightTheme}>{props.children}</ThemeProvider>;
};

export const withThemeProvider = makeDecorator({
  name: 'withThemeProvider',
  parameterName: 'theme',
  skipIfNoParametersOrOptions: false,
  wrapper: (storyFn, context, { options, parameters }) => {
    // const theme = (options?.theme || parameters) as Theme;
    return <ThemeProviderWrapper>{storyFn(context)}</ThemeProviderWrapper>;
  },
});
