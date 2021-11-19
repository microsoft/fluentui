import { borderRight } from './borderRight';

describe('borderRight', () => {
  it('properly applies a value when passed only one', () => {
    expect(borderRight('2px')).toEqual({
      borderRightWidth: '2px',
    });
  });

  it('properly applies values when passed two', () => {
    expect(borderRight('2px', 'solid')).toEqual({
      borderRightWidth: '2px',
      borderRightStyle: 'solid',
    });
  });

  it('properly applies values when passed three', () => {
    expect(borderRight('2px', 'solid', 'red')).toEqual({
      borderRightWidth: '2px',
      borderRightStyle: 'solid',
      borderRightColor: 'red',
    });
  });
});
