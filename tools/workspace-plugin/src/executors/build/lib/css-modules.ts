/**
 * Package-build CSS emission for Tailwind-flavoured CSS Modules.
 *
 * Implements + D13:
 * source of truth is `src/**\/*.module.css`; the PACKAGE BUILD compiles it so that
 * consumers never run Tailwind and never see CSS-Modules syntax.
 *
 * Per package that owns at least one `*.module.css` this emits:
 *
 *  1. `dist/styles.css` — one aggregated, plain-CSS, layered stylesheet. The canonical
 *     `@layer` order statement is PREPENDED verbatim: Tailwind v4 is free to rewrite or
 *     trim a multi-name `@layer` statement while compiling a module, so its output is not
 *     trusted to carry it (D13). Re-declaring an identical order later in the file is a
 *     no-op (CSS Cascade 5), so whatever Tailwind emitted stays harmless.
 *     The stylesheet contains component rules ONLY — the theme emission
 *     (`--base-scale`, `--spacing`, …) is a standalone root artifact imported once per
 *     document and is NEVER embedded per package (D13). Modules only `@reference '#theme'`,
 *     which emits nothing, so the compiled rules merely *reference* those custom
 *     properties (`calc(var(--spacing, calc(1px * var(--base-scale))) * 8)`).
 *
 *  2. A generated class-map JS module per `*.module.css`, written next to the compiled
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
 * The side-effect `import '<…>/dist/styles.css'` is emitted into the ESM class map ONLY.
 *
 *  - Bundler consumers resolve `@fluentui/<pkg>` through `exports.import` / the `module`
 *    field → `lib/` → they import the class map → they get the stylesheet automatically.
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
import { dirname, join, relative, sep } from 'node:path';

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
 * D2 amendment 4 — the final `fui.*` layer family. Kept byte-identical to
 * `packages/react-components/react-tailwind-theme/css/index.css` and to the statement every
 * component module repeats after its `@reference`.
 */
export const CANONICAL_LAYER_STATEMENT =
  '@layer fui.theme, fui.base, fui.components, fui.components.l1, fui.components.l2, fui.components.l3, fui.components.l4, fui.components.l5, fui.utilities;';

const CSS_MODULE_GLOB = '**/*.module.css';
/**
 * One aggregated stylesheet per package. Splitting per component was evaluated and
 * dropped: the per-fixture size regression only appears in single-component
 * micro-bundles and washes out in aggregate, while N stylesheet subpaths would break
 * the public ./styles.css export for SSR/CJS consumers.
 */
const STYLESHEET_RELATIVE_PATH = 'dist/styles.css';

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
  const compiled: CompiledCssModule[] = [];

  for (const fileName of sourceFiles) {
    compiled.push(await compileOne(fileName, packageName, normalizedOptions));
  }

  await writeAggregatedStylesheet(compiled, packageName, normalizedOptions);
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
  const stylesheetPath = join(normalizedOptions.absoluteProjectRoot, STYLESHEET_RELATIVE_PATH);

  if (!existsSync(stylesheetPath)) {
    return;
  }

  const existing = await readFile(stylesheetPath, 'utf8');

  if (!existing.includes(GENERATED_STYLESHEET_SENTINEL)) {
    // Authored or copied by some other build step — not ours to delete.
    return;
  }

  await rm(stylesheetPath, { force: true });
  logger.log(`🎨 Removed orphaned ${STYLESHEET_RELATIVE_PATH} (package owns no *.module.css)`);
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

async function writeAggregatedStylesheet(
  compiled: CompiledCssModule[],
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
    ' */',
  ].join('\n');

  const body = compiled.map(module => `/* ${module.relativePath} */\n${module.css.trim()}`).join('\n\n');

  // The canonical order statement goes FIRST and verbatim — see the module header.
  const contents = `${CANONICAL_LAYER_STATEMENT}\n\n${banner}\n\n${body}\n`;

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
      `Generated dist/styles.css banner closes its comment early (at index ${terminator}) — the rest would be parsed as CSS.`,
    );
  }
}

async function writeClassMaps(compiled: CompiledCssModule[], normalizedOptions: NormalizedOptions): Promise<void> {
  const stylesheetPath = join(normalizedOptions.absoluteProjectRoot, STYLESHEET_RELATIVE_PATH);

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
      const stylesheetSpecifier = toRelativeSpecifier(dirname(classMapPath), stylesheetPath);

      await mkdir(dirname(classMapPath), { recursive: true });
      await writeFile(
        classMapPath,
        isEsm
          ? renderEsmClassMap(module, stylesheetSpecifier)
          : renderCommonJsClassMap(module, outputConfig.outputPath),
      );
    }

    await rewriteCssModuleSpecifiers(outputRoot, extension);
  }
}

function toRelativeSpecifier(fromDir: string, toFile: string): string {
  const specifier = toPosix(relative(fromDir, toFile));
  return specifier.startsWith('.') ? specifier : `./${specifier}`;
}

function serializeClassMap(classMap: Record<string, string>): string {
  const entries = Object.keys(classMap)
    .sort()
    .map(key => `  ${JSON.stringify(key)}: ${JSON.stringify(classMap[key])},`)
    .join('\n');

  return entries.length > 0 ? `{\n${entries}\n}` : '{}';
}

function renderEsmClassMap(module: CompiledCssModule, stylesheetSpecifier: string): string {
  return `/**
 * GENERATED by @fluentui/workspace-plugin:build — do not edit.
 *
 * Class map for src/${module.relativePath}, compiled into ${STYLESHEET_RELATIVE_PATH}.
 *
 * The side-effect import below is what makes the package self-styling for bundler
 * consumers; it is present in the ESM output only, because node cannot require a raw
 * stylesheet. It survives tree-shaking through the package's "sideEffects": ["**\\/*.css"]
 * allowlist. SSR/commonjs consumers load the "./styles.css" export subpath themselves.
 */
import ${JSON.stringify(stylesheetSpecifier)};

const classes = ${serializeClassMap(module.classMap)};

export default classes;
`;
}

function renderCommonJsClassMap(module: CompiledCssModule, outputPath: string): string {
  return `"use strict";
/**
 * GENERATED by @fluentui/workspace-plugin:build — do not edit.
 *
 * Class map for src/${module.relativePath}, compiled into ${STYLESHEET_RELATIVE_PATH}.
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
