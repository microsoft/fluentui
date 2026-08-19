/**
 * CommonJS bridge for Storybook's preset API. Preview and manager entries point to browser-resolved paths.
 */
const preset = require('./lib-commonjs/preset/preset');
const { isStateDataAttributesConfigured } = require('./lib-commonjs/preset/options');

function previewAnnotations(entry = [], options = {}) {
  const annotations = [...entry, require.resolve('./lib/preset/preview')];

  if (isStateDataAttributesConfigured(options)) {
    annotations.push(require.resolve('./lib/preset/stateDataAttributesPreview'));
  }

  return annotations;
}

function managerEntries(entry = []) {
  return [...entry, require.resolve('./lib/preset/manager')];
}

module.exports = { managerEntries, previewAnnotations, ...preset };
