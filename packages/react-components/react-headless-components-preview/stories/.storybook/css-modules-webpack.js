/**
 * Enables CSS Modules with debuggable class names in a Storybook webpack config.
 *
 * css-loader v5+ auto-detects `*.module.css` files via `modules.auto: true` (its default).
 * This helper finds Storybook's built-in `\.css$` rule and sets a human-readable `localIdentName`.
 *
 * @param {{ config: import('webpack').Configuration }} options
 */
function registerCssModuleRules({ config }) {
  /**
   * @param {string} detail
   * @returns {never}
   */
  const fail = detail => {
    throw new Error(
      `registerCssModuleRules: ${detail}. Storybook's internal webpack config may have changed — please update this helper.`,
    );
  };

  const rules = config.module?.rules ?? [];

  for (const rule of rules) {
    if (!rule || typeof rule !== 'object') continue;
    if (!(rule.test instanceof RegExp) || rule.test.source !== /\.css$/.source) continue;

    const loaders = Array.isArray(rule.use) ? rule.use : [];
    const cssLoaderEntry = loaders.find(
      entry =>
        typeof entry === 'object' &&
        entry !== null &&
        'loader' in entry &&
        /\bcss-loader\b/.test(/** @type {string} */ (entry.loader)),
    );

    if (!cssLoaderEntry || typeof cssLoaderEntry !== 'object' || !('options' in cssLoaderEntry)) {
      fail('found the .css$ rule but it no longer contains a css-loader entry');
    }

    /** @type {{ options?: string | Record<string, unknown> }} */
    const loader = cssLoaderEntry;

    loader.options = {
      ...(typeof loader.options === 'object' ? loader.options : {}),
      modules: { auto: true, localIdentName: '[name]__[local]--[hash:base64:5]' },
    };
    return;
  }

  fail('could not find the default .css$ webpack rule');
}

module.exports = {
  registerCssModuleRules,
};
