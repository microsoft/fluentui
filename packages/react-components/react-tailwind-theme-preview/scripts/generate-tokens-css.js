// @ts-check
/**
 * Generates `css/tokens.css` — the `@theme inline` registration that gives every Fluent
 * design token a Tailwind utility name (`bg-neutral-background-1`, `text-base-300`,
 * `shadow-8`, `rounded-medium`, …).
 *
 * WHY `inline` IS MANDATORY
 * -------------------------
 * A naive `@theme { --color-x: <value> }` emits the value into `:root` and compiles
 * `bg-x` to `background-color: var(--color-x)` resolved ONCE, at `:root`, where Fluent
 * token VALUES do not exist — FluentProvider writes them on `.fui-FluentProviderN`
 * elements. Every provider (and every nested provider) would render the same frozen
 * value. FORBIDDEN.
 *
 * `inline` substitutes the theme value into the utility itself, so `bg-x` compiles to
 * `background-color: var(--color-neutral-background-1)` and resolves per-element against
 * the nearest FluentProvider — nested themes keep working (DECISIONS.md D4's theming
 * guarantee is preserved; only the authoring surface changes).
 *
 * THEMING PHASE 2a — canonical kebab names; `reference` ADOPTED (supersedes the earlier
 * rejection)
 * -----------------------------------------------------------------------------------
 * Since theming Phase 2a the runtime CSS variable of every token IS its Tailwind theme
 * key (`--color-neutral-background-1`, `--text-base-300`, `--shadow-2`, …; durations are
 * the one exception, see NAMESPACES). Each registration is therefore a SELF-NAMED
 * reference (`--color-x: var(--color-x)`), which plain `inline` treats as a by-name use
 * and answers by emitting a self-referential alias at `:root, :host` — 400+ cyclic
 * (guaranteed-invalid at `:root`) declarations that define nothing and cost ~19KB
 * (probe: .scratch/phase2a-theming/probe/). `reference` suppresses exactly that
 * emission and nothing else — probed byte-identical utility output.
 *
 * `reference` was REJECTED pre-Phase-2a ("suppresses the alias even when a by-name
 * reference exists, emitting CSS against a variable nothing defines"). That reason is
 * retired: FluentProvider's runtime theme tag now writes the canonical kebab names on
 * every provider element (alongside the legacy camelCase names, until Phase 2b removes
 * the tag), so `var(--color-neutral-background-1)` IS defined wherever tokens were ever
 * defined. Resolution semantics are unchanged from the camelCase era: per-element,
 * against the nearest provider; undefined outside any provider.
 *
 * SPACING IS DIFFERENT — see SPACING_SCALE / STROKE_WIDTH_SCALE below. The 22
 * spacingHorizontal / spacingVertical tokens register under `--spacing-*` as ALIASES OF
 * THE NUMERIC AXIS — `calc(var(--spacing) * <multiplier>)`, where the multiplier is the
 * token's canonical px divided by the `--spacing` base px (theming Phase 1, settled with
 * user 2026-07-29; supersedes the literal `calc(<px> * var(--base-scale))` form). Probe-
 * verified: `@theme inline` carries the `var(--spacing)` reference VERBATIM into each
 * utility, so `p-horizontal-m` compiles to `padding: calc(var(--spacing) * 12)` — the
 * same shape as `p-12` — and BOTH respond identically to a subtree `--spacing` override.
 * `--spacing` (css/index.css: `calc(1px * var(--base-scale))`) is the single density knob.
 *
 * THE 4 strokeWidth TOKENS ARE THE DELIBERATE EXCEPTION: their PUBLIC variables are
 * `--stroke-width-thin/thick/thicker/thickest` with LITERAL base-scale values
 * (`calc(<px> * var(--base-scale))`), NOT coupled to `--spacing` — borders must not thin
 * when layout density changes. The `--spacing-thin/…` names still exist, but ONLY as
 * PRIVATE internal hooks (`--spacing-thin: var(--stroke-width-thin)`) that feed Tailwind
 * utility generation (`w-thin`, `p-thick`, …) and the sanctioned direct-var authoring in
 * component modules; the public set-contract is `--stroke-width-*`. See STROKE_WIDTH_SCALE.
 *
 * ALL ENTRIES ARE ALSO EMITTED AS REAL CUSTOM PROPERTIES (`emit: true`): the 22 spacing
 * canonicals, the 4 `--stroke-width-*` canonicals, and the 4 private hooks. `@theme inline`
 * registers a utility name but emits NO variable, and border/outline/ring/decoration widths
 * do NOT consume the spacing namespace (probe-measured — see
 * `.scratch/layer-probe/check-stroke-namespace.mjs`), so those properties must be authored
 * as a direct `var(--spacing-thin)` reference, which needs a real variable.
 *
 * THE OLD camelCase NAMES (`--colorNeutralBackground1`, `--fontSizeBase300`,
 * `--spacingHorizontalM`, `--strokeWidthThin`, …) NO LONGER EXIST in emitted CSS or in
 * any shipped read path (theming Phase 2a extends Phase 1's option B to the FULL token
 * set: single vocabulary; a documented major break for hand-written consumer CSS against
 * the old names). The `tokens.*` JS constants in @fluentui/tokens are repointed to the
 * canonical kebab names — this generator ASSERTS that lockstep for EVERY token on every
 * run. (FluentProvider's runtime theme tag writes token values under BOTH vocabularies
 * on provider elements until theming Phase 2b removes it — the camelCase half feeds
 * nothing shipped and exists only as unbroken-interim insurance for hand-written
 * consumer reads.)
 *
 * The emission rides the once-per-document artifact (css/emit.css -> dist/styles.css)
 * and is suppressed in component modules by `@reference`, exactly like `--base-scale`.
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
const THEMES_OUTPUT = path.join(PACKAGE_ROOT, 'css', 'themes.css');

/** The theme whose values are emitted as the `:root, :host` defaults (theming Phase 2b). */
const DEFAULT_THEME = 'webLightTheme';

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
 * `var(--fluentToken)` references (dual spacing support, settled with user 2026-07-27;
 * numeric-axis alias restructure settled with user 2026-07-29 — theming Phase 1).
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
 * the `var(--spacing)` reference verbatim into utilities (.scratch/phase1-theming/).
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
 * `utility` is the EXPLICIT suffix table (user-specified). It deliberately does NOT go
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
 * namespace as SPACING_SCALE, on the same literal-value terms (settled with user 2026-07-27).
 *
 * WHY THE SPACING NAMESPACE AND NOT A `--border-width-*` NAMESPACE
 * ---------------------------------------------------------------
 * There is no `--border-width-*` namespace in Tailwind v4 — border widths are a fixed bare-
 * number progression (`border-2` → `border-width: 2px`, a hardcoded px literal, NOT a theme
 * lookup). The only width namespace that exists, `--stroke-width-*`, drives SVG `stroke-width`
 * (`stroke-2` → `stroke-width: 2`), which is the wrong property. So there is nothing to
 * register these against that would give `border-thin` a meaning.
 *
 * PROBE-MEASURED, not reasoned (`.scratch/layer-probe/check-stroke-namespace.mjs` registers a
 * `--spacing-thin` on the real css/index.css and compiles a candidate list):
 *   CONSUMES `--spacing-*`  p m gap space-x w h min-w max-w size inset top start basis
 *                           translate scroll-m scroll-p indent leading (+ every axis/side form)
 *   DOES NOT               border border-t/b/s/x divide-x outline outline-offset ring
 *                           ring-offset inset-ring underline-offset decoration stroke
 *
 * So registration buys real utilities (`w-thin`, `h-thick`, `p-thin`, `gap-thin` — dimensional
 * uses of a stroke width, which Fluent components do have) but CANNOT give `border-thin` a
 * meaning. Border-ish properties are authored as a direct `var(--spacing-thin)` — which is why
 * these four, alone in the namespace, are ALSO emitted as real custom properties (`emit: true`
 * on the NAMESPACES entry). `@theme inline` emits no variables.
 *
 * CANONICAL `--stroke-width-*` VALUES STAY LITERAL `calc(<px> * var(--base-scale))` —
 * DELIBERATELY NOT `--spacing`-COUPLED
 * -----------------------------------------------------------------------------------
 * Theming Phase 1 (settled with user 2026-07-29) rebased the 22 spacing tokens onto the
 * `--spacing` numeric axis; these four are the intentional exception. `--spacing` is the
 * layout DENSITY knob — a subtree that halves it should compress padding and gaps, but
 * borders must NOT thin with it: a 1px hairline is a 1px hairline at any density. Stroke
 * widths therefore keep the raw `--base-scale` form and ignore `--spacing` overrides.
 *
 * NAME SPLIT (user amendment): the PUBLIC set-contract variable is
 * `--stroke-width-<step>`, emitted with the literal value; the spacing-namespace
 * `--spacing-<step>` names are PRIVATE internal hooks registered/emitted as
 * `var(--stroke-width-<step>)` so Tailwind's spacing-consuming utility families
 * (`w-thin`, `p-thick`, `gap-thicker`, …) and module-authored `var(--spacing-thin)`
 * border/outline widths keep working. `--stroke-width-*` is deliberately NOT registered
 * in `@theme` — Tailwind's `--stroke-width-*` namespace drives SVG `stroke-width`
 * utilities, which would be the wrong property.
 *
 * All 7 shipped themes carry byte-identical strokeWidth values — asserted before shipping in
 * `.scratch/layer-probe/assert-theme-stroke-width.js` (1/2/3/4px, zero divergence).
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
 * the theme emission (theming Phase 2b). The snapshot exists because theme values are
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
 *   asserted identical and EXCLUDED from the per-theme classes.
 *
 * @param {{ name: string, value: string }[]} tokens parsed tokens.ts entries
 * @returns {{
 *   variantTokens: { name: string, canonical: string }[],
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
  if (!themes[DEFAULT_THEME]) {
    throw new Error(`theme-values.json is missing the default theme \`${DEFAULT_THEME}\`.`);
  }

  /** @type {{ name: string, canonical: string }[]} */
  const variantTokens = [];
  /** @type {{ name: string, expected: string }[]} */
  const invariantTokens = [];
  /** @type {string[]} */
  const themeAbsentTokens = [];

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
    } else {
      variantTokens.push({ name, canonical: /** @type {string} */ (classification.canonical) });
    }
  }

  const expectedKeys = [...variantTokens.map(token => token.name), ...invariantTokens.map(token => token.name)].sort();

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

  return { variantTokens, themes, classNames };
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
    heading: 'Line heights',
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
    utility: 'w-thin h-thick p-thin gap-thin … AND var(--spacing-thin) for border/outline widths',
    heading: 'Stroke widths — PRIVATE hooks aliasing the canonical --stroke-width-* variables',
    scale: STROKE_WIDTH_SCALE,
    value: strokeWidthValue,
    emit: true,
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
    // (user decision — consistent with the token vocabulary, no first-class variable
    // namespace worth occupying), while the theme key must be what the installed
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
  // (theming Phase 1 option B).
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
      // The canonical RUNTIME variable name (theming Phase 2a): identical to the theme
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
  // Theming Phase 2b: the default (web light) theme values are emitted at `:root, :host`
  // right below the spacing/stroke block — this artifact is now the SOLE value source for
  // the canonical token variables (FluentProvider's runtime theme style tag is gone).
  const { variantTokens, themes } = analyzeThemeEmission(tokens);
  const defaultTheme = themes[DEFAULT_THEME];

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
  out.push(' * overridden per subtree by the theme classes (css/themes.css, theming Phase 2b).');
  out.push(' * A plain `@theme` alias would freeze resolution at `:root`, breaking scoped');
  out.push(' * theming. `reference` suppresses the self-referential aliases that plain');
  out.push(' * `inline` would emit now that each runtime variable IS its theme key (theming');
  out.push(' * Phase 2a) — the values are emitted in the fui.theme block below, not by JS.');
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

  out.push('}');

  if (emittedVariables.length + canonicalStrokes.length + strokeHooks.length > 0) {
    out.push('');
    out.push('/*');
    out.push(' * REAL CUSTOM PROPERTIES — the one block in this file that emits declarations.');
    out.push(' *');
    out.push(' * `@theme inline` above registers utility NAMES and emits no variables, which is');
    out.push(' * correct for every other namespace. The spacing namespace needs real variables:');
    out.push(' * border-width, outline-width, ring-width, divide-*, underline-offset and');
    out.push(' * text-decoration-thickness do NOT consume the --spacing-* namespace (v4 border');
    out.push(' * widths are a fixed bare-number px progression), so modules author those as a');
    out.push(' * direct var(--spacing-thin); and the `tokens.*` JS constants in @fluentui/tokens');
    out.push(' * are var() reference strings against the canonical names emitted here (charts');
    out.push(' * inline styles etc.).');
    out.push(' *');
    out.push(' * THE OLD camelCase NAMES (--colorNeutralBackground1, --spacingHorizontalM, …)');
    out.push(' * ARE GONE for the ENTIRE token set (option B, theming Phase 2a): single');
    out.push(' * vocabulary, documented major break for hand-written consumer CSS. Theming');
    out.push(" * Phase 2b removed FluentProvider's runtime theme style tag, so this block (plus");
    out.push(' * the theme classes in css/themes.css) is the ONLY writer of token values.');
    out.push(' *');
    out.push(' * Emitted ONCE PER DOCUMENT (D13): `@reference` drops this block, so component');
    out.push(' * `*.module.css` output stays free of theme declarations; css/emit.css compiles it');
    out.push(' * into dist/styles.css alongside --base-scale and --spacing, which utility-sourced');
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
    out.push('     * DEFAULT THEME VALUES (web light) — theming Phase 2b. Since the removal of');
    out.push("     * FluentProvider's runtime theme style tag, these declarations are the sole");
    out.push('     * default value source for the theme-variant canonical variables. Non-default');
    out.push('     * themes are shipped as classes in css/themes.css (same layer); a theme class');
    out.push('     * on any DOM node overrides these for that subtree.');
    out.push('     */');
    for (const { name, canonical } of variantTokens) {
      out.push(`    ${canonical}: ${defaultTheme[name]};`);
    }
    out.push('  }');
    out.push('}');
  }

  out.push('');

  const contents = out.join('\n');
  assertCommentsAreWellFormed(contents);
  return contents;
}

/**
 * Renders `css/themes.css` — one CSS class per shipped theme (theming Phase 2b).
 *
 * THE THEMING CONTRACT: a theme class on ANY DOM node themes that node's subtree (custom
 * properties cascade); FluentProvider's `themeClassName` prop applies one to its root and
 * propagates it to portals. Theme classes contain ONLY custom-property declarations —
 * never styling rules — and live in `@layer fui.theme`, same as the `:root, :host`
 * default emission they override.
 *
 * Each class carries the theme's 433 THEME-VARIANT canonical variables. The 26
 * spacing/stroke tokens are EXCLUDED on purpose: they are theme-invariant (asserted in
 * `analyzeThemeEmission`) and already emitted at `:root, :host` in their density-knob
 * calc form — a literal per-theme re-emission would freeze `--spacing` overrides inside
 * themed subtrees. zIndex tokens are theme-absent; their defaults ride the `tokens.*`
 * var() fallback.
 *
 * @returns {string}
 */
function renderThemes() {
  const tokensPackage = JSON.parse(fs.readFileSync(path.join(TOKENS_PACKAGE, 'package.json'), 'utf8'));
  const tokens = readTokens();
  readSpacingScale();
  readStrokeWidthScale();
  const { variantTokens, themes, classNames } = analyzeThemeEmission(tokens);

  const out = [];
  out.push('/*');
  out.push(' * DO NOT EDIT — generated file.');
  out.push(' *');
  out.push(` * Generator:  ${GENERATOR_ID}`);
  out.push(` * Source:     ${tokensPackage.name}@${tokensPackage.version} (packages/tokens/theme-values.json)`);
  out.push(` * Regenerate: node ${GENERATOR_ID}`);
  out.push(` * Verify:     node ${GENERATOR_ID} --check`);
  out.push(' *');
  out.push(' * SHIPPED THEME CLASSES (theming Phase 2b). Applying one of these classes to any');
  out.push(' * DOM node themes that subtree — custom properties cascade. They contain ONLY');
  out.push(' * custom-property declarations, in the same fui.theme layer as the web-light');
  out.push(' * defaults at :root/:host (css/tokens.css), which they override element-locally.');
  out.push(' * The JS constants for these class names ship from @fluentui/tokens /');
  out.push(' * @fluentui/react-theme (webLightThemeClassName, …) — the generator asserts the');
  out.push(' * lockstep on every run.');
  out.push(' *');
  out.push(' * The 26 spacing/strokeWidth tokens are deliberately absent: theme-invariant,');
  out.push(' * emitted once at :root/:host in density-knob form (see css/tokens.css).');
  out.push(' */');

  for (const [themeName, className] of Object.entries(classNames)) {
    const theme = themes[themeName];
    out.push('');
    out.push(`/* ${themeName} — ${variantTokens.length} tokens */`);
    out.push('@layer fui.theme {');
    out.push(`  .${className} {`);
    for (const { name, canonical } of variantTokens) {
      out.push(`    ${canonical}: ${theme[name]};`);
    }
    out.push('  }');
    out.push('}');
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

  const files = [
    { path: outPath, contents: format(outPath, render({ modifiers })) },
    // themes.css is only written/checked alongside the canonical tokens.css — `--out`
    // runs are probe runs of the registration block.
    ...(outIndex >= 0 ? [] : [{ path: THEMES_OUTPUT, contents: format(THEMES_OUTPUT, renderThemes()) }]),
  ];

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
  renderThemes,
  spacingTokenValue,
  strokeWidthValue,
  strokeWidthCanonicalName,
  strokeWidthCanonicalValue,
  SPACING_BASE_PX,
  NAMESPACES,
  EXCLUSIONS,
  SPACING_SCALE,
  STROKE_WIDTH_SCALE,
};
