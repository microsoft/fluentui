import {
  directionalCoverage,
  intersects,
  nestingCoverage,
  overlapArea,
  touches,
} from './geometry';

describe('dashboard grid geometry', () => {
  it('uses half-open collision edges and separate touching geometry', () => {
    const first = { x: 0, y: 0, w: 2, h: 2 };
    const edge = { x: 2, y: 0, w: 1, h: 1 };
    const corner = { x: 2, y: 2, w: 1, h: 1 };

    expect(intersects(first, edge)).toBe(false);
    expect(intersects(first, corner)).toBe(false);
    expect(touches(first, edge)).toBe(true);
    expect(touches(first, corner)).toBe(true);
    expect(overlapArea(first, { x: 1, y: 1, w: 2, h: 2 })).toBe(1);
  });

  it('keeps directional activation strictly above one half', () => {
    const origin = { x: 0, y: 0, width: 100, height: 100 };
    const target = { x: 100, y: 0, width: 100, height: 100 };

    expect(
      directionalCoverage(origin, { ...origin, x: 50 }, target),
    ).toBe(0.5);
    expect(
      directionalCoverage(origin, { ...origin, x: 51 }, target),
    ).toBeGreaterThan(0.5);
  });

  it('keeps nesting activation strictly above four fifths', () => {
    const target = { x: 0, y: 0, width: 100, height: 100 };

    expect(
      nestingCoverage({ x: 0, y: 0, width: 80, height: 100 }, target),
    ).toBe(1);
    expect(
      nestingCoverage({ x: 20, y: 0, width: 100, height: 100 }, target),
    ).toBe(0.8);
  });
});
