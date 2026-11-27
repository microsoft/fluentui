import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { isConformant } from '../../testing/isConformant';
import { Carousel } from './Carousel';
import type { CarouselProps } from './Carousel.types';
import { CarouselViewport } from './CarouselViewport';
import type { CarouselViewportProps } from './CarouselViewport';
import { CarouselCard } from './CarouselCard';
import { CarouselPrevious } from './CarouselPrevious';
import { CarouselNext } from './CarouselNext';
import type { CarouselNextProps } from './CarouselNext';
import { CarouselNav } from './CarouselNav';
import { CarouselNavButton } from './CarouselNavButton';
import { CarouselAutoplayButton } from './CarouselAutoplayButton';
import type { CarouselAutoplayButtonProps } from './CarouselAutoplayButton';
import { useCarouselContext } from './carouselContext';
import { Provider } from '../Provider';

const items = ['A', 'B', 'C', 'D', 'E'];
const selected = () => screen.getByRole('tab', { selected: true });
const runningAnimation = (finished: Promise<unknown>, cancel: () => void): Animation =>
  ({
    finished,
    cancel,
    playState: 'running',
    playbackRate: 1,
    effect: { getComputedTiming: () => ({ endTime: 100 }) },
  } as unknown as Animation);

type ExampleProps = Partial<CarouselProps> & {
  buttons?: boolean;
  nav?: boolean;
  autoplay?: boolean | CarouselAutoplayButtonProps;
  slides?: React.ReactNode[];
  viewport?: CarouselViewportProps;
  next?: CarouselNextProps;
};
const example = ({
  buttons = true,
  nav = true,
  autoplay = false,
  slides = items,
  viewport,
  next,
  ...props
}: ExampleProps = {}) => (
  <Carousel aria-label="Notes" groupSize={2} {...props}>
    {autoplay && <CarouselAutoplayButton {...(typeof autoplay === 'object' ? autoplay : {})} />}
    {buttons && <CarouselPrevious />}
    <CarouselViewport {...viewport}>
      {slides.map((slide, i) => (
        <CarouselCard key={i}>{slide}</CarouselCard>
      ))}
    </CarouselViewport>
    {buttons && <CarouselNext {...next} />}
    {nav && <CarouselNav />}
  </Carousel>
);
const restoreProperties: (() => void)[] = [];
const replaceProperty = (target: object, key: string, value: unknown) => {
  const descriptor = Object.getOwnPropertyDescriptor(target, key);
  Object.defineProperty(target, key, { configurable: true, value, writable: true });
  restoreProperties.push(() => {
    if (descriptor) {
      Object.defineProperty(target, key, descriptor);
    } else {
      Reflect.deleteProperty(target, key);
    }
  });
};

describe('Carousel', () => {
  isConformant({ Component: Carousel, displayName: 'Carousel', requiredProps: { 'aria-label': 'Notes' } });

  afterEach(() => {
    restoreProperties
      .splice(0)
      .reverse()
      .forEach(restore => restore());
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('groups slides, isolates inactive content and links tabs to panels', () => {
    const { container } = render(example());
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    const panel = screen.getByRole('tabpanel');
    expect(panel).toBe(screen.getByRole('tabpanel', { name: 'Page 1 of 3' }));
    expect(selected()).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', selected().id);
    expect(within(panel).getAllByRole('group')).toHaveLength(2);
    const last = container.querySelectorAll('[data-carousel-page]')[2];
    expect(last).toHaveAttribute('hidden');
    expect(last).toHaveAttribute('inert');
    expect(last).toHaveAttribute('aria-hidden', 'true');
    fireEvent.click(screen.getByRole('tab', { name: 'Page 3 of 3' }));
    expect(screen.getByRole('tabpanel')).toBe(last);
    expect(within(last as HTMLElement).getByRole('group', { name: 'Slide 5 of 5' })).toBeVisible();
    expect(last).not.toHaveAttribute('inert');
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
  });

  it('preserves mount-time autofocus and calls the consumer capture handler', () => {
    const onFocusCapture = jest.fn();
    render(example({ slides: [<input key="note" autoFocus aria-label="Note" />], onFocusCapture }));
    expect(screen.getByRole('textbox')).toHaveFocus();
    expect(onFocusCapture).toHaveBeenCalledTimes(1);
  });

  it.each(['disabled', 'disabledFocusable'] as const)('honors %s for directions and playback', restriction => {
    const restricted = { [restriction]: true };
    render(example({ next: { button: restricted }, autoplay: restricted }));
    for (const name of ['Play', 'Next']) {
      const button = screen.getByRole('button', { name });
      if (restriction === 'disabled') {
        expect(button).toBeDisabled();
      } else {
        expect(button).not.toBeDisabled();
        expect(button).toHaveAttribute('aria-disabled', 'true');
        act(() => button.focus());
        expect(button).toHaveFocus();
      }
      fireEvent.click(button);
    }
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    expect(screen.getByRole('region')).not.toHaveAttribute('data-playing');
  });

  it.each([false, { hidden: true }, { inert: true }, { disabled: true }, { disabledFocusable: true }])(
    'stops when playback loses its usable control (%p), requiring a fresh Play',
    autoplay => {
      jest.useFakeTimers();
      const { rerender } = render(example({ autoplay: true }));
      fireEvent.click(screen.getByRole('button', { name: 'Play' }));
      expect(screen.getByRole('region')).toHaveAttribute('data-playing');
      rerender(example({ autoplay }));
      expect(screen.getByRole('region')).not.toHaveAttribute('data-playing');
      rerender(example({ autoplay: true }));
      act(() => jest.advanceTimersByTime(5000));
      expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
      expect(screen.getByRole('button', { name: 'Play' })).toBeVisible();
    },
  );

  it.each([
    <CarouselNav key="hidden" hidden />,
    <CarouselNav key="inert" inert />,
    <CarouselNav key="unavailable" aria-disabled="true" />,
    <CarouselNav key="empty">{false}</CarouselNav>,
    <CarouselNav key="missing">{i => i !== 1 && <CarouselNavButton />}</CarouselNav>,
    <CarouselNav key="disabled">{i => <CarouselNavButton disabled={i === 1} />}</CarouselNav>,
    <CarouselNav key="hidden-tab">{i => <CarouselNavButton hidden={i === 1} />}</CarouselNav>,
    <CarouselNav key="inert-tab">{i => <CarouselNavButton inert={i === 1} />}</CarouselNav>,
  ])('does not count a hidden or incomplete tablist as a route', nav => {
    const tree = (arrows: boolean) => (
      <Carousel aria-label="Notes">
        <CarouselViewport>{items}</CarouselViewport>
        {nav}
        {arrows && <CarouselPrevious />}
        {arrows && <CarouselNext />}
      </Carousel>
    );
    const { rerender } = render(tree(false));
    expect(screen.getAllByRole('group')).toHaveLength(5);
    expect(screen.queryByRole('tablist')).toBeNull();
    rerender(tree(true));
    expect(screen.queryByRole('tablist')).toBeNull();
    expect(screen.queryByRole('tabpanel')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('group', { name: 'Page 2 of 5' })).toBeVisible();
  });

  it.each([
    { hidden: true },
    { inert: true },
    { button: { hidden: true } },
    { button: { inert: true } },
    { button: { disabled: true } },
    { button: { disabledFocusable: true } },
  ])('does not hide slides behind unavailable sequential controls (%p)', next => {
    render(example({ next, nav: false }));
    expect(screen.getAllByRole('group', { name: /^Slide/ })).toHaveLength(items.length);
    expect(screen.getByRole('region')).not.toHaveAttribute('data-paged');
  });

  it('ignores invalid custom selection requests without changing or announcing selection', () => {
    const onActiveIndexChange = jest.fn();
    const Custom = () => {
      const { select } = useCarouselContext();
      return (
        <button onClick={event => [0.5, NaN, -1, Infinity, items.length].forEach(i => select(i, event))}>Custom</button>
      );
    };
    render(
      <Carousel aria-label="Notes" onActiveIndexChange={onActiveIndexChange}>
        <CarouselViewport>{items}</CarouselViewport>
        <CarouselNav />
        <Custom />
      </Carousel>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Custom' }));
    expect(onActiveIndexChange).not.toHaveBeenCalled();
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 5');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('A');
  });

  it.each([true, false])('recovers only a retiring arrow that owns focus on count change (focused: %s)', focused => {
    const { rerender } = render(example({ defaultActiveIndex: 1 }));
    act(() => (focused ? screen.getByRole('button', { name: 'Next' }) : selected()).focus());
    rerender(example({ defaultActiveIndex: 1, slides: items.slice(0, 4) }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 2');
    expect(screen.queryByRole('button', { name: 'Next' })).toBeNull();
    expect(focused ? screen.getByRole('group', { name: 'Slide 3 of 4' }) : selected()).toHaveFocus();
  });

  it('recovers boundary-arrow focus but preserves the activating control otherwise', () => {
    render(example());
    const next = screen.getByRole('button', { name: 'Next' });
    act(() => next.focus());
    fireEvent.click(next);
    expect(next).toHaveFocus();
    fireEvent.click(next);
    expect(screen.getByRole('group', { name: 'Slide 5 of 5' })).toHaveFocus();
    const previous = screen.getByRole('button', { name: 'Previous' });
    act(() => previous.focus());
    fireEvent.click(previous);
    expect(previous).toHaveFocus();
    fireEvent.click(previous);
    expect(screen.getByRole('group', { name: 'Slide 1 of 5' })).toHaveFocus();
  });

  it.each(['ltr', 'rtl'] as const)('handles nav direction, Home and End in %s', dir => {
    render(example({ dir }));
    act(() => selected().focus());
    fireEvent.keyDown(selected(), { key: dir === 'ltr' ? 'ArrowRight' : 'ArrowLeft' });
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    expect(selected()).toHaveFocus();
    fireEvent.keyDown(selected(), { key: 'End' });
    expect(selected()).toHaveAttribute('aria-label', 'Page 3 of 3');
    fireEvent.keyDown(selected(), { key: 'Home' });
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    expect(screen.getAllByRole('tab').filter(tab => tab.tabIndex === 0)).toEqual([selected()]);
  });

  it('does not intercept embedded input keys or Previous/Next button direction keys', () => {
    const keydown = jest.fn();
    render(
      example({
        groupSize: 1,
        onKeyDown: keydown,
        slides: [<input key="i" aria-label="Note" />, <button key="b">More</button>],
      }),
    );
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'ArrowRight' });
    fireEvent.keyDown(screen.getByRole('button', { name: 'Next' }), { key: 'End' });
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 2');
    expect(keydown.mock.calls.every(([event]) => !event.defaultPrevented)).toBe(true);
  });

  it('preserves controlled selection until the owner accepts a change', () => {
    const onActiveIndexChange = jest.fn();
    const { rerender } = render(example({ activeIndex: 0, onActiveIndexChange }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(onActiveIndexChange).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ index: 1, reason: 'next' }),
    );
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    rerender(example({ activeIndex: 1, onActiveIndexChange }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
  });

  it('wraps only when circular, retaining both Previous and Next buttons', () => {
    render(example({ circular: true }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 3 of 3');
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
  });

  it('handles empty, single-group and static collections without controls or playback', () => {
    const { rerender } = render(example({ autoplay: true, slides: [] }));
    expect(screen.getByRole('region')).toBeEmptyDOMElement();
    rerender(example({ autoplay: true, slides: ['One'] }));
    expect(screen.queryByRole('button')).toBeNull();
    const viewportProps = { className: 'viewport', 'data-nav': '' };
    rerender(example({ buttons: false, nav: false, autoplay: true, viewport: viewportProps }));
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByRole('tab')).toBeNull();
    expect(screen.getAllByRole('group', { name: /^Slide/ })).toHaveLength(5);
    expect(screen.getByRole('region').firstElementChild).not.toHaveAttribute('data-nav');
  });

  it('allows the buttons and nav to be omitted independently', () => {
    const { rerender } = render(example({ nav: false }));
    expect(screen.queryByRole('tablist')).toBeNull();
    expect(screen.getByRole('group', { name: 'Page 1 of 3' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByRole('group', { name: 'Page 2 of 3' })).toBeVisible();
    rerender(example({ buttons: false }));
    expect(screen.queryByRole('button')).toBeNull();
    fireEvent.click(screen.getByRole('tab', { name: 'Page 3 of 3' }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 3 of 3');
  });

  it('clamps selection after removing groups and keeps separate carousel IDs', () => {
    const { rerender } = render(example({ defaultActiveIndex: 2 }));
    rerender(example({ slides: ['Only'] }));
    expect(screen.getByRole('group', { name: 'Slide 1 of 1' })).toBeVisible();
    rerender(
      <>
        {example()}
        {example({ 'aria-label': 'Other', groupSize: 1, slides: ['X', 'Y'] })}
      </>,
    );
    const tabs = screen.getAllByRole('tab');
    expect(new Set(tabs.map(tab => tab.id)).size).toBe(tabs.length);
    tabs.forEach(tab => expect(tab.ownerDocument.getElementById(tab.getAttribute('aria-controls')!)).not.toBeNull());
  });

  it('starts playback only on Play, suspends on hover and stops for interaction', () => {
    jest.useFakeTimers();
    render(example({ autoplay: true, circular: true, autoplayInterval: 1000 }));
    act(() => jest.advanceTimersByTime(5000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    // Entering on Play doesn't suspend the rotation it starts.
    fireEvent.pointerOver(screen.getByRole('button', { name: 'Play' }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-live', 'off');
    act(() => jest.advanceTimersByTime(1000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    fireEvent.pointerOver(screen.getByRole('tabpanel'));
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    // Moving from a slide onto Pause, without leaving the carousel, keeps the suspension.
    fireEvent.pointerOver(screen.getByRole('button', { name: 'Pause' }));
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    fireEvent.pointerLeave(screen.getByRole('region'));
    act(() => jest.advanceTimersByTime(999));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    act(() => jest.advanceTimersByTime(1));
    expect(selected()).toHaveAttribute('aria-label', 'Page 3 of 3');
    fireEvent.keyDown(selected(), { key: 'Home' });
    expect(screen.getByRole('button', { name: 'Play' })).toBeVisible();
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-live', 'polite');
    act(() => jest.advanceTimersByTime(5000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
  });

  it('stops non-circular playback at the end and Play restarts at the first group', () => {
    jest.useFakeTimers();
    render(example({ autoplay: true, autoplayInterval: 1000 }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    act(() => jest.advanceTimersByTime(1000));
    act(() => jest.advanceTimersByTime(1000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 3 of 3');
    expect(screen.getByRole('button', { name: 'Play' })).toBeVisible();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    act(() => jest.advanceTimersByTime(999));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    act(() => jest.advanceTimersByTime(1));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
  });

  it('defers announcements and boundary focus, cancels interrupted animation and releases it on unmount', async () => {
    const resolvers: (() => void)[] = [];
    const animations: Animation[] = [];
    const transition = jest.fn(() => {
      const animation = runningAnimation(
        new Promise<void>(resolve => {
          resolvers.push(resolve);
        }),
        jest.fn(),
      );
      animations.push(animation);
      return [animation];
    });
    const { container, unmount } = render(example({ transition }));
    const next = screen.getByRole('button', { name: 'Next' });
    act(() => next.focus());
    fireEvent.click(next);
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-busy', 'true');
    expect(container.querySelector('[data-outgoing]')).toHaveAttribute('inert');
    fireEvent.click(next);
    expect(animations[0].cancel).toHaveBeenCalled();
    expect(next).toHaveAttribute('aria-disabled', 'true');
    expect(next).toHaveFocus();
    await act(async () => resolvers[1]());
    expect(screen.getByRole('group', { name: 'Slide 5 of 5' })).toHaveFocus();
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-busy', 'false');
    expect(container.querySelector('[data-outgoing]')).toBeNull();
    fireEvent.click(selected());
    expect(transition).toHaveBeenCalledTimes(2);
    const previous = screen.getByRole('button', { name: 'Previous' });
    act(() => previous.focus());
    fireEvent.click(previous);
    unmount();
    expect(animations[2].cancel).toHaveBeenCalled();
  });

  it('settles motion immediately on entry into a slide', () => {
    const cancel = jest.fn();
    const transition = jest.fn(() => [runningAnimation(new Promise(jest.fn()), cancel)]);
    render(example({ transition }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    const slide = screen.getByRole('group', { name: 'Slide 3 of 5' });
    act(() => slide.focus());
    expect(cancel).toHaveBeenCalled();
    expect(slide).toHaveFocus();
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-busy', 'false');
  });

  it('honors consumer cancellation and preserves authoritative state attributes', () => {
    const next = { onClick: (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault() };
    const rootProps = { 'data-playing': '', 'data-circular': '' } as Partial<CarouselProps>;
    render(example({ ...rootProps, groupSize: 1, next: { button: next } }));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 5');
    expect(screen.getByRole('region')).not.toHaveAttribute('data-playing');
    expect(screen.getByRole('region')).not.toHaveAttribute('data-circular');
  });

  it('settles and stops for reduced motion, never resuming without another Play', () => {
    jest.useFakeTimers();
    const host = render(<div />);
    const win = host.container.ownerDocument.defaultView!;
    host.unmount();
    const listeners = new Set<() => void>();
    const media = {
      matches: false,
      addEventListener: (_: string, listener: () => void) => listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) => listeners.delete(listener),
    };
    replaceProperty(win, 'matchMedia', () => media);
    const cancel = jest.fn();
    const transition = () => [runningAnimation(new Promise(jest.fn()), cancel)];
    const { unmount } = render(example({ autoplay: true, circular: true, autoplayInterval: 1000, transition }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-busy', 'true');
    act(() => {
      media.matches = true;
      listeners.forEach(listener => listener());
    });
    expect(cancel).toHaveBeenCalled();
    const unavailable = screen.getByRole('button', { name: 'Autoplay unavailable with reduced motion' });
    expect(unavailable).toHaveAttribute('aria-disabled', 'true');
    expect(unavailable.tabIndex).toBe(0);
    expect(unavailable).not.toHaveAttribute('aria-pressed');
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-busy', 'false');
    act(() => {
      media.matches = false;
      listeners.forEach(listener => listener());
    });
    expect(screen.getByRole('button', { name: 'Play' })).toBeVisible();
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    unmount();
    expect(listeners.size).toBe(0);
  });

  it('suspends offscreen/background timers, resumes with a fresh interval and cleans up', () => {
    jest.useFakeTimers();
    const host = render(<div />);
    const doc = host.container.ownerDocument;
    const win = doc.defaultView!;
    host.unmount();
    let notify: (entries: { target: Element; isIntersecting: boolean }[]) => void = jest.fn();
    const disconnect = jest.fn();
    replaceProperty(
      win,
      'IntersectionObserver',
      jest.fn(callback => {
        let observesCarousel = false;
        return {
          observe: jest.fn((element: Element) => {
            if (element.getAttribute('role') === 'region' && element.getAttribute('aria-label') === 'Notes') {
              observesCarousel = true;
              notify = callback;
            }
          }),
          disconnect: () => {
            if (observesCarousel) {
              disconnect();
            }
          },
        };
      }),
    );
    replaceProperty(doc, 'hidden', false);
    const { unmount } = render(example({ autoplay: true, circular: true, autoplayInterval: 1000 }));
    const unrelatedObserver = new win.IntersectionObserver(() => undefined);
    unrelatedObserver.observe(doc.body);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    const target = screen.getByRole('region');
    act(() =>
      notify([
        { target, isIntersecting: true },
        { target, isIntersecting: false },
      ]),
    );
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    act(() => notify([{ target, isIntersecting: true }]));
    act(() => jest.advanceTimersByTime(500));
    replaceProperty(doc, 'hidden', true);
    fireEvent(doc, new win.Event('visibilitychange'));
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    replaceProperty(doc, 'hidden', false);
    fireEvent(doc, new win.Event('visibilitychange'));
    act(() => jest.advanceTimersByTime(999));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    act(() => jest.advanceTimersByTime(1));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    act(() => notify([{ target, isIntersecting: false }]));
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('renders the CarouselNav template once per group and names arrows through aria-label', () => {
    const wrapperRef = React.createRef<HTMLDivElement>();
    const buttonRef = React.createRef<HTMLButtonElement>();
    render(
      <Carousel aria-label="Notes" groupSize={2}>
        <CarouselPrevious />
        <CarouselViewport>
          {items.map(item => (
            <CarouselCard key={item}>{item}</CarouselCard>
          ))}
        </CarouselViewport>
        <CarouselNext
          ref={wrapperRef}
          data-carousel-button="previous"
          button={{ ref: buttonRef, 'aria-label': 'Suivant' }}
        />
        <CarouselNav aria-label="Pages">
          <CarouselNavButton className="dot" indicator={{ className: 'mark' }} />
        </CarouselNav>
      </Carousel>,
    );
    const tabs = within(screen.getByRole('tablist', { name: 'Pages' })).getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    tabs.forEach(tab => {
      expect(tab).toHaveClass('dot');
      expect(tab.querySelector('.mark')).toHaveAttribute('aria-hidden', 'true');
    });
    expect(tabs[0]).toHaveAttribute('data-selected');
    const next = screen.getByRole('button', { name: 'Suivant' });
    expect(buttonRef.current).toBe(next);
    expect(wrapperRef.current).toBe(next.parentElement);
    expect(wrapperRef.current).toHaveAttribute('data-carousel-button', 'next');
    expect(next).toHaveAttribute('aria-controls', screen.getByRole('tabpanel').parentElement!.id);
    expect(next).not.toHaveAttribute('aria-labelledby');
    // At the first group the previous slot stays in layout but is hidden and inert.
    const previousSlot = document.querySelector('[data-carousel-button="previous"]');
    expect(previousSlot).toHaveAttribute('hidden');
    expect(previousSlot).toHaveAttribute('inert');
    expect(previousSlot).toBeEmptyDOMElement();
  });

  it('calls a CarouselNav render function once per group with its index', () => {
    const renderNavButton = jest.fn((index: number) => <CarouselNavButton data-index={index} />);
    render(
      <Carousel aria-label="Notes" groupSize={2}>
        <CarouselViewport>
          {items.map(item => (
            <CarouselCard key={item}>{item}</CarouselCard>
          ))}
        </CarouselViewport>
        <CarouselNav>{renderNavButton}</CarouselNav>
      </Carousel>,
    );
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map(tab => tab.getAttribute('data-index'))).toEqual(['0', '1', '2']);
    expect(tabs.map(tab => tab.getAttribute('aria-label'))).toEqual(['Page 1 of 3', 'Page 2 of 3', 'Page 3 of 3']);
    expect(renderNavButton).toHaveBeenCalledWith(2);
  });

  it('starts paged at the default group without replaying motion when parts register', () => {
    const transition = jest.fn(() => []);
    render(example({ defaultActiveIndex: 2, transition }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 3 of 3');
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-busy', 'false');
    expect(transition).not.toHaveBeenCalled();
  });

  it('labels slides with the full total in the server render', () => {
    const html = renderToString(example({ groupSize: 1 }));
    items.forEach((_, i) => expect(html).toContain(`aria-label="Slide ${i + 1} of 5"`));
  });

  it('calls consumer focus, blur and pointer callbacks on the arrow buttons once', () => {
    const button = { onFocus: jest.fn(), onBlur: jest.fn(), onPointerEnter: jest.fn(), onPointerLeave: jest.fn() };
    render(example({ next: { button } }));
    const next = screen.getByRole('button', { name: 'Next' });
    fireEvent.pointerEnter(next);
    fireEvent.pointerLeave(next);
    act(() => next.focus());
    act(() => next.blur());
    Object.values(button).forEach(callback => expect(callback).toHaveBeenCalledTimes(1));
  });

  it.each(['previous', 'next'] as const)('keeps the collection static with only a non-circular %s arrow', kind => {
    const arrow = kind === 'previous' ? <CarouselPrevious /> : <CarouselNext />;
    const carousel = (circular: boolean) => (
      <Carousel aria-label="Notes" groupSize={2} circular={circular}>
        {kind === 'previous' && arrow}
        <CarouselViewport>
          {items.map(item => (
            <CarouselCard key={item}>{item}</CarouselCard>
          ))}
        </CarouselViewport>
        {kind === 'next' && arrow}
      </Carousel>
    );
    const { rerender } = render(carousel(false));
    expect(screen.getByRole('region')).not.toHaveAttribute('data-paged');
    expect(screen.queryByRole('button')).toBeNull();
    screen.getAllByRole('group', { name: /^Slide/ }).forEach(slide => expect(slide).toBeVisible());
    // Wrapping lets one arrow reach every group.
    rerender(carousel(true));
    expect(screen.getByRole('region')).toHaveAttribute('data-paged');
    const button = screen.getByRole('button', { name: kind === 'previous' ? 'Previous' : 'Next' });
    fireEvent.click(button);
    expect(screen.getByRole('group', { name: kind === 'previous' ? 'Page 3 of 3' : 'Page 2 of 3' })).toBeVisible();
  });

  it('moves nav keys from the focused tab when a controlled owner ignores changes', () => {
    const onActiveIndexChange = jest.fn();
    render(example({ activeIndex: 0, onActiveIndexChange }));
    const tabs = screen.getAllByRole('tab');
    act(() => tabs[0].focus());
    fireEvent.keyDown(tabs[0], { key: 'ArrowRight' });
    expect(tabs[1]).toHaveFocus();
    fireEvent.keyDown(tabs[1], { key: 'ArrowRight' });
    expect(tabs[2]).toHaveFocus();
    expect(onActiveIndexChange.mock.calls.map(([, data]) => data.index)).toEqual([1, 2]);
    expect(selected()).toBe(tabs[0]);
  });

  it('keeps autoplay requesting when a controlled owner declines a change', () => {
    jest.useFakeTimers();
    const onActiveIndexChange = jest.fn();
    render(example({ autoplay: true, circular: true, autoplayInterval: 1000, activeIndex: 0, onActiveIndexChange }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    act(() => jest.advanceTimersByTime(1000));
    expect(onActiveIndexChange).toHaveBeenCalledTimes(1);
    act(() => jest.advanceTimersByTime(1000));
    expect(onActiveIndexChange).toHaveBeenCalledTimes(2);
    expect(onActiveIndexChange.mock.calls.every(([, data]) => data.index === 1 && data.reason === 'autoplay')).toBe(
      true,
    );
    expect(screen.getByRole('button', { name: 'Pause' })).toBeVisible();
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
  });

  it('recovers boundary-arrow focus inside a shadow root', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    shadowRoot.appendChild(container);
    const { unmount } = render(example(), { container });
    // Accessible names via aria-labelledby don't resolve inside a shadow root in jsdom; query by attribute.
    const next = container.querySelector<HTMLElement>('[data-carousel-action="next"]')!;
    act(() => next.focus());
    fireEvent.click(next);
    expect(shadowRoot.activeElement).toBe(next);
    fireEvent.click(next);
    expect(shadowRoot.activeElement).toBe(container.querySelector('[aria-label="Slide 5 of 5"]'));
    unmount();
    host.remove();
  });

  it('ignores focus in another carousel when recovering boundary focus', () => {
    jest.useFakeTimers();
    render(
      <>
        {example({ autoplay: true, autoplayInterval: 1000 })}
        {example({ 'aria-label': 'Other' })}
      </>,
    );
    const [, otherRegion] = screen.getAllByRole('region');
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    const otherNext = within(otherRegion).getByRole('button', { name: 'Next' });
    act(() => otherNext.focus());
    act(() => jest.advanceTimersByTime(1000));
    act(() => jest.advanceTimersByTime(1000));
    expect(screen.getAllByRole('tab', { selected: true })[0]).toHaveAttribute('aria-label', 'Page 3 of 3');
    expect(otherNext).toHaveFocus();
  });

  describe('with a nested carousel', () => {
    // The inner carousel has two groups and the outer three, so their selected tabs are told apart by label.
    const inner = (props: ExampleProps = {}) => example({ 'aria-label': 'Inner', slides: items.slice(0, 4), ...props });
    const nested = (props: Partial<CarouselProps> = {}, header?: React.ReactNode) => (
      <Carousel aria-label="Outer" circular autoplayInterval={1000} {...props}>
        <CarouselAutoplayButton />
        {header}
        <CarouselPrevious />
        <CarouselViewport>
          <CarouselCard>{inner({ autoplay: true })}</CarouselCard>
          <CarouselCard>Two</CarouselCard>
          <CarouselCard>Three</CarouselCard>
        </CarouselViewport>
        <CarouselNext />
        <CarouselNav />
      </Carousel>
    );
    const outerSelected = () =>
      screen.getAllByRole('tab', { selected: true }).find(tab => tab.getAttribute('aria-label')?.endsWith('of 3'));
    const outerPause = () => screen.getByRole('button', { name: 'Pause' });
    // Document order: the outer Play comes before the one inside its first slide.
    const outerPlay = () => screen.getAllByRole('button', { name: 'Play' })[0];
    const innerPlay = () => screen.getAllByRole('button', { name: 'Play' }).at(-1)!;

    it('treats the inner playback control as content: hover suspends the outer rotation', () => {
      jest.useFakeTimers();
      render(nested());
      fireEvent.click(outerPlay());
      expect(innerPlay()).not.toBe(outerPause());
      // The outer carousel's own Pause stays exempt from suspension and interruption.
      fireEvent.pointerOver(outerPause());
      act(() => outerPause().focus());
      fireEvent.keyDown(outerPause(), { key: 'Tab' });
      act(() => jest.advanceTimersByTime(1000));
      expect(outerSelected()).toHaveAttribute('aria-label', 'Page 2 of 3');
      fireEvent.click(screen.getByRole('tab', { name: 'Page 1 of 3' }));
      fireEvent.click(outerPlay());
      fireEvent.pointerOver(innerPlay());
      act(() => jest.advanceTimersByTime(3000));
      expect(outerSelected()).toHaveAttribute('aria-label', 'Page 1 of 3');
      expect(outerPause()).toBeVisible();
      fireEvent.pointerLeave(screen.getByRole('region', { name: 'Outer' }));
      act(() => jest.advanceTimersByTime(1000));
      expect(outerSelected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    });

    // jsdom doesn't deliver pointerdown to React; the Cypress suite covers pointer activation.
    it.each(['focus', 'keyDown'] as const)(
      'treats the inner playback control as content: %s stops the outer rotation',
      interaction => {
        jest.useFakeTimers();
        render(nested());
        fireEvent.click(outerPlay());
        expect(outerPause()).toBeVisible();
        const target = innerPlay();
        if (interaction === 'focus') {
          act(() => target.focus());
        } else {
          fireEvent.keyDown(target, { key: 'Enter' });
        }
        expect(screen.queryByRole('button', { name: 'Pause' })).toBeNull();
        act(() => jest.advanceTimersByTime(5000));
        expect(outerSelected()).toHaveAttribute('aria-label', 'Page 1 of 3');
      },
    );

    it("doesn't take a nested carousel's Next button as its own boundary anchor", () => {
      // A nested carousel outside the outer viewport, but inside its root.
      const header = inner({ nav: false });
      const { rerender } = render(nested({ circular: false, activeIndex: 0 }, header));
      const innerNext = screen.getAllByRole('button', { name: 'Next' })[0];
      act(() => innerNext.focus());
      rerender(nested({ circular: false, activeIndex: 2 }, header));
      expect(outerSelected()).toHaveAttribute('aria-label', 'Page 3 of 3');
      expect(innerNext).toHaveFocus();
    });
  });

  describe('with render-callback controls that rewrite aria-controls but forward the ref', () => {
    const rewrite = (Component: React.ElementType, props: object) => <Component {...props} aria-controls="elsewhere" />;

    it('keeps its own playback control exempt', () => {
      jest.useFakeTimers();
      render(example({ autoplay: { children: rewrite }, circular: true, autoplayInterval: 1000 }));
      fireEvent.click(screen.getByRole('button', { name: 'Play' }));
      const pause = screen.getByRole('button', { name: 'Pause' });
      expect(pause).toHaveAttribute('aria-controls', 'elsewhere');
      fireEvent.pointerOver(pause);
      act(() => pause.focus());
      fireEvent.keyDown(pause, { key: 'Tab' });
      expect(screen.getByRole('button', { name: 'Pause' })).toBe(pause);
      act(() => jest.advanceTimersByTime(1000));
      expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    });

    it('keeps its own Next button as the boundary focus anchor through motion', async () => {
      const resolvers: (() => void)[] = [];
      const transition = jest.fn(() => [
        runningAnimation(
          new Promise<void>(resolve => {
            resolvers.push(resolve);
          }),
          jest.fn(),
        ),
      ]);
      render(example({ next: { button: { children: rewrite } }, defaultActiveIndex: 1, transition }));
      const next = document.querySelector<HTMLElement>('[data-carousel-action="next"]')!;
      expect(next).toHaveAttribute('aria-controls', 'elsewhere');
      act(() => next.focus());
      fireEvent.click(next);
      // The anchor stays focused and shown until the motion settles, then focus recovers into the last group.
      expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-busy', 'true');
      expect(next).toHaveFocus();
      await act(async () => resolvers[0]());
      expect(screen.getByRole('group', { name: 'Slide 5 of 5' })).toHaveFocus();
    });
  });

  it('uses the computed direction instead of writing one, mirroring nav keys and transitions', () => {
    // jsdom doesn't inherit `direction`; Carousel.cy.tsx covers an inherited `dir="rtl"` in a real browser.
    const transition = jest.fn(() => []);
    render(example({ transition, style: { direction: 'rtl' } }));
    expect(screen.getByRole('region')).not.toHaveAttribute('dir');
    act(() => selected().focus());
    fireEvent.keyDown(selected(), { key: 'ArrowLeft' });
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    fireEvent.keyDown(selected(), { key: 'ArrowRight' });
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    expect(transition).toHaveBeenLastCalledWith(expect.objectContaining({ dir: 'rtl' }));
  });

  it('keeps a running transition when an inline adapter is re-created', async () => {
    let resolve = () => undefined as void;
    const cancel = jest.fn();
    const calls = jest.fn();
    const view = (label: string) =>
      example({
        'aria-label': label,
        transition: () => {
          calls();
          const finished = new Promise<void>(done => {
            resolve = done;
          });
          return [runningAnimation(finished, cancel)];
        },
      });
    const { rerender } = render(view('Notes'));
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    rerender(view('Notes again'));
    expect(calls).toHaveBeenCalledTimes(1);
    expect(cancel).not.toHaveBeenCalled();
    await act(async () => resolve());
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-busy', 'false');
  });

  it('keeps a finished transition filled until the outgoing group is hidden', async () => {
    let resolve = () => undefined as void;
    const outgoingAtCancel: Array<Element | null> = [];
    const { container } = render(
      example({
        transition: () => [
          runningAnimation(
            new Promise<void>(done => {
              resolve = done;
            }),
            () => outgoingAtCancel.push(container.querySelector('[data-outgoing]')),
          ),
        ],
      }),
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    await act(async () => resolve());
    // Canceling while the outgoing group is still shown would repaint it at full opacity for a frame.
    expect(outgoingAtCancel).toEqual([null]);
  });

  it('does not announce a static collection', () => {
    const { rerender } = render(example({ buttons: false, nav: false }));
    const viewport = screen.getByRole('region').firstElementChild!;
    expect(viewport).toHaveAttribute('aria-live', 'off');
    expect(viewport).not.toHaveAttribute('aria-atomic');
    rerender(example());
    expect(viewport).toHaveAttribute('aria-live', 'polite');
    expect(viewport).toHaveAttribute('aria-atomic', 'true');
  });

  it.each([true, false])('recovers boundary focus into plain slides (tabbable content: %s)', tabbable => {
    render(
      <Carousel aria-label="Notes" groupSize={2}>
        <CarouselPrevious />
        <CarouselViewport>
          {items.map(item => (
            <div key={item}>{tabbable ? <button>Open {item}</button> : item}</div>
          ))}
        </CarouselViewport>
        <CarouselNext />
      </Carousel>,
    );
    const next = screen.getByRole('button', { name: 'Next' });
    if (tabbable) {
      // jsdom has no layout. Supply the visibility measurements used by the shared focus finder.
      const button = screen.getByText('Open E');
      replaceProperty(button, 'offsetParent', button.parentElement);
      jest
        .spyOn(button.ownerDocument.body, 'getBoundingClientRect')
        .mockReturnValue({ width: 100, height: 100 } as DOMRect);
    }
    act(() => next.focus());
    fireEvent.click(next);
    fireEvent.click(next);
    if (tabbable) {
      expect(screen.getByRole('button', { name: 'Open E' })).toHaveFocus();
    } else {
      const page = screen.getByRole('group', { name: 'Page 3 of 3' });
      expect(page).toHaveFocus();
      expect(page).toHaveAttribute('tabindex', '-1');
      act(() => screen.getByRole('button', { name: 'Previous' }).focus());
      expect(page).not.toHaveAttribute('tabindex');
    }
  });

  it('prefers the computed direction over a Provider direction the DOM does not reflect', () => {
    const transition = jest.fn(() => []);
    render(<Provider dir="rtl">{example({ transition, style: { direction: 'ltr' } })}</Provider>);
    act(() => selected().focus());
    fireEvent.keyDown(selected(), { key: 'ArrowRight' });
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    expect(transition).toHaveBeenLastCalledWith(expect.objectContaining({ dir: 'ltr' }));
  });

  it('keeps non-circular playback requesting while an owner declines the last group', () => {
    jest.useFakeTimers();
    const onActiveIndexChange = jest.fn();
    render(example({ autoplay: true, autoplayInterval: 1000, activeIndex: 1, onActiveIndexChange }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    act(() => jest.advanceTimersByTime(1000));
    expect(onActiveIndexChange).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Pause' })).toBeVisible();
    act(() => jest.advanceTimersByTime(1000));
    expect(onActiveIndexChange).toHaveBeenCalledTimes(2);
    expect(onActiveIndexChange.mock.calls.every(([, data]) => data.index === 2)).toBe(true);
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
  });

  it('keeps a nav-only session when adding a page with its operable tab in the same commit', () => {
    jest.useFakeTimers();
    const props = { buttons: false, autoplay: true, autoplayInterval: 1000, defaultActiveIndex: 1 };
    const { rerender } = render(example(props));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    rerender(example({ ...props, slides: [...items, 'F', 'G'] }));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 4');
    expect(screen.getByRole('button', { name: 'Pause' })).toBeVisible();
    act(() => jest.advanceTimersByTime(1000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 3 of 4');
  });

  it('retries a controlled restart until accepted, then waits a full interval', () => {
    jest.useFakeTimers();
    const onActiveIndexChange = jest.fn();
    const props = { autoplay: true, autoplayInterval: 1000, onActiveIndexChange };
    const { rerender } = render(example({ ...props, activeIndex: 2 }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    act(() => jest.advanceTimersByTime(1000));
    expect(onActiveIndexChange.mock.calls.map(([, data]) => data.index)).toEqual([0, 0]);
    act(() => jest.advanceTimersByTime(500));
    rerender(example({ ...props, activeIndex: 0 }));
    act(() => jest.advanceTimersByTime(999));
    expect(onActiveIndexChange).toHaveBeenCalledTimes(2);
    act(() => jest.advanceTimersByTime(1));
    expect(onActiveIndexChange.mock.calls.map(([, data]) => data.index)).toEqual([0, 0, 1]);
  });

  it('makes only a tab panel without its own focus stop a tab stop, tracking slide content', async () => {
    const Toggle = () => {
      const [action, setAction] = React.useState(false);
      return action ? <button>Act</button> : <span onClick={() => setAction(true)}>Plain</span>;
    };
    const markup = renderToString(
      <Carousel aria-label="Notes">
        <CarouselViewport>{['First', 'Second']}</CarouselViewport>
        <CarouselNav />
      </Carousel>,
    );
    expect(markup).not.toContain('tabindex="0"');
    const { rerender } = render(
      <Carousel aria-label="Notes">
        <CarouselViewport>
          <Toggle />
          {'Second'}
        </CarouselViewport>
        <CarouselNav />
      </Carousel>,
    );
    const panels = () => Array.from(document.querySelectorAll('[data-carousel-page]'));
    expect(panels().map(panel => panel.getAttribute('tabindex'))).toEqual(['0', '0']);
    await act(async () => fireEvent.click(screen.getByText('Plain')));
    expect(panels().map(panel => panel.getAttribute('tabindex'))).toEqual([null, '0']);
    rerender(example());
    expect(panels().every(panel => !panel.hasAttribute('tabindex'))).toBe(true);
    rerender(example({ nav: false, slides: ['A', 'B'] }));
    expect(panels().every(panel => !panel.hasAttribute('tabindex'))).toBe(true);
  });

  it('moves focus to the selected tab when the focused tab is removed from a nav that stays complete', () => {
    const Collection = ({ count }: { count: number }) => (
      <Carousel aria-label="Notes" defaultActiveIndex={2}>
        <CarouselViewport>
          {['First', 'Second', 'Third'].slice(0, count).map(text => (
            <CarouselCard key={text}>{text}</CarouselCard>
          ))}
        </CarouselViewport>
        <CarouselNav />
      </Carousel>
    );
    const { rerender } = render(<Collection count={3} />);
    act(() => screen.getAllByRole('tab')[2].focus());
    rerender(<Collection count={2} />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(2);
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[1]).toHaveFocus();
  });

  it('leaves outside focus alone when a tab is removed from a nav that stays complete', () => {
    const Collection = ({ count }: { count: number }) => (
      <>
        <button>Outside</button>
        <Carousel aria-label="Notes" defaultActiveIndex={2}>
          <CarouselViewport>
            {['First', 'Second', 'Third'].slice(0, count).map(text => (
              <CarouselCard key={text}>{text}</CarouselCard>
            ))}
          </CarouselViewport>
          <CarouselNav />
        </Carousel>
      </>
    );
    const { rerender } = render(<Collection count={3} />);
    act(() => screen.getAllByRole('tab')[2].focus());
    act(() => screen.getByText('Outside').focus());
    rerender(<Collection count={2} />);
    expect(screen.getByText('Outside')).toHaveFocus();
  });

  it('remeasures panel focus stops when an ancestor class or a fieldset legend changes', async () => {
    const { container } = render(
      <div id="host">
        <style>{'.compact #action { display: none; }'}</style>
        <Carousel aria-label="Notes">
          <fieldset disabled>
            <legend>
              <CarouselViewport>
                <button id="action">Act</button>
                <button>Other</button>
              </CarouselViewport>
            </legend>
          </fieldset>
          <CarouselNav />
        </Carousel>
      </div>,
    );
    const panels = () => Array.from(document.querySelectorAll('[data-carousel-page]'));
    await act(async () => undefined);
    expect(panels()[0]).not.toHaveAttribute('tabindex');
    await act(async () => container.querySelector('#host')!.classList.add('compact'));
    expect(panels()[0]).toHaveAttribute('tabindex', '0');
    await act(async () => container.querySelector('#host')!.classList.remove('compact'));
    expect(panels()[0]).not.toHaveAttribute('tabindex');
    // A new first legend leaves the carousel's legend disabled by the fieldset.
    await act(async () => {
      const fieldset = container.querySelector('fieldset')!;
      fieldset.insertBefore(document.createElement('legend'), fieldset.firstChild);
    });
    expect(panels().map(panel => panel.getAttribute('tabindex'))).toEqual(['0', '0']);
  });

  it('ignores concealed slide controls and remeasures when their concealment or a surrounding fieldset changes', async () => {
    const { container } = render(
      <Carousel aria-label="Notes">
        <fieldset>
          <CarouselViewport>
            <div>
              <button style={{ display: 'none' }}>Collapsed</button>
            </div>
            <details>
              <summary tabIndex={-1}>Summary</summary>
              <button>Closed body</button>
            </details>
            <span style={{ visibility: 'hidden' }}>
              <button>Invisible</button>
            </span>
            <button>Visible</button>
          </CarouselViewport>
        </fieldset>
        <CarouselNav />
      </Carousel>,
    );
    const panels = () => Array.from(document.querySelectorAll('[data-carousel-page]'));
    expect(panels().map(panel => panel.getAttribute('tabindex'))).toEqual(['0', '0', '0', null]);
    await act(async () => {
      screen.getByText('Collapsed', { selector: 'button' }).style.display = '';
      screen.getByText('Summary').parentElement!.setAttribute('open', '');
    });
    expect(panels().map(panel => panel.getAttribute('tabindex'))).toEqual([null, null, '0', null]);
    await act(async () => container.querySelector('fieldset')!.setAttribute('disabled', ''));
    expect(panels().map(panel => panel.getAttribute('tabindex'))).toEqual(['0', '0', '0', '0']);
  });

  it('recovers focus that the browser drops from a hidden outgoing group after a controlled change', () => {
    // Stands in for a browser that drops focus from newly hidden content before the carousel settles.
    const FocusFixup = () => {
      useIsomorphicLayoutEffect(() => {
        const active = document.activeElement as HTMLElement | null;
        if (active?.closest('[hidden]')) {
          active.blur();
        }
      });
      return null;
    };
    const controlled = (activeIndex: number) => (
      <>
        <button>Outside</button>
        <Carousel aria-label="Notes" activeIndex={activeIndex}>
          <CarouselViewport>
            <CarouselCard>
              <input aria-label="First" />
            </CarouselCard>
            <CarouselCard>
              <input aria-label="Second" />
            </CarouselCard>
            <CarouselCard>
              <input aria-label="Third" />
            </CarouselCard>
          </CarouselViewport>
          <CarouselNav />
          <FocusFixup />
        </Carousel>
      </>
    );
    const { rerender } = render(controlled(0));
    act(() => screen.getByRole('textbox', { name: 'First' }).focus());
    rerender(controlled(1));
    expect(screen.getByRole('group', { name: 'Slide 2 of 3' })).toHaveFocus();
    act(() => screen.getByRole('button', { name: 'Outside' }).focus());
    rerender(controlled(2));
    expect(screen.getByRole('button', { name: 'Outside' })).toHaveFocus();
  });

  it.each([0, 999, 1000.5, NaN, Infinity, 2147483648])('rejects invalid autoplay interval %s', autoplayInterval => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(example({ autoplayInterval }))).toThrow(RangeError);
  });
});
