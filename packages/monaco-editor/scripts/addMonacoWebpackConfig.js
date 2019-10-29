// @ts-check

const path = require('path');
const webpack = require('webpack');
// This script shouldn't depend on @uifabric/build since it's meant as a utility for other packages
// (potentially outside our repo)

/**
 * Add Monaco-related webpack configuration to an existing config object.
 * @param {webpack.Configuration & { [key: string]: any }} config - Webpack config to merge the
 * monaco-related config into. It must be an object (not an array or function). `config.entry`
 * also must be an object (not a string, array, or function).
 * @param {boolean} [includeAllLanguages] - If true, include all language contributions in the main
 * Monaco bundle and add entry configs for CSS/HTML/JSON workers in addition to TS. If false (default),
 * only include TS features.
 * @returns {webpack.Configuration & { [key: string]: any }} The merged config
 */
function addMonacoWebpackConfig(config, includeAllLanguages) {
  if (Array.isArray(config) || typeof config === 'function') {
    throw new Error('config passed to addMonacoConfig must be an object, not an array or function.');
  }

  const { entry, output, externals, resolve } = config;
  if (!entry || typeof entry !== 'object') {
    throw new Error(`config.entry passed to addMonacoWebpackConfig must be an object. Got: ${JSON.stringify(entry)}`);
  }

  // As of monaco-editor@0.18.1, typescriptServices.js includes a direct require for this package,
  // which breaks webpack. Use an external to get rid of it (this works since the require is
  // wrapped in a try/catch). Will be fixed once this merges and is published.
  // https://github.com/microsoft/monaco-typescript/pull/49
  /** @type {webpack.ExternalsElement[]} */
  const newExternals = [{ '@microsoft/typescript-etw': 'FakeModule' }];
  if (externals) {
    if (Array.isArray(externals)) {
      newExternals.push(...externals);
    } else {
      newExternals.push(externals);
    }
  }

  // Somewhat based on https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-esm.md
  return {
    ...config,
    entry: {
      .../** @type {webpack.Entry} */ (entry),
      'editor.worker': '@uifabric/monaco-editor/esm/vs/editor/editor.worker.js',
      'ts.worker': '@uifabric/monaco-editor/esm/vs/language/typescript/ts.worker.js',
      ...(includeAllLanguages
        ? {
            'css.worker': '@uifabric/monaco-editor/esm/vs/language/css/css.worker.js',
            'html.worker': '@uifabric/monaco-editor/esm/vs/language/html/html.worker.js',
            'json.worker': '@uifabric/monaco-editor/esm/vs/language/json/json.worker.js'
          }
        : {})
    },
    externals: newExternals,
    output: {
      ...output,
      globalObject: 'self' // required for monaco--see https://github.com/webpack/webpack/issues/6642
    },
    resolve: {
      ...resolve,
      alias: {
        ...resolve.alias,
        // Alias monaco-editor imports to version with transformed CSS
        'monaco-editor': '@uifabric/monaco-editor',
        // Alias @uifabric/monaco-editor imports to either monacoBundle.js (to include all languages)
        // or monacoCoreBundle.js (to include only the editor and TS). Either of these bundle files
        // also attempts to set up the global MonacoEnvironment.
        '@uifabric/monaco-editor$': path.resolve(__dirname, '../lib', includeAllLanguages ? 'monacoBundle.js' : 'monacoCoreBundle.js')
      }
    }
  };
}

module.exports = { addMonacoWebpackConfig };
