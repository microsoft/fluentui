import { borderStyle } from './borderStyle';

describe('borderStyle', () => {
  it('for a given value', () => {
    expect(borderStyle('solid')).toEqual({
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
    });
  });

  it('for given vertical and horizontal values', () => {
    expect(borderStyle('solid', 'dashed')).toEqual({
      borderBottomStyle: 'solid',
      borderLeftStyle: 'dashed',
      borderRightStyle: 'dashed',
      borderTopStyle: 'solid',
    });
  });

  it('for given top, horizontal and bottom values', () => {
    expect(borderStyle('solid', 'dashed', 'dotted')).toEqual({
      borderBottomStyle: 'dotted',
      borderLeftStyle: 'dashed',
      borderRightStyle: 'dashed',
      borderTopStyle: 'solid',
    });
  });

  it('for given top, right, bottom and left values', () => {
    expect(borderStyle('solid', 'dashed', 'dotted', 'double')).toEqual({
      borderBottomStyle: 'dotted',
      borderLeftStyle: 'double',
      borderRightStyle: 'dashed',
      borderTopStyle: 'solid',
    });
  });
});
