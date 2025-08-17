import { type ExecutorContext, logger, stripIndents } from '@nx/devkit';

import { BuildExecutorSchema } from './schema';
import executor from './executor';
import { join } from 'node:path';
import { existsSync, readFileSync, readdirSync, appendFileSync, writeFileSync } from 'node:fs';

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
  generateApi: true,
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
  nxJsonConfiguration: {},
  projectGraph: { nodes: {}, dependencies: {} },
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
  beforeEach(() => {
    // mute api extractor - START
    jest.spyOn(console, 'log').mockImplementation(() => {
      return;
    });
    jest.spyOn(console, 'warn').mockImplementation(() => {
      return;
    });
    // mute api extractor - END
  });

  it('runs build and api-generation and fails on api update', async () => {
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
      `Applying transforms: 0`,
      `babel: transformed ${workspaceRoot}/libs/proj/lib/greeter.styles.js`,
      `Applying transforms: 0`,
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

    expect(measureStartMock).toHaveBeenCalledTimes(2);
    expect(measureEndMock).toHaveBeenCalledTimes(2);

    // =====================
    // assert build Assets
    // =====================
    expect(existsSync(join(workspaceRoot, 'libs/proj/etc', 'proj.api.md'))).toBe(true);
    expect(existsSync(join(workspaceRoot, 'libs/proj/dist', 'index.d.ts'))).toBe(true);
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
    // assert generateAPI output based on settings
    // ====================================
    expect(readFileSync(join(workspaceRoot, 'libs/proj/dist/index.d.ts'), 'utf-8')).toMatchInlineSnapshot(`
      "export declare function greeter(greeting: string, user: User): string;

      declare type User = {
          name: string;
          hometown?: {
              name: string;
          };
      };

      export { }
      "
    `);
    expect(readFileSync(join(workspaceRoot, 'libs/proj/etc/proj.api.md'), 'utf-8')).toMatchInlineSnapshot(`
      "## API Report File for \\"proj\\"

      > Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

      \`\`\`ts

      // @public (undocumented)
      export function greeter(greeting: string, user: User): string;

      // (No @packageDocumentation comment for this package)

      \`\`\`
      "
    `);

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
      `"{\\"version\\":3,\\"sources\\":[\\"../src/greeter.ts\\"],\\"sourcesContent\\":[\\"import { useStyles } from './greeter.styles';\\\\nexport function greeter(greeting: string, user: User): string {\\\\n  const styles = useStyles();\\\\n  return \`<h1 class=\\\\\\"\${styles}\\\\\\">\${greeting} \${user.name} from \${user.hometown?.name}</h1>\`;\\\\n}\\\\n\\\\ntype User = {\\\\n  name: string;\\\\n  hometown?: {\\\\n    name: string;\\\\n  };\\\\n};\\\\n\\"],\\"names\\":[\\"useStyles\\",\\"greeter\\",\\"greeting\\",\\"user\\",\\"styles\\",\\"name\\",\\"hometown\\"],\\"mappings\\":\\"AAAA,SAASA,SAAS,QAAQ,mBAAmB;AAC7C,OAAO,SAASC,QAAQC,QAAgB,EAAEC,IAAU;QAEYA;IAD9D,MAAMC,SAASJ;IACf,OAAO,CAAC,WAAW,EAAEI,OAAO,EAAE,EAAEF,SAAS,CAAC,EAAEC,KAAKE,IAAI,CAAC,MAAM,GAAEF,iBAAAA,KAAKG,QAAQ,cAAbH,qCAAAA,eAAeE,IAAI,CAAC,KAAK,CAAC;AAC1F\\"}"`,
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

    // ==================
    // update api public surface to simulate out of date api.md which will fail the executor
    // ==================

    const publicApiFilePath = join(workspaceRoot, 'libs/proj/src/index.ts');
    const originalApiContent = readFileSync(publicApiFilePath);
    const existingEnvVariableCi = process.env.CI;

    appendFileSync(publicApiFilePath, `export const hello='new public api';\n`);
    // force api-extractor CI behaviors to fail on both Local/CI
    process.env.CI = 'true';

    const outputFailed = await executor(options, context);
    expect(outputFailed.success).toBe(false);

    // cleanup
    writeFileSync(publicApiFilePath, originalApiContent, 'utf-8');
    if (existingEnvVariableCi) {
      process.env.CI = existingEnvVariableCi;
    }
  }, 60000);

  describe(`#enableGriffelRawStyles`, () => {
    it('generates raw styles files when enableGriffelRawStyles is enabled', async () => {
      const loggerLogSpy = jest.spyOn(logger, 'log').mockImplementation(() => {
        return;
      });
      const optionsWithRawStyles: BuildExecutorSchema = {
        ...options,
        enableGriffelRawStyles: true,
      };

      const output = await executor(optionsWithRawStyles, context);
      expect(output.success).toBe(true);

      expect(loggerLogSpy.mock.calls.flat()).toContain('💅 Griffel RAW styles output enabled');

      // =====================
      // assert raw styles files are generated
      // =====================
      expect(existsSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.raw.js'))).toBe(true);
      expect(existsSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.raw.js.map'))).toBe(true);
      expect(existsSync(join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.styles.raw.js'))).toBe(true);
      expect(existsSync(join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.styles.raw.js.map'))).toBe(true);

      // =====================
      // assert raw styles content matches the original SWC-compiled styles (before Griffel transformation)
      // =====================
      expect(readFileSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.raw.js'), 'utf-8')).toMatchInlineSnapshot(`
      "import { makeStyles } from '@griffel/react';
      export const useStyles = makeStyles({
          root: {
              color: 'red'
          }
      });
      "
    `);
      expect(readFileSync(join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.styles.raw.js'), 'utf-8'))
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
      const useStyles = (0, _react.makeStyles)({
          root: {
              color: 'red'
          }
      });
      "
    `);

      // =====================
      // showcase that babel transformation creates invalid source map - which differs with raw styles source maps produced by SWC-compiled source maps (before Griffel transformation)
      // =====================
      const originalMapContent = readFileSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.js.map'), 'utf-8');
      const rawMapContent = readFileSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.raw.js.map'), 'utf-8');
      expect(rawMapContent).not.toBe(originalMapContent);

      const originalMapContentCommonjs = readFileSync(
        join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.styles.js.map'),
        'utf-8',
      );
      const rawMapContentCommonjs = readFileSync(
        join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.styles.raw.js.map'),
        'utf-8',
      );
      expect(rawMapContentCommonjs).not.toBe(originalMapContentCommonjs);
    }, 60000);

    it('does not generate raw styles files when enableGriffelRawStyles is disabled', async () => {
      const loggerLogSpy = jest.spyOn(logger, 'log').mockImplementation(() => {
        return;
      });
      const optionsWithoutRawStyles: BuildExecutorSchema = {
        ...options,
        enableGriffelRawStyles: false,
      };

      const output = await executor(optionsWithoutRawStyles, context);
      expect(output.success).toBe(true);

      expect(loggerLogSpy.mock.calls.flat()).not.toContain('💅 Griffel RAW styles output enabled');

      // =====================
      // assert raw styles files are NOT generated
      // =====================
      expect(existsSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.raw.js'))).toBe(false);
      expect(existsSync(join(workspaceRoot, 'libs/proj/lib/greeter.styles.raw.js.map'))).toBe(false);
      expect(existsSync(join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.styles.raw.js'))).toBe(false);
      expect(existsSync(join(workspaceRoot, 'libs/proj/lib-commonjs/greeter.styles.raw.js.map'))).toBe(false);
    }, 60000);
  });
});
