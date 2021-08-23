import { resolveStyleRulesForSlots } from './resolveStyleRulesForSlots';
import type { StylesBySlots } from './types';

describe('resolveStyleRulesForSlots', () => {
  it('returns classnames and CSS rules to apply', () => {
    const stylesBySlots: StylesBySlots<'root' | 'icon', never> = {
      root: { color: 'red', background: 'pink' },
      icon: { color: 'blue', background: 'lightblue' },
    };

    expect(resolveStyleRulesForSlots(stylesBySlots, 0)).toMatchInlineSnapshot(`
      Array [
        Object {
          "icon": Object {
            "ayd6f0": "fmqh8ev",
            "sj55zd": "f163i14w",
          },
          "root": Object {
            "ayd6f0": "fwix7fp",
            "sj55zd": "fe3e8s9",
          },
        },
        Object {
          "d": Array [
            ".fe3e8s9{color:red;}",
            ".fwix7fp{background:pink;}",
            ".f163i14w{color:blue;}",
            ".fmqh8ev{background:lightblue;}",
          ],
        },
      ]
    `);
  });
});
