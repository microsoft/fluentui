import { resolveStyleRules } from './resolveStyleRules';
import { MakeStylesResolvedRule } from '../types';
import { makeStylesRulesSerializer } from '../utils/test/snapshotSerializer';

expect.addSnapshotSerializer(makeStylesRulesSerializer);

function getFirstClassName(resolvedStyles: Record<string, MakeStylesResolvedRule>): string {
  return resolvedStyles[Object.keys(resolvedStyles)[0]][0] as string;
}

describe('resolveStyleRules', () => {
  describe('classnames', () => {
    it('generates unique classnames for pseudo selectors', () => {
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
        .fe3e8s90 {
          color: red;
        }
      `);
    });

    it('resolves multiple rules', () => {
      expect(resolveStyleRules({ backgroundColor: 'green', color: 'red' })).toMatchInlineSnapshot(`
        .fcnqdeg0 {
          background-color: green;
        }
        .fe3e8s90 {
          color: red;
        }
      `);
    });

    it('trims values to generate the same classes', () => {
      expect(resolveStyleRules({ color: 'red ' /* ends with a space */ })).toMatchInlineSnapshot(`
        .fe3e8s90 {
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
        .f1qux400 {
          --foo: var(--bar);
        }
        .f14u9570 {
          --fooBar: var(--barBaz);
        }
        .f3xbvq90 {
          background-color: red;
        }
        .fr90kjk0 {
          -moz-animation: initial;
        }
      `);
    });

    it('performs expansion of shorthands', () => {
      expect(resolveStyleRules({ outline: '1px' })).toMatchInlineSnapshot(`
        .fpvhumw0 {
          outline-width: 1px;
        }
      `);
      expect(resolveStyleRules({ padding: '5px' })).toMatchInlineSnapshot(`
        .f1sbtcvk {
          padding-top: 5px;
        }
        .fwiuce90 {
          padding-right: 5px;
        }
        .fwiuce90.rtl {
          padding-left: 5px;
        }
        .fdghr900 {
          padding-bottom: 5px;
        }
        .f15vdbe4 {
          padding-left: 5px;
        }
        .f15vdbe4.rtl {
          padding-right: 5px;
        }
      `);
    });

    it('performs vendor prefixing', () => {
      expect(resolveStyleRules({ display: 'flex' })).toMatchInlineSnapshot(`
        .f22iagw0 {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
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
        .f19g0ac0 {
          z-index: 1;
        }
      `);
    });

    it('handles RTL', () => {
      expect(resolveStyleRules({ left: '5px' })).toMatchInlineSnapshot(`
        .f5b3q4t0 {
          left: 5px;
        }
        .f5b3q4t0.rtl {
          right: 5px;
        }
      `);
    });

    it('handles RTL @noflip', () => {
      expect(resolveStyleRules({ left: '5px /* @noflip */' })).toMatchInlineSnapshot(`
        .fm76jd00 {
          left: 5px;
        }
      `);
    });

    it('RTL @noflip will generate a different className', () => {
      const classnamesSet = new Set<string>();

      // Definitions with @noflip cannot be reused to usual ones as expected RTL styles will be different

      classnamesSet.add(getFirstClassName(resolveStyleRules({ left: '5px' })));
      classnamesSet.add(getFirstClassName(resolveStyleRules({ left: '5px /* @noflip */' })));

      expect(classnamesSet.size).toBe(2);
    });

    it('handles nested selectors', () => {
      expect(resolveStyleRules({ ':hover': { color: 'red' } })).toMatchInlineSnapshot(`
        .faf35ka0:hover {
          color: red;
        }
      `);
      expect(resolveStyleRules({ '::after': { content: '""' } })).toMatchInlineSnapshot(`
        .f13zj6fq::after {
          content: "";
        }
      `);

      expect(resolveStyleRules({ '[data-fluent="true"]': { color: 'green' } })).toMatchInlineSnapshot(`
        .fcopvey0[data-fluent="true"] {
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
        .fe1zdmy0.foo {
          color: green;
        }
      `);

      expect(resolveStyleRules({ '& #foo': { color: 'green' } })).toMatchInlineSnapshot(`
        .fie1itf0 #foo {
          color: green;
        }
      `);
      expect(resolveStyleRules({ '&#foo': { color: 'green' } })).toMatchInlineSnapshot(`
        .fwxog6r0#foo {
          color: green;
        }
      `);
    });

    it('handles complex nested selectors', () => {
      expect(resolveStyleRules({ '& > :first-child': { '& svg': { color: 'red' } } })).toMatchInlineSnapshot(`
        .fxfx2ih0 > :first-child svg {
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
        .fka9v860 {
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
        .fka9v860 {
          color: green;
        }
        @media screen and (max-width: 992px) {
          .f7wpa5l0:hover {
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
        .fe3e8s90 {
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
        body .fm1e7ra0 {
          color: green;
        }
      `);
    });
  });

  describe('keyframes', () => {
    it('allows to define string as animationName', () => {
      expect(
        resolveStyleRules({
          animationName: 'fade-in slide-out',
          animationIterationCount: 'infinite',
          animationDuration: '5s',
        }),
      ).toMatchInlineSnapshot(`
        .fc59ano0 {
          -webkit-animation-name: fade-in slide-out;
          animation-name: fade-in slide-out;
        }
        .f1cpbl36 {
          -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
        }
        .f1t9cprh {
          -webkit-animation-duration: 5s;
          animation-duration: 5s;
        }
      `);
    });

    it('allows to define object as animationName', () => {
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
        @-webkit-keyframes f13owpa8 {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes f13owpa8 {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @-webkit-keyframes rtlf13owpa8 {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -ms-transform: rotate(-360deg);
            transform: rotate(-360deg);
          }
        }
        @keyframes rtlf13owpa8 {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -ms-transform: rotate(-360deg);
            transform: rotate(-360deg);
          }
        }
        .fkf6eed0 {
          -webkit-animation-name: f13owpa8;
          animation-name: f13owpa8;
        }
        .fkf6eed0.rtl {
          -webkit-animation-name: rtlf13owpa8;
          animation-name: rtlf13owpa8;
        }
        .f1cpbl36 {
          -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
        }
        .f1t9cprh {
          -webkit-animation-duration: 5s;
          animation-duration: 5s;
        }
      `);
    });

    it('allows to define array as animationName', () => {
      expect(
        resolveStyleRules({
          animationName: [
            {
              from: {
                transform: 'rotate(0deg)',
              },
              to: {
                transform: 'rotate(360deg)',
              },
            },
            {
              from: {
                opacity: 0,
              },
              to: {
                opacity: 1,
              },
            },
          ],
          animationIterationCount: 'infinite',
          animationDuration: '5s',
        }),
      ).toMatchInlineSnapshot(`
        @-webkit-keyframes f13owpa8 {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @keyframes f13owpa8 {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            transform: rotate(360deg);
          }
        }
        @-webkit-keyframes f1qa61cu {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes f1qa61cu {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @-webkit-keyframes rtlf13owpa8 {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -ms-transform: rotate(-360deg);
            transform: rotate(-360deg);
          }
        }
        @keyframes rtlf13owpa8 {
          from {
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(-360deg);
            -moz-transform: rotate(-360deg);
            -ms-transform: rotate(-360deg);
            transform: rotate(-360deg);
          }
        }
        .f18gdskf {
          -webkit-animation-name: f13owpa8 f1qa61cu;
          animation-name: f13owpa8 f1qa61cu;
        }
        .f18gdskf.rtl {
          -webkit-animation-name: rtlf13owpa8 f1qa61cu;
          animation-name: rtlf13owpa8 f1qa61cu;
        }
        .f1cpbl36 {
          -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
        }
        .f1t9cprh {
          -webkit-animation-duration: 5s;
          animation-duration: 5s;
        }
      `);
    });
  });

  describe('experimental', () => {
    it('allows to increase specificity', () => {
      expect(resolveStyleRules({ color: 'red' }, 1)).toMatchInlineSnapshot(`
        .fe3e8s901.fe3e8s901 {
          color: red;
        }
      `);
      expect(resolveStyleRules({ color: 'red' }, 2)).toMatchInlineSnapshot(`
        .fe3e8s902.fe3e8s902.fe3e8s902 {
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
        .f5b3q4t01.f5b3q4t01 {
          left: 5px;
        }
        .f5b3q4t01.f5b3q4t01.rtl {
          right: 5px;
        }
      `);
    });

    it('generates unique classnames with different specificity', () => {
      const classnamesSet = new Set<string>();

      classnamesSet.add(getFirstClassName(resolveStyleRules({ color: 'red' })));
      classnamesSet.add(getFirstClassName(resolveStyleRules({ color: 'red' }, 1)));
      classnamesSet.add(getFirstClassName(resolveStyleRules({ color: 'red' }, 2)));

      expect(classnamesSet.size).toBe(3);
    });
  });
});
