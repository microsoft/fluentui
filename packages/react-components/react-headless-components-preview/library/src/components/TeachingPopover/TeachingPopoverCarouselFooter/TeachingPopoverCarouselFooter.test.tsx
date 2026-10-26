import * as React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TeachingPopoverCarousel } from '../TeachingPopoverCarousel/TeachingPopoverCarousel';
import type { TeachingPopoverCarouselProps } from '../TeachingPopoverCarousel/TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselCard } from '../TeachingPopoverCarouselCard/TeachingPopoverCarouselCard';
import { TeachingPopoverCarouselFooter } from './TeachingPopoverCarouselFooter';

type ExampleProps = Pick<TeachingPopoverCarouselProps, 'defaultValue' | 'value' | 'onValueChange'> & {
  altText?: React.ReactNode;
  hideEmpty?: boolean;
  next?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  nextRef?: React.Ref<HTMLButtonElement>;
  previousHidden?: boolean;
};

const Example = ({ altText, hideEmpty = true, next, nextRef, previousHidden, ...props }: ExampleProps) => (
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
  beforeEach(() => {
    // Tabster excludes hidden elements using layout, which jsdom does not implement.
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
