import { getPercent } from './getPercent';

describe('getPercent', () => {
  it('should return 0 if min is equal to max', () => {
    expect(getPercent(50, 100, 100)).toBe(0);
  });

  it('should return 0 if value is equal to min', () => {
    expect(getPercent(0, 0, 100)).toBe(0);
  });

  it('should return 100 if value is equal to max', () => {
    expect(getPercent(100, 0, 100)).toBe(100);
  });

  it('should return 50 if value is halfway between min and max', () => {
    expect(getPercent(50, 0, 100)).toBe(50);
  });

  it('should return correct percentage for positive range', () => {
    expect(getPercent(75, 50, 100)).toBe(50);
  });

  it('should return correct percentage for negative range', () => {
    expect(getPercent(-25, -50, 0)).toBe(50);
  });

  it('should return correct percentage for mixed range', () => {
    expect(getPercent(25, 0, 50)).toBe(50);
  });

  it('should return correct percentage for value outside range', () => {
    expect(getPercent(150, 0, 100)).toBe(150);
  });

  it('should return correct percentage for value below range', () => {
    expect(getPercent(-50, 0, 100)).toBe(-50);
  });
});
