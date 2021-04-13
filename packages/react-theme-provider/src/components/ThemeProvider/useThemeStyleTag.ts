import * as React from 'react';
import { useIsomorphicLayoutEffect, useId } from '@fluentui/react-utilities';
import { themeToCSSVariables } from '@fluentui/react-theme';
import { ThemeProviderState } from './ThemeProvider.types';

/**
 * Writes a theme as css variables in a style tag on the provided document as a rule applied to a CSS class
 *
 * @param theme Theme values that are written as css variables in style rule
 * @returns CSS class to apply the rule
 */
export const useThemeStyleTag = (theme: ThemeProviderState['theme'], document: ThemeProviderState['document']) => {
  const styleTagId = useId('theme-provider');
  const styleTag = getOrCreateStyleTag(styleTagId);

  const cssRule = React.useMemo(() => {
    const cssVars = themeToCSSVariables(theme);
    const cssVarsAsString = Object.keys(cssVars).reduce((cssVarRule, cssVar) => {
      cssVarRule += `${cssVar}: ${cssVars[cssVar]}; `;
      return cssVarRule;
    }, '');

    // result: .theme-provider { --css-var: '#fff' }
    return `.${styleTagId} { ${cssVarsAsString} }`;
  }, [theme, styleTagId]);

  useIsomorphicLayoutEffect(() => {
    if (document === null || document === undefined) {
      return;
    }
    const sheet = styleTag.sheet as CSSStyleSheet;

    if (sheet.cssRules.length > 0) {
      sheet.deleteRule(0);
    }

    sheet.insertRule(cssRule, 0);
  }, [cssRule, styleTag]);

  // Removes the style tag from the document on unmount or if the id of the tag changes
  useIsomorphicLayoutEffect(() => {
    return () => {
      const styleTagCleanup = document?.getElementById(styleTagId);
      if (styleTagCleanup) {
        // IE11 safe node removal, otherwise use node.remove()
        styleTagCleanup.parentElement?.removeChild(styleTagCleanup);
      }
    };
  }, [styleTagId]);

  return styleTagId;
};

const getOrCreateStyleTag = (id: string): HTMLStyleElement => {
  let styleTag = document.getElementById(id) as HTMLStyleElement;
  if (styleTag) {
    return styleTag;
  }

  styleTag = document.createElement('style');
  styleTag.setAttribute('id', id);
  document.head.appendChild(styleTag);
  return styleTag;
};
