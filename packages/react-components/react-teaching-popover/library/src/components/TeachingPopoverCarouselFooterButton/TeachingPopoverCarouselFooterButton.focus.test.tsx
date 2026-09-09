import * as React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooterButton } from './TeachingPopoverCarouselFooterButton';

const Example = ({
  value,
  previousAltText = null,
  nextAltText = 'Got it',
  previousRef,
}: {
  value?: string;
  previousAltText?: React.ReactNode;
  nextAltText?: React.ReactNode;
  previousRef?: React.Ref<HTMLButtonElement | HTMLAnchorElement>;
}) => (
  <TeachingPopoverCarousel value={value} defaultValue={value === undefined ? 'two' : undefined}>
    <TeachingPopoverCarouselCard value="one">First</TeachingPopoverCarouselCard>
    <TeachingPopoverCarouselCard value="two">Second</TeachingPopoverCarouselCard>
    <TeachingPopoverCarouselFooterButton navType="prev" altText={previousAltText} ref={previousRef}>
      Previous
    </TeachingPopoverCarouselFooterButton>
    <TeachingPopoverCarouselFooterButton navType="next" altText={nextAltText}>
      Next
    </TeachingPopoverCarouselFooterButton>
  </TeachingPopoverCarousel>
);

describe('TeachingPopoverCarouselFooterButton focus', () => {
  it('focuses Next when navigating back hides the focused Previous button', () => {
    const { getByRole } = render(<Example />);

    userEvent.click(getByRole('button', { name: 'Previous' }));

    expect(getByRole('button', { name: 'Next' })).toHaveFocus();
  });

  it('restores focus for a controlled page transition and forwards the button ref', () => {
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { getByRole, rerender } = render(<Example value="two" previousRef={ref} />);
    expect(ref.current).toBe(getByRole('button', { name: 'Previous' }));
    ref.current?.focus();

    rerender(<Example value="one" previousRef={ref} />);

    expect(getByRole('button', { name: 'Next' })).toHaveFocus();
    expect(ref.current).toHaveAttribute('hidden');
  });

  it('does not move focus when a controlled page change is rejected', () => {
    const { getByRole } = render(<Example value="two" />);
    const previous = getByRole('button', { name: 'Previous' });

    userEvent.click(previous);

    expect(previous).toHaveFocus();
  });

  it('does not move focus when Previous still has alternate content', () => {
    const { getByRole } = render(<Example previousAltText="Start" />);

    userEvent.click(getByRole('button', { name: 'Previous' }));

    expect(getByRole('button', { name: 'Start' })).toHaveFocus();
  });

  it('does not move focus from another element on a controlled page change', () => {
    const { getByRole, rerender } = render(<Example value="two" />);
    const next = getByRole('button', { name: 'Got it' });
    next.focus();

    rerender(<Example value="one" />);

    expect(getByRole('button', { name: 'Next' })).toHaveFocus();
  });

  it('focuses Previous when Next becomes hidden on the last page', () => {
    const { getByRole } = render(<Example nextAltText={null} />);
    userEvent.click(getByRole('button', { name: 'Previous' }));

    userEvent.click(getByRole('button', { name: 'Next' }));

    expect(getByRole('button', { name: 'Previous' })).toHaveFocus();
  });
});
