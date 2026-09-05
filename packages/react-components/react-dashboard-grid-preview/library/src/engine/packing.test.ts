import { asOpaqueNodeKey, type InternalNode } from './internalTypes';
import { compactNodes, packNodes } from './packing';

const node = (key: number, x: number, y: number, locked = false): InternalNode => ({
  key: asOpaqueNodeKey(key),
  sequence: key,
  id: String(key),
  x,
  y,
  w: 1,
  h: 1,
  movable: true,
  resizable: true,
  locked,
});

describe('dashboard grid packing', () => {
  it('applies top gravity while preserving locked blockers', () => {
    const nodes = [node(1, 0, 1, true), node(2, 0, 5)];

    packNodes(nodes, { float: false });

    expect(nodes.find(item => item.id === '1')?.y).toBe(1);
    expect(nodes.find(item => item.id === '2')?.y).toBe(2);
  });

  it('restores dirty floating items only toward their transaction row', () => {
    const nodes = [node(1, 0, 4), node(2, 0, 2)];

    packNodes(nodes, {
      float: true,
      originalRects: new Map([
        [nodes[0].key, { x: 0, y: 1, w: 1, h: 1 }],
        [nodes[1].key, { x: 0, y: 2, w: 1, h: 1 }],
      ]),
    });

    expect(nodes.find(item => item.id === '1')?.y).toBe(3);
    expect(nodes.find(item => item.id === '2')?.y).toBe(2);
  });

  it('supports true compact and sequential list rebuilding', () => {
    const source = [node(1, 0, 3), node(2, 2, 3)];

    expect(compactNodes(source, 4, 'compact').map(item => [item.x, item.y])).toEqual([
      [0, 0],
      [1, 0],
    ]);
    expect(compactNodes(source, 4, 'list').map(item => [item.x, item.y])).toEqual([
      [0, 0],
      [1, 0],
    ]);
  });
});
