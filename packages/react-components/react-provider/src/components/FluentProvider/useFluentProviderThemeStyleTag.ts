import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
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
 * @internal
 * @returns CSS class to apply the rule
 */
export const useFluentProviderThemeStyleTag = (
  options: Pick<FluentProviderState, 'theme' | 'targetDocument'> & { rendererAttributes: Record<string, string> },
) => {
  const { targetDocument, theme, rendererAttributes } = options;

  const styleTag = React.useRef<HTMLStyleElement | undefined | null>();

  const styleTagId = useId(fluentProviderClassNames.root);
  const styleElementAttributes = rendererAttributes;

  const cssVarsAsString = React.useMemo(() => {
    return theme
      ? (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
          cssVarRule += `--${cssVar}: ${theme[cssVar]}; `;
          return cssVarRule;
        }, '')
      : '';
  }, [theme]);

  const rule = `.${styleTagId} { ${cssVarsAsString} }`;

  useHandleSSRStyleElements(targetDocument, styleTagId);
  useInsertionEffect(() => {
    // The style element could already have been created during SSR - no need to recreate it
    const ssrStyleElement = targetDocument?.getElementById(styleTagId);
    if (ssrStyleElement) {
      styleTag.current = ssrStyleElement as HTMLStyleElement;
    } else {
      styleTag.current = createStyleTag(targetDocument, { ...styleElementAttributes, id: styleTagId });
      if (styleTag.current) {
        insertSheet(styleTag.current, rule);
      }
    }

    return () => {
      styleTag.current?.remove();
    };
  }, [styleTagId, targetDocument, rule, styleElementAttributes]);

  return { styleTagId, rule };
};

function useHandleSSRStyleElements(targetDocument: Document | undefined | null, styleTagId: string) {
  // Using a state factory so that this logic only runs once per render
  // Each FluentProvider can create its own style element during SSR as a slot
  // Moves all theme style elements to document head during render to avoid hydration errors.
  // Should be strict mode safe since the logic is idempotent.
  React.useState(() => {
    if (!targetDocument) {
      return;
    }

    const themeStyleElement = targetDocument.getElementById(styleTagId);
    if (themeStyleElement) {
      targetDocument.head.append(themeStyleElement);
    }
  });
}
