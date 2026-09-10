const fs = require('fs');
const path = require('path');

/**
 * Package root resolved via package.json instead of `__dirname`.
 * `@fluentui/scripts-storybook#loadWorkspaceAddon` copies this preset into `<pkg>/temp/preset.ts` during development,
 * so `__dirname` would point to the wrong folder there.
 */
function getPackageRoot() {
  return path.dirname(require.resolve('@fluentui/react-storybook-addon-playground/package.json'));
}

function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

/**
 * Serves the pre-built playground app (`dist/playground`) from the Storybook root -> `<storybook>/playground.html`
 *
 * @param {Array<string | {from:string;to:string}>} entry
 */
function staticDirs(entry = []) {
  const playgroundDist = path.join(getPackageRoot(), 'dist', 'playground');

  if (!fs.existsSync(playgroundDist)) {
    console.warn(
      `[@fluentui/react-storybook-addon-playground] "${playgroundDist}" does not exist. ` +
        'Run "nx run react-storybook-addon-playground:build-playground" to build the playground app.',
    );
    return entry;
  }

  return [...entry, { from: playgroundDist, to: '/' }];
}

module.exports = { previewAnnotations, staticDirs };
