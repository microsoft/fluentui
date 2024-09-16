import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselAnnouncer } from './CarouselAnnouncer';

describe('CarouselAnnouncer', () => {
  isConformant({
    Component: CarouselAnnouncer,
    displayName: 'CarouselAnnouncer',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselAnnouncer>{() => 'Default CarouselAnnouncer'}</CarouselAnnouncer>);
    expect(result.container).toMatchSnapshot();
  });
});
