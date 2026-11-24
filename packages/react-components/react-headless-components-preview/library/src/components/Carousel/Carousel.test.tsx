import * as React from 'react';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
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

const items = ['A', 'B', 'C', 'D', 'E'];
const selected = () => screen.getByRole('tab', { selected: true });

type ExampleProps = Partial<CarouselProps> & {
  buttons?: boolean;
  nav?: boolean;
  autoplay?: boolean;
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
    {autoplay && <CarouselAutoplayButton />}
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
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('tabpanel').parentElement).toHaveAttribute('aria-live', 'off');
    act(() => jest.advanceTimersByTime(1000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    fireEvent.pointerOver(screen.getByRole('tabpanel'));
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
    const animations: { finished: Promise<void>; cancel: jest.Mock }[] = [];
    const transition = jest.fn(() => {
      const animation = {
        finished: new Promise<void>(resolve => {
          resolvers.push(resolve);
        }),
        cancel: jest.fn(),
      };
      animations.push(animation);
      return [animation as unknown as Animation];
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
    const transition = jest.fn(() => [{ finished: new Promise(jest.fn()), cancel } as unknown as Animation]);
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
    const transition = () => [{ finished: new Promise(jest.fn()), cancel } as unknown as Animation];
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
    let notify: (entries: { isIntersecting: boolean }[]) => void = jest.fn();
    const disconnect = jest.fn();
    replaceProperty(
      win,
      'IntersectionObserver',
      jest.fn(callback => {
        notify = callback;
        return { observe: jest.fn(), disconnect };
      }),
    );
    replaceProperty(doc, 'hidden', false);
    const { unmount } = render(example({ autoplay: true, circular: true, autoplayInterval: 1000 }));
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 1 of 3');
    act(() => notify([{ isIntersecting: true }]));
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
    act(() => notify([{ isIntersecting: false }]));
    act(() => jest.advanceTimersByTime(3000));
    expect(selected()).toHaveAttribute('aria-label', 'Page 2 of 3');
    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('renders the CarouselNav template once per group and names arrows by their tooltips', () => {
    render(
      <Carousel aria-label="Notes" groupSize={2}>
        <CarouselPrevious tooltip="Précédent" />
        <CarouselViewport>
          {items.map(item => (
            <CarouselCard key={item}>{item}</CarouselCard>
          ))}
        </CarouselViewport>
        <CarouselNext tooltip="Suivant" />
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
    expect(next).toHaveAttribute('aria-controls', screen.getByRole('tabpanel').parentElement!.id);
    expect(next).not.toHaveAttribute('aria-label');
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

  it.each([0, 999, 1000.5, NaN, Infinity, 2147483648])('rejects invalid autoplay interval %s', autoplayInterval => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(example({ autoplayInterval }))).toThrow(RangeError);
  });
});
