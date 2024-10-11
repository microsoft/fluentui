import { getPackageManagerCommand, workspaceRoot } from '@nx/devkit';
import { runCommand } from '@nx/plugin/testing';

import { isVerbose, stripConsoleColors } from './testing-utils';

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
