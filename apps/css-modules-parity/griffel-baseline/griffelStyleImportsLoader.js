// @ts-check
const fs = require('fs');
const path = require('path');

const componentsRoot = path.resolve(__dirname, '../../../packages/react-components');

/** Matches `import { a, b as c } from '@fluentui/react-x';` (also multi-line, also `import type`). */
const importPattern = /import\s+(type\s+)?\{([^}]*)\}\s*from\s*['"](@fluentui\/react-[a-z0-9-]+)['"];?/g;
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
 * Runs on the original Griffel style hooks (the parity baseline). A Griffel hook that composes another package's
 * style hook (`useToggleButtonStyles_unstable` from `@fluentui/react-button`) imports it through the package index,
 * which resolves to the CSS Modules alternative. This redirects such imports to the other package's Griffel hook, so
 * the baseline is Griffel throughout.
 *
 * @this {import('webpack').LoaderContext<{}>}
 * @param {string} source
 */
module.exports = function griffelStyleImportsLoader(source) {
  return source.replace(importPattern, (statement, typeOnly, specifiers, packageName) => {
    if (typeOnly) {
      return statement;
    }
    const hooks = griffelHooksOf(packageName);
    const kept = [];
    const redirected = [];
    for (const specifier of specifiers.split(',').map((/** @type {string} */ s) => s.trim())) {
      if (!specifier) {
        continue;
      }
      const [imported, local = imported] = specifier.replace(/^type\s+/, '').split(/\s+as\s+/);
      const modulePath = !specifier.startsWith('type ') && styleHookPattern.test(imported) && hooks.get(imported);
      if (modulePath) {
        this.addDependency(modulePath);
        redirected.push(`import { ${imported} as ${local} } from ${JSON.stringify(modulePath)};`);
      } else {
        kept.push(specifier);
      }
    }
    if (!redirected.length) {
      return statement;
    }
    return [kept.length ? `import { ${kept.join(', ')} } from '${packageName}';` : '', ...redirected].join('\n');
  });
};
