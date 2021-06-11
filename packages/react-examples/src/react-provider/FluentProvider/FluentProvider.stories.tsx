import { FluentProvider } from '@fluentui/react-provider';
import { teamsLightTheme, teamsDarkTheme, webLightTheme } from '@fluentui/react-theme';
import * as React from 'react';

const containerStyles = {
  border: `5px solid var(--neutralColorTokens-neutralStroke1)`,
  backgroundColor: 'var(--neutralColorTokens-neutralBackground1)',
  color: 'var(--neutralColorTokens-brandForeground1)',

  margin: '5px',
  padding: '5px',
};

export const Direction = () => (
  <>
    <p>This example shows usage of "dir" attribute to change text direction.</p>

    <FluentProvider theme={teamsLightTheme}>
      <div style={containerStyles}>Hello World!</div>
    </FluentProvider>
    <FluentProvider dir="rtl" theme={teamsLightTheme}>
      <div style={containerStyles}>مرحبا بالعالم!</div>
    </FluentProvider>
  </>
);

export const DifferentThemes = () => (
  <>
    <p>This example shows usage of different themes with the same tokens set.</p>

    <h2>Teams Light Theme</h2>
    <FluentProvider theme={teamsLightTheme}>
      <div style={containerStyles}>Hello World!</div>
    </FluentProvider>

    <h2>Teams Dark Theme</h2>
    <FluentProvider theme={teamsDarkTheme}>
      <div style={containerStyles}>Hello World!</div>
    </FluentProvider>

    <h2>Web Light Theme</h2>
    <FluentProvider theme={webLightTheme}>
      <div style={containerStyles}>Hello World!</div>
    </FluentProvider>
  </>
);

export const ThemesMerge = () => (
  <>
    <p>This example shows theme composition and partial overrides of tokens.</p>

    <FluentProvider theme={teamsLightTheme}>
      <FluentProvider
        theme={{
          alias: {
            color: {
              neutral: {
                neutralBackground1: 'salmon',
                brandForeground1: 'white',
              },
            },
          },
        }}
      >
        <div style={containerStyles}>Hello World!</div>
      </FluentProvider>
    </FluentProvider>
  </>
);
