import path from 'path';
import '@uifabric/build/tasks/preset';
import { series, task, argv } from '@uifabric/build';

// TODO: FUR integration issues
// - FUR build fails when it comes across these new packages inside of packages/
// - How to hand off gulp build to just build for these new packages?
// - LF linting doesn't account for git CRLF => LF configurations
// - Existing perf story format diverges from CSF format, requiring special loader.
function bundleStories() {
  return async function() {
    // delay require in case digest isn't built yet
    const { digestStories } = require('@fluentui/digest');
    await digestStories({
      configDir: path.join(__dirname, '.digest'),
      outputDir: path.join(__dirname, 'dist'),
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

// TOOD: is build doing anything meaningful? only if there's source that's not a just script?
// TODO: if stories/scenarios are added in this package, make sure build catches type errors
task('perf-test', series('build', 'perf-test:bundle', 'perf-test:run'));

// TODO: Uncomment once stories can be referred to in a dependency.
// This command will not be reliable until perf stories are in a package that can be set as a dep.
// For now, the repo must be built with 'yarn build' before perf-test will build successfully.
// task('build', series('build', 'perf-test:bundle'))
