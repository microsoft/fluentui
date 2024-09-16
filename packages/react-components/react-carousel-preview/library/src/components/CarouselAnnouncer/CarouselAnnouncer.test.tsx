import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselAnnouncer } from './CarouselAnnouncer';

const renderFunc = (index, totalSlides, groupList) => `Slide ${index} of ${totalSlides}`;

describe('CarouselAnnouncer', () => {
  isConformant({
    Component: CarouselAnnouncer,
    displayName: 'CarouselAnnouncer',
    requiredProps: {
      children: (index, totalSlides, groupList) => `Slide ${index} of ${totalSlides}`,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <CarouselAnnouncer>{(index, totalSlides, groupList) => `Slide ${index} of ${totalSlides}`}</CarouselAnnouncer>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
