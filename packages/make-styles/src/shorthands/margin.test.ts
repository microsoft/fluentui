import { margin } from './margin';

describe('margin', () => {
  it('properly applies a value when passed only one', () => {
    expect(margin('12px')).toEqual({
      marginBottom: '12px',
      marginLeft: '12px',
      marginRight: '12px',
      marginTop: '12px',
    });
  });

  it('properly applies values when passed two', () => {
    expect(margin('12px', '24px')).toEqual({
      marginBottom: '12px',
      marginLeft: '24px',
      marginRight: '24px',
      marginTop: '12px',
    });
  });

  it('properly applies values when passed three', () => {
    expect(margin('12px', '24px', '36px')).toEqual({
      marginBottom: '36px',
      marginLeft: '24px',
      marginRight: '24px',
      marginTop: '12px',
    });
  });

  it('properly applies values when passed four', () => {
    expect(margin('12px', '24px', '36px', '48px')).toEqual({
      marginBottom: '36px',
      marginLeft: '48px',
      marginRight: '24px',
      marginTop: '12px',
    });
  });

  it('properly applies zero value', () => {
    expect(margin(0)).toEqual({
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
    });
  });
});
