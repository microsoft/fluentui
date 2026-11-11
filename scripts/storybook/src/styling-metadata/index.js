// @ts-check

const LOADER_PATH = require.resolve('./loader');

/**
 * @typedef {{
 *   config: import('webpack').Configuration;
 *   tsConfigPath: string;
 *   classNames?: boolean;
 *   dataAttributes?: boolean;
 *   include?: import('webpack').RuleSetCondition;
 * }} RegisterStylingMetadataRuleOptions
 */

/**
 * Registers the webpack `pre` loader that injects generated styling metadata
 * (`parameters.__generatedStylingMetadata`) into story metas. `@fluentui/react-storybook-addon` renders it
 * as "Data attributes" and "Classes" sections in the docs page.
 *
 * Calling it again replaces the previously registered rule, so a Storybook that extends another config can
 * switch sections (for example headless documents data attributes instead of class names).
 *
 * @param {RegisterStylingMetadataRuleOptions} options
 */
function registerStylingMetadataRule(options) {
  const { config, tsConfigPath, classNames = false, dataAttributes = false, include } = options;

  config.module = config.module ?? {};
  config.module.rules = (config.module.rules ?? []).filter(rule => !isStylingMetadataRule(rule));

  if (!classNames && !dataAttributes) {
    return config;
  }

  config.module.rules.push({
    test: /\.stories\.tsx$/,
    // Analyze the original TypeScript before any transpilation.
    enforce: 'pre',
    include: include ?? /[\\/]stories[\\/]src[\\/]/,
    exclude: /[\\/]node_modules[\\/]/,
    use: {
      loader: LOADER_PATH,
      /** @type {import('./loader').StylingMetadataLoaderOptions} */
      options: { tsConfigPath, classNames, dataAttributes },
    },
  });

  return config;
}

/** @param {unknown} rule */
function isStylingMetadataRule(rule) {
  const use = rule && typeof rule === 'object' ? /** @type {import('webpack').RuleSetRule} */ (rule).use : undefined;
  return Boolean(use && typeof use === 'object' && !Array.isArray(use) && use.loader === LOADER_PATH);
}

module.exports = { registerStylingMetadataRule };
