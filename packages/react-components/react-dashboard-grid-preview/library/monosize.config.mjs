// @ts-check

import webpackBundler from 'monosize-bundler-webpack';

import baseConfig from '../../../../monosize.config.mjs';

/** @type {import('monosize').MonoSizeConfig} */
const monosizeConfig = {
  ...baseConfig,
  bundler: webpackBundler(config => {
    return config;
  }),
};

export default monosizeConfig;
