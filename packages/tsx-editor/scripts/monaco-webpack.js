// @ts-check

const merge = require('@uifabric/build/tasks/merge');

function addMonacoConfig(config) {
  return merge(
    {
      entry: {
        'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
        'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker.js'
      },
      output: {
        globalObject: 'self' // required for monaco--see https://github.com/webpack/webpack/issues/6642
      }
    },
    config
  );
}

module.exports = { addMonacoConfig };
