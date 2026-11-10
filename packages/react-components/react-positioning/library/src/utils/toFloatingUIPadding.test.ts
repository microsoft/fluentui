import { toFloatingUIPadding } from './toFloatingUIPadding';

describe('toFloatingUIPadding', () => {
  it('should return shorthand number value directly', () => {
    expect(toFloatingUIPadding(10, false)).toEqual(10);
  });

  it('should transform logical sides to directional sides', () => {
    expect(toFloatingUIPadding({ start: 1, end: 2 }, false)).toEqual({ left: 1, right: 2 });
  });

  it('should transform logical sides to directional sides in RTL', () => {
    expect(toFloatingUIPadding({ start: 1, end: 2 }, true)).toEqual({ left: 2, right: 1 });
  });

  it.each([false, true])('omits undefined sides in RTL=%s', isRtl => {
    expect(
      toFloatingUIPadding({ top: undefined, bottom: undefined, start: undefined, end: undefined }, isRtl),
    ).toStrictEqual({});
    expect(toFloatingUIPadding({ top: undefined, bottom: 3, start: 1, end: 2 }, isRtl)).toStrictEqual({
      bottom: 3,
      left: isRtl ? 2 : 1,
      right: isRtl ? 1 : 2,
    });
    expect(toFloatingUIPadding({ top: 3, bottom: undefined }, isRtl)).toStrictEqual({ top: 3 });
  });

  it('preserves explicit zero vertical padding', () => {
    expect(toFloatingUIPadding({ top: 0, bottom: 0 }, false)).toEqual({ top: 0, bottom: 0 });
  });
});
