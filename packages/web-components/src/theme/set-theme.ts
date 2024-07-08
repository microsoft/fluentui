import type { Theme } from '@fluentui/tokens';
import { uniqueId } from '@microsoft/fast-web-utilities';

import * as tokens from './design-tokens.js';

const tokenNames = Object.keys(tokens) as (keyof Theme)[];

const SUPPORTS_REGISTER_PROPERTY = 'registerProperty' in CSS;
const SUPPORTS_ADOPTED_STYLE_SHEETS = 'adoptedStyleSheets' in document;
const SUPPORTS_CSS_SCOPE = 'CSSScopeRule' in window;

const globalThemeStyleSheet = new CSSStyleSheet();

// A map from a theme to Custom Property declarations for the theme as a string.
const themeStyleTextMap = new Map<Theme, string>();

/**
 * Sets the theme tokens on defaultNode.
 * @param theme - Flat object of theme token values, set to `null` to unset
 *     the theme.
 * @param node - The node to set the theme on, defaults to `document` for
 *     setting global theme.
 * @internal
 */
export const setTheme = (theme: Theme | null, node: Document | HTMLElement = document) => {
  // Fallback to setting token custom properties on `<html>` element’s `style`
  // attribute, only checking the support of  `document.adoptedStyleSheets`
  // here because it has broader support than `CSS.registerProperty()`, which
  // is checked later.
  if (!SUPPORTS_ADOPTED_STYLE_SHEETS) {
    const target: HTMLElement = document ? document.documentElement : (node as HTMLElement);
    setThemePropertiesOnElement(theme, target);
    return;
  }

  if (node === document) {
    setGlobalTheme(theme);
  } else {
    setElementTheme(theme, node as HTMLElement);
  }
};

function getThemeStyleText(theme: Theme): string {
  if (!themeStyleTextMap.has(theme)) {
    const tokenDeclarations: string[] = [];

    for (const t of tokenNames) {
      if (SUPPORTS_REGISTER_PROPERTY) {
        try {
          CSS.registerProperty({
            name: `--${t}`,
            inherits: true,
            initialValue: theme[t] as string,
          });
        } catch {}
      }
      tokenDeclarations.push(`--${t}: ${theme[t] as string};`);
    }

    themeStyleTextMap.set(theme, tokenDeclarations.join(''));
  }

  return themeStyleTextMap.get(theme)!;
}

function setGlobalTheme(theme: Theme | null) {
  if (theme === null) {
    if (document.adoptedStyleSheets.includes(globalThemeStyleSheet)) {
      globalThemeStyleSheet.replaceSync('');
    }
    return;
  }

  // Update the CSSStyleSheet with the new theme
  globalThemeStyleSheet.replaceSync(`html{${getThemeStyleText(theme)}}`);

  // Adopt the updated CSSStyleSheet if it hasn't been adopted yet
  if (!document.adoptedStyleSheets.includes(globalThemeStyleSheet)) {
    document.adoptedStyleSheets.push(globalThemeStyleSheet);
  }
}

function setElementTheme(theme: Theme | null, element: HTMLElement) {
  if (theme === null) {
    if (element.shadowRoot) {
      // TODO
    } else {
      delete element.dataset.fluentThemed;
    }
    return;
  }

  if (element.shadowRoot) {
    // TODO: set theme for an element with shadow root on its adopted style sheets.
  } else {
    // TODO: set theme for an element with CSS scope.
  }
}

/**
 * @internal
 */
function setThemePropertiesOnElement(theme: Theme | null, element: HTMLElement) {
  for (const t of tokenNames) {
    element.style.setProperty(`--${t}`, theme !== null ? (theme[t] as string) : 'unset');
  }
}

/**
 * @internal
 * @deprecated Use `setTheme(theme, element)` instead.
 */
export const setThemeFor = (element: HTMLElement, theme: Theme | null) => {
  setThemePropertiesOnElement(theme, element);
};
