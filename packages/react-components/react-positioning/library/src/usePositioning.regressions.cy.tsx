import { computePosition as computeOracle, hide, shift, offset, limitShift } from '@floating-ui/dom';
import { computePosition } from './engine/computePosition';
import { getClippingRect } from './engine/platform';
import type { TargetElement } from './types';

// These dimensions are geometry inputs, not product styling.
function element(doc: Document, tag: string, css: Partial<CSSStyleDeclaration>, parent: Node): HTMLElement {
  const node = doc.createElement(tag);
  Object.assign(node.style, css);
  parent.appendChild(node);
  return node;
}

async function expectParity(target: TargetElement, floating: HTMLElement) {
  const expected = await computeOracle(target, floating, {
    placement: 'bottom',
    strategy: 'fixed',
    middleware: [shift(), hide(), hide({ strategy: 'escaped' })],
  });
  const actual = await computePosition(target, floating, {
    placement: 'bottom',
    strategy: 'fixed',
    options: { pinned: true },
  });
  if (!expected.middlewareData.hide) {
    throw new Error('Both engines must report visibility');
  }
  expect(actual.x, 'x').to.equal(expected.x);
  expect(actual.y, 'y').to.equal(expected.y);
  expect(actual.referenceHidden, 'reference visibility').to.equal(expected.middlewareData.hide.referenceHidden);
  expect(actual.escaped, 'surface visibility').to.equal(expected.middlewareData.hide.escaped);
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

  it('ignores positioned display: contents ancestors in a scrolled document', () => {
    cy.document().then(async doc => {
      const win = doc.defaultView!;
      const originalScroll = win.scrollY;
      Object.assign(root.style, { position: 'static', height: '1600px' });
      const target = element(
        doc,
        'div',
        { position: 'fixed', left: '350px', top: '240px', width: '80px', height: '40px' },
        root,
      );
      const wrapper = element(doc, 'div', { display: 'contents', position: 'relative' }, root);
      const floating = element(doc, 'div', { position: 'absolute', width: '120px', height: '60px' }, wrapper);
      try {
        win.scrollTo(0, 200);
        expect(win.scrollY, 'document scroll').to.equal(200);
        const actual = await computePosition(target, floating, {
          strategy: 'absolute',
          options: { pinned: true },
        });
        Object.assign(floating.style, { left: `${actual.x}px`, top: `${actual.y}px` });
        const bounds = floating.getBoundingClientRect();
        expect(bounds.x, 'physical x').to.equal(330);
        expect(bounds.y, 'physical y').to.equal(280);
      } finally {
        win.scrollTo(0, originalScroll);
      }
    });
  });

  for (const kind of ['popover', 'dialog', 'containedPopover']) {
    it(`stops containing-block and clipping traversal beyond a ${kind} ancestor`, () => {
      cy.document().then(async doc => {
        const target = element(
          doc,
          'div',
          { position: 'fixed', left: '350px', top: '240px', width: '80px', height: '40px' },
          root,
        );
        const outer = element(
          doc,
          'div',
          {
            position: 'absolute',
            left: '50px',
            top: '60px',
            width: '100px',
            height: '100px',
            transform: 'translate(40px, 30px)',
            overflow: 'hidden',
          },
          root,
        );
        const topLayer = element(
          doc,
          kind === 'dialog' ? 'dialog' : 'div',
          {
            position: 'fixed',
            left: '100px',
            top: '100px',
            width: '200px',
            height: '200px',
            margin: '0',
            padding: '0',
            border: '0',
            ...(kind === 'containedPopover' && { transform: 'translate(20px, 30px)', overflow: 'hidden' }),
          },
          outer,
        );
        if (kind === 'dialog') {
          (topLayer as HTMLDialogElement).showModal();
        } else {
          topLayer.popover = 'manual';
          topLayer.showPopover();
        }
        const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, topLayer);
        const actual = await computePosition(target, floating, {
          strategy: 'fixed',
          options: { pinned: true },
        });
        Object.assign(floating.style, { left: `${actual.x}px`, top: `${actual.y}px` });
        const bounds = floating.getBoundingClientRect();
        expect(bounds.x, 'physical x').to.equal(kind === 'containedPopover' ? 200 : 330);
        expect(bounds.y, 'physical y').to.equal(280);
        expect(actual.referenceHidden, 'reference visibility').to.equal(false);
        expect(actual.escaped, 'surface visibility').to.equal(false);
      });
    });
  }

  for (const disableTether of [true, 'all'] as const) {
    it(`preserves the cross-axis limiter for disabled tether ${disableTether}`, () => {
      cy.document().then(async doc => {
        const target = element(
          doc,
          'div',
          { position: 'fixed', left: '300px', top: '240px', width: '80px', height: '40px' },
          root,
        );
        const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, root);
        const expected = await computeOracle(target, floating, {
          placement: 'bottom',
          strategy: 'fixed',
          middleware: [
            offset(-200),
            shift({
              crossAxis: disableTether === 'all',
              limiter: limitShift({ crossAxis: disableTether !== 'all', mainAxis: false }),
            }),
          ],
        });
        const actual = await computePosition(target, floating, {
          strategy: 'fixed',
          options: {
            pinned: true,
            offset: -200,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            unstable_disableTether: disableTether,
          },
        });
        expect(actual.y).to.equal(disableTether === 'all' ? 80 : 180);
        expect(actual.x).to.equal(expected.x);
        expect(actual.y).to.equal(expected.y);
      });
    });
  }

  it('keeps the ordered limiter bounds when a negative offset inverts them', () => {
    cy.document().then(async doc => {
      const target = element(
        doc,
        'div',
        { position: 'fixed', left: '300px', top: '240px', width: '80px', height: '40px' },
        root,
      );
      const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, root);
      const expected = await computeOracle(target, floating, {
        placement: 'top',
        strategy: 'fixed',
        middleware: [
          offset(-200),
          shift({ crossAxis: true, limiter: limitShift({ crossAxis: true, mainAxis: false }) }),
        ],
      });
      const actual = await computePosition(target, floating, {
        placement: 'top',
        strategy: 'fixed',
        options: { pinned: true, offset: -200, shiftToCoverTarget: true },
      });
      // The limits are 380 (min) and 280 (max): the surface stays attached to the bottom edge of the target
      expect(actual.y).to.equal(280);
      expect(actual.x).to.equal(expected.x);
      expect(actual.y).to.equal(expected.y);
    });
  });

  it('measures clipping again after auto-sizing removes the scrollbar of an ancestor', () => {
    cy.document().then(async doc => {
      // Classic scrollbars of a known size, regardless of the overlay scrollbar settings of the host
      const scrollbars = element(doc, 'style', {}, root);
      scrollbars.textContent = '.fui-test-scrollbars::-webkit-scrollbar { width: 20px; height: 20px }';
      const scroller = element(
        doc,
        'div',
        { position: 'relative', width: '300px', height: '200px', overflow: 'auto' },
        root,
      );
      scroller.className = 'fui-test-scrollbars';
      const target = element(doc, 'div', { width: '80px', height: '40px' }, scroller);
      // Overflows the scroller until its height is limited, which removes the vertical scrollbar. The size comes
      // from the content as auto-sizing resets the inline dimensions.
      const floating = element(doc, 'div', { position: 'absolute' }, scroller);
      element(doc, 'div', { width: '100px', height: '400px' }, floating);
      expect(scroller.clientWidth, 'width with a scrollbar').to.equal(280);

      const actual = await computePosition(target, floating, {
        strategy: 'absolute',
        options: { autoSize: 'always' },
      });

      expect(scroller.clientWidth, 'width without a scrollbar').to.equal(300);
      expect(actual.placement).to.equal('bottom');
      expect(floating.style.maxHeight).to.equal('160px');
      expect(floating.style.maxWidth, 'available width of the resized scroller').to.equal('300px');
    });
  });

  it('does not escape clipping through a positioned display: contents ancestor', () => {
    cy.document().then(async doc => {
      const clipper = element(doc, 'div', { width: '200px', height: '100px', overflow: 'hidden' }, root);
      // Boxless, so its position doesn't make it the containing block of anything
      const wrapper = element(doc, 'div', { display: 'contents', position: 'absolute' }, clipper);
      const target = element(doc, 'div', { marginTop: '300px', width: '80px', height: '40px' }, wrapper);
      const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, root);

      expect(getClippingRect(target, 'clippingAncestors').height).to.equal(100);
      const result = await computePosition(target, floating, {
        strategy: 'fixed',
        options: { pinned: true },
      });
      expect(result.referenceHidden, 'clipped target').to.equal(true);
    });
  });

  it('finds containing blocks and clipping wrappers through an assigned slot', () => {
    cy.document().then(async doc => {
      const host = element(doc, 'div', {}, root);
      const wrapper = element(
        doc,
        'div',
        {
          position: 'relative',
          left: '100px',
          top: '100px',
          width: '100px',
          height: '100px',
          overflow: 'hidden',
          transform: 'translate(20px, 30px)',
        },
        host.attachShadow({ mode: 'open' }),
      );
      element(doc, 'slot', {}, wrapper);
      const target = element(doc, 'div', { position: 'relative', top: '150px', width: '80px', height: '40px' }, host);
      const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, host);
      expect(target.assignedSlot).not.to.equal(null);
      await expectParity(target, floating);
      const result = await computePosition(target, floating, {
        strategy: 'fixed',
        options: { pinned: true },
      });
      expect(result.referenceHidden).to.equal(true);
    });
  });

  for (const tag of ['g', 'path']) {
    it(`traverses SVG ${tag} parents when clipping a virtual reference`, () => {
      cy.document().then(async doc => {
        const host = element(doc, 'div', { width: '100px', height: '100px', overflow: 'hidden' }, root);
        const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const group = doc.createElementNS('http://www.w3.org/2000/svg', 'g');
        const path = doc.createElementNS('http://www.w3.org/2000/svg', 'path');
        host.appendChild(svg);
        svg.appendChild(group);
        group.appendChild(path);
        const target = {
          contextElement: tag === 'g' ? group : path,
          getBoundingClientRect: () => new doc.defaultView!.DOMRect(200, 200, 40, 20),
        };
        const floating = element(doc, 'div', { position: 'fixed', width: '60px', height: '30px' }, root);
        await expectParity(target, floating);
        const result = await computePosition(target, floating, {
          strategy: 'fixed',
          options: { pinned: true },
        });
        expect(result.referenceHidden).to.equal(true);
      });
    });
  }

  it('uses viewport clipping for overflow propagated from body', () => {
    cy.document().then(async doc => {
      const previous = doc.body.style.cssText;
      try {
        Object.assign(doc.body.style, { height: '100px', overflow: 'hidden' });
        const target = element(
          doc,
          'div',
          { position: 'relative', top: '150px', width: '80px', height: '40px' },
          doc.body,
        );
        try {
          const floating = element(doc, 'div', { position: 'fixed', width: '120px', height: '60px' }, root);
          await expectParity(target, floating);
          const result = await computePosition(target, floating, {
            strategy: 'fixed',
            options: { pinned: true },
          });
          expect(result.referenceHidden).to.equal(false);
        } finally {
          target.remove();
        }
      } finally {
        doc.body.style.cssText = previous;
      }
    });
  });

  for (const kind of ['popover', 'dialog']) {
    it(`uses viewport coordinates and clipping for a top-layer ${kind}`, () => {
      cy.document().then(async doc => {
        const host = element(
          doc,
          'div',
          {
            position: 'absolute',
            left: '50px',
            top: '60px',
            width: '100px',
            height: '100px',
            overflow: 'hidden',
            transform: 'translate(40px, 30px)',
          },
          root,
        );
        const target = element(
          doc,
          'div',
          { position: 'fixed', left: '350px', top: '240px', width: '80px', height: '40px' },
          root,
        );
        const floating = element(
          doc,
          kind === 'dialog' ? 'dialog' : 'div',
          { position: 'fixed', width: '120px', height: '60px', margin: '0', padding: '0', border: '0' },
          host,
        );
        if (floating instanceof doc.defaultView!.HTMLDialogElement) {
          floating.showModal();
        } else {
          floating.popover = 'manual';
          floating.showPopover();
        }
        await expectParity(target, floating);
      });
    });
  }

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
          options: { pinned: true },
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

  for (const property of ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter']) {
    it(`recognizes the will-change: ${property} containing block before the property is applied`, () => {
      cy.document().then(async doc => {
        const host = element(
          doc,
          'div',
          { position: 'absolute', left: '40px', top: '40px', width: '200px', height: '200px', willChange: property },
          root,
        );
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
          options: { pinned: true },
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
        options: { pinned: true },
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
        options: { pinned: true },
      });
      expect(result.referenceHidden, 'reference outside parent clipping host').to.equal(true);
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
