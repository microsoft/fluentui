import { borderRadius } from './borderRadius';

describe('borderRadius', () => {
  it('for a given length', () => {
    expect(borderRadius('10px')).toEqual({
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '10px',
      borderTopRightRadius: '10px',
      borderTopLeftRadius: '10px',
    });
  });

  it('for a top-left-and-bottom-right length and a top-right-and-bottom-left percentage', () => {
    expect(borderRadius('10px', '5%')).toEqual({
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '5%',
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '5%',
    });
  });

  it('for a top-left, top-right-and-bottom-left and bottom-right length', () => {
    expect(borderRadius('2px', '4px', '8px')).toEqual({
      borderTopLeftRadius: '2px',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '8px',
      borderBottomLeftRadius: '4px',
    });
  });

  it('for a top-left, top-right, bottom-right and bottom-left length', () => {
    expect(borderRadius('1px', 0, '3px', '4px')).toEqual({
      borderTopLeftRadius: '1px',
      borderTopRightRadius: 0,
      borderBottomRightRadius: '3px',
      borderBottomLeftRadius: '4px',
    });
  });
});
