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

describe('TeachingPopoverCarouselFooter DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(
      <TeachingPopoverCarouselFooter
        layout="offset"
        next="Next"
        previous="Previous"
        initialStepText="Close"
        finalStepText="Finish"
      />,
    );

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});
