import * as React from 'react';
import { tokens } from '@fluentui/react-components';
import type { Theme } from '@fluentui/tokens';

const CSS_VAR_NAME_REGEX = /^var\((--[^,)]+)/;

/**
 * Builds a CSS rule containing only custom-property declarations for the given theme object,
 * using the canonical kebab-case variable names (derived from the `tokens` var-strings).
 *
 * The result can be injected into a `<style>` element and the class passed to
 * `<FluentProvider themeClassName={...}>` (or set on any DOM node) to theme that subtree.
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
 * Converts a runtime-built Theme object into a CSS class of custom-property declarations,
 * injects it via a `<style>` element and returns the class name for use with
 * `<FluentProvider themeClassName={...}>`.
 */
export const useThemeAsClass = (theme: Theme): string => {
  const [className] = React.useState(() => `fui-theme-designer-${++themeClassCounter}`);

  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = createThemeClassRule(className, theme);
    document.head.appendChild(styleElement);
    return () => {
      styleElement.remove();
    };
  }, [className, theme]);

  return className;
};
