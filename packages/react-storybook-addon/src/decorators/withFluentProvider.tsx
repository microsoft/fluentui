import * as React from 'react';
import { StoryFn as StoryFunction } from '@storybook/addons';

import { themes, defaultTheme, FluentProvider } from '../theme';
import { THEME_ID } from '../constants';
import { FluentGlobals, FluentStoryContext } from '../hooks';

import { Theme } from '@fluentui/react-theme';

const getActiveFluentTheme = (globals: FluentGlobals) => {
  const selectedThemeId = globals[THEME_ID];
  const { theme } = themes.find(value => value.id === selectedThemeId) ?? defaultTheme;

  return { theme };
};

export const withFluentProvider = (StoryFn: StoryFunction<React.ReactElement>, context: FluentStoryContext) => {
  const { theme } = getActiveFluentTheme(context.globals);

  return (
    <FluentProvider theme={theme}>
      <FluentExampleContainer theme={theme}>{StoryFn()}</FluentExampleContainer>
    </FluentProvider>
  );
};

const FluentExampleContainer: React.FC<{ theme: Theme }> = props => {
  return <div style={{ padding: '48px 24px' }}>{props.children}</div>;
};
