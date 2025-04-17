import { type ExecutorContext, logger } from '@nx/devkit';
import { readJsonFile } from '@nx/devkit';
import fs from 'node:fs';
// @ts-expect-error - artificially added to mock promisify
import { __asyncExecMock } from 'node:util';

import { type TypeCheckExecutorSchema } from './schema';
import executor from './executor';

const options: TypeCheckExecutorSchema = {};
const mockContext: ExecutorContext = {
  root: '/root',
  cwd: process.cwd(),
  isVerbose: false,
  projectName: 'my-lib',
  projectsConfigurations: {
    version: 2,
    projects: {
      'my-lib': {
        root: 'libs/my-lib',
        targets: {
          'type-check': { executor: '@fluentui/workspace-plugin:type-check', options: {} },
        },
      },
    },
  },
  nxJsonConfiguration: {},
  projectGraph: { nodes: {}, dependencies: {} },
};

jest.mock('node:child_process');
jest.mock('node:util', () => {
  const asyncExecMock = jest.fn((_command: string) => {
    return Promise.resolve();
  });
  return {
    ...jest.requireActual('node:util'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    promisify: (_fn: any) => {
      return asyncExecMock;
    },
    __asyncExecMock: asyncExecMock,
  };
});
jest.mock('@nx/devkit', () => {
  return {
    ...jest.requireActual('@nx/devkit'),
    readJsonFile: jest.fn(jest.requireActual('@nx/devkit').readJsonFile),
  };
});

describe('TypeCheck Executor', () => {
  let loggerErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const noop = () => {};
    loggerErrorSpy = jest.spyOn(logger, 'error').mockImplementation(noop);
  });

  it('should fail if project root tsconfig.json is missing', async () => {
    const output = await executor(options, mockContext);
    expect(output.success).toBe(false);
    expect(loggerErrorSpy.mock.calls.flat()[0]).toMatchInlineSnapshot(
      `"Cannot find tsconfig.json at \\"/root/libs/my-lib/tsconfig.json\\""`,
    );
  });

  it('should pass', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readJsonFileMock = readJsonFile as jest.Mock;
    readJsonFileMock.mockReturnValue({
      references: [{ path: './tsconfig.lib.json' }, { path: './tsconfig.spec.json' }],
    });
    const promisifyCallMock = __asyncExecMock as jest.Mock;

    const output = await executor(options, mockContext);

    expect(promisifyCallMock.mock.calls.flat()).toEqual([
      'tsc -p /root/libs/my-lib/tsconfig.lib.json --pretty --noEmit --baseUrl /root/libs/my-lib',
      'tsc -p /root/libs/my-lib/tsconfig.spec.json --pretty --noEmit --baseUrl /root/libs/my-lib',
    ]);

    expect(output.success).toBe(true);
  });

  it('should exec type checking only on non excluded configs', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readJsonFileMock = readJsonFile as jest.Mock;
    readJsonFileMock.mockReturnValue({
      references: [{ path: './tsconfig.lib.json' }, { path: './tsconfig.spec.json' }],
    });
    const promisifyCallMock = __asyncExecMock as jest.Mock;

    const output = await executor({ ...options, excludeProject: { spec: true, e2e: false } }, mockContext);

    expect(promisifyCallMock.mock.calls.flat()).toEqual([
      'tsc -p /root/libs/my-lib/tsconfig.lib.json --pretty --noEmit --baseUrl /root/libs/my-lib',
    ]);

    expect(output.success).toBe(true);
  });
});
