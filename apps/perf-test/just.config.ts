import { getPerfRegressions } from './tasks/perf-test';
import { preset, task, series, condition } from '@fluentui/scripts';
import { getAffectedPackages, findGitRoot } from '../../scripts/monorepo';
import { spawnSync } from 'child_process';

preset();

task('run-lage', () => {
  console.log('Affected packages ', getAffectedPackages());
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

task(
  'perf-test',
  series(
    condition(
      'run-lage',
      () => getAffectedPackages().has('@fluentui/react') || getAffectedPackages().has('@fluentui/react-components'),
    ),
    condition(
      'build',
      () => getAffectedPackages().has('@fluentui/react') || getAffectedPackages().has('@fluentui/react-components'),
    ),
    condition(
      'bundle',
      () => getAffectedPackages().has('@fluentui/react') || getAffectedPackages().has('@fluentui/react-components'),
    ),
    condition(
      'run-perf-test',
      () => getAffectedPackages().has('@fluentui/react') || getAffectedPackages().has('@fluentui/react-components'),
    ),
  ),
);
