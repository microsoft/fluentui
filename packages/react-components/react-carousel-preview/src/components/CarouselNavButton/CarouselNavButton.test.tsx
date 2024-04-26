import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselNavButton } from './CarouselNavButton';

describe('CarouselNavButton', () => {
  isConformant({
    Component: CarouselNavButton,
    displayName: 'CarouselNavButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselNavButton>Default CarouselNavButton</CarouselNavButton>);
    expect(result.container).toMatchSnapshot();
  });
});
