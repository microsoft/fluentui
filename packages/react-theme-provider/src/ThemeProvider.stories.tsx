import * as React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { Theme } from './types';

const lightTheme: Theme = {
  tokens: {
    body: {
      fill: 'white',
      text: 'black',
      fontFamily: 'Segoe UI',
    },
  },
};

const darkTheme: Theme = {
  tokens: {
    body: {
      fill: 'black',
      text: 'white',
    },
  },
};

const themeWithStylesheets: Theme = {
  stylesheets: ['.foo { font-family: var(--body-customFont); }'],
  tokens: {
    body: {
      customFont: 'Courier New',
    },
  },
};

export const NestedTheming = () => {
  const [isLight, setIsLight] = React.useState(true);

  return (
    <ThemeProvider theme={isLight ? lightTheme : darkTheme}>
      <button onClick={() => setIsLight(l => !l)}>Toggle theme</button>
      <div>I am {isLight ? 'light theme' : 'dark theme'}</div>
      <ThemeProvider theme={isLight ? darkTheme : lightTheme}>
        <div>I am a nested {isLight ? 'dark theme' : 'light theme'}</div>
      </ThemeProvider>
    </ThemeProvider>
  );
};

export const TestStylesheets = () => (
  <ThemeProvider className="foo" theme={themeWithStylesheets}>
    <span>I am courier new.</span>
  </ThemeProvider>
);

export default {
  title: 'ThemeProvider',
};
