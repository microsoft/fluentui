import { borderStyle } from './borderStyle';

describe('borderStyle', () => {
  it('properly applies a value when passed only one', () => {
    expect(borderStyle('solid')).toEqual({
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
    });
  });

  it('properly applies values when passed two', () => {
    expect(borderStyle('solid', 'dashed')).toEqual({
      borderBottomStyle: 'solid',
      borderLeftStyle: 'dashed',
      borderRightStyle: 'dashed',
      borderTopStyle: 'solid',
    });
  });

  it('properly applies values when passed three', () => {
    expect(borderStyle('solid', 'dashed', 'dotted')).toEqual({
      borderBottomStyle: 'dotted',
      borderLeftStyle: 'dashed',
      borderRightStyle: 'dashed',
      borderTopStyle: 'solid',
    });
  });

  it('properly applies values when passed four', () => {
    expect(borderStyle('solid', 'dashed', 'dotted', 'double')).toEqual({
      borderBottomStyle: 'dotted',
      borderLeftStyle: 'double',
      borderRightStyle: 'dashed',
      borderTopStyle: 'solid',
    });
  });
});
