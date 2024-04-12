import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselFooter } from './TeachingPopoverCarouselFooter';

describe('TeachingPopoverCarouselFooter', () => {
  isConformant({
    Component: TeachingPopoverCarouselFooter,
    displayName: 'TeachingPopoverCarouselFooter',
    requiredProps: {
      next: 'Next',
      previous: 'Previous',
      initialStepText: 'Close',
      finalStepText: 'Finish',
    },
    disabledTests: ['component-has-static-classnames-object'],
  });

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
        Default TeachingPopoverCarouselFooter
      </TeachingPopoverCarouselFooter>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
