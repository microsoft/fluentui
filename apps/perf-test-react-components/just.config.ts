import { preset, task, series, getPerfRegressions } from '@fluentui/scripts-tasks';

import { config } from './config/perf-test';

preset();

task('run-perf-test', () => getPerfRegressions(config));
task('perf-test:bundle', series('clean', 'copy', 'bundle'));
task('perf-test', 'run-perf-test');
