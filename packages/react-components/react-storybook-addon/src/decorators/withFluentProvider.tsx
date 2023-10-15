import * as React from 'react';

import { FluentProvider } from '@fluentui/react-provider';
import { AnatomyInspector } from '@fluentui/react-anatomy-inspector';
import { Theme } from '@fluentui/react-theme';
import { themes, defaultTheme, ThemeIds } from '../theme';
import { THEME_ID } from '../constants';
import { FluentGlobals, FluentStoryContext } from '../hooks';

const findTheme = (themeId?: ThemeIds) => {
  if (!themeId) {
    return;
  }
  return themes.find(value => value.id === themeId);
};

const getActiveFluentTheme = (globals: FluentGlobals) => {
  const selectedThemeId = globals[THEME_ID];
  const { theme } = findTheme(selectedThemeId) ?? defaultTheme;

  return { theme };
};

export const withFluentProvider = (StoryFn: () => JSX.Element, context: FluentStoryContext) => {
  const { globals, parameters } = context;
  const { mode } = parameters;
  const isVrTest = mode === 'vr-test';

  const globalTheme = getActiveFluentTheme(globals);
  const paramTheme = findTheme(parameters.fluentTheme);
  const { theme } = paramTheme ?? globalTheme;

  const displayName = context?.title?.split('/').pop()?.replace(/ /g, '') ?? '';

  return (
    <FluentProvider theme={theme} dir={parameters.dir}>
      {isVrTest ? (
        StoryFn()
      ) : (
        <FluentExampleContainer theme={theme}>
          <AnatomyInspector displayName={displayName}>{StoryFn()}</AnatomyInspector>
        </FluentExampleContainer>
      )}
    </FluentProvider>
  );
};

const FluentExampleContainer: React.FC<{ theme: Theme }> = props => {
  const { theme } = props;

  const backgroundColor = theme.colorNeutralBackground2;
  return <div style={{ padding: '48px 24px', backgroundColor }}>{props.children}</div>;
};
