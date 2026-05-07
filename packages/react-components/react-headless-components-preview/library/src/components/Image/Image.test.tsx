import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { Image } from './Image';

describe('Image', () => {
  isConformant({
    Component: Image,
    displayName: 'Image',
  });

  it('renders an image element with the correct attributes', () => {
    const props = {
      alt: 'Default Image',
      src: 'https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png',
    };

    const { getByRole } = render(<Image alt={props.alt} src={props.src} />);

    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('alt', props.alt);
    expect(img).toHaveAttribute('src', props.src);
  });
});
