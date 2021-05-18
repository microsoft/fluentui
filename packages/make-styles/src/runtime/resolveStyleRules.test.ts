import { RULE_CLASSNAME_INDEX } from '../constants';
import { MakeStylesResolvedRule } from '../types';
import { makeStylesRulesSerializer } from '../utils/test/snapshotSerializer';
import { resolveStyleRules } from './resolveStyleRules';

expect.addSnapshotSerializer(makeStylesRulesSerializer);

function getFirstClassName(resolvedStyles: Record<string, MakeStylesResolvedRule>): string {
  return resolvedStyles[Object.keys(resolvedStyles)[0]][RULE_CLASSNAME_INDEX] as string;
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
        .f15vdbe4 {
          padding-left: 5px;
        }
        .fdghr9 {
          padding-bottom: 5px;
        }
        .f15vdbe4 {
          padding-left: 5px;
        }
        .fwiuce9 {
          padding-right: 5px;
        }
      `);
    });

    it('shorthands and longhands work like in CSS', () => {
      expect(
        resolveStyleRules({
          margin: '5px',
          marginLeft: '10px',
        }),
      ).toMatchInlineSnapshot(`
        .f1rqyxcv {
          margin-top: 5px;
        }
        .fq02s40 {
          margin-right: 5px;
        }
        .f1f7bkv5 {
          margin-left: 5px;
        }
        .f475ppk {
          margin-bottom: 5px;
        }
        .f1oou7ox {
          margin-left: 10px;
        }
        .f1pxv85q {
          margin-right: 10px;
        }
      `);

      expect(
        resolveStyleRules({
          marginLeft: '10px',
          margin: '5px',
        }),
      ).toMatchInlineSnapshot(`
        .f1f7bkv5 {
          margin-left: 5px;
        }
        .fq02s40 {
          margin-right: 5px;
        }
        .f1rqyxcv {
          margin-top: 5px;
        }
        .fq02s40 {
          margin-right: 5px;
        }
        .f1f7bkv5 {
          margin-left: 5px;
        }
        .f475ppk {
          margin-bottom: 5px;
        }
      `);
    });

    it('performs vendor prefixing', () => {
      expect(resolveStyleRules({ display: 'flex' })).toMatchInlineSnapshot(`
        .f22iagw {
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
        .flgfsvn {
          right: 5px;
        }
      `);
    });

    it('handles RTL @noflip', () => {
      expect(resolveStyleRules({ left: '5px /* @noflip */' })).toMatchInlineSnapshot(`
        .fm76jd0 {
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
          ':global(body) &': { color: 'green' },
        }),
      ).toMatchInlineSnapshot(`
        body .fm1e7ra {
          color: green;
        }
      `);
    });

    it('handles :global selector', () => {
      expect(
        resolveStyleRules({
          ':global(body)': {
            ':focus': {
              color: 'green',
              ':hover': { color: 'blue' },
              '& .foo': { color: 'yellow' },
            },
          },
        }),
      ).toMatchInlineSnapshot(`
        body .f192vvyd:focus {
          color: green;
        }
        body .f1tz2pjr:focus:hover {
          color: blue;
        }
        body .f1dl7obt:focus .foo {
          color: yellow;
        }
      `);
      expect(
        resolveStyleRules({
          ':global(body) :focus': { color: 'green' },
          ':global(body) :focus:hover': { color: 'blue' },
          ':global(body) :focus .foo': { color: 'yellow' },
        }),
      ).toMatchInlineSnapshot(`
        body .frou13r:focus {
          color: green;
        }
        body .f1emv7y1:focus:hover {
          color: blue;
        }
        body .f1g015sp:focus .foo {
          color: yellow;
        }
      `);
    });

    // it.todo('supports :global as a nested selector', () => {
    //   expect(
    //     resolveStyleRules({
    //       ':focus': { ':global(body)': { color: 'green' } },
    //     }),
    //   ).toMatchInlineSnapshot(`
    //     body .fm1e7ra0:focus {
    //       color: green;
    //     }
    //   `);
    // });
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
        .fc59ano {
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
        @-webkit-keyframes f1q8eu9e {
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
        @keyframes f1q8eu9e {
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
        @-webkit-keyframes f55c0se {
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
        @keyframes f55c0se {
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
        .f1g6ul6r {
          -webkit-animation-name: f1q8eu9e;
          animation-name: f1q8eu9e;
        }
        .f1fp4ujf {
          -webkit-animation-name: f55c0se;
          animation-name: f55c0se;
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
        @-webkit-keyframes f1q8eu9e {
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
        @keyframes f1q8eu9e {
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
        @-webkit-keyframes f5j8bii {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes f5j8bii {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @-webkit-keyframes f55c0se {
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
        @keyframes f55c0se {
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
        .f1al5ov7 {
          -webkit-animation-name: f1q8eu9e f5j8bii;
          animation-name: f1q8eu9e f5j8bii;
        }
        .f1yfduy3 {
          -webkit-animation-name: f55c0se f5j8bii;
          animation-name: f55c0se f5j8bii;
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

  describe('output', () => {
    it('contains less members for properties that do not depend on text direction', () => {
      expect(resolveStyleRules({ color: 'red', paddingLeft: '10px' })).toEqual({
        sj55zd: ['', 'fe3e8s9', '.fe3e8s9{color:red;}'],
        uwmqm3: ['', 'frdkuqy', '.frdkuqy{padding-left:10px;}', 'f81rol6', '.f81rol6{padding-right:10px;}'],
      });
    });
  });

  describe('experimental', () => {
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
        .flgfsvn1.flgfsvn1 {
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
