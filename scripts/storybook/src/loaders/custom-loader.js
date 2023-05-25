const excludePresets = ['@griffel', '@fluentui/scripts-babel/preset-v9'];

/**
 * Custom babel loader used with [`customize` babel-loader config](https://github.com/babel/babel-loader#customized-loader)
 * The customize prop is being set by {@link ./../utils#processBabelLoaderOptions}
 *
 * @returns
 */
module.exports = () => {
  return {
    /**
     * @see https://github.com/babel/babel-loader#options
     * @param {import('@babel/core').PartialConfig} cfg - Passed Babel's 'PartialConfig' object.
     */
    config(cfg) {
      const existingPresets = /** @type {Required<import('@babel/core').ConfigItem[]>} */ (cfg.options.presets || []);
      const presetsToInclude = existingPresets.filter(plugin => {
        const requestedPreset = /** @type {NonNullable<typeof plugin['file']>} */ (plugin.file).request;

        return !excludePresets.includes(requestedPreset);
      });

      return {
        ...cfg.options,
        presets: presetsToInclude,
      };
    },
  };
};
