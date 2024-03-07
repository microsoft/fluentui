import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarousel } from './TeachingPopoverCarousel';

describe('TeachingPopoverCarousel', () => {
  isConformant({
    Component: TeachingPopoverCarousel,
    displayName: 'TeachingPopoverCarousel',
    requiredProps: {
      strings: {
        next: 'Next',
        previous: 'Previous',
        initialStepText: 'Close',
        finalStepText: 'Finish',
      },
    },
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarousel
        strings={{
          next: 'Next',
          previous: 'Previous',
          initialStepText: 'Close',
          finalStepText: 'Finish',
          pageCountText: 'of',
        }}
      >
        Default TeachingPopoverCarousel
      </TeachingPopoverCarousel>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
