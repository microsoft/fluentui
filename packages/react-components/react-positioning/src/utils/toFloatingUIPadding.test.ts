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
});
