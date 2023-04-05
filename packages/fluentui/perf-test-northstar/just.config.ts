import path from 'path';
import { execSync } from 'child_process';
import { series, task, argv, taskPresets } from 'just-scripts';
import { config } from './tasks/perf-test.config';

taskPresets.lib();

// TODO: FUR integration issues
// - FUR build fails when it comes across these new packages inside of packages/
// - How to hand off gulp build to just build for these new packages?
// - LF linting doesn't account for git CRLF => LF configurations
// - Existing perf story format diverges from CSF format, requiring special loader.
function bundleStories() {
  return async function () {
    buildDependencies();
    // delay require in case digest isn't built yet
    const { digestStories } = require('@fluentui/digest');
    await digestStories({
      configDir: path.join(__dirname, '.digest'),
      outputDir: path.join(__dirname, 'dist'),
    });
  };
}

function buildDependencies() {
  const cmd = 'yarn workspace @fluentui/digest build';
  console.log(`exec: ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

// TODO: how should this be integrated with the default 'build' task?
// TODO: add config and output dir settings like buildStorybookTask
// TODO: perf-text prefix naming required?
task('perf-test:bundle', bundleStories());

task('perf-test:run', () => {
  // delay require in case digest isn't built yet
  const { getPerfRegressions } = require('./tasks/perf-test') as typeof import('./tasks/perf-test');

  return getPerfRegressions(config, (argv() as { base?: boolean }).base);
});

// TODO: if stories/scenarios are added in this package, make sure build catches type errors
task('perf-test', series('perf-test:bundle', 'perf-test:run'));

// TODO: Uncomment once stories can be referred to in a dependency.
// This command will not be reliable until perf stories are in a package that can be set as a dep.
// For now, the repo must be built with 'yarn build' before perf-test will build successfully.
// task('build', series('build', 'perf-test:bundle'))
