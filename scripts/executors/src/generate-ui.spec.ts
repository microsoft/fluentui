import { getPackageManagerCommand, workspaceRoot } from '@nx/devkit';
import { runCommand } from '@nx/plugin/testing';

import { isVerbose, stripConsoleColors } from './testing-utils';

describe('generate CLI', () => {
  const pm = getPackageManagerCommand('yarn');

  it(`should run a smoke test`, () => {
    const command = 'generate';
    const fullCommand = `${pm.exec} ${command}`;
    const log = runCommand(fullCommand, { cwd: workspaceRoot });

    if (isVerbose()) {
      console.log('cli output:', { log: stripConsoleColors(log) });
    }

    expect(log).toEqual(expect.stringContaining('@fluentui/workspace-plugin - bundle-size-configuration - '));
    expect(log).toEqual(expect.stringContaining('@fluentui/workspace-plugin - cypress-component-configuration - '));
    expect(log).toEqual(expect.stringContaining('@fluentui/workspace-plugin - react-library - '));
    expect(log).toEqual(expect.stringContaining('@fluentui/workspace-plugin - react-component - '));
    expect(log).toEqual(expect.stringContaining('@fluentui/workspace-plugin - prepare-initial-release - '));
  }, 30000);
});
