/**
 * CSS Module key check.
 *
 * The ambient `declare module '*.module.css'` typing accepts any key, so a misspelled or deleted class compiles and
 * resolves to `undefined` at runtime. This check makes sure that:
 *
 * 1. every CSS Modules style hook (`*.styles.css.ts`) only reads literal keys its stylesheet exports;
 * 2. every `jest.mock('<path>.module.css', ...)` in a style hook unit test only mocks keys the real stylesheet exports.
 *
 * A CSS Module exports each class selector (top-level or nested) that is not inside `:global(...)`, plus every
 * `@keyframes` name.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { describe, it } from 'node:test';

import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';

const repoRoot = path.resolve(import.meta.dirname, '../../..');
const componentsRoot = path.join(repoRoot, 'packages/react-components');

const toPosix = p => p.split(path.sep).join('/');
const rel = file => toPosix(path.relative(componentsRoot, file));

/** Bare `.module.css` specifiers and the source files they resolve to. */
const BARE_SPECIFIERS = {
  '@fluentui/react-positioning/arrow.module.css': path.join(
    componentsRoot,
    'react-positioning/library/src/Arrow.module.css',
  ),
};

function listFiles(predicate) {
  const found = [];
  for (const pkg of fs.readdirSync(componentsRoot)) {
    const srcDir = path.join(componentsRoot, pkg, 'library/src');
    if (!fs.existsSync(srcDir)) {
      continue;
    }
    for (const file of fs.readdirSync(srcDir, { recursive: true })) {
      const relPath = toPosix(String(file));
      if (predicate(relPath)) {
        found.push(path.join(srcDir, relPath));
      }
    }
  }
  return found.sort();
}

const exportedCache = new Map();

/** Class names and keyframe names exported by a CSS Module. */
function exportedClasses(cssFile) {
  const cached = exportedCache.get(cssFile);
  if (cached) {
    return cached;
  }
  const names = new Set();
  const root = postcss.parse(fs.readFileSync(cssFile, 'utf8'), { from: cssFile });
  const collect = selectorParser(selectors => {
    selectors.walkClasses(node => {
      for (let parent = node.parent; parent; parent = parent.parent) {
        if (parent.type === 'pseudo' && parent.value === ':global') {
          return;
        }
      }
      names.add(node.value);
    });
  });
  root.walkRules(rule => {
    collect.processSync(rule.selector);
  });
  root.walkAtRules(/^(-\w+-)?keyframes$/, atRule => {
    names.add(atRule.params.trim());
  });
  exportedCache.set(cssFile, names);
  return names;
}

/** Resolves a `.module.css` import or mock specifier used in `fromFile`. */
function resolveCssSpecifier(fromFile, specifier) {
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    return path.resolve(path.dirname(fromFile), specifier);
  }
  if (specifier in BARE_SPECIFIERS) {
    return BARE_SPECIFIERS[specifier];
  }
  throw new Error(`${rel(fromFile)} uses unsupported .module.css specifier '${specifier}'`);
}

/** Index of the bracket that closes the one at `open`, skipping strings, template literals and comments. */
function matchBracket(text, open) {
  const pairs = { '{': '}', '(': ')', '[': ']' };
  const stack = [];
  for (let i = open; i < text.length; i++) {
    const ch = text[i];
    if (ch === "'" || ch === '"' || ch === '`') {
      for (i++; i < text.length && text[i] !== ch; i++) {
        if (text[i] === '\\') {
          i++;
        }
      }
    } else if (ch === '/' && text[i + 1] === '/') {
      i = text.indexOf('\n', i);
      if (i === -1) {
        return -1;
      }
    } else if (ch === '/' && text[i + 1] === '*') {
      i = text.indexOf('*/', i) + 1;
      if (i === 0) {
        return -1;
      }
    } else if (ch in pairs) {
      stack.push(pairs[ch]);
    } else if (ch === '}' || ch === ')' || ch === ']') {
      if (stack.pop() !== ch) {
        return -1;
      }
      if (stack.length === 0) {
        return i;
      }
    }
  }
  return -1;
}

/** Splits an object literal body into its top-level `key: value` entries. Returns `{ key, value }` pairs. */
function objectEntries(body) {
  const entries = [];
  let start = 0;
  const pushEntry = end => {
    const entry = body
      .slice(start, end)
      .replace(/^\s*(\/\/[^\n]*\n|\/\*[\s\S]*?\*\/|\s)*/, '')
      .trim();
    if (entry) {
      const match = /^(?:'([^']*)'|"([^"]*)"|([A-Za-z_$][\w$]*))\s*:\s*([\s\S]*)$/.exec(entry);
      entries.push(match ? { key: match[1] ?? match[2] ?? match[3], value: match[4] } : { key: null, value: entry });
    }
  };
  for (let i = 0; i < body.length; i++) {
    const ch = body[i];
    if (ch === '{' || ch === '(' || ch === '[' || ch === "'" || ch === '"' || ch === '`') {
      if (ch === "'" || ch === '"' || ch === '`') {
        for (i++; i < body.length && body[i] !== ch; i++) {
          if (body[i] === '\\') {
            i++;
          }
        }
      } else {
        i = matchBracket(body, i);
        if (i === -1) {
          return null;
        }
      }
    } else if (ch === '/' && body[i + 1] === '/') {
      i = body.indexOf('\n', i);
      if (i === -1) {
        break;
      }
    } else if (ch === '/' && body[i + 1] === '*') {
      i = body.indexOf('*/', i) + 1;
    } else if (ch === ',') {
      pushEntry(i);
      start = i + 1;
    }
  }
  pushEntry(body.length);
  return entries;
}

/**
 * Finds `jest.mock('<specifier>.module.css', () => ({ ... }))` calls and returns the keys of each mocked module
 * (the keys of `default` when the factory returns an ES module shape). `keys` is null when the factory is not an
 * object literal this scanner understands.
 */
function cssModuleMocks(source) {
  const mocks = [];
  const re = /jest\.mock\(\s*(['"])([^'"]+\.module\.css)\1\s*,\s*\(\s*\)\s*=>\s*/g;
  let match;
  while ((match = re.exec(source))) {
    const specifier = match[2];
    const i = re.lastIndex;
    let objectOpen = -1;
    if (source[i] === '(') {
      const inner = source.slice(i + 1).match(/^\s*/)[0].length;
      if (source[i + 1 + inner] === '{') {
        objectOpen = i + 1 + inner;
      }
    } else if (source[i] === '{') {
      const close = matchBracket(source, i);
      const ret = /\breturn\s*\{/.exec(source.slice(i, close));
      if (ret) {
        objectOpen = i + ret.index + ret[0].length - 1;
      }
    }
    if (objectOpen === -1) {
      mocks.push({ specifier, keys: null });
      continue;
    }
    const objectClose = matchBracket(source, objectOpen);
    let entries = objectClose === -1 ? null : objectEntries(source.slice(objectOpen + 1, objectClose));
    // ES module shape `{ __esModule: true, default: { ... } }`. A plain `default: 'x'` entry is a class named `default`.
    const defaultValue = entries?.find(e => e.key === 'default')?.value.trim();
    if (defaultValue?.startsWith('{') && defaultValue.endsWith('}')) {
      entries = objectEntries(defaultValue.slice(1, -1));
    }
    const keys = entries && entries.every(e => e.key !== null) ? entries.map(e => e.key) : null;
    mocks.push({ specifier, keys: keys?.filter(k => k !== '__esModule') ?? null });
  }
  return mocks;
}

const escapeRegExp = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const hooks = listFiles(f => f.endsWith('.styles.css.ts') && !f.endsWith('.test.ts'));
const tests = listFiles(f => /\.styles\.css\.test\.tsx?$/.test(f));

describe('css-modules keys', () => {
  it('finds hooks and tests to check', () => {
    assert.ok(hooks.length > 100, `expected more than 100 hooks, found ${hooks.length}`);
    assert.ok(tests.length > 100, `expected more than 100 tests, found ${tests.length}`);
  });

  it('style hooks only read classes their CSS Module exports', () => {
    const problems = [];
    for (const hook of hooks) {
      const source = fs.readFileSync(hook, 'utf8');
      const importRe = /^\s*import\s+([A-Za-z_$][\w$]*)\s+from\s+(['"])([^'"]+\.module\.css)\2;?[ \t]*$/gm;
      const imports = [...source.matchAll(importRe)].map(m => ({ name: m[1], specifier: m[3] }));
      // Drop import statements (side-effect imports first, so the lazy match never spans into code).
      const body = source.replace(/^\s*import\s+(['"])[^'"]+\1;?|^\s*import\s[^'"]*?from\s+(['"])[^'"]+\2;?/gm, '');
      for (const { name, specifier } of imports) {
        const cssFile = resolveCssSpecifier(hook, specifier);
        const exported = exportedClasses(cssFile);
        const n = escapeRegExp(name);
        const accessRe = new RegExp(`(?<![\\w.$])${n}(?:\\.([A-Za-z_$][\\w$]*)|\\[\\s*(['"])([^'"]+)\\2\\s*\\])`, 'g');
        for (const access of body.matchAll(accessRe)) {
          const key = access[1] ?? access[3];
          if (!exported.has(key)) {
            problems.push(`${rel(hook)} reads '${key}', which ${path.basename(cssFile)} does not export`);
          }
        }
      }
    }
    assert.deepEqual(
      problems,
      [],
      `Style hooks read classes their CSS Module does not define (the lookup returns undefined):\n${problems.join(
        '\n',
      )}`,
    );
  });

  it('unit tests only mock classes the real CSS Module exports', () => {
    const problems = [];
    for (const test of tests) {
      for (const { specifier, keys } of cssModuleMocks(fs.readFileSync(test, 'utf8'))) {
        const cssFile = resolveCssSpecifier(test, specifier);
        if (keys === null) {
          problems.push(`${rel(test)} mocks ${specifier} with a factory this check cannot read`);
          continue;
        }
        const exported = exportedClasses(cssFile);
        for (const key of keys) {
          if (!exported.has(key)) {
            problems.push(`${rel(test)} mocks '${key}', which ${path.basename(cssFile)} does not export`);
          }
        }
      }
    }
    assert.deepEqual(
      problems,
      [],
      `Test mocks name classes the real CSS Module does not define; keep each mock a subset of the real classes:\n${problems.join(
        '\n',
      )}`,
    );
  });
});
