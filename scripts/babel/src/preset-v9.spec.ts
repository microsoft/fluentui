import { workspaceRoot } from '@nx/devkit';
import preset from './preset-v9';

function getAliasDeclaration(presetConfig: ReturnType<typeof preset>) {
  const griffelPreset = presetConfig.presets.find(presetItem => presetItem[0] === '@griffel')!;
  const griffelPresetConfig = griffelPreset[1];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const alias = (griffelPresetConfig as any).babelOptions.plugins[0][1].alias;
  const aliasesEntries: Array<[string, string]> = Object.entries(alias);

  /**
   * we pick 5th entry from the big list of path aliases entries. there is nothing special about it and we can pick any existing entry index.
   * I chose to not pick first nor last. In general this is an integration test that checks if we would introduce some violation within tsconfig.base.json path aliases config
   */
  const aliasDeclaration = aliasesEntries[5];
  const [aliasKey, aliasPath] = aliasDeclaration;

  return {
    griffelPresetConfig,
    aliasKey,
    aliasPath,
  };
}

describe(`babel preset v9`, () => {
  it(`should generate module-resolve alias mappings for @griffel preset when calling from just-scripts`, () => {
    const babelMockedApi = {
      assertVersion: jest.fn(),
      caller: jest.fn(caller => {
        return caller({ name: 'just-scripts' });
      }),
      env: jest.fn(),
      cache: {},
      version: '0',
    } as unknown as import('@babel/core').ConfigAPI;

    const presetConfig = preset(babelMockedApi, { tsBaseConfigPath: './tsconfig.base.json' });

    const { aliasKey, aliasPath, griffelPresetConfig } = getAliasDeclaration(presetConfig);

    expect(babelMockedApi.caller).toHaveBeenCalled();
    expect(griffelPresetConfig).toEqual({
      babelOptions: {
        plugins: [
          [
            'babel-plugin-module-resolver',
            {
              alias: expect.any(Object),
            },
          ],
        ],
      },
      modules: [
        { moduleSource: '@griffel/core', importName: 'makeStyles' },
        { moduleSource: '@griffel/react', importName: 'makeStyles' },
        { moduleSource: '@fluentui/react-components', importName: 'makeStyles' },
      ],
    });

    expect(aliasKey).toEqual(expect.stringContaining('^@fluentui/'));
    expect(aliasPath).toEqual(expect.stringMatching(/[../]+[a-z-/]+\/lib\/index\.js/));
  });

  it(`should generate module-resolve alias mappings for @griffel preset when calling from nx executor from workspaceRoot`, () => {
    const babelMockedApi = {
      assertVersion: jest.fn(),
      caller: jest.fn(caller => {
        return caller({ name: '@fluentui/workspace-plugin:build' });
      }),
      env: jest.fn(),
      cache: {},
      version: '0',
    } as unknown as import('@babel/core').ConfigAPI;

    const presetConfig = preset(babelMockedApi, { tsBaseConfigPath: './tsconfig.base.json' });

    const { aliasKey, aliasPath } = getAliasDeclaration(presetConfig);

    expect(aliasKey).toEqual(expect.stringContaining('^@fluentui/'));

    expect(aliasPath.startsWith(workspaceRoot));
    expect(aliasPath).toEqual(expect.stringMatching(/[a-z-/]+\/lib\/index\.js/));
  });
});
