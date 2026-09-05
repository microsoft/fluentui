import { canSwap, repairCollisions, selectPointerCollision } from './collision';
import { asOpaqueNodeKey, type InternalNode } from './internalTypes';

const node = (key: number, x: number, y: number, w = 1, h = 1, locked = false): InternalNode => ({
  key: asOpaqueNodeKey(key),
  sequence: key,
  id: String(key),
  x,
  y,
  w,
  h,
  movable: true,
  resizable: true,
  locked,
});

describe('dashboard grid collisions', () => {
  it('supports all three touching swap relationships', () => {
    expect(canSwap(node(1, 0, 0), node(2, 1, 0))).toBe(true);
    expect(canSwap(node(1, 0, 0, 2, 1), node(2, 0, 1, 2, 3))).toBe(true);
    expect(canSwap(node(1, 0, 0, 1, 2), node(2, 1, 0, 3, 2))).toBe(true);
  });

  it('uses the greatest strict directional coverage and ignores locked targets', () => {
    const first = node(1, 1, 0);
    const second = node(2, 2, 0);
    const locked = node(3, 1, 0, 1, 1, true);
    const selected = selectPointerCollision(
      [first, second, locked],
      new Map([
        [first.key, { x: 100, y: 0, width: 100, height: 100 }],
        [second.key, { x: 140, y: 0, width: 100, height: 100 }],
        [locked.key, { x: 90, y: 0, width: 100, height: 100 }],
      ]),
      { x: 0, y: 0, width: 100, height: 100 },
      { x: 151, y: 0, width: 100, height: 100 },
    );

    expect(selected?.node).toBe(first);
    expect(selected?.coverage).toBe(1);
  });

  it('swaps internal drags but pushes when swapping is disabled', () => {
    const swapNodes = [node(1, 0, 0), node(2, 1, 0)];
    const swapped = repairCollisions(
      swapNodes,
      swapNodes[0].key,
      { x: 1, y: 0, w: 1, h: 1 },
      {
        columns: 2,
        float: false,
        loading: false,
        moving: true,
        movingDown: false,
        allowSwap: true,
        rootKey: swapNodes[0].key,
        budget: 5,
      },
    );
    expect(swapped.status).toBe('accepted');
    expect(swapNodes.map(item => item.x)).toEqual([1, 0]);

    const pushNodes = [node(1, 0, 0), node(2, 1, 0)];
    repairCollisions(
      pushNodes,
      pushNodes[0].key,
      { x: 1, y: 0, w: 1, h: 1 },
      {
        columns: 2,
        float: false,
        loading: false,
        moving: true,
        movingDown: false,
        allowSwap: false,
        rootKey: pushNodes[0].key,
        budget: 5,
      },
    );
    expect(pushNodes[1].y).toBe(1);
  });

  it('reports budget exhaustion instead of looping', () => {
    const nodes = [node(1, 0, 0), node(2, 1, 0)];
    expect(
      repairCollisions(
        nodes,
        nodes[0].key,
        { x: 1, y: 0, w: 1, h: 1 },
        {
          columns: 2,
          float: false,
          loading: false,
          moving: true,
          movingDown: false,
          allowSwap: false,
          rootKey: nodes[0].key,
          budget: 0,
        },
      ).status,
    ).toBe('collision-cycle');
  });
});
