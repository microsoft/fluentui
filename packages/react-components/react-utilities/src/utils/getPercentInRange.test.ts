import { getPercentInRange } from './getPercentInRange';

describe('getPercentInRange', () => {
  it('should return 0 if min is equal to max', () => {
    expect(getPercentInRange(50, 100, 100)).toBe(0);
  });

  it('should return 0 if value is equal to min', () => {
    expect(getPercentInRange(0, 0, 100)).toBe(0);
  });

  it('should return 100 if value is equal to max', () => {
    expect(getPercentInRange(100, 0, 100)).toBe(100);
  });

  it('should return 50 if value is halfway between min and max', () => {
    expect(getPercentInRange(50, 0, 100)).toBe(50);
  });

  it('should return correct percentage for positive range', () => {
    expect(getPercentInRange(75, 50, 100)).toBe(50);
  });

  it('should return correct percentage for negative range', () => {
    expect(getPercentInRange(-25, -50, 0)).toBe(50);
  });

  it('should return correct percentage for mixed range', () => {
    expect(getPercentInRange(25, 0, 50)).toBe(50);
  });

  it('should return correct percentage for value outside range', () => {
    expect(getPercentInRange(150, 0, 100)).toBe(150);
  });

  it('should return correct percentage for value below range', () => {
    expect(getPercentInRange(-50, 0, 100)).toBe(-50);
  });
});
