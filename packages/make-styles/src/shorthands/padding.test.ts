import { padding } from './padding';

describe('padding', () => {
  it('for a given value', () => {
    expect(padding('12px')).toEqual({
      paddingBottom: '12px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '12px',
    });
  });

  it('for given vertical and horizontal values', () => {
    expect(padding('12px', '24px')).toEqual({
      paddingBottom: '12px',
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '12px',
    });
  });

  it('for given top, horizontal and bottom values', () => {
    expect(padding('12px', '24px', '36px')).toEqual({
      paddingBottom: '36px',
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '12px',
    });
  });

  it('for given top, right, bottom and left values', () => {
    expect(padding('12px', '24px', '36px', '48px')).toEqual({
      paddingBottom: '36px',
      paddingLeft: '48px',
      paddingRight: '24px',
      paddingTop: '12px',
    });
  });

  it('for a given zero value', () => {
    expect(padding(0)).toEqual({
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
    });
  });
});
