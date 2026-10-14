import { getNextFileTabIndex } from './fileTabs';

describe('getNextFileTabIndex', () => {
  it.each([
    ['ArrowLeft', 0, 3, 2],
    ['ArrowRight', 2, 3, 0],
    ['Home', 2, 3, 0],
    ['End', 0, 3, 2],
  ])('handles %s navigation', (key, currentIndex, tabCount, expected) => {
    expect(getNextFileTabIndex(key, currentIndex, tabCount)).toBe(expected);
  });

  it('ignores unrelated keys', () => {
    expect(getNextFileTabIndex('Enter', 0, 3)).toBeNull();
  });
});
