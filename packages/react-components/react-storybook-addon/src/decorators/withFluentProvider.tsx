import * as React from 'react';

import { FluentProvider } from '@fluentui/react-provider';
import { defaultTheme, Theme, ThemeIds } from '../theme';
import { DIR_ID, THEME_ID } from '../constants';
import { FluentStoryContext } from '../hooks';
import { isDecoratorDisabled } from '../utils/isDecoratorDisabled';
import { CustomStyleHooksContext } from '../../../react-shared-contexts/library/src/CustomStyleHooksContext';
import { MasonsCustomStyleHooks } from '../../../masons-theme-preview/library/src/masonsTheme/useCustomStyles.styles';
import { masonsLightTheme } from '../../../masons-theme-preview/library/src/masonsTheme/lightTheme';
import { masonsDarkTheme } from '../../../masons-theme-preview/library/src/masonsTheme/index';

const themes: Record<ThemeIds, Theme> = {
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
