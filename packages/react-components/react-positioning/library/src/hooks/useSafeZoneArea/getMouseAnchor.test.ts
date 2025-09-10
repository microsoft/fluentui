import { getMouseAnchor, measureDistance, getUnitVector } from './getMouseAnchor';
import type { Point } from './types';

describe('getMouseAnchor', () => {
  it('should calculate anchor point with mouse at the right of container', () => {
    const topLeftCorner: Point = [0, 0];
    const bottomRightCorner: Point = [100, 100];
    const mouseCoordinates: Point = [200, 50];

    const result = getMouseAnchor(topLeftCorner, bottomRightCorner, mouseCoordinates);

    expect(result[0]).toBeCloseTo(220, 5);
    expect(result[1]).toBeCloseTo(50, 5);
  });

  it('should calculate anchor point with mouse at the left of container', () => {
    const topLeftCorner: Point = [100, 100];
    const bottomRightCorner: Point = [200, 200];
    const mouseCoordinates: Point = [50, 150];

    const result = getMouseAnchor(topLeftCorner, bottomRightCorner, mouseCoordinates);

    expect(result[0]).toBeCloseTo(30);
    expect(result[1]).toBeCloseTo(150);
  });

  it('should calculate anchor point with mouse below the container', () => {
    const topLeftCorner: Point = [100, 100];
    const bottomRightCorner: Point = [200, 200];
    const mouseCoordinates: Point = [150, 300];

    const result = getMouseAnchor(topLeftCorner, bottomRightCorner, mouseCoordinates);

    expect(result[0]).toBeCloseTo(150);
    expect(result[1]).toBeCloseTo(320);
  });

  it('should calculate anchor point with mouse above the container', () => {
    const topLeftCorner: Point = [100, 100];
    const bottomRightCorner: Point = [200, 200];
    const mouseCoordinates: Point = [150, 50];

    const result = getMouseAnchor(topLeftCorner, bottomRightCorner, mouseCoordinates);

    expect(result[0]).toBeCloseTo(150);
    expect(result[1]).toBeCloseTo(30);
  });

  it('should calculate anchor point with mouse at diagonal position', () => {
    const topLeftCorner: Point = [100, 100];
    const bottomRightCorner: Point = [200, 200];
    const mouseCoordinates: Point = [250, 250];

    const result = getMouseAnchor(topLeftCorner, bottomRightCorner, mouseCoordinates);

    expect(result[0]).toBeCloseTo(264.14);
    expect(result[1]).toBeCloseTo(264.14);
  });

  it('should use fixed offset when mouse is at the center of container', () => {
    const topLeftCorner: Point = [100, 100];
    const bottomRightCorner: Point = [200, 200];
    const mouseCoordinates: Point = [150, 150];

    const result = getMouseAnchor(topLeftCorner, bottomRightCorner, mouseCoordinates);

    expect(result[0]).toBeCloseTo(150);
    expect(result[1]).toBeCloseTo(150);
  });
});

describe('measureDistance', () => {
  it('should measure zero distance between identical points', () => {
    const point: Point = [10, 20];
    expect(measureDistance(point, point)).toBe(0);
  });

  it('should measure horizontal distance correctly', () => {
    const a: Point = [10, 20];
    const b: Point = [30, 20];
    expect(measureDistance(a, b)).toBe(20);
  });

  it('should measure vertical distance correctly', () => {
    const a: Point = [10, 20];
    const b: Point = [10, 50];
    expect(measureDistance(a, b)).toBe(30);
  });

  it('should measure diagonal distance correctly', () => {
    const a: Point = [0, 0];
    const b: Point = [3, 4];

    expect(measureDistance(a, b)).toBe(5);
  });
});

describe('getUnitVector', () => {
  it('should return zero vector when points are identical', () => {
    const point: Point = [10, 20];
    const result = getUnitVector(point, point);

    expect(result).toEqual([0, 0]);
  });

  it('should calculate unit vector pointing right', () => {
    const a: Point = [10, 0];
    const b: Point = [0, 0];

    const result = getUnitVector(a, b);

    expect(result[0]).toBeCloseTo(1, 5);
    expect(result[1]).toBeCloseTo(0, 5);
  });

  it('should calculate unit vector pointing up', () => {
    const a: Point = [0, -10];
    const b: Point = [0, 0];

    const result = getUnitVector(a, b);

    expect(result[0]).toBeCloseTo(0, 5);
    expect(result[1]).toBeCloseTo(-1, 5);
  });

  it('should calculate unit vector for diagonal direction', () => {
    const a: Point = [3, 4];
    const b: Point = [0, 0];

    const result = getUnitVector(a, b);

    expect(result[0]).toBeCloseTo(0.6, 5);
    expect(result[1]).toBeCloseTo(0.8, 5);
  });
});
