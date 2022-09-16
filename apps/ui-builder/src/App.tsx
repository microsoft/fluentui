import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { Provider, teamsTheme } from '@fluentui/react-northstar';
import { webLightTheme } from '@fluentui/react-theme';
import { Designer } from './components/Designer';

// This app is here as a simple sandbox to render v9 controls inside of an React 18 environement.

export const App = () => {
  return (
    <Provider theme={teamsTheme}>
      <FluentProvider theme={webLightTheme}>
        <Designer />
      </FluentProvider>
    </Provider>
  );
};
