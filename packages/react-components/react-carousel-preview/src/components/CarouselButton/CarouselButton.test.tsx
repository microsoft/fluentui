import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselButton } from './CarouselButton';

describe('CarouselButton', () => {
  isConformant({
    Component: CarouselButton,
    displayName: 'CarouselButton',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselButton>Default CarouselButton</CarouselButton>);
    expect(result.container).toMatchSnapshot();
  });
});
