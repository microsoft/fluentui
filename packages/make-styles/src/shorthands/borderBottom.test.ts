import { borderBottom } from './borderBottom';

describe('borderBottom', () => {
  it('properly applies a value when passed only one', () => {
    expect(borderBottom('2px')).toEqual({
      borderBottomWidth: '2px',
    });
  });

  it('properly applies values when passed two', () => {
    expect(borderBottom('2px', 'solid')).toEqual({
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
    });
  });

  it('properly applies values when passed three', () => {
    expect(borderBottom('2px', 'solid', 'red')).toEqual({
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'red',
    });
  });
});
