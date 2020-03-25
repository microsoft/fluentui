import { objectKeyToValues } from '@fluentui/styles';

describe('objectKeyToValues', () => {
  test('values are replaced by key paths', () => {
    const input = {
      a: 2,
      b: {
        c: [3, 4],
      },
    };

    expect(objectKeyToValues(input)).toStrictEqual({
      a: 'a',
      b: {
        c: 'b.c',
      },
    });
  });
});
