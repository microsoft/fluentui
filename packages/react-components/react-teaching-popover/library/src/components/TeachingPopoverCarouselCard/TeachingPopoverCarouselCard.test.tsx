import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselCard } from './TeachingPopoverCarouselCard';

describe('TeachingPopoverCarouselCard', () => {
  isConformant({
    Component: TeachingPopoverCarouselCard,
    displayName: 'TeachingPopoverCarouselCard',
    requiredProps: { value: 'test' },
    disabledTests: [
      // Carousel card does not render DOM elements
      'component-handles-ref',
      'component-has-root-ref',
      'component-has-static-classnames',
      'component-handles-classname',
      'component-has-static-classnames-object',
    ],
  });

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselCard value="test">Default TeachingPopoverCarouselCard</TeachingPopoverCarouselCard>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
