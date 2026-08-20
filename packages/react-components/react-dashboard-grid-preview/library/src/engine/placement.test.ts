import { asOpaqueNodeKey, type InternalNode } from './internalTypes';
import { findFirstEmptyPosition } from './placement';

const node = (
  key: number,
  x: number,
  y: number,
  w = 1,
  h = 1,
): InternalNode => ({
  key: asOpaqueNodeKey(key),
  sequence: key,
  id: String(key),
  x,
  y,
  w,
  h,
  movable: true,
  resizable: true,
  locked: false,
});

describe('dashboard grid placement', () => {
  it('finds the first empty rectangle in row-major order', () => {
    expect(
      findFirstEmptyPosition(
        { w: 2, h: 1 },
        [node(1, 0, 0), node(2, 2, 0)],
        4,
      ),
    ).toEqual({ x: 0, y: 1, w: 2, h: 1 });
  });

  it('can begin immediately after a predecessor for list compaction', () => {
    expect(
      findFirstEmptyPosition({ w: 1, h: 1 }, [node(1, 0, 0)], 4, {
        after: { x: 0, y: 0, w: 1, h: 1 },
      }),
    ).toEqual({ x: 1, y: 0, w: 1, h: 1 });
  });

  it('returns undefined when a capped grid has no fitting area', () => {
    expect(
      findFirstEmptyPosition(
        { w: 1, h: 1 },
        [node(1, 0, 0), node(2, 1, 0)],
        2,
        { maxRows: 1 },
      ),
    ).toBeUndefined();
  });
});
