import { getPositionStyles } from './getPositionStyles';

describe('getPositionStyles', () => {
  it.each([
    ['bottom', 'ltr', { bottom: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)' }],
    ['bottom-end', 'ltr', { bottom: 16, right: 20 }],
    ['bottom-start', 'ltr', { bottom: 16, left: 20 }],
    ['top', 'ltr', { top: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)' }],
    ['top-end', 'ltr', { top: 16, right: 20 }],
    ['top-start', 'ltr', { top: 16, left: 20 }],
    ['bottom', 'rtl', { bottom: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)' }],
    ['bottom-end', 'rtl', { bottom: 16, left: 20 }],
    ['bottom-start', 'rtl', { bottom: 16, right: 20 }],
    ['top', 'rtl', { top: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)' }],
    ['top-end', 'rtl', { top: 16, left: 20 }],
    ['top-start', 'rtl', { top: 16, right: 20 }],
  ] as const)('should return default styles for %s with text direction %s', (position, dir, expected) => {
    expect(getPositionStyles(position, dir)).toEqual(expected);
  });

  it('should handle offset shorthand', () => {
    expect(getPositionStyles('bottom-end', 'ltr', { horizontal: 1, vertical: 1 })).toEqual({
      bottom: 1,
      right: 1,
    });
  });

  it('should handle offset long hand', () => {
    expect(
      getPositionStyles('bottom-end', 'ltr', {
        'bottom-end': { horizontal: 1, vertical: 1 },
        'bottom-start': { horizontal: 2, vertical: 2 },
      }),
    ).toEqual({
      bottom: 1,
      right: 1,
    });
  });

  it('should handle offset for centered positions', () => {
    expect(
      getPositionStyles('bottom', 'ltr', {
        horizontal: 1,
        vertical: 1,
      }),
    ).toEqual({
      bottom: 1,
      left: 'calc(50% + 1px)',
      transform: 'translateX(-50%)',
    });
  });
});
