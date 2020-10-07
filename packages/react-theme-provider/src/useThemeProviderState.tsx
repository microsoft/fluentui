import { mergeThemes, Theme } from '@fluentui/theme';
import * as React from 'react';
import { getTokens } from './getTokens';
import { ThemeProviderState } from './ThemeProvider.types';
import { useTheme } from './useTheme';
import { getId, ICustomizerContext } from '@uifabric/utilities';

const themeToIdMap = new Map<Object, string>();

const getThemeId = (...themes: Theme[]) => {
  const ids: string[] = [];

  for (const theme of themes) {
    if (theme) {
      let id = theme.id || themeToIdMap.get(theme);

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
  const userTheme = draftState.theme;

  // Pull contextual theme.
  const parentTheme = useTheme();

  // Update the incoming theme with a memoized version of the merged theme.
  const theme = (draftState.theme = React.useMemo<Theme>(() => {
    const mergedTheme = mergeThemes<Theme>(parentTheme, userTheme);

    mergedTheme.tokens = getTokens(mergedTheme);

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
};
