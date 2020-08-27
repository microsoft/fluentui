import { useStylesheet } from '@fluentui/react-stylesheets';
import { mergeThemes, Theme } from '@fluentui/theme';
import * as React from 'react';
import { getTokens } from './getTokens';
import { ThemeProviderState } from './ThemeProvider.types';
import { useTheme } from './useTheme';

export const useThemeProviderState = (draftState: ThemeProviderState) => {
  const userTheme = draftState.theme;

  // Pull contextual theme.
  const parentTheme = useTheme();

  // Update the incoming theme with a memoized version of the merged theme.
  draftState.theme = React.useMemo<Theme>(() => {
    const mergedTheme = mergeThemes<Theme>(parentTheme, userTheme);

    mergedTheme.tokens = getTokens(mergedTheme);
    return mergedTheme;
  }, [parentTheme, userTheme]);

  // Register stylesheets as needed.
  useStylesheet(draftState.theme.stylesheets);
};
