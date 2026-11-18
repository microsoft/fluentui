import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { createPortal } from 'react-dom';
import { useMergedRefs } from './useMergedRefs';
import { useMenuScrollIntoView_unstable } from './useMenuScrollIntoView';

const ownedActive = (surface: HTMLElement) => {
  const active = surface.ownerDocument.activeElement;
  return active && surface.contains(active) ? active : null;
};

describe('useMenuScrollIntoView', () => {
  let frames: Map<number, FrameRequestCallback>;
  let observers: { callback: ResizeObserverCallback; targets: Set<Element> }[];
  let reveals: Element[];
  const scrollDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'scrollIntoView');
  const observerDescriptor = Object.getOwnPropertyDescriptor(window, 'ResizeObserver');

  beforeEach(() => {
    frames = new Map();
    observers = [];
    reveals = [];
    let nextFrame = 0;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => frames.delete(id));
    const ResizeObserverMock = jest.fn((callback: ResizeObserverCallback) => {
      const targets = new Set<Element>();
      observers.push({ callback, targets });
      return {
        observe: (target: Element) => targets.add(target),
        unobserve: (target: Element) => targets.delete(target),
        disconnect: () => targets.clear(),
      };
    });
    Object.defineProperty(window, 'ResizeObserver', { configurable: true, value: ResizeObserverMock });
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: jest.fn(function (this: Element) {
        reveals.push(this);
      }),
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
    if (observerDescriptor) {
      Object.defineProperty(window, 'ResizeObserver', observerDescriptor);
    } else {
      Reflect.deleteProperty(window, 'ResizeObserver');
    }
    if (scrollDescriptor) {
      Object.defineProperty(Element.prototype, 'scrollIntoView', scrollDescriptor);
    } else {
      Reflect.deleteProperty(Element.prototype, 'scrollIntoView');
    }
  });

  const flush = () =>
    act(() => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(0));
    });
  const resize = (target: Element) =>
    act(() => {
      observers
        .filter(observer => observer.targets.has(target))
        .forEach(observer => observer.callback([], {} as ResizeObserver));
    });
  const Surface = ({
    parentRef,
    triggerRef,
    elementRef,
    open = true,
    children,
  }: React.PropsWithChildren<{
    parentRef: React.RefObject<HTMLElement | null>;
    triggerRef: React.RefObject<HTMLElement | null>;
    elementRef?: React.Ref<HTMLElement>;
    open?: boolean;
  }>) => {
    const ref = useMenuScrollIntoView_unstable(open, triggerRef, parentRef, ownedActive);
    return <div ref={useMergedRefs(ref, elementRef)}>{children}</div>;
  };
  const setup = () => {
    const empty = { current: null };
    const outer = React.createRef<HTMLDivElement>();
    const middle = React.createRef<HTMLDivElement>();
    const outerTrigger = React.createRef<HTMLButtonElement>();
    const innerTrigger = React.createRef<HTMLButtonElement>();
    const Example = ({ replacement = false, open = true, triggerless = false } = {}) => (
      <>
        <button data-testid="outside">Outside</button>
        <Surface parentRef={empty} triggerRef={empty} elementRef={outer} open={open}>
          <button key={String(replacement)} ref={outerTrigger}>
            Outer invoker
          </button>
        </Surface>
        <Surface parentRef={outer} triggerRef={triggerless ? empty : outerTrigger} elementRef={middle} open={open}>
          <button ref={innerTrigger}>Inner invoker</button>
        </Surface>
        <Surface parentRef={middle} triggerRef={innerTrigger} open={open}>
          <button data-testid="focused">Action</button>
        </Surface>
      </>
    );
    const view = render(<Example />);
    const item = view.getByTestId('focused');
    item.focus();
    flush();
    return { ...view, outer, middle, outerTrigger, innerTrigger, item, Example };
  };

  it('reveals logical invokers root-to-leaf, reads replacement refs and never moves focus', () => {
    const { outerTrigger, innerTrigger, item, rerender, Example } = setup();
    expect(reveals).toEqual([outerTrigger.current, innerTrigger.current, item]);
    const previous = outerTrigger.current;
    rerender(<Example replacement />);
    reveals = [];
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect(outerTrigger.current).not.toBe(previous);
    expect(reveals).toEqual([outerTrigger.current, innerTrigger.current, item]);
    expect(item.ownerDocument.activeElement).toBe(item);
    expect(item.scrollIntoView).toHaveBeenLastCalledWith({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'instant',
      container: 'nearest',
    });
  });

  it('observes all ancestors and coalesces resize, focus and ancestor scrolling', () => {
    const { outer, middle, item } = setup();
    expect(observers.some(observer => observer.targets.has(outer.current!))).toBe(true);
    reveals = [];
    act(() => {
      for (let i = 0; i < 20; i++) {
        window.dispatchEvent(new Event('resize'));
      }
      middle.current!.dispatchEvent(new Event('scroll'));
      item.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    });
    flush();
    expect(reveals).toHaveLength(3);
    reveals = [];
    act(() => item.parentElement!.dispatchEvent(new Event('scroll')));
    flush();
    expect(reveals).toEqual([]);
  });

  it('skips pure height growth without cancelling a pending viewport correction', () => {
    const { outer } = setup();
    reveals = [];
    Object.defineProperty(outer.current, 'clientHeight', { configurable: true, value: 100 });
    resize(outer.current!);
    flush();
    expect(reveals).toEqual([]);
    act(() => window.dispatchEvent(new Event('resize')));
    Object.defineProperty(outer.current, 'clientHeight', { configurable: true, value: 120 });
    resize(outer.current!);
    flush();
    expect(reveals).toHaveLength(3);
    reveals = [];
    Object.defineProperty(outer.current, 'clientHeight', { configurable: true, value: 80 });
    resize(outer.current!);
    flush();
    expect(reveals).toHaveLength(3);
  });

  it('continues past missing invokers and stops disconnected and cyclic parent chains', () => {
    const { outer, middle, innerTrigger, item, rerender, Example } = setup();
    rerender(<Example triggerless />);
    reveals = [];
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect(reveals).toEqual([innerTrigger.current, item]);
    // Turn the innermost relation into a cycle without mutating React's DOM.
    middle.current = item.parentElement as HTMLDivElement;
    reveals = [];
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect(reveals).toEqual([item]);
    middle.current = item.ownerDocument.createElement('div');
    reveals = [];
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect(reveals).toEqual([item]);
    expect(observers.some(observer => observer.targets.has(outer.current!))).toBe(true);
  });

  it('does not restore focus and removes frames, observers and subscriptions on close', () => {
    const { getByTestId, rerender, Example, item } = setup();
    getByTestId('outside').focus();
    reveals = [];
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect(reveals).toEqual([]);
    item.focus();
    expect(frames.size).toBeGreaterThan(0);
    rerender(<Example open={false} />);
    expect(frames.size).toBe(0);
    expect(observers.every(observer => observer.targets.size === 0)).toBe(true);
    reveals = [];
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect(reveals).toEqual([]);
  });

  it('uses and cleans up visual viewport resize and scroll subscriptions', () => {
    const previous = Object.getOwnPropertyDescriptor(window, 'visualViewport');
    const viewport = new EventTarget();
    Object.defineProperty(window, 'visualViewport', { configurable: true, value: viewport });
    try {
      const { unmount } = setup();
      reveals = [];
      act(() => {
        viewport.dispatchEvent(new Event('resize'));
        viewport.dispatchEvent(new Event('scroll'));
      });
      flush();
      expect(reveals).toHaveLength(3);
      const remove = jest.spyOn(viewport, 'removeEventListener');
      unmount();
      expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
      expect(frames.size).toBe(0);
    } finally {
      if (previous) {
        Object.defineProperty(window, 'visualViewport', previous);
      } else {
        Reflect.deleteProperty(window, 'visualViewport');
      }
    }
  });

  it('schedules and observes using the surface owner window', () => {
    const iframe = render(<iframe />).container.firstElementChild as HTMLIFrameElement;
    const ownerDocument = iframe.contentDocument!;
    const ownerWindow = ownerDocument.defaultView!;
    const request = jest.fn(() => 1);
    const cancel = jest.fn();
    const observer = jest.fn(() => ({ observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() }));
    Object.defineProperties(ownerWindow, {
      requestAnimationFrame: { configurable: true, value: request },
      cancelAnimationFrame: { configurable: true, value: cancel },
      ResizeObserver: { configurable: true, value: observer },
    });
    const empty = { current: null };
    const view = render(createPortal(<Surface parentRef={empty} triggerRef={empty} />, ownerDocument.body));
    expect(request).toHaveBeenCalled();
    expect(observer).toHaveBeenCalled();
    view.unmount();
    expect(cancel).toHaveBeenCalledTimes(observer.mock.calls.length);
  });
});
