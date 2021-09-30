import { teamsLightTheme, teamsDarkTheme, webLightTheme } from '@fluentui/react-theme';
import { makeStyles } from '@fluentui/react-make-styles';
import * as React from 'react';

import { FluentProvider } from './index';

const useStyles = makeStyles({
  box: theme => ({
    border: `5px solid ${theme.colorBrandStroke1}`,
    backgroundColor: theme.colorBrandBackground2,
    color: theme.colorBrandForeground2,

    padding: '5px',
  }),
  container: {
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
  },
});

const Box: React.FC = props => {
  const classes = useStyles();

  return <div className={classes.box}>{props.children}</div>;
};

const Container: React.FC = props => {
  const classes = useStyles();

  return <div className={classes.container}>{props.children}</div>;
};

export const Direction = () => (
  <>
    <p>This example shows usage of "dir" attribute to change text direction.</p>

    <Container>
      <FluentProvider theme={teamsLightTheme}>
        <Box>Hello World!</Box>
      </FluentProvider>
      <FluentProvider dir="rtl" theme={teamsLightTheme}>
        <Box>مرحبا بالعالم!</Box>
      </FluentProvider>
    </Container>
  </>
);

export const DifferentThemes = () => (
  <>
    <p>This example shows usage of different themes with the same tokens set.</p>

    <h2>Teams Light Theme</h2>
    <FluentProvider theme={teamsLightTheme}>
      <Box>Hello World!</Box>
    </FluentProvider>

    <h2>Teams Dark Theme</h2>
    <FluentProvider theme={teamsDarkTheme}>
      <Box>Hello World!</Box>
    </FluentProvider>

    <h2>Web Light Theme</h2>
    <FluentProvider theme={webLightTheme}>
      <Box>Hello World!</Box>
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
                brandStroke1: 'salmon',
                brandBackground2: 'white',
              },
            },
          },
        }}
      >
        <Box>Hello World!</Box>
      </FluentProvider>
    </FluentProvider>
  </>
);

export default {
  title: 'Components/FluentProvider',
  component: FluentProvider,
};
