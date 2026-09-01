// @ts-check
/**
 * Generates `css/tokens.css` — the `@theme inline reference` registration giving every
 * Fluent token a Tailwind utility name (`bg-neutral-background-1`, `rounded-medium`, …)
 * plus the theme-INVARIANT `:root, :host` values — and `css/themes/<name>.css`, ONE FILE
 * PER SHIPPED THEME, each carrying exactly its own class. `css/themes.css` is a generated
 * all-seven aggregate of `@import`s for the two entries that want the whole catalog.
 *
 * There is NO DEFAULT THEME anywhere in the output — see the note below the constants.
 *
 * `inline` substitutes the token variable into each utility so it resolves per-element;
 * a plain `@theme` alias would freeze resolution at `:root`. `reference` suppresses the
 * self-referential alias emission that self-named registrations (`--color-x: var(--color-x)`)
 * would otherwise produce (~19KB of cyclic declarations).
 *
 * Spacing: the 22 spacing tokens register as aliases of the numeric axis
 * (`calc(var(--spacing) * N)`), so named and numeric spacing share one density knob.
 * The 4 strokeWidth tokens keep literal base-scale values under `--stroke-width-*`
 * (borders must not thin with layout density); `--spacing-thin/…` are private hooks
 * feeding utility generation. All of these are also emitted as real custom properties,
 * because border/outline/ring/decoration widths do not consume the spacing namespace.
 *
 * tokens.ts is consumed as the token-name inventory; theme VALUES come from the
 * committed theme-values.json snapshot; the emitted class names are asserted against
 * theme-class-names.mjs.
 *
 * Run:      node packages/react-components/react-tailwind-theme-preview/scripts/generate-tokens-css.js
 * Verify:   node packages/react-components/react-tailwind-theme-preview/scripts/generate-tokens-css.js --check
 */

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const PACKAGE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(PACKAGE_ROOT, '..', '..', '..');
const TOKENS_PACKAGE = path.join(REPO_ROOT, 'packages', 'tokens');
const TOKENS_SOURCE = path.join(TOKENS_PACKAGE, 'src', 'tokens.ts');
const SPACINGS_SOURCE = path.join(TOKENS_PACKAGE, 'src', 'global', 'spacings.ts');
const STROKE_WIDTHS_SOURCE = path.join(TOKENS_PACKAGE, 'src', 'global', 'strokeWidths.ts');
const THEME_VALUES_SOURCE = path.join(PACKAGE_ROOT, 'theme-values.json');
const THEME_CLASSNAMES_SOURCE = path.join(PACKAGE_ROOT, 'theme-class-names.mjs');
const DEFAULT_OUTPUT = path.join(PACKAGE_ROOT, 'css', 'tokens.css');
const THEMES_DIR = path.join(PACKAGE_ROOT, 'css', 'themes');
/** Aggregate that pulls in all seven — the monolith build entry's one import. */
const THEMES_OUTPUT = path.join(PACKAGE_ROOT, 'css', 'themes.css');

/**
 * NO DEFAULT THEME — operator ruling 2026-08-28 ("Theme delivery").
 *
 * Windmod mirrors Griffel's contract exactly: Griffel makes the consumer
 * `import { webLightTheme }` and pass it to `<FluentProvider theme={…}>`, with no baked
 * default (tokens are simply unset without one). So `:root, :host` carries ONLY the
 * theme-INVARIANT values here, and every theme's 433 variables live in their own file
 * under `css/themes/`, reaching a document only when the consumer imports that file and
 * applies its class.
 *
 * The previous design emitted `webLightTheme` at `:root, :host`, which made light free and
 * every other theme a surcharge. Removing it makes the cost symmetric, the contract
 * explicit, and the pay-per-theme story real.
 */

const GENERATOR_ID = 'packages/react-components/react-tailwind-theme-preview/scripts/generate-tokens-css.js';

/** The `@theme` modifiers the emitted block carries. See the module header for why. */
const THEME_MODIFIERS = 'inline reference';

/**
 * camelCase → kebab-case, with digit runs and acronym runs as their own segments.
 *
 *   colorNeutralBackground1  → color-neutral-background-1
 *   fontSizeHero1000         → font-size-hero-1000
 *   borderRadius2XLarge      → border-radius-2-x-large
 *   shadow2Brand             → shadow-2-brand
 *
 * NOT used for the spacing namespace — those names come from SPACING_SCALE's pinned table.
 *
 * @param {string} name
 * @returns {string}
 */
function kebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // lower|digit → Upper
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // ACRONYM → Word
    .replace(/([A-Za-z])([0-9])/g, '$1-$2') // letter → digit
    .replace(/([0-9])([A-Za-z])/g, '$1-$2') // digit → letter
    .toLowerCase();
}

/**
 * Fluent's spacing scale — the ONE namespace whose registered values are NOT
 * `var(--fluentToken)` references (numeric-axis aliases).
 *
 * WHY NUMERIC-AXIS ALIASES AND NOT `var(--spacingHorizontalM)` OR PX LITERALS
 * ---------------------------------------------------------------------------
 * The numeric spacing utilities (`p-12`, `gap-8`) compile to
 * `calc(var(--spacing) * N)` — they compute px→rem through the `--spacing` base
 * (`calc(1px * var(--base-scale))`, css/index.css). Registering the semantic tokens as
 * runtime token `var()` references would create two spacing systems that scale
 * differently: `p-12` would follow the user's root font-size while `p-horizontal-m`
 * stayed frozen at the provider's literal px. Registering each token as
 * `calc(var(--spacing) * <multiplier>)` — multiplier = canonical px / SPACING_BASE_PX —
 * makes BOTH scales aliases of ONE axis: `p-horizontal-m` and `p-12` emit the same
 * calc shape, compute the same length at default, and respond identically to a
 * `--spacing` override on any subtree (`--spacing` is the single density knob).
 * The earlier literal form (`calc(12px * var(--base-scale))`) was arithmetically
 * identical at default but bypassed `--spacing`, so a subtree density override reached
 * numeric utilities and missed named ones. Probe-verified that `@theme inline` carries
 * the `var(--spacing)` reference verbatim into utilities.
 *
 * COST, ACCEPTED: a FluentProvider `theme` override of `spacingHorizontalM` no longer
 * reaches utility-sourced spacing (a literal `var(--spacingHorizontalM)` still honours it,
 * but those are now FORBIDDEN in component modules — see CONVERSION_GUIDE). All 7 shipped
 * themes carry byte-identical spacing values (asserted: every theme spreads the same
 * `horizontalSpacings`/`verticalSpacings` objects), so no shipped theme changes behavior.
 *
 * ALSO ACCEPTED: `--spacing-*` is axis-agnostic, so `py-horizontal-m` compiles. The axis in
 * the name is a convention, not a constraint — the same is already true of a literal
 * `var(--spacingHorizontalM)` in a `padding-block` declaration.
 *
 * `utility` is the EXPLICIT suffix table. It deliberately does NOT go
 * through `kebabCase` — that would turn `SNudge` into `s-nudge` correctly but `XXS` into
 * `xxs` only by accident of the acronym rule; pinning the table keeps these names stable
 * and independent of the generic algorithm.
 *
 * `global` is the key in `packages/tokens/src/global/spacings.ts`; `px` is asserted against
 * it at generation time so a scale change upstream trips the build instead of silently
 * desyncing the utilities from the tokens.
 *
 * @type {{ suffix: string, utility: string, global: string, px: number }[]}
 */
const SPACING_SCALE = [
  { suffix: 'None', utility: 'none', global: 'none', px: 0 },
  { suffix: 'XXS', utility: 'xxs', global: 'xxs', px: 2 },
  { suffix: 'XS', utility: 'xs', global: 'xs', px: 4 },
  { suffix: 'SNudge', utility: 's-nudge', global: 'sNudge', px: 6 },
  { suffix: 'S', utility: 's', global: 's', px: 8 },
  { suffix: 'MNudge', utility: 'm-nudge', global: 'mNudge', px: 10 },
  { suffix: 'M', utility: 'm', global: 'm', px: 12 },
  { suffix: 'L', utility: 'l', global: 'l', px: 16 },
  { suffix: 'XL', utility: 'xl', global: 'xl', px: 20 },
  { suffix: 'XXL', utility: 'xxl', global: 'xxl', px: 24 },
  { suffix: 'XXXL', utility: 'xxxl', global: 'xxxl', px: 32 },
];

/**
 * Fluent's stroke widths — border/outline/divider thickness — joining the SAME `--spacing-*`
 * namespace as SPACING_SCALE, on the same literal-value terms ().
 *
 * THE SPACING NAMESPACE PLUS FOUR WIDTH-NAMESPACE MIRRORS
 * -------------------------------------------------------
 * PROBE-MEASURED against the installed registry (v4.3.3), not reasoned:
 *   CONSUMES `--spacing-*`  p m gap space-x w h min-w max-w size inset top start basis
 *                           translate scroll-m scroll-p indent leading (+ every axis/side form)
 *   OWN NAMESPACES          border-* (+ every side form; divide-* reads the same
 *                           `--border-width` key) → `--border-width-*`; outline-* →
 *                           `--outline-width-*`; outline-offset-* → `--outline-offset-*`;
 *                           decoration-* → `--text-decoration-thickness-*`
 *   NO NAMESPACE            ring ring-offset inset-ring underline-offset stroke
 *
 * Spacing registration buys the dimensional utilities (`w-thin`, `h-thick`, `p-thin`,
 * `gap-thin`); the width-namespace MIRRORS (`mirrorNamespaces` on the NAMESPACES entry) buy
 * the border-ish named forms (`border-thin`, `outline-thick`, `-outline-offset-thickest`,
 * `decoration-thin`). Each mirror registers `var(--spacing-<step>)`, so a named utility
 * compiles byte-identically to the `border-(length:--spacing-thin)` var-reference spelling it
 * replaces. The four steps are ALSO emitted as real custom properties (`emit: true` on the
 * NAMESPACES entry) for the ring/underline families that have no themable namespace and for
 * raw `var(--spacing-thin)` declarations. `@theme inline` emits no variables.
 *
 * CANONICAL `--stroke-width-*` VALUES STAY LITERAL `calc(<px> * var(--base-scale))` —
 * DELIBERATELY NOT `--spacing`-COUPLED
 * -----------------------------------------------------------------------------------
 * Theming the alias model () rebased the 22 spacing tokens onto the
 * `--spacing` numeric axis; these four are the intentional exception. `--spacing` is the
 * layout DENSITY knob — a subtree that halves it should compress padding and gaps, but
 * borders must NOT thin with it: a 1px hairline is a 1px hairline at any density. Stroke
 * widths therefore keep the raw `--base-scale` form and ignore `--spacing` overrides.
 *
 * NAME SPLIT: the PUBLIC set-contract variable is
 * `--stroke-width-<step>`, emitted with the literal value; the spacing-namespace
 * `--spacing-<step>` names are PRIVATE internal hooks registered/emitted as
 * `var(--stroke-width-<step>)` so Tailwind's spacing-consuming utility families
 * (`w-thin`, `p-thick`, `gap-thicker`, …) and module-authored `var(--spacing-thin)`
 * border/outline widths keep working. `--stroke-width-*` is deliberately NOT registered
 * in `@theme` — Tailwind's `--stroke-width-*` namespace drives SVG `stroke-width`
 * utilities, which would be the wrong property.
 *
 * `global` is the key in `packages/tokens/src/global/strokeWidths.ts`; `px` is asserted against
 * it at generation time, exactly like SPACING_SCALE.
 *
 * @type {{ suffix: string, utility: string, global: string, px: number }[]}
 */
const STROKE_WIDTH_SCALE = [
  { suffix: 'Thin', utility: 'thin', global: 'strokeWidthThin', px: 1 },
  { suffix: 'Thick', utility: 'thick', global: 'strokeWidthThick', px: 2 },
  { suffix: 'Thicker', utility: 'thicker', global: 'strokeWidthThicker', px: 3 },
  { suffix: 'Thickest', utility: 'thickest', global: 'strokeWidthThickest', px: 4 },
];

/**
 * The px value of the `--spacing` numeric-axis base, as registered in css/index.css
 * (`--spacing: calc(1px * var(--base-scale))`). Spacing-token multipliers are derived
 * against it, so if the base ever changes, every multiplier recomputes — and the exactness
 * guard in `spacingTokenValue` throws on any px value the new base cannot express exactly.
 */
const SPACING_BASE_PX = 1;

/**
 * The numeric-axis alias for a spacing step: `calc(var(--spacing) * <multiplier>)`, the
 * same compiled shape as Tailwind's numeric utilities (`p-12` → `calc(var(--spacing) * 12)`),
 * so named and numeric spacing respond identically to a `--spacing` override anywhere in
 * the tree. Zero stays a plain `0` — a `calc(… * 0)` would be valid but noisy, and `0` is
 * unitless-safe everywhere.
 *
 * The multiplier MUST reproduce the canonical px exactly at the default base; anything
 * else is a silent visual change, so it throws.
 *
 * @param {{ px: number }} step
 * @returns {string}
 */
function spacingTokenValue(step) {
  const { px } = step;
  if (px === 0) {
    return '0';
  }
  const multiplier = px / SPACING_BASE_PX;
  if (multiplier * SPACING_BASE_PX !== px) {
    throw new Error(
      `Spacing step ${px}px is not exactly expressible as a multiple of the ${SPACING_BASE_PX}px --spacing base.`,
    );
  }
  return `calc(var(--spacing) * ${multiplier})`;
}

/**
 * The canonical (public set-contract) variable name for a stroke width step.
 *
 * @param {{ utility: string }} step
 * @returns {string}
 */
function strokeWidthCanonicalName(step) {
  return `--stroke-width-${step.utility}`;
}

/**
 * The canonical `--stroke-width-*` value: literal base-scale, deliberately NOT
 * `--spacing`-coupled — borders must not thin when layout density changes (see the
 * STROKE_WIDTH_SCALE doc block).
 *
 * @param {{ px: number }} step
 * @returns {string}
 */
function strokeWidthCanonicalValue(step) {
  return step.px === 0 ? '0' : `calc(${step.px}px * var(--base-scale))`;
}

/**
 * A theme value rewritten onto the `--base-scale` axis: `14px` → `calc(14px * var(--base-scale))`,
 * the same literal form stroke widths use. Applies to every namespace carrying
 * `baseScaled: true` with no `scaleValue` override (the type ramp — font sizes and their paired
 * line heights; shadows are base-scaled too but composite, so they use shadowScaledValue) in EVERY theme,
 * so the whole UI scales coherently with the root font size. Rendering is unchanged at the
 * default 16px root, where `--base-scale` is 1.
 *
 * A non-px value would silently produce `calc(<junk> * var(--base-scale))`, so it throws instead.
 *
 * @param {string} tokenName
 * @param {string} value the raw theme value, e.g. `14px`
 * @returns {string}
 */
function baseScaledValue(tokenName, value) {
  if (!/^\d+(?:\.\d+)?px$/.test(value)) {
    throw new Error(
      `Token \`${tokenName}\` is registered as base-scaled but its value \`${value}\` is not a plain px length.`,
    );
  }

  return `calc(${value} * var(--base-scale))`;
}

/**
 * The unitless line-height ratio for a `lineHeight*` token: canonical ramp px divided by the
 * 1:1-paired `fontSize*` token's px (Decision U — see the lineHeight NAMESPACES entry).
 *
 * Emits an exact decimal when the division is finite (`22px / 16px` → `1.375`) and an exact
 * `calc(A / B)` fraction when it repeats (`20px / 14px` → `calc(20 / 14)`) — a rounded decimal
 * would be a silent visual change, and calc division is exact by construction. Finiteness is
 * decided arithmetically: the reduced fraction's denominator must factor into 2s and 5s only.
 *
 * @param {string} tokenName      the lineHeight token, for errors
 * @param {string} lineHeightValue raw theme value, e.g. `20px`
 * @param {string} fontSizeValue   the paired fontSize token's raw theme value, e.g. `14px`
 * @returns {string}
 */
function unitlessLeadingValue(tokenName, lineHeightValue, fontSizeValue) {
  const parsePx = (value, role) => {
    const match = /^(\d+)px$/.exec(value);
    if (!match) {
      throw new Error(
        `Token \`${tokenName}\`: ${role} value \`${value}\` is not an integer px length — ` +
          'the unitless ratio derivation only understands the integer-px type ramp.',
      );
    }
    return Number(match[1]);
  };

  const lineHeightPx = parsePx(lineHeightValue, 'line-height');
  const fontSizePx = parsePx(fontSizeValue, 'paired font-size');
  if (fontSizePx === 0) {
    throw new Error(`Token \`${tokenName}\`: paired font-size is 0px — cannot form a ratio.`);
  }

  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  let denominator = fontSizePx / gcd(lineHeightPx, fontSizePx);
  while (denominator % 2 === 0) denominator /= 2;
  while (denominator % 5 === 0) denominator /= 5;

  return denominator === 1 ? String(lineHeightPx / fontSizePx) : `calc(${lineHeightPx} / ${fontSizePx})`;
}

/**
 * A shadow theme value with every LENGTH rewritten onto the `--base-scale` axis, leaving the
 * colour components untouched: `0 1px 2px rgba(0, 0, 0, .14)` →
 * `0 calc(1px * var(--base-scale)) calc(2px * var(--base-scale)) rgba(0, 0, 0, .14)`.
 *
 * WHY SHADOWS SCALE, AND WHY THERE IS NO UNITLESS ALTERNATIVE
 * ----------------------------------------------------------
 * An elevation is a proportional cue: `--shadow-16`'s 8px drop reads as "this surface floats"
 * only relative to the box casting it. Once the type ramp and the spacing axis both follow the
 * root font size, a frozen-px shadow shrinks visually as everything around it grows — at a 32px
 * root the whole UI doubles while the shadow stays put, and the elevation ladder (2/4/8/16/28/64)
 * compresses into visual noise. Unlike line-height, `box-shadow` has no unitless form, so the
 * calc ramp is the only spelling available.
 *
 * `0` is left bare rather than rewritten to `calc(0px * …)`: it is already scale-invariant, and
 * the shorter form keeps the emitted value readable.
 *
 * Anything that is neither a bare `0`, a px length, nor a colour function throws — a silent
 * `calc(<junk> * var(--base-scale))` would be far worse than a failed build.
 *
 * @param {string} tokenName
 * @param {string} value the raw theme value, e.g. `0 0 2px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.14)`
 * @returns {string}
 */
function shadowScaledValue(tokenName, value) {
  // Split on the commas SEPARATING layers, not the commas inside rgba(...).
  const layers = [];
  let depth = 0;
  let current = '';
  for (const char of value) {
    if (char === '(') depth++;
    if (char === ')') depth--;
    if (char === ',' && depth === 0) {
      layers.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  layers.push(current);

  return layers
    .map(layer => {
      const parts = layer.trim().split(/\s+(?![^(]*\))/);
      return parts
        .map(part => {
          if (part === '0') return part;
          if (/^-?\d+(?:\.\d+)?px$/.test(part)) return `calc(${part} * var(--base-scale))`;
          if (/^(?:rgba?|hsla?|color)\(/.test(part) || /^#[0-9a-f]{3,8}$/i.test(part)) return part;
          throw new Error(
            `Token \`${tokenName}\` is registered as base-scaled but its component \`${part}\` ` +
              `(in \`${value}\`) is neither a bare 0, a px length, nor a colour.`,
          );
        })
        .join(' ');
    })
    .join(', ');
}

/**
 * The spacing-namespace PRIVATE hook value for a stroke width step: an alias of the
 * canonical variable, so utility families and module-authored `var(--spacing-thin)`
 * resolve through the one public definition.
 *
 * @param {{ utility: string, px: number }} step
 * @returns {string}
 */
function strokeWidthValue(step) {
  return `var(${strokeWidthCanonicalName(step)})`;
}

/**
 * Reads an object literal out of a `packages/tokens/src/global/*.ts` module and asserts the
 * pinned table above still describes it — so an upstream scale change trips the build instead
 * of silently desyncing the utilities from the tokens. Text extraction for the same reason as
 * `readTokens`: no build step, no dependency edge on @fluentui/tokens.
 *
 * @param {object} options
 * @param {string} options.source          absolute path of the module to read
 * @param {RegExp} options.declaration     must capture the object body in group 1
 * @param {string} options.declarationText human-readable form of `declaration`, for errors
 * @param {{ global: string, px: number }[]} options.table the pinned table to assert
 * @param {string} options.tableName       the table's identifier, for errors
 * @returns {Record<string, string>}
 */
function readGlobalScale({ source, declaration, declarationText, table, tableName }) {
  const text = fs.readFileSync(source, 'utf8');

  const match = declaration.exec(text);
  if (!match) {
    throw new Error(`${source}: expected a \`${declarationText}\` declaration.`);
  }

  /** @type {Record<string, string>} */
  const scale = {};
  const entry = /^[ \t]*([A-Za-z][A-Za-z0-9_]*):[ \t]*'([^']*)',[ \t]*$/gm;
  let entryMatch;
  while ((entryMatch = entry.exec(match[1])) !== null) {
    scale[entryMatch[1]] = entryMatch[2];
  }

  const keys = Object.keys(scale);
  if (keys.length !== table.length) {
    throw new Error(
      `${source}: parsed ${keys.length} steps but ${tableName} has ${table.length}. ` +
        `Update ${tableName} in ${GENERATOR_ID}.`,
    );
  }

  for (const { global: key, px } of table) {
    const expected = px === 0 ? '0' : `${px}px`;
    if (scale[key] !== expected) {
      throw new Error(
        `${source}: step \`${key}\` is \`${scale[key]}\` but ${tableName} says \`${expected}\`. ` +
          `Update ${tableName} in ${GENERATOR_ID}.`,
      );
    }
  }

  return scale;
}

/**
 * Asserts SPACING_SCALE still matches the private `spacings` literal in packages/tokens.
 *
 * @returns {Record<string, string>}
 */
function readSpacingScale() {
  return readGlobalScale({
    source: SPACINGS_SOURCE,
    declaration: /const spacings: SpacingTokens = \{([^}]*)\}/,
    declarationText: 'const spacings: SpacingTokens = {',
    table: SPACING_SCALE,
    tableName: 'SPACING_SCALE',
  });
}

/**
 * Asserts STROKE_WIDTH_SCALE still matches the `strokeWidths` literal in packages/tokens.
 * Same guarantee as `readSpacingScale`: these four values are hardcoded into the generated CSS,
 * so an upstream change to 1/2/3/4px MUST throw rather than ship a silent divergence.
 *
 * @returns {Record<string, string>}
 */
function readStrokeWidthScale() {
  return readGlobalScale({
    source: STROKE_WIDTHS_SOURCE,
    declaration: /export const strokeWidths: StrokeWidthTokens = \{([^}]*)\}/,
    declarationText: 'export const strokeWidths: StrokeWidthTokens = {',
    table: STROKE_WIDTH_SCALE,
    tableName: 'STROKE_WIDTH_SCALE',
  });
}

/**
 * Reads `packages/tokens/src/themes/themeClassNames.ts` as text and extracts the shipped
 * theme → class-name constants, asserting each class name equals its derivation from the
 * theme export name (`fui-theme-` + kebab of the name minus `Theme`; digits attach to the
 * preceding segment, so `teamsDarkV21Theme` → `fui-theme-teams-dark-v21` — deliberately
 * NOT this file's `kebabCase`, whose letter→digit rule would produce `v-21`).
 *
 * Text extraction for the same reason as `readTokens`: no build step, no dependency edge
 * on @fluentui/tokens. `themeClassNames.test.ts` in packages/tokens asserts the same
 * derivation from the jest side.
 *
 * @returns {Record<string, string>} theme export name → class name
 */
function readThemeClassNames() {
  const text = fs.readFileSync(THEME_CLASSNAMES_SOURCE, 'utf8');

  /** @type {Record<string, string>} */
  const classNames = {};
  const entry = /^export const ([A-Za-z][A-Za-z0-9]*Theme)ClassName = '([^']+)';$/gm;
  let match;
  while ((match = entry.exec(text)) !== null) {
    classNames[match[1]] = match[2];
  }

  if (Object.keys(classNames).length === 0) {
    throw new Error(`${THEME_CLASSNAMES_SOURCE}: parsed zero theme class-name constants — the file shape changed.`);
  }

  for (const [themeName, className] of Object.entries(classNames)) {
    const base = themeName.replace(/Theme$/, '');
    const derived = `fui-theme-${base.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
    if (className !== derived) {
      throw new Error(
        `${THEME_CLASSNAMES_SOURCE}: \`${themeName}ClassName\` is \`${className}\` but the derivation from the ` +
          `export name is \`${derived}\`. The class names are derived, not free-form — fix one side.`,
      );
    }
  }

  return classNames;
}

/**
 * Reads the committed `packages/tokens/theme-values.json` snapshot — the VALUE source for
 * the theme emission. The snapshot exists because theme values are
 * computed (`createLightTheme(brandWeb)`, …) and so cannot be text-scraped the way
 * `tokens.ts` is; `packages/tokens/src/themes/themeValues.test.ts` asserts on every jest
 * run that it deep-equals the computed themes.
 *
 * @returns {Record<string, Record<string, string>>} theme export name → (token → value)
 */
function readThemeValues() {
  if (!fs.existsSync(THEME_VALUES_SOURCE)) {
    throw new Error(
      `${THEME_VALUES_SOURCE} is missing. Run \`yarn workspace @fluentui/tokens generate-theme-values\` ` +
        '(after building packages/tokens) and commit the result.',
    );
  }

  const document = JSON.parse(fs.readFileSync(THEME_VALUES_SOURCE, 'utf8'));

  if (!document.themes || typeof document.themes !== 'object') {
    throw new Error(`${THEME_VALUES_SOURCE}: expected a top-level \`themes\` object.`);
  }

  return document.themes;
}

/**
 * Cross-asserts the three inputs of the theme emission and splits the token set:
 *
 * - the snapshot's theme set must equal the class-name constants' theme set;
 * - every theme must carry exactly the same keys: every non-zIndex token, no extras
 *   (zIndex tokens are theme-absent by design — their defaults ride the `tokens.*`
 *   var() fallback);
 * - every theme's spacing/stroke values must equal the pinned scales — those 26 tokens
 *   are THEME-INVARIANT and already emitted at `:root, :host` in their density-knob
 *   calc form, which a literal per-theme re-emission would silently break, so they are
 *   asserted identical and EXCLUDED from the per-theme classes;
 * - every theme's lineHeight values AND their 1:1-paired fontSize values must be
 *   byte-identical across themes — the unitless `--leading-*` ratios (Decision U) are
 *   derived from the pairing and emitted ONCE at `:root, :host` in the base sheet, so a
 *   theme with a divergent ramp needs a design decision, not a silently wrong shared ratio.
 *   They are likewise EXCLUDED from the per-theme classes.
 *
 * @param {{ name: string, value: string }[]} tokens parsed tokens.ts entries
 * @returns {{
 *   variantTokens: { name: string, canonical: string, scaleValue: ((tokenName: string, value: string) => string) | null }[],
 *   leadingTokens: { name: string, canonical: string, value: string }[],
 *   themes: Record<string, Record<string, string>>,
 *   classNames: Record<string, string>,
 * }}
 */
function analyzeThemeEmission(tokens) {
  const classNames = readThemeClassNames();
  const themes = readThemeValues();

  const snapshotThemes = Object.keys(themes).sort();
  const constantThemes = Object.keys(classNames).sort();
  if (JSON.stringify(snapshotThemes) !== JSON.stringify(constantThemes)) {
    throw new Error(
      `Shipped-theme sets disagree: theme-values.json has [${snapshotThemes}] but themeClassNames.ts has ` +
        `[${constantThemes}]. Regenerate the snapshot and/or update the constants.`,
    );
  }
  // No default-theme guard: there is no default theme (see the NO DEFAULT THEME note at the
  // top). The set equality above already proves every named theme has a snapshot.

  /** @type {{ name: string, canonical: string, scaleValue: ((tokenName: string, value: string) => string) | null }[]} */
  const variantTokens = [];
  /** @type {{ name: string, expected: string }[]} */
  const invariantTokens = [];
  /** @type {string[]} */
  const themeAbsentTokens = [];
  /** @type {{ name: string, canonical: string, fontSizeName: string, value: string }[]} */
  const leadingTokens = [];

  for (const { name } of tokens) {
    const classification = classify(name);
    if (classification.kind !== 'register') {
      continue;
    }
    if (classification.group.scale) {
      const px = classification.step.px;
      invariantTokens.push({ name, expected: px === 0 ? '0' : `${px}px` });
    } else if (classification.group.prefix === 'zIndex') {
      themeAbsentTokens.push(name);
    } else if (classification.group.unitlessRatio === true) {
      leadingTokens.push({
        name,
        canonical: /** @type {string} */ (classification.canonical),
        fontSizeName: `fontSize${name.slice(classification.group.prefix.length)}`,
        value: '', // derived below, once the themes are proven to agree
      });
    } else {
      variantTokens.push({
        name,
        canonical: /** @type {string} */ (classification.canonical),
        // Namespaces on the base-scale axis carry a rewrite; `scaleValue` lets a namespace whose
        // values are composite (shadows) override the plain-px default.
        scaleValue:
          classification.group.baseScaled === true ? (classification.group.scaleValue ?? baseScaledValue) : null,
      });
    }
  }

  const expectedKeys = [
    ...variantTokens.map(token => token.name),
    ...invariantTokens.map(token => token.name),
    ...leadingTokens.map(token => token.name),
  ].sort();

  for (const [themeName, theme] of Object.entries(themes)) {
    const themeKeys = Object.keys(theme).sort();
    if (JSON.stringify(themeKeys) !== JSON.stringify(expectedKeys)) {
      const missing = expectedKeys.filter(key => !(key in theme));
      const extra = themeKeys.filter(key => !expectedKeys.includes(key));
      throw new Error(
        `Theme \`${themeName}\` keys drifted from tokens.ts (zIndex excluded): ` +
          `missing [${missing}], extra [${extra}]. Regenerate theme-values.json.`,
      );
    }

    for (const { name, expected } of invariantTokens) {
      if (theme[name] !== expected) {
        throw new Error(
          `Theme \`${themeName}\` has \`${name}: ${theme[name]}\` but spacing/stroke tokens are theme-invariant ` +
            `(pinned ${expected}). The density-knob emission at :root depends on this — a genuinely divergent ` +
            'theme needs a design decision, not a silent literal emission.',
        );
      }
    }

    for (const name of themeAbsentTokens) {
      if (name in theme) {
        throw new Error(`Theme \`${themeName}\` unexpectedly carries the theme-absent token \`${name}\`.`);
      }
    }
  }

  // Unitless leading ratios (Decision U): prove the whole pairing is theme-invariant —
  // BOTH halves, since a ratio derived from theme A silently misdescribes a theme whose
  // line-height OR font-size diverges — then derive each ratio once.
  const themeEntries = Object.entries(themes);
  const [referenceThemeName, referenceTheme] = themeEntries[0];
  for (const token of leadingTokens) {
    if (!(token.fontSizeName in referenceTheme)) {
      throw new Error(
        `Token \`${token.name}\` has no 1:1-paired \`${token.fontSizeName}\` in the theme snapshot — ` +
          'the unitless ratio derivation depends on the ramp pairing.',
      );
    }
    for (const [themeName, theme] of themeEntries) {
      for (const key of [token.name, token.fontSizeName]) {
        if (theme[key] !== referenceTheme[key]) {
          throw new Error(
            `Theme \`${themeName}\` has \`${key}: ${theme[key]}\` but \`${referenceThemeName}\` has ` +
              `\`${referenceTheme[key]}\`. The type ramp must be theme-invariant for the shared unitless ` +
              '`--leading-*` ratios in the base sheet to be correct — a genuinely divergent ramp needs a ' +
              'design decision, not a silently wrong shared ratio.',
          );
        }
      }
    }
    token.value = unitlessLeadingValue(token.name, referenceTheme[token.name], referenceTheme[token.fontSizeName]);
  }

  return { variantTokens, leadingTokens, themes, classNames };
}

/**
 * Token-name prefix → Tailwind theme namespace. Order matters: the FIRST matching entry
 * wins, so longer prefixes that share a stem (fontFamily/fontSize/fontWeight) come first.
 *
 * `namespace` is the Tailwind theme key prefix; `utility` documents the utilities it feeds
 * and is only used for the generated section comments.
 *
 * Every namespace below was read out of the installed Tailwind v4.3.3 utility registry
 * (`node_modules/tailwindcss/dist/lib.mjs`), not guessed:
 *   duration → themeKeys ["--transition-duration"]   (NOT "--duration")
 *   ease     → themeKeys ["--ease"]
 *   z        → themeKeys ["--z-index"]
 *   font     → ["--font"] then ["--font-weight"]
 *   rounded  → ["--radius"], text → ["--text"], leading → ["--leading"], shadow → ["--shadow"]
 */
const NAMESPACES = [
  {
    prefix: 'color',
    namespace: 'color',
    utility: 'bg-* text-* border-* fill-* stroke-* outline-* ring-* decoration-*',
    heading: 'Colors',
  },
  {
    prefix: 'fontFamily',
    namespace: 'font',
    utility: 'font-*',
    heading: 'Font families',
  },
  {
    prefix: 'fontSize',
    namespace: 'text',
    utility: 'text-*',
    heading: 'Font sizes',
    baseScaled: true,
  },
  {
    prefix: 'fontWeight',
    namespace: 'font-weight',
    utility: 'font-*',
    heading: 'Font weights',
  },
  {
    prefix: 'lineHeight',
    namespace: 'leading',
    utility: 'leading-*',
    heading: 'Line heights — UNITLESS ratios of the paired font sizes',
    // UNITLESS RATIOS — Decision U (2026-08-28), superseding the earlier px-length rejection.
    // --------------------------------------------------------------------------------------
    // Each `--leading-*` is the idiomatic unitless line-height: the ramp's canonical px
    // divided by its 1:1-paired font size (`--leading-base-300` = 20px/14px = calc(20 / 14)).
    // Ratios are DERIVED from theme-values.json at generation time, never hardcoded — an
    // exact decimal where the division is finite, a `calc(A / B)` fraction where it repeats.
    // No `--base-scale` factor: the paired `--text-*` carries base-scale, and a ratio
    // multiplies the element's own computed font-size, so line boxes scale with it for free.
    //
    // The lane-D measurement that previously rejected this (1323 elements changing used
    // value, because `line-height` inherits a ratio as a NUMBER where a length inherited a
    // fixed px line box) still holds mechanically — it is COMPENSATED in the windmod
    // modules: every rule whose descendants relied on inheriting a px line box authors its
    // own explicit ratio paired against its authored font-size (lane-D's rule-surface map,
    // .scratch/leading-shadow/rule-surface.txt). The one cohort that BLOCKED per-site
    // ratios — Tab's root dividing by Chrome's UA <button> font-size, an engine constant —
    // was dissolved when preflight (S1) + explicit font-size authoring (S2) gave every
    // leading site an authored `text-*` step, making every denominator a token.
    //
    // THEME-INVARIANT: the type ramp is asserted byte-identical across all shipped themes
    // (analyzeThemeEmission), so the ratios are emitted ONCE at `:root, :host` in the base
    // sheet rather than per theme file. `unitlessRatio` routes them there.
    unitlessRatio: true,
  },
  {
    prefix: 'spacingHorizontal',
    namespace: 'spacing-horizontal',
    utility: 'px-* ps-* pe-* mx-* gap-x-* …',
    heading: 'Horizontal spacing, inline axis — numeric-axis ALIASES (calc(var(--spacing) * N))',
    scale: SPACING_SCALE,
    value: spacingTokenValue,
    emit: true,
  },
  {
    prefix: 'spacingVertical',
    namespace: 'spacing-vertical',
    utility: 'py-* pt-* pb-* my-* gap-y-* …',
    heading: 'Vertical spacing, block axis — numeric-axis ALIASES (calc(var(--spacing) * N))',
    scale: SPACING_SCALE,
    value: spacingTokenValue,
    emit: true,
  },
  {
    prefix: 'strokeWidth',
    namespace: 'spacing',
    utility: 'w-thin h-thick p-thin gap-thin … AND var(--spacing-thin) for ring widths',
    heading: 'Stroke widths — PRIVATE hooks aliasing the canonical --stroke-width-* variables',
    scale: STROKE_WIDTH_SCALE,
    value: strokeWidthValue,
    emit: true,
    // Width-namespace mirrors: register the same four steps under every width namespace the
    // installed registry themes, so the named forms (border-thin, outline-thick, …) exist.
    // Each mirror value is var(--spacing-<step>) — byte-identical compiled output to the
    // var-reference spelling it replaces (see the STROKE_WIDTH_SCALE doc block).
    mirrorNamespaces: [
      { namespace: 'border-width', utility: 'border-* border-t/b/s/e/x/y-* divide-*' },
      { namespace: 'outline-width', utility: 'outline-*' },
      { namespace: 'outline-offset', utility: 'outline-offset-*' },
      { namespace: 'text-decoration-thickness', utility: 'decoration-*' },
    ],
  },
  {
    prefix: 'borderRadius',
    namespace: 'radius',
    utility: 'rounded-* rounded-s-* rounded-e-* …',
    heading: 'Border radii',
  },
  {
    prefix: 'shadow',
    namespace: 'shadow',
    utility: 'shadow-*',
    heading: 'Shadows',
    // Offsets and blur radii ride the base-scale axis so an elevation keeps its proportion to
    // the box it lifts; a frozen-px shadow visually shrinks as the rest of the UI scales up.
    // Composite value, so the lengths are rewritten individually — see shadowScaledValue.
    baseScaled: true,
    scaleValue: shadowScaledValue,
  },
  {
    prefix: 'curve',
    namespace: 'ease',
    utility: 'ease-*',
    heading: 'Easing curves',
  },
  {
    prefix: 'duration',
    namespace: 'transition-duration',
    // Durations are the ONE Phase-2a family whose canonical RUNTIME variable
    // (`--duration-fast`) differs from its Tailwind theme key
    // (`--transition-duration-fast`): the family keeps the shorter custom namespace
    //, while the theme key must be what the installed
    // utility registry reads. The registered value `var(--duration-fast)` carries the
    // canonical reference into `duration-*` utilities verbatim.
    canonicalNamespace: 'duration',
    utility: 'duration-*',
    heading: 'Transition durations',
  },
  {
    prefix: 'zIndex',
    namespace: 'z-index',
    utility: 'z-*',
    heading: 'z-index (theme-absent tokens — fallbacks carried verbatim)',
  },
];

/**
 * Prefixes deliberately NOT registered — currently EMPTY: every Fluent token has a Tailwind
 * theme name. The mechanism stays because `classify` throws on an unclassified token, and a
 * future token family may genuinely have no namespace; this is where its reason would live.
 *
 * HISTORY: `strokeWidth*` was the last exclusion, on the grounds that no namespace fits (still
 * true — see STROKE_WIDTH_SCALE). It was removed 2026-07-27 when the four joined `--spacing-*`:
 * a stroke width IS a length on the same base-scale system, the spacing-powered families give
 * it real utilities, and the accompanying `emit: true` variable covers the border/outline/ring/
 * decoration properties that provably do NOT consume the namespace.
 *
 * @type {{ prefix: string, reason: string }[]}
 */
const EXCLUSIONS = [];

/*
 * COLLISIONS WITH TAILWIND STATIC UTILITIES — probe-verified, no action needed.
 *
 * Two generated names collide with a Tailwind static utility of the same name. In both
 * cases the registered theme value WINS and the utility compiles to the Fluent token
 * (verified by compiling, not read from docs), and in both cases the token is
 * value-equivalent to the static it displaces, so nothing changes visually:
 *
 *   rounded-none  borderRadiusNone  wins over static `border-radius: 0`      (token is 0)
 *   ease-linear   curveLinear       wins over static `linear`  (token is cubic-bezier(0,0,1,1))
 *
 * Recorded here so nobody debugs it twice.
 */

/**
 * Reads `packages/tokens/src/tokens.ts` as text and extracts its flat `key: 'value',` entries
 * in source order.
 *
 * Text extraction rather than `require('@fluentui/tokens')` on purpose: the theme package has
 * no build step and no dependency edge on @fluentui/tokens, so a fresh clone must be able to
 * regenerate/verify without building anything. The parse is guarded — a shape change in
 * tokens.ts (spreads, computed keys, non-literal values) trips the assertions below instead
 * of silently emitting a short file.
 *
 * @returns {{ name: string, value: string }[]}
 */
function readTokens() {
  const source = fs.readFileSync(TOKENS_SOURCE, 'utf8');

  const declaration = /export const tokens: Record<keyof Theme, string> = \{/;
  if (!declaration.test(source)) {
    throw new Error(
      `${TOKENS_SOURCE}: expected a \`export const tokens: Record<keyof Theme, string> = {\` declaration.`,
    );
  }

  /** @type {{ name: string, value: string }[]} */
  const tokens = [];
  const entry = /^[ \t]*([A-Za-z][A-Za-z0-9_]*):[ \t]*'([^']*)',[ \t]*$/gm;
  let match;
  while ((match = entry.exec(source)) !== null) {
    tokens.push({ name: match[1], value: match[2] });
  }

  if (tokens.length === 0) {
    throw new Error(`${TOKENS_SOURCE}: parsed zero tokens — the file shape changed.`);
  }

  // Every token value must be a var() reference, optionally with a fallback (zIndex*).
  // Hyphens allowed: the 26 spacing/stroke tokens reference canonical kebab-case names
  //.
  for (const { name, value } of tokens) {
    if (!/^var\(--[A-Za-z][A-Za-z0-9_-]*(?:, ?[^)]+)?\)$/.test(value)) {
      throw new Error(`${TOKENS_SOURCE}: token \`${name}\` has an unexpected value \`${value}\`.`);
    }
  }

  // Guard against the regex skipping entries: no line inside the literal may look like a
  // key/value pair yet fail to parse.
  const body = source.slice(source.search(declaration));
  const looseCount = (body.match(/^[ \t]*[A-Za-z][A-Za-z0-9_]*:/gm) || []).length;
  if (looseCount !== tokens.length) {
    throw new Error(`${TOKENS_SOURCE}: parsed ${tokens.length} tokens but found ${looseCount} key-like lines.`);
  }

  return tokens;
}

/**
 * @param {string} name
 * @returns {{ kind: 'register', group: typeof NAMESPACES[number], themeKey: string, value?: string } | { kind: 'exclude', prefix: string, reason: string }}
 */
function classify(name) {
  for (const group of NAMESPACES) {
    if (!name.startsWith(group.prefix)) {
      continue;
    }
    const remainder = name.slice(group.prefix.length);
    if (remainder.length === 0) {
      throw new Error(`Token \`${name}\` is exactly its namespace prefix — no key left to name a utility.`);
    }

    // Spacing (incl. stroke widths) is the one namespace with a pinned suffix table AND a
    // substituted value. `group.scale` IS that table.
    if (group.scale) {
      const step = group.scale.find(entry => entry.suffix === remainder);
      if (!step) {
        throw new Error(
          `Token \`${name}\` has step \`${remainder}\`, which is not in the pinned table for ` +
            `\`${group.prefix}\`. Add it (with its px value) in ${GENERATOR_ID}.`,
        );
      }
      return {
        kind: 'register',
        group,
        themeKey: `--${group.namespace}-${step.utility}`,
        value: group.value(step),
        step,
      };
    }

    const kebab = kebabCase(remainder);
    return {
      kind: 'register',
      group,
      themeKey: `--${group.namespace}-${kebab}`,
      // The canonical RUNTIME variable name: identical to the theme
      // key for every namespace except duration (see NAMESPACES).
      canonical: `--${group.canonicalNamespace || group.namespace}-${kebab}`,
    };
  }

  for (const exclusion of EXCLUSIONS) {
    if (name.startsWith(exclusion.prefix)) {
      return { kind: 'exclude', prefix: exclusion.prefix, reason: exclusion.reason };
    }
  }

  throw new Error(
    `Token \`${name}\` matches no namespace and no exclusion. Add it to NAMESPACES or EXCLUSIONS in ${GENERATOR_ID}.`,
  );
}

/**
 * @param {{ modifiers?: string }} [options]
 * @returns {string}
 */
function render(options = {}) {
  const modifiers = options.modifiers === undefined ? THEME_MODIFIERS : options.modifiers;
  const tokensPackage = JSON.parse(fs.readFileSync(path.join(TOKENS_PACKAGE, 'package.json'), 'utf8'));
  const tokens = readTokens();
  // Both pinned tables are asserted against packages/tokens before anything is rendered; an
  // upstream scale change throws here instead of silently shipping a stale hardcoded value.
  readSpacingScale();
  readStrokeWidthScale();
  // Theme-VARIANT values are NOT emitted here — they ship one file per theme under
  // `css/themes/` (see NO DEFAULT THEME at the top). `analyzeThemeEmission` runs for its
  // assertions — it is what proves the spacing/stroke set below really is invariant — and
  // yields the theme-invariant unitless `--leading-*` ratios this sheet owns (Decision U).
  const { leadingTokens } = analyzeThemeEmission(tokens);

  /** @type {Map<string, { group: typeof NAMESPACES[number], lines: string[] }>} */
  const sections = new Map();
  /** Spacing-canonical keys that must ALSO be emitted as real custom properties. @type {string[]} */
  const emittedVariables = [];
  /** Canonical `--stroke-width-*` declarations (public set-contract). @type {string[]} */
  const canonicalStrokes = [];
  /** Private spacing-namespace hooks for stroke widths. @type {string[]} */
  const strokeHooks = [];
  /** Excluded token names, keyed by the EXCLUSIONS prefix that matched. @type {Map<string, string[]>} */
  const excluded = new Map();
  /** @type {Map<string, string>} */
  const seenThemeKeys = new Map();
  /** Width-namespace mirror registrations. @type {Map<string, { mirror: { namespace: string, utility: string }, lines: string[] }>} */
  const mirrorSections = new Map();

  for (const { name, value } of tokens) {
    const classification = classify(name);

    if (classification.kind === 'exclude') {
      const bucket = excluded.get(classification.prefix) || [];
      bucket.push(name);
      excluded.set(classification.prefix, bucket);
      continue;
    }

    const { group, themeKey } = classification;
    const collision = seenThemeKeys.get(themeKey);
    if (collision) {
      throw new Error(`Theme key \`${themeKey}\` is produced by both \`${collision}\` and \`${name}\`.`);
    }
    seenThemeKeys.set(themeKey, name);

    // tokens.ts is consumed as the token-name INVENTORY only. The classic (Griffel-era)
    // `tokens.*` JS constants keep referencing the historical camelCase variables; this
    // package's kebab-case namespace is deliberately self-contained (see README — no
    // interoperability with FluentProvider theming), so the JS read path is neither
    // asserted nor emitted here. Only a fallback embedded in a tokens.ts value (zIndex
    // carries its default as a var() fallback) is preserved, re-targeted at the
    // canonical variable.
    const canonical = group.scale
      ? group.prefix === 'strokeWidth'
        ? strokeWidthCanonicalName(classification.step)
        : themeKey
      : classification.canonical;
    const fallback = /^var\(--[A-Za-z0-9-]+, ([^)]+)\)$/.exec(value);
    const resolved =
      classification.value !== undefined
        ? classification.value
        : `var(${canonical}${fallback ? `, ${fallback[1]}` : ''})`;
    const section = sections.get(group.prefix) || { group, lines: [] };
    section.lines.push(`  ${themeKey}: ${resolved};`);
    sections.set(group.prefix, section);

    if (group.mirrorNamespaces) {
      for (const mirror of group.mirrorNamespaces) {
        const mirrorKey = `--${mirror.namespace}-${classification.step.utility}`;
        if (seenThemeKeys.has(mirrorKey)) {
          throw new Error(`Mirror theme key \`${mirrorKey}\` collides with \`${seenThemeKeys.get(mirrorKey)}\`.`);
        }
        const bucket = mirrorSections.get(mirror.namespace) || { mirror, lines: [] };
        bucket.lines.push(`  ${mirrorKey}: var(${themeKey});`);
        mirrorSections.set(mirror.namespace, bucket);
      }
    }

    if (group.emit) {
      if (group.prefix === 'strokeWidth') {
        canonicalStrokes.push(
          `    ${strokeWidthCanonicalName(classification.step)}: ${strokeWidthCanonicalValue(classification.step)};`,
        );
        strokeHooks.push(`    ${themeKey}: ${resolved};`);
      } else {
        emittedVariables.push(`    ${themeKey}: ${resolved};`);
      }
    }
  }

  const registered = seenThemeKeys.size;
  const excludedCount = tokens.length - registered;

  const excludedSummary = [...excluded].map(([prefix, names]) => `${names.length}× ${prefix}*`).join(', ');
  const excludedNote = excludedCount === 0 ? 'none excluded' : `${excludedCount} excluded (${excludedSummary})`;

  // NOTE: a plain `/*` comment, NOT `/*!`. This file is inlined into the theme package's
  // emitted root artifact (css/emit.css -> dist/styles.css, shipped once per document), and
  // a bang comment is preserved by minifiers by contract. An earlier 45-line version of this
  // header measured 4,390 raw / 1,639 gzip bytes in that artifact — against a 1,515-byte
  // baseline. Keep the shipped header to provenance + the two load-bearing warnings; the
  // full rationale, namespace mapping and exclusion reasons live in this generator's source.
  const out = [];
  out.push('/*');
  out.push(' * DO NOT EDIT — generated file.');
  out.push(' *');
  out.push(` * Generator:  ${GENERATOR_ID}`);
  out.push(` * Source:     ${tokensPackage.name}@${tokensPackage.version} (packages/tokens/src/tokens.ts)`);
  out.push(` * Regenerate: node ${GENERATOR_ID}`);
  out.push(` * Verify:     node ${GENERATOR_ID} --check`);
  out.push(' *');
  out.push(` * ${tokens.length} Fluent tokens: ${registered} registered, ${excludedNote}.`);
  out.push(' *');
  out.push(' * `inline` is MANDATORY: it substitutes the canonical var(--token-name) into each');
  out.push(' * utility, so values resolve per-element — the `:root, :host` defaults below,');
  out.push(' * overridden per subtree by the theme classes (css/themes.css).');
  out.push(' * A plain `@theme` alias would freeze resolution at `:root`, breaking scoped');
  out.push(' * theming. `reference` suppresses the self-referential aliases that plain');
  out.push(' * `inline` would emit now that each runtime variable IS its theme key (theming');
  out.push(' * the kebab-name model) — the values are emitted in the fui.theme block below, not by JS.');
  out.push(' *');
  out.push(' * SPACING IS THE ONE EXCEPTION: --spacing-horizontal-* / --spacing-vertical-* are');
  out.push(' * ALIASES OF THE NUMERIC AXIS — calc(var(--spacing) * N), the same shape p-12');
  out.push(' * compiles to — so named and numeric spacing are ONE system with ONE density knob');
  out.push(' * (--spacing). Stroke widths are the deliberate exception: their PUBLIC variables');
  out.push(' * are --stroke-width-thin/thick/thicker/thickest with literal');
  out.push(' * calc(<px> * var(--base-scale)) values (borders must not thin when layout density');
  out.push(' * changes); --spacing-thin/… are PRIVATE hooks aliasing them for utility generation.');
  out.push(' * Provider spacing/strokeWidth overrides do not reach these; all 7 shipped themes');
  out.push(' * carry identical values.');
  out.push(' *');
  out.push(' * Font sizes (--text-*) carry the same literal calc(<px> * var(--base-scale)) form as');
  out.push(' * stroke widths: type follows the root font size, not the --spacing density knob. Their');
  out.push(' * paired line heights (--leading-*) are UNITLESS RATIOS of the ramp pairing (Decision U:');
  out.push(' * --leading-base-300 = 20px/14px = calc(20 / 14)) — the ratio multiplies the element’s');
  out.push(' * own font-size, which already rides base-scale, so line boxes scale for free. They are');
  out.push(' * theme-invariant (ramp asserted identical across themes) and emitted below, not per theme.');
  out.push(' * Shadow offsets and blur radii ride the base-scale axis, so an elevation');
  out.push(' * keeps its proportion to the box it lifts. Radii deliberately stay unscaled: a corner');
  out.push(' * radius is a fixed design constant, not a function of the root font size.');
  out.push(' *');
  out.push(' * ORDER MATTERS: index.css imports this AFTER its `@theme static` block, whose');
  out.push(' * `--color-*: initial` / `--spacing-*: initial` clear only what precedes them.');
  out.push(' *');
  out.push(' * Rationale, namespace mapping, emission reasons: see the generator source.');
  out.push(' */');
  out.push('');
  out.push(`@theme ${modifiers} {`.replace(/\s+\{$/, ' {').replace('@theme  {', '@theme {'));

  let first = true;
  for (const { group, lines } of sections.values()) {
    if (!first) {
      out.push('');
    }
    first = false;
    out.push(`  /* ${group.heading} — ${lines.length} tokens → --${group.namespace}-* (${group.utility}) */`);
    out.push(...lines);
  }

  for (const { mirror, lines } of mirrorSections.values()) {
    out.push('');
    out.push(
      `  /* Stroke widths — width-namespace MIRROR of the --spacing-* hooks — ${lines.length} tokens → --${mirror.namespace}-* (${mirror.utility}) */`,
    );
    out.push(...lines);
  }

  out.push('}');

  /** Theme-invariant unitless leading ratios (Decision U). @type {string[]} */
  const leadingLines = leadingTokens.map(token => `    ${token.canonical}: ${token.value};`);

  if (emittedVariables.length + canonicalStrokes.length + strokeHooks.length + leadingLines.length > 0) {
    out.push('');
    out.push('/*');
    out.push(' * REAL CUSTOM PROPERTIES — the one block in this file that emits declarations.');
    out.push(' *');
    out.push(' * `@theme inline` above registers utility NAMES and emits no variables, which is');
    out.push(' * correct for every other namespace. The spacing namespace needs real variables:');
    out.push(' * the border/outline/decoration widths have named utilities via the width-namespace');
    out.push(' * mirrors above, but ring-width, divide-* values and underline-offset have no');
    out.push(' * themable namespace and are authored as a direct var(--spacing-thin); and the');
    out.push(' * `tokens.*` JS constants in @fluentui/tokens are var() reference strings against');
    out.push(' * the canonical names emitted here (charts inline styles etc.).');
    out.push(' *');
    out.push(' * THE OLD camelCase NAMES (--colorNeutralBackground1, --spacingHorizontalM, …)');
    out.push(' * ARE GONE for the ENTIRE token set: single');
    out.push(' * vocabulary, documented major break for hand-written consumer CSS. Theming');
    out.push(" * the static-theme model removed FluentProvider's runtime theme style tag, so this block");
    out.push(' * (plus the per-theme classes in css/themes/) is the ONLY writer of token values.');
    out.push(' *');
    out.push(' * THEME-INVARIANT ONLY. Every value below is identical in all seven shipped themes');
    out.push(' * (asserted by `analyzeThemeEmission`), so it belongs to the base sheet rather than');
    out.push(' * to any one theme. The theme-VARIANT variables are NOT emitted here — there is no');
    out.push(' * default theme; a consumer imports the theme file(s) they use and applies the class,');
    out.push(' * exactly as Griffel makes them import `webLightTheme` and pass it to the provider.');
    out.push(' *');
    out.push(' * Emitted ONCE PER DOCUMENT (D13): `@reference` drops this block, so component');
    out.push(' * `*.module.css` output stays free of theme declarations; css/emit.css compiles it');
    out.push(' * into dist/base.css alongside --base-scale and --spacing, which utility-sourced');
    out.push(' * spacing already depends on identically.');
    out.push(' *');
    out.push(' * `:root, :host` — not bare `:root` — matches the selector Tailwind emits its own');
    out.push(' * `@theme` block on, so a shadow-DOM consumer that sees --base-scale/--spacing sees');
    out.push(' * these too (verified in the compiled dist/styles.css).');
    out.push(' */');
    out.push('@layer fui.theme {');
    // Selector split across two lines: prettier formats `:root, :host {` that way, and this
    // file is prettier-checked in CI — a single-line form makes the generator's `--check`
    // and the formatter disagree forever.
    out.push('  :root,');
    out.push('  :host {');
    out.push('    /*');
    out.push('     * Stroke widths — PUBLIC set-contract. Literal base-scale values, deliberately');
    out.push('     * NOT coupled to the --spacing density knob: borders must not thin when layout');
    out.push('     * density changes.');
    out.push('     */');
    out.push(...canonicalStrokes);
    out.push('');
    out.push('    /*');
    out.push('     * PRIVATE internal hooks — Tailwind utility generation only (w-thin, p-thick, …)');
    out.push('     * and module-authored var(--spacing-thin) border/outline widths. Do NOT set or');
    out.push('     * read these from consumer code; the public contract is --stroke-width-*.');
    out.push('     */');
    out.push(...strokeHooks);
    out.push('');
    out.push('    /* Spacing — numeric-axis aliases; --spacing (see css/index.css) is the density knob. */');
    out.push(...emittedVariables);
    out.push('');
    out.push('    /*');
    out.push('     * Line heights — UNITLESS ratios of the 1:1 ramp pairing (Decision U), derived at');
    out.push('     * generation time (--leading-base-300 = 20px/14px). Theme-INVARIANT: the type ramp');
    out.push('     * is asserted byte-identical across all shipped themes, so these live in the base');
    out.push('     * sheet, not the per-theme files. No --base-scale factor — the paired --text-*');
    out.push('     * carries it, and a ratio multiplies the element’s own computed font-size.');
    out.push('     */');
    out.push(...leadingLines);
    out.push('  }');
    out.push('}');
  }

  out.push('');

  const contents = out.join('\n');
  assertCommentsAreWellFormed(contents);
  return contents;
}

/**
 * A theme's file stem under `css/themes/`, derived from its class name so the two can never
 * drift: `fui-theme-teams-dark-v21` → `teams-dark-v21`. The class names themselves are
 * asserted against `theme-class-names.mjs` on every run, which makes this derivation the
 * single source of truth for the published `./themes/<stem>.css` subpaths too.
 *
 * @param {string} className
 * @returns {string}
 */
function themeFileStem(className) {
  const stem = className.replace(/^fui-theme-/, '');
  if (stem === className || stem === '') {
    throw new Error(`Theme class name \`${className}\` does not have the expected \`fui-theme-\` prefix.`);
  }
  return stem;
}

/**
 * Renders ONE theme's file — `css/themes/<stem>.css`, carrying exactly that theme's class.
 *
 * THE THEMING CONTRACT (operator ruling 2026-08-28, "Theme delivery"): mirroring Griffel's
 * `import { webLightTheme }` + `theme={…}`, a consumer imports the file for each theme they
 * use and applies its class. Nothing is themed by default — there is no baked default, so a
 * document that imports no theme file resolves no theme variables at all, exactly as a
 * Griffel app renders unset tokens without a theme object.
 *
 * A theme class on ANY DOM node themes that node's subtree (custom properties cascade);
 * FluentProvider's `theme` prop applies one to its root. Theme classes contain ONLY
 * custom-property declarations — never styling rules — and live in `@layer fui.theme`,
 * alongside the invariant `:root, :host` emission in the base sheet.
 *
 * Each class carries the theme's 433 THEME-VARIANT canonical variables. The 26
 * spacing/stroke tokens are EXCLUDED on purpose: they are theme-invariant (asserted in
 * `analyzeThemeEmission`) and emitted once by the base sheet in their density-knob calc
 * form — a literal per-theme re-emission would freeze `--spacing` overrides inside themed
 * subtrees. zIndex tokens are theme-absent; their defaults ride the `tokens.*` var()
 * fallback.
 *
 * The file carries NO `@layer` ORDER statement. Per the campaign contract the order
 * statement has exactly one owner, the base sheet, which a document loads first; a theme
 * file only wraps its block in the already-ordered `fui.theme` layer.
 *
 * @param {string} themeName
 * @param {string} className
 * @returns {string}
 */
function renderTheme(themeName, className) {
  const tokensPackage = JSON.parse(fs.readFileSync(path.join(TOKENS_PACKAGE, 'package.json'), 'utf8'));
  const tokens = readTokens();
  readSpacingScale();
  readStrokeWidthScale();
  const { variantTokens, themes } = analyzeThemeEmission(tokens);
  const theme = themes[themeName];

  const out = [];
  out.push('/*');
  out.push(' * DO NOT EDIT — generated file.');
  out.push(' *');
  out.push(` * Generator:  ${GENERATOR_ID}`);
  out.push(` * Source:     ${tokensPackage.name}@${tokensPackage.version} (packages/tokens/theme-values.json)`);
  out.push(` * Regenerate: node ${GENERATOR_ID}`);
  out.push(` * Verify:     node ${GENERATOR_ID} --check`);
  out.push(' *');
  out.push(` * ${themeName} — ${variantTokens.length} custom properties, nothing else.`);
  out.push(' *');
  out.push(' * Import this file and apply `.' + className + '` to theme a subtree. There is no');
  out.push(' * default theme: without a theme file + class, these variables are unset (Griffel');
  out.push(' * parity — its tokens are equally unset without a `theme` object). The class-name');
  out.push(' * constant ships from ./theme-class-names; the generator asserts the lockstep.');
  out.push(' *');
  out.push(' * Pairs with the base sheet (./base.css), which owns the @layer order statement, the');
  out.push(' * utility registrations and the theme-INVARIANT spacing/stroke values. Load the base');
  out.push(' * sheet first; this file only fills an already-ordered fui.theme layer.');
  out.push(' */');
  out.push('');
  out.push('@layer fui.theme {');
  out.push(`  .${className} {`);
  for (const { name, canonical, scaleValue } of variantTokens) {
    out.push(`    ${canonical}: ${scaleValue ? scaleValue(name, theme[name]) : theme[name]};`);
  }
  out.push('  }');
  out.push('}');
  out.push('');

  const contents = out.join('\n');
  assertCommentsAreWellFormed(contents);
  return contents;
}

/**
 * Asserts `package.json` declares exactly one `./themes/<stem>.css` subpath per shipped
 * theme, each pointing at the file this generator emits.
 *
 * The subpaths are hand-authored (this package has no project.json and is out of the
 * export-maps-sync generator's scope), so nothing else would catch a theme added upstream
 * that never got a published entry point — the file would build and be unreachable.
 *
 * @param {Record<string, string>} classNames
 */
function assertThemeSubpaths(classNames) {
  const manifest = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8'));

  const expected = Object.values(classNames).map(className => `./themes/${themeFileStem(className)}.css`);
  const declared = Object.keys(manifest.exports ?? {}).filter(key => key.startsWith('./themes/'));

  const missing = expected.filter(key => !declared.includes(key));
  const extra = declared.filter(key => !expected.includes(key));

  if (missing.length || extra.length) {
    throw new Error(
      `package.json theme subpaths are out of step with the shipped themes.` +
        (missing.length ? ` Missing: [${missing}].` : '') +
        (extra.length ? ` Not a shipped theme: [${extra}].` : ''),
    );
  }

  for (const key of expected) {
    const target = `./dist/${key.slice('./'.length)}`;
    if (manifest.exports[key] !== target) {
      throw new Error(`package.json maps "${key}" to "${manifest.exports[key]}"; expected "${target}".`);
    }
  }
}

/**
 * Renders `css/themes.css` — the all-seven aggregate.
 *
 * It exists for the two entries that legitimately want every theme at once: the
 * `./styles.css` monolith build (zero-config parity with the windmod package's own monolith)
 * and the storybook harness, which catalogs all seven. It is a list of `@import`s and holds
 * no declarations of its own, so the per-theme files stay the single source of values.
 *
 * @returns {string}
 */
function renderThemesAggregate() {
  const tokens = readTokens();
  const { classNames } = analyzeThemeEmission(tokens);

  const out = [];
  out.push('/*');
  out.push(' * DO NOT EDIT — generated file.');
  out.push(' *');
  out.push(` * Generator:  ${GENERATOR_ID}`);
  out.push(` * Regenerate: node ${GENERATOR_ID}`);
  out.push(` * Verify:     node ${GENERATOR_ID} --check`);
  out.push(' *');
  out.push(' * ALL SEVEN SHIPPED THEMES. A convenience aggregate, not the recommended import:');
  out.push(' * pulling this in costs every theme. Import only `./css/themes/<name>.css` for the');
  out.push(' * themes an application actually offers.');
  out.push(' *');
  out.push(' * Used by the `./styles.css` monolith build and by the storybook harness, both of');
  out.push(' * which want the whole catalog by definition.');
  out.push(' */');
  out.push('');
  for (const className of Object.values(classNames)) {
    out.push(`@import './themes/${themeFileStem(className)}.css';`);
  }
  out.push('');

  const contents = out.join('\n');
  assertCommentsAreWellFormed(contents);
  return contents;
}

/**
 * Guards against a comment-terminator sequence sneaking into generated comment text. A
 * utility list written as `shadow-<star><slash>color` silently ends the comment and turns
 * the rest of the header into garbage declarations — this caught exactly that during
 * development. Verifies every opener is closed and that openers and closers balance.
 *
 * @param {string} css
 */
function assertCommentsAreWellFormed(css) {
  let index = 0;
  while (index < css.length) {
    const open = css.indexOf('/*', index);
    if (open < 0) {
      break;
    }
    const close = css.indexOf('*/', open + 2);
    if (close < 0) {
      throw new Error(`Generated CSS has an unterminated comment starting at offset ${open}.`);
    }
    index = close + 2;
  }
  const opens = (css.match(/\/\*/g) || []).length;
  const closes = (css.match(/\*\//g) || []).length;
  if (opens !== closes) {
    throw new Error(`Generated CSS has ${opens} comment openers but ${closes} closers — a comment body contains "*/".`);
  }
}

function main() {
  const argv = process.argv.slice(2);
  const check = argv.includes('--check');

  const outIndex = argv.indexOf('--out');
  const outPath = outIndex >= 0 ? path.resolve(argv[outIndex + 1]) : DEFAULT_OUTPUT;

  const modifiersIndex = argv.indexOf('--modifiers');
  const modifiers = modifiersIndex >= 0 ? argv[modifiersIndex + 1] : undefined;

  // Prettier-format the output so the generated files satisfy the repo formatter
  // without a .prettierignore exception; `--check` stays byte-exact because it
  // compares against the formatted contents.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const prettier = require('@prettier/sync');
  const format = (filePath, contents) =>
    prettier.format(contents, { ...(prettier.resolveConfig(filePath) ?? {}), filepath: filePath });

  // The theme files are only written/checked alongside the canonical tokens.css — `--out`
  // runs are probe runs of the registration block.
  const classNames = readThemeClassNames();

  if (outIndex < 0) {
    assertThemeSubpaths(classNames);
  }

  const themeFiles =
    outIndex >= 0
      ? []
      : Object.entries(classNames).map(([themeName, className]) => {
          const filePath = path.join(THEMES_DIR, `${themeFileStem(className)}.css`);
          return { path: filePath, contents: format(filePath, renderTheme(themeName, className)) };
        });

  const files = [
    { path: outPath, contents: format(outPath, render({ modifiers })) },
    ...themeFiles,
    ...(outIndex >= 0 ? [] : [{ path: THEMES_OUTPUT, contents: format(THEMES_OUTPUT, renderThemesAggregate()) }]),
  ];

  // A theme removed upstream must not leave a stale published file behind — the export map
  // would keep resolving it and consumers would keep applying a class no longer in the
  // contract. Only files this generator owns (`css/themes/*.css`) are considered.
  const expectedThemeFiles = new Set(themeFiles.map(file => path.basename(file.path)));
  const staleThemeFiles =
    outIndex >= 0 || !fs.existsSync(THEMES_DIR)
      ? []
      : fs.readdirSync(THEMES_DIR).filter(name => name.endsWith('.css') && !expectedThemeFiles.has(name));

  for (const name of staleThemeFiles) {
    const relative = path.relative(REPO_ROOT, path.join(THEMES_DIR, name));
    if (check) {
      console.error(`[generate-tokens-css] STALE: ${relative} is not a shipped theme.`);
      console.error(`[generate-tokens-css] Run: node ${GENERATOR_ID}`);
      process.exitCode = 1;
      continue;
    }
    fs.unlinkSync(path.join(THEMES_DIR, name));
    console.log(`[generate-tokens-css] removed ${relative} (no longer a shipped theme)`);
  }

  for (const file of files) {
    const relative = path.relative(REPO_ROOT, file.path);

    if (check) {
      const existing = fs.existsSync(file.path) ? fs.readFileSync(file.path, 'utf8') : null;
      if (existing === null) {
        console.error(`[generate-tokens-css] MISSING: ${relative}`);
        console.error(`[generate-tokens-css] Run: node ${GENERATOR_ID}`);
        process.exitCode = 1;
        continue;
      }
      if (existing.replace(/\r\n/g, '\n') !== file.contents) {
        console.error(`[generate-tokens-css] STALE: ${relative} differs from generator output.`);
        console.error(`[generate-tokens-css] Run: node ${GENERATOR_ID}`);
        process.exitCode = 1;
        continue;
      }
      console.log(`[generate-tokens-css] OK: ${relative} is up to date.`);
      continue;
    }

    fs.mkdirSync(path.dirname(file.path), { recursive: true });
    fs.writeFileSync(file.path, file.contents);
    console.log(`[generate-tokens-css] wrote ${relative} (${Buffer.byteLength(file.contents)} bytes)`);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  kebabCase,
  classify,
  readTokens,
  readSpacingScale,
  readStrokeWidthScale,
  readThemeClassNames,
  readThemeValues,
  analyzeThemeEmission,
  render,
  assertThemeSubpaths,
  renderTheme,
  renderThemesAggregate,
  themeFileStem,
  spacingTokenValue,
  unitlessLeadingValue,
  strokeWidthValue,
  strokeWidthCanonicalName,
  strokeWidthCanonicalValue,
  SPACING_BASE_PX,
  NAMESPACES,
  EXCLUSIONS,
  SPACING_SCALE,
  STROKE_WIDTH_SCALE,
};
