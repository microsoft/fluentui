import type { ComponentStyleSpec } from './types';
import { validateSpec, assertValidSpec } from './validate';

const validSpec: ComponentStyleSpec = {
  name: 'Sample',
  version: 1,
  slots: ['root', 'icon'],
  variants: {
    appearance: { values: ['filled', 'outline'], default: 'filled' },
  },
  states: {
    disabled: { type: 'boolean' },
  },
  rules: [
    { slot: 'root', declarations: { display: 'inline-flex', color: { token: 'colorNeutralForeground1' } } },
    {
      slot: 'root',
      when: { variants: { appearance: 'outline' } },
      declarations: { border: { concat: [{ token: 'strokeWidthThin' }, ' solid ', { token: 'colorNeutralStroke1' }] } },
    },
    { slot: 'icon', when: { rootPseudo: ':hover', states: { disabled: false } }, declarations: { opacity: 1 } },
  ],
};

const withOverrides = (overrides: Record<string, unknown>) => ({ ...validSpec, ...overrides });
const issuesOf = (spec: unknown) => validateSpec(spec).issues.map(issue => `${issue.path}: ${issue.message}`);

describe('validateSpec', () => {
  it('accepts a valid spec', () => {
    expect(validateSpec(validSpec)).toEqual({ valid: true, issues: [] });
    expect(() => assertValidSpec(validSpec)).not.toThrow();
  });

  it('rejects non-object input', () => {
    expect(validateSpec(null).valid).toBe(false);
    expect(validateSpec('Badge').valid).toBe(false);
  });

  it('rejects unknown top-level keys so target concerns cannot leak into the spec', () => {
    expect(issuesOf(withOverrides({ targets: {} }))).toEqual(['targets: unknown key "targets"']);
    expect(issuesOf(withOverrides({ classNamePrefix: 'fui-Sample' }))).toEqual([
      'classNamePrefix: unknown key "classNamePrefix"',
    ]);
  });

  it('requires a root slot and PascalCase name', () => {
    expect(issuesOf(withOverrides({ slots: ['icon'], rules: [] }))).toContain('slots: slots must include "root"');
    expect(issuesOf(withOverrides({ name: 'badge' }))).toContain('name: name must be a PascalCase string');
  });

  it('rejects unknown slots, variants, values and states in rules', () => {
    expect(issuesOf(withOverrides({ rules: [{ slot: 'label', declarations: { color: 'red' } }] }))).toContain(
      'rules[0].slot: unknown slot "label"',
    );
    expect(
      issuesOf(
        withOverrides({
          rules: [{ slot: 'root', when: { variants: { size: 'small' } }, declarations: { width: '1px' } }],
        }),
      ),
    ).toContain('rules[0].when.variants.size: unknown variant axis "size"');
    expect(
      issuesOf(
        withOverrides({
          rules: [{ slot: 'root', when: { variants: { appearance: 'ghost' } }, declarations: { width: '1px' } }],
        }),
      ),
    ).toContain('rules[0].when.variants.appearance: unknown value "ghost" for variant axis "appearance"');
    expect(
      issuesOf(
        withOverrides({ rules: [{ slot: 'root', when: { states: { open: true } }, declarations: { width: 1 } }] }),
      ),
    ).toContain('rules[0].when.states.open: unknown state "open"');
  });

  it('rejects unknown tokens and hardcoded colors', () => {
    expect(
      issuesOf(withOverrides({ rules: [{ slot: 'root', declarations: { color: { token: 'colorDoesNotExist' } } }] })),
    ).toContain('rules[0].declarations.color.token: unknown token "colorDoesNotExist"');
    expect(issuesOf(withOverrides({ rules: [{ slot: 'root', declarations: { color: '#ff0000' } }] }))).toContain(
      'rules[0].declarations.color: hardcoded color "#ff0000"; use a token reference instead',
    );
  });

  it('rejects nested selectors disguised as declarations', () => {
    expect(
      issuesOf(withOverrides({ rules: [{ slot: 'root', declarations: { ':hover': { color: 'red' } } }] })),
    ).toEqual(
      expect.arrayContaining([
        'rules[0].declarations.:hover: property must be camelCase or a --custom-property',
        'rules[0].declarations.:hover: value must be a string, number, { token }, { var } or { concat }',
      ]),
    );
  });

  it('rejects duplicate rules with the same slot and conditions', () => {
    expect(
      issuesOf(
        withOverrides({
          rules: [
            { slot: 'root', when: { pseudo: ':hover' }, declarations: { color: 'inherit' } },
            { slot: 'root', when: { pseudo: ' :hover ' }, declarations: { opacity: 1 } },
          ],
        }),
      ),
    ).toContain('rules[1]: duplicate rule: same slot and conditions as rules[0]');
  });

  it('rejects rootPseudo on the root slot', () => {
    expect(
      issuesOf(
        withOverrides({ rules: [{ slot: 'root', when: { rootPseudo: ':hover' }, declarations: { opacity: 1 } }] }),
      ),
    ).toContain('rules[0].when.rootPseudo: rootPseudo is only allowed for non-root slots; use pseudo instead');
  });

  it('assertValidSpec throws with an aggregated message', () => {
    expect(() => assertValidSpec(withOverrides({ name: 'x', version: 2 }))).toThrow(/Invalid component style spec "x"/);
  });

  it('survives a JSON round-trip', () => {
    const roundTripped = JSON.parse(JSON.stringify(validSpec));
    expect(roundTripped).toEqual(validSpec);
    expect(validateSpec(roundTripped).valid).toBe(true);
  });
});
