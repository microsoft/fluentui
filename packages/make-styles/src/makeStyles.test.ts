import { createDOMRenderer } from './renderer/createDOMRenderer';
import { makeStylesRendererSerializer } from './utils/test/snapshotSerializer';
import { makeStyles } from './makeStyles';
import { MakeStylesRenderer } from './types';

expect.addSnapshotSerializer(makeStylesRendererSerializer);

function createFakeDocument(): Document {
  const doc = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
  doc.documentElement.appendChild(document.createElementNS('http://www.w3.org/1999/xhtml', 'head'));

  return doc;
}

describe('makeStyles', () => {
  let renderer: MakeStylesRenderer;

  beforeEach(() => {
    renderer = createDOMRenderer(document);
  });

  it('returns a single classname for a single style', () => {
    const computeClasses = makeStyles({
      root: {
        color: 'red',
      },
    });
    expect(computeClasses({ dir: 'ltr', renderer }).root).toEqual('__afhpfp0 fe3e8s9');

    expect(renderer).toMatchInlineSnapshot(`
      .fe3e8s9 {
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
    expect(computeClasses({ dir: 'ltr', renderer }).root).toEqual('__1jgns8t fe3e8s9 f1euv43f');

    expect(renderer).toMatchInlineSnapshot(`
      .fe3e8s9 {
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

    const ltrClasses = computeClasses({ dir: 'ltr', renderer }).root;
    const rtlClasses = computeClasses({ dir: 'rtl', renderer }).root;

    expect(ltrClasses).toEqual('__a0zqzs0 frdkuqy f1c8chgj');
    expect(rtlClasses).toEqual('__7x57i00 f81rol6 f19krssl');

    expect(renderer).toMatchInlineSnapshot(`
      .frdkuqy {
        padding-left: 10px;
      }
      .f1c8chgj {
        border-left-width: 10px;
      }
      .f81rol6 {
        padding-right: 10px;
      }
      .f19krssl {
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
    expect(computeClasses({ dir: 'rtl', renderer }).root).toBe('__3kh5ri0 f1fp4ujf f1cpbl36 f1t9cprh');

    expect(renderer).toMatchInlineSnapshot(`
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

  it('handles multiple renderers', () => {
    const rendererA = createDOMRenderer(createFakeDocument());
    const rendererB = createDOMRenderer(createFakeDocument());

    const computeClasses = makeStyles({
      root: { display: 'flex', paddingLeft: '10px' },
    });

    const classesA = computeClasses({ dir: 'rtl', renderer: rendererA }).root;

    computeClasses({ dir: 'ltr', renderer: rendererB }).root;
    const classesB = computeClasses({ dir: 'rtl', renderer: rendererB }).root;

    // Classes emitted by different renderers can be the same
    expect(classesA).toBe(classesB);
    // Style elements should be different for different renderers
    expect(rendererA.styleElements['']).not.toBe(rendererB.styleElements['']);

    expect(rendererA).toMatchInlineSnapshot(`
      .f22iagw {
        display: flex;
      }
      .f81rol6 {
        padding-right: 10px;
      }
    `);
    expect(rendererB).toMatchInlineSnapshot(`
      .f22iagw {
        display: flex;
      }
      .frdkuqy {
        padding-left: 10px;
      }
      .f81rol6 {
        padding-right: 10px;
      }
    `);
  });

  it('handles tokens', () => {
    const computeClasses = makeStyles<'root', { display: string }>({
      root: tokens => ({ display: tokens.display }),
    });
    computeClasses({ dir: 'rtl', renderer });

    expect(renderer).toMatchInlineSnapshot(`
      .fl81ese {
        display: var(--display);
      }
    `);
  });
});
