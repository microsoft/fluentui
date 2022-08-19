import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

// This app is here as a simple sandbox to render v9 controls inside of an React 18 environement.

export const App = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Button>Click Me</Button>
    </FluentProvider>
  );
};
