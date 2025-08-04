const restrictedGlobals = require('./shared/restricted-globals');
const nxPlugin = require('@nx/eslint-plugin');

function shouldRegisterInternal() {
  try {
    const hasNxEslintPlugin = require.resolve('@nx/eslint-plugin');
    return Boolean(hasNxEslintPlugin);
  } catch {
    return false;
  }
}

const shouldRegister = shouldRegisterInternal();

/**
 * @internal
 *
 * this will be removed after https://github.com/microsoft/fluentui/issues/30332
 *
 * expands this with rulesets/overrides that are necessary for specific configs
 */
const __internal = {
  /**
   * `@nx/eslint-plugin` is necessary in order to register custom lint rules that live within tools/eslint-rules
   */
  /** @type {Record<string, import('eslint').ESLint.Plugin | {}>} */
  plugins: shouldRegister ? { '@nx': nxPlugin } : {},
  // extend this object with your rule overrides
  overrides: {
    react: shouldRegister
      ? {
          files: ['**/src/**/*.{ts,tsx}'],
          ignores: ['**/*.{test,spec,cy,stories}.{ts,tsx}'],
          /** @type {import('eslint').Linter.RulesRecord} */
          rules: {
            '@nx/workspace-consistent-callback-type': 'error',
            '@nx/workspace-no-restricted-globals': restrictedGlobals.react,
            '@nx/workspace-no-missing-jsx-pragma': ['error', { runtime: 'automatic' }],
          },
        }
      : {},
  },
};

exports.__internal = __internal;
