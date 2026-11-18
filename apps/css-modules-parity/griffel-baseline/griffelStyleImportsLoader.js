// @ts-check
const fs = require('fs');
const path = require('path');

const componentsRoot = path.resolve(__dirname, '../../../packages/react-components');

/** Matches `import { a, b as c } from '@fluentui/react-x';` (also multi-line, also `import type`). */
const importPattern = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*['"](@fluentui\/react-[a-z0-9-]+)['"];?/g;
/** Matches relative imports that are not style modules themselves, for example `from '../../selectable/index'`. */
const relativeImportPattern = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*['"](\.{1,2}\/[^'"]*)['"];?/g;
/** Matches `export { a, b as c } from './x.styles';` in an index module. */
const styleReexportPattern = /export\s+\{([^}]*)\}\s*from\s*['"](\.{1,2}\/[^'"]*\.styles)['"]/g;
const styleHookPattern = /^use\w*Styles(_unstable)?$/;

/** @type {Map<string, Map<string, string>>} package name → (style hook name → Griffel module path) */
const griffelHooksByPackage = new Map();

/**
 * Lists the Griffel style hooks a package exports. Only modules with a CSS Modules alternative are listed: the
 * others are what the CSS Modules build uses as well.
 *
 * @param {string} packageName
 */
function griffelHooksOf(packageName) {
  let hooks = griffelHooksByPackage.get(packageName);
  if (hooks) {
    return hooks;
  }
  hooks = new Map();
  const sourceRoot = path.join(componentsRoot, packageName.replace('@fluentui/', ''), 'library/src');
  if (fs.existsSync(sourceRoot)) {
    for (const file of /** @type {string[]} */ (fs.readdirSync(sourceRoot, { recursive: true }))) {
      if (!file.endsWith('.styles.ts') || file.endsWith('.styles.css.ts')) {
        continue;
      }
      const modulePath = path.join(sourceRoot, file);
      if (!fs.existsSync(modulePath.replace(/\.styles\.ts$/, '.styles.css.ts'))) {
        continue;
      }
      for (const [, name] of fs
        .readFileSync(modulePath, 'utf8')
        .matchAll(/export const (use\w*Styles(?:_unstable)?)\b/g)) {
        hooks.set(name, modulePath);
      }
    }
  }
  griffelHooksByPackage.set(packageName, hooks);
  return hooks;
}

/**
 * Lists the Griffel style hooks an index module re-exports directly from style modules that have a CSS Modules
 * alternative.
 *
 * @param {string} indexPath
 * @returns {Map<string, string>} exported name → Griffel module path
 */
function reexportedGriffelHooksOf(indexPath) {
  const hooks = new Map();
  for (const [, specifiers, request] of fs.readFileSync(indexPath, 'utf8').matchAll(styleReexportPattern)) {
    const modulePath = path.resolve(path.dirname(indexPath), `${request}.ts`);
    if (!fs.existsSync(modulePath) || !fs.existsSync(modulePath.replace(/\.styles\.ts$/, '.styles.css.ts'))) {
      continue;
    }
    for (const specifier of specifiers.split(',').map((/** @type {string} */ s) => s.trim())) {
      const [imported, exported = imported] = specifier.split(/\s+as\s+/);
      if (imported && styleHookPattern.test(exported)) {
        hooks.set(exported, modulePath);
      }
    }
  }
  return hooks;
}

/**
 * Resolves a relative, non-style import request to its index module.
 *
 * @param {string} fromFile
 * @param {string} request
 */
function resolveIndex(fromFile, request) {
  const base = path.resolve(path.dirname(fromFile), request);
  return [`${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')].find(candidate => fs.existsSync(candidate));
}

/**
 * Splits named import specifiers into the kept ones and redirects for the style hooks found in `hooks`.
 *
 * @param {string} specifiers
 * @param {Map<string, string>} hooks
 * @param {(modulePath: string) => void} addDependency
 */
function redirectSpecifiers(specifiers, hooks, addDependency) {
  const kept = [];
  const redirected = [];
  for (const specifier of specifiers.split(',').map((/** @type {string} */ s) => s.trim())) {
    if (!specifier) {
      continue;
    }
    const [imported, local = imported] = specifier.replace(/^type\s+/, '').split(/\s+as\s+/);
    const modulePath = !specifier.startsWith('type ') && styleHookPattern.test(imported) && hooks.get(imported);
    if (modulePath) {
      addDependency(modulePath);
      redirected.push(`import { ${imported} as ${local} } from ${JSON.stringify(modulePath)};`);
    } else {
      kept.push(specifier);
    }
  }
  return { kept, redirected };
}

/**
 * Runs on the original Griffel style hooks (the parity baseline). A Griffel hook that composes another package's
 * style hook (`useToggleButtonStyles_unstable` from `@fluentui/react-button`) imports it through the package index,
 * which resolves to the CSS Modules alternative. This redirects such imports to the other package's Griffel hook, so
 * the baseline is Griffel throughout.
 *
 * @this {import('webpack').LoaderContext<{}>}
 * @param {string} source
 */
module.exports = function griffelStyleImportsLoader(source) {
  const addDependency = (/** @type {string} */ modulePath) => this.addDependency(modulePath);
  const fromPackages = source.replace(importPattern, (statement, typeOnly, specifiers, packageName) => {
    if (typeOnly) {
      return statement;
    }
    const { kept, redirected } = redirectSpecifiers(specifiers, griffelHooksOf(packageName), addDependency);
    if (!redirected.length) {
      return statement;
    }
    return [kept.length ? `import { ${kept.join(', ')} } from '${packageName}';` : '', ...redirected].join('\n');
  });
  // A style hook imported through a relative index module (`useCheckmarkStyles_unstable` from
  // '../../selectable/index') also resolves to its CSS Modules alternative there.
  return fromPackages.replace(relativeImportPattern, (statement, typeOnly, specifiers, request) => {
    if (typeOnly || /\.styles(\.js)?$/.test(request)) {
      return statement;
    }
    const indexPath = resolveIndex(this.resourcePath, request);
    if (!indexPath) {
      return statement;
    }
    this.addDependency(indexPath);
    const { kept, redirected } = redirectSpecifiers(specifiers, reexportedGriffelHooksOf(indexPath), addDependency);
    if (!redirected.length) {
      return statement;
    }
    return [kept.length ? `import { ${kept.join(', ')} } from '${request}';` : '', ...redirected].join('\n');
  });
};
