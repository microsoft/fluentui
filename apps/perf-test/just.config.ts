import { preset, task, series } from '@fluentui/scripts-tasks';

import { getPerfRegressions } from './tasks/perf';

preset();

task('run-perf-test', getPerfRegressions);
task('perf-test', series('build', 'bundle', 'run-perf-test'));
