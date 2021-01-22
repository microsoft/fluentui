import React from 'react';
import { Provider, teamsTheme, teamsDarkTheme, teamsHighContrastTheme } from '@fluentui/react-northstar';

export const themes = {
  teamsTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
};

export const withNorthstarProvider = (Story, context) =>
  Object.entries(themes).map(([themeName, theme]) => (
    <div key={themeName}>
      <pre style={{ opacity: 0.4 }}>{`<Provider theme={${themeName}}>`}</pre>
      <Provider theme={theme}>
        <Story />
      </Provider>
      <br />
    </div>
  ));
