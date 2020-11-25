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

    it('handles media queries', () => {
      expect(
        resolveStyleRules({
          color: 'green',
          '@media screen and (max-width: 992px)': { color: 'red ' },
        }),
      ).toMatchInlineSnapshot(`
        .fka9v86 {
          color: green;
        }
        @media screen and (max-width: 992px) {
          .ffbutly {
            color: red;
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
  });
});
