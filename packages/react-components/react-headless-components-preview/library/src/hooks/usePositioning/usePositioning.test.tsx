import * as React from 'react';
import { act, render } from '@testing-library/react';
import { usePositioning } from './usePositioning';
import { getPlacementString } from './utils/placement';
import type { PositioningProps, PositioningReturn } from './types';

function mountHook(options: PositioningProps = {}) {
  const resultRef = React.createRef<{ current: PositioningReturn }>();
  const Capture = () => {
    const result = usePositioning(options);
    (resultRef as unknown as { current: PositioningReturn }).current = result;
    return null;
  };
  render(<Capture />);
  return resultRef as unknown as { current: PositioningReturn };
}

describe('usePositioning', () => {
  it('returns targetRef and containerRef callbacks', () => {
    const result = mountHook();

    expect(typeof result.current.targetRef).toBe('function');
    expect(typeof result.current.containerRef).toBe('function');
  });

  it('targetRef writes anchor-name onto the trigger element', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.targetRef(node);
    });

    expect(node.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);
  });

  it('containerRef writes position-anchor and position-area matching the props', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('position-anchor')).toMatch(/^--popover-anchor-/);
    expect(node).toHaveStyle({ positionArea: 'block-end span-inline-end' });
  });

  it('containerRef writes position: absolute by default and clears the UA inset/margin defaults', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ position: 'absolute', inset: 'auto', margin: '0px' });
  });

  it('containerRef honors strategy: "fixed"', () => {
    const result = mountHook({ strategy: 'fixed' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ position: 'fixed' });
  });

  it('containerRef writes data-placement matching (position, align)', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveAttribute('data-placement', 'below-start');
  });

  it('containerRef sets position-try-fallbacks to the three-try flip chain by default', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline' });
  });

  it('containerRef uses custom fallbackPositions verbatim when provided', () => {
    const result = mountHook({ fallbackPositions: ['below-start', 'after'] });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionTryFallbacks: 'block-end span-inline-end, inline-end' });
  });

  it('containerRef removes position-try-fallbacks when pinned', () => {
    const result = mountHook({ pinned: true });
    const node = document.createElement('div');
    node.style.setProperty('position-try-fallbacks', 'flip-block');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('position-try-fallbacks')).toBe('');
  });

  it('containerRef writes cover self-alignment when coverTarget is true', () => {
    const result = mountHook({ coverTarget: true, position: 'above', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ positionArea: 'center', alignSelf: 'end', justifySelf: 'start' });
  });

  it('containerRef writes place-self: anchor-center for center alignment (crbug 438334710 workaround)', () => {
    const result = mountHook({ position: 'above', align: 'center' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ placeSelf: 'anchor-center' });
  });

  it('containerRef does not write place-self for non-center alignments', () => {
    const result = mountHook({ position: 'above', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node.style.getPropertyValue('place-self')).toBe('');
    expect(node.style.getPropertyValue('justify-self')).toBe('');
    expect(node.style.getPropertyValue('align-self')).toBe('');
  });

  it('containerRef writes matchTargetSize width via anchor-size()', () => {
    const result = mountHook({ matchTargetSize: 'width' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ width: 'anchor-size(width)' });
  });

  it('containerRef applies offset as symmetric logical margins so flips keep their gap', () => {
    const result = mountHook({ position: 'below', offset: { mainAxis: 8, crossAxis: 4 } });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({
      marginBlockStart: '8px',
      marginBlockEnd: '8px',
      marginInlineStart: '4px',
      marginInlineEnd: '4px',
    });
  });

  describe('imperative ref', () => {
    it('exposes a callable updatePosition()', () => {
      const positioningRef = React.createRef<{
        updatePosition: () => void;
        setTarget: (el: HTMLElement | null) => void;
      }>();
      mountHook({
        positioningRef: positioningRef as unknown as PositioningProps['positioningRef'],
      });

      expect(positioningRef.current).not.toBeNull();
      expect(() => positioningRef.current?.updatePosition()).not.toThrow();
    });
  });
});

describe('placement observer', () => {
  type ResizeObserverInstance = {
    observe: jest.Mock;
    disconnect: jest.Mock;
    callback: ResizeObserverCallback;
    observed: Element[];
  };

  let originalResizeObserver: typeof ResizeObserver | undefined;
  let resizeObservers: ResizeObserverInstance[];
  let windowAddSpy: jest.SpyInstance;
  let windowRemoveSpy: jest.SpyInstance;

  beforeEach(() => {
    originalResizeObserver = window.ResizeObserver;
    resizeObservers = [];

    window.ResizeObserver = class MockResizeObserver {
      public observe: jest.Mock;
      public disconnect: jest.Mock;
      public callback: ResizeObserverCallback;
      public observed: Element[];

      constructor(callback: ResizeObserverCallback) {
        this.callback = callback;
        this.observed = [];
        const observed = this.observed;
        this.observe = jest.fn((el: Element) => {
          observed.push(el);
        });
        this.disconnect = jest.fn();
        resizeObservers.push(this as unknown as ResizeObserverInstance);
      }
    } as unknown as typeof ResizeObserver;

    windowAddSpy = jest.spyOn(window, 'addEventListener');
    windowRemoveSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    if (originalResizeObserver) {
      window.ResizeObserver = originalResizeObserver;
    } else {
      delete (window as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    }
    windowAddSpy.mockRestore();
    windowRemoveSpy.mockRestore();
  });

  const callsOfType = (spy: jest.SpyInstance, type: string) => spy.mock.calls.filter(call => call[0] === type);

  const optionFlag = (call: unknown[], key: 'capture' | 'passive'): boolean => {
    const opts = call[2];
    if (typeof opts === 'boolean') {
      return key === 'capture' ? opts : false;
    }
    return typeof opts === 'object' && opts !== null && (opts as AddEventListenerOptions)[key] === true;
  };

  const ObserverHarness = ({ options = {} }: { options?: PositioningProps }) => {
    const { targetRef, containerRef } = usePositioning(options);
    return (
      <>
        <div data-testid="target" ref={targetRef} />
        <div data-testid="container" ref={containerRef} />
      </>
    );
  };

  const flushMicrotasks = async () => {
    await Promise.resolve();
  };

  it('observes container and target with ResizeObserver', () => {
    render(<ObserverHarness />);
    expect(resizeObservers).toHaveLength(1);
    expect(resizeObservers[0].observed).toHaveLength(2);
    expect(resizeObservers[0].observed[0].getAttribute('data-testid')).toBe('container');
    expect(resizeObservers[0].observed[1].getAttribute('data-testid')).toBe('target');
  });

  it('attaches a capture-phase passive scroll listener and a resize listener on the window', () => {
    render(<ObserverHarness />);

    const windowScroll = callsOfType(windowAddSpy, 'scroll');
    const windowResize = callsOfType(windowAddSpy, 'resize');

    expect(windowScroll).toHaveLength(1);
    expect(optionFlag(windowScroll[0], 'capture')).toBe(true);
    expect(optionFlag(windowScroll[0], 'passive')).toBe(true);
    expect(windowResize).toHaveLength(1);
  });

  it('coalesces multiple resize callbacks within a microtask cycle into one update', async () => {
    const setAttrSpy = jest.spyOn(Element.prototype, 'setAttribute');

    render(<ObserverHarness />);
    await act(async () => {
      await flushMicrotasks();
    });
    setAttrSpy.mockClear();

    const ro = resizeObservers[0];
    const target = ro.observed.find(el => el.getAttribute('data-testid') === 'target')!;
    const container = ro.observed.find(el => el.getAttribute('data-testid') === 'container')!;
    const entry = (el: Element) =>
      ({
        target: el,
        contentRect: { width: 100, height: 50, top: 0, left: 0, right: 100, bottom: 50, x: 0, y: 0 },
      } as ResizeObserverEntry);

    await act(async () => {
      (ro.callback as ResizeObserverCallback)([entry(target), entry(container)], ro as unknown as ResizeObserver);
      (ro.callback as ResizeObserverCallback)([entry(target), entry(container)], ro as unknown as ResizeObserver);
      (ro.callback as ResizeObserverCallback)([entry(target), entry(container)], ro as unknown as ResizeObserver);
      await flushMicrotasks();
    });

    // Three RO ticks within the same microtask cycle → at most one data-placement write.
    const placementWrites = setAttrSpy.mock.calls.filter(call => call[0] === 'data-placement');
    expect(placementWrites.length).toBeLessThanOrEqual(1);

    setAttrSpy.mockRestore();
  });

  it('skips updates when ResizeObserver fires with a 0×0 contentRect (likely display:none)', async () => {
    const setAttrSpy = jest.spyOn(Element.prototype, 'setAttribute');

    render(<ObserverHarness />);
    await act(async () => {
      await flushMicrotasks();
    });
    setAttrSpy.mockClear();

    const ro = resizeObservers[0];
    const target = ro.observed.find(el => el.getAttribute('data-testid') === 'target')!;
    const zeroEntry = {
      target,
      contentRect: { width: 0, height: 0, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0 },
    } as ResizeObserverEntry;

    await act(async () => {
      (ro.callback as ResizeObserverCallback)([zeroEntry], ro as unknown as ResizeObserver);
      await flushMicrotasks();
    });

    expect(setAttrSpy.mock.calls.find(call => call[0] === 'data-placement')).toBeUndefined();

    setAttrSpy.mockRestore();
  });

  it('disconnects ResizeObserver and removes scroll/resize listeners on unmount', () => {
    const { unmount } = render(<ObserverHarness />);
    const ro = resizeObservers[0];

    const scrollAdds = callsOfType(windowAddSpy, 'scroll').length;
    const resizeAdds = callsOfType(windowAddSpy, 'resize').length;

    unmount();

    expect(ro.disconnect).toHaveBeenCalled();
    expect(callsOfType(windowRemoveSpy, 'scroll')).toHaveLength(scrollAdds);
    expect(callsOfType(windowRemoveSpy, 'resize')).toHaveLength(resizeAdds);

    // The scroll listener was added with capture: true; cleanup must match.
    const scrollRemove = callsOfType(windowRemoveSpy, 'scroll')[0];
    expect(optionFlag(scrollRemove, 'capture')).toBe(true);
  });

  it('does not attach observers or listeners when coverTarget is true (no flip can happen)', () => {
    render(<ObserverHarness options={{ coverTarget: true }} />);
    expect(resizeObservers).toHaveLength(0);
    expect(callsOfType(windowAddSpy, 'scroll')).toHaveLength(0);
    expect(callsOfType(windowAddSpy, 'resize')).toHaveLength(0);
  });
});

describe('getPlacementString', () => {
  it('returns the bare position for center alignment', () => {
    expect(getPlacementString('above', 'center')).toBe('above');
    expect(getPlacementString('below', 'center')).toBe('below');
  });

  it('returns position-align for non-center alignments', () => {
    expect(getPlacementString('above', 'start')).toBe('above-start');
    expect(getPlacementString('below', 'end')).toBe('below-end');
    expect(getPlacementString('before', 'start')).toBe('before-top');
    expect(getPlacementString('after', 'end')).toBe('after-bottom');
  });
});
