import * as React from 'react';
import { ComponentStory } from '@storybook/react';
import { Provider, teamsDarkV2Theme, teamsHighContrastTheme, teamsV2Theme } from '@fluentui/react-northstar';

const themes = {
  teamsV2: teamsV2Theme,
  teamsDarkV2: teamsDarkV2Theme,
  teamsHighContrast: teamsHighContrastTheme,
} as const;

export const getThemeStoryVariant = (story: ComponentStory<any>, themeName: keyof typeof themes) => {
  const theme = themes[themeName];

  return { ...story, render: story, decorators: [story => <Provider theme={theme}>{story()}</Provider>] };
};
