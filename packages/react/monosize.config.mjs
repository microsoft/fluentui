// @ts-check

import webpackBundler from 'monosize-bundler-webpack';

import baseConfig from '../../monosize.config.mjs';

/** @type {import('monosize').MonoSizeConfig} */
const monosizeConfig = {
  ...baseConfig,
  bundler: webpackBundler(config => {
    const normalizedTarget = /** @type {string[]}*/ (Array.isArray(config.target) ? config.target : [config.target]);
    config.target = [
      ...normalizedTarget,
      /**
       * As of webpack 5, you have to add the `es5` target for IE 11 compatibility.
       * Otherwise it will output lambdas for smaller bundle size.
       * @see https://webpack.js.org/migrate/5/#need-to-support-an-older-browser-like-ie-11
       *
       * NOTE: IE 11 compat is still needed? for fluentui/react (v8) ?
       */
      'es5',
    ];

    return config;
  }),
};

export default monosizeConfig;
