import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import type { TeachingPopoverCarouselProps } from '../TeachingPopoverCarousel/TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from './TeachingPopoverCarouselFooter';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';

type ExampleProps = Pick<TeachingPopoverCarouselProps, 'defaultValue' | 'value' | 'onValueChange'> & {
  previous?: Partial<Extract<React.ComponentProps<typeof TeachingPopoverCarouselFooterButton>, { as?: 'button' }>>;
  next?: Partial<Extract<React.ComponentProps<typeof TeachingPopoverCarouselFooterButton>, { as?: 'button' }>>;
  footerRef?: React.Ref<HTMLDivElement>;
};

const Example = ({ previous, next, footerRef, ...props }: ExampleProps) => {
  const previousProps = {
    navType: 'prev' as const,
    children: 'Previous',
    altText: undefined,
    hideOnBoundary: true,
    'data-testid': 'previous',
    ...previous,
  };
  const nextProps = { navType: 'next' as const, children: 'Next', altText: 'Done', 'data-testid': 'next', ...next };
  return (
    <>
      <button data-testid="outside">Outside</button>
      <TeachingPopoverCarousel defaultValue={props.value === undefined ? 'one' : undefined} {...props}>
        <TeachingPopoverCarouselCard value="one">Page one</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Page two</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="three">Page three</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter ref={footerRef} previous={previousProps} next={nextProps} />
      </TeachingPopoverCarousel>
    </>
  );
};

describe('TeachingPopoverCarouselFooter boundary focus', () => {
  beforeEach(() => {
    // Tabster uses layout to exclude hidden elements; jsdom does not implement layout.
    const { container, unmount } = render(<div />);
    const ownerDocument = container.ownerDocument;
    unmount();
    jest.spyOn(ownerDocument.body, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      right: 100,
      bottom: 100,
      width: 100,
      height: 100,
      toJSON: () => ({}),
    });
    jest
      .spyOn(ownerDocument.defaultView!.HTMLElement.prototype, 'offsetParent', 'get')
      .mockImplementation(function (this: HTMLElement) {
        for (let element: HTMLElement | null = this; element; element = element.parentElement) {
          if (element.hidden || ownerDocument.defaultView!.getComputedStyle(element).display === 'none') {
            return null;
          }
        }
        return ownerDocument.body;
      });
  });

  afterEach(() => jest.restoreAllMocks());

  it('hides the initial previous button without moving focus on mount', async () => {
    const { getByTestId } = render(<Example />);
    await waitFor(() => expect(getByTestId('previous')).not.toBeVisible());
    expect(getByTestId('outside').ownerDocument.activeElement).toBe(getByTestId('outside').ownerDocument.body);
    expect(getByTestId('previous')).toHaveAttribute('hidden');
    expect(getByTestId('next')).toBeVisible();
    expect(getByTestId('previous')).not.toHaveAttribute('hideOnBoundary');
  });

  it('preserves previous focus from 3 to 2, then recovers to next from 2 to 1', async () => {
    const { getByTestId } = render(<Example defaultValue="three" />);
    const previous = getByTestId('previous');
    const next = getByTestId('next');
    const blur = jest.spyOn(previous, 'blur');
    const focus = jest.spyOn(next, 'focus');
    await waitFor(() => expect(next).toHaveTextContent('Done'));
    act(() => previous.focus());
    fireEvent.click(previous);
    await waitFor(() => expect(next).toHaveTextContent('Next'));
    expect(previous).toHaveFocus();
    expect(previous).toBeVisible();
    expect(focus).not.toHaveBeenCalled();
    fireEvent.click(previous);
    await waitFor(() => expect(previous).toHaveAttribute('hidden'));
    expect(next).toHaveFocus();
    expect(focus).toHaveBeenCalledTimes(1);
    expect(blur).not.toHaveBeenCalled();
  });

  it('retains next focus on forward navigation including its final action', async () => {
    const { getByTestId } = render(<Example />);
    const next = getByTestId('next');
    act(() => next.focus());
    fireEvent.click(next);
    await waitFor(() => expect(getByTestId('previous')).toBeVisible());
    expect(next).toHaveFocus();
    fireEvent.click(next);
    await waitFor(() => expect(next).toHaveTextContent('Done'));
    expect(next).toHaveFocus();
    expect(next).toBeVisible();
  });

  it('supports keyboard activation and recovery without extra tab stops', async () => {
    const { getByTestId } = render(<Example />);
    const next = getByTestId('next');
    act(() => next.focus());
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(getByTestId('previous')).toBeVisible());
    await userEvent.tab({ shift: true });
    expect(getByTestId('previous')).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(getByTestId('previous')).toHaveAttribute('hidden'));
    expect(next).toHaveFocus();
  });

  it('symmetrically recovers from a next button explicitly hidden at the final page', async () => {
    const { getByTestId } = render(<Example defaultValue="two" next={{ hideOnBoundary: true }} />);
    const next = getByTestId('next');
    act(() => next.focus());
    fireEvent.click(next);
    await waitFor(() => expect(next).toHaveAttribute('hidden'));
    expect(getByTestId('previous')).toHaveFocus();
  });

  it('recovers only after a controlled parent accepts the requested page', async () => {
    const onValueChange = jest.fn();
    const { getByTestId, rerender } = render(<Example value="two" onValueChange={onValueChange} />);
    const previous = getByTestId('previous');
    act(() => previous.focus());
    fireEvent.click(previous);
    expect(onValueChange).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ value: 'one' }));
    expect(previous).toBeVisible();
    expect(previous).toHaveFocus();
    rerender(<Example value="one" onValueChange={onValueChange} />);
    await waitFor(() => expect(previous).toHaveAttribute('hidden'));
    expect(getByTestId('next')).toHaveFocus();
  });

  it('does not hide or move focus when a controlled parent rejects navigation', async () => {
    const onValueChange = jest.fn();
    const { getByTestId, rerender } = render(<Example value="two" onValueChange={onValueChange} />);
    const previous = getByTestId('previous');
    act(() => previous.focus());
    fireEvent.click(previous);
    rerender(<Example value="two" onValueChange={onValueChange} />);
    expect(previous).toBeVisible();
    expect(previous).toHaveFocus();
    expect(onValueChange).toHaveBeenCalledTimes(1);
  });

  it('supports controlled acceptance and rejection of a next-button boundary', async () => {
    const { getByTestId, rerender } = render(<Example value="two" next={{ hideOnBoundary: true }} />);
    const next = getByTestId('next');
    act(() => next.focus());
    fireEvent.click(next);
    rerender(<Example value="two" next={{ hideOnBoundary: true }} />);
    expect(next).not.toHaveAttribute('hidden');
    expect(next).toHaveFocus();
    rerender(<Example value="three" next={{ hideOnBoundary: true }} />);
    await waitFor(() => expect(next).toHaveAttribute('hidden'));
    expect(getByTestId('previous')).toHaveFocus();
  });

  it('retains focus on a visible boundary action when hiding is not enabled', async () => {
    const { getByTestId } = render(
      <Example defaultValue="two" previous={{ hideOnBoundary: false, altText: 'Restart' }} />,
    );
    const previous = getByTestId('previous');
    act(() => previous.focus());
    fireEvent.click(previous);
    await waitFor(() => expect(previous).toHaveTextContent('Restart'));
    expect(previous).not.toHaveAttribute('hidden');
    expect(previous).toHaveFocus();
  });

  it('recovers focus during an external controlled update only if the hidden button owned focus', async () => {
    const { getByTestId, rerender } = render(<Example value="two" />);
    act(() => getByTestId('previous').focus());
    rerender(<Example value="one" />);
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
  });

  it('does not focus during an external controlled update while focus is outside', async () => {
    const { getByTestId, rerender } = render(<Example value="two" />);
    act(() => getByTestId('outside').focus());
    rerender(<Example value="one" />);
    await waitFor(() => expect(getByTestId('previous')).toHaveAttribute('hidden'));
    expect(getByTestId('outside')).toHaveFocus();
  });

  it.each(['outside', 'next'])('does not steal %s focus after unfocused previous activation', async focused => {
    const { getByTestId } = render(<Example defaultValue="two" />);
    act(() => getByTestId(focused).focus());
    fireEvent.click(getByTestId('previous'));
    await waitFor(() => expect(getByTestId('previous')).toHaveAttribute('hidden'));
    expect(getByTestId(focused)).toHaveFocus();
  });

  it('does not recover stale focus after the user moves away before a controlled commit', async () => {
    const { getByTestId, rerender } = render(<Example value="two" />);
    act(() => getByTestId('previous').focus());
    fireEvent.click(getByTestId('previous'));
    act(() => getByTestId('outside').focus());
    rerender(<Example value="one" />);
    await waitFor(() => expect(getByTestId('previous')).toHaveAttribute('hidden'));
    expect(getByTestId('outside')).toHaveFocus();
  });

  it('does not recover stale focus after an explicit blur before a controlled commit', async () => {
    const { getByTestId, rerender } = render(<Example value="two" />);
    act(() => getByTestId('previous').focus());
    fireEvent.click(getByTestId('previous'));
    act(() => getByTestId('previous').blur());
    rerender(<Example value="one" />);
    await waitFor(() => expect(getByTestId('previous')).toHaveAttribute('hidden'));
    expect(getByTestId('next')).not.toHaveFocus();
  });

  it.each([{ disabled: true }, { hidden: true }, { 'aria-hidden': true as const }, { style: { display: 'none' } }])(
    'does not focus an unavailable recovery target: %p',
    async next => {
      const { getByTestId } = render(<Example defaultValue="two" next={next} />);
      act(() => getByTestId('previous').focus());
      fireEvent.click(getByTestId('previous'));
      await waitFor(() => expect(getByTestId('previous')).toHaveAttribute('hidden'));
      expect(getByTestId('next')).not.toHaveFocus();
    },
  );

  it('forwards footer and button refs and preserves handlers', async () => {
    const footerRef = React.createRef<HTMLDivElement>();
    const previousRef = React.createRef<HTMLButtonElement>();
    const nextRef = jest.fn();
    const onFocus = jest.fn();
    const onBlur = jest.fn();
    const onClick = jest.fn();
    const { getByTestId, unmount } = render(
      <Example
        defaultValue="two"
        footerRef={footerRef}
        previous={{ ref: previousRef, onFocus, onBlur, onClick }}
        next={{ ref: nextRef }}
      />,
    );
    expect(footerRef.current).toContainElement(previousRef.current);
    expect(previousRef.current).toBe(getByTestId('previous'));
    expect(nextRef).toHaveBeenLastCalledWith(getByTestId('next'));
    act(() => getByTestId('previous').focus());
    fireEvent.click(getByTestId('previous'));
    await waitFor(() => expect(getByTestId('next')).toHaveFocus());
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
    unmount();
    expect(footerRef.current).toBeNull();
    expect(previousRef.current).toBeNull();
    expect(nextRef).toHaveBeenLastCalledWith(null);
  });

  it.each([
    { children: undefined, altText: undefined, 'aria-label': 'Previous page' },
    { children: <svg aria-label="Previous icon" />, altText: <svg aria-label="Start icon" /> },
    { children: 'Previous', altText: 'Restart' },
  ])('does not infer availability from content without the opt-in: %p', async previous => {
    const { getByTestId } = render(<Example previous={{ hideOnBoundary: false, ...previous }} />);
    await waitFor(() => expect(getByTestId('next')).toHaveTextContent('Next'));
    expect(getByTestId('previous')).not.toHaveAttribute('hidden');
    expect(getByTestId('previous')).toBeVisible();
  });

  it('hides by explicit policy even when boundary content is meaningful', async () => {
    const { getByTestId } = render(<Example previous={{ altText: 'Restart', 'aria-label': 'Restart tour' }} />);
    await waitFor(() => expect(getByTestId('previous')).toHaveTextContent('Restart'));
    expect(getByTestId('previous')).toHaveAttribute('hidden');
  });

  it('supports an anchor root with forwarded behavior and refs', async () => {
    const previousRef = React.createRef<HTMLAnchorElement>();
    const previousProps = {
      as: 'a' as const,
      href: '#tour',
      ref: previousRef,
      navType: 'prev' as const,
      altText: undefined,
      hideOnBoundary: true,
      children: 'Previous',
    };
    const { getByRole } = render(
      <TeachingPopoverCarousel defaultValue="two">
        <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter
          previous={previousProps}
          next={{ navType: 'next', children: 'Next', altText: 'Done' }}
        />
      </TeachingPopoverCarousel>,
    );
    const previous = getByRole('link', { name: 'Previous' });
    expect(previousRef.current?.tagName).toBe('A');
    act(() => previous.focus());
    fireEvent.click(previous);
    await waitFor(() => expect(previous).toHaveAttribute('hidden'));
    expect(getByRole('button', { name: 'Next' })).toHaveFocus();
  });

  it('works standalone without manufacturing a recovery target', async () => {
    const { getByTestId } = render(
      <TeachingPopoverCarousel defaultValue="two">
        <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooterButton navType="prev" altText={undefined} hideOnBoundary data-testid="previous">
          Previous
        </TeachingPopoverCarouselFooterButton>
      </TeachingPopoverCarousel>,
    );
    act(() => getByTestId('previous').focus());
    fireEvent.click(getByTestId('previous'));
    await waitFor(() => expect(getByTestId('previous')).toHaveAttribute('hidden'));
  });

  it('does not manufacture a previous button when the focused next button becomes hidden', async () => {
    const { getByRole, queryByText } = render(
      <TeachingPopoverCarousel defaultValue="one">
        <TeachingPopoverCarouselCard value="one">One</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselCard value="two">Two</TeachingPopoverCarouselCard>
        <TeachingPopoverCarouselFooter
          next={{ navType: 'next', children: 'Next', altText: undefined, hideOnBoundary: true }}
        />
      </TeachingPopoverCarousel>,
    );
    const next = getByRole('button', { name: 'Next' });
    act(() => next.focus());
    fireEvent.click(next);
    await waitFor(() => expect(next).toHaveAttribute('hidden'));
    expect(queryByText('Previous')).toBeNull();
  });

  it('does not schedule focus recovery after unmount', async () => {
    const { getByTestId, unmount } = render(<Example defaultValue="two" />);
    const next = getByTestId('next');
    const focus = jest.spyOn(next, 'focus');
    act(() => getByTestId('previous').focus());
    unmount();
    await act(async () => undefined);
    expect(focus).not.toHaveBeenCalled();
  });
});
