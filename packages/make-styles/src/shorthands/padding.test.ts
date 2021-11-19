import { padding } from './padding';

describe('padding', () => {
  it('properly applies a value when passed only one', () => {
    expect(padding('12px')).toEqual({
      paddingBottom: '12px',
      paddingLeft: '12px',
      paddingRight: '12px',
      paddingTop: '12px',
    });
  });

  it('properly applies values when passed two', () => {
    expect(padding('12px', '24px')).toEqual({
      paddingBottom: '12px',
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '12px',
    });
  });

  it('properly applies values when passed three', () => {
    expect(padding('12px', '24px', '36px')).toEqual({
      paddingBottom: '36px',
      paddingLeft: '24px',
      paddingRight: '24px',
      paddingTop: '12px',
    });
  });

  it('properly applies values when passed four', () => {
    expect(padding('12px', '24px', '36px', '48px')).toEqual({
      paddingBottom: '36px',
      paddingLeft: '48px',
      paddingRight: '24px',
      paddingTop: '12px',
    });
  });

  it('properly applies zero value', () => {
    expect(padding(0)).toEqual({
      paddingBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
    });
  });
});
