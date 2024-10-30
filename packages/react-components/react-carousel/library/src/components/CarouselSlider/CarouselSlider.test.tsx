import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselSlider } from './CarouselSlider';

describe('CarouselSlider', () => {
  isConformant({
    // eslint-disable-next-line deprecation/deprecation
    Component: CarouselSlider,
    displayName: 'CarouselSlider',
  });

  it('renders a default state', () => {
    // eslint-disable-next-line deprecation/deprecation
    const result = render(<CarouselSlider>Default CarouselSlider</CarouselSlider>);
    expect(result.container).toMatchSnapshot();
  });
});
