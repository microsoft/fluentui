import { mergeThemes } from '@fluentui/theme';
import * as React from 'react';
import { useTheme } from './useTheme';
import { getId } from '@fluentui/utilities';
import type { PartialTheme, Theme } from '@fluentui/theme';
import type { ThemeProviderState } from './ThemeProvider.types';
import type { ICustomizerContext } from '@fluentui/utilities';

const themeToIdMap = new Map<Object, string>();

const getThemeId = (...themes: (Theme | PartialTheme | undefined)[]) => {
  const ids: string[] = [];

  for (const theme of themes) {
    if (theme) {
      let id = (theme as Theme).id || themeToIdMap.get(theme);

      if (!id) {
        id = getId('');
        themeToIdMap.set(theme, id);
      }
      ids.push(id);
    }
  }

  return ids.join('-');
};

export const useThemeProviderState = (draftState: ThemeProviderState) => {
  const userTheme: PartialTheme = draftState.theme;

  // Pull contextual theme.
  const parentTheme = useTheme();

  // Update the incoming theme with a memoized version of the merged theme.
  const theme = (draftState.theme = React.useMemo<Theme>(() => {
    const mergedTheme: Theme = mergeThemes(parentTheme, userTheme);

    mergedTheme.id = getThemeId(parentTheme, userTheme);

    return mergedTheme;
  }, [parentTheme, userTheme]));

  draftState.customizerContext = React.useMemo<ICustomizerContext>(
    () => ({
      customizations: {
        inCustomizerContext: true,
        settings: { theme },
        scopedSettings: theme.components || {},
      },
    }),
    [theme],
  );

  if (draftState.theme.rtl !== parentTheme.rtl) {
    draftState.dir = draftState.theme.rtl ? 'rtl' : 'ltr';
  }
};
