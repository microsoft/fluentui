import { computeAvailableSize, getBoundarySize } from './computeAvailableSize';
import type { AvailableSizeOptions, BoundarySize, EdgeRect } from './computeAvailableSize';

function makeRect(rect: Partial<EdgeRect> & { width?: number; height?: number }): EdgeRect {
  const { top = 0, left = 0, width = 0, height = 0 } = rect;
  return {
    top,
    left,
    right: rect.right ?? left + width,
    bottom: rect.bottom ?? top + height,
  };
}

const boundary: BoundarySize = { width: 1000, height: 700 };

function options(overrides: Partial<AvailableSizeOptions> = {}): AvailableSizeOptions {
  return {
    position: 'above',
    offset: { mainAxis: 0, crossAxis: 0 },
    pinned: false,
    coverTarget: false,
    ...overrides,
  };
}

describe('computeAvailableSize', () => {
  describe('reachable sides', () => {
    it('takes the roomiest side the surface can reach, not the requested one', () => {
      const anchor = makeRect({ top: 560, height: 40, left: 100, width: 200 });

      const { blockSize } = computeAvailableSize(anchor, boundary, options({ position: 'below' }));

      expect(blockSize).toBe(560);
    });

    it('is the same whichever of the two sides is requested', () => {
      const anchor = makeRect({ top: 560, height: 40, left: 100, width: 200 });

      const requestedBelow = computeAvailableSize(anchor, boundary, options({ position: 'below' }));
      const requestedAbove = computeAvailableSize(anchor, boundary, options({ position: 'above' }));

      expect(requestedBelow.blockSize).toBe(requestedAbove.blockSize);
    });

    it('measures only the requested side when pinned, because nothing can flip', () => {
      const anchor = makeRect({ top: 560, height: 40, left: 100, width: 200 });

      const { blockSize } = computeAvailableSize(anchor, boundary, options({ position: 'below', pinned: true }));

      expect(blockSize).toBe(100);
    });

    it('resolves inline placements on the inline axis', () => {
      const anchor = makeRect({ top: 200, height: 40, left: 300, width: 200 });

      const { inlineSize } = computeAvailableSize(anchor, boundary, options({ position: 'before' }));

      expect(inlineSize).toBe(500);
    });
  });

  describe('covering the target', () => {
    it.each`
      position    | mainExtent
      ${'above'}  | ${40}
      ${'below'}  | ${40}
      ${'before'} | ${200}
      ${'after'}  | ${200}
    `('measures $position from the anchor far edge, gaining its extent', ({ position, mainExtent }) => {
      const anchor = makeRect({ top: 200, height: 40, left: 300, width: 200 });
      const isBlockMain = position === 'above' || position === 'below';

      const covering = computeAvailableSize(anchor, boundary, options({ position, coverTarget: true }));
      const beside = computeAvailableSize(anchor, boundary, options({ position, pinned: true }));

      const measured = isBlockMain ? covering.blockSize - beside.blockSize : covering.inlineSize - beside.inlineSize;

      expect(measured).toBe(mainExtent);
    });
  });

  describe('bounds', () => {
    it('never exceeds the boundary when the anchor has scrolled out of view', () => {
      const anchor = makeRect({ top: -260, height: 21, left: 100, width: 200 });

      const { blockSize } = computeAvailableSize(anchor, boundary, options({ position: 'below', pinned: true }));

      expect(blockSize).toBeLessThanOrEqual(boundary.height);
    });

    it('never returns a negative size', () => {
      const anchor = makeRect({ top: -200, height: 1200, left: -50, width: 1200 });

      const { blockSize, inlineSize } = computeAvailableSize(anchor, boundary, options({ pinned: true }));

      expect(blockSize).toBeGreaterThanOrEqual(0);
      expect(inlineSize).toBeGreaterThanOrEqual(0);
    });

    it('bounds the cross axis by the boundary rather than by the anchor', () => {
      const anchor = makeRect({ top: 200, height: 40, left: 300, width: 200 });

      const { inlineSize } = computeAvailableSize(anchor, boundary, options({ position: 'above' }));

      expect(inlineSize).toBe(boundary.width);
    });
  });

  describe('offsets', () => {
    const anchor = makeRect({ top: 200, height: 40, left: 300, width: 200 });

    it('subtracts the main axis offset from both margins', () => {
      const without = computeAvailableSize(anchor, boundary, options({ pinned: true }));
      const withOffset = computeAvailableSize(
        anchor,
        boundary,
        options({ pinned: true, offset: { mainAxis: 8, crossAxis: 0 } }),
      );

      expect(without.blockSize - withOffset.blockSize).toBe(16);
    });

    it('subtracts the cross axis offset from both margins', () => {
      const without = computeAvailableSize(anchor, boundary, options({ pinned: true }));
      const withOffset = computeAvailableSize(
        anchor,
        boundary,
        options({ pinned: true, offset: { mainAxis: 0, crossAxis: 5 } }),
      );

      expect(without.inlineSize - withOffset.inlineSize).toBe(10);
    });
  });
});

describe('getBoundarySize', () => {
  it('reads the document element so scrollbars are excluded', () => {
    const targetDocument = { documentElement: { clientWidth: 1024, clientHeight: 768 } } as Document;

    expect(getBoundarySize(targetDocument)).toEqual({ width: 1024, height: 768 });
  });

  it('returns undefined when there is no document to measure', () => {
    expect(getBoundarySize(undefined)).toBeUndefined();
  });
});
