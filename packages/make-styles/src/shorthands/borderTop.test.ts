import { borderTop } from './borderTop';

describe('borderTop', () => {
  it('properly applies a value when passed only one', () => {
    expect(borderTop('2px')).toEqual({
      borderTopWidth: '2px',
    });
  });

  it('properly applies values when passed two', () => {
    expect(borderTop('2px', 'solid')).toEqual({
      borderTopWidth: '2px',
      borderTopStyle: 'solid',
    });
  });

  it('properly applies values when passed three', () => {
    expect(borderTop('2px', 'solid', 'red')).toEqual({
      borderTopWidth: '2px',
      borderTopStyle: 'solid',
      borderTopColor: 'red',
    });
  });
});
