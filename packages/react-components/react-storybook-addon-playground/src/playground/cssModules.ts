import postcss from 'postcss';

import type { CssModuleSource } from '../url';

export type { CssModuleSource };

export interface CompiledCssModule {
  name: string;
  /** Specifier used in transformed story source (`./styles/<basename>`). */
  specifier: string;
  locals: Record<string, string>;
  cssText: string;
}

export function cssModuleBasename(name: string): string {
  return name.replace(/^.*[/\\]/, '');
}

export function toCssModuleSpecifier(name: string): string {
  return `./styles/${cssModuleBasename(name)}`;
}

const HASH_MULTIPLIER = 31;
const HASH_MODULUS = 1_000_000_003;

function hashString(input: string): string {
  let hash = 0;
  for (let charIndex = 0; charIndex < input.length; charIndex += 1) {
    // Arbitrary non-cryptographic constants; the large prime modulus keeps deterministic class names short.
    // Collisions are possible but unlikely for story-scoped CSS module class names.
    hash = (hash * HASH_MULTIPLIER + input.charCodeAt(charIndex)) % HASH_MODULUS;
  }
  return hash.toString(36);
}

function findClosingParenthesis(selector: string, start: number): number {
  let depth = 1;

  for (let index = start; index < selector.length; index += 1) {
    const character = selector[index];
    if (character === '"' || character === "'") {
      const quote = character;
      index += 1;
      while (index < selector.length && selector[index] !== quote) {
        if (selector[index] === '\\') {
          index += 1;
        }
        index += 1;
      }
    } else if (selector.startsWith('/*', index)) {
      const commentEnd = selector.indexOf('*/', index + 2);
      index = commentEnd === -1 ? selector.length : commentEnd + 1;
    } else if (character === '(') {
      depth += 1;
    } else if (character === ')') {
      depth -= 1;
      if (depth === 0) {
        return index;
      }
    }
  }

  return -1;
}

function transformSelector(selector: string, getLocalClassName: (local: string) => string, localize = true): string {
  let result = '';

  for (let index = 0; index < selector.length; ) {
    const character = selector[index];
    if (character === '"' || character === "'") {
      const quote = character;
      const start = index;
      index += 1;
      while (index < selector.length && selector[index] !== quote) {
        index += selector[index] === '\\' ? 2 : 1;
      }
      index = Math.min(index + 1, selector.length);
      result += selector.slice(start, index);
    } else if (selector.startsWith('/*', index)) {
      const end = selector.indexOf('*/', index + 2);
      const next = end === -1 ? selector.length : end + 2;
      result += selector.slice(index, next);
      index = next;
    } else if (selector.startsWith(':global(', index)) {
      const contentStart = index + ':global('.length;
      const end = findClosingParenthesis(selector, contentStart);
      if (end === -1) {
        result += selector.slice(index);
        break;
      }
      result += transformSelector(selector.slice(contentStart, end), getLocalClassName, false);
      index = end + 1;
    } else if (localize && character === '.' && /[A-Za-z_]/.test(selector[index + 1] ?? '')) {
      let end = index + 2;
      while (/[\w-]/.test(selector[end] ?? '')) {
        end += 1;
      }
      const local = selector.slice(index + 1, end);
      result += `.${getLocalClassName(local)}`;
      index = end;
    } else {
      result += character;
      index += 1;
    }
  }

  return result;
}

/**
 * Compiles a CSS module the way Storybook's css-loader does in spirit: local class names are hashed,
 * `:global(...)` wrappers are stripped so the inner selector is injected as real CSS.
 */
export function compileCssModule(mod: CssModuleSource): CompiledCssModule {
  const basename = cssModuleBasename(mod.name);
  const id = basename.replace(/\.module\.css$/i, '').replace(/[^\w-]+/g, '_') || 'css';
  // File-scoped names survive declaration edits so live CSS updates need not remount React.
  const suffix = hashString(basename);
  const locals: Record<string, string> = {};
  const getLocalClassName = (local: string) => {
    if (!locals[local]) {
      locals[local] = `${id}__${local}--${suffix}`;
    }
    return locals[local];
  };
  const root = postcss.parse(mod.source, { from: mod.name });
  root.walkRules(rule => {
    rule.selector = transformSelector(rule.selector, getLocalClassName);
  });

  return {
    name: basename,
    specifier: toCssModuleSpecifier(basename),
    locals,
    cssText: root.toString(),
  };
}

export function compileCssModules(mods: readonly CssModuleSource[]): CompiledCssModule[] {
  return mods.map(compileCssModule);
}

export function updateCssModuleSource(
  modules: readonly CssModuleSource[],
  name: string,
  source: string,
): CssModuleSource[] {
  return modules.map(mod => (mod.name === name ? { ...mod, source } : mod));
}

export function findCompiledCssModule(
  specifier: string,
  modules: readonly CompiledCssModule[],
): CompiledCssModule | undefined {
  const exact = modules.find(mod => mod.specifier === specifier);
  if (exact) {
    return exact;
  }

  const basename = cssModuleBasename(specifier);
  return modules.find(mod => cssModuleBasename(mod.specifier) === basename || mod.name === basename);
}

/**
 * Turns user input into a CSS module file name, e.g. `card` or `card.css` -> `card.module.css`.
 */
export function normalizeCssModuleName(input: string): string {
  const name = cssModuleBasename(input.trim());
  if (/\.module\.css$/i.test(name)) {
    return name;
  }

  return `${name.replace(/\.css$/i, '')}.module.css`;
}

/**
 * Returns why provided (normalized) CSS module name cannot be added, or `undefined` when it is valid.
 */
export function validateCssModuleName(name: string, modules: readonly CssModuleSource[]): string | undefined {
  if (!/^[\w-]+\.module\.css$/i.test(name)) {
    return 'Use letters, digits, "-" or "_", ending with .module.css.';
  }
  if (modules.some(mod => cssModuleBasename(mod.name).toLowerCase() === name.toLowerCase())) {
    return `${name} already exists.`;
  }

  return undefined;
}

export function getUniqueCssModuleName(modules: readonly CssModuleSource[], base = 'styles'): string {
  for (let index = 1; ; index++) {
    const name = `${base}${index === 1 ? '' : index}.module.css`;
    if (!validateCssModuleName(name, modules)) {
      return name;
    }
  }
}

export function createCssModuleSource(name: string): string {
  return `/* import styles from './${name}'; */\n.root {\n}\n`;
}
