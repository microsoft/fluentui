// '0 0 0 var(--button-focusInnerWidth, 1px) var(--button-focusInnerColor, white) inset'

import { replaceCSSVariables } from './replaceCSSVariables';

describe('replaceCSSVariables', () => {
  it('can replace values', () => {
    expect(
      replaceCSSVariables(
        {
          root: {
            background: 'var(--background)',
          },
        },
        {
          '--background': 'red',
        },
      ),
    ).toEqual({
      root: {
        background: 'red',
      },
    });
  });

  it('can use fallback variables', () => {
    expect(
      replaceCSSVariables(
        {
          root: {
            background: 'var(--background1, var(--background2, var(--background3)))',
          },
        },
        {
          '--background3': 'green',
          '--background2': 'red',
        },
      ),
    ).toEqual({
      root: {
        background: 'red',
      },
    });
  });

  it('can use a fallback literal', () => {
    expect(
      replaceCSSVariables(
        {
          root: {
            background: 'var(--background1, purple)',
          },
        },
        {},
      ),
    ).toEqual({
      root: {
        background: 'purple',
      },
    });
  });

  it('can fallback to other variables', () => {
    expect(
      replaceCSSVariables(
        {
          root: {
            background: 'var(--background1, purple)',
          },
        },
        {
          '--background-base': 'red',
          '--background1': 'var(--background-base)',
        },
      ),
    ).toEqual({
      root: {
        background: 'red',
      },
    });
  });

  it('can fallback to fallbacks of other variables', () => {
    expect(
      replaceCSSVariables(
        {
          root: {
            background: 'var(--background1, purple)',
          },
        },
        {
          '--background-base': 'var(--foo, red)',
          '--background1': 'var(--background-base)',
        },
      ),
    ).toEqual({
      root: {
        background: 'red',
      },
    });
  });

  it('can replace inline tokens in a value', () => {
    expect(
      replaceCSSVariables(
        {
          root: {
            background: 'start var(--background) end',
          },
        },
        {
          '--background': 'middle',
        },
      ),
    ).toEqual({
      root: {
        background: 'start middle end',
      },
    });
  });
});
