import { createTheme } from './createTheme';

describe('createTheme', () => {
  it('fills in blanks', () => {
    expect(createTheme({})).toEqual({
      stylesheets: [],
      tokens: {},
    });
  });

  it(' can merge 2 themes', () => {
    expect(
      createTheme(
        {
          tokens: {
            body: {
              fill: 'blue',
              text: 'white',
            },
          },
        },
        { tokens: { body: { fill: 'red' } } },
      ),
    ).toEqual({
      stylesheets: [],
      tokens: {
        body: {
          fill: 'red',
          text: 'white',
        },
      },
    });
  });
});
