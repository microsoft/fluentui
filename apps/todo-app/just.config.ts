// Just build configuration file
// https://microsoft.github.io/just/

// Intentionally NOT using @fluentui/scripts here so others can more easily copy the setup
import {
  task,
  series,
  parallel,
  option,
  cleanTask,
  copyTask,
  tscTask,
  jestTask,
  webpackDevServerTask,
  defaultCleanPaths,
  eslintTask,
} from 'just-scripts';
import * as path from 'path';

option('min');

task('clean', cleanTask([...defaultCleanPaths(), 'lib-commonjs']));

task(
  'copy',
  copyTask({
    dest: path.join(__dirname, 'dist'),
    paths: [path.join(__dirname, 'index.html')],
  }),
);

task('ts:esm', tscTask({ module: 'esnext', outDir: 'lib' }));
task('ts:commonjs', tscTask({ module: 'commonjs', outDir: 'lib-commonjs' }));
task('ts:watch', tscTask({ module: 'esnext', outDir: 'lib', watch: true }));
task('ts', parallel('ts:commonjs', 'ts:esm'));

task('jest', jestTask());
task('jest:watch', jestTask({ watch: true }));

task(
  'eslint',
  eslintTask({
    files: [path.join(process.cwd(), 'src')],
    extensions: 'ts,tsx',
    cache: true,
    fix: process.argv.includes('--fix'),
  }),
);
task('lint', 'eslint');

task('webpack:watch', webpackDevServerTask());

task('validate', series('eslint', 'jest'));

task('test', 'jest');

task('dev', series('copy', 'webpack:watch'));

task('build', series('clean', 'copy', 'ts')).cached();
