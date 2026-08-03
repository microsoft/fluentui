// @ts-check

import baseConfig from '../../../../monosize.config.mjs';

/** @type {import('monosize').MonoSizeConfig} */
const monosizeConfig = {
  ...baseConfig,
  threshold: '10kB',
};

export default monosizeConfig;
