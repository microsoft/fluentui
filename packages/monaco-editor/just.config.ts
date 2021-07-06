import { preset, task, series, parallel, copyInstructions, copyInstructionsTask, cleanTask } from '@fluentui/scripts';
import { ts } from '@fluentui/scripts/tasks/ts';
import { postprocessTask, defaultLibPaths } from '@fluentui/scripts/tasks/postprocess';
import { eslint } from '@fluentui/scripts/tasks/eslint';
import * as path from 'path';
import { transformCssTask } from './tasks/transformCssTask';
import { transformDtsTask } from './tasks/transformDtsTask';

const monacoEditorPath = path.dirname(require.resolve('monaco-editor/package.json'));
const monacoSrcPath = path.join(monacoEditorPath, 'esm');
const monacoDestPath = path.join(__dirname, 'esm');

preset.basic();

task('clean', cleanTask({ paths: ['esm', 'lib', 'lib-commonjs'] }));
task(
  'copy',
  copyInstructionsTask({
    copyInstructions: copyInstructions.copyFilesInDirectory(monacoSrcPath, monacoDestPath),
  }),
);
task('transform-css', transformCssTask);
task('transform-dts', transformDtsTask);
task('ts:esm', ts.esm);
task('ts:commonjs', ts.commonjs);
task('ts:postprocess', postprocessTask([...defaultLibPaths, 'esm/**/*.d.ts']));
task('ts', series(parallel('ts:esm', 'ts:commonjs'), 'ts:postprocess'));
task('eslint', eslint);

task('build', series('clean', 'copy', 'transform-css', 'transform-dts', 'ts')).cached();

task('lint', 'eslint');
