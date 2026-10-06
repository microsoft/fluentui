import * as React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { RefAttributes } from '@fluentui/react-utilities';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from './TeachingPopoverCarouselFooter';
import type { TeachingPopoverCarouselFooterButtonProps } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton.types';

type ButtonOptions = Partial<Extract<TeachingPopoverCarouselFooterButtonProps, { as?: 'button' }>> &
  RefAttributes<HTMLButtonElement | HTMLAnchorElement>;

const Example = ({ value, previous, next }: { value?: string; previous?: ButtonOptions; next?: ButtonOptions }) => (
  <>
    <button>Outside</button>
    <TeachingPopoverCarousel value={value} defaultValue={value === undefined ? 'two' : undefined}>
      <TeachingPopoverCarouselCard value="one">First</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="two">Second</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselFooter
        initialStepText=""
        finalStepText="Got it"
        previous={{ navType: 'prev', children: 'Previous', altText: null, ...previous }}
        next={{ navType: 'next', children: 'Next', altText: 'Got it', ...next }}
      />
    </TeachingPopoverCarousel>
  </>
);

describe('TeachingPopoverCarouselFooter focus', () => {
  it('transfers focus in both directions when navigation hides the focused button', () => {
    const onFocus = jest.fn();
    const ref = React.createRef<HTMLButtonElement | HTMLAnchorElement>();
    const { getByRole } = render(<Example previous={{ ref, autoFocus: true, onFocus }} next={{ altText: null }} />);
    expect(ref.current).toHaveFocus();
    expect(onFocus).toHaveBeenCalledTimes(1);

    userEvent.click(getByRole('button', { name: 'Previous' }));
    expect(ref.current).toHaveAttribute('hidden');
    expect(getByRole('button', { name: 'Next' })).toHaveFocus();

    userEvent.click(getByRole('button', { name: 'Next' }));
    expect(getByRole('button', { name: 'Previous' })).toHaveFocus();
  });

  it('waits for an accepted controlled page change', () => {
    const { getByRole, rerender } = render(<Example value="two" />);
    userEvent.click(getByRole('button', { name: 'Previous' }));
    expect(getByRole('button', { name: 'Previous' })).toHaveFocus();

    rerender(<Example value="one" />);
    expect(getByRole('button', { name: 'Next' })).toHaveFocus();
  });

  it('preserves focus when alternate content keeps the button visible', () => {
    const { getByRole } = render(<Example previous={{ altText: 'Start' }} />);
    userEvent.click(getByRole('button', { name: 'Previous' }));
    expect(getByRole('button', { name: 'Start' })).toHaveFocus();
  });

  it('does not reclaim focus deliberately moved outside, even after blur', () => {
    const { getByRole, rerender } = render(<Example value="two" />);
    getByRole('button', { name: 'Previous' }).focus();
    getByRole('button', { name: 'Outside' }).focus();
    getByRole('button', { name: 'Outside' }).blur();
    rerender(<Example value="one" />);
    expect(getByRole('button', { name: 'Next' })).not.toHaveFocus();
  });

  it('preserves focus redirected by a consumer ref while the page changes', () => {
    const { getByRole, rerender } = render(<Example value="two" />);
    getByRole('button', { name: 'Previous' }).focus();
    rerender(
      <Example
        value="one"
        next={{
          ref: button => {
            if (button) {
              getByRole('button', { name: 'Outside' }).focus();
            }
          },
        }}
      />,
    );
    expect(getByRole('button', { name: 'Outside' })).toHaveFocus();
  });
});
