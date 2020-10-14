import * as React from 'react';
import { useTheme, PartialTheme, Theme, ThemeContext, ThemeProvider } from '@fluentui/react-theme-provider';

export default {
  title: 'ThemeProvider',
};

const lightTheme: PartialTheme = {
  tokens: {
    color: {
      body: {
        background: 'white',
        contentColor: 'black',
        fontFamily: 'Segoe UI',
      },
    },
  },
};

const darkTheme: PartialTheme = {
  tokens: {
    color: {
      body: {
        background: 'black',
        contentColor: 'white',
      },
    },
  },
};

export const ApplyThemeToBody = () => {
  const [isLight, setIsLight] = React.useState(true);

  return (
    <ThemeProvider className="root" applyTo="body" theme={isLight ? lightTheme : darkTheme}>
      <button onClick={() => setIsLight(l => !l)}>Toggle theme</button>
      <div>I am {isLight ? 'light theme' : 'dark theme'}</div>
      <ThemeProvider theme={isLight ? darkTheme : lightTheme}>
        <div>I am a nested {isLight ? 'dark theme' : 'light theme'}</div>
      </ThemeProvider>
    </ThemeProvider>
  );
};

const ThemedContentFC = () => {
  const theme = useTheme();
  console.log('theme from useTheme', theme);

  return null;
};

class ThemedContent extends React.Component<{}> {
  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme: Theme | undefined) => {
          console.log('theme from context consumer', theme);
          return null;
        }}
      </ThemeContext.Consumer>
    );
  }
}

export const AccessTheme = () => (
  <ThemeProvider>
    <ThemedContent />
    <ThemedContentFC />
    <div>See console log</div>
  </ThemeProvider>
);
