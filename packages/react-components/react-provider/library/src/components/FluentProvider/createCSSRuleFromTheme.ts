import { tokens } from '@fluentui/react-theme';
import type { PartialTheme } from '@fluentui/react-theme';

const CSS_ESCAPE_MAP = {
  '<': '\\3C ',
  '>': '\\3E ',
};
/**
 * Escapes characters that could break out of a <style> tag during SSR.
 *
 * IMPORTANT: Do not strip quotes. Theme values legitimately include quoted font families and other CSS.
 * We only need to ensure the generated text cannot terminate the style tag and inject HTML.
 */
function escapeForStyleTag(value: string): string {
  // Escape as CSS code points so the resulting CSS still represents the same characters.
  // Using CSS escapes prevents the HTML parser from seeing a literal '<' / '>' and closing <style>.
  return value.replace(/[<>]/g, match => CSS_ESCAPE_MAP[match as keyof typeof CSS_ESCAPE_MAP]);
}

/**
 * Extracts the canonical kebab-case CSS variable for a theme key from the `tokens.*`
 * read-path strings (`tokens.colorNeutralBackground1 === 'var(--color-neutral-background-1)'`,
 * zIndex entries carry a fallback: `'var(--z-index-popup, 2000)'`).
 *
 * Deriving the name from `tokens` (instead of re-implementing the kebab algorithm here)
 * keeps this file in guaranteed lockstep with @fluentui/tokens and the
 * react-tailwind-theme generator, which assert the same mapping from their sides.
 */
const CANONICAL_NAME = /^var\((--[^,)]+)/;
function canonicalVariableFor(themeKey: string): string | undefined {
  const read = (tokens as Record<string, string>)[themeKey];
  const match = read === undefined ? null : CANONICAL_NAME.exec(read);
  return match ? match[1] : undefined;
}

/**
 * Creates a CSS rule from a theme object.
 *
 * Useful for scenarios when you want to apply theming statically to a top level elements like `body`.
 *
 * THEMING PHASE 2a: every token value is written under BOTH vocabularies — the legacy
 * camelCase name (`--colorNeutralBackground1`) and the canonical kebab-case name
 * (`--color-neutral-background-1`) that all shipped CSS (Tailwind-generated utilities,
 * module HCM blocks) and the `tokens.*` JS constants now read. The camelCase half feeds
 * no shipped reader anymore; it remains as unbroken-interim insurance for hand-written
 * consumer CSS until theming Phase 2b removes this runtime path entirely.
 */
export function createCSSRuleFromTheme(selector: string, theme: PartialTheme | undefined): string {
  if (theme) {
    const cssVarsAsString = (Object.keys(theme) as (keyof typeof theme)[]).reduce((cssVarRule, cssVar) => {
      const value = theme[cssVar];
      const canonical = canonicalVariableFor(cssVar);
      const canonicalDeclaration = canonical === undefined ? '' : `${canonical}: ${value}; `;

      return `${cssVarRule}--${cssVar}: ${value}; ${canonicalDeclaration}`;
    }, '');

    return `${selector} { ${escapeForStyleTag(cssVarsAsString)} }`;
  }

  return `${selector} {}`;
}
