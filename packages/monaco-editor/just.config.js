// @ts-check
const { just, preset } = require('@uifabric/build');
const { task, series, parallel, copyInstructions, copyInstructionsTask, cleanTask } = just;
const { ts } = require('@uifabric/build/tasks/ts');
const path = require('path');
const { transformCssTask } = require('./tasks/transformCssTask');

const monacoEditorPath = path.dirname(require.resolve('monaco-editor/package.json'));

preset.basic();

task('clean', cleanTask({ paths: ['esm', 'lib', 'lib-commonjs'] }));
task(
  'copy',
  copyInstructionsTask({
    copyInstructions: copyInstructions.copyFilesInDirectory(path.join(monacoEditorPath, 'esm'), path.join(__dirname, 'esm'))
  })
);
task('transform-css', transformCssTask);
task('ts:esm', ts.esm);
task('ts:commonjs', ts.commonjs);
task('ts', parallel('ts:esm', 'ts:commonjs'));

task('build', series('clean', 'copy', 'transform-css', 'ts')).cached();
