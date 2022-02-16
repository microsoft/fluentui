import { getPerfRegressions } from './tasks/perf-test';
import { preset, task, series, condition } from '@fluentui/scripts';
import { getAffectedPackages, findGitRoot } from '../../scripts/monorepo';
import { spawnSync } from 'child_process';

preset();

task('lage-build', () => {
  const gitRoot = findGitRoot();
  const result = spawnSync('yarn', ['lage', 'build', '--to', 'perf-test', '--verbose'], {
    cwd: gitRoot,
    shell: true,
    encoding: 'utf-8',
  });
  if (result.status !== 0) {
    throw new Error(`yarn lage build --to -perf-test --verbose failed with status ${result.status}`);
  } else {
    console.log(result.stderr);
  }
});

task('run-perf-test', getPerfRegressions);

task('check-if-package-affected', () => {
  const affected =
    getAffectedPackages().has('@fluentui/react') || getAffectedPackages().has('@fluentui/react-components');
  if (affected) {
    console.log(`##vso[task.setvariable variable=RunPerfTest;]true`);
  }
});

task('perf-test', series('build', 'bundle', 'run-perf-test'));
