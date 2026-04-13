import { stringifyDataAttribute } from './stringifyDataAttribute';

describe('stringifyDataAttribute', () => {
  it.each([
    [true, ''],
    [false, undefined],
    [undefined, undefined],
    ['test', 'test'],
    [123, '123'],
    [0, '0'],
  ])('should convert %p to %p', (input, expected) => {
    expect(stringifyDataAttribute(input)).toBe(expected);
  });
});
