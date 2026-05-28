import { computePosition } from './computePosition';

function makeRect(rect: Partial<DOMRect>): DOMRect {
  const { x = 0, y = 0, width = 0, height = 0 } = rect;
  return {
    x,
    y,
    width,
    height,
    top: rect.top ?? y,
    left: rect.left ?? x,
    right: rect.right ?? x + width,
    bottom: rect.bottom ?? y + height,
    toJSON: () => ({}),
  } as DOMRect;
}

function makeElement(rect: Partial<DOMRect>): HTMLElement {
  const el = document.createElement('div');
  el.getBoundingClientRect = () => makeRect(rect);
  return el;
}

describe('computePosition', () => {
  it('returns above-center when floating sits directly above the reference', () => {
    const reference = makeElement({ top: 200, left: 100, right: 200, bottom: 240, width: 100, height: 40 });
    const floating = makeElement({ top: 150, left: 125, right: 175, bottom: 190, width: 50, height: 40 });

    const result = computePosition(reference, floating);

    expect(result).toEqual(
      expect.objectContaining({
        position: 'above',
        align: 'center',
        placement: 'above',
      }),
    );
  });

  it('returns below-start when floating is below and left-aligned with reference', () => {
    const reference = makeElement({ top: 100, left: 100, right: 200, bottom: 140, width: 100, height: 40 });
    const floating = makeElement({ top: 150, left: 100, right: 160, bottom: 200, width: 60, height: 50 });

    const result = computePosition(reference, floating);
    expect(result?.position).toBe('below');
    expect(result?.align).toBe('start');
    expect(result?.placement).toBe('below-start');
  });

  it('returns before-end when floating is to the left and bottom-aligned', () => {
    const reference = makeElement({ top: 100, left: 200, right: 300, bottom: 200, width: 100, height: 100 });
    const floating = makeElement({ top: 120, left: 100, right: 195, bottom: 200, width: 95, height: 80 });

    const result = computePosition(reference, floating);
    expect(result?.position).toBe('before');
    expect(result?.align).toBe('end');
    expect(result?.placement).toBe('before-bottom');
  });

  it('returns after when floating is to the right and centered', () => {
    const reference = makeElement({ top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100 });
    const floating = makeElement({ top: 120, left: 210, right: 290, bottom: 180, width: 80, height: 60 });

    const result = computePosition(reference, floating);
    expect(result?.position).toBe('after');
    expect(result?.align).toBe('center');
  });

  it('returns null when rects overlap and no clear side is determinable', () => {
    const reference = makeElement({ top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100 });
    const floating = makeElement({ top: 150, left: 150, right: 250, bottom: 250, width: 100, height: 100 });

    expect(computePosition(reference, floating)).toBeNull();
  });

  it('absorbs subpixel mismatches up to the default tolerance (2px)', () => {
    const reference = makeElement({ top: 200, left: 100, right: 200, bottom: 240, width: 100, height: 40 });
    const floating = makeElement({ top: 150, left: 125, right: 175, bottom: 201.5, width: 50, height: 51.5 });

    expect(computePosition(reference, floating)?.position).toBe('above');
  });

  it('respects a custom tolerance', () => {
    const reference = makeElement({ top: 200, left: 100, right: 200, bottom: 240, width: 100, height: 40 });
    const floating = makeElement({ top: 150, left: 125, right: 175, bottom: 205, width: 50, height: 55 });

    expect(computePosition(reference, floating)).toBeNull();
    expect(computePosition(reference, floating, { tolerance: 6 })?.position).toBe('above');
  });
});
