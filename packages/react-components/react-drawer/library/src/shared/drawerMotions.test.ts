import { getPositionTransform } from './drawerMotions';

describe('getPositionTransform', () => {
  it('should return the correct transform', () => {
    expect(getPositionTransform('start', 'medium', 'ltr')).toBe('translate3d(var(medium), 0, 0)');
    expect(getPositionTransform('start', 'medium', 'rtl')).toBe('translate3d(calc(var(medium) * -1), 0, 0)');
    expect(getPositionTransform('end', 'medium', 'ltr')).toBe('translate3d(calc(var(medium) * -1), 0, 0)');
    expect(getPositionTransform('end', 'medium', 'rtl')).toBe('translate3d(var(medium), 0, 0)');
    expect(getPositionTransform('bottom', 'medium', 'ltr')).toBe('translate3d(0, var(medium), 0)');
    expect(getPositionTransform('bottom', 'medium', 'rtl')).toBe('translate3d(0, var(medium), 0)');

    // In case of undefined or unknown position
    expect(getPositionTransform('top' as unknown as undefined, 'medium', 'ltr')).toBe('translate3d(0, 0, 0)');
  });
});
