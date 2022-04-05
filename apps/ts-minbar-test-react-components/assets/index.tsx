import { Button, FluentProvider } from '@fluentui/react-components';
import * as React from 'react';

const App = () => (
  <FluentProvider>
    <Button children={{ text: 'Press Me' }} />
  </FluentProvider>
);

export default App;
