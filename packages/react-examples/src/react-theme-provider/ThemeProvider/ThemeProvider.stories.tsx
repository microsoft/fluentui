import * as React from 'react';
import { useTheme, Theme, ThemeContext, ThemeProvider } from '@fluentui/react-theme-provider';

export default {
  title: 'ThemeProvider',
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
