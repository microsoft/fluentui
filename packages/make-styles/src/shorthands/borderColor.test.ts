import { borderColor } from './borderColor';

describe('borderColor', () => {
  it('for a given value', () => {
    expect(borderColor('red')).toEqual({
      borderBottomColor: 'red',
      borderLeftColor: 'red',
      borderRightColor: 'red',
      borderTopColor: 'red',
    });
  });

  it('for given vertical and horizontal values', () => {
    expect(borderColor('red', 'blue')).toEqual({
      borderBottomColor: 'red',
      borderLeftColor: 'blue',
      borderRightColor: 'blue',
      borderTopColor: 'red',
    });
  });

  it('for given top, horizontal and bottom values', () => {
    expect(borderColor('red', 'blue', 'green')).toEqual({
      borderBottomColor: 'green',
      borderLeftColor: 'blue',
      borderRightColor: 'blue',
      borderTopColor: 'red',
    });
  });

  it('for given top, right, bottom and left values', () => {
    expect(borderColor('red', 'blue', 'green', 'yellow')).toEqual({
      borderBottomColor: 'green',
      borderLeftColor: 'yellow',
      borderRightColor: 'blue',
      borderTopColor: 'red',
    });
  });
});
