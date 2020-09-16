import * as React from 'react';
import { css } from '@uifabric/utilities';
import { useDocument } from '@fluentui/react-window-provider';
import { makeStyles } from './makeStyles';
import { ThemeProviderState } from './ThemeProvider.types';
import { tokensToStyleObject } from './tokensToStyleObject';

const inheritFont = { fontFamily: 'inherit' };

const useThemeProviderStyles = makeStyles(theme => {
  const { tokens } = theme;

  const defaultStyles = [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    tokensToStyleObject(tokens) as any,
    {
      color: 'var(--color-body-contentColor)',
      fontFamily: 'var(--body-fontFamily)',
      fontWeight: 'var(--body-fontWeight)',
      fontSize: 'var(--body-fontSize)',
      MozOsxFontSmoothing: 'var(--body-mozOsxFontSmoothing)',
      WebkitFontSmoothing: 'var(--body-webkitFontSmoothing)',
    },
    {
      '& input': inheritFont,
      '& textarea': inheritFont,
    },
  ];

  return {
    root: defaultStyles,
    applyBodyTheme: [...defaultStyles, { background: 'var(--color-body-background)' }],
  };
});

/**
 * Hook to add class to body element.
 */
function useApplyToBody(state: ThemeProviderState, classToApply: string): void {
  const { applyTo } = state;

  const applyToBody = applyTo === 'body';
  const body = useDocument()?.body;

  React.useEffect(() => {
    if (!applyToBody || !body) {
      return;
    }

    if (classToApply) {
      body.classList.add(classToApply);
    }

    return () => {
      if (!applyToBody || !body) {
        return;
      }

      if (classToApply) {
        body.classList.remove(classToApply);
      }
    };
  }, [applyToBody, body, classToApply]);
}

export function useThemeProviderClasses(state: ThemeProviderState): void {
  const classes = useThemeProviderStyles(state.theme, state.renderer);
  useApplyToBody(state, classes.applyBodyTheme);

  const { className, applyTo } = state;
  state.className = css(className, applyTo === 'element' ? classes.applyBodyTheme : classes.root);
}
