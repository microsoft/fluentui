import * as React from 'react';
import { render } from '@testing-library/react';
import { ColorSlider } from './ColorSlider';
import { colorSliderClassNames } from './useColorSliderStyles.styles';

describe('ColorSlider', () => {
  it('maps channel, orientation, and shape to modern slots', () => {
    const { getByRole } = render(<ColorSlider aria-label="Saturation" channel="saturation" vertical shape="square" />);
    const input = getByRole('slider');
    const root = input.parentElement;

    expect(root).toHaveClass(colorSliderClassNames.root);
    expect(root).toHaveAttribute('data-channel', 'saturation');
    expect(root).toHaveAttribute('data-orientation', 'vertical');
    expect(root).toHaveAttribute('data-shape', 'square');
    expect(input).toHaveClass(colorSliderClassNames.input);
  });
});
