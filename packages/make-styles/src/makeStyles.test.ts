import { getCSSRules } from '@fluentui/test-utilities';
import { createDOMRenderer, MakeStylesDOMRenderer, resetDOMRenderer } from './renderer/createDOMRenderer';
import { makeStyles } from './makeStyles';
import { cssRulesSerializer } from './utils/test/snapshotSerializer';
import { RTL_CLASSNAME } from './constants';

expect.addSnapshotSerializer(cssRulesSerializer);

describe('makeStyles', () => {
  let renderer: MakeStylesDOMRenderer;
  beforeEach(() => {
    renderer = createDOMRenderer();
  });

  afterEach(() => {
    resetDOMRenderer();
  });

  it('returns a single classname for a single style', () => {
    const computeClasses = makeStyles({
      root: {
        color: 'red',
      },
    });
    expect(computeClasses({ dir: 'ltr', renderer, tokens: {} }).root).toEqual('__ncdyee0 fe3e8s90');

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      .fe3e8s90 {
        color: red;
      }
    `);
  });

  it('returns multiple classnames for complex rules', () => {
    const computeClasses = makeStyles({
      root: {
        color: 'red',
        position: 'absolute',
      },
    });
    expect(computeClasses({ dir: 'ltr', renderer, tokens: {} }).root).toEqual('__1fslksb fe3e8s90 f1euv43f');

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      .fe3e8s90 {
        color: red;
      }
      .f1euv43f {
        position: absolute;
      }
    `);
  });

  it('handles RTL for styles', () => {
    const computeClasses = makeStyles({
      root: {
        paddingLeft: '10px',
        borderLeftWidth: '10px',
      },
    });

    const ltrClasses = computeClasses({ dir: 'ltr', renderer, tokens: {} }).root;
    const rtlClasses = computeClasses({ dir: 'rtl', renderer, tokens: {} }).root;

    expect(ltrClasses).toEqual('__947mlk0 frdkuqy0 f1c8chgj');
    expect(rtlClasses).toEqual('rtl __947mlk0 frdkuqy0 f1c8chgj');

    // Classes should be the same for LTR & RTL
    expect(`${RTL_CLASSNAME} ${ltrClasses}`).toEqual(rtlClasses);

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      .frdkuqy0 {
        padding-left: 10px;
      }
      .frdkuqy0.rtl {
        padding-right: 10px;
      }
      .f1c8chgj {
        border-left-width: 10px;
      }
      .f1c8chgj.rtl {
        border-right-width: 10px;
      }
    `);
  });

  it('handles RTL for keyframes', () => {
    const computeClasses = makeStyles({
      root: {
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
      },
    });
    expect(computeClasses({ dir: 'rtl', renderer, tokens: {} }).root).toBe('rtl __16fr7y6 fkf6eed0 f1cpbl36 f1t9cprh');

    const rules = getCSSRules(renderer.styleElement);
    expect(rules).toMatchInlineSnapshot(`
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
});
