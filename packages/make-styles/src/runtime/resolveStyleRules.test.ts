// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No typings :(
import * as prettier from 'prettier';

import { resolveStyleRules } from './resolveStyleRules';
import { MakeStylesResolvedRule } from '../types';
import { isObject } from './utils/isObject';

expect.addSnapshotSerializer({
  test(value) {
    return isObject(value);
  },
  print(value: Record<string, MakeStylesResolvedRule>) {
    return Object.keys(value).reduce((acc, property) => {
      const rule: MakeStylesResolvedRule = value[property];

      return prettier.format(acc + rule[1] + (rule[2] || ''), { parser: 'css' }).trim();
    }, '');
  },
});

describe('resolveStyleRules', () => {
  describe('classnames', () => {
    it('generates unique classnames for preudo selectors', () => {
      function getFirstClassName(resolvedStyles: Record<string, MakeStylesResolvedRule>): string {
        return resolvedStyles[Object.keys(resolvedStyles)[0]][0];
      }

      const classnamesSet = new Set<string>();

      classnamesSet.add(getFirstClassName(resolveStyleRules({ color: 'red' })));
      classnamesSet.add(getFirstClassName(resolveStyleRules({ ':hover': { color: 'red' } })));

      classnamesSet.add(
        getFirstClassName(resolveStyleRules({ '@media screen and (max-width: 992px)': { color: 'red' } })),
      );
      classnamesSet.add(
        getFirstClassName(
          resolveStyleRules({
            '@media screen and (max-width: 992px)': {
              ':hover': { color: 'red' },
            },
          }),
        ),
      );

      classnamesSet.add(
        getFirstClassName(
          resolveStyleRules({
            '@supports (display: grid)': { color: 'red' },
          }),
        ),
      );
      classnamesSet.add(
        getFirstClassName(
          resolveStyleRules({
            '@supports (display: grid)': {
              ':hover': { color: 'red' },
            },
          }),
        ),
      );

      classnamesSet.add(
        getFirstClassName(
          resolveStyleRules({
            '@supports (display: grid)': {
              '@media screen and (max-width: 992px)': {
                ':hover': { color: 'red' },
              },
            },
          }),
        ),
      );

      expect(classnamesSet.size).toBe(7);
    });
  });

  describe('css', () => {
    it('resolves a single rule', () => {
      expect(resolveStyleRules({ color: 'red' })).toMatchInlineSnapshot(`
        .fe3e8s9 {
          color: red;
        }
      `);
    });

    it('resolves multiple rules', () => {
      expect(resolveStyleRules({ backgroundColor: 'green', color: 'red' })).toMatchInlineSnapshot(`
        .fcnqdeg {
          background-color: green;
        }
        .fe3e8s9 {
          color: red;
        }
      `);
    });

    it('trims values to generate the same classes', () => {
      expect(resolveStyleRules({ color: 'red ' /* ends with a space */ })).toMatchInlineSnapshot(`
        .fe3e8s9 {
          color: red;
        }
      `);
    });

    it('hyphenates camelcased CSS properties', () => {
      expect(
        resolveStyleRules({
          '--foo': 'var(--bar)',
          '--fooBar': 'var(--barBaz)',

          backgroundColor: 'red',
          MozAnimation: 'initial',
        }),
      ).toMatchInlineSnapshot(`
        .f1qux40 {
          --foo: var(--bar);
        }
        .f14u957 {
          --fooBar: var(--barBaz);
        }
        .f3xbvq9 {
          background-color: red;
        }
        .fr90kjk {
          -moz-animation: initial;
        }
      `);
    });

    it('performs expansion of shorthands', () => {
      expect(resolveStyleRules({ outline: '1px' })).toMatchInlineSnapshot(`
        .fpvhumw {
          outline-width: 1px;
        }
      `);
      expect(resolveStyleRules({ padding: '5px' })).toMatchInlineSnapshot(`
        .f1sbtcvk {
          padding-top: 5px;
        }
        .fwiuce9 {
          padding-right: 5px;
        }
        .rfwiuce9 {
          padding-left: 5px;
        }
        .fdghr9 {
          padding-bottom: 5px;
        }
        .f15vdbe4 {
          padding-left: 5px;
        }
        .rf15vdbe4 {
          padding-right: 5px;
        }
      `);
    });

    it('performs vendor prefixing', () => {
      expect(resolveStyleRules({ display: 'flex' })).toMatchInlineSnapshot(`
        .f22iagw {
          display: flex;
        }
      `);
    });

    it('handles falsy values', () => {
      expect(
        resolveStyleRules({
          zIndex: 1,
          position: (null as unknown) as undefined,
          top: undefined,
        }),
      ).toMatchInlineSnapshot(`
        .f19g0ac {
          z-index: 1;
        }
      `);
    });

    it('handles RTL', () => {
      expect(resolveStyleRules({ left: '5px' })).toMatchInlineSnapshot(`
        .f5b3q4t {
          left: 5px;
        }
        .rf5b3q4t {
          right: 5px;
        }
      `);
    });

    it('handles nested selectors', () => {
      expect(resolveStyleRules({ ':hover': { color: 'red' } })).toMatchInlineSnapshot(`
        .faf35ka:hover {
          color: red;
        }
      `);
      expect(resolveStyleRules({ '::after': { content: '""' } })).toMatchInlineSnapshot(`
        .f13zj6fq::after {
          content: "";
        }
      `);

      expect(resolveStyleRules({ '[data-fluent="true"]': { color: 'green' } })).toMatchInlineSnapshot(`
        .fcopvey[data-fluent="true"] {
          color: green;
        }
      `);
      expect(resolveStyleRules({ '& [data-fluent="true"]': { color: 'green' } })).toMatchInlineSnapshot(`
        .f1k5aqsk [data-fluent="true"] {
          color: green;
        }
      `);

      expect(resolveStyleRules({ '> div': { color: 'green' } })).toMatchInlineSnapshot(`
        .f18wx08q > div {
          color: green;
        }
      `);

      expect(resolveStyleRules({ '& .foo': { color: 'green' } })).toMatchInlineSnapshot(`
        .f15f830o .foo {
          color: green;
        }
      `);
      expect(resolveStyleRules({ '&.foo': { color: 'green' } })).toMatchInlineSnapshot(`
        .fe1zdmy.foo {
          color: green;
        }
      `);

      expect(resolveStyleRules({ '& #foo': { color: 'green' } })).toMatchInlineSnapshot(`
        .fie1itf #foo {
          color: green;
        }
      `);
      expect(resolveStyleRules({ '&#foo': { color: 'green' } })).toMatchInlineSnapshot(`
        .fwxog6r#foo {
          color: green;
        }
      `);
    });

    it('handles complex nested selectors', () => {
      expect(resolveStyleRules({ '& > :first-child': { '& svg': { color: 'red' } } })).toMatchInlineSnapshot(`
        .fxfx2ih > :first-child svg {
          color: red;
        }
      `);
    });

    it('handles media queries', () => {
      expect(
        resolveStyleRules({
          color: 'green',
          '@media screen and (max-width: 992px)': { color: 'red' },
        }),
      ).toMatchInlineSnapshot(`
        .fka9v86 {
          color: green;
        }
        @media screen and (max-width: 992px) {
          .f1ojdyje {
            color: red;
          }
        }
      `);
    });

    it('handles media queries with preudo selectors', () => {
      expect(
        resolveStyleRules({
          color: 'green',
          '@media screen and (max-width: 992px)': {
            ':hover': {
              color: 'red ',
            },
          },
        }),
      ).toMatchInlineSnapshot(`
        .fka9v86 {
          color: green;
        }
        @media screen and (max-width: 992px) {
          .f7wpa5l:hover {
            color: red;
          }
        }
      `);
    });

    it('handles nested media queries', () => {
      expect(
        resolveStyleRules({
          color: 'red',
          '@media screen and (max-width: 992px)': {
            color: 'red',
            '@media (min-width: 100px)': { color: 'red' },
          },
        }),
      ).toMatchInlineSnapshot(`
        .fe3e8s9 {
          color: red;
        }
        @media screen and (max-width: 992px) {
          .f1ojdyje {
            color: red;
          }
        }
        @media screen and (max-width: 992px) and (min-width: 100px) {
          .f19a6424 {
            color: red;
          }
        }
      `);
    });

    it('handles supports queries', () => {
      expect(
        resolveStyleRules({
          '@supports (display:block)': { color: 'green' },
        }),
      ).toMatchInlineSnapshot(`
        @supports (display: block) {
          .f1yofsfp {
            color: green;
          }
        }
      `);
    });

    it('handles :global selector', () => {
      expect(
        resolveStyleRules({
          ':global(body)': { color: 'green' },
          ':global(body) &': { color: 'green' },
        }),
      ).toMatchInlineSnapshot(`
        body {
          color: green;
        }
        body .fm1e7ra {
          color: green;
        }
      `);
    });
  });

  describe('experimental', () => {
    it('allows to define keyframes', () => {
      expect(
        resolveStyleRules({
          animationName: {
            from: {
              transform: 'rotate(0deg)',
            },
            to: {
              transform: 'rotate(360deg)',
            },
          },
          animationIterationCount: 'infinite',
          animationDuration: '5s',
        }),
      ).toMatchInlineSnapshot(`
        @keyframes f13owpa8 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .fkf6eed {
          animation-name: f13owpa8;
        }
        .f1cpbl36 {
          animation-iteration-count: infinite;
        }
        .f1t9cprh {
          animation-duration: 5s;
        }
      `);
    });

    it('allows to increase specificity', () => {
      expect(resolveStyleRules({ color: 'red' }, 1)).toMatchInlineSnapshot(`
        .fe3e8s91.fe3e8s91 {
          color: red;
        }
      `);
      expect(resolveStyleRules({ color: 'red' }, 2)).toMatchInlineSnapshot(`
        .fe3e8s92.fe3e8s92.fe3e8s92 {
          color: red;
        }
      `);
    });

    it('allows to increase for media queries', () => {
      expect(
        resolveStyleRules(
          {
            '@media screen and (max-width: 992px)': {
              color: 'red',
            },
          },
          1,
        ),
      ).toMatchInlineSnapshot(`
        @media screen and (max-width: 992px) {
          .f1ojdyje1.f1ojdyje1 {
            color: red;
          }
        }
      `);
    });

    it('allows to increase for RTL', () => {
      expect(resolveStyleRules({ left: '5px' }, 1)).toMatchInlineSnapshot(`
        .f5b3q4t1.f5b3q4t1 {
          left: 5px;
        }
        .rf5b3q4t1.rf5b3q4t1 {
          right: 5px;
        }
      `);
    });

    it('generates unique classnames with different specificity', () => {
      function getFirstClassName(resolvedStyles: Record<string, MakeStylesResolvedRule>): string {
        return resolvedStyles[Object.keys(resolvedStyles)[0]][0];
      }

      const classnamesSet = new Set<string>();

      classnamesSet.add(getFirstClassName(resolveStyleRules({ color: 'red' })));
      classnamesSet.add(getFirstClassName(resolveStyleRules({ color: 'red' }, 1)));
      classnamesSet.add(getFirstClassName(resolveStyleRules({ color: 'red' }, 2)));

      expect(classnamesSet.size).toBe(3);
    });
  });
});
