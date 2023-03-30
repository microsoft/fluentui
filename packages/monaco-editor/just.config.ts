import { preset, task, series, parallel, cleanTask, postprocessTask } from '@fluentui/scripts-tasks';

import * as path from 'path';
import { transformCssTask } from './tasks/transformCssTask';

preset();

task('clean', cleanTask({ paths: ['esm', 'lib', 'lib-commonjs'].map(p => path.join(process.cwd(), p)) }));
task('transform-css', transformCssTask);
task('ts:postprocess', postprocessTask([...postprocessTask.defaultLibPaths, 'esm/**/*.d.ts']));
task('ts', series(parallel('ts:esm', 'ts:commonjs'), 'ts:postprocess'));

task('build', series('clean', 'copy', 'transform-css', 'ts', 'lint-imports:all')).cached!();

task('lint', 'eslint');
