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
 * Runtime packages that must not be reachable from v9 base hooks (`use<Name>Base_unstable`).
 *
 * Configured explicitly instead of relying on the rule default so the boundary enforced at lint
 * time stays in sync with, and visible next to, the `forbiddenPackages` asserted at build time by
 * `bundle-isolation.config.json`.
 *
 * Names are matched exactly, so a package and its satellites have to be listed separately —
 * `@fluentui/react-motion-components-preview` is not covered by `@fluentui/react-motion`, and the
 * `@griffel/*` glob the bundle config uses has to be spelled out here.
 */
const baseHookForbiddenRuntimes = [
  'tabster',
  '@fluentui/react-icons',
  '@fluentui/react-motion',
  '@fluentui/react-motion-components-preview',
  '@griffel/react',
  '@griffel/core',
];

/**
 *
 * this will be removed after https://github.com/microsoft/fluentui/issues/30332
 *
 * expands this with rulesets/overrides that are necessary for specific configs
 *
 * @internal
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
            '@nx/workspace-base-hook-signature': 'error',
            '@nx/workspace-base-hook-no-forbidden-runtime': ['error', { forbiddenRuntimes: baseHookForbiddenRuntimes }],
            '@nx/workspace-no-restricted-globals': restrictedGlobals.react,
            '@nx/workspace-no-missing-jsx-pragma': ['error', { runtime: 'automatic' }],
          },
        }
      : {},
  },
};

exports.__internal = __internal;
