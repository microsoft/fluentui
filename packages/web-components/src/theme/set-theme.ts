import { Updates } from '@microsoft/fast-element';
import { uniqueId } from '@microsoft/fast-web-utilities';

/**
 * Not using the `Theme` type from `@fluentui/tokens` package to allow custom
 * tokens to be added.
 * @internal
 */
export type Theme = Record<string, string | number>;

const SUPPORTS_ADOPTED_STYLE_SHEETS = 'adoptedStyleSheets' in document;
const SUPPORTS_CSS_SCOPE = 'CSSScopeRule' in window;

// A map from a theme to Custom Property declarations for the theme as a string.
// Each value should be a list of CSS Custom Property declarations, and should
// NOT include any selector, `{`, or `}`.
const themeStyleTextMap = new Map<Theme, string>();

// A map from a theme to a unique string used to identity a theme. The string
// will be used as the value of the `data-fluent-theme` attribute on a
// differently themed element.
const scopedThemeKeyMap = new Map<Theme, string>();

// A map from an element with shadow root to a `CSSStyleSheet` object that
// references its local theme style sheet.
const shadowAdoptedStyleSheetMap = new Map<HTMLElement, CSSStyleSheet>();

// A map from an element to its set theme. This is used only when
// `document.adoptedStyleSheets` or CSS Scope is not supported.
const elementThemeMap = new Map<HTMLElement, Theme>();

const globalThemeStyleSheet = new CSSStyleSheet();

/**
 * Sets the theme tokens as CSS Custom Properties. The Custom Properties are
 * set in a constructed stylesheet on `document.adoptedStyleSheets` if
 * supported, and on `document.documentElement.style` as a fallback.
 *
 * @param theme - Flat object of theme tokens. Each object entry must follow
 *     these rules: the key is the name of the token, usually in camel case, it
 *     must be a valid CSS Custom Property name WITHOUT the starting two dashes
 *     (`--`), the two dashes are added inside the function; the value must be
 *     a valid CSS value, e.g. it cannot contain semicolons (`;`).
 *     Note that this argument is not limited to existing theme objects (from
 *     `@fluentui/tokens`), you can pass in an arbitrary theme object as long
 *     as each entry’s value is either a string or a number.
 * @param node - The node to set the theme on, defaults to `document` for
 *     setting global theme.
 * @internal
 */
export function setTheme(theme: Theme | null, node: Document | HTMLElement = document) {
  if (!node || !isThemeableNode(node)) {
    return;
  }

  // Fallback to setting token custom properties on `<html>` element’s `style`
  // attribute.
  if (!SUPPORTS_ADOPTED_STYLE_SHEETS || (node instanceof HTMLElement && !node.shadowRoot && !SUPPORTS_CSS_SCOPE)) {
    const target: HTMLElement = node === document ? document.documentElement : (node as HTMLElement);
    setThemePropertiesOnElement(theme, target);
    return;
  }

  if ([document, document.documentElement, document.body].includes(node)) {
    setGlobalTheme(theme);
  } else {
    setLocalTheme(theme, node as HTMLElement);
  }
}

function getThemeStyleText(theme: Theme): string {
  if (!themeStyleTextMap.has(theme)) {
    const tokenDeclarations: string[] = [];

    for (const [tokenName, tokenValue] of Object.entries(theme)) {
      tokenDeclarations.push(`--${tokenName}:${tokenValue.toString()};`);
    }

    themeStyleTextMap.set(theme, tokenDeclarations.join(''));
  }

  return themeStyleTextMap.get(theme)!;
}

/**
 * A themeable node should either be one of the following:
 * - `document`
 * - `html`
 * - `body`
 * - Any HTML element inside `body`
 */
function isThemeableNode(node: Document | HTMLElement) {
  return [document, document.documentElement].includes(node) || (node instanceof HTMLElement && !!node.closest('body'));
}

function setGlobalTheme(theme: Theme | null) {
  if (theme === null) {
    if (document.adoptedStyleSheets.includes(globalThemeStyleSheet)) {
      globalThemeStyleSheet.replaceSync('');
    }
    return;
  }

  // Update the CSSStyleSheet with the new theme
  globalThemeStyleSheet.replaceSync(`
    html {
      ${getThemeStyleText(theme)}
    }
  `);

  // Adopt the updated CSSStyleSheet if it hasn't been adopted yet
  if (!document.adoptedStyleSheets.includes(globalThemeStyleSheet)) {
    document.adoptedStyleSheets.push(globalThemeStyleSheet);
  }
}

function setLocalTheme(theme: Theme | null, element: HTMLElement) {
  if (theme === null) {
    if (element.shadowRoot && shadowAdoptedStyleSheetMap.has(element)) {
      shadowAdoptedStyleSheetMap.get(element)!.replaceSync('');
    } else {
      delete element.dataset.fluentTheme;
      forceRepaint(element);
    }
    return;
  }

  if (element.shadowRoot) {
    getShadowAdoptedStyleSheet(element).replaceSync(`
      :host {
        ${getThemeStyleText(theme)}
      }
    `);
  } else {
    element.dataset.fluentTheme = getScopedThemeKey(theme);
    forceRepaint(element);
  }
}

function getShadowAdoptedStyleSheet(element: HTMLElement): CSSStyleSheet {
  if (!shadowAdoptedStyleSheetMap.has(element)) {
    const shadowAdoptedStyleSheet = new CSSStyleSheet();
    shadowAdoptedStyleSheetMap.set(element, shadowAdoptedStyleSheet);
    element.shadowRoot?.adoptedStyleSheets.push(shadowAdoptedStyleSheet);
  }

  return shadowAdoptedStyleSheetMap.get(element)!;
}

function getScopedThemeKey(theme: Theme): string {
  if (!scopedThemeKeyMap.has(theme)) {
    const themeKey = uniqueId('fluent-theme-');
    const scopedThemeStyleSheet = new CSSStyleSheet();

    scopedThemeKeyMap.set(theme, themeKey);
    scopedThemeStyleSheet.replaceSync(`
      @scope ([data-fluent-theme="${themeKey}"]) {
        :scope {
          ${getThemeStyleText(theme)}
        }
      }
    `);
    document.adoptedStyleSheets.push(scopedThemeStyleSheet);
  }

  return scopedThemeKeyMap.get(theme)!;
}

function setThemePropertiesOnElement(theme: Theme | null, element: HTMLElement) {
  let tokens: Theme;

  if (theme === null) {
    if (!elementThemeMap.has(element)) {
      return;
    }
    tokens = elementThemeMap.get(element)!;
  } else {
    elementThemeMap.set(element, theme);
    tokens = theme;
  }

  for (const [tokenName, tokenValue] of Object.entries(tokens)) {
    if (theme === null) {
      element.style.removeProperty(`--${tokenName}`);
    } else {
      element.style.setProperty(`--${tokenName}`, tokenValue.toString());
    }
  }
}

/**
 * This function fixes a Safari bug: when an element should no longer be
 * selected by an `@scope` rule, the styles defined in the `:scope` selector
 * persist.
 * @see https://bugs.webkit.org/show_bug.cgi?id=276454
 *
 * UA sniff regular expression is based on
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#rendering_engine | the MDN documentation}.
 */
const { userAgent: UA } = navigator;
const isWebkit = /\bAppleWebKit\/[\d+\.]+\b/.test(UA);
function forceRepaint(element: HTMLElement) {
  if (!isWebkit) {
    return;
  }

  const name = 'visibility';
  const tempValue = 'hidden';
  const currentValue = element.style.getPropertyValue(name);

  element.style.setProperty(name, tempValue);

  Updates.process();

  element.style.setProperty(name, currentValue);
}

/**
 * @internal
 * @deprecated Use `setTheme(theme, element)` instead.
 */
export function setThemeFor(element: HTMLElement, theme: Theme | null) {
  setThemePropertiesOnElement(theme, element);
}
