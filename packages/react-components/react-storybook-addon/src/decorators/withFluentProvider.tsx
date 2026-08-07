import * as React from 'react';

import { FluentProvider } from '@fluentui/react-provider';
import type { JSXElement } from '@fluentui/react-utilities';
import {
  teamsDarkThemeClassName,
  teamsDarkV21ThemeClassName,
  teamsHighContrastThemeClassName,
  teamsLightThemeClassName,
  teamsLightV21ThemeClassName,
  tokens,
  webDarkThemeClassName,
  webLightThemeClassName,
} from '@fluentui/react-theme';
import type { ThemeIds } from '../theme';
import { defaultTheme } from '../theme';
import { DIR_ID, THEME_ID } from '../constants';
import type { FluentStoryContext } from '../hooks';
import { isDecoratorDisabled } from '../utils/isDecoratorDisabled';

const themes: Record<ThemeIds, string> = {
  'web-light': webLightThemeClassName,
  'web-dark': webDarkThemeClassName,
  'teams-light': teamsLightThemeClassName,
  'teams-dark': teamsDarkThemeClassName,
  'teams-high-contrast': teamsHighContrastThemeClassName,
  'teams-light-v21': teamsLightV21ThemeClassName,
  'teams-dark-v21': teamsDarkV21ThemeClassName,
} as const;

const findTheme = (themeId?: ThemeIds) => {
  return themeId ? themes[themeId] : null;
};

export const withFluentProvider = (StoryFn: () => JSXElement, context: FluentStoryContext): JSXElement => {
  const { globals, parameters } = context;
  const { mode } = parameters;

  if (isDecoratorDisabled(context, 'FluentProvider')) {
    return StoryFn();
  }

  const isVrTest = mode === 'vr-test';
  const dir = parameters.dir ?? globals[DIR_ID] ?? 'ltr';
  const globalTheme = findTheme(globals[THEME_ID]);
  const paramTheme = findTheme(parameters.fluentTheme);
  const themeClassName = paramTheme ?? globalTheme ?? themes[defaultTheme.id];

  return (
    <FluentProvider themeClassName={themeClassName} dir={dir}>
      {isVrTest ? StoryFn() : <FluentExampleContainer>{StoryFn()}</FluentExampleContainer>}
    </FluentProvider>
  );
};

const FluentExampleContainer: React.FC<{ children: React.ReactNode }> = props => {
  const backgroundColor = tokens.colorNeutralBackground2;
  return <div style={{ padding: '48px 24px', backgroundColor }}>{props.children}</div>;
};
