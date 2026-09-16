import type { ComponentStyleSpec, StyleRule } from './types';
import { groupRules, normalizeSpec } from './normalize';

const rules: StyleRule[] = [
  { slot: 'icon', when: { rootPseudo: ':hover' }, declarations: { color: 'inherit' } },
  { slot: 'root', when: { media: '(forced-colors: active)' }, declarations: { borderColor: 'CanvasText' } },
  { slot: 'root', when: { states: { disabled: true }, variants: { size: 'small' } }, declarations: { opacity: 0.5 } },
  { slot: 'root', when: { states: { disabled: true } }, declarations: { cursor: 'not-allowed' } },
  { slot: 'root', when: { variants: { color: 'brand', appearance: 'filled' } }, declarations: { color: 'red' } },
  { slot: 'root', when: { variants: { size: 'small' } }, declarations: { height: '16px' } },
  { slot: 'root', when: { variants: { appearance: 'outline' } }, declarations: { borderStyle: 'solid' } },
  { slot: 'root', when: { pseudo: ':hover' }, declarations: { opacity: 1 } },
  { slot: 'root', declarations: { display: 'flex' } },
  { slot: 'root', when: { states: { disabled: false } }, declarations: { cursor: 'pointer' } },
  { slot: 'icon', declarations: { display: 'inline' } },
];

const spec: ComponentStyleSpec = {
  name: 'Sample',
  version: 1,
  slots: ['root', 'icon'],
  variants: {
    appearance: { values: ['filled', 'outline'], default: 'filled' },
    color: { values: ['brand', 'danger'], default: 'brand' },
    size: { values: ['small', 'medium'], default: 'medium' },
  },
  states: { disabled: { type: 'boolean' } },
  rules,
};

describe('normalizeSpec', () => {
  it('orders rules canonically regardless of authoring order', () => {
    const ir = normalizeSpec(spec);
    expect(ir.rules.map(rule => rule.key)).toEqual([
      'root||||||',
      'root||||:hover||',
      'root|||||(forced-colors: active)|',
      'root|appearance=outline|||||',
      'root|size=small|||||',
      'root|appearance=filled,color=brand|||||',
      'root||disabled=true||||',
      'root||disabled=false||||',
      'root|size=small|disabled=true||||',
      'icon||||||',
      'icon|||:hover|||',
    ]);
  });

  it('is independent of rule authoring order', () => {
    const shuffled: ComponentStyleSpec = { ...spec, rules: [...rules].reverse() };
    expect(normalizeSpec(shuffled)).toEqual(normalizeSpec(spec));
  });

  it('sorts condition entries by declaration order and normalizes selector text', () => {
    const ir = normalizeSpec({
      ...spec,
      rules: [
        {
          slot: 'root',
          when: {
            variants: { size: 'small', appearance: 'filled' },
            pseudo: ' :hover:active ,  :active:focus-visible ',
          },
          declarations: { color: 'red' },
        },
      ],
    });
    expect(ir.rules[0].variants).toEqual([
      { axis: 'appearance', value: 'filled' },
      { axis: 'size', value: 'small' },
    ]);
    expect(ir.rules[0].pseudo).toBe(':hover:active,:active:focus-visible');
    expect(ir.rules[0].groupKey).toBe('root|appearance=filled,size=small|');
  });

  it('preserves declaration authoring order', () => {
    const ir = normalizeSpec({
      ...spec,
      rules: [{ slot: 'root', declarations: { padding: '4px', paddingTop: '0' } }],
    });
    expect(ir.rules[0].declarations.map(d => d.property)).toEqual(['padding', 'paddingTop']);
  });

  it('groups rules sharing slot, variants and states', () => {
    const groups = groupRules(normalizeSpec(spec).rules);
    expect([...groups.keys()]).toEqual([
      'root||',
      'root|appearance=outline|',
      'root|size=small|',
      'root|appearance=filled,color=brand|',
      'root||disabled=true',
      'root||disabled=false',
      'root|size=small|disabled=true',
      'icon||',
    ]);
    expect(groups.get('root||')!.map(rule => rule.key)).toEqual([
      'root||||||',
      'root||||:hover||',
      'root|||||(forced-colors: active)|',
    ]);
  });

  it('throws for invalid specs', () => {
    expect(() => normalizeSpec({ ...spec, slots: ['icon'] })).toThrow(/slots must include "root"/);
  });
});
