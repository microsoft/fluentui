import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';

/**
 * The `@griffel-buckets` directive of a Fluent CSS Modules stylesheet: what can't be derived from the CSS itself about
 * how Griffel ordered the styles it replaces. Read by the opt-in Griffel ordering integration (`postcssGriffelBuckets`).
 *
 * ```css
 * /* @griffel-buckets reset: .root, .icon; logical: padding-inline-start *\/
 * ```
 *
 * - `reset`: classes replacing `makeResetStyles()` styles, which Griffel inserts before every `makeStyles()` style.
 * - `logical`: logical properties the Griffel styles declared as such. Griffel's physical shorthands (`padding`)
 *   don't remove them, so they keep beating app shorthand overrides.
 *
 * @typedef {{ resetClassNames: string[], logicalProperties: string[] }} GriffelBuckets
 */

export const DIRECTIVE = '@griffel-buckets';

/**
 * @param {string} text comment text
 * @returns {GriffelBuckets | undefined | Error} undefined when the comment isn't a directive
 */
export function parseDirective(text) {
  const content = text.trim();
  if (!content.startsWith(DIRECTIVE)) {
    return undefined;
  }
  /** @type {GriffelBuckets} */
  const buckets = { resetClassNames: [], logicalProperties: [] };
  for (const field of content.slice(DIRECTIVE.length).split(';')) {
    if (!field.trim()) {
      continue;
    }
    const [key, values, ...rest] = field.split(':');
    const list = (values ?? '')
      .split(',')
      .map(value => value.trim())
      .filter(Boolean);
    if (rest.length > 0 || list.length === 0) {
      return new Error(`Expected "<field>: <value>, <value>" in "${field.trim()}"`);
    }
    if (key.trim() === 'reset') {
      const invalid = list.find(value => !/^\.[\w-]+$/.test(value));
      if (invalid) {
        return new Error(`Expected a class selector such as ".root" in reset, found "${invalid}"`);
      }
      buckets.resetClassNames.push(...list.map(value => value.slice(1)));
    } else if (key.trim() === 'logical') {
      buckets.logicalProperties.push(...list);
    } else {
      return new Error(`Unknown field "${key.trim()}", expected "reset" or "logical"`);
    }
  }
  return buckets;
}

/** @param {GriffelBuckets} buckets */
export function formatDirective({ resetClassNames, logicalProperties }) {
  const fields = [
    resetClassNames.length > 0 && `reset: ${resetClassNames.map(name => `.${name}`).join(', ')}`,
    logicalProperties.length > 0 && `logical: ${logicalProperties.join(', ')}`,
  ].filter(Boolean);
  return `${DIRECTIVE} ${fields.join('; ')}`;
}

/** @param {string} file */
const readFile = file => (existsSync(file) ? readFileSync(file, 'utf8') : undefined);

/**
 * Arguments of `state.<slot>.className = <fn>(...)` assignments (also destructured `<slot>.className = ...`), by slot.
 *
 * @param {string} source
 * @param {string} fn
 * @returns {Array<[string, string]>}
 */
function getSlotClassNameArguments(source, fn) {
  /** @type {Array<[string, string]>} */
  const result = [];
  for (const match of source.matchAll(new RegExp(`(?:\\bstate\\.)?\\b(\\w+)\\.className = ${fn}\\(`, 'g'))) {
    const start = /** @type {number} */ (match.index) + match[0].length;
    let depth = 1;
    let end = start;
    while (depth > 0 && end < source.length) {
      depth += source[end] === '(' ? 1 : source[end] === ')' ? -1 : 0;
      end++;
    }
    result.push([match[1], source.slice(start, end - 1)]);
  }
  return result;
}

/** @param {string} property */
const kebabCase = property => property.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);

const LOGICAL_PROPERTY =
  /(shorthands\.)?\b((?:padding|margin|inset|scrollMargin|scrollPadding|border)(?:Inline|Block)\w*|border(?:Start|End)(?:Start|End)Radius)\b/g;

/**
 * The package source directory containing a file (its nearest `src` ancestor), where its CSS Modules hooks live.
 *
 * @param {string} file
 */
function getSourceRoot(file) {
  for (let directory = dirname(file); directory !== dirname(directory); directory = dirname(directory)) {
    if (basename(directory) === 'src') {
      return directory;
    }
  }
  return dirname(file);
}

/**
 * CSS Modules hooks (`*.styles.css.ts`) importing a stylesheet, with the identifier each imports it as.
 *
 * @param {string} cssFile
 * @returns {Array<{ hookFile: string, identifier: string, stylesheetIdentifiers: Set<string> }>}
 */
function findImportingHooks(cssFile) {
  const sourceRoot = getSourceRoot(cssFile);
  /** @type {Array<{ hookFile: string, identifier: string, stylesheetIdentifiers: Set<string> }>} */
  const hooks = [];
  const files = /** @type {string[]} */ (readdirSync(sourceRoot, { recursive: true }));
  for (const relativeFile of files.filter(file => file.endsWith('.styles.css.ts'))) {
    const hookFile = join(sourceRoot, relativeFile);
    const source = readFileSync(hookFile, 'utf8');
    const imports = [...source.matchAll(/^import (\w+) from '(\.[^']+\.module\.css)';$/gm)];
    const own = imports.find(([, , request]) => resolve(dirname(hookFile), request) === resolve(cssFile));
    if (own) {
      hooks.push({ hookFile, identifier: own[1], stylesheetIdentifiers: new Set(imports.map(([, name]) => name)) });
    }
  }
  return hooks;
}

/**
 * Derives the directive of a stylesheet from the Griffel styles hooks (`*.styles.ts`) next to the CSS Modules hooks
 * (`*.styles.css.ts`) importing it. Returns undefined when there is no Griffel source to derive from.
 *
 * - reset classes: when a slot receives a `makeResetStyles()` class in a Griffel hook, the first stylesheet class the
 *   slot receives in the CSS Modules hook replaces it, if it comes from this stylesheet;
 * - logical properties: declared in those Griffel hooks (`shorthands.paddingInline()` declares its longhands).
 *
 * @param {string} cssFile
 * @returns {GriffelBuckets | undefined}
 */
export function deriveFromGriffelSource(cssFile) {
  if (!existsSync(dirname(cssFile))) {
    return undefined;
  }
  const resetClassNames = new Set();
  const logicalProperties = new Set();
  let found = false;
  for (const { hookFile, identifier, stylesheetIdentifiers } of findImportingHooks(cssFile)) {
    const cssHook = readFileSync(hookFile, 'utf8');
    const griffelHook = readFile(hookFile.replace(/\.styles\.css\.ts$/, '.styles.ts'));
    if (!griffelHook) {
      continue;
    }
    found = true;
    for (const [, helper, property] of griffelHook.matchAll(LOGICAL_PROPERTY)) {
      for (const longhand of helper ? [`${property}Start`, `${property}End`] : [property]) {
        logicalProperties.add(kebabCase(longhand));
      }
    }
    const resetValues = new Set([...griffelHook.matchAll(/const (\w+) = makeResetStyles\(/g)].map(match => match[1]));
    for (const [, name, hook] of griffelHook.matchAll(/const (\w+) = (\w+)\(\);/g)) {
      if (resetValues.has(hook)) {
        resetValues.add(name);
      }
    }
    const resetSlots = new Set(
      getSlotClassNameArguments(griffelHook, 'mergeClasses')
        .filter(([, args]) => args.split(/[^\w.]+/).some(token => resetValues.has(token)))
        .map(([slot]) => slot),
    );
    for (const [slot, args] of getSlotClassNameArguments(cssHook, 'clsx')) {
      if (!resetSlots.has(slot)) {
        continue;
      }
      const firstClass = [...args.matchAll(/\b(\w+)(?:\.(\w+)|\[['"]([\w-]+)['"]\])/g)].find(([, name]) =>
        stylesheetIdentifiers.has(name),
      );
      if (firstClass?.[1] === identifier) {
        resetClassNames.add(firstClass[2] ?? firstClass[3]);
      }
    }
  }
  return found ? { resetClassNames: [...resetClassNames], logicalProperties: [...logicalProperties] } : undefined;
}
