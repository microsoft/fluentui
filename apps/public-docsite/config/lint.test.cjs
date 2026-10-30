const assert = require('node:assert/strict');
const path = require('node:path');
const { test } = require('node:test');
const { ESLint, Linter } = require('eslint');

test('generated self-imports are rejected without resolving build output', async () => {
  const cwd = path.resolve(__dirname, '..');
  const eslint = new ESLint({ cwd });
  const config = await eslint.calculateConfigForFile('src/pages/Styles/ThemeSlotsPage/ThemeSlotsPage.base.tsx');
  const linter = new Linter();
  const lint = code =>
    linter.verify(
      code,
      {
        files: ['**/*.tsx'],
        languageOptions: { parser: config.languageOptions.parser },
        rules: {
          'no-restricted-imports': config.rules['no-restricted-imports'],
          'no-restricted-modules': config.rules['no-restricted-modules'],
        },
      },
      { filename: 'fixture.tsx' },
    );

  for (const palette of ['slots', 'neutrals', 'accents']) {
    const messages = lint(
      `const colors = require<IColorSwatch[]>('@fluentui/public-docsite/lib/data/colors-theme-${palette}.json');`,
    );
    assert.equal(messages.length, 1);
    assert.equal(messages[0].ruleId, 'no-restricted-modules');
    assert.equal(messages[0].severity, 2);
    assert.deepEqual(lint(`const colors = require<IColorSwatch[]>('../../../data/colors-theme-${palette}.json');`), []);
  }

  for (const output of ['lib', 'lib-commonjs', 'lib-amd', 'lib-es2015']) {
    const source = `@fluentui/public-docsite/${output}/data/colors-theme-slots.json`;
    for (const code of [
      `import colors from '${source}';`,
      `export { default as colors } from '${source}';`,
      `export * from '${source}';`,
    ]) {
      const messages = lint(code);
      assert.equal(messages.length, 1);
      assert.equal(messages[0].ruleId, 'no-restricted-imports');
      assert.equal(messages[0].severity, 2);
    }
    assert.equal(lint(`const colors = require('${source}');`)[0].ruleId, 'no-restricted-modules');
  }

  assert.deepEqual(lint("import { Button } from '@fluentui/react';"), []);
  assert.deepEqual(lint("const docs = require('@fluentui/public-docsite/src/pages/example.md');"), []);
});
