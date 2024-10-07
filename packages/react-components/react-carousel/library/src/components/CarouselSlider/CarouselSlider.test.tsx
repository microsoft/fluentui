import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselSlider } from './CarouselSlider';

describe('CarouselSlider', () => {
  isConformant({
    Component: CarouselSlider,
    displayName: 'CarouselSlider',
  });

  it('renders a default state', () => {
    const result = render(<CarouselSlider>Default CarouselSlider</CarouselSlider>);
    expect(result.container).toMatchSnapshot();
  });
});
