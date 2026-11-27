import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { compileString, NodePackageImporter } from 'sass';
import { webLightTheme } from '@fluentui/react-theme';

describe('Sass tokens', () => {
  const tokenNames = Object.keys(webLightTheme);
  const tokenStyles = (namespace: string) =>
    ['.tokens {', ...tokenNames.map(tokenName => `  --${tokenName}: #{${namespace}$${tokenName}};`), '}'].join('\n');
  const expectedCss = ['.tokens {', ...tokenNames.map(tokenName => `  --${tokenName}: var(--${tokenName});`), '}'].join(
    '\n',
  );
  const importers = [new NodePackageImporter(__dirname)];

  it.each([
    ['pkg:@fluentui/react-theme-sass', 'fluentTokens', 'fluentTokens.'],
    ['pkg:@fluentui/react-theme-sass', '*', ''],
    ['@fluentui/react-theme-sass/sass/tokens', 'fluentTokens', 'fluentTokens.'],
    ['@fluentui/react-theme-sass/sass/tokens', '*', ''],
  ])('exports all theme token values with @use %s as %s', (specifier, alias, namespace) => {
    const warn = jest.fn();
    const result = compileString([`@use '${specifier}' as ${alias};`, tokenStyles(namespace)].join('\n'), {
      importers,
      loadPaths: [resolve(__dirname, '../../../../node_modules')],
      fatalDeprecations: ['import'],
      logger: { warn: (message, options) => warn(message, options) },
    });

    expect(result.css).toBe(expectedCss);
    expect(warn).not.toHaveBeenCalled();
  });

  const readme = readFileSync(resolve(__dirname, '../README.md'), 'utf8');
  const examples = Array.from(readme.matchAll(/```scss\n([\s\S]*?)```/g), match => match[1]);

  it.each(examples)('compiles README example %# through the public package entrypoint', example => {
    const warn = jest.fn();
    const result = compileString(example, {
      importers,
      fatalDeprecations: ['import'],
      logger: { warn: (message, options) => warn(message, options) },
    });

    expect(result.css).toBe(
      [
        '.brandedElement {',
        '  color: var(--colorBrandForeground1);',
        '  background: var(--colorBrandBackground);',
        '  border-radius: var(--borderRadiusLarge);',
        '}',
      ].join('\n'),
    );
    expect(warn).not.toHaveBeenCalled();
  });

  it('preserves global theme token values for legacy @import consumers on Dart Sass', () => {
    const warn = jest.fn();
    const result = compileString(['@import "sass/tokens";', tokenStyles('')].join('\n'), {
      loadPaths: [resolve(__dirname, '..')],
      verbose: true,
      logger: { warn: (message, options) => warn(message, options) },
    });

    expect(result.css).toBe(expectedCss);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][1].deprecationType.id).toBe('import');
  });
});
