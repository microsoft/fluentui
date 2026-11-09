import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, describe, it } from 'node:test';
import stylelint from 'stylelint';
import plugins from '../index.js';
import { deriveFromGriffelSource, formatDirective, parseDirective } from '../griffel-buckets.js';

/**
 * @param {string} code
 * @param {{ file?: string, fix?: boolean }} [options]
 */
async function lint(code, { file, fix = false } = {}) {
  const { results, code: output } = await stylelint.lint({
    code,
    codeFilename: file,
    fix,
    config: { plugins, rules: { 'fluentui/griffel-buckets': true } },
  });
  return {
    warnings: results[0].warnings.map(warning => warning.text.replace(/ \(fluentui\/[\w-]+\)$/, '')),
    output,
  };
}

const component = mkdtempSync(join(tmpdir(), 'griffel-buckets-'));
after(() => rmSync(component, { recursive: true, force: true }));

writeFileSync(
  join(component, 'useButtonStyles.styles.ts'),
  `
const useRootBaseClassName = makeResetStyles({ display: 'flex' });
const useIconBaseClassName = makeResetStyles({ display: 'flex' });
const useStyles = makeStyles({ small: { paddingInlineStart: '4px', ...shorthands.marginInline('2px') } });
export const useButtonStyles_unstable = state => {
  const rootBaseClassName = useRootBaseClassName();
  const iconBaseClassName = useIconBaseClassName();
  const styles = useStyles();
  state.root.className = mergeClasses('fui-Button', rootBaseClassName, styles.small, state.root.className);
  state.icon.className = mergeClasses('fui-Button__icon', iconBaseClassName, state.icon.className);
  state.label.className = mergeClasses('fui-Button__label', styles.small, state.label.className);
};
`,
);
writeFileSync(
  join(component, 'useButtonStyles.styles.css.ts'),
  `
import styles from './Button.module.css';
export const useButtonStyles_unstable = state => {
  state.root.className = clsx('fui-Button', styles.root, styles.small, state.root.className);
  state.icon.className = clsx('fui-Button__icon', styles.icon, state.icon.className);
  state.label.className = clsx('fui-Button__label', styles.label, state.label.className);
};
`,
);
const file = join(component, 'Button.module.css');
const css = `.root { display: flex; }
.root:hover { color: red; }
.small { padding-inline-start: 4px; margin-inline-start: 2px; }
.icon { display: flex; }
.label { color: red; }
`;
const directive = '/* @griffel-buckets reset: .root, .icon; logical: padding-inline-start, margin-inline-start */';

describe('griffel-buckets directive', () => {
  it('parses and formats directives', () => {
    const parsed = parseDirective('@griffel-buckets reset: .root, .icon; logical: padding-inline-start');
    assert.deepEqual(parsed, { resetClassNames: ['root', 'icon'], logicalProperties: ['padding-inline-start'] });
    assert.equal(
      formatDirective(/** @type {never} */ (parsed)),
      '@griffel-buckets reset: .root, .icon; logical: padding-inline-start',
    );
    assert.equal(parseDirective(' a regular comment '), undefined);
    assert.ok(parseDirective('@griffel-buckets reset: root') instanceof Error);
    assert.ok(parseDirective('@griffel-buckets priority: 1') instanceof Error);
  });

  it('derives reset classes and logical properties from the Griffel source', () => {
    assert.deepEqual(deriveFromGriffelSource(file), {
      resetClassNames: ['root', 'icon'],
      logicalProperties: ['padding-inline-start', 'margin-inline-start', 'margin-inline-end'],
    });
    assert.equal(deriveFromGriffelSource(join(component, 'Other.module.css')), undefined);
  });
});

describe('fluentui/griffel-buckets', () => {
  it('accepts the directive derived from the Griffel source', async () => {
    assert.deepEqual((await lint(`${directive}\n${css}`, { file })).warnings, []);
  });

  it('reports and fixes a missing directive', async () => {
    const { warnings } = await lint(css, { file });
    assert.equal(warnings.length, 1);
    assert.match(
      warnings[0],
      /Expected "\/\* @griffel-buckets reset: \.root, \.icon; logical: padding-inline-start, margin-inline-start \*\/"/,
    );
    assert.equal((await lint(css, { file, fix: true })).output, `${directive}\n${css}`);
  });

  it('reports and fixes a directive that drifted from the Griffel source', async () => {
    const drifted = `/* @griffel-buckets reset: .root */\n${css}`;
    const { warnings } = await lint(drifted, { file });
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /instead of "@griffel-buckets reset: \.root"/);
    assert.equal((await lint(drifted, { file, fix: true })).output, `${directive}\n${css}`);
  });

  it('accepts reordered values', async () => {
    const reordered = '/* @griffel-buckets logical: margin-inline-start, padding-inline-start; reset: .icon, .root */';
    assert.deepEqual((await lint(`${reordered}\n${css}`, { file })).warnings, []);
  });

  it('validates directives without a Griffel source', async () => {
    assert.deepEqual((await lint(`${directive}\n${css}`)).warnings, []);
    const { warnings } = await lint('/* @griffel-buckets reset: .missing; logical: inset-inline-start */\n.root {}');
    assert.deepEqual(warnings, [
      'Unexpected reset class ".missing": no rule uses it.',
      'Unexpected logical property "inset-inline-start": no declaration uses it.',
    ]);
    assert.deepEqual((await lint('.root { color: red; }')).warnings, []);
  });

  it('ignores classes inside :global()', async () => {
    const { warnings } = await lint('/* @griffel-buckets reset: .fui-Icon */\n.root :global(.fui-Icon) {}');
    assert.deepEqual(warnings, ['Unexpected reset class ".fui-Icon": no rule uses it.']);
  });

  it('reports invalid, duplicate and misplaced directives', async () => {
    assert.deepEqual((await lint('/* @griffel-buckets reset: root */\n.root {}')).warnings, [
      'Invalid @griffel-buckets directive: Expected a class selector such as ".root" in reset, found "root".',
    ]);
    const { warnings } = await lint(
      '.root {}\n/* @griffel-buckets reset: .root */\n/* @griffel-buckets reset: .root */\n.icon { /* @griffel-buckets reset: .icon */ }',
    );
    assert.deepEqual(warnings, [
      'Expected the @griffel-buckets directive before the first rule.',
      'Unexpected second @griffel-buckets directive.',
      'Expected the @griffel-buckets directive before the first rule.',
    ]);
  });

  it('reports and removes a directive the Griffel source does not need', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'griffel-buckets-'));
    try {
      writeFileSync(
        join(dir, 'useLinkStyles.styles.ts'),
        `state.root.className = mergeClasses('fui-Link', styles.root);`,
      );
      writeFileSync(join(dir, 'useLinkStyles.styles.css.ts'), `import styles from './Link.module.css';`);
      const linkFile = join(dir, 'Link.module.css');
      const code = '/* @griffel-buckets reset: .root */\n.root { color: red; }\n';
      assert.deepEqual((await lint(code, { file: linkFile })).warnings, [
        'Unexpected @griffel-buckets directive: its Griffel styles have no reset classes or logical properties.',
      ]);
      assert.equal((await lint(code, { file: linkFile, fix: true })).output, '.root { color: red; }\n');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
