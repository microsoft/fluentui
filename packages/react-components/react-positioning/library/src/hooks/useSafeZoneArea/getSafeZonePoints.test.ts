import { getSafeZonePoints } from './getSafeZonePoints';
import type { Point } from './types';

const containerCorners = {
  topLeft: [0, 0] satisfies Point,
  topRight: [100, 0] satisfies Point,
  bottomRight: [100, 100] satisfies Point,
  bottomLeft: [0, 100] satisfies Point,
};

describe('getSafeZonePoints', () => {
  it.each([
    { anchor: [-50, 50] satisfies Point, corners: ['bottomLeft', 'topLeft'] },
    { anchor: [150, 50] satisfies Point, corners: ['topRight', 'bottomRight'] },
    { anchor: [50, -50] satisfies Point, corners: ['topLeft', 'topRight'] },
    { anchor: [50, 150] satisfies Point, corners: ['bottomRight', 'bottomLeft'] },
    { anchor: [-50, -50] satisfies Point, corners: ['bottomLeft', 'topLeft', 'topRight'] },
    { anchor: [150, -50] satisfies Point, corners: ['topLeft', 'topRight', 'bottomRight'] },
    { anchor: [-50, 150] satisfies Point, corners: ['topLeft', 'bottomLeft', 'bottomRight'] },
    { anchor: [150, 150] satisfies Point, corners: ['topRight', 'bottomRight', 'bottomLeft'] },
  ])('returns the facing corners for anchor $anchor', ({ anchor, corners }) => {
    expect(getSafeZonePoints(anchor, containerCorners)).toEqual([
      anchor,
      ...corners.map(corner => containerCorners[corner as keyof typeof containerCorners]),
    ]);
  });

  it('returns no safe zone when the anchor is inside the container', () => {
    expect(getSafeZonePoints([50, 50], containerCorners)).toEqual([]);
  });
});
