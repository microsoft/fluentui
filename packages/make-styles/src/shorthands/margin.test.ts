import { margin } from './margin';

describe('margin', () => {
  it('for a given value', () => {
    expect(margin('12px')).toEqual({
      marginBottom: '12px',
      marginLeft: '12px',
      marginRight: '12px',
      marginTop: '12px',
    });
  });

  it('for given vertical and horizontal values', () => {
    expect(margin('12px', '24px')).toEqual({
      marginBottom: '12px',
      marginLeft: '24px',
      marginRight: '24px',
      marginTop: '12px',
    });
  });

  it('for given top, horizontal and bottom values', () => {
    expect(margin('12px', '24px', '36px')).toEqual({
      marginBottom: '36px',
      marginLeft: '24px',
      marginRight: '24px',
      marginTop: '12px',
    });
  });

  it('for given top, right, bottom and left values', () => {
    expect(margin('12px', '24px', '36px', '48px')).toEqual({
      marginBottom: '36px',
      marginLeft: '48px',
      marginRight: '24px',
      marginTop: '12px',
    });
  });

  it('for a given zero value', () => {
    expect(margin(0)).toEqual({
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
    });
  });
});
