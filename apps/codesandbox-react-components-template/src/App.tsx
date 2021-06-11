import * as React from 'react';
import { FluentProvider, Button } from '@fluentui/react-components';

export const App = () => (
  <FluentProvider>
    <Button>Hello World</Button>
  </FluentProvider>
);
