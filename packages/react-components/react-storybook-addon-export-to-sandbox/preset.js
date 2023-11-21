/* eslint-disable no-shadow */

const preset = require('./lib/preset/preset');

function config(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

module.exports = { config, ...preset };
