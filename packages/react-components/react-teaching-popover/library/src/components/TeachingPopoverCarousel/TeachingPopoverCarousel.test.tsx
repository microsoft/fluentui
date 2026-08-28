import * as React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarousel } from './TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from '../TeachingPopoverCarouselFooter/TeachingPopoverCarouselFooter';
import { TeachingPopoverTitle } from '../TeachingPopoverTitle/TeachingPopoverTitle';

describe('TeachingPopoverCarousel', () => {
  isConformant({
    Component: TeachingPopoverCarousel,
    displayName: 'TeachingPopoverCarousel',
    requiredProps: {
      defaultValue: '',
    },
    disabledTests: ['component-has-static-classnames-object'],
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarousel defaultValue="">Default TeachingPopoverCarousel</TeachingPopoverCarousel>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('moves focus to the new page title when navigating to the next page', async () => {
    render(
      <TeachingPopoverCarousel defaultValue="one">
        <TeachingPopoverCarouselCard value="one">
          <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">
          <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          Footer
        </TeachingPopoverCarouselFooter>
      </TeachingPopoverCarousel>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Next' }));

    await waitFor(() => expect(screen.getByText('Step two')).toHaveFocus());
  });

  it('moves focus to the new page title when navigating to the previous page', async () => {
    render(
      <TeachingPopoverCarousel defaultValue="two">
        <TeachingPopoverCarouselCard value="one">
          <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">
          <TeachingPopoverTitle>Step two</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter next="Next" previous="Previous" initialStepText="Close" finalStepText="Finish">
          Footer
        </TeachingPopoverCarouselFooter>
      </TeachingPopoverCarousel>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));

    await waitFor(() => expect(screen.getByText('Step one')).toHaveFocus());
  });

  it('does not move focus to the title on initial render', async () => {
    render(
      <TeachingPopoverCarousel defaultValue="one">
        <TeachingPopoverCarouselCard value="one">
          <TeachingPopoverTitle>Step one</TeachingPopoverTitle>
        </TeachingPopoverCarouselCard>
      </TeachingPopoverCarousel>,
    );

    // Flush any pending microtasks (e.g. the carousel's mutation observer) before asserting.
    await Promise.resolve();

    expect(screen.getByText('Step one')).not.toHaveFocus();
  });
});
