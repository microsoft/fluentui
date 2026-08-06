import type { Theme } from './types';
import { tokens } from './tokens';

/**
 * Theming Phase 1 (option B, settled 2026-07-29): the 22 spacing tokens and the 4
 * strokeWidth tokens are the READ path for the CANONICAL kebab-case variables emitted by
 * @fluentui/react-tailwind-theme (`--spacing-horizontal-m`, `--stroke-width-thin`, …).
 * The old camelCase CSS variables no longer exist in emitted CSS, so these 26 entries
 * deliberately do NOT follow the `var(--<tokenName>)` convention the rest of the token
 * set uses. This map IS the contract — a change here must be coordinated with
 * packages/react-components/react-tailwind-theme/scripts/generate-tokens-css.js, which
 * asserts the same lockstep from the other side.
 */
const canonicalVariableTokens: Partial<Record<keyof Theme, string>> = {
  strokeWidthThin: 'var(--stroke-width-thin)',
  strokeWidthThick: 'var(--stroke-width-thick)',
  strokeWidthThicker: 'var(--stroke-width-thicker)',
  strokeWidthThickest: 'var(--stroke-width-thickest)',
  spacingHorizontalNone: 'var(--spacing-horizontal-none)',
  spacingHorizontalXXS: 'var(--spacing-horizontal-xxs)',
  spacingHorizontalXS: 'var(--spacing-horizontal-xs)',
  spacingHorizontalSNudge: 'var(--spacing-horizontal-s-nudge)',
  spacingHorizontalS: 'var(--spacing-horizontal-s)',
  spacingHorizontalMNudge: 'var(--spacing-horizontal-m-nudge)',
  spacingHorizontalM: 'var(--spacing-horizontal-m)',
  spacingHorizontalL: 'var(--spacing-horizontal-l)',
  spacingHorizontalXL: 'var(--spacing-horizontal-xl)',
  spacingHorizontalXXL: 'var(--spacing-horizontal-xxl)',
  spacingHorizontalXXXL: 'var(--spacing-horizontal-xxxl)',
  spacingVerticalNone: 'var(--spacing-vertical-none)',
  spacingVerticalXXS: 'var(--spacing-vertical-xxs)',
  spacingVerticalXS: 'var(--spacing-vertical-xs)',
  spacingVerticalSNudge: 'var(--spacing-vertical-s-nudge)',
  spacingVerticalS: 'var(--spacing-vertical-s)',
  spacingVerticalMNudge: 'var(--spacing-vertical-m-nudge)',
  spacingVerticalM: 'var(--spacing-vertical-m)',
  spacingVerticalL: 'var(--spacing-vertical-l)',
  spacingVerticalXL: 'var(--spacing-vertical-xl)',
  spacingVerticalXXL: 'var(--spacing-vertical-xxl)',
  spacingVerticalXXXL: 'var(--spacing-vertical-xxxl)',
};

describe('tokens', () => {
  it('CSS variables match expected format', () => {
    (Object.keys(tokens) as (keyof Theme)[]).forEach(token => {
      if (token in canonicalVariableTokens) {
        return; // covered by the exact-string test below
      }
      const tokenValue = tokens[token];
      const tokenRegex = new RegExp(`var\\(--${token}(, .+)?\\)`);

      expect(tokenValue).toMatch(tokenRegex);
    });
  });

  it('spacing and strokeWidth tokens reference the canonical kebab-case variables (theming Phase 1)', () => {
    (Object.keys(canonicalVariableTokens) as (keyof Theme)[]).forEach(token => {
      expect(tokens[token]).toBe(canonicalVariableTokens[token]);
    });
    // No entry may reference an old camelCase spacing/stroke variable.
    (Object.keys(tokens) as (keyof Theme)[]).forEach(token => {
      expect(tokens[token]).not.toMatch(/var\(--(spacingHorizontal|spacingVertical|strokeWidth)[A-Z]/);
    });
  });
});
