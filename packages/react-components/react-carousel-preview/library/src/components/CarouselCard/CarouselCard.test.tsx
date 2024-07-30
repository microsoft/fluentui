import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselCard } from './CarouselCard';

describe('CarouselCard', () => {
  isConformant({
    Component: CarouselCard,
    displayName: 'CarouselCard',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselCard>Default CarouselCard</CarouselCard>);
    expect(result.container).toMatchSnapshot();
  });
});
