import { getElementType } from '../../src/utils/getElementType';

describe('getElementType', () => {
  test('takes a value from "as" prop', () => {
    expect(getElementType({ as: 'span' })).toBe('span');
  });

  test('defaults to "div"', () => {
    expect(getElementType({})).toBe('div');
  });
});
