import { type ExecutorContext, readJsonFile } from '@nx/devkit';
import { join } from 'node:path';

import { type BuildExecutorSchema } from '../schema';
import { normalizeOptions } from './shared';

jest.mock('@nx/devkit', () => ({
  ...jest.requireActual('@nx/devkit'),
  readJsonFile: jest.fn(),
}));

const readJsonFileMock = readJsonFile as jest.MockedFunction<typeof readJsonFile>;

describe('build options', () => {
  const schema: BuildExecutorSchema = {
    sourceRoot: 'src',
    outputPathRoot: 'libs/proj',
    moduleOutput: [
      { module: 'es6', outputPath: 'lib' },
      { module: 'commonjs', outputPath: 'lib-commonjs' },
      { module: 'amd', outputPath: 'lib-amd' },
    ],
  };
  const context: ExecutorContext = {
    root: '/workspace',
    cwd: '/workspace',
    isVerbose: false,
    projectName: 'proj',
    projectsConfigurations: {
      version: 2,
      projects: {
        proj: { root: 'libs/proj', tags: ['vNext'] },
      },
    },
    nxJsonConfiguration: {},
    projectGraph: { nodes: {}, dependencies: {} },
  };

  beforeEach(() => {
    readJsonFileMock.mockReset();
  });

  it.each([
    { sideEffects: true },
    { sideEffects: ['**/*.css'] },
    { sideEffects: ['**/*.module.css', './lib/register.js'] },
  ])('copies CSS into every module output for $sideEffects', ({ sideEffects }) => {
    readJsonFileMock.mockReturnValue({ sideEffects });

    expect(normalizeOptions(schema, context).assets).toEqual(
      ['lib', 'lib-commonjs', 'lib-amd'].map(output => ({
        input: 'libs/proj/src',
        glob: '**/*.css',
        output,
      })),
    );
    expect(readJsonFileMock).toHaveBeenCalledTimes(1);
    expect(readJsonFileMock).toHaveBeenCalledWith(join(context.root, 'libs/proj/package.json'));
  });

  it.each([
    { sideEffects: undefined },
    { sideEffects: false },
    { sideEffects: [] },
    { sideEffects: ['./lib/register.js'] },
  ])('does not scan CSS without CSS side effects ($sideEffects)', ({ sideEffects }) => {
    readJsonFileMock.mockReturnValue({ sideEffects });

    expect(normalizeOptions(schema, context).assets).toEqual([]);
  });

  it.each([{ tags: undefined }, { tags: ['v8'] }, { tags: ['platform:node'] }])(
    'does not opt other projects in ($tags)',
    ({ tags }) => {
      readJsonFileMock.mockReturnValue({ sideEffects: ['**/*.css'] });
      const otherContext: ExecutorContext = {
        ...context,
        projectsConfigurations: {
          version: 2,
          projects: { proj: { root: 'libs/proj', tags } },
        },
      };

      expect(normalizeOptions(schema, otherContext).assets).toEqual([]);
    },
  );

  it('preserves custom assets and keeps CSS beside JS when the asset output root differs', () => {
    readJsonFileMock.mockReturnValue({ sideEffects: ['**/*.css'] });
    const assets = [{ input: 'libs/proj', glob: '*.md', output: 'docs' }, 'LICENSE'];

    expect(normalizeOptions({ ...schema, assets, outputPathRoot: 'libs/proj/dist' }, context).assets).toEqual([
      ...assets,
      ...['lib', 'lib-commonjs', 'lib-amd'].map(output => ({
        input: 'libs/proj/src',
        glob: '**/*.css',
        output: join('..', output),
      })),
    ]);
    expect(assets).toHaveLength(2);
    expect(schema).not.toHaveProperty('assets');
  });
});
