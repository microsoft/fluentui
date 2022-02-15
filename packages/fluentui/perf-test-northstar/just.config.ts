import path from 'path';
import { preset, series, task, argv, condition } from '@fluentui/scripts';
import { getResolveLoaderDirs } from '@fluentui/scripts/webpack/webpack-resources';
import { getAffectedPackages, findGitRoot } from '../../../scripts/monorepo';
import { spawnSync } from 'child_process';
preset();

// TODO: FUR integration issues
// - FUR build fails when it comes across these new packages inside of packages/
// - How to hand off gulp build to just build for these new packages?
// - LF linting doesn't account for git CRLF => LF configurations
// - Existing perf story format diverges from CSF format, requiring special loader.
function bundleStories() {
  return async function () {
    // delay require in case digest isn't built yet
    const { digestStories } = require('@fluentui/digest');
    await digestStories({
      configDir: path.join(__dirname, '.digest'),
      outputDir: path.join(__dirname, 'dist'),
      resolveDirs: getResolveLoaderDirs(),
    });
  };
}

// TODO: how should this be integrated with the default 'build' task?
// TODO: add config and output dir settings like buildStorybookTask
// TODO: perf-text prefix naming required?
task('perf-test:bundle', bundleStories());

task('perf-test:run', () => {
  // delay require in case digest isn't built yet
  const runPerfTest = require('./tasks/perf-test').default;

  return runPerfTest(argv().base);
});

task('run-lage', () => {
  console.log('Affected packages ', getAffectedPackages());

  const gitRoot = findGitRoot();
  const result = spawnSync('yarn', ['lage', 'build', '--to', '@fluentui/perf-test-northstar', '--verbose'], {
    cwd: gitRoot,
    shell: true,
    encoding: 'utf-8',
  });
  if (result.status !== 0) {
    throw new Error(`yarn lage build --to @fluentui/perf-test-northstar --verbose failed with status ${result.status}`);
  } else {
    console.log(result.stderr);
  }
});

// TOOD: is build doing anything meaningful? only if there's source that's not a just script?
// TODO: if stories/scenarios are added in this package, make sure build catches type errors
task(
  'perf-test',
  series(
    condition('run-lage', () => getAffectedPackages().has('@fluentui/react-northstar')),
    condition('build', () => getAffectedPackages().has('@fluentui/react-northstar')),
    condition('perf-test:bundle', () => getAffectedPackages().has('@fluentui/react-northstar')),
    condition('perf-test:run', () => getAffectedPackages().has('@fluentui/react-northstar')),
  ),
);

// TODO: Uncomment once stories can be referred to in a dependency.
// This command will not be reliable until perf stories are in a package that can be set as a dep.
// For now, the repo must be built with 'yarn build' before perf-test will build successfully.
// task('build', series('build', 'perf-test:bundle'))
