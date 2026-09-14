import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../../testing/isConformant';
import { ImageSwatch } from './ImageSwatch';
import { SwatchPicker } from '../SwatchPicker';

describe('ImageSwatch', () => {
  isConformant({
    Component: ImageSwatch,
    displayName: 'ImageSwatch',
    requiredProps: { src: 'image.png', value: 'image', 'aria-label': 'Image' },
    renderOptions: {
      wrapper: ({ children }) => <SwatchPicker aria-label="Images">{children}</SwatchPicker>,
    },
    getTargetElement: result => result.getByRole('radio'),
    disabledTests: ['has-top-level-file-extra'],
  });

  it('renders an image swatch with its selection state', () => {
    const { getByRole } = render(<ImageSwatch src="image.png" value="image" aria-label="Image" />, {
      wrapper: ({ children }) => <SwatchPicker selectedValue="image">{children}</SwatchPicker>,
    });

    expect(getByRole('radio')).toHaveAttribute('data-selected');
  });
});
