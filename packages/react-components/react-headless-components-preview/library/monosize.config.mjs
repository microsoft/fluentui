// @ts-check

import baseConfig from '../../../../monosize.config.mjs';

/** @type {import('monosize').MonoSizeConfig} */
const monosizeConfig = {
  ...baseConfig,
  // Adding Calendar grows the aggregate fixture by 15.2% minified and 16.5% gzip.
  threshold: '17%',
};

export default monosizeConfig;
