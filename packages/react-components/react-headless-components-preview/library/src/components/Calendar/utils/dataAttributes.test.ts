import { stringifyDataAttribute } from './dataAttributes';

describe('stringifyDataAttribute', () => {
  it.each([
    [true, ''],
    [false, undefined],
    [undefined, undefined],
  ] as const)('serializes %s as %s', (value, expected) => {
    expect(stringifyDataAttribute(value)).toBe(expected);
  });
});
