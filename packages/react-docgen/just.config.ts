import * as path from 'path';
import { task, series, tscTask, cleanTask, tslintTask, prettierTask } from 'just-scripts';

// This package directly depends on just-scripts and creates its own config to avoid a
// dependency cycle with @uifabric/build.

task('clean', cleanTask());
task('ts', tscTask());
task(
  'prettier',
  prettierTask({
    configPath: path.resolve(__dirname, '../../../prettier.config.js'),
    ignorePath: path.resolve(__dirname, '../../../.prettierignore'),
  }),
);
task('lint', tslintTask());

task('code-style', series('prettier', 'tslint'));

task('build', series('clean', 'ts')).cached();
