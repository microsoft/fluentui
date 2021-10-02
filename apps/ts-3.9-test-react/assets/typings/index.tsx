import { PrimaryButton, ThemeProvider } from '@fluentui/react';
// import { Button, FluentProvider } from '@fluentui/react-components';
import * as React from 'react';

const App = () => (
  <ThemeProvider>
    <PrimaryButton text="Press Me" />
  </ThemeProvider>
);

export default App;
