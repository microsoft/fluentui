import * as React from 'react';
import { FluentProvider, webLightTheme, Button } from '@fluentui/react-components';

export const App = () => {
  return (
    <FluentProvider theme={webLightTheme}>
      <Button>Click Me</Button>
    </FluentProvider>
  );
};
