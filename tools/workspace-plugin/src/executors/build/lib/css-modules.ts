/**
 * Package-build CSS emission for Tailwind-flavoured CSS Modules.
 *
 * The source of truth is `src/**\/*.module.css`; the PACKAGE BUILD compiles it so that
 * consumers never run Tailwind and never see CSS-Modules syntax.
 *
 * Per package that owns at least one `*.module.css` this emits:
 *
 *  1. `dist/base.css` — the ROOT stylesheet. The canonical `@layer` order statement plus the
 *     deduplicated `@property` registrations Tailwind emits per module (422 blocks collapse to
 *     32 distinct on windmod). Consumers import it once per document, head-of-document, either
 *     directly or at the top of their own root stylesheet. It is the runtime counterpart of the
 *     authoring-time `@reference '#theme'`.
 *
 *  2. `dist/css/<source path>.css` — one chunk per `*.module.css`, carrying that component's
 *     rules and its own `@keyframes` (all `fuicm-`-hashed, so module-owned). A chunk declares
 *     layer BLOCKS only; the layer ORDER statement is the root sheet's exclusively, and the root
 *     sheet must reach the document first — see {@link writeComponentChunks}.
 *
 *  3. `dist/styles.css` — the batteries-included aggregate: the root sheet followed by every
 *     chunk, assembled from those very pieces so the two delivery modes cannot drift. Retained
 *     as the public `"./styles.css"` for zero-config, SSR and CommonJS consumers.
 *
 *     None of the three carry theme emission: the theme (`--base-scale`, `--spacing`, the token
 *     families, the resets) is a standalone artifact of the theme package, imported once per
 *     document and NEVER embedded per package (D13). Modules only `@reference '#theme'`, which
 *     emits nothing, so the compiled rules merely *reference* those custom properties
 *     (`calc(var(--spacing, calc(1px * var(--base-scale))) * 8)`).
 *
 *  4. A generated class-map JS module per `*.module.css`, written next to the compiled
 *     component code in every module output (`lib/`, `lib-commonjs/`, …) as
 *     `<Name>.module.css.js` — or `<Name>.module.css.cjs`, see below — plus a
 *     post-transform pass that repoints the emitted `'./<Name>.module.css'` specifiers
 *     (SWC emits them verbatim in both the ESM `import` and the CJS `require`) at it.
 *     Without this the shipped JS carries dangling imports of files that do not exist in
 *     the package.
 *
 * ── Class-map extension in a `"type": "module"` package (finding C) ─────────────────────
 * This pass runs AFTER the SWC leg, so for an ESM-first package (`isEsmPackage`) every
 * sibling file in the commonjs output has already been renamed `.js` → `.cjs` by
 * {@link 'file://./cjs-extension.ts'}. The class map has to follow, for two reasons:
 *
 *  1. Its body is CommonJS text. Left at `.js` inside a `"type": "module"` package, node
 *     parses it as ESM and throws `ReferenceError: exports is not defined` — not always,
 *     but whenever the require order reaches it through a path that does not get absorbed
 *     by the CJS/ESM interop, which makes it a latent crash rather than a build error.
 *  2. `rewriteCssModuleSpecifiers` has to see those files at all. It globs the output for
 *     the module extensions in play; a commonjs output whose files are all `.cjs` would
 *     otherwise be skipped wholesale, leaving `require('./X.module.css')` extensionless
 *     and resolving only by node's legacy extension search — straight onto the `.js`
 *     class map that defect 1 makes unloadable.
 *
 * Packages that are NOT `"type": "module"` keep `.js` on both sides: their commonjs output
 * is never renamed, `.js` is already CommonJS there, and their build output is byte-identical.
 *
 * ── Stylesheet auto-loading (D1) ────────────────────────────────────────────────────
 * The side-effect `import '<…>/dist/css/<component>.css'` is emitted into the ESM class map ONLY,
 * and points at that component's OWN chunk.
 *
 *  - Bundler consumers resolve `@fluentui/<pkg>` through `exports.import` / the `module`
 *    field → `lib/` → they import the class map → they get that component's chunk
 *    automatically, and nothing else.
 *    `"sideEffects": ["**\/*.css"]` keeps that import from being tree-shaken (without the
 *    allowlist the import is dropped and the component renders unstyled).
 *  - `require()` in plain node resolves through `exports.node` / `exports.require` →
 *    `lib-commonjs/` → a class map with NO stylesheet require, because node cannot load a
 *    raw `.css` file and would throw `SyntaxError: Unexpected token '.'`. SSR consumers
 *    therefore ship the stylesheet themselves via `<link>` / a bundled client entry,
 *    reading it from the `"./styles.css"` export subpath.
 *
 * Non-ESM outputs other than commonjs (`lib-amd`, tag `ships-amd`) get the commonjs shape
 * and a warning: no converted package ships AMD today.
 */

import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';

import { logger, readJsonFile } from '@nx/devkit';
import { globSync } from 'fast-glob';
import postcss, { type AcceptedPlugin } from 'postcss';
import postcssModules from 'postcss-modules';

/**
 * `@tailwindcss/postcss` ships its types only as `.d.mts`, which this package's
 * `moduleResolution: 'node'` cannot resolve, so it is required rather than imported. It is a
 * plugin CREATOR: it has to be invoked to produce the PostCSS plugin — handing PostCSS the
 * uninvoked creator fails cryptically (the same trap the VR storybook's postcss-loader
 * config documents, apps/vr-tests-react-components/.storybook/main.js).
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindcss: () => AcceptedPlugin = require('@tailwindcss/postcss');

/**
 * Shared with the VR storybook's css-loader and with jest — see that file's header. It is
 * required by RELATIVE PATH rather than imported: it lives outside this project's `rootDir`
 * (it has to, so `apps/` and `scripts/` can reach it too) and this package declares no
 * dependency on any `scripts/*` workspace. Nx loads this executor from source, so `__dirname`
 * is this directory and the traversal is stable.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cssModulesIdent: {
  GENERATED_CLASS_PREFIX: string;
  createGenerateScopedName: (args: { packageName: string; relativePath: string }) => (localName: string) => string;
  withCamelCaseAliases: (classMap: Record<string, string>) => Record<string, string>;
} = require('../../../../../../scripts/css-modules/ident.js');

/**
 * `:global()`-wraps Tailwind's `group/…` / `peer/…` markers so CSS Modules cannot hash them.
 * BLOCKING prerequisite for named groups — see that file's header.
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const globalizeGroupMarkers: (options?: {
  onRewrite?: (info: { from: string; to: string; count: number }) => void;
}) => AcceptedPlugin = require('../../../../../../scripts/css-modules/globalize-group-markers.js');

import { type NormalizedOptions } from './shared';

/**
 * The `fui.*` layer family, byte-identical to the statement in
 * `packages/react-components/react-tailwind-theme-preview/css/index.css` (the spec's
 * cross-package drift guard enforces it). Component modules declare layer BLOCKS only; this is
 * the one order statement a component package emits.
 */
export const CANONICAL_LAYER_STATEMENT =
  '@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;';

const CSS_MODULE_GLOB = '**/*.module.css';

/**
 * The batteries-included aggregate: every chunk concatenated after the root sheet. Retained as
 * the zero-config entry (`"./styles.css"`) for SSR/CJS consumers and for anyone who would rather
 * ship one file than let the bundler collect chunks. Per-component delivery is now the default
 * for bundler consumers — see {@link CHUNK_DIRECTORY} — so this file is no longer what the ESM
 * class maps import.
 */
const STYLESHEET_RELATIVE_PATH = 'dist/styles.css';

/**
 * The ROOT stylesheet: the `@layer` order statement plus the deduplicated `@property`
 * registrations lifted out of every component chunk. Imported once per document, head-of-document
 * (directly, or transitively through the consumer's own root sheet — both modes are documented in
 * the package's MIGRATION.md). It is the runtime counterpart of the authoring-time
 * `@reference '#theme'`.
 *
 * Plain CSS with no Tailwind and no CSS-Modules syntax, so it works identically as a bundler
 * import, a `<link href>`, or a raw CSS `@import` target.
 */
const ROOT_STYLESHEET_RELATIVE_PATH = 'dist/base.css';

/**
 * Per-component chunks, mirroring the source-relative path
 * (`dist/css/components/Button/Button.css`). The ESM class map side-effect-imports ITS OWN chunk,
 * so a consumer downloads exactly the components it uses.
 *
 * `dist/` rather than `lib/`: `dist/` already owns the aggregate, so every CSS artifact stays in
 * one place, and a `.css` sitting beside `Button.module.css.js` would share a namespace with the
 * specifier-rewrite pass ({@link rewriteCssModuleSpecifiers}) for no benefit.
 */
const CHUNK_DIRECTORY = 'dist/css';

/**
 * Re-exported for tests and for the `dist/styles.css` probe; the value itself is owned by
 * scripts/css-modules/ident.js, which every pipeline shares.
 */
export const GENERATED_CLASS_PREFIX = cssModulesIdent.GENERATED_CLASS_PREFIX;

/**
 * Provenance marker written into every generated `dist/styles.css` banner and the ONLY thing
 * that authorises `removeOrphanedStylesheet()` to delete that path.
 *
 * `dist/styles.css` is not exclusively ours: `react-storybook-addon-export-to-sandbox` ships a
 * hand-authored `src/styles.css` copied there by the build's `assets` config, declares it in
 * `exports["./styles.css"]`, `files` and `sideEffects`, and owns zero `*.module.css` — so it
 * takes the orphan-cleanup path on every single build. Keying deletion on this sentinel instead
 * of on the filename is what keeps that package's stylesheet (and any future authored one)
 * intact. Shared between the writer and the remover so the two cannot drift apart.
 */
const GENERATED_STYLESHEET_SENTINEL = 'Generated by @fluentui/workspace-plugin:build';

/**
 * A relative specifier ending in `.module.css`. Deliberately anchored on the quotes so it
 * cannot match an already-rewritten `'./X.module.css.js'`, which makes the pass idempotent,
 * and cannot match a bare package specifier (`@fluentui/x/y.module.css`) — cross-package
 * CSS-module imports are not a supported shape.
 */
const CSS_MODULE_SPECIFIER = /(['"])(\.{1,2}\/[^'"\n]*?\.module\.css)\1/g;

interface CompiledCssModule {
  /** Source-root-relative POSIX path, e.g. `components/Divider/Divider.module.css`. */
  relativePath: string;
  /** Compiled, scoped, plain CSS. */
  css: string;
  /** `{ root: 'fuicm-divider-root-a3f2c1', … }` */
  classMap: Record<string, string>;
}

/** A compiled module after its globally-scoped `@property` registrations have been lifted out. */
/**
 * `css` is deliberately dropped rather than carried alongside `chunkCss`.
 *
 * Both are "the module's CSS", but only `chunkCss` has had the `@property` registrations lifted
 * out. Keeping the pre-split text in scope means one mistyped identifier in the chunk writer or
 * the aggregate assembler silently restores all 30 KB of duplication, with every test still green
 * — the split is invisible to anything that checks rules rather than bytes. Omitting the field
 * turns that mistake into a compile error.
 */
interface SplitCssModule extends Omit<CompiledCssModule, 'css'> {
  /** The module's own rules — everything except the hoisted `@property` blocks. */
  chunkCss: string;
  /** `'--tw-border-style'` → the full `@property` block text, for the root sheet. */
  properties: Map<string, string>;
}

/**
 * No-ops for every package that owns no `*.module.css` — which is all of them but three
 * today. Unconverted packages pay one glob and their build output is byte-identical.
 */
export async function compileCssModules(normalizedOptions: NormalizedOptions): Promise<boolean> {
  const sourceFiles = globSync(CSS_MODULE_GLOB, { cwd: normalizedOptions.absoluteSourceRoot }).sort();

  if (sourceFiles.length === 0) {
    await removeOrphanedStylesheet(normalizedOptions);
    return true;
  }

  logger.log(`🎨 Compiling CSS Modules: ${sourceFiles.length} files`);

  const packageName = readPackageName(normalizedOptions);
  const compiled: SplitCssModule[] = [];

  for (const fileName of sourceFiles) {
    compiled.push(splitCssModule(await compileOne(fileName, packageName, normalizedOptions)));
  }

  const rootStylesheet = renderRootStylesheet(compiled, packageName);

  await writeRootStylesheet(rootStylesheet, normalizedOptions);
  await writeComponentChunks(compiled, packageName, normalizedOptions);
  await writeAggregatedStylesheet(rootStylesheet, compiled, packageName, normalizedOptions);
  await writeClassMaps(compiled, normalizedOptions);

  return true;
}

// ===========

/**
 * Deletes an orphaned `dist/styles.css` left behind after a package's last `*.module.css` is
 * removed (or renamed).
 *
 * `cleanOutput` deliberately does not clear `dist/` — api-extractor owns that directory — and
 * nx's `{projectRoot}/dist` output entry only makes CACHE RESTORES correct. A local incremental
 * build therefore used to keep publishing a stale stylesheet forever: the package no longer
 * emits any class map, so nothing imports the file, yet `package.json`'s `"./styles.css"` export
 * still resolves and consumers would load dead rules for components that had moved on.
 *
 * Deletion requires BOTH conditions, because this path is reached on every build of every
 * package that owns no CSS Modules — i.e. most of the repo:
 *
 *  1. the file exists, and
 *  2. it carries `GENERATED_STYLESHEET_SENTINEL`, proving a previous run of THIS executor wrote
 *     it. Without check 2 the pass would delete `react-storybook-addon-export-to-sandbox`'s
 *     hand-authored, `exports`-declared stylesheet on every build (see the sentinel's docs).
 *
 * Scoped to exactly that one file — never the directory — so api-extractor's `dist/*.d.ts` and
 * everything else under `dist/` is untouched.
 */
async function removeOrphanedStylesheet(normalizedOptions: NormalizedOptions): Promise<void> {
  for (const relativePath of [STYLESHEET_RELATIVE_PATH, ROOT_STYLESHEET_RELATIVE_PATH]) {
    const stylesheetPath = join(normalizedOptions.absoluteProjectRoot, relativePath);

    if (!existsSync(stylesheetPath)) {
      continue;
    }

    const existing = await readFile(stylesheetPath, 'utf8');

    if (!existing.includes(GENERATED_STYLESHEET_SENTINEL)) {
      // Authored or copied by some other build step — not ours to delete.
      continue;
    }

    await rm(stylesheetPath, { force: true });
    logger.log(`🎨 Removed orphaned ${relativePath} (package owns no *.module.css)`);
  }

  // A package that drops its last `*.module.css` would otherwise keep publishing dead chunks.
  if (await removeChunkDirectory(normalizedOptions)) {
    logger.log(`🎨 Removed orphaned ${CHUNK_DIRECTORY} (package owns no *.module.css)`);
  }
}

/**
 * Recursively deletes `<projectRoot>/dist/css`, but only once it has proven the directory is ours.
 *
 * This is the executor's only recursive delete, and it runs on EVERY build of EVERY package in the
 * repo — including the orphan path, which every package without CSS Modules takes. The two
 * stylesheets beside it are protected by {@link GENERATED_STYLESHEET_SENTINEL}; this applies the
 * same discipline to a directory, plus a path check, so a malformed `absoluteProjectRoot` cannot
 * turn it into a recursive delete somewhere unexpected.
 *
 * Refuses (loudly, without deleting) when:
 *  - the resolved path is not exactly `<projectRoot>/dist/css` — i.e. path traversal or an
 *    unexpected project root;
 *  - the project root is not an absolute path;
 *  - any file underneath is not a `.css` file carrying our provenance sentinel — meaning something
 *    other than this executor put it there.
 *
 * @returns whether anything was deleted.
 */
async function removeChunkDirectory(normalizedOptions: NormalizedOptions): Promise<boolean> {
  const projectRoot = normalizedOptions.absoluteProjectRoot;
  const chunkRoot = join(projectRoot, CHUNK_DIRECTORY);

  if (!existsSync(chunkRoot)) {
    return false;
  }

  // `resolve` collapses any `..`; the result must still sit exactly where we intend to delete.
  if (!isAbsolute(projectRoot) || resolve(chunkRoot) !== resolve(projectRoot, CHUNK_DIRECTORY)) {
    logger.warn(`Refusing to remove ${chunkRoot}: it does not resolve inside the project's own ${CHUNK_DIRECTORY}.`);
    return false;
  }

  const contents = globSync('**/*', { cwd: chunkRoot, onlyFiles: true });
  const foreign: string[] = [];

  for (const fileName of contents) {
    if (!fileName.endsWith('.css')) {
      foreign.push(fileName);
      continue;
    }

    const body = await readFile(join(chunkRoot, fileName), 'utf8');

    if (!body.includes(GENERATED_STYLESHEET_SENTINEL)) {
      foreign.push(fileName);
    }
  }

  if (foreign.length > 0) {
    logger.warn(
      `Refusing to remove ${chunkRoot}: ${foreign.length} file(s) were not generated by this executor ` +
        `(e.g. ${foreign.slice(0, 3).join(', ')}). Delete them by hand if that directory is genuinely stale.`,
    );
    return false;
  }

  await rm(chunkRoot, { recursive: true, force: true });
  return true;
}

function readPackageName(normalizedOptions: NormalizedOptions): string {
  const packageJson = readJsonFile<{ name?: string }>(join(normalizedOptions.absoluteProjectRoot, 'package.json'));
  return packageJson.name ?? normalizedOptions.project.root;
}

function toPosix(value: string): string {
  return value.split(sep).join('/');
}

/**
 * Deterministic, workspace-unique generated class name. Both halves of the scheme — the
 * readable `<component>-<local>` display text and the 6-hex-char digest over
 * `<package> <source-relative path> <local>` — live in scripts/css-modules/ident.js, which
 * the VR storybook and jest share. See that file for why the digest seeds on the NAME and
 * not on the CSS bytes.
 */
function createScopedNameGenerator(packageName: string, relativePath: string) {
  return cssModulesIdent.createGenerateScopedName({ packageName, relativePath });
}

async function compileOne(
  fileName: string,
  packageName: string,
  normalizedOptions: NormalizedOptions,
): Promise<CompiledCssModule> {
  const relativePath = toPosix(fileName);
  const absolutePath = join(normalizedOptions.absoluteSourceRoot, fileName);
  const source = (await readFile(absolutePath)).toString();

  return compileCssModuleSource({ source, absolutePath, packageName, relativePath });
}

/**
 * The PostCSS chain itself, separated from disk access so the guardrail test
 * ({@link 'file://./css-modules.spec.ts'}) exercises the real plugin order rather than a
 * copy of it. A copy is exactly what would rot: the failure this guards against is silent.
 */
export async function compileCssModuleSource({
  source,
  absolutePath,
  packageName,
  relativePath,
}: {
  source: string;
  absolutePath: string;
  packageName: string;
  relativePath: string;
}): Promise<CompiledCssModule> {
  let classMap: Record<string, string> = {};
  let globalizedMarkers = 0;
  const generateScopedName = createScopedNameGenerator(packageName, relativePath);

  const result = await postcss([
    // `@tailwindcss/postcss` is a plugin CREATOR — it must be invoked (same trap the VR
    // storybook documents for postcss-loader). It resolves `@reference '#theme'` through the
    // package's `imports` field; `@reference` emits nothing, so no theme CSS lands here.
    tailwindcss(),
    // ORDER IS LOAD-BEARING and this is the only position that works: Tailwind has to have
    // emitted `.group\/fui-switch` before it can be rewritten, and postcssModules has to see
    // the `:global()` wrapper before it scopes. Drop this plugin and every named-group rule
    // compiles to a selector the DOM never matches — with no error.
    globalizeGroupMarkers({
      onRewrite: ({ count }) => {
        globalizedMarkers += count;
      },
    }),
    postcssModules({
      generateScopedName: (localName: string) => generateScopedName(localName),
      // Supplying `getJSON` also suppresses postcss-modules' default behaviour of writing a
      // `<file>.json` sidecar next to the SOURCE file.
      getJSON: (_fileName: string, json: Record<string, string>) => {
        classMap = json;
      },
    }),
  ]).process(source, { from: absolutePath, to: absolutePath, map: false });

  assertGroupMarkersSurvived(relativePath, classMap);

  if (globalizedMarkers > 0) {
    logger.verbose(`css-modules: kept ${globalizedMarkers} group/peer marker(s) global in ${relativePath}`);
  }

  return { relativePath, css: result.css, classMap };
}

/**
 * A `group/…` marker that reached CSS Modules unwrapped gets SCOPED, and the only visible
 * trace is that it appears as a key in the exported class map — postcss-modules ignores
 * anything inside `:global()`, so a correctly handled marker is absent from the map entirely.
 *
 * The failure is otherwise completely silent: the compiled selector is well-formed, nothing
 * warns, and VR passes because the rules simply never match. Fail the build instead.
 */
function assertGroupMarkersSurvived(relativePath: string, classMap: Record<string, string>): void {
  const leaked = Object.keys(classMap).filter(key => /^(?:group|peer)\\?\//.test(key));

  if (leaked.length > 0) {
    throw new Error(
      `${relativePath}: Tailwind group/peer markers were scoped by CSS Modules (${leaked.join(', ')}). ` +
        'The fui-globalize-group-markers PostCSS plugin must run between tailwindcss() and postcssModules() — ' +
        'see scripts/css-modules/globalize-group-markers.js.',
    );
  }
}

/**
 * Lifts a module's top-level `@property` registrations out of its chunk.
 *
 * Tailwind re-emits the same registrations into every module that uses the corresponding utility —
 * measured on windmod: 422 blocks for 32 distinct properties, 33,307 bytes where the distinct set
 * is 2,491. Re-registering an identical `@property` is legal and idempotent, so the duplication is
 * *correct*; it is simply 30,816 bytes that buy nothing once a mandatory root sheet exists.
 *
 * The registrations are document-global by definition — `@property` has no scoping — so hoisting
 * them changes nothing about how they apply. Registration is what gives `--tw-border-style` its
 * `initial-value`, so a chunk loaded WITHOUT the root sheet renders visibly broken borders and
 * shadows on every component: a loud, deterministic failure that the FluentProvider dev check
 * names outright, which is the trade this dedup accepts.
 *
 * `@keyframes` are deliberately NOT hoisted: every name is a `fuicm-`-hashed, module-owned ident
 * (`fuicm-spinner-tail-rotate-cfd226`), so they are component content, not shared content.
 */
function splitCssModule(module: CompiledCssModule): SplitCssModule {
  const root = postcss.parse(module.css);
  const properties = new Map<string, string>();

  root.walkAtRules('property', atRule => {
    // Only top-level registrations are global. A nested one (inside `@media`, say) is not
    // something Tailwind emits today, but leaving it in place is the safe reading.
    if (atRule.parent?.type !== 'root') {
      return;
    }

    properties.set(atRule.params, normalizeProperty(atRule));
    atRule.remove();
  });

  const { css: _preSplitCss, ...rest } = module;

  return { ...rest, chunkCss: root.toString().trim(), properties };
}

/**
 * Canonical text for an `@property` block: descriptors sorted by name, one per line.
 *
 * Tailwind emits the same registration with the descriptors in DIFFERENT ORDER depending on the
 * module — `Divider` gets `syntax / initial-value / inherits` while `DrawerFooter` gets
 * `syntax / inherits / initial-value`. Descriptor order carries no meaning, so those are the same
 * registration, but a byte comparison calls them different. Normalizing first is what lets
 * {@link renderRootStylesheet}'s divergence check mean "these registrations actually disagree"
 * rather than "Tailwind shuffled the lines".
 */
function normalizeProperty(atRule: import('postcss').AtRule): string {
  // `nodes` is optional on AtRule — a statement at-rule (`@layer a, b;`) has none. An `@property`
  // without descriptors is not something Tailwind emits, but an empty list is the correct reading.
  const descriptors = (atRule.nodes ?? [])
    .filter((node): node is import('postcss').Declaration => node.type === 'decl')
    .map(node => `  ${node.prop}: ${node.value};`)
    .sort();

  return `@property ${atRule.params} {\n${descriptors.join('\n')}\n}`;
}

/**
 * The root stylesheet: the canonical `@layer` order statement, then every distinct `@property`
 * registration collected across the package's modules.
 *
 * Deterministic output — properties are emitted in sorted order — so a rebuild with unchanged
 * sources is byte-identical and nx caching stays honest.
 */
function renderRootStylesheet(compiled: SplitCssModule[], packageName: string): string {
  const properties = new Map<string, string>();
  const origin = new Map<string, string>();

  for (const module of compiled) {
    for (const [name, text] of module.properties) {
      const seen = properties.get(name);

      // Dedup is only sound while every emission of a name is identical. Collapsing 422 blocks
      // into 32 would silently pick a winner otherwise, and a wrong `initial-value` on, say,
      // `--tw-border-style` is a whole-suite visual defect with no other symptom.
      //
      // BELT-ONLY, and known to be unreachable today: Tailwind emits these registrations itself
      // and already deduplicates them per module, so an authored conflicting `@property` never
      // survives to this point (verified by appending one to a module and rebuilding — Tailwind
      // discarded it and the output was byte-identical). Only a Tailwind version skew *within a
      // single build* could trigger this, which cannot currently happen. Kept because the cost is
      // one comparison and the failure it guards is silent and suite-wide; do NOT cite it as
      // proof that the emissions agree — it cannot fail today.
      if (seen !== undefined && seen !== text) {
        throw new Error(
          `${packageName}: conflicting @property ${name} registrations cannot be deduplicated into ` +
            `${ROOT_STYLESHEET_RELATIVE_PATH}.\n` +
            `  ${origin.get(name)} emits: ${seen.replace(/\s+/g, ' ')}\n` +
            `  ${module.relativePath} emits: ${text.replace(/\s+/g, ' ')}`,
        );
      }

      properties.set(name, text);
      origin.set(name, module.relativePath);
    }
  }

  const banner = [
    '/*',
    ` * ${packageName} — root stylesheet.`,
    ' *',
    ` * ${GENERATED_STYLESHEET_SENTINEL} from this package's "src" CSS Modules.`,
    ' *',
    ' * Import this ONCE per document, ahead of everything else — either directly, or by',
    ' * importing it at the top of your own root stylesheet. It carries the cascade-layer order',
    ' * statement and the global custom-property registrations that every component chunk',
    ' * assumes. Without it, layers resolve in first-use order and registered properties lose',
    ' * their initial values.',
    ' *',
    ' * It defines no tokens: those come from the theme package, which this does not replace.',
    ' */',
  ].join('\n');

  assertNoPrematureCommentEnd(banner);

  const registrations = [...properties.keys()].sort().map(name => properties.get(name));

  return `${CANONICAL_LAYER_STATEMENT}\n\n${banner}\n\n${registrations.join('\n')}\n`;
}

async function writeRootStylesheet(contents: string, normalizedOptions: NormalizedOptions): Promise<void> {
  const rootPath = join(normalizedOptions.absoluteProjectRoot, ROOT_STYLESHEET_RELATIVE_PATH);

  await mkdir(dirname(rootPath), { recursive: true });
  await writeFile(rootPath, contents);

  logger.log(`🎨 Emitted ${ROOT_STYLESHEET_RELATIVE_PATH} (${Buffer.byteLength(contents)} bytes)`);
}

/**
 * Per-component chunk path for a module: `dist/css/components/Button/Button.css`.
 *
 * The `.module` segment is dropped — these are plain compiled stylesheets, and keeping
 * `.module.css` in a shipped artifact name invites a consumer's bundler to apply CSS-Modules
 * handling to already-compiled output.
 */
function chunkRelativePath(module: Pick<CompiledCssModule, 'relativePath'>): string {
  return `${CHUNK_DIRECTORY}/${module.relativePath.replace(/\.module\.css$/, '.css')}`;
}

/**
 * One stylesheet per `*.module.css`, each carrying that component's rules and its own
 * `@keyframes`.
 *
 * ── Chunks carry NO `@layer` order statement (operator ruling 2026-08-28) ────────────────────
 * The campaign contract allows exactly one owner of the layer ORDER declaration, and for this
 * package that owner is the ROOT SHEET ({@link ROOT_STYLESHEET_RELATIVE_PATH}). A chunk declares
 * layer BLOCKS (`@layer fui.components.l1 { … }`) and nothing else.
 *
 * The consequence is real and is handled by contract rather than by armour: cascade layers are
 * established in FIRST-USE order, so a document that loads a component chunk BEFORE the root
 * sheet gets its layer family established by that chunk, and inter-component precedence inverts
 * (a `fui.components.l2` chunk arriving first sorts `l2` below `l1`, so ToggleButton loses
 * contested properties to Button). That is a violation of the documented head-of-document
 * contract, not a supported configuration. The handling is:
 *
 *   1. the contract itself — the root sheet is imported once, ahead of everything else, either
 *      directly or at the top of the consumer's own root stylesheet (both modes documented in
 *      the package's MIGRATION.md); and
 *   2. a development-mode check in `FluentProvider` that detects the missing order declaration
 *      and names precisely this mistake.
 */
async function writeComponentChunks(
  compiled: SplitCssModule[],
  packageName: string,
  normalizedOptions: NormalizedOptions,
): Promise<void> {
  // Chunks are named from source paths, so a deleted or renamed module would otherwise leave a
  // stale stylesheet behind that a consumer's older class map could still resolve. Same guarded
  // removal as the orphan path — it refuses rather than deleting anything it did not write.
  await removeChunkDirectory(normalizedOptions);

  let bytes = 0;

  for (const module of compiled) {
    const chunkPath = join(normalizedOptions.absoluteProjectRoot, chunkRelativePath(module));
    const banner = `/* ${packageName} — ${module.relativePath}. ${GENERATED_STYLESHEET_SENTINEL}. */`;

    // Same guard the other two banners get: this one interpolates a package name AND a source
    // path, and it leads all 131 files, so a stray `*/` in either would corrupt every chunk.
    assertNoPrematureCommentEnd(banner);

    const contents = `${banner}\n${module.chunkCss}\n`;

    await mkdir(dirname(chunkPath), { recursive: true });
    await writeFile(chunkPath, contents);
    bytes += Buffer.byteLength(contents);
  }

  logger.log(`🎨 Emitted ${compiled.length} component chunks under ${CHUNK_DIRECTORY} (${bytes} bytes)`);
}

/**
 * The aggregate, assembled from the very same pieces the split delivery ships — root sheet first,
 * then every chunk — so the two delivery modes cannot drift apart. It stays the public
 * `"./styles.css"` for zero-config, SSR and CommonJS consumers.
 */
async function writeAggregatedStylesheet(
  rootStylesheet: string,
  compiled: SplitCssModule[],
  packageName: string,
  normalizedOptions: NormalizedOptions,
): Promise<void> {
  const stylesheetPath = join(normalizedOptions.absoluteProjectRoot, STYLESHEET_RELATIVE_PATH);

  // CSS block comments do not nest and have no escape: the first `*/` ends them. A glob
  // like `src/<dirs>/<name>.module.css` written with an asterisk wildcard would close this
  // banner early and spill the remaining prose into the stylesheet as garbage rules
  // (esbuild's CSS parser reports it as `Expected identifier but found whitespace`).
  // Keep every asterisk out of the text below.
  const banner = [
    '/*',
    ` * ${packageName} — compiled component styles.`,
    ' *',
    ` * ${GENERATED_STYLESHEET_SENTINEL} from this package's "src" CSS Modules.`,
    ' * Plain CSS: no Tailwind syntax, no CSS-Modules syntax, no theme emission. Every custom',
    ' * property referenced below is DEFINED elsewhere — Fluent design tokens by',
    ' * FluentProvider at runtime, Tailwind theme variables by the shared theme stylesheet the',
    ' * document imports exactly once. This file declares none of them.',
    ' *',
    ' * Batteries included: the root stylesheet is inlined at the top, so importing this ALONE is',
    ' * a complete setup and the separate root import is not needed. Bundler consumers get the',
    ' * per-component chunks instead, automatically, through each component class map.',
    ' */',
  ].join('\n');

  // Assembled from the pieces the split delivery ships, so the two modes cannot drift apart.
  const body = compiled.map(module => `/* ${module.relativePath} */\n${module.chunkCss}`).join('\n\n');

  const contents = `${rootStylesheet}\n${banner}\n\n${body}\n`;

  assertNoPrematureCommentEnd(banner);

  await mkdir(dirname(stylesheetPath), { recursive: true });
  await writeFile(stylesheetPath, contents);

  logger.log(`🎨 Emitted ${STYLESHEET_RELATIVE_PATH} (${Buffer.byteLength(contents)} bytes)`);
}

/**
 * Guards the banner against the one way a comment can corrupt the stylesheet: a comment
 * terminator anywhere before the intended one. The package name is interpolated into the
 * banner, so this stays a runtime check rather than a review convention.
 */
function assertNoPrematureCommentEnd(banner: string): void {
  const terminator = banner.indexOf('*/');

  if (terminator !== banner.length - 2) {
    throw new Error(
      `Generated stylesheet banner closes its comment early (at index ${terminator}) — the rest would be parsed as CSS.\n` +
        `  ${banner.slice(0, 200)}`,
    );
  }
}

async function writeClassMaps(compiled: SplitCssModule[], normalizedOptions: NormalizedOptions): Promise<void> {
  for (const outputConfig of normalizedOptions.moduleOutput) {
    const outputRoot = join(normalizedOptions.absoluteProjectRoot, outputConfig.outputPath);
    const isEsm = outputConfig.module === 'es6';

    if (outputConfig.module === 'amd') {
      logger.warn(
        `CSS Modules + AMD output ('${outputConfig.outputPath}') is not supported: the class map is emitted in commonjs form and the stylesheet is not auto-loaded there.`,
      );
    }

    // `.cjs` for the commonjs output of a `"type": "module"` package, matching the rename
    // `cjs-extension.ts` already applied to every sibling file — see the module header.
    const extension = !isEsm && normalizedOptions.isEsmPackage ? 'cjs' : 'js';

    for (const module of compiled) {
      const classMapPath = join(outputRoot, `${module.relativePath}.${extension}`);
      // Its OWN chunk, not the aggregate: this is what makes the consumer download exactly the
      // components it uses.
      const chunkPath = join(normalizedOptions.absoluteProjectRoot, chunkRelativePath(module));
      const chunkSpecifier = toRelativeSpecifier(dirname(classMapPath), chunkPath);

      await mkdir(dirname(classMapPath), { recursive: true });
      await writeFile(
        classMapPath,
        isEsm ? renderEsmClassMap(module, chunkSpecifier) : renderCommonJsClassMap(module, outputConfig.outputPath),
      );
    }

    await rewriteCssModuleSpecifiers(outputRoot, extension);
  }
}

function toRelativeSpecifier(fromDir: string, toFile: string): string {
  const specifier = toPosix(relative(fromDir, toFile));
  return specifier.startsWith('.') ? specifier : `./${specifier}`;
}

/**
 * Serializes the shipped class map: every authored (kebab-case) key PLUS its camelCase alias,
 * both pointing at the same generated ident. Class names are authored kebab-case because that is
 * what the DOM shows; hooks read them as `styles.ringThicker`. The storybook's css-loader emits
 * the identical pair through `exportLocalsConvention: 'dashes'` — the shared helper in
 * scripts/css-modules/ident.js owns the one casing rule both pipelines use.
 *
 * Aliasing happens HERE and not in {@link compileCssModuleSource}, so
 * {@link assertGroupMarkersSurvived} still inspects the raw postcss-modules export.
 */
export function serializeClassMap(classMap: Record<string, string>): string {
  const aliased = cssModulesIdent.withCamelCaseAliases(classMap);
  const entries = Object.keys(aliased)
    .sort()
    .map(key => `  ${JSON.stringify(key)}: ${JSON.stringify(aliased[key])},`)
    .join('\n');

  return entries.length > 0 ? `{\n${entries}\n}` : '{}';
}

function renderEsmClassMap(module: SplitCssModule, chunkSpecifier: string): string {
  return `/**
 * GENERATED by @fluentui/workspace-plugin:build — do not edit.
 *
 * Class map for src/${module.relativePath}, compiled into ${chunkRelativePath(module)}.
 *
 * The side-effect import below is what makes the package self-styling for bundler consumers, and
 * it points at THIS component's own chunk — a consumer downloads only the components it uses. It
 * is present in the ESM output only, because node cannot require a raw stylesheet, and it
 * survives tree-shaking through the package's "sideEffects": ["**\\/*.css"] allowlist.
 *
 * The chunk assumes the package's root stylesheet ("./base.css") is already in the document: the
 * root sheet carries the cascade-layer order and the global custom-property registrations.
 * SSR/commonjs consumers load "./styles.css" instead, which inlines the root sheet and every
 * chunk into one file.
 */
import ${JSON.stringify(chunkSpecifier)};

const classes = ${serializeClassMap(module.classMap)};

export default classes;
`;
}

function renderCommonJsClassMap(module: SplitCssModule, outputPath: string): string {
  return `"use strict";
/**
 * GENERATED by @fluentui/workspace-plugin:build — do not edit.
 *
 * Class map for src/${module.relativePath}, compiled into ${chunkRelativePath(module)}.
 *
 * No stylesheet require: requiring this package's \`${outputPath}\` entry has to work in
 * plain node, which cannot parse CSS. Consumers of this output load the "./styles.css"
 * export subpath (a <link>, or their bundler's client entry).
 */
Object.defineProperty(exports, "__esModule", {
    value: true
});

const classes = ${serializeClassMap(module.classMap)};

exports.default = classes;
`;
}

/**
 * Repoints emitted `'./X.module.css'` specifiers at the generated class map
 * (`'./X.module.css.js'`, or `.cjs` — see the module header), in both the ESM `import` and
 * the CJS `require` form.
 *
 * The glob covers `.cjs` as well as `.js` because an ESM-first package's commonjs output has
 * already been renamed by the time this runs: globbing `**\/*.js` alone would silently match
 * nothing there and leave every `require('./X.module.css')` extensionless.
 *
 * Precedent: the Griffel AOT pass ({@link 'file://./babel.ts'}) already post-processes the
 * SWC output in place. Only the specifier string changes, so `.map` files are left alone —
 * the sourcemap for that one import line is off by the few characters of the extension.
 */
async function rewriteCssModuleSpecifiers(outputRoot: string, extension: string): Promise<void> {
  const files = globSync('**/*.{js,cjs}', { cwd: outputRoot });
  let rewritten = 0;

  for (const fileName of files) {
    const filePath = join(outputRoot, fileName);
    const code = (await readFile(filePath)).toString();

    if (!code.includes('.module.css')) {
      continue;
    }

    let changed = false;
    const next = code.replace(CSS_MODULE_SPECIFIER, (match, quote: string, specifier: string) => {
      const resolved = join(dirname(filePath), `${specifier}.${extension}`);

      if (!existsSync(resolved)) {
        logger.warn(`No generated class map for ${specifier} imported by ${filePath} — leaving the import dangling.`);
        return match;
      }

      changed = true;
      return `${quote}${specifier}.${extension}${quote}`;
    });

    if (changed) {
      await writeFile(filePath, next);
      rewritten++;
    }
  }

  if (rewritten > 0) {
    logger.verbose(`css-modules: repointed .module.css specifiers in ${rewritten} files under ${outputRoot}`);
  }
}
