import { borderBottom } from './borderBottom';

describe('borderBottom', () => {
  it('for a given width', () => {
    expect(borderBottom('2px')).toEqual({
      borderBottomWidth: '2px',
    });
  });

  it('for a given width and style', () => {
    expect(borderBottom('2px', 'solid')).toEqual({
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
    });
  });

  it('for a given width, style and color', () => {
    expect(borderBottom('2px', 'solid', 'red')).toEqual({
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'red',
    });
  });
});
