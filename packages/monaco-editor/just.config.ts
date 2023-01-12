import {
  basicPreset,
  task,
  series,
  parallel,
  copyInstructions,
  copyInstructionsTask,
  cleanTask,
  ts,
  postprocess,
  eslint,
} from '@fluentui/scripts-tasks';

import * as path from 'path';
import { transformCssTask } from './tasks/transformCssTask';

const monacoEditorPath = path.dirname(require.resolve('monaco-editor/package.json'));
const monacoSrcPath = path.join(monacoEditorPath, 'esm');
const monacoDestPath = path.join(__dirname, 'esm');

basicPreset();

task('clean', cleanTask({ paths: ['esm', 'lib', 'lib-commonjs'].map(p => path.join(process.cwd(), p)) }));
task(
  'copy',
  copyInstructionsTask({
    copyInstructions: copyInstructions.copyFilesInDirectory(monacoSrcPath, monacoDestPath),
  }),
);
task('transform-css', transformCssTask);
task('ts:esm', ts.esm);
task('ts:commonjs', ts.commonjs);
task('ts:postprocess', postprocess.postprocessTask([...postprocess.defaultLibPaths, 'esm/**/*.d.ts']));
task('ts', series(parallel('ts:esm', 'ts:commonjs'), 'ts:postprocess'));
task('eslint', eslint);

task('build', series('clean', 'copy', 'transform-css', 'ts')).cached!();

task('lint', 'eslint');
