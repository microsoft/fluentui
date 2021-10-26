import * as React from 'react';
import { StoryFn as StoryFunction } from '@storybook/addons';

import { themes, defaultTheme, FluentProvider } from '../theme';
import { THEME_ID } from '../constants';
import { FluentGlobals, FluentStoryContext } from '../hooks';

import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  root: theme => ({
    padding: '10px',
    background: theme.colorNeutralBackground1,
  }),
});

const getActiveFluentTheme = (globals: FluentGlobals) => {
  const selectedThemeId = globals[THEME_ID];
  const { theme } = themes.find(value => value.id === selectedThemeId) ?? defaultTheme;

  return { theme };
};

export const withFluentProvider = (StoryFn: StoryFunction<React.ReactElement>, context: FluentStoryContext) => {
  const { theme } = getActiveFluentTheme(context.globals);
  return (
    <FluentProvider theme={theme}>
      <FluentExampleContainer>{StoryFn()}</FluentExampleContainer>
    </FluentProvider>
  );
};

const FluentExampleContainer: React.FC = props => {
  const styles = useStyles();

  return <div className={styles.root}>{props.children}</div>;
};
