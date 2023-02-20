import { Tree, logger } from '@nrwl/devkit';
import * as path from 'path';
import * as childProcess from 'child_process';
import * as chalk from 'chalk';

import type { CliOptions } from 'beachball/lib/types/BeachballOptions';

type WithoutNullable<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

interface ChangeFileOptions
  extends WithoutNullable<Pick<CliOptions, 'message' | 'type'>>,
    Partial<NonNullable<Pick<CliOptions, 'dependentChangeType'>>> {}

/**
 *
 * This is not intended to be used yet - added this here only for inspiration/reference.
 *
 * Beacbball determines changes only on staged files. To make this work as expected (good DX),
 * we would need to manually git stage all files affected by generator
 */
function _generateChangeFiles(tree: Tree, options: { cwd?: string } & ChangeFileOptions) {
  const { cwd = '', ...generateChangefileOptions } = options;
  const usedCwd = path.join(tree.root, cwd);
  const cmd = `yarn ${createCommand(generateChangefileOptions)}`;

  childProcess.execSync(cmd, {
    cwd: usedCwd,
    stdio: 'inherit',
  });
}

function createCommand(options: ChangeFileOptions) {
  const cmd = 'beachball change --scope "!packages/fluentui/*" --no-commit';
  const flags = Object.entries({
    message: options.message,
    type: options.type,
    'dependent-change-type': options.dependentChangeType,
  })
    .map(([flag, value]) => {
      if (value) {
        return `--${flag} "${value}"`;
      }
      return;
    })
    .filter(Boolean) as string[];

  return `${cmd} ${flags.join(' ')}`;
}

export function generateChangeFilesHelp(options: ChangeFileOptions) {
  const cmd = `yarn ${createCommand(options)}`;
  logger.info(printTitle('Changefiles generation instructions:'));
  logger.info(chalk.bold(`\t1. Make sure your files are staged`));
  logger.info(chalk.bold(`\t2. Run following command:`));
  logger.info('');
  logger.info(`\t${chalk.italic.green(cmd)}`);
  logger.info('');
}

const printTitle = (title: string) => `${chalk.cyan('>')} ${chalk.inverse(chalk.bold(chalk.cyan(` ${title} `)))}\n`;
