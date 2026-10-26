import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { useTeachingPopoverCarouselFooterButtonBase_unstable } from '@fluentui/react-teaching-popover';
import { slot, useMergedRefs } from '@fluentui/react-utilities';
import type { ForwardRefComponent, RefAttributes } from '@fluentui/react-utilities';
import { Button } from '../../Button';
import type { ButtonProps } from '../../Button';
import {
  TeachingPopoverCarousel,
  TeachingPopoverCarouselCard,
  TeachingPopoverCarouselFooter,
  TeachingPopoverCarouselFooterButton,
  useTeachingPopoverCarousel,
  useTeachingPopoverCarouselContextValues,
  renderTeachingPopoverCarousel,
  useTeachingPopoverCarouselFooter,
  renderTeachingPopoverCarouselFooter,
  useTeachingPopoverCarouselFooterButton,
  renderTeachingPopoverCarouselFooterButton,
} from '../index';
import type { TeachingPopoverCarouselFooterButtonProps } from '../TeachingPopoverCarouselFooterButton';
import type { TeachingPopoverCarouselFooterProps } from './TeachingPopoverCarouselFooter.types';
import type { TeachingPopoverCarouselProps } from '../TeachingPopoverCarousel';

const ForwardingButton: ForwardRefComponent<ButtonProps> = React.forwardRef((props, ref) => {
  const mergedRef = useMergedRefs(ref);
  return <Button {...props} ref={element => mergedRef(element)} data-adapter-root />;
});

describe('TeachingPopoverCarouselFooter accepted-card recovery', () => {
  const RecoveryTour = ({
    value,
    target = 'first',
    control = true,
    pairedDisabled = true,
    tabIndex,
    onCardFocus,
    footer = true,
  }: {
    value: string;
    target?: string;
    control?: boolean;
    pairedDisabled?: boolean;
    tabIndex?: number;
    onCardFocus?: React.FocusEventHandler<HTMLDivElement>;
    footer?: boolean;
  }) => (
    <TeachingPopoverCarousel value={value}>
      <TeachingPopoverCarouselCard value={target} data-testid="accepted-card" tabIndex={tabIndex} onFocus={onCardFocus}>
        <button disabled>Disabled</button>
        <button hidden>Hidden</button>
        <div aria-hidden="true">
          <button>Excluded</button>
        </div>
        {control && <input aria-label="Accepted action" data-testid="card-control" />}
      </TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="middle">Middle</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="last">Last</TeachingPopoverCarouselCard>
      {footer && (
        <TeachingPopoverCarouselFooter
          previous={{
            navType: 'prev',
            children: 'Previous',
            altText: null,
            hidden: value === target,
            ...{ 'data-testid': 'source' },
          }}
          next={{
            navType: 'next',
            children: 'Next',
            altText: 'Done',
            disabled: pairedDisabled,
            ...{ 'data-testid': 'paired' },
          }}
        />
      )}
    </TeachingPopoverCarousel>
  );

  it('prefers eligible paired navigation over controls in the accepted card', async () => {
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" pairedDisabled={false} />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" pairedDisabled={false} />);
    await waitFor(() => expect(getByTestId('paired')).toHaveFocus());
    expect(getByTestId('card-control')).not.toHaveFocus();
  });

  it('focuses the first eligible control in the accepted card when navigation is unavailable', async () => {
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" />);
    await waitFor(() => expect(getByTestId('card-control')).toHaveFocus());
    expect(getByTestId('paired')).not.toHaveFocus();
  });

  it.each([undefined, -1, 0])('focuses the card as a last resort and preserves tabindex %p', async tabIndex => {
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" control={false} tabIndex={tabIndex} />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" control={false} tabIndex={tabIndex} />);
    await waitFor(() => expect(getByTestId('accepted-card')).toHaveFocus());
    if (tabIndex === undefined) {
      expect(getByTestId('accepted-card')).toHaveAttribute('tabindex', '-1');
      getByTestId('accepted-card').blur();
      expect(getByTestId('accepted-card')).not.toHaveAttribute('tabindex');
    } else {
      expect(getByTestId('accepted-card')).toHaveAttribute('tabindex', String(tabIndex));
    }
  });

  it('does not overwrite a consumer tabindex change during container focus', async () => {
    const onCardFocus: React.FocusEventHandler<HTMLDivElement> = event => {
      event.currentTarget.tabIndex = 0;
    };
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" control={false} onCardFocus={onCardFocus} />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" control={false} onCardFocus={onCardFocus} />);
    await waitFor(() => expect(getByTestId('accepted-card')).toHaveFocus());
    expect(getByTestId('accepted-card')).toHaveAttribute('tabindex', '0');
  });

  it.each([-1, 0])('preserves a consumer tabindex of %p adopted during container focus', async tabIndex => {
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" control={false} />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" control={false} />);
    await waitFor(() => expect(getByTestId('accepted-card')).toHaveFocus());
    rerender(<RecoveryTour value="first" control={false} tabIndex={tabIndex} />);
    // Blur before MutationObserver delivery to exercise the pending-record path.
    getByTestId('accepted-card').blur();
    expect(getByTestId('accepted-card')).toHaveAttribute('tabindex', String(tabIndex));
    getByTestId('accepted-card').focus();
    expect(getByTestId('accepted-card')).toHaveFocus();
  });

  it('preserves a synchronous identical tabindex write from the consumer focus handler', async () => {
    const onCardFocus: React.FocusEventHandler<HTMLDivElement> = event => {
      event.currentTarget.tabIndex = -1;
      event.currentTarget.blur();
    };
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" control={false} onCardFocus={onCardFocus} />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" control={false} onCardFocus={onCardFocus} />);
    await flushFocus();
    expect(getByTestId('accepted-card')).toHaveAttribute('tabindex', '-1');
    expect(getByTestId('accepted-card')).not.toHaveFocus();
  });

  it('does not remove a temporary tabindex while the focused card outlives the footer', async () => {
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" control={false} />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" control={false} />);
    await waitFor(() => expect(getByTestId('accepted-card')).toHaveFocus());
    const card = getByTestId('accepted-card');
    rerender(<RecoveryTour value="first" control={false} footer={false} />);
    expect(card).toHaveFocus();
    expect(card).toHaveAttribute('tabindex', '-1');
    card.blur();
    expect(card).not.toHaveAttribute('tabindex');
  });

  it('cleans up temporary tabindex when the focused card disconnects without a blur event', async () => {
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" control={false} />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" control={false} />);
    await waitFor(() => expect(getByTestId('accepted-card')).toHaveFocus());
    const card = getByTestId('accepted-card');
    rerender(<div />);
    await waitFor(() => expect(card).not.toHaveAttribute('tabindex'));
  });

  it('does not redirect when a request is rejected and the committed value stays unchanged', async () => {
    const { getByTestId } = render(<RecoveryTour value="middle" />);
    getByTestId('source').focus();
    fireEvent.click(getByTestId('source'));
    await flushFocus();
    expect(getByTestId('source')).toHaveFocus();
    expect(getByTestId('accepted-card')).not.toHaveFocus();
  });

  it('waits for acceptance before recovering and honours outside focus during a delay', async () => {
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" />);
    getByTestId('source').focus();
    fireEvent.click(getByTestId('source'));
    await flushFocus();
    getByTestId('source').blur();
    rerender(<RecoveryTour value="first" />);
    await flushFocus();
    expect(getByTestId('card-control')).not.toHaveFocus();
    expect(getByTestId('accepted-card')).not.toHaveFocus();
  });

  it('matches accepted card values literally rather than interpolating selectors', async () => {
    const target = 'first [value="quoted"] #one';
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" target={target} />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value={target} target={target} />);
    await waitFor(() => expect(getByTestId('card-control')).toHaveFocus());
  });

  it('recovers from Next disappearing on the final accepted card', async () => {
    const Tour = ({ value, disabledPrevious = true }: { value: string; disabledPrevious?: boolean }) => (
      <TeachingPopoverCarousel value={value}>
        <TeachingPopoverCarouselCard value="first">First</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="middle">Middle</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="last">
          <button data-testid="last-action">Last action</button>
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter
          previous={{
            navType: 'prev',
            children: 'Previous',
            altText: 'Restart',
            disabled: disabledPrevious,
            ...{ 'data-testid': 'previous' },
          }}
          next={{
            navType: 'next',
            children: 'Next',
            altText: null,
            hidden: value === 'last',
            ...{ 'data-testid': 'next' },
          }}
        />
      </TeachingPopoverCarousel>
    );
    const { getByTestId, rerender } = render(<Tour value="middle" disabledPrevious={false} />);
    getByTestId('next').focus();
    rerender(<Tour value="last" disabledPrevious={false} />);
    await waitFor(() => expect(getByTestId('previous')).toHaveFocus());
    rerender(<Tour value="middle" />);
    getByTestId('next').focus();
    rerender(<Tour value="last" />);
    await waitFor(() => expect(getByTestId('last-action')).toHaveFocus());
  });

  it('keeps recovery within the owning carousel', async () => {
    const { getAllByTestId, rerender } = render(
      <>
        <RecoveryTour value="middle" />
        <RecoveryTour value="middle" />
      </>,
    );
    getAllByTestId('source')[1].focus();
    rerender(
      <>
        <RecoveryTour value="middle" />
        <RecoveryTour value="first" />
      </>,
    );
    await waitFor(() => expect(getAllByTestId('card-control')[0]).toHaveFocus());
    expect(getAllByTestId('source')[0]).not.toHaveFocus();
  });

  it('keeps consumer-directed focus when a fallback control redirects focus', async () => {
    const outsideRef = React.createRef<HTMLButtonElement>();
    const Tour = ({ value }: { value: string }) => (
      <>
        <button ref={outsideRef} data-testid="redirected">
          Outside
        </button>
        <TeachingPopoverCarousel value={value}>
          <TeachingPopoverCarouselCard value="first">
            <input onFocus={() => outsideRef.current?.focus()} data-testid="redirect-control" />
          </TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselCard value="middle">Middle</TeachingPopoverCarouselCard>
          <TeachingPopoverCarouselFooter
            previous={{
              navType: 'prev',
              children: 'Previous',
              altText: null,
              hidden: value === 'first',
              ...{ 'data-testid': 'redirect-source' },
            }}
            next={{ navType: 'next', children: 'Next', altText: 'Done', disabled: true }}
          />
        </TeachingPopoverCarousel>
      </>
    );
    const { getByTestId, rerender } = render(<Tour value="middle" />);
    getByTestId('redirect-source').focus();
    rerender(<Tour value="first" />);
    await waitFor(() => expect(getByTestId('redirected')).toHaveFocus());
  });

  it('does not later steal focus from a completed card fallback when navigation becomes eligible', async () => {
    const { getByTestId, rerender } = render(<RecoveryTour value="middle" />);
    getByTestId('source').focus();
    rerender(<RecoveryTour value="first" />);
    await waitFor(() => expect(getByTestId('card-control')).toHaveFocus());
    rerender(<RecoveryTour value="first" pairedDisabled={false} />);
    await flushFocus();
    expect(getByTestId('card-control')).toHaveFocus();
  });

  it('can focus eligible descendants when the accepted card uses display:contents', async () => {
    const Tour = ({ value }: { value: string }) => (
      <TeachingPopoverCarousel value={value}>
        <TeachingPopoverCarouselCard value="first" style={{ display: 'contents' }}>
          <input data-testid="contents-control" />
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="middle">Middle</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter
          previous={{
            navType: 'prev',
            children: 'Previous',
            altText: null,
            hidden: value === 'first',
            ...{ 'data-testid': 'contents-source' },
          }}
          next={{ navType: 'next', children: 'Next', altText: 'Done', disabled: true }}
        />
      </TeachingPopoverCarousel>
    );
    const { getByTestId, rerender } = render(<Tour value="middle" />);
    getByTestId('contents-source').focus();
    rerender(<Tour value="first" />);
    await waitFor(() => expect(getByTestId('contents-control')).toHaveFocus());
  });

  it('continues recovering through a replaced carousel root with the same public renderer contract', async () => {
    const CarouselAdapter: ForwardRefComponent<TeachingPopoverCarouselProps & { generation: number }> =
      React.forwardRef(({ generation, ...props }, ref) => {
        const baseState = useTeachingPopoverCarousel(props, ref);
        const values = useTeachingPopoverCarouselContextValues(baseState);
        return renderTeachingPopoverCarousel(
          {
            ...baseState,
            components: { root: ReplacingRoot },
            root: slot.always({ ...baseState.root, generation }, { elementType: ReplacingRoot }),
          },
          values,
        );
      });
    const Tour = ({ value, generation }: { value: string; generation: number }) => (
      <CarouselAdapter value={value} generation={generation}>
        <TeachingPopoverCarouselCard value="first">
          <input data-testid="root-card-control" />
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="middle">Middle</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter
          previous={{
            navType: 'prev',
            children: 'Previous',
            altText: null,
            hidden: value === 'first',
            ...{ 'data-testid': 'root-source' },
          }}
          next={{ navType: 'next', children: 'Next', altText: 'Done', disabled: true }}
        />
      </CarouselAdapter>
    );
    const { getByTestId, rerender } = render(<Tour value="middle" generation={0} />);
    const original = getByTestId('root-source');
    original.focus();
    rerender(<Tour value="middle" generation={1} />);
    await flushFocus();
    expect(original).not.toBeInTheDocument();
    getByTestId('root-source').focus();
    rerender(<Tour value="first" generation={1} />);
    await waitFor(() => expect(getByTestId('root-card-control')).toHaveFocus());
  });
});

const PresentationButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> = React.forwardRef(
  (props, ref) => {
    const baseState = useTeachingPopoverCarouselFooterButton(props, ref);
    const state = {
      ...baseState,
      components: { root: ForwardingButton },
      root: slot.always(
        { ...baseState.root, hidden: props.navType === 'prev' && baseState.root.children === null },
        { elementType: ForwardingButton },
      ),
    };
    return renderTeachingPopoverCarouselFooterButton(state);
  },
);

const PresentationFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps> = React.forwardRef((props, ref) => {
  const baseState = useTeachingPopoverCarouselFooter(props, ref);
  const state = {
    ...baseState,
    components: { root: 'div' as const, previous: PresentationButton, next: PresentationButton },
    previous: slot.optional(baseState.previous, { elementType: PresentationButton }),
    next: slot.always(baseState.next, { elementType: PresentationButton }),
  };
  return renderTeachingPopoverCarouselFooter(state);
});

const flushFocus = async () => {
  await act(async () => undefined);
};

const ReplacingRoot = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<'div'> & { generation: number }>(
  ({ generation, ...props }, ref) => <div {...props} key={generation} ref={ref} />,
);

const ReplacingRootFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps & { generation: number }> =
  React.forwardRef(({ generation, ...props }, ref) => {
    const baseState = useTeachingPopoverCarouselFooter(props, ref);
    return renderTeachingPopoverCarouselFooter({
      ...baseState,
      components: {
        root: ReplacingRoot,
        previous: TeachingPopoverCarouselFooterButton,
        next: TeachingPopoverCarouselFooterButton,
      },
      root: slot.always({ ...baseState.root, generation }, { elementType: ReplacingRoot }),
    });
  });

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
  presentation?: boolean;
  extraNext?: boolean;
  omitPrevious?: boolean;
  blockFallback?: boolean;
};

const Example = ({
  value = 'two',
  previous,
  next,
  omitNext,
  onValueChange,
  hidePrevious = true,
  presentation,
  extraNext,
  omitPrevious,
  blockFallback,
}: ExampleProps) => {
  const Footer = presentation ? PresentationFooter : TeachingPopoverCarouselFooter;
  return (
    <>
      <button data-testid="outside">Outside</button>
      <TeachingPopoverCarousel value={value} onValueChange={onValueChange}>
        <TeachingPopoverCarouselCard value="one" style={blockFallback ? { display: 'none' } : undefined}>
          One
        </TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        <Footer
          previous={
            omitPrevious
              ? null
              : {
                  navType: 'prev',
                  children: 'Previous',
                  altText: null,
                  hidden: hidePrevious && value === 'one',
                  ...{ 'data-testid': 'previous' },
                  ...previous,
                }
          }
          next={
            omitNext
              ? { navType: 'next', altText: 'Got it', children: () => null }
              : { navType: 'next', children: 'Next', altText: 'Got it', ...{ 'data-testid': 'next' }, ...next }
          }
        >
          {extraNext && (
            <TeachingPopoverCarouselFooterButton navType="next" altText="Auxiliary" data-testid="auxiliary">
              Auxiliary
            </TeachingPopoverCarouselFooterButton>
          )}
        </Footer>
      </TeachingPopoverCarousel>
    </>
  );
};

describe('TeachingPopoverCarouselFooter paired focus', () => {
  it('waits for an accepted commit, then hands focus to the paired Next', async () => {
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
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('hands off when the consumer replaces the Next callback ref in the accepted commit', async () => {
    const { getByTestId, rerender } = render(<Example next={{ ref: jest.fn() }} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" next={{ ref: jest.fn() }} />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it.each(['outside focus', 'explicit blur'] as const)('does not steal %s before delayed acceptance', async action => {
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
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
    if (action === 'outside focus') {
      expect(getByTestId('outside')).toHaveFocus();
    }
  });

  it('does not transfer when Previous did not own focus', async () => {
    const { getByTestId, rerender } = render(<Example />);
    getByTestId('outside').focus();
    rerender(<Example value="one" />);
    await flushFocus();
    expect(getByTestId('outside')).toHaveFocus();
  });

  it('preserves a visible alternative action', async () => {
    const { getByTestId, rerender } = render(<Example previous={{ altText: 'Restart' }} hidePrevious={false} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" previous={{ altText: 'Restart' }} hidePrevious={false} />);
    await flushFocus();
    expect(getByTestId('previous')).toHaveTextContent('Restart');
    expect(getByTestId('previous')).toHaveFocus();
  });

  it('retains ownership while alternate text is non-null on the same focused Previous', async () => {
    const { getByTestId, rerender } = render(<Example previous={{ altText: 'Restart' }} />);
    const previous = getByTestId('previous');
    previous.focus();
    rerender(<Example previous={{ altText: 'Restart' }} />);
    await flushFocus();
    expect(getByTestId('previous')).toBe(previous);
    expect(previous).toHaveFocus();
    rerender(<Example value="one" />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('does not retain ownership with non-null alternate text after explicit blur', async () => {
    const { getByTestId, rerender } = render(<Example previous={{ altText: 'Restart' }} />);
    getByTestId('previous').focus();
    rerender(<Example previous={{ altText: 'Restart' }} />);
    getByTestId('previous').blur();
    rerender(<Example value="one" />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it.each(['button', 'a'] as const)('recovers focus when display:contents removes the Previous %s box', async as => {
    const { getByTestId, rerender } = render(<Example previous={{ as }} hidePrevious={false} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" previous={{ as, style: { display: 'contents' } }} hidePrevious={false} />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('does not reject Next merely because an ancestor uses display:contents', async () => {
    const Tour = ({ value }: { value: string }) => (
      <div style={{ display: 'contents' }}>
        <Example value={value} />
      </div>
    );
    const { getByTestId, rerender } = render(<Tour value="two" />);
    getByTestId('previous').focus();
    rerender(<Tour value="one" />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('does not treat null altText alone as an instruction to hide or transfer', async () => {
    const { getByTestId, rerender } = render(<Example hidePrevious={false} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" hidePrevious={false} />);
    await flushFocus();
    expect(getByTestId('previous')).toHaveFocus();
  });

  it.each<FooterButtonOverrides>([
    { disabled: true },
    { disabledFocusable: true },
    { 'aria-disabled': true },
    { hidden: true },
    { style: { display: 'none' } },
    { style: { visibility: 'hidden' } },
    { style: { display: 'contents' } },
    { tabIndex: -1 },
    { navType: 'prev' },
  ])('does not transfer to an unavailable Next: %p', async next => {
    const { getByTestId, queryByTestId, rerender } = render(<Example next={next} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" next={next} />);
    await flushFocus();
    expect(queryByTestId('next')).not.toHaveFocus();
  });

  it('does not transfer when the Next slot renders nothing', async () => {
    const { getByTestId, queryByTestId, rerender } = render(<Example omitNext />);
    getByTestId('previous').focus();
    rerender(<Example value="one" omitNext />);
    await flushFocus();
    expect(queryByTestId('next')).toBeNull();
    expect(getByTestId('previous').ownerDocument.activeElement).toHaveAttribute('data-carousel-item', 'one');
  });

  it('does not transfer to a disconnected Next', async () => {
    const { getByTestId, rerender } = render(<Example />);
    const next = getByTestId('next');
    getByTestId('previous').focus();
    next.remove();
    rerender(<Example value="one" />);
    await flushFocus();
    expect(next).not.toHaveFocus();
  });

  it('preserves caller refs and focus, blur, and click handlers for anchor roots', async () => {
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
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
    expect(previousRef.current).toBe(previous);
  });

  it('keeps consumer-directed outside focus on an accepted click', async () => {
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
    await flushFocus();
    expect(getByTestId('redirect')).toHaveFocus();
  });

  it('isolates multiple footers in the same carousel', async () => {
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
    await waitFor(() => expect(getByTestId('first-next')).toHaveFocus());
    expect(getByTestId('second-next')).not.toHaveFocus();
  });

  it('retains a pending handoff across inline callback ref replacement in presentation adapters', async () => {
    const { getByTestId, rerender } = render(<Example presentation />);
    expect(getByTestId('next')).toHaveAttribute('data-adapter-root');
    getByTestId('previous').focus();
    rerender(<Example presentation value="one" />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('does not substitute an auxiliary child for an absent designated Next', async () => {
    const { getByTestId, rerender } = render(<Example extraNext omitNext />);
    getByTestId('previous').focus();
    rerender(<Example value="one" extraNext omitNext />);
    await flushFocus();
    expect(getByTestId('auxiliary')).not.toHaveFocus();
  });

  it('accepts a visible Next overriding visibility:hidden on an ancestor', async () => {
    const Tour = ({ value }: { value: string }) => (
      <div style={{ visibility: 'hidden' }}>
        <Example
          value={value}
          previous={{ style: { visibility: 'visible' } }}
          next={{ style: { visibility: 'visible' } }}
        />
      </div>
    );
    const { getByTestId, rerender } = render(<Tour value="two" />);
    getByTestId('previous').focus();
    rerender(<Tour value="one" />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('retries when the designated Next becomes available', async () => {
    const { getByTestId, rerender } = render(<Example next={{ hidden: true }} blockFallback />);
    getByTestId('previous').focus();
    rerender(<Example value="one" next={{ hidden: true }} blockFallback />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
    rerender(<Example value="one" blockFallback />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('cancels pending handoff after outside focus, even if that target is later blurred', async () => {
    const { getByTestId, rerender } = render(<Example next={{ hidden: true }} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" next={{ hidden: true }} />);
    await flushFocus();
    getByTestId('outside').focus();
    getByTestId('outside').blur();
    rerender(<Example value="one" />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it('cancels pending handoff when Previous becomes available again', async () => {
    const { getByTestId, rerender } = render(<Example next={{ hidden: true }} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" next={{ hidden: true }} />);
    await flushFocus();
    rerender(<Example value="two" />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it('does not change the original button hook re-export', () => {
    expect(useTeachingPopoverCarouselFooterButton).toBe(useTeachingPopoverCarouselFooterButtonBase_unstable);
  });

  it('preserves focus handlers when Previous autofocuses before the footer layout effects', async () => {
    const onFocus = jest.fn();
    const { getByTestId, rerender } = render(<Example previous={{ autoFocus: true, onFocus }} />);
    expect(getByTestId('previous')).toHaveFocus();
    expect(onFocus).toHaveBeenCalledTimes(1);
    rerender(<Example value="one" previous={{ autoFocus: true, onFocus }} />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('discards ownership when Previous is removed and restored without focus', async () => {
    const { getByTestId, rerender } = render(<Example />);
    getByTestId('previous').focus();
    rerender(<Example omitPrevious />);
    await flushFocus();
    rerender(<Example />);
    await flushFocus();
    expect(getByTestId('previous')).not.toHaveFocus();
    rerender(<Example value="one" />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it('does not carry ownership to a different Previous host element', async () => {
    const { getByTestId, rerender } = render(<Example />);
    const originalPrevious = getByTestId('previous');
    originalPrevious.focus();
    rerender(<Example previous={{ as: 'a' }} />);
    await flushFocus();
    const replacementPrevious = getByTestId('previous');
    expect(originalPrevious).not.toBeInTheDocument();
    expect(replacementPrevious.tagName).toBe('A');
    expect(replacementPrevious).not.toHaveFocus();
    rerender(<Example value="one" previous={{ as: 'a' }} />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();

    rerender(<Example previous={{ as: 'a' }} />);
    replacementPrevious.focus();
    rerender(<Example value="one" previous={{ as: 'a' }} />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('does not transfer when Previous is replaced in the same boundary commit', async () => {
    const { getByTestId, rerender } = render(<Example />);
    getByTestId('previous').focus();
    rerender(<Example value="one" previous={{ as: 'a' }} />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it('preserves outside focus and blur performed by a ref callback during the boundary commit', async () => {
    const previousRef = React.createRef<HTMLButtonElement>();
    const outsideRef = React.createRef<HTMLButtonElement>();
    const onOutsideFocus = jest.fn();
    const Tour = ({ value }: { value: string }) => (
      <>
        <button ref={outsideRef} onFocus={onOutsideFocus}>
          Outside
        </button>
        <Example
          value={value}
          previous={{ ref: previousRef }}
          next={{
            ref: element => {
              if (element && value === 'one') {
                previousRef.current?.blur();
                outsideRef.current?.focus();
                outsideRef.current?.blur();
              }
            },
          }}
        />
      </>
    );
    const { getByTestId, rerender } = render(<Tour value="two" />);
    getByTestId('previous').focus();
    rerender(<Tour value="one" />);
    await flushFocus();
    expect(onOutsideFocus).toHaveBeenCalled();
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it('retries after an imperative tabindex change makes Next eligible', async () => {
    const { getByTestId, rerender } = render(<Example next={{ tabIndex: -1 }} blockFallback />);
    getByTestId('previous').focus();
    rerender(<Example value="one" next={{ tabIndex: -1 }} blockFallback />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
    await act(async () => {
      getByTestId('next').tabIndex = 0;
    });
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('retries after an ancestor outside the footer makes Next visible', async () => {
    const wrapperRef = React.createRef<HTMLDivElement>();
    const Tour = ({ value }: { value: string }) => (
      <div ref={wrapperRef} style={{ visibility: 'hidden' }}>
        <Example value={value} previous={{ style: { visibility: 'visible' } }} />
      </div>
    );
    const { getByTestId, rerender } = render(<Tour value="two" />);
    getByTestId('previous').focus();
    rerender(<Tour value="one" />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
    await act(async () => {
      wrapperRef.current!.style.visibility = 'visible';
    });
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('preserves a focusable Previous box with its own content-visibility:hidden', async () => {
    const { getByTestId, rerender } = render(<Example hidePrevious={false} />);
    getByTestId('previous').focus();
    rerender(<Example value="one" hidePrevious={false} previous={{ style: { contentVisibility: 'hidden' } }} />);
    await flushFocus();
    expect(getByTestId('previous')).toHaveFocus();
  });

  it('does not transfer into content skipped by an ancestor', async () => {
    const wrapperRef = React.createRef<HTMLDivElement>();
    const Tour = ({ value }: { value: string }) => (
      <div ref={wrapperRef}>
        <Example value={value} />
      </div>
    );
    const { getByTestId, rerender } = render(<Tour value="two" />);
    getByTestId('previous').focus();
    wrapperRef.current!.style.setProperty('content-visibility', 'hidden');
    rerender(<Tour value="one" />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it('cleans up focus subscriptions when the footer unmounts', () => {
    const { unmount, getByTestId } = render(<Example />);
    const ownerDocument = getByTestId('previous').ownerDocument;
    const removeDocumentListener = jest.spyOn(ownerDocument, 'removeEventListener');
    const removeWindowListener = jest.spyOn(ownerDocument.defaultView!, 'removeEventListener');
    unmount();
    expect(removeDocumentListener).toHaveBeenCalledWith('focusin', expect.any(Function), true);
    expect(removeWindowListener).toHaveBeenCalledWith('blur', expect.any(Function));
    removeDocumentListener.mockRestore();
    removeWindowListener.mockRestore();
  });

  it('rebinds subscriptions and discards stale ownership when the concrete root changes', async () => {
    const Tour = ({ value, generation }: { value: string; generation: number }) => (
      <TeachingPopoverCarousel value={value}>
        <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        <ReplacingRootFooter
          generation={generation}
          previous={{
            navType: 'prev',
            children: 'Previous',
            altText: null,
            hidden: value === 'one',
            ...{ 'data-testid': 'previous' },
          }}
          next={{ navType: 'next', children: 'Next', altText: 'Done', ...{ 'data-testid': 'next' } }}
        />
      </TeachingPopoverCarousel>
    );
    const { getByTestId, rerender } = render(<Tour value="two" generation={0} />);
    const originalPrevious = getByTestId('previous');
    originalPrevious.focus();
    const removeListener = jest.spyOn(originalPrevious.ownerDocument, 'removeEventListener');
    rerender(<Tour value="two" generation={1} />);
    await flushFocus();
    expect(originalPrevious).not.toBeInTheDocument();
    expect(removeListener).toHaveBeenCalledWith('focusin', expect.any(Function), true);
    rerender(<Tour value="one" generation={1} />);
    await flushFocus();
    expect(getByTestId('next')).not.toHaveFocus();
    rerender(<Tour value="two" generation={1} />);
    getByTestId('previous').focus();
    rerender(<Tour value="one" generation={1} />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
    removeListener.mockRestore();
  });
});
