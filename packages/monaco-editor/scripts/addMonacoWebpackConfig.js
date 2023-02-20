// @ts-check

const fs = require('fs');
const path = require('path');
// This script shouldn't depend on @fluentui/scripts since it's meant as a utility for other packages
// (potentially outside our repo)

/**
 * Add Monaco-related webpack configuration to an existing config object.
 * @param {import('webpack').Configuration & { [key: string]: any }} config - Webpack config to merge the
 * monaco-related config into. It must be an object (not an array or function). `config.entry`
 * also must be an object (not a string, array, or function).
 * @param {Object} [options]
 * @param {boolean} [options.includeAllLanguages] - If true, include all language contributions in the main
 * Monaco bundle and add entry configs for CSS/HTML/JSON workers in addition to TS. If false (default),
 * only include TS features.
 * @param {string} [options.outDir] - Absolute path to the output directory (required if you want to copy fonts)
 * @returns {import('webpack').Configuration & { [key: string]: any }} The merged config
 */
function addMonacoWebpackConfig(config, options = {}) {
  // back-compat with old signature
  if (typeof options === 'boolean') {
    options = { includeAllLanguages: options };
  }

  const { includeAllLanguages, outDir } = options;

  if (Array.isArray(config) || typeof config === 'function') {
    throw new Error('config passed to addMonacoConfig must be an object, not an array or function.');
  }

  const { entry } = config;
  if (!entry || Array.isArray(entry) || typeof entry !== 'object') {
    throw new Error(`config.entry passed to addMonacoWebpackConfig must be an object. Got: ${JSON.stringify(entry)}`);
  }

  /** @type {import('webpack').WebpackPluginInstance[]} */
  const extraPlugins = [];
  if (outDir) {
    try {
      // copy-webpack-plugin is not listed in dependencies or peerDependencies because it's optional
      const CopyWebpackPlugin = require('copy-webpack-plugin');
      const fontPath = path.resolve(__dirname, '../esm/vs/base/browser/ui/codicons/codicon/codicon.ttf');
      if (fs.existsSync(fontPath)) {
        extraPlugins.push(new CopyWebpackPlugin({ patterns: [{ from: fontPath, to: outDir }] }));
      } else {
        console.warn(`[addMonacoWebpackConfig] Monaco icon font not found at ${fontPath}`);
      }
    } catch (err) {
      console.warn('[addMonacoWebpackConfig] To copy fonts, please ensure copy-webpack-plugin is installed');
    }
  } else {
    console.warn(
      '[addMonacoWebpackConfig] To copy fonts, please ensure outDir is specified and copy-webpack-plugin is installed',
    );
  }

  // Somewhat based on https://github.com/microsoft/monaco-editor/blob/master/docs/integrate-esm.md
  return {
    ...config,
    entry: {
      .../** @type {import('webpack').EntryObject} */ (entry),
      'editor.worker': '@fluentui/monaco-editor/esm/vs/editor/editor.worker.js',
      'ts.worker': '@fluentui/monaco-editor/esm/vs/language/typescript/ts.worker.js',
      ...(includeAllLanguages
        ? {
            'css.worker': '@fluentui/monaco-editor/esm/vs/language/css/css.worker.js',
            'html.worker': '@fluentui/monaco-editor/esm/vs/language/html/html.worker.js',
            'json.worker': '@fluentui/monaco-editor/esm/vs/language/json/json.worker.js',
          }
        : {}),
    },
    output: {
      ...config.output,
      globalObject: 'self', // required for monaco--see https://github.com/webpack/webpack/issues/6642
    },
    plugins: [...(config.plugins || []), ...extraPlugins],
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // Alias monaco-editor imports to version with transformed CSS
        'monaco-editor': '@fluentui/monaco-editor',
        // Alias @fluentui/monaco-editor imports to either monacoBundle.js (to include all languages)
        // or monacoCoreBundle.js (to include only the editor and TS). Either of these bundle files
        // also attempts to set up the global MonacoEnvironment.
        '@fluentui/monaco-editor$': path.resolve(
          __dirname,
          '../lib',
          includeAllLanguages ? 'monacoBundle.js' : 'monacoCoreBundle.js',
        ),
      },
    },
  };
}

module.exports = { addMonacoWebpackConfig };
