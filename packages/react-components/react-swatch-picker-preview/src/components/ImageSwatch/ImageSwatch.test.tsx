import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { ImageSwatch } from './ImageSwatch';

describe('ImageSwatch', () => {
  isConformant({
    Component: ImageSwatch,
    displayName: 'ImageSwatch',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<ImageSwatch>Default ImageSwatch</ImageSwatch>);
    expect(result.container).toMatchSnapshot();
  });
});
