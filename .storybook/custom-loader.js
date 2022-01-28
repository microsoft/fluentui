const excludePlugins = ['module:@fluentui/babel-make-styles'];
const excludePresets = ['@griffel'];

module.exports = () => {
  return {
    /**
     * @see https://github.com/babel/babel-loader#options
     * @param {import('@babel/core').PartialConfig} cfg - Passed Babel's 'PartialConfig' object.
     */
    config(cfg) {
      const existingPlugins = /** @type {Required<import('@babel/core').ConfigItem[]>} */ (cfg.options.plugins || []);
      const pluginsToInclude = existingPlugins.filter(plugin => {
        const requestedPlugin = /** @type {NonNullable<typeof plugin['file']>} */ (plugin.file).request;

        return !excludePlugins.includes(requestedPlugin);
      });

      const existingPresets = /** @type {Required<import('@babel/core').ConfigItem[]>} */ (cfg.options.presets || []);
      const presetsToInclude = existingPresets.filter(plugin => {
        const requestedPreset = /** @type {NonNullable<typeof plugin['file']>} */ (plugin.file).request;

        return !excludePresets.includes(requestedPreset);
      });

      return {
        ...cfg.options,
        plugins: pluginsToInclude,
        presets: presetsToInclude,
      };
    },
  };
};
