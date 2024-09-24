import { type ExecutorContext, logger, stripIndents } from '@nx/devkit';

import { BuildExecutorSchema } from './schema';
import executor from './executor';
import { join } from 'node:path';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

// ===== mocks start =====
import { rm } from 'node:fs/promises';
import { measureStart, measureEnd } from '../../utils';
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

jest.mock('../../utils', () => {
  return {
    measureStart: jest.fn(),
    measureEnd: jest.fn(),
  };
});

const rmMock = rm as jest.Mock;
const measureStartMock = measureStart as jest.Mock;
const measureEndMock = measureEnd as jest.Mock;

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

    expect(measureStartMock).toHaveBeenCalledTimes(1);
    expect(measureEndMock).toHaveBeenCalledTimes(1);

    // =====================
    // assert build Assets
    // =====================
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

    // ====================================
    // assert swc output based on settings
    // ====================================
    expect(readFileSync(join(workspaceRoot, 'libs/proj/lib/greeter.js'), 'utf-8')).toMatchInlineSnapshot(`
      "import { useStyles } from './greeter.styles';
      export function greeter(greeting, user) {
          var _user_hometown;
          const styles = useStyles();
          return \`<h1 class=\\"\${styles}\\">\${greeting} \${user.name} from \${(_user_hometown = user.hometown) === null || _user_hometown === void 0 ? void 0 : _user_hometown.name}</h1>\`;
      }
      "
    `);
    expect(readFileSync(join(workspaceRoot, 'libs/proj/lib/greeter.js.map'), 'utf-8')).toMatchInlineSnapshot(
      `"{\\"version\\":3,\\"sources\\":[\\"greeter.ts\\"],\\"sourcesContent\\":[\\"import { useStyles } from './greeter.styles';\\\\nexport function greeter(greeting: string, user: User): string {\\\\n  const styles = useStyles();\\\\n  return \`<h1 class=\\\\\\"\${styles}\\\\\\">\${greeting} \${user.name} from \${user.hometown?.name}</h1>\`;\\\\n}\\\\n\\\\ntype User = {\\\\n  name: string;\\\\n  hometown?: {\\\\n    name: string;\\\\n  };\\\\n};\\\\n\\"],\\"names\\":[\\"useStyles\\",\\"greeter\\",\\"greeting\\",\\"user\\",\\"styles\\",\\"name\\",\\"hometown\\"],\\"rangeMappings\\":\\";;;;;\\",\\"mappings\\":\\"AAAA,SAASA,SAAS,QAAQ,mBAAmB;AAC7C,OAAO,SAASC,QAAQC,QAAgB,EAAEC,IAAU;QAEYA;IAD9D,MAAMC,SAASJ;IACf,OAAO,CAAC,WAAW,EAAEI,OAAO,EAAE,EAAEF,SAAS,CAAC,EAAEC,KAAKE,IAAI,CAAC,MAAM,GAAEF,iBAAAA,KAAKG,QAAQ,cAAbH,qCAAAA,eAAeE,IAAI,CAAC,KAAK,CAAC;AAC1F\\"}"`,
    );

    expect(readFileSync(join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.js'), 'utf-8')).toMatchInlineSnapshot(`
      "\\"use strict\\";
      Object.defineProperty(exports, \\"__esModule\\", {
          value: true
      });
      Object.defineProperty(exports, \\"greeter\\", {
          enumerable: true,
          get: function() {
              return greeter;
          }
      });
      const _greeterstyles = require(\\"./greeter.styles\\");
      function greeter(greeting, user) {
          var _user_hometown;
          const styles = (0, _greeterstyles.useStyles)();
          return \`<h1 class=\\"\${styles}\\">\${greeting} \${user.name} from \${(_user_hometown = user.hometown) === null || _user_hometown === void 0 ? void 0 : _user_hometown.name}</h1>\`;
      }
      "
    `);

    // =====================
    // assert griffel AOT
    // =====================
    expect(readFileSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.js'), 'utf-8')).toMatchInlineSnapshot(`
      "import { __styles } from '@griffel/react';
      export const useStyles = /*#__PURE__*/__styles({
        root: {
          sj55zd: \\"fe3e8s9\\"
        }
      }, {
        d: [\\".fe3e8s9{color:red;}\\"]
      });"
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
      const _react = require(\\"@griffel/react\\");
      const useStyles = /*#__PURE__*/ (0, _react.__styles)({
          root: {
              sj55zd: \\"fe3e8s9\\"
          }
      }, {
          d: [
              \\".fe3e8s9{color:red;}\\"
          ]
      });
      "
    `);
  }, 30000);
});
