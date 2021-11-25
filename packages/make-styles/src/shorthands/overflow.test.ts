import { overflow } from './overflow';

describe('overflow', () => {
  it('for a given value', () => {
    expect(overflow('hidden')).toEqual({
      overflowX: 'hidden',
      overflowY: 'hidden',
    });
  });

  it('for given x and y values', () => {
    expect(overflow('visible', 'hidden')).toEqual({
      overflowX: 'visible',
      overflowY: 'hidden',
    });
  });
});
