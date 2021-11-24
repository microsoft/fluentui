import { borderLeft } from './borderLeft';

describe('borderLeft', () => {
  it('for a given width', () => {
    expect(borderLeft('2px')).toEqual({
      borderLeftWidth: '2px',
    });
  });

  it('for a given width and style', () => {
    expect(borderLeft('2px', 'solid')).toEqual({
      borderLeftWidth: '2px',
      borderLeftStyle: 'solid',
    });
  });

  it('for a given width, style and color', () => {
    expect(borderLeft('2px', 'solid', 'red')).toEqual({
      borderLeftWidth: '2px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'red',
    });
  });
});
