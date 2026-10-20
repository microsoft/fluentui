import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import type { RefAttributes } from '@fluentui/react-utilities';
import { TeachingPopoverCarousel, TeachingPopoverCarouselCard, TeachingPopoverCarouselFooter } from '../index';
import type { TeachingPopoverCarouselFooterButtonProps } from '../TeachingPopoverCarouselFooterButton';

type FooterButtonOverrides = (
  | Partial<Extract<TeachingPopoverCarouselFooterButtonProps, { as?: 'button' }>>
  | (Partial<Extract<TeachingPopoverCarouselFooterButtonProps, { as: 'a' }>> & { as: 'a' })
) &
  RefAttributes<HTMLButtonElement | HTMLAnchorElement>;

type ExampleProps = {
  value?: string;
  previous?: FooterButtonOverrides;
  next?: FooterButtonOverrides;
  omitNext?: boolean;
  onValueChange?: () => void;
  hidePrevious?: boolean;
};

const Example = ({ value = 'two', previous, next, omitNext, onValueChange, hidePrevious = true }: ExampleProps) => (
  <>
    <button data-testid="outside">Outside</button>
    <TeachingPopoverCarousel value={value} onValueChange={onValueChange}>
      <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselFooter
        previous={{
          navType: 'prev',
          children: 'Previous',
          altText: null,
          hidden: hidePrevious && value === 'one',
          ...{ 'data-testid': 'previous' },
          ...previous,
        }}
        next={
          omitNext
            ? { navType: 'next', altText: 'Got it', children: () => null }
            : { navType: 'next', children: 'Next', altText: 'Got it', ...{ 'data-testid': 'next' }, ...next }
        }
      />
    </TeachingPopoverCarousel>
  </>
);

describe('TeachingPopoverCarouselFooter paired focus', () => {
  it('waits for an accepted commit, then hands focus to the paired Next', () => {
    const onValueChange = jest.fn();
    const { getByTestId, rerender } = render(<Example onValueChange={onValueChange} />);
    const previous = getByTestId('previous');
    previous.focus();
    fireEvent.click(previous);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect(previous).toHaveFocus();
    expect(previous).toHaveTextContent('Previous');

    rerender(<Example value="one" />);
    expect(previous).toBeEmptyDOMElement();
    expect(getByTestId('next')).toHaveFocus();
  });

  it('hands off when the consumer replaces the Next callback ref in the accepted commit', () => {
    const { getByTestId, rerender } = render(<Example next={{ ref: jest.fn() }} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" next={{ ref: jest.fn() }} />);
    expect(getByTestId('next')).toHaveFocus();
  });

  it.each(['outside focus', 'explicit blur'] as const)('does not steal %s before delayed acceptance', action => {
    const { getByTestId, rerender } = render(<Example />);
    const previous = getByTestId('previous');
    previous.focus();
    fireEvent.click(previous);
    if (action === 'outside focus') {
      getByTestId('outside').focus();
    } else {
      previous.blur();
    }
    rerender(<Example value="one" />);
    expect(getByTestId('next')).not.toHaveFocus();
    if (action === 'outside focus') {
      expect(getByTestId('outside')).toHaveFocus();
    }
  });

  it('does not transfer when Previous did not own focus', () => {
    const { getByTestId, rerender } = render(<Example />);
    getByTestId('outside').focus();
    rerender(<Example value="one" />);
    expect(getByTestId('outside')).toHaveFocus();
  });

  it('preserves a visible alternative action', () => {
    const { getByTestId, rerender } = render(<Example previous={{ altText: 'Restart' }} hidePrevious={false} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" previous={{ altText: 'Restart' }} hidePrevious={false} />);
    expect(getByTestId('previous')).toHaveTextContent('Restart');
    expect(getByTestId('previous')).toHaveFocus();
  });

  it('does not treat null altText alone as an instruction to hide or transfer', () => {
    const { getByTestId, rerender } = render(<Example hidePrevious={false} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" hidePrevious={false} />);
    expect(getByTestId('previous')).toHaveFocus();
  });

  it.each<FooterButtonOverrides>([
    { disabled: true },
    { disabledFocusable: true },
    { 'aria-disabled': true },
    { hidden: true },
    { style: { display: 'none' } },
    { style: { visibility: 'hidden' } },
    { tabIndex: -1 },
  ])('does not transfer to an unavailable Next: %p', next => {
    const { getByTestId, queryByTestId, rerender } = render(<Example next={next} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" next={next} />);
    expect(queryByTestId('next')).not.toHaveFocus();
  });

  it('does not transfer when the Next slot renders nothing', () => {
    const { getByTestId, queryByTestId, rerender } = render(<Example omitNext />);
    getByTestId('previous').focus();
    rerender(<Example value="one" omitNext />);
    expect(queryByTestId('next')).toBeNull();
    expect(getByTestId('previous')).toHaveFocus();
  });

  it('does not transfer to a disconnected Next', () => {
    const { getByTestId, rerender } = render(<Example />);
    const next = getByTestId('next');
    getByTestId('previous').focus();
    next.remove();
    rerender(<Example value="one" />);
    expect(next).not.toHaveFocus();
  });

  it('preserves caller refs and focus, blur, and click handlers for anchor roots', () => {
    const previousRef = React.createRef<HTMLAnchorElement>();
    const nextRef = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const props = {
      previous: { as: 'a' as const, ref: previousRef, onFocus, onBlur, onClick },
      next: { as: 'a' as const, ref: nextRef },
    };
    const { getByTestId, rerender } = render(<Example {...props} />);
    const previous = getByTestId('previous');
    expect(previousRef.current).toBe(previous);
    expect(nextRef).toHaveBeenLastCalledWith(getByTestId('next'));
    previous.focus();
    fireEvent.click(previous);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    previous.blur();
    expect(onBlur).toHaveBeenCalledTimes(1);
    rerender(<Example {...props} value="one" />);
    expect(getByTestId('next')).not.toHaveFocus();
    expect(previousRef.current).toBe(previous);
  });

  it('keeps consumer-directed outside focus on an accepted click', () => {
    const ExampleWithOutsideFocus = () => {
      const [value, setValue] = React.useState('two');
      const outsideRef = React.useRef<HTMLButtonElement>(null);
      return (
        <>
          <button ref={outsideRef} data-testid="redirect">
            Redirect
          </button>
          <Example
            value={value}
            onValueChange={() => setValue('one')}
            previous={{ onClick: () => outsideRef.current?.focus() }}
          />
        </>
      );
    };
    const { getByTestId } = render(<ExampleWithOutsideFocus />);
    getByTestId('previous').focus();
    fireEvent.click(getByTestId('previous'));
    expect(getByTestId('redirect')).toHaveFocus();
  });

  it('isolates multiple footers in the same carousel', () => {
    const Tour = ({ value }: { value: string }) => (
      <TeachingPopoverCarousel value={value}>
        <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        {['first', 'second'].map(id => (
          <TeachingPopoverCarouselFooter
            key={id}
            previous={{
              navType: 'prev',
              children: 'Previous',
              altText: null,
              hidden: value === 'one',
              ...{ 'data-testid': `${id}-previous` },
            }}
            next={{ navType: 'next', children: 'Next', altText: 'Got it', ...{ 'data-testid': `${id}-next` } }}
          />
        ))}
      </TeachingPopoverCarousel>
    );
    const { getByTestId, rerender } = render(<Tour value="two" />);
    getByTestId('first-previous').focus();
    rerender(<Tour value="one" />);
    expect(getByTestId('first-next')).toHaveFocus();
    expect(getByTestId('second-next')).not.toHaveFocus();
  });
});
