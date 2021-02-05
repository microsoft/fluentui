import * as React from 'react';
import { ThemeProvider, PartialTheme } from '@fluentui/react/lib/Theme';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

const myTheme: PartialTheme = {
  palette: {
    themePrimary: '#0f8387',
    themeDark: '#324c4d',
  },
};

const App = () => {
  return <Checkbox defaultChecked={true} label="My Checkbox" />;
};

export const ThemeProviderBasicExample: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <App />
    </ThemeProvider>
  );
};
