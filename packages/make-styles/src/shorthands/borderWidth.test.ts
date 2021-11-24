import { borderWidth } from './borderWidth';

describe('borderWidth', () => {
  it('for a given value', () => {
    expect(borderWidth('12px')).toEqual({
      borderBottomWidth: '12px',
      borderLeftWidth: '12px',
      borderRightWidth: '12px',
      borderTopWidth: '12px',
    });
  });

  it('for given vertical and horizontal values', () => {
    expect(borderWidth('12px', '24px')).toEqual({
      borderBottomWidth: '12px',
      borderLeftWidth: '24px',
      borderRightWidth: '24px',
      borderTopWidth: '12px',
    });
  });

  it('for given top, horizontal and bottom values', () => {
    expect(borderWidth('12px', '24px', '36px')).toEqual({
      borderBottomWidth: '36px',
      borderLeftWidth: '24px',
      borderRightWidth: '24px',
      borderTopWidth: '12px',
    });
  });

  it('for given top, right, bottom and left values', () => {
    expect(borderWidth('12px', '24px', '36px', '48px')).toEqual({
      borderBottomWidth: '36px',
      borderLeftWidth: '48px',
      borderRightWidth: '24px',
      borderTopWidth: '12px',
    });
  });

  it('for a given zero value', () => {
    expect(borderWidth(0)).toEqual({
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 0,
    });
  });
});
