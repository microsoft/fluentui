import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselFooter } from './CarouselFooter';

describe('CarouselFooter', () => {
  isConformant({
    Component: CarouselFooter,
    displayName: 'CarouselFooter',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselFooter>Default CarouselFooter</CarouselFooter>);
    expect(result.container).toMatchSnapshot();
  });
});
