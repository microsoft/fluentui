import { useId, usePrevious } from '@fluentui/react-utilities';
import { hcMediaQuery, themeToCSSVariables } from '@fluentui/react-theme';
import * as React from 'react';
import type { FluentProviderState } from './FluentProvider.types';

const globalHcColorTokens = [
  '--global-color-hcButtonFace',
  '--global-color-hcButtonText',
  '--global-color-hcCanvas',
  '--global-color-hcCanvasText',
  '--global-color-hcDisabled',
  '--global-color-hcHighlight',
  '--global-color-hcHighlightText',
  '--global-color-hcHyperlink',
];
const globalHcColorTokensToValuesMapping: { [key: string]: string } = {
  '--global-color-hcButtonFace': 'ButtonFace',
  '--global-color-hcButtonText': 'ButtonText',
  '--global-color-hcCanvas': 'Canvas',
  '--global-color-hcCanvasText': 'CanvasText',
  '--global-color-hcDisabled': 'GrayText',
  '--global-color-hcHighlight': 'Highlight',
  '--global-color-hcHighlightText': 'HighlightText',
  '--global-color-hcHyperlink': 'LinkText',
};

/**
 * Writes a theme as css variables in a style tag on the provided targetDocument as a rule applied to a CSS class
 *
 * @returns CSS class to apply the rule
 */
export const useThemeStyleTag = (options: Pick<FluentProviderState, 'theme' | 'targetDocument'>) => {
  const { targetDocument, theme } = options;

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
      if (hcMediaQuery && hcMediaQuery.matches && globalHcColorTokens.includes(cssVar)) {
        return cssVarRule + `${cssVar}: ${globalHcColorTokensToValuesMapping[cssVar]}; `;
      }

      return cssVarRule + `${cssVar}: ${cssVars[cssVar]}; `;
    }, '');

    if (hcMediaQuery && hcMediaQuery.matches) {
      cssVarsAsString += 'forced-color-adjust: none;';
    }

    // result: .fluent-provider1 { --css-var: '#fff' }
    return `.${styleTagId} { ${cssVarsAsString} }`;
  }, [styleTagId, theme]);
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
