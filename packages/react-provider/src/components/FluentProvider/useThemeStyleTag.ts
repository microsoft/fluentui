import { useId, usePrevious } from '@fluentui/react-utilities';
import { webHighContrastTheme, themeToCSSVariables } from '@fluentui/react-theme';
import * as React from 'react';
import type { FluentProviderState } from './FluentProvider.types';

const hcMediaQuery =
  window && window.matchMedia && window.matchMedia('screen and (-ms-high-contrast: active), (forced-colors: active)');

/**
 * Writes a theme as css variables in a style tag on the provided targetDocument as a rule applied to a CSS class
 *
 * @returns CSS class to apply the rule
 */
export const useThemeStyleTag = (options: Pick<FluentProviderState, 'theme' | 'targetDocument'>) => {
  const { targetDocument } = options;
  let { theme } = options;

  if (hcMediaQuery && hcMediaQuery.matches) {
    theme = webHighContrastTheme;

    theme.global.color.hcButtonFace = 'ButtonFace';
    theme.global.color.hcButtonText = 'ButtonText';
    theme.global.color.hcCanvas = 'Canvas';
    theme.global.color.hcCanvasText = 'CanvasText';
    theme.global.color.hcDisabled = 'GrayText';
    theme.global.color.hcHighlight = 'Highlight';
    theme.global.color.hcHighlightText = 'HighlightText';
    theme.global.color.hcHyperlink = 'LinkText';
  }

  const styleTagId = useId('fluent-provider');
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
    let cssVarsAsString = Object.keys(cssVars).reduce((cssVarRule, cssVar) => {
      cssVarRule += `${cssVar}: ${cssVars[cssVar]}; `;
      return cssVarRule;
    }, '');

    if (hcMediaQuery && hcMediaQuery.matches) {
      cssVarsAsString += 'forced-color-adjust: none;';
    }

    // result: .fluent-provider1 { --css-var: '#fff' }
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
  React.useEffect(() => {
    return () => {
      if (styleTag) {
        // IE11 safe node removal, otherwise use node.remove()
        styleTag.parentElement?.removeChild(styleTag);
      }
    };
  }, [styleTag]);

  return styleTagId;
};
