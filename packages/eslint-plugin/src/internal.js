function shouldRegisterInternal() {
  try {
    const hasNxEslintPlugin = require.resolve('@nx/eslint-plugin');
    return Boolean(hasNxEslintPlugin);
  } catch (err) {
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
  plugins: shouldRegister ? ['@nx'] : [],
};

exports.__internal = __internal;
