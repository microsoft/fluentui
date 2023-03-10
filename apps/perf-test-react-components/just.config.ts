import { getPerfRegressions } from './tasks/perf-test';
import { preset, task, series } from '@fluentui/scripts-tasks';

preset();

task('run-perf-test', getPerfRegressions);
task('perf-test', series('build', 'bundle', 'run-perf-test'));
