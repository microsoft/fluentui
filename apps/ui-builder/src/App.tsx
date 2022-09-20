import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { FluentProvider as V9Provider, teamsLightTheme } from '@fluentui/react-components';
import { Provider, teamsV2Theme } from '@fluentui/react-northstar';
import { webLightTheme } from '@fluentui/react-theme';
import { Designer } from './components/Designer';

// This app is here as a simple sandbox to render v9 controls inside of an React 18 environement.

export const App = () => {
  return (
    <Provider theme={teamsV2Theme}>
      <FluentProvider theme={webLightTheme}>
        <V9Provider theme={teamsLightTheme}>
          <Designer />
        </V9Provider>
      </FluentProvider>
    </Provider>
  );
};
