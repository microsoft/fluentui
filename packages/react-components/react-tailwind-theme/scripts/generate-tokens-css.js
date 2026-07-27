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
const DEFAULT_OUTPUT = path.join(PACKAGE_ROOT, 'css', 'tokens.css');

const GENERATOR_ID = 'packages/react-components/react-tailwind-theme/scripts/generate-tokens-css.js';

/** The `@theme` modifiers the emitted block carries. See the module header for why. */
const THEME_MODIFIERS = 'inline';

/**
 * camelCase → kebab-case, with digit runs and acronym runs as their own segments.
 *
 *   colorNeutralBackground1  → color-neutral-background-1
 *   spacingHorizontalXXS     → spacing-horizontal-xxs
 *   borderRadius2XLarge      → border-radius-2-x-large
 *   shadow2Brand             → shadow-2-brand
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
 * Prefixes deliberately NOT registered. The generated file carries only a one-line count
 * summary (it ships inside the theme's root artifact, so it stays small); the reasons live
 * here so the exclusion never has to be re-litigated from memory.
 */
const EXCLUSIONS = [
  {
    prefix: 'spacingHorizontal',
    reason:
      "Tailwind's `--spacing-*` namespace is axis-agnostic: registering it would create " +
      '`py-horizontal-m` alongside `px-horizontal-m` with no way to restrict either. ' +
      'It is also the namespace `--spacing-*: initial` in index.css deliberately empties so ' +
      'numeric utilities read px through --base-scale (D4). Author these as ' +
      '`px-(--spacingHorizontalM)` (probe-verified) or a literal var().',
  },
  {
    prefix: 'spacingVertical',
    reason: 'Same as spacingHorizontal — author as `py-(--spacingVerticalM)` or a literal var().',
  },
  {
    prefix: 'strokeWidth',
    reason:
      'No Tailwind namespace fits. Border widths are bare numbers in v4 (`border-2`) with no ' +
      '`--border-width-*` namespace, and the only width namespace that exists, `--stroke-width-*`, ' +
      "drives SVG `stroke-width` — the wrong property for Fluent's border-width tokens. " +
      'Author as `border-(length:--strokeWidthThin)` or a literal var().',
  },
];

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
 * @returns {{ kind: 'register', group: typeof NAMESPACES[number], themeKey: string } | { kind: 'exclude', prefix: string, reason: string }}
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

  /** @type {Map<string, { group: typeof NAMESPACES[number], lines: string[] }>} */
  const sections = new Map();
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

    const section = sections.get(group.prefix) || { group, lines: [] };
    section.lines.push(`  ${themeKey}: ${value};`);
    sections.set(group.prefix, section);
  }

  const registered = seenThemeKeys.size;
  const excludedCount = tokens.length - registered;

  const excludedSummary = [...excluded].map(([prefix, names]) => `${names.length}× ${prefix}*`).join(', ');

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
  out.push(
    ` * ${tokens.length} Fluent tokens: ${registered} registered, ${excludedCount} excluded (${excludedSummary}).`,
  );
  out.push(' *');
  out.push(' * `inline` is MANDATORY: it substitutes var(--fluentToken) into each utility, so');
  out.push(' * values resolve per-element against the nearest FluentProvider. A plain `@theme`');
  out.push(' * alias would freeze resolution at `:root`, where Fluent tokens do not exist.');
  out.push(' *');
  out.push(' * ORDER MATTERS: index.css imports this AFTER its `@theme static` block, whose');
  out.push(' * `--color-*: initial` (and friends) clear whatever is registered before them.');
  out.push(' *');
  out.push(' * Rationale, namespace mapping, exclusion reasons: see the generator source.');
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

module.exports = { kebabCase, classify, readTokens, render, NAMESPACES, EXCLUSIONS };
