import * as React from 'react';

import { FluentProvider } from '@fluentui/react-provider';
import {
  Theme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
} from '@fluentui/react-theme';
import { kumoSemanticTokens } from '@fluentui/semantic-tokens';
import { defaultTheme, ThemeIds } from '../theme';
import { DIR_ID, THEME_ID } from '../constants';
import { FluentStoryContext } from '../hooks';
import { isDecoratorDisabled } from '../utils/isDecoratorDisabled';
import { SEMANTIC_STYLE_HOOKS } from '@fluentui/semantic-style-hooks-preview';

// TODO: Remove this when merging Semantic tokens to master
const kumoCustomTheme = { ...webLightTheme, ...kumoSemanticTokens };

const themes: Record<ThemeIds | 'semantic-kumo', Theme> = {
  'web-light': webLightTheme,
  'web-dark': webDarkTheme,
  'teams-light': teamsLightTheme,
  'teams-dark': teamsDarkTheme,
  'teams-high-contrast': teamsHighContrastTheme,
  // TODO: Remove this when merging Semantic tokens to master
  'semantic-kumo': kumoCustomTheme,
} as const;

const findTheme = (themeId?: ThemeIds | 'semantic-kumo') => {
  return themeId ? themes[themeId] : null;
};

export const withFluentProvider = (StoryFn: () => JSX.Element, context: FluentStoryContext) => {
  const { globals, parameters } = context;
  const { mode } = parameters;

  if (isDecoratorDisabled(context, 'FluentProvider')) {
    return StoryFn();
  }

  const isVrTest = mode === 'vr-test';
  const dir = parameters.dir ?? globals[DIR_ID] ?? 'ltr';
  const globalTheme = findTheme(globals[THEME_ID]);
  const paramTheme = findTheme(parameters.fluentTheme);
  const theme = paramTheme ?? globalTheme ?? themes[defaultTheme.id];

  return (
    <FluentProvider theme={theme} dir={dir} customStyleHooks_unstable={SEMANTIC_STYLE_HOOKS}>
      {isVrTest ? StoryFn() : <FluentExampleContainer theme={theme}>{StoryFn()}</FluentExampleContainer>}
    </FluentProvider>
  );
};

const FluentExampleContainer: React.FC<{ theme: Theme }> = props => {
  const { theme } = props;

  const backgroundColor = theme.colorNeutralBackground2;
  return <div style={{ padding: '48px 24px', backgroundColor }}>{props.children}</div>;
};
