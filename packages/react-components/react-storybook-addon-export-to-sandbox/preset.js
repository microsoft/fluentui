/* eslint-disable no-shadow */

const preset = require('./lib/preset/preset');

function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

module.exports = { previewAnnotations, ...preset };
