import React from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { Provider, teamsTheme } from '@fluentui/react-northstar';

export const decorators = [
  Story => (
    <div>
      <h1>@fluentui/react-northstar</h1>
      <Provider theme={teamsTheme}>
        <Story />
      </Provider>
      <h1>@fluentui/react-theme-provider</h1>
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    </div>
  ),
];
