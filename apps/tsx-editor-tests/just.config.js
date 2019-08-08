// @ts-check

const { just } = require('@uifabric/build');
const { clean } = require('@uifabric/build/tasks/clean');
const { tslint } = require('@uifabric/build/tasks/tslint');
const { jest, jestWatch } = require('@uifabric/build/tasks/jest');
const prettier = require('@uifabric/build/tasks/prettier');
const { task, series, option, condition, argv } = just;

option('min', { alias: 'npm-install-mode' });

task('clean', clean);
task('tslint', tslint);
task('jest', jest(true));
task('jest-watch', jestWatch(true));
task('prettier', prettier);

task('validate', series('tslint', 'jest'));
task('code-style', series('prettier', 'tslint'));

task('build', series('clean', condition('validate', () => !argv().min))).cached();
