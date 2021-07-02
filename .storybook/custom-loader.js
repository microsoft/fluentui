const excludePlugins = ['module:@fluentui/babel-make-styles'];

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

      return {
        ...cfg.options,
        plugins: pluginsToInclude,
      };
    },
  };
};
