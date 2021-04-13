import * as React from 'react';
import { useIsomorphicLayoutEffect, useId, usePrevious } from '@fluentui/react-utilities';
import { themeToCSSVariables } from '@fluentui/react-theme';
import { ThemeProviderState } from './ThemeProvider.types';

/**
 * Writes a theme as css variables in a style tag on the provided targetDocument as a rule applied to a CSS class
 *
 * @param theme Theme values that are written as css variables in style rule
 * @returns CSS class to apply the rule
 */
export const useThemeStyleTag = (
  theme: ThemeProviderState['theme'],
  targetDocument: ThemeProviderState['targetDocument'],
) => {
  const styleTagId = useId('theme-provider');
  const styleTag = React.useMemo(() => {
    if (!targetDocument) {
      return null;
    }

    const tag = targetDocument.createElement('style');
    tag.setAttribute('id', styleTagId);
    targetDocument.head.appendChild(tag);
    return tag;
  }, [styleTagId, targetDocument]);

  const cssRule = React.useMemo(() => {
    const cssVars = themeToCSSVariables(theme);
    const cssVarsAsString = Object.keys(cssVars).reduce((cssVarRule, cssVar) => {
      cssVarRule += `${cssVar}: ${cssVars[cssVar]}; `;
      return cssVarRule;
    }, '');

    // result: .theme-provider { --css-var: '#fff' }
    return `.${styleTagId} { ${cssVarsAsString} }`;
  }, [theme, styleTagId]);
  const previousCssRule = usePrevious(cssRule);

  if (styleTag && previousCssRule !== cssRule) {
    const sheet = styleTag.sheet as CSSStyleSheet;

    if (sheet.cssRules.length > 0) {
      sheet.deleteRule(0);
    }

    sheet.insertRule(cssRule, 0);
  }

  // Removes the style tag from the targetDocument on unmount or change
  useIsomorphicLayoutEffect(() => {
    return () => {
      if (styleTag) {
        // IE11 safe node removal, otherwise use node.remove()
        styleTag.parentElement?.removeChild(styleTag);
      }
    };
  }, [styleTag]);

  return styleTagId;
};
