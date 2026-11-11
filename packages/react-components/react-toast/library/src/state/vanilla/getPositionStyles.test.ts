import { getPositionStyles } from './getPositionStyles';

describe('getPositionStyles', () => {
  it.each([
    ['bottom', 'ltr', { bottom: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)', maxWidth: 'calc(100% - 40px)' }],
    ['bottom-end', 'ltr', { bottom: 16, right: 20, maxWidth: 'calc(100% - 40px)' }],
    ['bottom-start', 'ltr', { bottom: 16, left: 20, maxWidth: 'calc(100% - 40px)' }],
    ['top', 'ltr', { top: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)', maxWidth: 'calc(100% - 40px)' }],
    ['top-end', 'ltr', { top: 16, right: 20, maxWidth: 'calc(100% - 40px)' }],
    ['top-start', 'ltr', { top: 16, left: 20, maxWidth: 'calc(100% - 40px)' }],
    ['bottom', 'rtl', { bottom: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)', maxWidth: 'calc(100% - 40px)' }],
    ['bottom-end', 'rtl', { bottom: 16, left: 20, maxWidth: 'calc(100% - 40px)' }],
    ['bottom-start', 'rtl', { bottom: 16, right: 20, maxWidth: 'calc(100% - 40px)' }],
    ['top', 'rtl', { top: 16, left: 'calc(50% + 0px)', transform: 'translateX(-50%)', maxWidth: 'calc(100% - 40px)' }],
    ['top-end', 'rtl', { top: 16, left: 20, maxWidth: 'calc(100% - 40px)' }],
    ['top-start', 'rtl', { top: 16, right: 20, maxWidth: 'calc(100% - 40px)' }],
  ] as const)('should return default styles for %s with text direction %s', (position, dir, expected) => {
    expect(getPositionStyles(position, dir)).toEqual(expected);
  });

  it('should handle offset shorthand', () => {
    expect(getPositionStyles('bottom-end', 'ltr', { horizontal: 1, vertical: 1 })).toEqual({
      bottom: 1,
      right: 1,
      maxWidth: 'calc(100% - 40px)',
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
      maxWidth: 'calc(100% - 40px)',
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
      maxWidth: 'calc(100% - 40px)',
    });
  });

  it.each([
    ['bottom-end', 32, 'calc(100% - 64px)'],
    ['bottom-start', 32, 'calc(100% - 64px)'],
    ['top-end', 32, 'calc(100% - 64px)'],
    ['bottom', 32, 'calc(100% - 64px)'],
    ['bottom-end', 60, 'calc(100% - 120px)'],
    ['bottom', 60, 'calc(100% - 120px)'],
    ['bottom-end', -32, 'calc(100% - 64px)'],
    ['bottom', -32, 'calc(100% - 64px)'],
    ['bottom-end', 10, 'calc(100% - 40px)'],
  ] as const)('should cap the width against a %s offset of %d', (position, horizontal, expected) => {
    expect(getPositionStyles(position, 'ltr', { horizontal }).maxWidth).toBe(expected);
  });
});
