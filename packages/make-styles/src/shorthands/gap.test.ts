import { gap } from './gap';

describe('gap', () => {
  it('for a given gap', () => {
    expect(gap('12px')).toEqual({
      columnGap: '12px',
      rowGap: '12px',
    });
  });

  it('for given row and col gaps', () => {
    expect(gap('12px', '24px')).toEqual({
      columnGap: '12px',
      rowGap: '24px',
    });
  });
});
