import * as React from 'react';
import { ThemeProvider, PartialTheme } from '@fluentui/react/lib/Theme';
import { DefaultButton } from '@fluentui/react/lib/Button';

const lightTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: 'white',
    bodyText: 'black',
  },
};

const darkTheme: PartialTheme = {
  semanticColors: {
    bodyBackground: 'black',
    bodyText: 'white',
  },
};

export const ThemeProviderNestedExample: React.FunctionComponent = () => {
  const [isLight, setIsLight] = React.useState(true);

  return (
    <ThemeProvider style={{ padding: '8px' }} theme={isLight ? lightTheme : darkTheme}>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <DefaultButton onClick={() => setIsLight(l => !l)}>Toggle theme</DefaultButton>
      <div>I am {isLight ? 'light theme' : 'dark theme'}</div>

      <ThemeProvider theme={isLight ? darkTheme : lightTheme}>
        <div>I am a nested {isLight ? 'dark theme' : 'light theme'}</div>
      </ThemeProvider>
    </ThemeProvider>
  );
};
