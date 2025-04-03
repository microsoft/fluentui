import { ExecutorContext, logger, stripIndents } from '@nx/devkit';
import { spawnSync } from 'node:child_process';

import { VerifyPackagingExecutorSchema } from './schema';
import executor from './executor';

const options: VerifyPackagingExecutorSchema = {};
const contextMock: ExecutorContext = {
  root: '',
  projectName: 'proj',
  projectsConfigurations: {
    version: 2,
    projects: { proj: { root: 'proj', tags: [] } },
  },
  cwd: process.cwd(),
  isVerbose: false,
  nxJsonConfiguration: {},
  projectGraph: { nodes: {}, dependencies: {} },
};

jest.mock('node:child_process', () => {
  return {
    ...jest.requireActual('node:child_process'),
    spawnSync: jest.fn(),
  };
});

const spawnSyncMock = spawnSync as jest.MockedFunction<typeof spawnSync>;

describe('VerifyPackaging Executor', () => {
  let loggerErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    loggerErrorSpy = jest.spyOn(logger, 'error').mockImplementation(() => {
      return;
    });
  });

  it('should do nothing for non public packages', async () => {
    const { context } = setup({
      context: contextMock,
      enableProdMode: false,
      projectTags: ['npm:private'],
      npmPackOutput: ``,
    });

    const output = await executor(options, context);

    expect(spawnSyncMock).not.toHaveBeenCalled();
    expect(loggerErrorSpy).not.toHaveBeenCalled();
    expect(output.success).toBe(true);
  });

  it('should pass without errors if there are no issues', async () => {
    const { context } = setup({
      context: contextMock,
      enableProdMode: false,
      npmPackOutput: `
      npm notice 686B LICENSE
      npm notice 686B package.json
      npm notice 686B README.md
      npm notice 686B CHANGELOG.md
      npm notice 738B lib/hello.js.map
      npm notice 738B lib/hello.js
      npm notice 738B lib-commonjs/hello.js
      npm notice 738B lib-commonjs/hello.map.js
      npm notice 738B dist/index.d.ts
    `,
      projectTags: ['npm:public'],
    });

    const output = await executor(options, context);

    expect(loggerErrorSpy.mock.calls.flat()).toEqual([]);
    expect(output.success).toBe(true);
  });

  it('should fail with reported errors', async () => {
    const { context } = setup({
      context: contextMock,
      enableProdMode: false,
      npmPackOutput: `
        npm notice 686B LICENSE
        npm notice 686B package.json
        npm notice 686B README.md
        npm notice 686B CHANGELOG.md
        npm notice 738B lib-commonjs/hello.js
        npm notice 738B lib-commonjs/hello.map.js
      `,
      projectTags: ['npm:public'],
    });

    const output = await executor(options, context);

    expect(loggerErrorSpy.mock.calls.flat()).toMatchInlineSnapshot(`
      Array [
        "Package verification failed!",
        "[
        {
          \\"pattern\\": \\"dist/*\\",
          \\"message\\": \\"ships rolluped dts\\"
        },
        {
          \\"pattern\\": \\"lib/**/*.(js|map)\\",
          \\"message\\": \\"ships esm\\"
        }
      ]",
      ]
    `);
    expect(output.success).toBe(false);
  });

  it('should fail if production doesnt ship AMD', async () => {
    const { context, cleanup } = setup({
      context: contextMock,
      enableProdMode: true,
      npmPackOutput: `
        npm notice 686B LICENSE
        npm notice 686B package.json
        npm notice 686B README.md
        npm notice 686B CHANGELOG.md
        npm notice 738B lib-commonjs/hello.js
        npm notice 738B lib/hello.js
        npm notice 738B dist/index.d.ts
  `,
      projectTags: ['npm:public', 'ships-amd'],
    });

    const output = await executor(options, context);

    expect(loggerErrorSpy.mock.calls.flat()).toMatchInlineSnapshot(`
      Array [
        "Package verification failed!",
        "[
        {
          \\"pattern\\": \\"lib-amd/**/*.(js|map)\\",
          \\"message\\": \\"ships amd\\"
        }
      ]",
      ]
    `);
    expect(output.success).toBe(false);

    cleanup();
  });

  describe(`react v8 checks`, () => {
    it('should fail if doesnt ship d.ts', async () => {
      const { context } = setup({
        context: contextMock,
        enableProdMode: false,
        npmPackOutput: `
       npm notice 686B LICENSE
       npm notice 686B package.json
       npm notice 686B README.md
       npm notice 686B CHANGELOG.md
       npm notice 738B lib-commonjs/hello.js
       npm notice 738B lib/hello.js
       npm notice 738B dist/index.d.ts
     `,
        projectTags: ['npm:public', 'v8'],
      });

      const output = await executor(options, context);

      expect(output.success).toBe(false);
      expect(loggerErrorSpy.mock.calls.flat()).toMatchInlineSnapshot(`
              Array [
                "Package verification failed!",
                "[
                {
                  \\"pattern\\": \\"(lib|lib-commonjs)/**/*.d.ts\\",
                  \\"message\\": \\"ships dts\\"
                }
              ]",
              ]
          `);
    });
  });

  it('should fail if bundle is missing for production', async () => {
    const { cleanup, context } = setup({
      context: contextMock,
      enableProdMode: true,
      npmPackOutput: `
      npm notice 686B LICENSE
      npm notice 686B package.json
      npm notice 686B README.md
      npm notice 686B CHANGELOG.md
      npm notice 738B lib-amd/hello.js
      npm notice 738B lib-commonjs/hello.js
      npm notice 738B lib-commonjs/hello.d.ts
      npm notice 738B lib/hello.js
      npm notice 738B lib/hello.d.ts
      npm notice 738B dist/index.d.ts
     `,
      projectTags: ['npm:public', 'v8', 'ships-bundle'],
    });

    const output = await executor(options, context);

    expect(output.success).toBe(false);
    expect(loggerErrorSpy.mock.calls.flat()).toMatchInlineSnapshot(`
      Array [
        "Package verification failed!",
        "[
        {
          \\"pattern\\": \\"dist/*.js\\",
          \\"message\\": \\"ships bundle\\"
        },
        {
          \\"pattern\\": \\"dist/*.min.js\\",
          \\"message\\": \\"ships minified bundle\\"
        }
      ]",
      ]
    `);

    cleanup();
  });
});

function setup(config: {
  context: ExecutorContext;
  projectTags: string[];
  npmPackOutput: string;
  enableProdMode: boolean;
}) {
  if (config.enableProdMode) {
    process.env.FLUENT_PROD_BUILD = 'true';
  }
  spawnSyncMock.mockReturnValue({
    output: [Buffer.from(stripIndents`${config.npmPackOutput}`)],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  config.context.projectsConfigurations!.projects[config.context.projectName!].tags?.push(...config.projectTags);

  return {
    context: config.context,
    cleanup: () => {
      if (process.env.FLUENT_PROD_BUILD) {
        delete process.env.FLUENT_PROD_BUILD;
      }
    },
  };
}
