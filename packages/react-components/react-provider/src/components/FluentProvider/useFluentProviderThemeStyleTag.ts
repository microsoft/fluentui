import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useRenderer_unstable } from '@griffel/react';
import * as React from 'react';

import type { FluentProviderState } from './FluentProvider.types';
import { fluentProviderClassNames } from './useFluentProviderStyles';

// String concatenation is used to prevent bundlers to complain with older versions of React
const useInsertionEffect = (React as never)['useInsertion' + 'Effect']
  ? (React as never)['useInsertion' + 'Effect']
  : useIsomorphicLayoutEffect;

const createStyleTag = (target: Document | undefined, elementAttributes: Record<string, string>) => {
  if (!target) {
    return undefined;
  }

  const tag = target.createElement('style');

  Object.keys(elementAttributes).forEach(attrName => {
    tag.setAttribute(attrName, elementAttributes[attrName]);
  });

  target.head.appendChild(tag);
  return tag;
};

const insertSheet = (tag: HTMLStyleElement, rule: string) => {
  const sheet = tag.sheet;

  if (sheet) {
    if (sheet.cssRules.length > 0) {
      sheet.deleteRule(0);
    }
    sheet.insertRule(rule, 0);
  } else if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error('FluentProvider: No sheet available on styleTag, styles will not be inserted into DOM.');
  }
};

/**
 * Writes a theme as css variables in a style tag on the provided targetDocument as a rule applied to a CSS class
 *
 * @returns CSS class to apply the rule
 */
export const useFluentProviderThemeStyleTag = (options: Pick<FluentProviderState, 'theme' | 'targetDocument'>) => {
  const { targetDocument, theme } = options;

  const renderer = useRenderer_unstable();
  const styleTag = React.useRef<HTMLStyleElement>();

  const styleTagId = useId(fluentProviderClassNames.root);
  const styleElementAttributes = renderer.styleElementAttributes;

  const cssVarsAsString = React.useMemo(() => {
    return theme
      ? (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
          cssVarRule += `--${cssVar}: ${theme[cssVar]}; `;
          return cssVarRule;
        }, '')
      : '';
  }, [theme]);

  // When using React 18, the id generated will contain : which is not valid unless we add an escape character
  const rule = `.${styleTagId.replace(/:/g, '\\:')} { ${cssVarsAsString} }`;

  useInsertionEffect(() => {
    styleTag.current = createStyleTag(targetDocument, { ...styleElementAttributes, id: styleTagId });

    if (styleTag.current) {
      insertSheet(styleTag.current, rule);

      return () => {
        styleTag.current?.remove();
      };
    }
  }, [styleTagId, targetDocument, rule, styleElementAttributes]);

  return styleTagId;
};
