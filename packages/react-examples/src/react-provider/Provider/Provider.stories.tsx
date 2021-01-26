import { Provider } from '@fluentui/react-provider';
import { teamsLightTheme, teamsDarkTheme, webLightTheme } from '@fluentui/react-theme';
import * as React from 'react';

const containerStyles = {
  border: `5px solid var(--neutralColorTokens-neutralStroke1)`,
  backgroundColor: 'var(--neutralColorTokens-neutralBackground1)',
  color: 'var(--neutralColorTokens-brandForeground)',

  margin: '5px',
  padding: '5px',
};

export const Direction = () => (
  <>
    <p>This example shows usage of "dir" attribute to change text direction.</p>

    <Provider theme={teamsLightTheme}>
      <div style={containerStyles}>Hello World!</div>
    </Provider>
    <Provider dir="rtl" theme={teamsLightTheme}>
      <div style={containerStyles}>مرحبا بالعالم!</div>
    </Provider>
  </>
);

export const DifferentThemes = () => (
  <>
    <p>This example shows usage of different themes with the same tokens set.</p>

    <h2>Teams Light Theme</h2>
    <Provider theme={teamsLightTheme}>
      <div style={containerStyles}>Hello World!</div>
    </Provider>

    <h2>Teams Dark Theme</h2>
    <Provider theme={teamsDarkTheme}>
      <div style={containerStyles}>Hello World!</div>
    </Provider>

    <h2>Web Light Theme</h2>
    <Provider theme={webLightTheme}>
      <div style={containerStyles}>Hello World!</div>
    </Provider>
  </>
);

export const ThemesMerge = () => (
  <>
    <p>This example shows theme composition and partial overrides of tokens.</p>

    <Provider theme={teamsLightTheme}>
      <Provider
        theme={{
          neutralColorTokens: {
            neutralBackground1: 'salmon',
            brandForeground: 'white',
          },
        }}
      >
        <div style={containerStyles}>Hello World!</div>
      </Provider>
    </Provider>
  </>
);
