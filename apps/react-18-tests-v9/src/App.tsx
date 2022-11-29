import * as React from 'react';
import { webLightTheme, FluentProvider, Button } from '@fluentui/react-components';

// This app is here as a simple sandbox to render v9 controls inside of an React 18 environement.

export const App = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Button>Click Me</Button>
    </FluentProvider>
  );
};
