'use client';

/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { tokens, useFluent } from '@fluentui/react-components';
import type { Theme } from '@fluentui/tokens';

const CSS_VAR_NAME_REGEX = /^var\((--[^,)]+)/;

/**
 * Builds a CSS rule containing only custom-property declarations for the given theme object,
 * using the canonical kebab-case variable names (derived from the `tokens` var-strings).
 */
export const createThemeClassRule = (className: string, theme: Theme): string => {
  const themeRecord = theme as unknown as Record<string, string | number>;
  const declarations = Object.keys(themeRecord)
    .map(themeKey => {
      const varString = (tokens as unknown as Record<string, string>)[themeKey];
      const match = varString ? CSS_VAR_NAME_REGEX.exec(varString) : null;
      return match ? `  ${match[1]}: ${themeRecord[themeKey]};` : null;
    })
    .filter(Boolean)
    .join('\n');
  return `.${className} {\n${declarations}\n}`;
};

let themeClassCounter = 0;

/**
 * Story-local helper: converts a theme object built at runtime (e.g. a createV9Theme result)
 * into a CSS class of custom-property declarations, injects it via a `<style>` element and
 * returns the class name for use with `<FluentProvider themeClassName={...}>`.
 */
export const useThemeAsClass = (theme: Theme): string => {
  const { targetDocument } = useFluent();
  const [className] = React.useState(() => `fui-theme-shim-preview-${++themeClassCounter}`);

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }
    const styleElement = targetDocument.createElement('style');
    styleElement.textContent = createThemeClassRule(className, theme);
    targetDocument.head.appendChild(styleElement);
    return () => {
      styleElement.remove();
    };
  }, [className, theme, targetDocument]);

  return className;
};
