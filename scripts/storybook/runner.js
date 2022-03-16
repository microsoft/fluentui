// @ts-check

/**
 * This is a start-storybook wrapper that automatically pre-builds dependencies that are needed to run storybook,
 * then invokes `start-storybook` so CLI experience is the same as running raw `start-storybook` binary
 *
 *
 * Note:
 * - This is used only for vNext packages
 * - We cannot leverage build-less experience unfortunately at the moment. To have it we will need a bigger overhaul of "how we build" things.
 *
 * @example
 *
 * ```sh
 * node ./scripts/storybook/runner
 * ```
 */

const { execSync } = require('child_process');
const chalk = require('chalk');
const getStorybookDependencies = require('./getStorybookDependencies');

main();

function main() {
  const args = process.argv.slice(2);
  const COMMAND_PREFIX = `${chalk.cyan('>')} ${chalk.inverse(chalk.bold(chalk.cyan(' STORYBOOK RUNNER ')))}`;
  const dependenciesToBuild = getStorybookDependencies();
  const shouldInvokeHelp = args.includes('--help');
  const shouldExecPreBuild = !shouldInvokeHelp && dependenciesToBuild.length > 0;

  const storybookCommand = `start-storybook ${args.join(' ')}`;
  const dependencyBuildCommand = `lage build --to ${dependenciesToBuild.map(dep => dep.name).join(' ')}`;

  printTitle();

  if (shouldExecPreBuild) {
    printDependencies();

    execSync(dependencyBuildCommand, { stdio: 'inherit' });
  }

  execSync(storybookCommand, { stdio: 'inherit' });

  function printTitle() {
    console.log(
      COMMAND_PREFIX,
      shouldExecPreBuild
        ? `pre-building dependencies needed to run storybook:\n`
        : 'no pre-building needed. Running storybook...\n',
    );
  }

  function printDependencies() {
    dependenciesToBuild.map(dep => {
      console.log(`${chalk.bold(dep.name)} (${dep.description})`);
    });

    process.stdout.write('\n');
  }
}
