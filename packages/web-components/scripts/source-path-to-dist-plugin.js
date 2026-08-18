/**
 * CEM plugin that rewrites any remaining TypeScript source paths (`src/**\/*.ts`)
 * to their compiled JavaScript equivalents (`./dist/esm/**\/*.js`).
 *
 * The `modulePathResolverPlugin` from `@wc-toolkit/module-path-resolver` only resolves
 * paths for modules that contain custom element declarations. This plugin handles all
 * other modules (utilities, mixins, design tokens, etc.) and `module` references within
 * declarations and exports.
 *
 * @see https://github.com/microsoft/fluentui/issues/36091
 * @see https://github.com/webcomponents/custom-elements-manifest/issues/96#issuecomment-1037495021
 */

/**
 * Converts a TypeScript source path to its dist JavaScript equivalent.
 * @param {string} sourcePath - A path like `src/utils/typings.ts`
 * @returns {string} A path like `./dist/esm/utils/typings.js`
 */
function toDistPath(sourcePath) {
  return './' + sourcePath.replace(/^src\//, 'dist/esm/').replace(/\.ts$/, '.js');
}

/**
 * Returns true if the path is a TypeScript source path that needs rewriting.
 * @param {string} path
 * @returns {boolean}
 */
function isSourcePath(path) {
  return typeof path === 'string' && path.startsWith('src/') && path.endsWith('.ts');
}

/**
 * Recursively walks an object and rewrites any `path` or `module` string properties
 * that point to TypeScript source files.
 * @param {unknown} obj
 */
function rewritePaths(obj) {
  if (obj === null || typeof obj !== 'object') {
    return;
  }

  if (Array.isArray(obj)) {
    for (const item of obj) {
      rewritePaths(item);
    }
    return;
  }

  for (const [key, value] of Object.entries(obj)) {
    if ((key === 'path' || key === 'module') && isSourcePath(value)) {
      obj[key] = toDistPath(value);
    } else if (typeof value === 'object' && value !== null) {
      rewritePaths(value);
    }
  }
}

/**
 * CEM analyzer plugin that rewrites TypeScript source paths to compiled JS dist paths.
 * Runs in the `packageLinkPhase` to process the manifest after all other plugins.
 */
export function sourcePathToDistPlugin() {
  return {
    name: 'source-path-to-dist',
    packageLinkPhase({ customElementsManifest }) {
      rewritePaths(customElementsManifest);
    },
  };
}
