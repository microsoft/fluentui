import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselPageCount } from './TeachingPopoverCarouselPageCount';

describe('TeachingPopoverCarouselPageCount', () => {
  isConformant({
    Component: TeachingPopoverCarouselPageCount,
    displayName: 'TeachingPopoverCarouselPageCount',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselPageCount>Default TeachingPopoverCarouselPageCount</TeachingPopoverCarouselPageCount>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
