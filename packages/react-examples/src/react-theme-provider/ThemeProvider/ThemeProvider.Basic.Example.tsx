import * as React from 'react';
import { ThemeProvider, PartialTheme } from '@fluentui/react-theme-provider';
import { Checkbox } from '@fluentui/react/lib/Checkbox';

const myTheme: PartialTheme = {
  palette: {
    themePrimary: 'red',
  },
};

export const ThemeProviderBasicExample: React.FunctionComponent = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <Checkbox defaultChecked={true} label="My Checkbox" />
    </ThemeProvider>
  );
};
