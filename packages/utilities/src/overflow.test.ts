import {
  hasHorizontalOverflow,
  hasVerticalOverflow,
  hasOverflow
} from './overflow';

describe('overflow', () => {
  it('returns false when no overflow is present', () => {
    expect(hasOverflow({
      clientWidth: 10,
      clientHeight: 10,
      scrollWidth: 10,
      scrollHeight: 10
    } as any)).toEqual(false);
  });

  it('detects horizontal overflow', () => {
    const elementWithOverflow = {
      clientWidth: 10,
      clientHeight: 10,
      scrollWidth: 20,
      scrollHeight: 10
    };

    expect(hasOverflow(elementWithOverflow as any)).toEqual(true);
    expect(hasHorizontalOverflow(elementWithOverflow as any)).toEqual(true);
  });

  it('detects vertical overflow', () => {
    const elementWithOverflow = {
      clientWidth: 10,
      clientHeight: 10,
      scrollWidth: 10,
      scrollHeight: 20
    };

    expect(hasOverflow(elementWithOverflow as any)).toEqual(true);
    expect(hasVerticalOverflow(elementWithOverflow as any)).toEqual(true);
  });

});
