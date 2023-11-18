import * as React from 'react';
import { css } from '@fluentui/utilities';
import { useDocument } from '@fluentui/react-window-provider';
import { makeStyles } from './makeStyles';
import type { ThemeProviderState } from './ThemeProvider.types';
import type { Theme } from '@fluentui/theme';

// eslint-disable-next-line deprecation/deprecation
const useThemeProviderStyles = makeStyles((theme: Theme) => {
  const { semanticColors, fonts } = theme;

  return {
    body: [
      {
        color: semanticColors.bodyText,
        background: semanticColors.bodyBackground,
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: fonts.medium.fontSize,
        MozOsxFontSmoothing: fonts.medium.MozOsxFontSmoothing,
        WebkitFontSmoothing: fonts.medium.WebkitFontSmoothing,
      },
    ],
  } as Record<string, any>;
});

/**
 * Hook to add class to body element.
 */
function useApplyClassToBody(state: ThemeProviderState, classesToApply: string[]): void {
  const { applyTo } = state;

  const applyToBody = applyTo === 'body';
  const body = useDocument()?.body;

  React.useEffect(() => {
    if (!applyToBody || !body) {
      return;
    }

    for (const classToApply of classesToApply) {
      if (classToApply) {
        body.classList.add(classToApply);
      }
    }

    return () => {
      if (!applyToBody || !body) {
        return;
      }

      for (const classToApply of classesToApply) {
        if (classToApply) {
          body.classList.remove(classToApply);
        }
      }
    };
  }, [applyToBody, body, classesToApply]);
}

export function useThemeProviderClasses(state: ThemeProviderState): void {
  const classes = useThemeProviderStyles(state);
  const { className, applyTo } = state;

  useApplyClassToBody(state, [classes.root, classes.body]);

  state.className = css(className, classes.root, applyTo === 'element' && classes.body);
}
