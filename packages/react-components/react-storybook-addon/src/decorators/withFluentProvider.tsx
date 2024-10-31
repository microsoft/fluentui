import * as React from 'react';

import { FluentProvider } from '@fluentui/react-provider';
import {
  Theme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
  masonsDarkTheme,
  masonsLightTheme,
} from '@fluentui/react-theme';
import { defaultTheme, ThemeIds } from '../theme';
import { DIR_ID, THEME_ID } from '../constants';
import { FluentStoryContext } from '../hooks';
import { isDecoratorDisabled } from '../utils/isDecoratorDisabled';
import { CustomStyleHooksContext } from '../../../react-shared-contexts/library/src/CustomStyleHooksContext';
import { MasonsCustomStyleHooks } from './CustomStyleHooks/useCustomStyles.styles';

const themes: Record<ThemeIds, Theme> = {
  'web-light': webLightTheme,
  'web-dark': webDarkTheme,
  'teams-light': teamsLightTheme,
  'teams-dark': teamsDarkTheme,
  'teams-high-contrast': teamsHighContrastTheme,
  'masons-light': masonsLightTheme,
  'masons-dark': masonsDarkTheme,
} as const;

const findTheme = (themeId?: ThemeIds) => {
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
    <FluentProvider theme={theme} dir={dir}>
      <CustomStyleHooksContext.Provider value={MasonsCustomStyleHooks}>
        {isVrTest ? StoryFn() : <FluentExampleContainer theme={theme}>{StoryFn()}</FluentExampleContainer>}
      </CustomStyleHooksContext.Provider>
    </FluentProvider>
  );
};

const FluentExampleContainer: React.FC<{ theme: Theme }> = props => {
  const { theme } = props;

  const backgroundColor = theme.colorNeutralBackground2;
  return <div style={{ padding: '48px 24px', backgroundColor }}>{props.children}</div>;
};
