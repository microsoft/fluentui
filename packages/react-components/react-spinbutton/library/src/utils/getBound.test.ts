import { getBound } from './getBound';

describe('SpinButton getBound Util', () => {
  it('should return "min"', () => {
    expect(getBound(1, 1, 0)).toBe('min');
    expect(getBound(1, 1, undefined)).toBe('min');
  });

  it('should return "max"', () => {
    expect(getBound(10, 0, 10)).toBe('max');
    expect(getBound(10, undefined, 10)).toBe('max');
  });

  it('should return "both"', () => {
    expect(getBound(1, 1, 1)).toBe('both');
  });

  it('should return "none"', () => {
    expect(getBound(5, 0, 10)).toBe('none');
    expect(getBound(5)).toBe('none');
    expect(getBound(5, undefined, 10)).toBe('none');
    expect(getBound(5, 0, undefined)).toBe('none');

    expect(getBound(-10, 0, 10)).toBe('none');
    expect(getBound(20, 0, 10)).toBe('none');
  });
});
