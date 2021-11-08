import { borderLeft } from './borderLeft';

describe('borderLeft', () => {
  it('properly applies a value when passed only one', () => {
    expect(borderLeft('2px')).toEqual({
      borderLeftWidth: '2px',
    });
  });

  it('properly applies values when passed two', () => {
    expect(borderLeft('2px', 'solid')).toEqual({
      borderLeftWidth: '2px',
      borderLeftStyle: 'solid',
    });
  });

  it('properly applies values when passed three', () => {
    expect(borderLeft('2px', 'solid', 'red')).toEqual({
      borderLeftWidth: '2px',
      borderLeftStyle: 'solid',
      borderLeftColor: 'red',
    });
  });
});
