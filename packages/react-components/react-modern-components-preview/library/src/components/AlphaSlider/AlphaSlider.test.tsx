import * as React from 'react';
import { render } from '@testing-library/react';
import { AlphaSlider } from './AlphaSlider';
import { alphaSliderClassNames } from './useAlphaSliderStyles.styles';
import { colorSliderClassNames } from '../ColorSlider/useColorSliderStyles.styles';

describe('AlphaSlider', () => {
  it('composes color slider structure with alpha styling', () => {
    const { getByRole } = render(<AlphaSlider aria-label="Opacity" transparency vertical />);
    const input = getByRole('slider');
    const root = input.parentElement;

    expect(root).toHaveClass(colorSliderClassNames.root, alphaSliderClassNames.root);
    expect(root).toHaveAttribute('data-orientation', 'vertical');
    expect(root).toHaveAttribute('data-transparency', '');
    expect(root).toHaveAttribute('data-shape', 'rounded');
    expect(input).toHaveClass(colorSliderClassNames.input, alphaSliderClassNames.input);
  });
});
