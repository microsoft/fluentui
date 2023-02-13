// @ts-check

import baseConfig from '../../../monosize.config.mjs';

/** @type {import('monosize').MonoSizeConfig} */
const config = {
  ...baseConfig,
  webpack: config => {
    config.externals['@fluentui/react-context-selector'] = 'createContext';
    return config;
  },
};

export default config;
