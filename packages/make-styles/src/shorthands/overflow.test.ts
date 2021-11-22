import { overflow } from './overflow';

describe('overflow', () => {
  it('properly applies a value when passed only one', () => {
    expect(overflow('hidden')).toEqual({
      overflowX: 'hidden',
      overflowY: 'hidden',
    });
  });

  it('properly applies values when passed two', () => {
    expect(overflow('visible', 'hidden')).toEqual({
      overflowX: 'visible',
      overflowY: 'hidden',
    });
  });
});
