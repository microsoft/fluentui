import { borderColor } from './borderColor';

describe('borderColor', () => {
  it('properly applies a value when passed only one', () => {
    expect(borderColor('red')).toEqual({
      borderBottomColor: 'red',
      borderLeftColor: 'red',
      borderRightColor: 'red',
      borderTopColor: 'red',
    });
  });

  it('properly applies values when passed two', () => {
    expect(borderColor('red', 'blue')).toEqual({
      borderBottomColor: 'red',
      borderLeftColor: 'blue',
      borderRightColor: 'blue',
      borderTopColor: 'red',
    });
  });

  it('properly applies values when passed three', () => {
    expect(borderColor('red', 'blue', 'green')).toEqual({
      borderBottomColor: 'green',
      borderLeftColor: 'blue',
      borderRightColor: 'blue',
      borderTopColor: 'red',
    });
  });

  it('properly applies values when passed four', () => {
    expect(borderColor('red', 'blue', 'green', 'yellow')).toEqual({
      borderBottomColor: 'green',
      borderLeftColor: 'yellow',
      borderRightColor: 'blue',
      borderTopColor: 'red',
    });
  });
});
