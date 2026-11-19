import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import stylelint from 'stylelint';
import plugins from '../index.js';

/**
 * @param {string} code
 * @param {Record<string, unknown>} rules
 */
async function lint(code, rules) {
  const { results } = await stylelint.lint({ code, config: { plugins, rules } });
  return results[0].warnings.map(warning => warning.text.replace(/ \(fluentui\/[\w-]+\)$/, ''));
}

/** @param {string} code */
const lintSpecificity = code => lint(code, { 'fluentui/selector-max-local-classes': 1 });

describe('fluentui/selector-max-local-classes', () => {
  it('accepts one local class with pseudo-classes, attributes, :where() qualifiers and public slot classes', async () => {
    assert.deepEqual(
      await lintSpecificity(`
        .root:hover:active {}
        .root[data-fui-focus-visible] {}
        .disabled:where(.primary, .outline):hover {}
        :where(.small) > .icon {}
        .root:hover :global(.fui-Button__icon) {}
        .root > svg::after {}
        @keyframes spin { from {} to {} }
      `),
      [],
    );
  });

  it('reports compound and descendant local classes', async () => {
    const warnings = await lintSpecificity('.root.small {} .small .icon {}');
    assert.equal(warnings.length, 2);
    assert.match(warnings[0], /"\.root\.small" to have at most 1 local class outside :where\(\), but found 2/);
    assert.match(warnings[1], /"\.small \.icon"/);
  });

  it('counts the most specific argument of :is() and :not()', async () => {
    assert.equal((await lintSpecificity('.root:not(.selected) {}')).length, 1);
    assert.equal((await lintSpecificity('.root:is(.a, :where(.b)) {}')).length, 1);
    assert.deepEqual(await lintSpecificity('.root:where(:not(.selected)) {}'), []);
  });

  it('resolves nested rules like native CSS nesting', async () => {
    assert.equal((await lintSpecificity('.small { .icon {} }')).length, 1);
    assert.equal((await lintSpecificity('.root { &.checked:hover {} }')).length, 1);
    assert.deepEqual(await lintSpecificity('.root { &:hover { & :global(.fui-Icon) {} } }'), []);
    assert.deepEqual(await lintSpecificity(':where(.small) { .icon {} }'), []);
  });

  it('reports a nested violation once, on the rule that adds the class', async () => {
    const warnings = await lintSpecificity('.root.rtl { &:first-child {} &.extra {} }');
    assert.equal(warnings.length, 2);
    assert.match(warnings[0], /"\.root\.rtl"/);
    assert.match(warnings[1], /"&\.extra" .* found 3/);
  });

  it('supports a custom maximum', async () => {
    assert.deepEqual(await lint('.root.small {}', { 'fluentui/selector-max-local-classes': 2 }), []);
  });
});

/**
 * @param {string} code
 * @param {boolean} [fix]
 */
async function lintLogical(code, fix = false) {
  const { results, code: output } = await stylelint.lint({
    code,
    fix,
    config: { plugins, rules: { 'fluentui/use-logical-properties': true } },
  });
  return { warnings: results[0].warnings.map(warning => warning.text), output };
}

describe('fluentui/use-logical-properties', () => {
  it('accepts logical properties and symmetric shorthands', async () => {
    const { warnings } = await lintLogical(`
      .root {
        margin-inline-start: 0;
        inset-inline-end: 0;
        border-start-end-radius: 0;
        padding: 0 4px;
        margin: 1px 2px 3px 2px;
        border-radius: 4px 4px 0 0;
        text-align: center;
        --left: 1px;
      }
    `);
    assert.deepEqual(warnings, []);
  });

  it('reports and fixes physical properties and values', async () => {
    const { warnings } = await lintLogical('.root { left: 0; border-top-right-radius: 0; float: left; }');
    assert.equal(warnings.length, 3);
    assert.match(warnings[0], /Expected "inset-inline-start" instead of "left"/);

    const { output } = await lintLogical('.root { margin-right: 0; text-align: right; }', true);
    assert.equal(output, '.root { margin-inline-end: 0; text-align: end; }');
  });

  it('reports asymmetric shorthands without fixing them', async () => {
    const code = '.root { padding: 0 1px 0 2px; border-radius: 4px 0 0 4px; border-color: red blue red green; }';
    const { warnings } = await lintLogical(code);
    assert.equal(warnings.length, 3);
    assert.match(warnings[0], /asymmetric "padding" shorthand/);
    assert.equal((await lintLogical(code, true)).output, code);
  });

  it('ignores rules scoped to a direction', async () => {
    const { warnings } = await lintLogical(`
      [dir='rtl'] .root { left: 0; }
      .root:dir(rtl) { margin-left: 0; }
      .root { &[dir='ltr'] { padding-right: 0; } }
      .rtl .pie { left: 0; }
      .root:where(.ltr) { margin-right: 0; }
    `);
    assert.deepEqual(warnings, []);
  });

  it('does not treat class names that merely start with rtl/ltr as direction scopes', async () => {
    const { warnings } = await lintLogical('.rtlish { left: 0; }');
    assert.equal(warnings.length, 1);
  });

  it('keeps reporting unscoped rules', async () => {
    const { warnings } = await lintLogical(`.root { left: 0; }`);
    assert.equal(warnings.length, 1);
  });
});

describe('fluentui/no-unknown-tokens', () => {
  /** @param {string} code */
  const lintTokens = code => lint(code, { 'fluentui/no-unknown-tokens': true });

  it('accepts theme tokens, tokens with fallbacks, component variables and properties declared in the file', async () => {
    assert.deepEqual(
      await lintTokens(`
        .root {
          --local: 1px;
          color: var(--colorNeutralForeground1);
          z-index: calc(var(--zIndexContent) + 1);
          width: var(--fui-Button--size, var(--local));
          padding-inline-start: calc(var(--fluent-TreeItem--level, 1) * var(--spacingHorizontalXXL));
        }
      `),
      [],
    );
  });

  it('reports unknown or misspelled custom properties', async () => {
    const warnings = await lintTokens('.root { color: var(--colorNeutralForground1); margin: var(--space-2); }');
    assert.equal(warnings.length, 2);
    assert.match(warnings[0], /Unexpected unknown custom property "--colorNeutralForground1"/);
    assert.match(warnings[1], /"--space-2"/);
  });

  it('supports custom allowed prefixes', async () => {
    assert.deepEqual(
      await lint('.root { margin: var(--app-space); }', {
        'fluentui/no-unknown-tokens': [true, { allowedPrefixes: ['--app-'] }],
      }),
      [],
    );
  });
});
