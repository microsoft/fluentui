import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselNavImageButton } from './CarouselNavImageButton';

describe('CarouselNavImageButton', () => {
  isConformant({
    Component: CarouselNavImageButton,
    displayName: 'CarouselNavImageButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselNavImageButton>Default CarouselNavImageButton</CarouselNavImageButton>);
    expect(result.container).toMatchSnapshot();
  });
});
