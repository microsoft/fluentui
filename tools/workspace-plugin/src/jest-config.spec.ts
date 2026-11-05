import { readJsonFile } from '@nx/devkit';
import type { ProjectConfiguration } from '@nx/devkit';
import { getJestProjectsAsync } from '@nx/jest';
import type { Config } from '@jest/types';
import { join } from 'node:path';
import { SourceTextModule } from 'node:vm';
import createJestConfig from '../../../jest.config';

jest.mock('@nx/jest', () => ({
  getJestProjectsAsync: jest.fn(),
}));

describe('root Jest configuration', () => {
  it.each(['.', 'tools/workspace-plugin', 'packages/react-components/react-button/library'])(
    'resolves workspace aliases from the repository root when started in %s',
    directory => {
      const workspaceRoot = join(__dirname, '../../..');
      const cwd = jest.spyOn(process, 'cwd').mockReturnValue(join(workspaceRoot, directory));

      try {
        jest.isolateModules(() => {
          const preset = jest.requireActual<Config.InitialOptions>('../../../jest.preset.js');
          expect(preset.moduleNameMapper?.['^@fluentui/react\\-conformance$']).toBe(
            `${workspaceRoot}/packages/react-conformance/src/index.ts`,
          );
        });
      } finally {
        cwd.mockRestore();
      }
    },
  );

  it('runs with VM modules enabled for Nx formatter imports', () => {
    expect(typeof SourceTextModule).toBe('function');
  });

  it('provides a root test entry point with VM modules enabled', () => {
    const workspaceProject = readJsonFile<ProjectConfiguration>(join(__dirname, '../../../project.json'));
    expect(workspaceProject.targets?.['test-workspace']).toEqual({
      executor: 'nx:run-commands',
      cache: false,
      options: {
        command: 'node --experimental-vm-modules ./node_modules/jest/bin/jest.js --config=./jest.config.ts',
      },
    });
  });

  it('includes the root configuration files in the workspace-plugin test inputs', () => {
    const pluginProject = readJsonFile<ProjectConfiguration>(join(__dirname, '../project.json'));
    expect(pluginProject.targets?.test.inputs).toEqual(
      expect.arrayContaining([
        'default',
        '^production',
        '{workspaceRoot}/jest.preset.js',
        '{workspaceRoot}/jest.config.ts',
        '{workspaceRoot}/project.json',
      ]),
    );
  });

  it('includes workspace-plugin alongside automatically discovered projects', async () => {
    jest.mocked(getJestProjectsAsync).mockResolvedValue(['<rootDir>/another-project/jest.config.ts']);

    expect((await createJestConfig()).projects).toEqual([
      '<rootDir>/another-project/jest.config.ts',
      '<rootDir>/tools/workspace-plugin/jest.config.ts',
    ]);
  });
});
