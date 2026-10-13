import * as React from 'react';
import { act, render } from '@testing-library/react';
import { usePositioning } from './usePositioning';
import { getPlacementString } from './utils/placement';
import type { PositioningReturn, UsePositioningOptions } from './types';

// jsdom doesn't implement `CSS.supports()`, these tests cover the CSS anchor positioning path
beforeAll(() => {
  Object.defineProperty(globalThis, 'CSS', { value: { supports: () => true }, configurable: true, writable: true });
});

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'CSS');
});

function mountHook(options: UsePositioningOptions = {}) {
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

  it('appends to anchor-name so multiple instances can share one trigger', () => {
    // Two popovers (e.g. a Tooltip and a Menu) attached to the same trigger.
    const first = mountHook();
    const second = mountHook();
    const node = document.createElement('div');

    act(() => {
      first.current.targetRef(node);
      second.current.targetRef(node);
    });

    const names = node.style
      .getPropertyValue('anchor-name')
      .split(',')
      .map(name => name.trim())
      .filter(Boolean);

    // Both instances contribute their own anchor name; neither clobbers the other.
    expect(names).toHaveLength(2);
    expect(names[0]).not.toBe(names[1]);
    names.forEach(name => expect(name).toMatch(/^--popover-anchor-/));
  });

  it('preserves a pre-existing author-set anchor-name', () => {
    const result = mountHook();
    const node = document.createElement('div');
    node.style.setProperty('anchor-name', '--app-anchor');

    act(() => {
      result.current.targetRef(node);
    });

    const names = node.style
      .getPropertyValue('anchor-name')
      .split(',')
      .map(name => name.trim());

    expect(names).toContain('--app-anchor');
    expect(names.some(name => /^--popover-anchor-/.test(name))).toBe(true);
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

    expect(node).toHaveStyle({ position: 'fixed', inset: 'auto', margin: '0px' });
  });

  it('containerRef honors strategy: "absolute"', () => {
    const result = mountHook({ strategy: 'absolute' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveStyle({ position: 'absolute' });
  });

  it('containerRef writes data-placement matching (position, align)', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const node = document.createElement('div');

    act(() => {
      result.current.containerRef(node);
    });

    expect(node).toHaveAttribute('data-placement', 'below-start');
  });

  it('containerRef sets position-try-fallbacks to the default flip chain', () => {
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
        positioningRef: positioningRef as unknown as UsePositioningOptions['positioningRef'],
      });

      expect(positioningRef.current).not.toBeNull();
      expect(() => positioningRef.current?.updatePosition()).not.toThrow();
    });
  });
});

const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) {
    await new Promise(process.nextTick);
  }
};

const mockLayout = (
  target: { getBoundingClientRect: () => unknown },
  container: HTMLElement,
  anchor = { left: 450, top: 300, width: 100, height: 40 },
  size = { width: 200, height: 100 },
) => {
  target.getBoundingClientRect = () => ({
    ...anchor,
    x: anchor.left,
    y: anchor.top,
    right: anchor.left + anchor.width,
    bottom: anchor.top + anchor.height,
  });
  Object.defineProperty(container, 'offsetWidth', { value: size.width, configurable: true });
  Object.defineProperty(container, 'offsetHeight', { value: size.height, configurable: true });
  jest.spyOn(container, 'getBoundingClientRect').mockImplementation(() => {
    const [, x = 0, y = 0] = /translate(?:3d)?\((-?[\d.]+)px, (-?[\d.]+)px/.exec(container.style.transform) ?? [];
    const left = Number(x);
    const top = Number(y);
    return { left, top, x: left, y: top, ...size, right: left + size.width, bottom: top + size.height } as DOMRect;
  });
  jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(1000);
  jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(700);
};

describe('usePositioning with JavaScript positioning', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  const mountElements = (_result: { current: PositioningReturn }) => {
    const target = document.createElement('div');
    const container = document.createElement('div');
    document.body.append(target, container);

    return { target, container };
  };

  describe('without CSS anchor positioning', () => {
    beforeAll(() => {
      // `anchor-name` and `position-area` are not supported
      Object.defineProperty(globalThis, 'CSS', {
        value: { supports: () => false },
        configurable: true,
        writable: true,
      });
    });

    afterAll(() => {
      Object.defineProperty(globalThis, 'CSS', { value: { supports: () => true }, configurable: true, writable: true });
    });

    it('does not write anchor positioning styles', async () => {
      const result = mountHook({ position: 'below', align: 'start' });
      const { target, container } = mountElements(result);
      mockLayout(target, container);

      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);

      expect(target.style.getPropertyValue('anchor-name')).toBe('');
      expect(container.style.getPropertyValue('position-anchor')).toBe('');
      expect(container.style.getPropertyValue('position-area')).toBe('');
      expect(container.style.getPropertyValue('position-try-fallbacks')).toBe('');
      expect(container).toHaveStyle({ position: 'fixed', margin: '0px' });
    });

    it('positions the container next to the target', async () => {
      const result = mountHook({ position: 'below', align: 'start', offset: 8 });
      const { target, container } = mountElements(result);
      mockLayout(target, container);

      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);

      expect(container.style.transform).toBe('translate(450px, 348px)');
      expect(container).toHaveAttribute('data-placement', 'below-start');
    });

    it('flips when there is no room and mirrors the computed placement in data-placement', async () => {
      const result = mountHook({ position: 'above', align: 'center' });
      const { target, container } = mountElements(result);
      mockLayout(target, container, { left: 450, top: 60, width: 100, height: 40 });

      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);

      expect(container.style.transform).toBe('translate(400px, 100px)');
      expect(container).toHaveAttribute('data-placement', 'below');
    });

    it('matches the width of the target', async () => {
      const result = mountHook({ position: 'below', align: 'start', matchTargetSize: 'width' });
      const { target, container } = mountElements(result);
      mockLayout(target, container, { left: 450, top: 300, width: 120, height: 40 });

      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);

      expect(container.style.getPropertyValue('--fui-match-target-size')).toBe('120px');
    });

    it('updates the position with updatePosition()', async () => {
      const positioningRef = React.createRef<{ updatePosition: () => void }>();
      const result = mountHook({
        position: 'below',
        align: 'start',
        positioningRef: positioningRef as unknown as UsePositioningOptions['positioningRef'],
      });
      const { target, container } = mountElements(result);
      mockLayout(target, container);

      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);
      expect(container.style.transform).toBe('translate(450px, 340px)');

      mockLayout(target, container, { left: 450, top: 200, width: 100, height: 40 });
      act(() => {
        positioningRef.current?.updatePosition();
      });
      await act(flushMicrotasks);

      expect(container.style.transform).toBe('translate(450px, 240px)');
    });

    it('does not position when it is disabled', async () => {
      const result = mountHook({ position: 'below', enabled: false });
      const { target, container } = mountElements(result);
      mockLayout(target, container);

      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);

      expect(container.style.getPropertyValue('position-area')).toBe('');
      expect(container.style.getPropertyValue('position')).toBe('');
      expect(container.style.transform).toBe('');
    });
  });

  describe('with CSS anchor positioning', () => {
    it('keeps using CSS for options that CSS can handle', async () => {
      const result = mountHook({ position: 'below', offset: 4, fallbackPositions: ['above'] });
      const { target, container } = mountElements(result);
      mockLayout(target, container);

      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);

      expect(container).toHaveStyle({ positionArea: 'block-end' });
      expect(container.style.transform).toBe('');
    });

    it.each([
      ['a function offset', { offset: () => 4 }],
      ['a flip boundary', { flipBoundary: 'window' as const }],
      ['an overflow boundary', { overflowBoundary: 'window' as const }],
      ['an overflow padding', { overflowBoundaryPadding: 8 }],
    ])('positions with JavaScript using %s', async (_name, extra) => {
      const result = mountHook({ position: 'below', align: 'start', ...extra });
      const { target, container } = mountElements(result);
      mockLayout(target, container);

      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);

      expect(container.style.getPropertyValue('position-area')).toBe('');
      expect(target.style.getPropertyValue('anchor-name')).toBe('');
      expect(container.style.transform).toMatch(/^translate/);
      expect(container).toHaveAttribute('data-placement', 'below-start');
    });

    it('positions next to a virtual element', async () => {
      const virtualElement = {
        getBoundingClientRect: () =>
          ({ left: 300, top: 200, width: 0, height: 0, x: 300, y: 200, right: 300, bottom: 200 } as DOMRect),
      };
      const result = mountHook({ position: 'below', align: 'start', target: virtualElement });
      const { container } = mountElements(result);
      mockLayout({ getBoundingClientRect: () => undefined }, container);

      act(() => {
        result.current.containerRef(container);
      });
      await act(flushMicrotasks);

      // CSS can't anchor to a virtual element
      expect(container.style.getPropertyValue('position-area')).toBe('');
      expect(container.style.transform).toBe('translate(300px, 200px)');
    });

    describe('when the browser positions the container', () => {
      /** The container is below the target, aligned to its start */
      const mockBrowserPosition = (container: HTMLElement) => {
        jest
          .spyOn(container, 'getBoundingClientRect')
          .mockImplementation(
            () =>
              ({ left: 450, top: 340, x: 450, y: 340, width: 200, height: 100, right: 650, bottom: 440 } as DOMRect),
          );
      };

      const mountWithCss = async (options: Parameters<typeof mountHook>[0], arrow?: HTMLElement) => {
        const result = mountHook(options);
        const { target, container } = mountElements(result);
        if (arrow) {
          container.append(arrow);
        }
        mockLayout(target, container);
        mockBrowserPosition(container);

        act(() => {
          result.current.targetRef(target);
          result.current.containerRef(container);
          if (arrow) {
            result.current.arrowRef(arrow);
          }
        });
        // React calls the ref again when its identity changes
        act(() => {
          result.current.containerRef(container);
        });
        await act(flushMicrotasks);

        return { target, container };
      };

      it('positions the arrow', async () => {
        const arrow = document.createElement('div');
        Object.defineProperty(arrow, 'offsetWidth', { value: 10 });
        const { container } = await mountWithCss({ position: 'below', align: 'start' }, arrow);

        expect(container).toHaveStyle({ positionArea: 'block-end span-inline-end' });
        expect(container.style.transform).toBe('');
        expect(arrow).toHaveStyle({ left: '45px' });
      });

      it('limits the size with autoSize', async () => {
        const { container } = await mountWithCss({ position: 'below', align: 'start', autoSize: true });

        expect(container).toHaveStyle({ positionArea: 'block-end span-inline-end', maxHeight: '360px' });
      });

      it('calls onPositioningEnd and mirrors the placement in data-placement', async () => {
        const onPositioningEnd = jest.fn();
        const { container } = await mountWithCss({ position: 'below', align: 'start', onPositioningEnd });

        expect(onPositioningEnd).toHaveBeenCalledWith(
          expect.objectContaining({ detail: expect.objectContaining({ placement: 'bottom-start' }) }),
        );
        expect(container).toHaveAttribute('data-placement', 'below-start');
        expect(container).not.toHaveAttribute('data-positioning-hidden');
        expect(container).not.toHaveAttribute('data-positioning-escaped');
      });
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
