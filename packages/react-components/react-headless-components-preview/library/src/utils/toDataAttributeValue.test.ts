import { toDataAttributeValue } from './toDataAttributeValue';

describe('toDataAttributeValue', () => {
  it.each([
    [true, ''],
    ['true', ''],
    [false, undefined],
    ['false', undefined],
    [undefined, undefined],
    ['test', 'test'],
    [123, '123'],
    [0, '0'],
  ])('should convert %p to %p', (input, expected) => {
    expect(toDataAttributeValue(input)).toBe(expected);
  });
});
