import { gap } from './gap';

describe('gap', () => {
  it('properly applies a value when passed only one', () => {
    expect(gap('12px')).toEqual({
      columnGap: '12px',
      rowGap: '12px',
    });
  });

  it('properly applies values when passed two', () => {
    expect(gap('12px', '24px')).toEqual({
      columnGap: '12px',
      rowGap: '24px',
    });
  });
});
