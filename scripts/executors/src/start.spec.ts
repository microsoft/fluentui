import { getPackageManagerCommand, workspaceRoot } from '@nx/devkit';
import { runCommand } from '@nx/plugin/testing';

describe('start CLI', () => {
  const pm = getPackageManagerCommand('yarn');

  it(`should run a smoke test`, () => {
    const command = 'start';
    const fullCommand = `${pm.exec} ${command}`;
    const log = runCommand(fullCommand, { cwd: workspaceRoot });

    if (isVerbose()) {
      console.log('cli output:', { log: stripConsoleColors(log) });
    }

    expect(log).toEqual(expect.stringContaining('WELCOME TO FLUENT UI'));
    expect(log).toEqual(expect.stringContaining('Select project to run'));
    expect(log).toEqual(expect.stringContaining('(Scroll up and down to reveal more choices)'));
  }, 30000);
});

// ===== test utils =====

function isVerbose() {
  return process.env.NX_VERBOSE_LOGGING === 'true' || process.argv.includes('--verbose');
}

/**
 * Remove log colors for fail proof string search
 *
 * > copied from https://github.com/nrwl/nx/blob/c400ea3002eba058d4e4ca02b3b5144ace306f15/e2e/utils/log-utils.ts#L42
 */
export function stripConsoleColors(log: string): string {
  return log?.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}
