import { useId, usePrevious } from '@fluentui/react-utilities';
import * as React from 'react';
import type { FluentProviderState } from './FluentProvider.types';
import { fluentProviderClassNames } from './useFluentProviderStyles';

/**
 * Writes a theme as css variables in a style tag on the provided targetDocument as a rule applied to a CSS class
 *
 * @returns CSS class to apply the rule
 */
export const useThemeStyleTag = (options: Pick<FluentProviderState, 'theme' | 'targetDocument'>) => {
  const { targetDocument, theme } = options;

  const styleTagId = useId(fluentProviderClassNames.root);
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
    const cssVarsAsString = theme
      ? (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
          cssVarRule += `--${cssVar}: ${theme[cssVar]}; `;
          return cssVarRule;
        }, '')
      : '';

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
        styleTag.remove();
      }
    };
  }, [styleTag]);

  return styleTagId;
};
