import { getModuleReferences, getRequireSpecifier, scanTokens } from './moduleScanner';

describe('scanTokens', () => {
  it('returns significant tokens and decodes escaped string delimiters', () => {
    expect(scanTokens('require /* comment */ ("a\\"b");')).toEqual([
      { type: 'word', value: 'require' },
      { type: 'punct', value: '(' },
      { type: 'string', value: 'a"b', valid: true },
      { type: 'punct', value: ')' },
      { type: 'punct', value: ';' },
    ]);
  });

  it.each(['"unterminated', "'unterminated", '"line\nbreak"'])('marks an invalid literal in %s', source => {
    expect(scanTokens(source)[0]).toEqual({ type: 'string', value: expect.any(String), valid: false });
  });

  it('distinguishes regular expressions after statements from division after expressions', () => {
    const tokens = scanTokens(`
      if (ready) /require("regex")/[Symbol.match](text);
      {} /require("block-regex")/.test(text);
      const ratio = value / require("divisor");
      const objectRatio = { value: 1 } / require("object-divisor");
      object.return / require("property-divisor");
    `);

    expect(
      tokens.flatMap((_, index) => {
        const specifier = getRequireSpecifier(tokens, index);
        return specifier === undefined ? [] : [specifier];
      }),
    ).toEqual(['divisor', 'object-divisor', 'property-divisor']);
  });

  it('handles unterminated comments, templates and JSX without recursing', () => {
    expect(scanTokens('/* require("comment")')).toEqual([]);
    expect(scanTokens('`require("template")')).toEqual([{ type: 'other' }]);
    expect(scanTokens('<div>require("jsx")', { jsx: true })).toEqual([{ type: 'other' }]);
    expect(getModuleReferences(`${'('.repeat(10_000)}require("deep")${')'.repeat(10_000)}`)).toEqual([
      { specifier: 'deep', typeOnly: false },
    ]);
  });
});

describe('getRequireSpecifier', () => {
  it('accepts a literal argument with whitespace and comments', () => {
    expect(getRequireSpecifier(scanTokens('require /* comment */ (\n"react"\n)'), 0)).toBe('react');
  });

  it.each([
    'object.require("react")',
    'object?.require("react")',
    'require?.("react")',
    'require(variable)',
    'require("react", extra)',
    'require("unterminated)',
    'require("react"',
  ])('rejects a nonliteral, incomplete or property call: %s', source => {
    const tokens = scanTokens(source);
    const index = tokens.findIndex(token => token.type === 'word' && token.value === 'require');

    expect(getRequireSpecifier(tokens, index)).toBeUndefined();
  });
});

describe('getModuleReferences', () => {
  it('collects static imports, re-exports, dynamic imports and CommonJS requires in source order', () => {
    const source = `
      import React from 'react';
      import * as Icons from '@fluentui/react-icons';
      import Default, { Button, type ButtonProps } from '@fluentui/react-components';
      import './styles.module.css';
      export { helper as renamed } from 'helpers';
      export * as utilities from 'utilities';
      const lazy = import('lazy');
      const legacy = require /* comment */ ('legacy');
    `;

    expect(getModuleReferences(source)).toEqual(
      [
        'react',
        '@fluentui/react-icons',
        '@fluentui/react-components',
        './styles.module.css',
        'helpers',
        'utilities',
        'lazy',
        'legacy',
      ].map(specifier => ({ specifier, typeOnly: false })),
    );
  });

  it('identifies type-only declarations without confusing bindings named type', () => {
    expect(
      getModuleReferences(`
        import type Default from 'type-default';
        import type * as Types from 'type-namespace';
        export type { Props } from 'type-export';
        export type * from 'type-star-export';
        import type from 'type-binding';
        import type, { Other } from 'type-binding-with-named';
        import { type Props, Value } from 'mixed';
      `),
    ).toEqual([
      { specifier: 'type-default', typeOnly: true },
      { specifier: 'type-namespace', typeOnly: true },
      { specifier: 'type-export', typeOnly: true },
      { specifier: 'type-star-export', typeOnly: true },
      { specifier: 'type-binding', typeOnly: false },
      { specifier: 'type-binding-with-named', typeOnly: false },
      { specifier: 'mixed', typeOnly: false },
    ]);
  });

  it('skips module-like text and scans nested template expressions', () => {
    const source = `
      const text = "import x from 'string'";
      // require('line-comment');
      /* export * from 'block-comment'; */
      const regex = /[/"']require\\('regex'\\)/g;
      const template = \`require('template') \${\`nested \${require('nested-expression')}\`}\`;
      const result = require('actual');
    `;

    expect(getModuleReferences(source)).toEqual([
      { specifier: 'nested-expression', typeOnly: false },
      { specifier: 'actual', typeOnly: false },
    ]);
  });

  it('skips JSX text and quoted attributes while scanning attribute and child expressions', () => {
    const source = `
      export const Story = () => (
        <Card title="require('attribute')" render={() => import('render')}>
          <div>import x from 'text'</div>
          <>require('fragment') {require('child')}</>
          {/* require('comment') */}
          {<Nested value={require('nested-attribute')} />}
        </Card>
      );
      const after = require('after-jsx');
    `;

    expect(getModuleReferences(source)).toEqual([
      { specifier: 'render', typeOnly: false },
      { specifier: 'child', typeOnly: false },
      { specifier: 'nested-attribute', typeOnly: false },
      { specifier: 'after-jsx', typeOnly: false },
    ]);
  });

  it('does not treat generic arrow functions as JSX', () => {
    expect(
      getModuleReferences(`
        const first = <T,>(value: T) => require('first');
        const second = <T extends object>(value: T) => import('second');
      `),
    ).toEqual([
      { specifier: 'first', typeOnly: false },
      { specifier: 'second', typeOnly: false },
    ]);
  });

  it('ignores properties, incomplete references and empty specifiers', () => {
    expect(
      getModuleReferences(`
        object.import('property-import');
        object?.require('property-require');
        import(variable);
        require('');
        import '';
        export const from = 'not-a-reference';
        const importable = 'not-an-import';
        require("unterminated
      `),
    ).toEqual([]);
  });
});
