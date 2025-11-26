import { ExecutorContext, logger } from '@nx/devkit';

import { CleanExecutorSchema } from './schema';
import executor from './executor';
import { join } from 'node:path';
import { rm } from 'node:fs/promises';
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';

jest.mock('node:fs/promises', () => {
  return {
    ...jest.requireActual('node:fs/promises'),
    rm: jest.fn(() => Promise.resolve()),
  };
});

const options: CleanExecutorSchema = {};
const context: ExecutorContext = {
  root: join(__dirname, '__fixtures__'),
  projectName: 'proj',
  projectsConfigurations: {
    projects: { proj: { root: 'proj' } },
    version: 2,
  },
  cwd: process.cwd(),
  isVerbose: true,
  nxJsonConfiguration: {},
  projectGraph: { nodes: {}, dependencies: {} },
};

const noop = () => {
  return;
};
const fixtureRoot = context.root;
const projRoot = join(fixtureRoot, 'proj');

function prepareFixture() {
  if (!existsSync(fixtureRoot)) {
    mkdirSync(fixtureRoot);
    mkdirSync(projRoot);
    mkdirSync(join(projRoot, 'dist'));
    writeFileSync(join(projRoot, 'dist', 'file.txt'), 'file', 'utf-8');
    mkdirSync(join(projRoot, 'lib'));
    writeFileSync(join(projRoot, 'lib', 'file.txt'), 'file', 'utf-8');
  }
  return () => {
    rmSync(fixtureRoot, { recursive: true, force: true });
  };
}

describe('Clean Executor', () => {
  let cleanup = noop;

  beforeAll(() => {
    cleanup = prepareFixture();
  });
  afterAll(() => {
    cleanup();
  });

  beforeEach(() => {
    jest.spyOn(logger, 'info').mockImplementation(noop);
    jest.spyOn(logger, 'error').mockImplementation(noop);
  });

  it('can run', async () => {
    const rmMock = rm as jest.Mock;
    const output = await executor(options, context);
    expect(output.success).toBe(true);

    expect(rmMock.mock.calls.flat()).toEqual([
      expect.stringContaining('tools/workspace-plugin/src/executors/clean/__fixtures__/proj/dist'),
      {
        force: true,
        recursive: true,
      },
      expect.stringContaining('tools/workspace-plugin/src/executors/clean/__fixtures__/proj/lib'),
      {
        force: true,
        recursive: true,
      },
    ]);
  });

  it('accepts custom paths that override default ones', async () => {
    const rmMock = rm as jest.Mock;
    mkdirSync(join(projRoot, 'foo-bar'));
    mkdirSync(join(projRoot, 'mr-wick'));

    const output = await executor({ ...options, paths: ['foo-bar', 'mr-wick'] }, context);
    expect(output.success).toBe(true);

    expect(rmMock.mock.calls.flat()).toEqual([
      expect.stringContaining('tools/workspace-plugin/src/executors/clean/__fixtures__/proj/foo-bar'),
      {
        force: true,
        recursive: true,
      },
      expect.stringContaining('tools/workspace-plugin/src/executors/clean/__fixtures__/proj/mr-wick'),
      {
        force: true,
        recursive: true,
      },
    ]);
  });
});
