import * as React from 'react';
import { render } from '@testing-library/react';
import { SwatchPicker } from '../SwatchPicker/SwatchPicker';
import { ColorSwatch } from './ColorSwatch';
import { colorSwatchClassNames } from './useColorSwatchStyles.styles';

describe('ColorSwatch', () => {
  it('inherits visual state and styles disabled slots', () => {
    const { getByRole } = render(
      <SwatchPicker size="large" shape="circular">
        <ColorSwatch aria-label="Red" color="#f00" value="red" disabled />
      </SwatchPicker>,
    );
    const swatch = getByRole('radio');

    expect(swatch).toHaveClass(colorSwatchClassNames.root);
    expect(swatch).toHaveAttribute('data-size', 'large');
    expect(swatch).toHaveAttribute('data-shape', 'circular');
    expect(swatch).toHaveAttribute('data-disabled');
    expect(swatch.querySelector(`.${colorSwatchClassNames.disabledIcon}`)).not.toBeNull();
  });
});
