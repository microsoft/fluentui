import type { Theme } from './types';
import { tokens } from './tokens';

/**
 * Theming Phase 2a (option B, extends the Phase-1 contract of 2026-07-29 to the FULL token
 * set): every `tokens.*` constant is the READ path for a CANONICAL kebab-case CSS variable
 * aligned with the Tailwind v4 theme namespaces registered by the react-tailwind-theme
 * package (`--color-neutral-background-1`, `--text-base-300`,
 * `--font-weight-semibold`, `--radius-medium`, `--ease-easy-ease`, `--duration-fast`, …).
 * The old camelCase CSS variables (`--colorNeutralBackground1`, …) no longer exist in
 * emitted CSS. This derivation IS the contract — a change here must be coordinated with
 * packages/react-components/react-tailwind-theme/scripts/generate-tokens-css.js, which
 * asserts the same lockstep from the CSS side on every run, and with
 * migration/griffel-to-tailwind/reports/token-rename-map.json (the committed mapping).
 *
 * The derivation below is deliberately an INDEPENDENT re-implementation of the generator's
 * naming rules (same algorithm, separately written), so drift in either side fails a gate.
 */

/** camelCase → kebab-case with digit runs and acronym runs as their own segments. */
const kebabCase = (name: string): string =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([A-Za-z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([A-Za-z])/g, '$1-$2')
    .toLowerCase();

/**
 * Token-name prefix → canonical CSS variable namespace. First match wins, so longer
 * prefixes sharing a stem come first. `duration` is the one family whose canonical
 * RUNTIME name (`--duration-*`) differs from its Tailwind theme key
 * (`--transition-duration-*`) — durations have no first-class variable namespace worth
 * occupying, so they keep the family-consistent custom namespace (user decision, Phase 2a).
 */
const NAMESPACES: [prefix: string, namespace: string][] = [
  ['colorPalette', 'color-palette'],
  ['color', 'color'],
  ['fontFamily', 'font'],
  ['fontSize', 'text'],
  ['fontWeight', 'font-weight'],
  ['lineHeight', 'leading'],
  ['spacingHorizontal', 'spacing-horizontal'],
  ['spacingVertical', 'spacing-vertical'],
  ['strokeWidth', 'stroke-width'],
  ['borderRadius', 'radius'],
  ['shadow', 'shadow'],
  ['curve', 'ease'],
  ['duration', 'duration'],
  ['zIndex', 'z-index'],
];

/** zIndex tokens carry their default as a var() fallback — pinned literal contract. */
const Z_INDEX_FALLBACKS: Partial<Record<keyof Theme, string>> = {
  zIndexBackground: '0',
  zIndexContent: '1',
  zIndexOverlay: '1000',
  zIndexPopup: '2000',
  zIndexMessages: '3000',
  zIndexFloating: '4000',
  zIndexPriority: '5000',
  zIndexDebug: '6000',
};

const canonicalVariable = (token: keyof Theme): string => {
  const entry = NAMESPACES.find(([prefix]) => token.startsWith(prefix));
  if (!entry) {
    throw new Error(`Token \`${token}\` matches no canonical namespace.`);
  }
  const [prefix, namespace] = entry;
  return `--${namespace}-${kebabCase(token.slice(prefix.length))}`;
};

describe('tokens', () => {
  it('every token references its canonical kebab-case CSS variable (exact string)', () => {
    (Object.keys(tokens) as (keyof Theme)[]).forEach(token => {
      const fallback = Z_INDEX_FALLBACKS[token];
      const expected =
        fallback === undefined ? `var(${canonicalVariable(token)})` : `var(${canonicalVariable(token)}, ${fallback})`;

      expect(tokens[token]).toBe(expected);
    });
  });

  it('no token references an old camelCase CSS variable (option B: single vocabulary)', () => {
    (Object.keys(tokens) as (keyof Theme)[]).forEach(token => {
      // Canonical names are all-lowercase; any uppercase letter inside a var() name is a
      // leftover camelCase reference.
      expect(tokens[token]).not.toMatch(/var\(--[^,)]*[A-Z]/);
    });
  });

  it('canonical variable names are unique across the token set', () => {
    const seen = new Map<string, string>();
    (Object.keys(tokens) as (keyof Theme)[]).forEach(token => {
      const name = canonicalVariable(token);
      expect(seen.has(name) ? `${name} from ${seen.get(name)} and ${token}` : undefined).toBeUndefined();
      seen.set(name, token);
    });
  });
});
