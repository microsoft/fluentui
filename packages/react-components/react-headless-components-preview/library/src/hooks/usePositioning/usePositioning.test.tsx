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

  it('containerRef writes data-position and data-align matching the requested (position, align)', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveAttribute('data-position', 'below');
    expect(node).toHaveAttribute('data-align', 'start');
  });

  it('containerRef writes data-placement on browsers without anchored container queries (jsdom default)', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    // jsdom's CSS.supports returns false for `container-type: anchored`, so the
    // observer-maintained `data-placement` is set with the resolved-on-mount value.
    expect(node).toHaveAttribute('data-placement', 'below-start');
  });

  it('containerRef omits data-placement and sets container-type when anchored CQ is supported', () => {
    type WindowWithCSS = Window & { CSS?: { supports?: (prop: string, value: string) => boolean } };
    const originalCSS = (window as WindowWithCSS).CSS;
    (window as WindowWithCSS).CSS = {
      supports: (prop: string, value: string) => prop === 'container-type' && value === 'anchored',
    };

    try {
      const result = mountHook({ position: 'below', align: 'start' });
      const node = document.createElement('div');

      act(() => {
        result.current.containerRef(node);
      });

      expect(node).not.toHaveAttribute('data-placement');
      expect(node.style.getPropertyValue('container-type')).toBe('anchored');
      expect(node).toHaveAttribute('data-position', 'below');
      expect(node).toHaveAttribute('data-align', 'start');
    } finally {
      (window as WindowWithCSS).CSS = originalCSS;
    }
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

  it('containerRef applies offset as a logical margin on the side facing the anchor', () => {
    const result = mountHook({ position: 'below', offset: { mainAxis: 8, crossAxis: 4 } });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({
      marginBlockStart: '8px',
      marginInlineStart: '4px',
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

describe('placement observer feature detection', () => {
  type WindowWithCSS = Window & { CSS?: { supports?: (prop: string, value: string) => boolean } };

  let originalCSS: WindowWithCSS['CSS'];
  let originalRO: typeof ResizeObserver | undefined;
  let resizeObserverCount: number;

  const ObserverHarness = () => {
    const { targetRef, containerRef } = usePositioning({});
    return (
      <>
        <div data-testid="target" ref={targetRef} />
        <div data-testid="container" ref={containerRef} />
      </>
    );
  };

  class CountingResizeObserver implements ResizeObserver {
    constructor() {
      resizeObserverCount++;
    }
    public observe(): void {
      /* no-op */
    }
    public unobserve(): void {
      /* no-op */
    }
    public disconnect(): void {
      /* no-op */
    }
  }

  beforeEach(() => {
    originalCSS = (window as WindowWithCSS).CSS;
    originalRO = window.ResizeObserver;
    resizeObserverCount = 0;
    window.ResizeObserver = CountingResizeObserver as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    (window as WindowWithCSS).CSS = originalCSS;
    if (originalRO) {
      window.ResizeObserver = originalRO;
    } else {
      delete (window as { ResizeObserver?: typeof ResizeObserver }).ResizeObserver;
    }
  });

  it('skips attaching listeners and ResizeObserver when CSS supports container-type: anchored', () => {
    (window as WindowWithCSS).CSS = {
      supports: (prop: string, value: string) => prop === 'container-type' && value === 'anchored',
    };

    const addSpy = jest.spyOn(window, 'addEventListener');
    render(<ObserverHarness />);

    const scrollOrResize = addSpy.mock.calls.filter(call => call[0] === 'scroll' || call[0] === 'resize');
    expect(scrollOrResize).toHaveLength(0);
    expect(resizeObserverCount).toBe(0);

    addSpy.mockRestore();
  });

  it('attaches listeners when CSS does not support container-type: anchored', () => {
    (window as WindowWithCSS).CSS = { supports: () => false };

    const addSpy = jest.spyOn(window, 'addEventListener');
    render(<ObserverHarness />);

    const scrollAdds = addSpy.mock.calls.filter(call => call[0] === 'scroll');
    const resizeAdds = addSpy.mock.calls.filter(call => call[0] === 'resize');
    expect(scrollAdds.length).toBeGreaterThanOrEqual(1);
    expect(resizeAdds.length).toBeGreaterThanOrEqual(1);
    expect(resizeObserverCount).toBeGreaterThanOrEqual(1);

    addSpy.mockRestore();
  });
});
