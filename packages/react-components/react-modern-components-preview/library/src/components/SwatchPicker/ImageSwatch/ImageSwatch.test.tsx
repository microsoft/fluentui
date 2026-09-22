import * as React from 'react';
import { render } from '@testing-library/react';
import { SwatchPicker } from '../SwatchPicker/SwatchPicker';
import { ImageSwatch } from './ImageSwatch';
import { imageSwatchClassNames } from './useImageSwatchStyles.styles';

describe('ImageSwatch', () => {
  it('inherits visual state and preserves its image style', () => {
    const { getByRole } = render(
      <SwatchPicker size="small" shape="rounded">
        <ImageSwatch aria-label="Texture" src="texture.png" value="texture" />
      </SwatchPicker>,
    );
    const swatch = getByRole('radio');

    expect(swatch).toHaveClass(imageSwatchClassNames.root);
    expect(swatch).toHaveAttribute('data-size', 'small');
    expect(swatch).toHaveAttribute('data-shape', 'rounded');
    expect(swatch).toHaveStyle({ backgroundImage: 'url(texture.png)' });
  });
});
