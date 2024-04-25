import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselNav } from './CarouselNav';

describe('CarouselNav', () => {
  isConformant({
    Component: CarouselNav,
    displayName: 'CarouselNav',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselNav>Default CarouselNav</CarouselNav>);
    expect(result.container).toMatchSnapshot();
  });
});
