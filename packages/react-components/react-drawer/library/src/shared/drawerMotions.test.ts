import { getPositionTransform } from './drawerMotions';

describe('getPositionTransform', () => {
  it('should return the correct transform for start position', () => {
    expect(getPositionTransform('start', 'medium', 'rtl')).toBe('translate3d(var(medium), 0, 0)');
    expect(getPositionTransform('start', 'medium', 'ltr')).toBe('translate3d(calc(var(medium) * -1), 0, 0)');
  });

  it('should return the correct transform for end position', () => {
    expect(getPositionTransform('end', 'medium', 'rtl')).toBe('translate3d(calc(var(medium) * -1), 0, 0)');
    expect(getPositionTransform('end', 'medium', 'ltr')).toBe('translate3d(var(medium), 0, 0)');
  });

  it('should return the correct transform for bottom position', () => {
    expect(getPositionTransform('bottom', 'medium', 'rtl')).toBe('translate3d(0, var(medium), 0)');
    expect(getPositionTransform('bottom', 'medium', 'ltr')).toBe('translate3d(0, var(medium), 0)');
  });

  it('should return the default transform for undefined or unknown position', () => {
    expect(getPositionTransform('top' as unknown as undefined, 'medium', 'ltr')).toBe('translate3d(0, 0, 0)');
  });

  it('should handle different sizes correctly', () => {
    expect(getPositionTransform('start', 'small', 'ltr')).toBe('translate3d(calc(var(small) * -1), 0, 0)');
    expect(getPositionTransform('end', 'large', 'rtl')).toBe('translate3d(calc(var(large) * -1), 0, 0)');
    expect(getPositionTransform('bottom', 'full', 'ltr')).toBe('translate3d(0, var(full), 0)');
  });
});
