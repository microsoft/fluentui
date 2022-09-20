import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { Provider, teamsV2Theme } from '@fluentui/react-northstar';
import { webLightTheme } from '@fluentui/react-theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Designer } from './components/Designer';

// This app is here as a simple sandbox to render v9 controls inside of an React 18 environement.

export const App = () => {
  return (
    <Provider theme={teamsV2Theme}>
      <FluentProvider theme={webLightTheme}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Designer} />

            {/* TODO: <Route exact path="/builder/maximize" component={FullScreenPreview} /> */}
          </Switch>
        </BrowserRouter>
      </FluentProvider>
    </Provider>
  );
};
