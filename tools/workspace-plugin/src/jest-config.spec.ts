import type { Config } from '@jest/types';
import { join } from 'node:path';

describe('workspace Jest aliases', () => {
  it.each(['.', 'tools/workspace-plugin', 'packages/react-components/react-button/library'])(
    'resolves aliases from the repository root when started in %s',
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
});
