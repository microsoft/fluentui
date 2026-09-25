import { toHeadlessPlacement } from './toHeadlessPlacement';

describe('toHeadlessPlacement', () => {
  it.each([
    ['top', 'above'],
    ['top-start', 'above-start'],
    ['top-end', 'above-end'],
    ['bottom', 'below'],
    ['bottom-start', 'below-start'],
    ['bottom-end', 'below-end'],
    ['left', 'before'],
    ['left-start', 'before-top'],
    ['left-end', 'before-bottom'],
    ['right', 'after'],
    ['right-start', 'after-top'],
    ['right-end', 'after-bottom'],
  ] as const)('maps %s to %s in ltr', (placement, expected) => {
    expect(toHeadlessPlacement(placement, false)).toBe(expected);
  });

  it.each([
    ['left', 'after'],
    ['left-start', 'after-top'],
    ['right', 'before'],
    ['right-end', 'before-bottom'],
    ['top-start', 'above-start'],
  ] as const)('maps %s to %s in rtl', (placement, expected) => {
    expect(toHeadlessPlacement(placement, true)).toBe(expected);
  });
});
