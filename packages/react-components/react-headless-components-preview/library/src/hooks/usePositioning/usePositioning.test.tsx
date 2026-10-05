import * as React from 'react';
import { act, render } from '@testing-library/react';
import { usePositioning } from './usePositioning';
import { getPlacementString } from './utils/placement';
import type { PositioningProps, PositioningReturn } from './types';

// jsdom doesn't implement `CSS.supports()`, these tests cover the CSS anchor positioning path
beforeAll(() => {
  Object.defineProperty(globalThis, 'CSS', { value: { supports: () => true }, configurable: true, writable: true });
});

afterAll(() => {
  Reflect.deleteProperty(globalThis, 'CSS');
});

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
        positioningRef: positioningRef as unknown as PositioningProps['positioningRef'],
      });

      expect(positioningRef.current).not.toBeNull();
      expect(() => positioningRef.current?.updatePosition()).not.toThrow();
    });
  });
});

describe('usePositioning without CSS anchor positioning', () => {
  let supports: jest.Mock;

  beforeAll(() => {
    // `anchor-name` and `position-area` are not supported
    supports = jest.fn(() => false);
    Object.defineProperty(globalThis, 'CSS', { value: { supports }, configurable: true, writable: true });
  });

  afterAll(() => {
    Reflect.deleteProperty(globalThis, 'CSS');
  });

  const mockLayout = (
    target: HTMLElement,
    container: HTMLElement,
    anchor: { left: number; top: number; width: number; height: number },
    size: { width: number; height: number },
  ) => {
    target.getBoundingClientRect = () =>
      ({
        ...anchor,
        x: anchor.left,
        y: anchor.top,
        right: anchor.left + anchor.width,
        bottom: anchor.top + anchor.height,
      } as DOMRect);
    Object.defineProperty(container, 'offsetWidth', { value: size.width, configurable: true });
    Object.defineProperty(container, 'offsetHeight', { value: size.height, configurable: true });
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 700, configurable: true });
  };

  it('does not write anchor positioning styles', () => {
    const result = mountHook({ position: 'below', align: 'start' });
    const target = document.createElement('div');
    const container = document.createElement('div');

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });

    expect(target.style.getPropertyValue('anchor-name')).toBe('');
    expect(container.style.getPropertyValue('position-anchor')).toBe('');
    expect(container.style.getPropertyValue('position-area')).toBe('');
    expect(container.style.getPropertyValue('position-try-fallbacks')).toBe('');
    expect(container).toHaveStyle({ position: 'fixed', margin: '0px' });
  });

  it('positions the container next to the target', () => {
    const result = mountHook({ position: 'below', align: 'start', offset: 8 });
    const target = document.createElement('div');
    const container = document.createElement('div');
    document.body.append(target, container);
    mockLayout(target, container, { left: 450, top: 300, width: 100, height: 40 }, { width: 200, height: 100 });

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });

    expect(container).toHaveStyle({ position: 'fixed', left: '450px', top: '348px' });
    expect(container).toHaveAttribute('data-placement', 'below-start');
  });

  it('flips when there is no room and mirrors the resolved placement in data-placement', () => {
    const result = mountHook({ position: 'above', align: 'center' });
    const target = document.createElement('div');
    const container = document.createElement('div');
    document.body.append(target, container);
    mockLayout(target, container, { left: 450, top: 60, width: 100, height: 40 }, { width: 200, height: 100 });

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });

    expect(container).toHaveStyle({ left: '400px', top: '100px' });
    expect(container).toHaveAttribute('data-placement', 'below');
  });

  it('matches the width of the target', () => {
    const result = mountHook({ position: 'below', align: 'start', matchTargetSize: 'width' });
    const target = document.createElement('div');
    const container = document.createElement('div');
    document.body.append(target, container);
    mockLayout(target, container, { left: 450, top: 300, width: 120, height: 40 }, { width: 120, height: 100 });

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });

    expect(container).toHaveStyle({ width: '120px' });
  });

  it('updates the position with updatePosition()', () => {
    const positioningRef = React.createRef<{ updatePosition: () => void }>();
    const result = mountHook({
      position: 'below',
      positioningRef: positioningRef as unknown as PositioningProps['positioningRef'],
    });
    const target = document.createElement('div');
    const container = document.createElement('div');
    document.body.append(target, container);
    mockLayout(target, container, { left: 450, top: 300, width: 100, height: 40 }, { width: 100, height: 100 });

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });
    expect(container).toHaveStyle({ top: '340px' });

    mockLayout(target, container, { left: 450, top: 200, width: 100, height: 40 }, { width: 100, height: 100 });
    act(() => positioningRef.current?.updatePosition());

    expect(container).toHaveStyle({ top: '240px' });
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
