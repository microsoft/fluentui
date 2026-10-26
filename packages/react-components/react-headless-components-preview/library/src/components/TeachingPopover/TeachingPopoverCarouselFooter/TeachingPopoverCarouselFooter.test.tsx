import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import type { TeachingPopoverCarouselProps } from '../TeachingPopoverCarousel/TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from './TeachingPopoverCarouselFooter';
import { TeachingPopoverCarouselFooterProvider } from './TeachingPopoverCarouselFooterContext';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';

type ExampleProps = Pick<TeachingPopoverCarouselProps, 'defaultValue' | 'value' | 'onValueChange'> & {
  altText?: React.ReactNode;
  hideEmpty?: boolean;
  previous?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  next?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextRef?: React.Ref<HTMLButtonElement>;
  previousHidden?: boolean;
};

const Example = ({ altText, hideEmpty = true, previous, next, nextRef, previousHidden, ...props }: ExampleProps) => (
  <>
    {hideEmpty && <style>{'[data-testid="previous"]:empty { display: none; }'}</style>}
    <button data-testid="outside">Outside</button>
    <TeachingPopoverCarousel defaultValue={props.value === undefined ? 'one' : undefined} {...props}>
      <TeachingPopoverCarouselCard value="one">Page one</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="two">Page two</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselCard value="three">Page three</TeachingPopoverCarouselCard>
      <TeachingPopoverCarouselFooter
        previous={{
          navType: 'prev',
          children: 'Previous',
          altText,
          hidden: previousHidden,
          ...{ 'data-testid': 'previous' },
          ...previous,
        }}
        next={{
          navType: 'next',
          children: 'Next',
          altText: 'Done',
          ...{ 'data-testid': 'next', ref: nextRef },
          ...next,
        }}
      />
    </TeachingPopoverCarousel>
  </>
);

describe('TeachingPopoverCarouselFooter focus recovery', () => {
  afterEach(() => jest.restoreAllMocks());

  it('retains Previous focus from 3 to 2 and recovers to Next from 2 to 1 when CSS hides Previous', async () => {
    const { getByTestId } = render(<Example defaultValue="three" />);
    const previous = getByTestId('previous');
    const next = getByTestId('next');
    const focus = jest.spyOn(next, 'focus');
    await waitFor(() => expect(next).toHaveTextContent('Done'));
    act(() => previous.focus());
    fireEvent.click(previous);
    await waitFor(() => expect(next).toHaveTextContent('Next'));
    expect(previous).toHaveFocus();
    expect(focus).not.toHaveBeenCalled();
    fireEvent.click(previous);
    await waitFor(() => expect(previous).not.toBeVisible());
    expect(next).toHaveFocus();
    expect(focus).toHaveBeenCalledTimes(1);
    await userEvent.tab({ shift: true });
    expect(getByTestId('outside')).toHaveFocus();
  });

  it('retains Next focus, including the final action', async () => {
    const { getByTestId } = render(<Example />);
    const next = getByTestId('next');
    act(() => next.focus());
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(getByTestId('previous')).toBeVisible());
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(next).toHaveTextContent('Done'));
    expect(next).toHaveFocus();
  });

  it.each(['autoFocus', 'callbackRef'])('preserves mount-time focus callbacks from %s', method => {
    const onFocus = jest.fn();
    const nextRef = method === 'callbackRef' ? (element: HTMLButtonElement | null) => element?.focus() : undefined;
    const { getByTestId } = render(
      <Example value="two" next={{ autoFocus: method === 'autoFocus', onFocus }} nextRef={nextRef} />,
    );
    expect(getByTestId('next')).toHaveFocus();
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it.each(['open', 'closed'] as const)('retains and recovers focus inside a %s shadow root', async mode => {
    const { container } = render(<div />);
    const host = container.ownerDocument.createElement('div');
    container.appendChild(host);
    const shadow = host.attachShadow({ mode });
    const mountPoint = container.ownerDocument.createElement('div');
    shadow.appendChild(mountPoint);
    const { getByTestId, rerender, unmount } = render(<Example value="three" hideEmpty={false} />, {
      container: mountPoint,
    });
    const previous = getByTestId('previous');
    const next = getByTestId('next');
    act(() => previous.focus());
    rerender(<Example value="two" hideEmpty={false} />);
    expect(shadow.activeElement).toBe(previous);
    rerender(<Example value="one" hideEmpty={false} previousHidden />);
    await waitFor(() => expect(shadow.activeElement).toBe(next));
    unmount();
  });

  it.each(['open', 'closed'] as const)('does not steal focus from another %s shadow root', async mode => {
    const { getByTestId, rerender, container } = render(<Example value="two" />);
    const host = container.ownerDocument.createElement('div');
    host.tabIndex = 0;
    container.appendChild(host);
    const shadow = host.attachShadow({ mode });
    const outside = container.ownerDocument.createElement('button');
    shadow.appendChild(outside);
    act(() => getByTestId('previous').focus());
    act(() => outside.focus());
    rerender(<Example value="one" />);
    await waitFor(() => expect(getByTestId('previous')).not.toBeVisible());
    expect(shadow.activeElement).toBe(outside);
    act(() => getByTestId('previous').focus());
    act(() => host.focus());
    rerender(<Example value="one" previousHidden />);
    expect(container.ownerDocument.activeElement).toBe(host);
  });

  it('retains a visible programmatically focused button outside the Tab sequence', async () => {
    const { getByTestId } = render(<Example defaultValue="three" previous={{ tabIndex: -1 }} />);
    const previous = getByTestId('previous');
    act(() => previous.focus());
    fireEvent.click(previous);
    await waitFor(() => expect(getByTestId('next')).toHaveTextContent('Next'));
    expect(previous).toBeVisible();
    expect(previous).toHaveFocus();
  });

  it('recovers to a programmatically focusable destination outside the Tab sequence', async () => {
    const { getByTestId } = render(<Example defaultValue="two" next={{ tabIndex: -1 }} />);
    act(() => getByTestId('previous').focus());
    fireEvent.click(getByTestId('previous'));
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('clears ownership when a visible tabIndex=-1 button is explicitly blurred', async () => {
    const { getByTestId, rerender } = render(<Example value="two" previous={{ tabIndex: -1 }} />);
    const previous = getByTestId('previous');
    act(() => previous.focus());
    act(() => previous.blur());
    rerender(<Example value="one" previous={{ tabIndex: -1 }} />);
    await waitFor(() => expect(previous).not.toBeVisible());
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it.each([
    { hidden: true },
    { inert: true },
    { 'aria-hidden': true as const },
    { style: { display: 'none' } },
    { style: { visibility: 'hidden' as const } },
  ])('does not recover to a button with an unavailable ancestor: %p', async wrapperProps => {
    const Pair = ({ hidePrevious = false }: { hidePrevious?: boolean }) => (
      <TeachingPopoverCarousel defaultValue="two">
        <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooterProvider>
          <TeachingPopoverCarouselFooterButton navType="prev" altText={undefined} hidden={hidePrevious}>
            Previous
          </TeachingPopoverCarouselFooterButton>
          <div {...wrapperProps}>
            <TeachingPopoverCarouselFooterButton navType="next" altText="Done" data-testid="pair-next">
              Next
            </TeachingPopoverCarouselFooterButton>
          </div>
        </TeachingPopoverCarouselFooterProvider>
      </TeachingPopoverCarousel>
    );
    const { getByRole, getByTestId, rerender } = render(<Pair />);
    const previous = getByRole('button', { name: 'Previous' });
    const focus = jest.spyOn(getByTestId('pair-next'), 'focus');
    act(() => previous.focus());
    rerender(<Pair hidePrevious />);
    await waitFor(() => expect(previous).not.toBeVisible());
    expect(focus).not.toHaveBeenCalled();
  });

  it('recovers only after a controlled update is accepted', async () => {
    const onValueChange = jest.fn();
    const { getByTestId, rerender } = render(<Example value="two" onValueChange={onValueChange} />);
    const previous = getByTestId('previous');
    act(() => previous.focus());
    await userEvent.keyboard('{Enter}');
    expect(onValueChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ value: 'one' }));
    rerender(<Example value="two" onValueChange={onValueChange} />);
    expect(previous).toHaveFocus();
    expect(previous).toBeVisible();
    rerender(<Example value="one" onValueChange={onValueChange} />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('recovers after a replaced Next callback ref reattaches', async () => {
    const firstRef = jest.fn();
    const replacementRef = jest.fn();
    const { getByTestId, rerender, unmount } = render(<Example value="two" nextRef={firstRef} />);
    act(() => getByTestId('previous').focus());
    rerender(<Example value="one" nextRef={replacementRef} />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
    expect(firstRef).toHaveBeenLastCalledWith(null);
    expect(replacementRef).toHaveBeenLastCalledWith(getByTestId('next'));
    unmount();
    expect(replacementRef).toHaveBeenLastCalledWith(null);
  });

  it('clears ownership after a caller hide/show cycle without a focusable destination', async () => {
    const { getByTestId, rerender } = render(<Example value="two" next={{ disabled: true }} />);
    const previous = getByTestId('previous');
    act(() => previous.focus());
    rerender(<Example value="two" previousHidden next={{ disabled: true }} />);
    act(() => previous.blur());
    rerender(<Example value="two" />);
    const focus = jest.spyOn(getByTestId('next'), 'focus');
    rerender(<Example value="one" />);
    await waitFor(() => expect(previous).not.toBeVisible());
    expect(focus).not.toHaveBeenCalled();
  });

  it.each(['outside', 'next', 'blur'])(
    'does not recover after focus moves to %s before a controlled commit',
    async target => {
      const { getByTestId, rerender } = render(<Example value="two" />);
      const previous = getByTestId('previous');
      act(() => previous.focus());
      fireEvent.click(previous);
      act(() => (target === 'blur' ? previous.blur() : getByTestId(target).focus()));
      const focus = jest.spyOn(getByTestId('next'), 'focus');
      rerender(<Example value="one" />);
      await waitFor(() => expect(previous).not.toBeVisible());
      expect(focus).not.toHaveBeenCalled();
    },
  );

  it.each(['Restart', <svg key="icon" aria-label="Restart" />])(
    'retains a visible boundary action: %p',
    async altText => {
      const { getByTestId, getByRole } = render(<Example defaultValue="two" altText={altText} />);
      const previous = getByTestId('previous');
      act(() => previous.focus());
      fireEvent.click(previous);
      await waitFor(() => expect(getByRole('button', { name: 'Restart' })).toBe(previous));
      expect(previous).toBeVisible();
      expect(previous).toHaveFocus();
    },
  );

  it('does not hide empty content or move focus without consumer hiding', async () => {
    const { getByTestId } = render(<Example defaultValue="two" hideEmpty={false} />);
    const previous = getByTestId('previous');
    act(() => previous.focus());
    fireEvent.click(previous);
    await waitFor(() => expect(previous).toBeEmptyDOMElement());
    expect(previous).toBeVisible();
    expect(previous).toHaveFocus();
  });

  it.each([{ disabled: true }, { hidden: true }, { 'aria-hidden': true as const }, { style: { display: 'none' } }])(
    'does not focus an unavailable destination: %p',
    async next => {
      const { getByTestId } = render(<Example defaultValue="two" next={next} />);
      act(() => getByTestId('previous').focus());
      fireEvent.click(getByTestId('previous'));
      await waitFor(() => expect(getByTestId('previous')).not.toBeVisible());
      expect(getByTestId('next')).not.toHaveFocus();
    },
  );

  it('does not move focus on mount or unmount', async () => {
    const { getByTestId, unmount } = render(<Example />);
    await waitFor(() => expect(getByTestId('previous')).not.toBeVisible());
    const next = getByTestId('next');
    expect(next).not.toHaveFocus();
    act(() => next.focus());
    const focus = jest.spyOn(next, 'focus');
    unmount();
    expect(focus).not.toHaveBeenCalled();
  });
});
