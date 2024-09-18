import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselAnnouncer } from './CarouselAnnouncer';

const renderFunc = (index: number, totalSlides: number, groupList: number[][]) => `Slide ${index} of ${totalSlides}`;

describe('CarouselAnnouncer', () => {
  isConformant({
    Component: CarouselAnnouncer,
    displayName: 'CarouselAnnouncer',
    requiredProps: {
      children: renderFunc,
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselAnnouncer>{renderFunc}</CarouselAnnouncer>);
    expect(result.container).toMatchSnapshot();
  });
});
