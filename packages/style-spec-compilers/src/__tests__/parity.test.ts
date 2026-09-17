import { BadgeSpec, ButtonSpec, DividerSpec } from '@fluentui/component-style-specs';
import { normalizeSpec, isTokenValue, isConcatStyleValue, isVarValue, type StyleValue } from '@fluentui/style-spec';
import { compileStyleSpec } from '../index';

/**
 * Lightweight parity: every token referenced in the spec appears in each target's output,
 * and generated Griffel / CSS contain the expected structural markers of the hand-written styles.
 *
 * Full rule-level CSS diffs against runtime Griffel output are deferred (see RFC Open Issues).
 */
describe('parity smoke checks', () => {
  it.each([
    ['Badge', BadgeSpec, { griffelClass: 'fui-Badge', wcHost: ":host([appearance='ghost'])", cssRoot: '.badge' }],
    [
      'Divider',
      DividerSpec,
      { griffelClass: 'fui-Divider', wcHost: ":host([orientation='vertical'])", cssRoot: '.divider' },
    ],
    ['Button', ButtonSpec, { griffelClass: 'fui-Button', wcHost: ":host([appearance='primary'])", cssRoot: '.button' }],
  ] as const)('%s tokens and structure appear in all targets', (_name, spec, markers) => {
    const ir = normalizeSpec(spec);
    const tokens = new Set<string>();
    const visit = (value: StyleValue) => {
      if (isTokenValue(value)) {
        tokens.add(value.token);
      } else if (isVarValue(value) && value.fallback !== undefined) {
        visit(value.fallback as StyleValue);
      } else if (isConcatStyleValue(value)) {
        for (const part of value.concat) {
          visit(part as StyleValue);
        }
      }
    };
    for (const rule of ir.rules) {
      for (const decl of rule.declarations) {
        visit(decl.value);
      }
    }

    const griffel = compileStyleSpec(spec, { target: 'griffel' })[0].contents;
    const wc = compileStyleSpec(spec, { target: 'web-components' })[0].contents;
    const css = compileStyleSpec(spec, { target: 'css-modules' })[0].contents;

    expect(griffel).toContain(markers.griffelClass);
    expect(wc).toContain(markers.wcHost);
    expect(css).toContain(markers.cssRoot);

    for (const token of tokens) {
      expect(griffel).toContain(`tokens.${token}`);
      expect(wc).toContain(`var(--${token})`);
      expect(css).toContain(`var(--${token})`);
    }
  });
});
