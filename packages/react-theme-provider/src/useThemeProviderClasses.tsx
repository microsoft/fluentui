import * as React from 'react';
import { css } from '@uifabric/utilities';
import { IRawStyle } from '@uifabric/merge-styles';
import { useDocument } from '@fluentui/react-window-provider';
import { makeStyles } from './makeStyles';
import { ThemeProviderState } from './ThemeProvider.types';
import { tokensToStyleObject } from './tokensToStyleObject';

const useThemeProviderStyles = makeStyles(theme => {
  const { tokens } = theme;
  const tokenStyles = tokensToStyleObject(tokens) as IRawStyle;

  return {
    root: tokenStyles,
    body: [
      {
        color: 'var(--color-body-contentColor)',
        background: 'var(--color-body-background)',
        fontFamily: 'var(--body-fontFamily)',
        fontWeight: 'var(--body-fontWeight)',
        fontSize: 'var(--body-fontSize)',
        MozOsxFontSmoothing: 'var(--body-mozOsxFontSmoothing)',
        WebkitFontSmoothing: 'var(--body-webkitFontSmoothing)',
      },
    ],
  };
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
  const classes = useThemeProviderStyles(state.theme, state.renderer);
  useApplyClassToBody(state, [classes.root, classes.body]);

  const { className, applyTo } = state;
  state.className = css(className, classes.root, applyTo === 'element' && classes.body);
}
