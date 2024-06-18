import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselNavButton } from './CarouselNavButton';
import { CarouselNavButtonProps } from './CarouselNavButton.types';

describe('CarouselNavButton', () => {
  isConformant({
    Component: CarouselNavButton as React.FunctionComponent<CarouselNavButtonProps>,
    displayName: 'CarouselNavButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselNavButton>Default CarouselNavButton</CarouselNavButton>);
    expect(result.container).toMatchSnapshot();
  });
});
