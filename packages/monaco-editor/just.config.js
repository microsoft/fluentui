const { just } = require('@uifabric/build');
const { task, series, copyInstructions, copyInstructionsTask, cleanTask } = just;
const path = require('path');
const fs = require('fs');
const { transformCssTask } = require('./transformCssTask');

const monacoEditorPath = path.dirname(require.resolve('monaco-editor/package.json'));

task(
  'build',
  series(
    cleanTask({ paths: ['lib'] }),
    copyInstructionsTask({
      copyInstructions: copyInstructions.copyFilesInDirectory(monacoEditorPath, path.join(__dirname, 'lib'))
    }),
    transformCssTask,
    () => {
      fs.unlinkSync(path.join(__dirname, 'lib', 'package.json'));
    }
  )
);
