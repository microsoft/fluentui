import { border } from './border';

describe('border', () => {
  it('for a given width', () => {
    expect(border('2px')).toEqual({
      borderBottomWidth: '2px',
      borderLeftWidth: '2px',
      borderRightWidth: '2px',
      borderTopWidth: '2px',
    });
  });

  it('for a given width and style', () => {
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

  it('for a given width, style and color', () => {
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
