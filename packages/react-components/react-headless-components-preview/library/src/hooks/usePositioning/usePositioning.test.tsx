import * as React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import type { PositioningProps } from '@fluentui/react-positioning';
import { preloadPositioning, resetPositioningForTests, resetLazyApplyForTests, usePositioning } from './index';
import { applyAnchorPositioning } from './applyAnchorPositioning';
import { getPlacementString } from './utils/placement';
import type { PositioningReturn } from './types';

type CapturedResult = { current: PositioningReturn | null };

const readAnchorNames = (element: HTMLElement): string[] =>
  element.style
    .getPropertyValue('anchor-name')
    .split(',')
    .map(name => name.trim())
    .filter(Boolean);

function mountHook(options: PositioningProps = {}) {
  const result: CapturedResult = { current: null };
  const Capture = () => {
    result.current = usePositioning(options);
    return null;
  };
  const utils = render(<Capture />);
  return { result, ...utils };
}

function attachRefs(result: CapturedResult, { withArrow = false }: { withArrow?: boolean } = {}) {
  const target = document.createElement('div');
  const container = document.createElement('div');
  const arrow = withArrow ? document.createElement('div') : null;

  document.body.appendChild(target);
  document.body.appendChild(container);
  if (arrow) {
    container.appendChild(arrow);
  }

  act(() => {
    if (arrow) {
      result.current?.arrowRef(arrow);
    }
    result.current?.targetRef(target);
    result.current?.containerRef(container);
  });

  return {
    target,
    container,
    arrow,
    cleanup: () => {
      document.body.removeChild(target);
      document.body.removeChild(container);
    },
  };
}

describe('usePositioning', () => {
  let originalSupports: typeof CSS.supports | undefined;
  let supportsMock: jest.Mock | undefined;

  function mockCssSupports(impl: (property: string, value?: string) => boolean) {
    if (typeof CSS === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).CSS = {};
    }
    originalSupports = CSS.supports;
    supportsMock = jest.fn(impl);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (CSS as any).supports = supportsMock;
  }

  beforeEach(() => {
    resetPositioningForTests();
    resetLazyApplyForTests();
  });

  afterEach(() => {
    if (supportsMock) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (CSS as any).supports = originalSupports;
      supportsMock = undefined;
    }
  });

  it('returns stable callback refs across renders', () => {
    mockCssSupports(() => true);

    const refs: PositioningReturn[] = [];
    const Capture = ({ position }: { position: 'above' | 'below' }) => {
      refs.push(usePositioning({ position }));
      return null;
    };

    const { rerender } = render(<Capture position="below" />);
    rerender(<Capture position="above" />);

    expect(refs.length).toBeGreaterThanOrEqual(2);
    expect(refs[0].targetRef).toBe(refs[1].targetRef);
    expect(refs[0].containerRef).toBe(refs[1].containerRef);
  });

  it('appends to anchor-name so multiple instances can share one trigger', async () => {
    mockCssSupports(() => true);
    const first = mountHook();
    const second = mountHook();
    const target = document.createElement('div');
    const firstContainer = document.createElement('div');
    const secondContainer = document.createElement('div');

    act(() => {
      first.result.current?.targetRef(target);
      first.result.current?.containerRef(firstContainer);
      second.result.current?.targetRef(target);
      second.result.current?.containerRef(secondContainer);
    });

    await waitFor(() => {
      expect(readAnchorNames(target)).toHaveLength(2);
    });

    const names = readAnchorNames(target);
    expect(names[0]).not.toBe(names[1]);
    names.forEach(name => expect(name).toMatch(/^--popover-anchor-/));

    first.unmount();
    expect(readAnchorNames(target)).toHaveLength(1);
    second.unmount();
    expect(readAnchorNames(target)).toHaveLength(0);
  });

  it('preserves a pre-existing author-set anchor-name', async () => {
    mockCssSupports(() => true);
    const { result, unmount } = mountHook();
    const target = document.createElement('div');
    const container = document.createElement('div');
    target.style.setProperty('anchor-name', '--app-anchor');

    act(() => {
      result.current?.targetRef(target);
      result.current?.containerRef(container);
    });

    await waitFor(() => {
      expect(readAnchorNames(target).some(name => /^--popover-anchor-/.test(name))).toBe(true);
    });
    expect(readAnchorNames(target)).toContain('--app-anchor');

    unmount();
    expect(readAnchorNames(target)).toEqual(['--app-anchor']);
  });

  it('does not call the floating-ui chunk loader when CSS Anchor is supported', async () => {
    mockCssSupports((property: string) => property === 'anchor-name');

    const { result } = mountHook({ position: 'below' });
    const { target, container, cleanup } = attachRefs(result);

    await waitFor(() => {
      expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
    });

    // Hallmark of the anchor branch: the container received `position-anchor`
    // pointing at the target's `anchor-name` (a CSS-only mechanism). The
    // floating-ui branch instead writes `left`/`top` numeric coordinates.
    expect(container.style.getPropertyValue('position-anchor')).not.toBe('');
    expect(container.style.getPropertyValue('left')).toBe('');
    expect(container.style.getPropertyValue('top')).toBe('');

    cleanup();
  });

  it('does not write CSS-Anchor properties when anchor is not supported', async () => {
    mockCssSupports(() => false);

    const { result } = mountHook({ position: 'below' });
    const { target, container, cleanup } = attachRefs(result);

    await waitFor(() => {
      expect(container.getAttribute('data-placement')).not.toBeNull();
    });

    // Hallmark of the floating-ui branch: computed coordinates, no
    // `position-anchor` reference.
    expect(target.style.getPropertyValue('anchor-name')).toBe('');
    expect(container.style.getPropertyValue('position-anchor')).toBe('');
    expect(container.style.getPropertyValue('transform')).toMatch(/^translate3d\(/);

    cleanup();
  });

  describe('feature-driven floating-ui fallback', () => {
    beforeEach(() => {
      mockCssSupports((property: string) => property === 'anchor-name');
    });

    it.each([
      ['autoSize', { autoSize: true }],
      ['flipBoundary', { flipBoundary: 'window' }],
      ['overflowBoundary', { overflowBoundary: 'window' }],
      ['overflowBoundaryPadding', { overflowBoundaryPadding: 8 }],
      ['useTransform', { useTransform: true }],
      ['arrowPadding', { arrowPadding: 8 }],
      ['onPositioningEnd', { onPositioningEnd: jest.fn() }],
      ['disableUpdateOnResize', { disableUpdateOnResize: true }],
      ['shiftToCoverTarget', { shiftToCoverTarget: true }],
      ['functional offset', { offset: () => 8 }],
    ] as const)('uses floating-ui when %s is requested', async (_feature, positioningOptions) => {
      const { result } = mountHook(positioningOptions);
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(container.getAttribute('data-placement')).not.toBeNull();
      });

      expect(target.style.getPropertyValue('anchor-name')).toBe('');
      expect(container.style.getPropertyValue('position-anchor')).toBe('');
      expect(container.style.getPropertyValue('left') || container.style.getPropertyValue('transform')).not.toBe('');
      cleanup();
    });

    it('uses floating-ui for virtual targets', async () => {
      const target = {
        getBoundingClientRect: () => ({
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          bottom: 20,
          right: 20,
          width: 20,
          height: 20,
        }),
      };
      const { result } = mountHook({ target });
      const { container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(container.getAttribute('data-placement')).not.toBeNull();
      });

      expect(container.style.getPropertyValue('position-anchor')).toBe('');
      expect(container.style.getPropertyValue('transform')).toMatch(/^translate3d\(/);
      cleanup();
    });

    it('applies autoSize through floating-ui size middleware', async () => {
      const { result } = mountHook({ autoSize: 'height' });
      const { container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(container.style.getPropertyValue('max-height')).not.toBe('');
      });

      expect(container.style.getPropertyValue('box-sizing')).toBe('border-box');
      cleanup();
    });

    it('calls onPositioningEnd after floating-ui computes a position', async () => {
      const onPositioningEnd = jest.fn();
      const { result } = mountHook({ onPositioningEnd });
      const { cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(onPositioningEnd).toHaveBeenCalled();
      });

      expect(onPositioningEnd.mock.calls[0][0].detail.placement).toBeDefined();
      cleanup();
    });

    it('preloads floating-ui when unsupported options are supplied', async () => {
      await expect(preloadPositioning({ autoSize: true })).resolves.toBeDefined();
    });
  });

  describe('CSS Anchor Positioning branch', () => {
    beforeEach(() => {
      mockCssSupports((property: string) => property === 'anchor-name');
    });

    it.each([
      { position: 'above', align: 'start', expected: 'block-start span-inline-end' },
      { position: 'above', align: 'end', expected: 'block-start span-inline-start' },
      { position: 'below', align: 'start', expected: 'block-end span-inline-end' },
      { position: 'below', align: 'end', expected: 'block-end span-inline-start' },
      { position: 'before', align: 'start', expected: 'inline-start span-block-end' },
      { position: 'after', align: 'end', expected: 'inline-end span-block-start' },
    ] as const)(
      'maps (position=$position, align=$align) to position-area=$expected',
      async ({ position, align, expected }) => {
        const { result } = mountHook({ position, align });
        const { target, container, cleanup } = attachRefs(result);

        await waitFor(() => {
          expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
        });

        expect(container).toHaveStyle({ positionArea: expected });

        cleanup();
      },
    );

    it('writes place-self: anchor-center for center alignment (crbug 438334710 workaround)', async () => {
      const { result } = mountHook({ position: 'above', align: 'center' });
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      expect(container).toHaveStyle({ placeSelf: 'anchor-center' });
      cleanup();
    });

    it('does not write place-self for non-center alignments', async () => {
      const { result } = mountHook({ position: 'above', align: 'start' });
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      expect(container.style.getPropertyValue('place-self')).toBe('');
      cleanup();
    });

    it('uses strategy: "absolute" by default', async () => {
      const { result } = mountHook();
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      expect(container.style.getPropertyValue('position')).toBe('absolute');
      cleanup();
    });

    it('writes matchTargetSize width via anchor-size()', async () => {
      const { result } = mountHook({ matchTargetSize: 'width' });
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      // JSDOM rejects `anchor-size(width)` when read via getPropertyValue, so
      // assert through jest-dom's parsed-style matcher instead.
      expect(container).toHaveStyle({ width: 'anchor-size(width)' });
      cleanup();
    });

    it('applies offset as logical margins', async () => {
      const { result } = mountHook({
        position: 'below',
        offset: { mainAxis: 8, crossAxis: 4 },
      });
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      expect(container).toHaveStyle({ marginBlockStart: '8px', marginInlineStart: '4px' });
      cleanup();
    });

    it('uses the default flip chain when no fallbackPositions are given', async () => {
      const { result } = mountHook();
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      expect(container).toHaveStyle({
        positionTryFallbacks: 'flip-block, flip-inline, flip-block flip-inline',
      });
      cleanup();
    });

    it('uses custom fallbackPositions verbatim when provided', async () => {
      const { result } = mountHook({ fallbackPositions: ['below-start', 'after'] });
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      expect(container).toHaveStyle({
        positionTryFallbacks: 'block-end span-inline-end, inline-end',
      });
      cleanup();
    });

    it('removes position-try-fallbacks when pinned', async () => {
      const { result } = mountHook({ pinned: true });
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      expect(container.style.getPropertyValue('position-try-fallbacks')).toBe('');
      cleanup();
    });

    it('writes cover-self alignment when coverTarget is true', async () => {
      const { result } = mountHook({ coverTarget: true, position: 'above', align: 'start' });
      const { target, container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      });

      expect(container).toHaveStyle({
        positionArea: 'center',
        alignSelf: 'end',
        justifySelf: 'start',
      });
      cleanup();
    });

    it('cleans up styles when the component unmounts', async () => {
      // Warm the chunk so the apply is synchronous and unmount can clean up immediately.
      await preloadPositioning();

      const { result, unmount } = mountHook({ position: 'below' });
      const { target, container, cleanup } = attachRefs(result);

      expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      expect(container.style.getPropertyValue('position-anchor')).not.toBe('');

      unmount();

      expect(target.style.getPropertyValue('anchor-name')).toBe('');
      expect(container.style.getPropertyValue('position-anchor')).toBe('');
      expect(container.hasAttribute('data-placement')).toBe(false);

      cleanup();
    });

    it.each([
      { position: 'above', expectedEdge: 'bottom' },
      { position: 'below', expectedEdge: 'top' },
      { position: 'before', expectedEdge: 'right' },
      { position: 'after', expectedEdge: 'left' },
    ] as const)(
      'anchors the arrow to the trigger and pins it to the popover edge nearest the trigger ($expectedEdge edge for position=$position)',
      async ({ position, expectedEdge }) => {
        const { result } = mountHook({ position });
        const { target, arrow, cleanup } = attachRefs(result, { withArrow: true });

        await waitFor(() => {
          expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
        });

        expect(arrow!.style.getPropertyValue('position')).toBe('absolute');
        expect(arrow!.style.getPropertyValue('position-anchor')).toMatch(/^--popover-anchor-/);
        expect(arrow!.style.getPropertyValue(expectedEdge)).toBe('0px');
        expect(arrow!.style.getPropertyValue('translate')).not.toBe('');
        cleanup();
      },
    );

    it('cleans up arrow styles on unmount', async () => {
      await preloadPositioning();
      const { result, unmount } = mountHook({ position: 'below' });
      const { arrow, cleanup } = attachRefs(result, { withArrow: true });

      expect(arrow!.style.getPropertyValue('position')).toBe('absolute');

      unmount();

      expect(arrow!.style.getPropertyValue('position')).toBe('');
      expect(arrow!.style.getPropertyValue('position-anchor')).toBe('');
      expect(arrow!.style.getPropertyValue('translate')).toBe('');
      cleanup();
    });

    it('positions and reveals the container synchronously', () => {
      const { result } = mountHook({ position: 'below' });
      const { target, container, cleanup } = attachRefs(result);

      expect(target.style.getPropertyValue('anchor-name')).not.toBe('');
      expect(container.style.getPropertyValue('visibility')).toBe('');

      cleanup();
    });

    it('preloadPositioning resolves without rejecting', async () => {
      await preloadPositioning();
    });
  });

  describe('floating-ui fallback branch', () => {
    beforeEach(() => {
      mockCssSupports(() => false);
    });

    it('does not throw or suspend on render', () => {
      const { result } = mountHook({ position: 'below' });
      expect(result.current).not.toBeNull();
      expect(typeof result.current?.targetRef).toBe('function');
      expect(typeof result.current?.containerRef).toBe('function');
    });

    it.each([
      { position: 'above', expected: 'top' },
      { position: 'below', expected: 'bottom' },
      { position: 'before', expected: 'left' },
      { position: 'after', expected: 'right' },
    ] as const)(
      'maps position=$position to floating-ui placement starting with "$expected"',
      async ({ position, expected }) => {
        const { result } = mountHook({ position });
        const { container, cleanup } = attachRefs(result);

        await waitFor(() => {
          expect(container.getAttribute('data-placement')).not.toBeNull();
        });

        expect(container.getAttribute('data-placement')).toMatch(new RegExp(`^${expected}`));
        cleanup();
      },
    );

    it('applies absolute strategy and transform coordinates by default', async () => {
      const { result } = mountHook({ position: 'below' });
      const { container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(container.getAttribute('data-placement')).not.toBeNull();
      });

      expect(container.style.getPropertyValue('position')).toBe('absolute');
      expect(container.style.getPropertyValue('transform')).toMatch(/^translate3d\(/);
      cleanup();
    });

    it('honors strategy: "fixed"', async () => {
      const { result } = mountHook({ strategy: 'fixed' });
      const { container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(container.getAttribute('data-placement')).not.toBeNull();
      });

      expect(container.style.getPropertyValue('position')).toBe('fixed');
      cleanup();
    });

    it('writes matchTargetSize width via the size middleware', async () => {
      const { result } = mountHook({ matchTargetSize: 'width' });
      const { container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(container.getAttribute('data-placement')).not.toBeNull();
      });

      // JSDOM rects are 0×0, so the matchTargetSize middleware writes "0px".
      // The point is that *some* width was written by the size middleware.
      expect(container.style.getPropertyValue('width')).toMatch(/^\d+(\.\d+)?px$/);
      cleanup();
    });

    it('cleans up coordinates and data-placement on unmount', async () => {
      // Warm the chunk so the apply is synchronous and the writes happen before unmount.
      await preloadPositioning();

      const { result, unmount } = mountHook({ position: 'below' });
      const { container, cleanup } = attachRefs(result);

      await waitFor(() => {
        expect(container.style.getPropertyValue('transform')).not.toBe('');
      });

      unmount();

      expect(container.style.getPropertyValue('left')).toBe('');
      expect(container.style.getPropertyValue('top')).toBe('');
      expect(container.style.getPropertyValue('transform')).toBe('');
      expect(container.hasAttribute('data-placement')).toBe(false);
      cleanup();
    });

    it('drives the arrow via floating-ui middleware (position absolute + numeric left/top)', async () => {
      const { result } = mountHook({ position: 'below' });
      const { container, arrow, cleanup } = attachRefs(result, { withArrow: true });

      await waitFor(() => {
        expect(container.getAttribute('data-placement')).not.toBeNull();
      });

      // The arrow middleware sets `position: absolute` synchronously during
      // setup and writes numeric `left`/`top` coordinates after the first
      // computePosition resolves.
      expect(arrow!.style.getPropertyValue('position')).toBe('absolute');
      // JSDOM produces 0×0 rects, so the middleware writes "0px"; the point
      // is that *some* numeric coordinate landed.
      expect(arrow!.style.getPropertyValue('left')).toMatch(/^-?\d+(\.\d+)?px$/);
      cleanup();
    });

    it('cleans up arrow styles on unmount', async () => {
      await preloadPositioning();
      const { result, unmount } = mountHook({ position: 'below' });
      const { arrow, cleanup } = attachRefs(result, { withArrow: true });

      await waitFor(() => {
        expect(arrow!.style.getPropertyValue('left')).not.toBe('');
      });

      unmount();

      expect(arrow!.style.getPropertyValue('position')).toBe('');
      expect(arrow!.style.getPropertyValue('left')).toBe('');
      expect(arrow!.style.getPropertyValue('top')).toBe('');
      cleanup();
    });

    it('keeps the container accessible while computePosition is in flight', async () => {
      const { result } = mountHook({ position: 'below' });
      const { container, cleanup } = attachRefs(result);

      expect(container.style.getPropertyValue('visibility')).toBe('');

      await waitFor(() => {
        expect(container.style.getPropertyValue('transform')).not.toBe('');
      });

      cleanup();
    });

    it('preloadPositioning resolves without rejecting', async () => {
      await preloadPositioning();
    });
  });

  it('exposes a callable updatePosition()', () => {
    const positioningRef = React.createRef<{
      updatePosition: () => void;
      setTarget: (element: HTMLElement | null) => void;
    }>();
    mountHook({ positioningRef: positioningRef as PositioningProps['positioningRef'] });

    expect(positioningRef.current).not.toBeNull();
    expect(() => {
      act(() => positioningRef.current?.updatePosition());
    }).not.toThrow();
  });

  it('cleans up and reapplies positioning when the imperative target changes', async () => {
    mockCssSupports(() => true);
    const positioningRef = React.createRef<{
      updatePosition: () => void;
      setTarget: (element: HTMLElement | null) => void;
    }>();
    const { result, unmount } = mountHook({ positioningRef: positioningRef as PositioningProps['positioningRef'] });
    const trigger = document.createElement('div');
    const overrideTarget = document.createElement('div');
    const container = document.createElement('div');

    act(() => {
      result.current?.targetRef(trigger);
      result.current?.containerRef(container);
    });
    await waitFor(() => expect(readAnchorNames(trigger)).toHaveLength(1));

    act(() => positioningRef.current?.setTarget(overrideTarget));
    await waitFor(() => expect(readAnchorNames(overrideTarget)).toHaveLength(1));
    expect(readAnchorNames(trigger)).toHaveLength(0);

    unmount();
    expect(readAnchorNames(overrideTarget)).toHaveLength(0);
  });
});

describe('applyAnchorPositioning', () => {
  const rect = (left: number, top: number, width: number, height: number): DOMRect =>
    ({
      x: left,
      y: top,
      left,
      top,
      right: left + width,
      bottom: top + height,
      width,
      height,
      toJSON: () => undefined,
    } as DOMRect);

  it('uses logical inline placement for an RTL arrow and follows browser flips', () => {
    const target = document.createElement('div');
    const container = document.createElement('div');
    const arrow = document.createElement('div');
    let containerRect = rect(80, 100, 20, 20);

    target.getBoundingClientRect = jest.fn(() => rect(100, 100, 20, 20));
    container.getBoundingClientRect = jest.fn(() => containerRect);

    const dispose = applyAnchorPositioning({
      target,
      container,
      arrow,
      anchorName: '--test-anchor',
      options: { position: 'before' },
      targetDocument: document,
      isRtl: true,
    });

    expect(container).toHaveAttribute('data-placement', 'after-top');
    expect(arrow.style.getPropertyValue('right')).toBe('0px');
    expect(arrow.style.getPropertyValue('left')).toBe('');

    containerRect = rect(120, 100, 20, 20);
    window.dispatchEvent(new Event('resize'));

    expect(container).toHaveAttribute('data-placement', 'before-top');
    expect(arrow.style.getPropertyValue('left')).toBe('0px');
    expect(arrow.style.getPropertyValue('right')).toBe('');

    dispose();
  });

  it('restores consumer-owned styles and placement metadata on cleanup', () => {
    const target = document.createElement('div');
    const container = document.createElement('div');
    const arrow = document.createElement('div');
    container.style.setProperty('position', 'relative', 'important');
    container.style.setProperty('width', '20px');
    container.setAttribute('data-placement', 'authored');
    arrow.style.setProperty('left', '4px');

    const dispose = applyAnchorPositioning({
      target,
      container,
      arrow,
      anchorName: '--test-anchor',
      options: { position: 'below', matchTargetSize: 'width' },
      targetDocument: document,
      isRtl: false,
    });

    dispose();

    expect(container.style.getPropertyValue('position')).toBe('relative');
    expect(container.style.getPropertyPriority('position')).toBe('important');
    expect(container.style.getPropertyValue('width')).toBe('20px');
    expect(container).toHaveAttribute('data-placement', 'authored');
    expect(arrow.style.getPropertyValue('left')).toBe('4px');
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
