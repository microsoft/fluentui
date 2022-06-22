import * as React from 'react';
import { isConformant } from '../../common/isConformant';
import { render } from '@testing-library/react';
import { Image } from './Image';

describe('Image', () => {
  isConformant({
    Component: Image,
    displayName: 'Image',
    disabledTests: ['component-has-static-classname-exported'],
  });

  it('renders a default state', () => {
    const result = render(<Image src="image.png" alt="Non-existent image" />);
    expect(result.container).toMatchSnapshot();
  });
});
