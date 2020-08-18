module.exports = {
  trailingSlash: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.unshift({
      test: /\.(tsx|ts)$/,
      include: Object.values(require('lerna-alias').rollup({ sourceDirectory: false })).map(dir =>
        require('path').join(dir, 'src'),
      ),
      use: [defaultLoaders.babel],
    });

    // console.log(config.module.rules, defaultLoaders);
    // throw new Error();
    // Important: return the modified config
    return config;
  },
};
