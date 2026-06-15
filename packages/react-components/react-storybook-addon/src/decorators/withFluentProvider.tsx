import * as React from 'react';

import { FluentProvider } from '@fluentui/react-provider';
import type { JSXElement } from '@fluentui/react-utilities';
import type { Theme } from '@fluentui/react-theme';
import {
  teamsDarkTheme,
  teamsDarkV21Theme,
  teamsHighContrastTheme,
  teamsLightTheme,
  teamsLightV21Theme,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-theme';
import { CAP_STYLE_HOOKS } from '@fluentui-contrib/react-cap-theme';
import type { ThemeIds } from '../theme';
import { defaultTheme } from '../theme';
import { CAP_ID, DIR_ID, THEME_ID } from '../constants';
import type { FluentStoryContext } from '../hooks';
import { isDecoratorDisabled } from '../utils/isDecoratorDisabled';
const themes: Record<ThemeIds, Theme> = {
  'web-light': webLightTheme,
  'web-dark': webDarkTheme,
  'teams-light': teamsLightTheme,
  'teams-dark': teamsDarkTheme,
  'teams-high-contrast': teamsHighContrastTheme,
  'teams-light-v21': teamsLightV21Theme,
  'teams-dark-v21': teamsDarkV21Theme,
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
  const globalThemeId: ThemeIds | undefined = globals[THEME_ID];
  const paramThemeId: ThemeIds | undefined = parameters.fluentTheme;
  const globalTheme = findTheme(globalThemeId);
  const paramTheme = findTheme(paramThemeId);
  const theme = paramTheme ?? globalTheme ?? themes[defaultTheme.id];

  // CAP is a visual-language overlay applied on top of any base Fluent theme.
  // Toggle via the Storybook toolbar (CAP switch) or per-story via `parameters.cap`.
  const capValue = parameters.cap ?? globals[CAP_ID];
  const capEnabled = capValue === 'cap';
  const customStyleHooks = capEnabled ? CAP_STYLE_HOOKS : undefined;

  // CAP style hooks add their own React hook calls inside each Fluent component
  // (e.g. CAP's `useButtonStyles` calls 9 hooks). Switching `customStyleHooks_unstable`
  // between `undefined` and an object on a live tree changes the hook count, which
  // violates the Rules of Hooks. Keying on `capEnabled` forces the subtree to
  // remount so the hook order stays consistent within each mount.
  const providerKey = capEnabled ? 'cap-on' : 'cap-off';

  return (
    <FluentProvider key={providerKey} theme={theme} dir={dir} customStyleHooks_unstable={customStyleHooks}>
      {isVrTest ? StoryFn() : <FluentExampleContainer theme={theme}>{StoryFn()}</FluentExampleContainer>}
    </FluentProvider>
  );
};

const FluentExampleContainer: React.FC<{ children: React.ReactNode; theme: Theme }> = props => {
  const { theme } = props;

  const backgroundColor = theme.colorNeutralBackground2;
  return <div style={{ padding: '48px 24px', backgroundColor }}>{props.children}</div>;
};
