/* eslint-disable no-shadow */

// WHY is this importing from commonjs?
//
// Storybook expects presets to be commonjs, and we want to be able to export other things from this file (like webpack config) without Storybook trying to execute it.
// If we used ESM, Storybook would try to execute the file and fail because of the non-commonjs exports.
// This is limitation of our used legacy configuration via preset.js to support multiple Storybook versions.
//
// - `preset.js` needs to point to `./lib-commonjs/preset/preset` (proper CJS output) instead of `./lib/preset/preset` (ESM output).
// - The `previewAnnotations` path stays on `./lib/` since it's just a file path handed to the browser bundler.
const preset = require('./lib-commonjs/preset/preset');

function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

module.exports = { previewAnnotations, ...preset };
