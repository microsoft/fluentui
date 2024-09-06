import { type ExecutorContext, logger, stripIndents } from '@nx/devkit';

import { BuildExecutorSchema } from './schema';
import executor from './executor';
import { join } from 'node:path';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

// ===== mocks start =====
import { rm } from 'node:fs/promises';
// ===== mocks end =====

const options: BuildExecutorSchema = {
  sourceRoot: 'src',
  outputPathRoot: 'libs/proj/dist',
  moduleOutput: [
    {
      module: 'commonjs',
      outputPath: 'lib-commonjs',
    },
    {
      module: 'es6',
      outputPath: 'lib',
    },
  ],
  assets: [
    {
      input: 'libs/proj/',
      output: 'assets/',
      glob: '*.md',
    },
  ],
  clean: true,
};

const workspaceRoot = join(__dirname, '__fixtures__/executor');

const context: ExecutorContext = {
  root: workspaceRoot,
  cwd: process.cwd(),
  isVerbose: false,
  projectName: 'proj',
  projectsConfigurations: {
    version: 2,
    projects: {
      proj: {
        root: 'libs/proj',
        name: 'proj',
      },
    },
  },
};

jest.mock('node:fs/promises', () => {
  const actualFs = jest.requireActual('node:fs/promises');

  return {
    ...actualFs,
    rm: jest.fn(actualFs.rm),
  };
});

const rmMock = rm as jest.Mock;

describe('Build Executor', () => {
  it('can run', async () => {
    const loggerLogSpy = jest.spyOn(logger, 'log').mockImplementation(() => {
      return;
    });
    const loggerVerboseSpy = jest.spyOn(logger, 'verbose').mockImplementation(() => {
      return;
    });

    const output = await executor(options, context);
    expect(output.success).toBe(true);

    const loggerLogSpyCalls = loggerLogSpy.mock.calls.flat();
    const [clearLogs, ...restOfLogs] = loggerLogSpyCalls;

    expect(stripIndents`${clearLogs}`).toEqual(stripIndents`
      Cleaning outputs:

       - ${workspaceRoot}/libs/proj/lib-commonjs
       - ${workspaceRoot}/libs/proj/lib
       - ${workspaceRoot}/libs/proj/dist/assets/spec.md
    `);
    expect(restOfLogs).toEqual([
      'Compiling with SWC for module:es6...',
      'Processing griffel AOT with babel: 1 files',
      'Compiling with SWC for module:commonjs...',
    ]);
    expect(loggerVerboseSpy.mock.calls.flat()).toEqual([
      `babel: transformed ${workspaceRoot}/libs/proj/lib/greeter.styles.js`,
    ]);

    expect(rmMock.mock.calls.flat()).toEqual([
      `${workspaceRoot}/libs/proj/lib-commonjs`,
      {
        force: true,
        recursive: true,
      },
      `${workspaceRoot}/libs/proj/lib`,
      {
        force: true,
        recursive: true,
      },
      `${workspaceRoot}/libs/proj/dist/assets/spec.md`,
      {
        force: true,
        recursive: true,
      },
    ]);

    expect(existsSync(join(workspaceRoot, 'libs/proj/dist/assets', 'spec.md'))).toBe(true);
    expect(readdirSync(join(workspaceRoot, 'libs/proj/lib'))).toEqual([
      'greeter.js',
      'greeter.js.map',
      'greeter.styles.js',
      'greeter.styles.js.map',
      'index.js',
      'index.js.map',
    ]);
    expect(readdirSync(join(workspaceRoot, 'libs/proj/lib-commonjs'))).toEqual([
      'greeter.js',
      'greeter.js.map',
      'greeter.styles.js',
      'greeter.styles.js.map',
      'index.js',
      'index.js.map',
    ]);

    // =====================
    // assert griffel AOT
    // =====================
    expect(readFileSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.js'), 'utf-8')).toMatchInlineSnapshot(`
      "import { __styles } from '@griffel/react';
      export var useStyles = /*#__PURE__*/__styles({
        root: {
          sj55zd: \\"fe3e8s9\\"
        }
      }, {
        d: [\\".fe3e8s9{color:red;}\\"]
      });
      //# sourceMappingURL=greeter.styles.js.map"
    `);
    expect(readFileSync(join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.styles.js'), 'utf-8'))
      .toMatchInlineSnapshot(`
      "\\"use strict\\";
      Object.defineProperty(exports, \\"__esModule\\", {
          value: true
      });
      Object.defineProperty(exports, \\"useStyles\\", {
          enumerable: true,
          get: function() {
              return useStyles;
          }
      });
      var _react = require(\\"@griffel/react\\");
      var useStyles = (0, _react.makeStyles)({
          root: {
              color: 'red'
          }
      });
      "
    `);
  }, 30000);
});
