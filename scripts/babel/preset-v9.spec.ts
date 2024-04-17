import preset from './preset-v9';

describe(`babel preset v9`, () => {
  const babelMockedApi = {
    assertVersion: jest.fn(),
    caller: jest.fn(),
    env: jest.fn(),
    cache: {},
    version: '0',
  } as unknown as import('@babel/core').ConfigAPI;
  it(`should generate module-resolve alias mappings for @griffel preset`, () => {
    const presetConfig = preset(babelMockedApi, { tsBaseConfigPath: './tsconfig.base.json' });

    const griffelPreset = presetConfig.presets.find(presetItem => presetItem[0] === '@griffel')!;
    const griffelPresetConfig = griffelPreset[1];

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const alias = (griffelPresetConfig as any).babelOptions.plugins[0][1].alias;
    const aliasesEntries = Object.entries(alias);

    /**
     * we pick 5th entry from the big list of path aliases entries. there is nothing special about it and we can pick any existing entry index.
     * I chose to not pick first nor last. In general this is an integration test that checks if we would introduce some violation within tsconfig.base.json path aliases config
     */
    const aliasDeclaration = aliasesEntries[5];
    const [aliasKey, aliasPath] = aliasDeclaration;

    expect(aliasKey).toEqual(expect.stringContaining('^@fluentui/'));
    expect(aliasPath).toEqual(expect.stringMatching(/[../]+[a-z-/]+\/lib\/index\.js/));
  });
});
