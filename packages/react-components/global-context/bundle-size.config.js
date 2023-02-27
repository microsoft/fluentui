// @ts-check

module.exports = {
  webpack: (/** @type {import('webpack').Configuration} */ config) => {
    config.externals['@fluentui/react-context-selector'] = 'createContext';
    return config;
  },
};
