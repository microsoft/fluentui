import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselNav } from './TeachingPopoverCarouselNav';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/TeachingPopoverCarouselNavButton';

describe('TeachingPopoverCarouselNav', () => {
  isConformant({
    Component: TeachingPopoverCarouselNav,
    displayName: 'TeachingPopoverCarouselNav',
  });

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselNav>{() => <TeachingPopoverCarouselNavButton />}</TeachingPopoverCarouselNav>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
