import { computePosition as computeOracle, hide, shift } from '@floating-ui/dom';
import { computePosition } from './engine/computePosition';
import { getClippingRect } from './engine/platform';

// These dimensions are geometry inputs, not product styling.
function element(doc: Document, tag: string, css: Partial<CSSStyleDeclaration>, parent: Node): HTMLElement {
  const node = doc.createElement(tag);
  Object.assign(node.style, css);
  parent.appendChild(node);
  return node;
}

async function expectParity(target: HTMLElement, floating: HTMLElement) {
  const expected = await computeOracle(target, floating, {
    placement: 'bottom',
    strategy: 'fixed',
    middleware: [shift(), hide(), hide({ strategy: 'escaped' })],
  });
  const actual = await computePosition(target, floating, {
    placement: 'bottom',
    strategy: 'fixed',
    positioningOptions: { pinned: true },
  });
  if (!actual.middlewareData.hide || !expected.middlewareData.hide) {
    throw new Error('Both engines must report visibility');
  }
  expect(actual.x, 'x').to.equal(expected.x);
  expect(actual.y, 'y').to.equal(expected.y);
  expect(actual.middlewareData.hide.referenceHidden, 'reference visibility').to.equal(
    expected.middlewareData.hide.referenceHidden,
  );
  expect(actual.middlewareData.hide.escaped, 'surface visibility').to.equal(expected.middlewareData.hide.escaped);
}

describe('positioning engine browser regressions', () => {
  let root: HTMLElement;
  beforeEach(() => {
    cy.viewport(800, 600);
    cy.document().then(doc => {
      root = element(doc, 'div', { position: 'fixed', inset: '0' }, doc.body);
    });
  });
  afterEach(() => root.remove());

  for (const property of ['translate', 'scale', 'rotate'] as const) {
    it(`recognizes the individual ${property} containing block`, () => {
      cy.document().then(async doc => {
        const host = element(
          doc,
          'div',
          {
            position: 'absolute',
            left: '40px',
            top: '40px',
            width: '200px',
            height: '200px',
            transformOrigin: '0 0',
          },
          root,
        );
        host.style[property] = property === 'translate' ? '40px 30px' : property === 'scale' ? '1.5' : '0deg';
        const target = element(
          doc,
          'div',
          { position: 'fixed', left: '300px', top: '240px', width: '80px', height: '40px' },
          root,
        );
        const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, host);
        // The pinned Floating UI version predates individual transform properties.
        const result = await computePosition(target, floating, {
          strategy: 'fixed',
          positioningOptions: { pinned: true },
        });
        floating.style.left = `${result.x}px`;
        floating.style.top = `${result.y}px`;
        const targetRect = target.getBoundingClientRect();
        const floatingRect = floating.getBoundingClientRect();
        expect(floatingRect.x).to.equal(targetRect.x + (targetRect.width - floatingRect.width) / 2);
        expect(floatingRect.y).to.equal(targetRect.bottom);
      });
    });
  }

  it('crosses a shadow root to find a transformed containing block', () => {
    cy.document().then(async doc => {
      const host = element(
        doc,
        'div',
        { position: 'absolute', left: '50px', top: '60px', transform: 'translate(40px, 30px)' },
        root,
      );
      const shadow = host.attachShadow({ mode: 'open' });
      const target = element(
        doc,
        'div',
        { position: 'fixed', left: '300px', top: '240px', width: '80px', height: '40px' },
        root,
      );
      const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, shadow);
      await expectParity(target, floating);
    });
  });
  it('recognizes content-visibility containment', () => {
    cy.document().then(async doc => {
      const host = element(
        doc,
        'div',
        {
          position: 'absolute',
          left: '50px',
          top: '60px',
          width: '200px',
          height: '200px',
          contentVisibility: 'auto',
        },
        root,
      );
      const target = element(
        doc,
        'div',
        { position: 'fixed', left: '300px', top: '240px', width: '80px', height: '40px' },
        root,
      );
      const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, host);
      const result = await computePosition(target, floating, {
        strategy: 'fixed',
        positioningOptions: { pinned: true },
      });
      floating.style.left = `${result.x}px`;
      floating.style.top = `${result.y}px`;
      expect(floating.getBoundingClientRect().x).to.equal(280);
      expect(floating.getBoundingClientRect().y).to.equal(280);
    });
  });
  it('includes clipping ancestors outside an iframe reference document', () => {
    cy.document().then(async doc => {
      const host = element(
        doc,
        'div',
        { position: 'relative', width: '100px', height: '100px', overflow: 'hidden' },
        root,
      );
      const frame = doc.createElement('iframe');
      Object.assign(frame.style, {
        position: 'relative',
        left: '200px',
        width: '300px',
        height: '200px',
        border: '0',
      });
      host.appendChild(frame);
      const inner = frame.contentDocument!;
      inner.body.style.margin = '0';
      const target = element(inner, 'div', { width: '40px', height: '20px' }, inner.body);
      const floating = element(doc, 'div', { position: 'fixed', width: '60px', height: '30px' }, root);
      const result = await computePosition(target, floating, {
        strategy: 'fixed',
        positioningOptions: { pinned: true },
      });
      expect(result.middlewareData.hide?.referenceHidden, 'reference outside parent clipping host').to.equal(true);
    });
  });

  it('includes a clipping shadow host in reference visibility', () => {
    cy.document().then(async doc => {
      const host = element(
        doc,
        'div',
        { position: 'absolute', left: '100px', top: '100px', width: '100px', height: '100px', overflow: 'hidden' },
        root,
      );
      const target = element(
        doc,
        'div',
        { position: 'relative', top: '150px', width: '80px', height: '40px' },
        host.attachShadow({ mode: 'open' }),
      );
      const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, root);
      await expectParity(target, floating);
      expect(getClippingRect(target, 'clippingAncestors').height).to.equal(100);
    });
  });

  for (const display of ['inline', 'contents']) {
    it(`does not clip to an overflow ${display} ancestor`, () => {
      cy.document().then(async doc => {
        const host = element(doc, 'span', { display, overflow: 'hidden' }, root);
        const target = element(
          doc,
          'div',
          { position: 'relative', marginLeft: '300px', marginTop: '240px', width: '80px', height: '40px' },
          host,
        );
        const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, root);
        await expectParity(target, floating);
      });
    });
  }

  it('keeps viewport-fixed positioning through an untransformed absolute wrapper', () => {
    cy.document().then(async doc => {
      const outer = element(
        doc,
        'div',
        { position: 'relative', left: '50px', top: '100px', width: '100px', height: '100px', overflow: 'hidden' },
        root,
      );
      const wrapper = element(doc, 'div', { position: 'absolute' }, outer);
      const target = element(
        doc,
        'div',
        { position: 'fixed', left: '350px', top: '240px', width: '80px', height: '40px' },
        root,
      );
      const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, wrapper);
      await expectParity(target, floating);
    });
  });

  for (const scale of [1, 1.5]) {
    it(`normalizes a bordered, padded iframe reference at scale ${scale}`, () => {
      cy.document().then(async doc => {
        const frame = doc.createElement('iframe');
        Object.assign(frame.style, {
          position: 'absolute',
          left: '200px',
          top: '100px',
          width: '300px',
          height: '200px',
          border: '5px solid',
          padding: '7px',
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
        });
        root.appendChild(frame);
        const inner = frame.contentDocument!;
        inner.body.style.margin = '0';
        const target = element(
          inner,
          'div',
          { position: 'absolute', left: '20px', top: '30px', width: '40px', height: '20px' },
          inner.body,
        );
        const floating = element(doc, 'div', { position: 'fixed', width: '60px', height: '30px' }, root);
        await expectParity(target, floating);
        expect(getClippingRect(target, 'clippingAncestors', doc.defaultView!).x).to.equal(200 + 12 * scale);
      });
    });
  }
});
