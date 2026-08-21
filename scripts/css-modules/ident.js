// @ts-check
/**
 * Single source of truth for generated CSS-Modules class names:
 *   fuicm-<component-kebab>-<local-kebab>-<hex6>   (all lowercase, - separated)
 *
 * Three pipelines must agree on this shape — the package build (postcss-modules), the
 * storybook css-loader, and the jest proxy — so one serializer can strip them and one
 * conformance rule can describe them. Required by RELATIVE path from all three on
 * purpose: this file must stay free of workspace requires.
 *
 * The hash seeds on <package> <source-relative-path> <local> — never file contents — so
 * shipped names are stable across CSS edits but unique across packages. Kebab-casing
 * happens after hashing, so locals that kebab to the same string cannot collide. The
 * fuicm- prefix is a hard contract with scripts/jest/src/css-modules/serializer.js.
 */

const { createHash } = require('node:crypto');
const { existsSync, readFileSync } = require('node:fs');
const { basename, dirname, join, relative, sep } = require('node:path');

/**
 * Hard contract with scripts/jest/src/css-modules/serializer.js — see the header.
 */
const GENERATED_CLASS_PREFIX = 'fuicm-';

/** 24 bits of sha256, lowercase hex. Enough for a per-package-per-file-per-local seed. */
const IDENT_HASH_LENGTH = 6;

/** Characters that are not legal in the lowercase-kebab alphabet this scheme uses. */
const UNSAFE_IDENT_CHARS = /[^a-z0-9-]/g;

/** Collapse runs of `-` and trim them off the ends, so the ident never doubles a separator. */
const SEPARATOR_RUN = /-{2,}/g;
const LEADING_OR_TRAILING_SEPARATOR = /^-+|-+$/g;

/**
 * `camelCase` / `PascalCase` / `snake_case` / `dot.case` → `kebab-case`, lowercased.
 *
 * The two `replace`s are the standard pair and they are both needed:
 *   1. `([a-z0-9])([A-Z])`      — `squareXLarge`  → `square-XLarge`   (lower/digit → upper)
 *   2. `([A-Z]+)([A-Z][a-z])`   — `square-XLarge` → `square-X-Large`  (acronym → word)
 * Without #2, `XLarge` and `RTLSlices` keep their acronym glued to the following word.
 *
 * @param {string} value
 * @returns {string}
 */
function toKebabCase(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/[_.\s]+/g, '-')
    .toLowerCase()
    .replace(UNSAFE_IDENT_CHARS, '-')
    .replace(SEPARATOR_RUN, '-')
    .replace(LEADING_OR_TRAILING_SEPARATOR, '');
}

/**
 * The component half of the ident: the module file's own name, kebab-cased.
 * `components/MessageBar/MessageBar.module.css` → `message-bar`.
 *
 * @param {string} relativePath source-root-relative path, POSIX or native separators
 * @returns {string}
 */
function toComponentToken(relativePath) {
  return toKebabCase(
    basename(String(relativePath))
      .replace(/\.module\.css$/i, '')
      .replace(/\.css$/i, ''),
  );
}

/**
 * @param {string} seed
 * @returns {string} lowercase hex, {@link IDENT_HASH_LENGTH} characters
 */
function hashIdent(seed) {
  return createHash('sha256').update(seed).digest('hex').slice(0, IDENT_HASH_LENGTH);
}

/**
 * @param {string} value
 * @returns {string}
 */
function toPosix(value) {
  return String(value).split(sep).join('/');
}

/**
 * Build one generated class name.
 *
 * @param {object} args
 * @param {string} args.packageName    e.g. `@fluentui/react-switch`
 * @param {string} args.relativePath   source-root-relative, e.g. `components/Switch/Switch.module.css`
 * @param {string} args.localName      the class name as authored in the module
 * @returns {string} e.g. `fuicm-switch-root-a3f2c1`
 */
function generateIdent({ packageName, relativePath, localName }) {
  const posixPath = toPosix(relativePath);
  const hash = hashIdent(`${packageName} ${posixPath} ${localName}`);

  return `${GENERATED_CLASS_PREFIX}${toComponentToken(posixPath)}-${toKebabCase(localName)}-${hash}`;
}

/**
 * Curried form for `postcss-modules`' `generateScopedName`, which is called once per local
 * with the file already fixed.
 *
 * @param {object} args
 * @param {string} args.packageName
 * @param {string} args.relativePath
 * @returns {(localName: string) => string}
 */
function createGenerateScopedName({ packageName, relativePath }) {
  return localName => generateIdent({ packageName, relativePath, localName });
}

/**
 * Recover `{ packageName, relativePath }` from an absolute module path, for the pipelines
 * that only get a file path (webpack's `getLocalIdent` receives `loaderContext.resourcePath`).
 *
 * Walks up to the nearest `package.json` that declares a `name` — for a v9 component that is
 * `packages/react-components/<pkg>/library/package.json` — and makes the path relative to
 * that package's `src`, which is exactly the `absoluteSourceRoot` the build executor hashes
 * against. That equality is the whole point: the storybook and the shipped stylesheet
 * generate byte-identical idents for the same module.
 *
 * @param {string} absoluteFilePath
 * @returns {{ packageName: string, relativePath: string }}
 */
function resolveIdentContext(absoluteFilePath) {
  let directory = dirname(absoluteFilePath);
  let previous = '';

  while (directory !== previous) {
    const manifestPath = join(directory, 'package.json');

    if (existsSync(manifestPath)) {
      let packageName = '';

      try {
        packageName = JSON.parse(readFileSync(manifestPath, 'utf8')).name || '';
      } catch {
        packageName = '';
      }

      if (packageName) {
        const sourceRoot = join(directory, 'src');
        const base = absoluteFilePath.startsWith(sourceRoot + sep) ? sourceRoot : directory;

        return { packageName, relativePath: toPosix(relative(base, absoluteFilePath)) };
      }
    }

    previous = directory;
    directory = dirname(directory);
  }

  // Unreachable inside this repo; keeps the function total rather than throwing during a
  // webpack build, where an exception in getLocalIdent surfaces as an unrelated loader error.
  return { packageName: '', relativePath: toPosix(absoluteFilePath) };
}

/**
 * `css-loader`'s `modules.getLocalIdent` hook. Signature per css-loader's docs:
 * `(loaderContext, localIdentName, localName, options) => string`. `localIdentName` (the
 * template string) is intentionally ignored — this scheme is not expressible as a css-loader
 * template, which is why the option exists.
 *
 * @param {{ resourcePath: string }} loaderContext
 * @param {string} _localIdentName
 * @param {string} localName
 * @returns {string}
 */
function getLocalIdent(loaderContext, _localIdentName, localName) {
  const { packageName, relativePath } = resolveIdentContext(loaderContext.resourcePath);

  return generateIdent({ packageName, relativePath, localName });
}

/**
 * The jest half of the scheme.
 *
 * Jest maps EVERY `*.module.css` import to one module (`moduleNameMapper` cannot pass the
 * importer's path), so there is no file context here and therefore no component token and no
 * hash to compute — those two segments are dropped rather than faked. What must match, and
 * does, is the part the rest of the toolchain actually depends on: the `fuicm-` prefix that
 * the snapshot serializer strips, and the lowercase-kebab alphabet.
 *
 * @param {string} localName
 * @returns {string} e.g. `fuicm-root`, `fuicm-non-zero-determinate`
 */
function generateTestIdent(localName) {
  return `${GENERATED_CLASS_PREFIX}${toKebabCase(localName)}`;
}

module.exports = {
  GENERATED_CLASS_PREFIX,
  IDENT_HASH_LENGTH,
  toKebabCase,
  toComponentToken,
  hashIdent,
  generateIdent,
  createGenerateScopedName,
  resolveIdentContext,
  getLocalIdent,
  generateTestIdent,
};
