import { borderBottom } from './borderBottom';

describe('borderBottom', () => {
  it('properly applies a value when used with width', () => {
    expect(borderBottom('2px')).toEqual({
      borderBottomWidth: '2px',
    });
  });

  it('properly applies values when used with width and style', () => {
    expect(borderBottom('2px', 'solid')).toEqual({
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
    });
  });

  it('properly applies values when used with width, style and color', () => {
    expect(borderBottom('2px', 'solid', 'red')).toEqual({
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'red',
    });
  });
});
