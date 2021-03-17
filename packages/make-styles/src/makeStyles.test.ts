import { getCSSRules } from '@fluentui/test-utilities';
import { createDOMRenderer, MakeStylesDOMRenderer, resetDOMRenderer } from './renderer/createDOMRenderer';
import { makeStyles } from './makeStyles';
import { cssRulesSerializer } from './utils/test/snapshotSerializer';

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
    expect(computeClasses({ renderer, tokens: {} }).root).toEqual('__ncdyee0 fe3e8s90');

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
    expect(computeClasses({ renderer, tokens: {} }).root).toEqual('__1fslksb fe3e8s90 f1euv43f');

    expect(getCSSRules(renderer.styleElement)).toMatchInlineSnapshot(`
      .fe3e8s90 {
        color: red;
      }
      .f1euv43f {
        position: absolute;
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
    expect(computeClasses({ renderer, tokens: {}, rtl: true }).root).toBe('__la4fka0 rfkf6eed0 f1cpbl36 f1t9cprh');

    const rules = getCSSRules(renderer.styleElement);
    expect(rules).toMatchInlineSnapshot(`
      @-webkit-keyframes rf13owpa8 {
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
      .rfkf6eed0 {
        -webkit-animation-name: rf13owpa8;
        animation-name: rf13owpa8;
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
