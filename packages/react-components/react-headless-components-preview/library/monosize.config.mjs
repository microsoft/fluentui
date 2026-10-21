// @ts-check

import baseConfig from '../../../../monosize.config.mjs';

/** @type {import('monosize').MonoSizeConfig} */
const monosizeConfig = {
  ...baseConfig,
  // Calendar adds more than 10% to the aggregate full-library fixture.
  threshold: '20%',
};

export default monosizeConfig;
