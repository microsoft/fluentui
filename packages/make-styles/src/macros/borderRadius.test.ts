import { borderRadius } from './borderRadius';

describe('borderRadius', () => {
  it('expands to an object for a single value', () => {
    expect(borderRadius('10px')).toEqual({
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '10px',
      borderTopRightRadius: '10px',
      borderTopLeftRadius: '10px',
    });
  });

  it('expands to an object for 2 values', () => {
    expect(borderRadius('10px', '5%')).toEqual({
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '5%',
      borderBottomRightRadius: '10px',
      borderBottomLeftRadius: '5%',
    });
  });

  it('expands to an object for 3 values', () => {
    expect(borderRadius('2px', '4px', '8px')).toEqual({
      borderTopLeftRadius: '2px',
      borderTopRightRadius: '4px',
      borderBottomRightRadius: '8px',
      borderBottomLeftRadius: '4px',
    });
  });

  it('expands to an object for 4 values', () => {
    expect(borderRadius('1px', 0, '3px', '4px')).toEqual({
      borderTopLeftRadius: '1px',
      borderTopRightRadius: 0,
      borderBottomRightRadius: '3px',
      borderBottomLeftRadius: '4px',
    });
  });
});
