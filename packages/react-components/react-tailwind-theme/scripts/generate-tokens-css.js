// @ts-check
/**
 * Generates `css/tokens.css` — the `@theme inline` registration that gives every Fluent
 * design token a Tailwind utility name (`bg-neutral-background-1`, `text-base-300`,
 * `shadow-8`, `rounded-medium`, …).
 *
 * WHY `inline` IS MANDATORY
 * -------------------------
 * A naive `@theme { --color-x: var(--colorX) }` emits `--color-x: var(--colorX)` into
 * `:root` and compiles `bg-x` to `background-color: var(--color-x)`. The `var(--colorX)`
 * lookup then resolves ONCE, at `:root`, where Fluent tokens do not exist — FluentProvider
 * writes them on `.fui-FluentProviderN` elements. Every provider (and every nested
 * provider) would render the same frozen value. FORBIDDEN.
 *
 * `inline` substitutes the theme value into the utility itself, so `bg-x` compiles to
 * `background-color: var(--colorX)` and resolves per-element against the nearest
 * FluentProvider — nested themes keep working (DECISIONS.md D4's theming guarantee is
 * preserved; only the authoring surface changes).
 *
 * WHY NOT `@theme inline reference` (dead-alias suppression — measured, then rejected)
 * -----------------------------------------------------------------------------------
 * `inline` emits an alias custom property ONLY when some utility references it BY NAME
 * (`bg-(--color-neutral-background-1)`); a plain `bg-neutral-background-1` inlines the
 * value and needs no variable. Under the `source(none)` form the theme package mandates,
 * that never happens: probe-measured, the emitted `@layer fui.theme` block holds
 * `--base-scale` and `--spacing` and nothing else, with all registrations present — zero
 * of them reach the output. Byte-identical to the `reference` variant.
 *
 * `reference` was tried and rejected: it suppresses the alias even when a by-name
 * reference DOES exist, emitting `background-color: var(--color-neutral-background-1)`
 * against a variable nothing defines — silently broken CSS. `inline` self-heals instead.
 *
 * SPACING IS DIFFERENT — see SPACING_SCALE / STROKE_WIDTH_SCALE below. The 22
 * spacingHorizontal / spacingVertical tokens AND the 4 strokeWidth tokens register under
 * `--spacing-*` with LITERAL base-scale values, not var() references, so every named and
 * numeric spacing scale is one system. Everything else registers as a var() reference
 * exactly as described above.
 *
 * THE 4 STROKE-WIDTH ENTRIES ARE ALSO EMITTED AS REAL CUSTOM PROPERTIES (`emit: true`).
 * `@theme inline` registers a utility name but emits NO variable, and border/outline/ring/
 * decoration widths do NOT consume the spacing namespace (probe-measured — see
 * `.scratch/layer-probe/check-stroke-namespace.mjs`), so those properties must be authored as
 * a direct `var(--spacing-thin)` reference. A registration alone would leave that var
 * undefined. The emission rides the once-per-document artifact (css/emit.css -> dist/styles.css)
 * and is suppressed in component modules by `@reference`, exactly like `--base-scale`.
 *
 * Run:      node packages/react-components/react-tailwind-theme/scripts/generate-tokens-css.js
 * Verify:   node packages/react-components/react-tailwind-theme/scripts/generate-tokens-css.js --check
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
const DEFAULT_OUTPUT = path.join(PACKAGE_ROOT, 'css', 'tokens.css');

const GENERATOR_ID = 'packages/react-components/react-tailwind-theme/scripts/generate-tokens-css.js';

/** The `@theme` modifiers the emitted block carries. See the module header for why. */
const THEME_MODIFIERS = 'inline';

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
 * `var(--fluentToken)` references (dual spacing support, settled with user 2026-07-27).
 *
 * WHY LITERAL VALUES AND NOT `var(--spacingHorizontalM)`
 * -----------------------------------------------------
 * The numeric spacing utilities (`p-12`, `gap-8`) compute px→rem through `--base-scale`
 * (D4). Registering the semantic tokens as runtime `var()` references would create two
 * spacing systems that scale differently: `p-12` would follow the user's root font-size
 * while `p-horizontal-m` stayed frozen at the provider's literal px. Registering the
 * base-scale EQUIVALENT of each token's canonical px unifies them — `p-horizontal-m` and
 * `p-12` emit the same computed length, and both scale together.
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
 * Values are literal base-scale equivalents for the same reason spacing is: one scaling system.
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
 * The base-scale-equivalent CSS value for a spacing step. Zero stays a plain `0` — a
 * `calc(0px * …)` would be valid but noisy, and `0` is unitless-safe everywhere.
 *
 * @param {number} px
 * @returns {string}
 */
function spacingValue(px) {
  return px === 0 ? '0' : `calc(${px}px * var(--base-scale))`;
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
    heading: 'Horizontal spacing, inline axis — base-scale VALUES, not token refs',
    scale: SPACING_SCALE,
  },
  {
    prefix: 'spacingVertical',
    namespace: 'spacing-vertical',
    utility: 'py-* pt-* pb-* my-* gap-y-* …',
    heading: 'Vertical spacing, block axis — base-scale VALUES, not token refs',
    scale: SPACING_SCALE,
  },
  {
    prefix: 'strokeWidth',
    namespace: 'spacing',
    utility: 'w-thin h-thick p-thin gap-thin … AND var(--spacing-thin) for border/outline widths',
    heading: 'Stroke widths — base-scale VALUES, and the ONLY entries also EMITTED as variables',
    scale: STROKE_WIDTH_SCALE,
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
  for (const { name, value } of tokens) {
    if (!/^var\(--[A-Za-z][A-Za-z0-9_]*(?:, ?[^)]+)?\)$/.test(value)) {
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
        value: spacingValue(step.px),
      };
    }

    return { kind: 'register', group, themeKey: `--${group.namespace}-${kebabCase(remainder)}` };
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

  /** @type {Map<string, { group: typeof NAMESPACES[number], lines: string[] }>} */
  const sections = new Map();
  /** Keys that must ALSO be emitted as real custom properties. @type {string[]} */
  const emittedVariables = [];
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

    const resolved = classification.value === undefined ? value : classification.value;
    const section = sections.get(group.prefix) || { group, lines: [] };
    section.lines.push(`  ${themeKey}: ${resolved};`);
    sections.set(group.prefix, section);

    if (group.emit) {
      emittedVariables.push(`    ${themeKey}: ${resolved};`);
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
  out.push(' * `inline` is MANDATORY: it substitutes var(--fluentToken) into each utility, so');
  out.push(' * values resolve per-element against the nearest FluentProvider. A plain `@theme`');
  out.push(' * alias would freeze resolution at `:root`, where Fluent tokens do not exist.');
  out.push(' *');
  out.push(' * SPACING IS THE ONE EXCEPTION: --spacing-horizontal-* / --spacing-vertical-* and the');
  out.push(' * 4 --spacing-thin/thick/thicker/thickest carry the base-scale EQUIVALENT of each');
  out.push(" * token's canonical px, NOT var(--spacingHorizontalM) / var(--strokeWidthThin). Named");
  out.push(' * and numeric spacing are then ONE scaling system (p-horizontal-m === p-12). Provider');
  out.push(' * overrides do not reach these; all 7 shipped themes carry identical values.');
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

  if (emittedVariables.length > 0) {
    out.push('');
    out.push('/*');
    out.push(' * REAL CUSTOM PROPERTIES — the one block in this file that emits declarations.');
    out.push(' *');
    out.push(' * `@theme inline` above registers utility NAMES and emits no variables, which is');
    out.push(' * correct for every other namespace. These four are different: border-width,');
    out.push(' * outline-width, ring-width, divide-*, underline-offset and text-decoration-thickness');
    out.push(' * do NOT consume the --spacing-* namespace (v4 border widths are a fixed bare-number');
    out.push(' * px progression), so modules author those properties as a direct var(--spacing-thin).');
    out.push(' * That reference needs a variable that actually exists.');
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
    out.push(...emittedVariables);
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

  const contents = render({ modifiers });

  if (check) {
    const existing = fs.existsSync(outPath) ? fs.readFileSync(outPath, 'utf8') : null;
    if (existing === null) {
      console.error(`[generate-tokens-css] MISSING: ${path.relative(REPO_ROOT, outPath)}`);
      console.error(`[generate-tokens-css] Run: node ${GENERATOR_ID}`);
      process.exitCode = 1;
      return;
    }
    if (existing.replace(/\r\n/g, '\n') !== contents) {
      console.error(`[generate-tokens-css] STALE: ${path.relative(REPO_ROOT, outPath)} differs from generator output.`);
      console.error(`[generate-tokens-css] Run: node ${GENERATOR_ID}`);
      process.exitCode = 1;
      return;
    }
    console.log(`[generate-tokens-css] OK: ${path.relative(REPO_ROOT, outPath)} is up to date.`);
    return;
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, contents);
  console.log(
    `[generate-tokens-css] wrote ${path.relative(REPO_ROOT, outPath)} (${Buffer.byteLength(contents)} bytes)`,
  );
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
  render,
  spacingValue,
  NAMESPACES,
  EXCLUSIONS,
  SPACING_SCALE,
  STROKE_WIDTH_SCALE,
};
