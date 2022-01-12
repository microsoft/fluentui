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

main();

function main() {
  const args = process.argv.slice(2);
  const COMMAND_PREFIX = `${chalk.cyan('>')} ${chalk.inverse(chalk.bold(chalk.cyan(' STORYBOOK RUNNER ')))}`;
  const dependencies = [
    { name: '@fluentui/babel-make-styles', description: 'custom babel plugin that compiles make-styles definitions' },
    {
      name: '@fluentui/react-storybook-addon',
      description: 'fluentui storybook addon that adds functionality to storybook',
    },
  ];

  const sbCommand = `start-storybook ${args.join(' ')}`;
  const dependencyBuildCommand = `lage build --to ${dependencies.map(dep => dep.name).join(' ')}`;

  console.log(COMMAND_PREFIX, shouldInvokeHelp() ? '\n' : `pre-building dependencies needed to run storybook:\n`);

  if (!shouldInvokeHelp()) {
    listDependencies();
    execSync(dependencyBuildCommand, { stdio: [0, 1, 2] });
  }

  execSync(sbCommand, { stdio: [0, 1, 2] });

  function shouldInvokeHelp() {
    return args.includes('--help');
  }

  function listDependencies() {
    dependencies.map(dep => {
      console.log(`${chalk.bold(dep.name)} (${dep.description})`);
    });

    process.stdout.write('\n');
  }
}
