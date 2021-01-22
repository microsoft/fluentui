import React from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { Provider, teamsTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-northstar';

export const themes = {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
};

export const withThemeProvider = (Story, context) => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <h2>@fluentui/react-northstar</h2>
      {Object.entries(themes).map(([themeName, theme]) => (
        <div key={themeName}>
          <pre style={{ opacity: 0.4 }}>{`<Provider theme={${themeName}}>`}</pre>
          <Provider theme={theme}>
            <Story />
          </Provider>
          <br />
        </div>
      ))}
    </div>

    <div style={{ flex: 1 }}>
      <h2>@fluentui/react-theme-provider</h2>
      <div>
        <pre style={{ opacity: 0.4 }}>{'<ThemeProvider />'}</pre>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </div>
    </div>
  </div>
);
