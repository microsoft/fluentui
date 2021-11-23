import { border } from './border';

describe('border', () => {
  it('properly applies a value when used with width', () => {
    expect(border('2px')).toEqual({
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
      borderRightWidth: '2px',
      borderTopWidth: '2px',
    });
  });

  it('properly applies values when used with width and style', () => {
    expect(border('2px', 'solid')).toEqual({
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
      borderRightWidth: '2px',
      borderTopWidth: '2px',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
    });
  });

  it('properly applies values when used with width, style and color', () => {
    expect(border('2px', 'solid', 'red')).toEqual({
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
      borderRightWidth: '2px',
      borderTopWidth: '2px',
      borderBottomStyle: 'solid',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderBottomColor: 'red',
      borderLeftColor: 'red',
      borderRightColor: 'red',
      borderTopColor: 'red',
    });
  });
});
