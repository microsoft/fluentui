import { getPerfRegressions } from './tasks/perf-test';
import { preset, task, series } from '@fluentui/scripts';
import { getAffectedPackages } from '../../scripts/monorepo';

preset();

task('run-perf-test', getPerfRegressions);

task('check-if-package-affected', () => {
  const affected =
    getAffectedPackages().has('@fluentui/react') || getAffectedPackages().has('@fluentui/react-components');
  if (affected) {
    console.log(`##vso[task.setvariable variable=RunPerfTest;]true`);
  }
});

task('perf-test', series('build', 'bundle', 'run-perf-test'));
