import { createDOMRenderer, MakeStylesDOMRenderer, resetDOMRenderer } from './renderer/createDOMRenderer';
import { makeStyles } from './makeStyles';
import { makeStylesRendererSerializer } from './utils/test/snapshotSerializer';

expect.addSnapshotSerializer(makeStylesRendererSerializer);

function createFakeDocument(): Document {
  const doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
  doc.documentElement.appendChild(document.createElementNS('http://www.w3.org/1999/xhtml', 'head'));

  return doc;
}

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

    expect(renderer).toMatchInlineSnapshot(`
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

    expect(renderer).toMatchInlineSnapshot(`
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
    expect(rtlClasses).toEqual('__hcjvlo0 rfrdkuqy0 rf1c8chgj');

    expect(renderer).toMatchInlineSnapshot(`
      .frdkuqy0 {
        padding-left: 10px;
      }
      .f1c8chgj {
        border-left-width: 10px;
      }
      .rfrdkuqy0 {
        padding-right: 10px;
      }
      .rf1c8chgj {
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
    expect(computeClasses({ dir: 'rtl', renderer, tokens: {} }).root).toBe('__194gjlt rf1g6ul6r f1cpbl36 f1t9cprh');

    expect(renderer).toMatchInlineSnapshot(`
      @-webkit-keyframes rf1q8eu9e {
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
      .rf1g6ul6r {
        -webkit-animation-name: rf1q8eu9e;
        animation-name: rf1q8eu9e;
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

  it('handles multiple renderers', () => {
    const rendererA = createDOMRenderer(createFakeDocument());
    const rendererB = createDOMRenderer(createFakeDocument());

    const computeClasses = makeStyles({
      root: { display: 'flex', paddingLeft: '10px' },
    });

    const classesA = computeClasses({ dir: 'rtl', renderer: rendererA, tokens: {} }).root;

    computeClasses({ dir: 'ltr', renderer: rendererB, tokens: {} }).root;
    const classesB = computeClasses({ dir: 'rtl', renderer: rendererB, tokens: {} }).root;

    // Classes emitted by different renderers can be the same
    expect(classesA).toBe(classesB);
    // Style elements should be different for different renderers
    expect(rendererA.styleElements['']).not.toBe(rendererB.styleElements['']);

    expect(rendererA).toMatchInlineSnapshot(`
      .f22iagw0 {
        display: flex;
      }
      .rfrdkuqy0 {
        padding-right: 10px;
      }
    `);
    expect(rendererB).toMatchInlineSnapshot(`
      .f22iagw0 {
        display: flex;
      }
      .frdkuqy0 {
        padding-left: 10px;
      }
      .rfrdkuqy0 {
        padding-right: 10px;
      }
    `);
  });
});
