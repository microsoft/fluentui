const excludePresets = ['@griffel'];

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
