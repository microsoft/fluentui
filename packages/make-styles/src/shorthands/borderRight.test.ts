import { borderRight } from './borderRight';

describe('borderRight', () => {
  it('for a given width', () => {
    expect(borderRight('2px')).toEqual({
      borderRightWidth: '2px',
    });
  });

  it('for a given width and style', () => {
    expect(borderRight('2px', 'solid')).toEqual({
      borderRightWidth: '2px',
      borderRightStyle: 'solid',
    });
  });

  it('for a given width, style and color', () => {
    expect(borderRight('2px', 'solid', 'red')).toEqual({
      borderRightWidth: '2px',
      borderRightStyle: 'solid',
      borderRightColor: 'red',
    });
  });
});
