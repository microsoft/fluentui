// @ts-check
const path = require('node:path');
const { ESLint } = require('eslint');
const { __internal } = require('./internal');

describe('internal component style-hook configuration', () => {
  const root = path.resolve(__dirname, '../../..');
  const project = path.join(root, 'packages/react-components/react-menu/library');
  const ruleName = '@nx/workspace-style-hook-signature';

  it.each([root, project])('enables the rule when linting from %s', async cwd => {
    const config = __internal.overrides.react;
    const eslint = new ESLint({
      cwd,
      overrideConfigFile: true,
      overrideConfig: {
        ...config,
        plugins: {
          '@nx': {
            rules: { 'workspace-style-hook-signature': { create: () => ({}), meta: { schema: [] } } },
          },
        },
        rules: { [ruleName]: config.rules[ruleName] },
      },
    });
    const source = path.join(project, 'src/components/MenuItemRadio/useMenuItemRadioStyles.styles.ts');
    expect((await eslint.calculateConfigForFile(source)).rules[ruleName]).toEqual([2]);
    expect(
      (await eslint.calculateConfigForFile(source.replace('.styles.ts', '.test.ts')))?.rules?.[ruleName],
    ).toBeUndefined();
  });
});
