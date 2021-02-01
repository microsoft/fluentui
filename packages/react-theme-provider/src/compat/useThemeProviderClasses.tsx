import * as React from 'react';
import { css } from '@fluentui/utilities';
import { useDocument } from '@fluentui/react-window-provider';
import { makeStyles } from './makeStyles';
import { ThemeProviderState } from './ThemeProvider.types';
import { tokensToStyleObject } from './tokensToStyleObject';
import { Theme } from './types';

const useThemeProviderStyles = makeStyles((theme: Theme) => {
  const { tokens } = theme;
  const tokenStyles = tokensToStyleObject(tokens);

  return {
    root: tokenStyles,
    body: [
      {
        color: tokens?.color?.body?.contentColor,
        background: tokens?.color?.body?.background,
        fontFamily: tokens?.body?.fontFamily,
        fontWeight: tokens?.body?.fontWeight,
        fontSize: tokens?.body?.fontSize,
        MozOsxFontSmoothing: tokens?.body?.mozOsxFontSmoothing,
        WebkitFontSmoothing: tokens?.body?.webkitFontSmoothing,
      },
    ],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
