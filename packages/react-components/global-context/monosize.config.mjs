// @ts-check

import webpackBundler from 'monosize-bundler-webpack';

import baseConfig from '../../../monosize.config.mjs';

/** @type {import('monosize').MonoSizeConfig} */
const config = {
  ...baseConfig,
  bundler: webpackBundler({
    enhanceConfig: config => {
      config.externals = config.externals ?? {};
      config.externals['@fluentui/react-context-selector'] = 'createContext';
      return config;
    },
  }),
};

export default config;
