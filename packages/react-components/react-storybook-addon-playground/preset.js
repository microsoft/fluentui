const fs = require('fs');
const path = require('path');
const preset = require('./lib-commonjs/preset/preset');

function getPlaygroundRoot() {
  return path.dirname(require.resolve('@fluentui/react-playground/package.json'));
}

function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

/**
 * Serves the pre-built playground shell at `<storybook>/playground/app/playground.html`.
 *
 * @param {Array<string | {from:string;to:string}>} entry
 */
function staticDirs(entry = []) {
  const playgroundDist = path.join(getPlaygroundRoot(), 'dist', 'playground');

  if (!fs.existsSync(playgroundDist)) {
    console.warn(
      `[@fluentui/react-storybook-addon-playground] "${playgroundDist}" does not exist. ` +
        'Build @fluentui/react-playground before starting Storybook.',
    );
    return entry;
  }

  return [...entry, { from: playgroundDist, to: '/playground/app' }];
}

module.exports = { previewAnnotations, staticDirs, ...preset };
