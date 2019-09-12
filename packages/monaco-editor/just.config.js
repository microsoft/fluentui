const { preset, just } = require('@uifabric/build');
const { task, series, copyInstructions, copyInstructionsTask } = just;
const path = require('path');
const fs = require('fs');
const { transformCssTask } = require('./transformCssTask');

preset();

const monacoEditorPath = path.dirname(require.resolve('monaco-editor/package.json'));

task(
  'build',
  series(
    'clean',
    copyInstructionsTask({
      copyInstructions: copyInstructions.copyFilesToDestinationDirectory(monacoEditorPath, path.join(__dirname, 'lib'))
    }),
    transformCssTask,
    () => {
      fs.unlinkSync(path.join(__dirname, 'lib', 'package.json'));
    }
  )
);
