import * as React from 'react';
import { ThemeProvider, DefaultButton } from '@fluentui/react';

// This app is here as a simple sandbox to render v9 controls inside of an React 18 environement.

export const App = () => {
  return (
    <ThemeProvider>
      <DefaultButton>Click Me</DefaultButton>
    </ThemeProvider>
  );
};
