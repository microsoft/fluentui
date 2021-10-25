import * as React from 'react';
import { StoryFn as StoryFunction } from '@storybook/addons';

import { themes, defaultTheme, FluentProvider } from './theme';
import { THEME_ID } from './constants';
import { Globals, StoryContext } from './hooks';

const getActiveFluentTheme = (globals: Globals) => {
  const selectedThemeId = globals[THEME_ID];
  const { theme } = themes.find(value => value.id === selectedThemeId) ?? defaultTheme;

  return { theme };
};

export const withFluentProvider = (StoryFn: StoryFunction<React.ReactElement>, context: StoryContext) => {
  const { theme } = getActiveFluentTheme(context.globals);

  return <FluentProvider theme={theme}>{StoryFn()}</FluentProvider>;
};
