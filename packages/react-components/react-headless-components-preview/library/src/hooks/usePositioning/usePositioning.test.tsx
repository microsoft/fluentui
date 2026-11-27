import * as React from 'react';
import { act, render } from '@testing-library/react';
import { usePositioning as useFloatingPositioning } from '@fluentui/react-positioning';
import { usePositioning } from './usePositioning';
import { getPlacementString } from './utils/placement';
import type { PositioningReturn, UsePositioningOptions } from './types';

jest.mock('@fluentui/react-positioning', () => {
  const actual = jest.requireActual('@fluentui/react-positioning');
  return { ...actual, usePositioning: jest.fn(actual.usePositioning) };
});

const useFloatingPositioningMock = useFloatingPositioning as jest.Mock;

// jsdom doesn't implement `CSS.supports()`. Only anchor positioning is supported, other features (e.g. selectors that
// `@fluentui/react-positioning` checks) are not.
const supportsAnchorPositioning = (condition: string) => condition.includes('anchor-name');

// These tests cover the CSS anchor positioning path
beforeAll(() => {
  Object.defineProperty(globalThis, 'CSS', {
    value: { supports: supportsAnchorPositioning },
    configurable: true,
    writable: true,
  });
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
  const view = render(<Capture />);
  return {
    get current() {
      return (resultRef as unknown as { current: PositioningReturn }).current;
    },
    rerender: (next: UsePositioningOptions) => {
      options = next;
      view.rerender(<Capture />);
    },
    unmount: view.unmount,
  };
}

describe('usePositioning', () => {
  it('returns targetRef and containerRef callbacks', () => {
    const result = mountHook();

    expect(typeof result.current.targetRef).toBe('function');
    expect(typeof result.current.containerRef).toBe('function');
  });

  it('targetRef writes anchor-name onto the trigger element once a container is attached', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.targetRef(node);
      result.current.containerRef(document.createElement('div'));
    });

    expect(node.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);
  });

  it('does not touch the trigger while no container is attached (closed overlay)', () => {
    const result = mountHook();
    const node = document.createElement('div');

    act(() => {
      result.current.targetRef(node);
    });

    expect(node.style.getPropertyValue('anchor-name')).toBe('');
  });

  it('releases a trigger removed while the overlay is closed', () => {
    const result = mountHook();
    const node = document.createElement('div');
    const container = document.createElement('div');

    // Open: anchor-name is written onto the trigger.
    act(() => {
      result.current.targetRef(node);
      result.current.containerRef(container);
    });
    expect(node.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);

    // Close, then remove the trigger: its anchor-name is cleaned up instead of lingering on the detached node.
    act(() => {
      result.current.containerRef(null);
    });
    act(() => {
      result.current.targetRef(null);
    });
    expect(node.style.getPropertyValue('anchor-name')).toBe('');
  });

  it('appends to anchor-name so multiple instances can share one trigger', () => {
    // Two popovers (e.g. a Tooltip and a Menu) attached to the same trigger.
    const first = mountHook();
    const second = mountHook();
    const node = document.createElement('div');

    act(() => {
      first.current.targetRef(node);
      second.current.targetRef(node);
      first.current.containerRef(document.createElement('div'));
      second.current.containerRef(document.createElement('div'));
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
      result.current.containerRef(document.createElement('div'));
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
const lastFloatingOptions = (): UsePositioningOptions => {
  const { calls } = useFloatingPositioningMock.mock;
  return calls[calls.length - 1][0];
};

// Floating UI computes the position asynchronously
const flushPositioning = () =>
  act(async () => {
    await new Promise<void>(resolve => {
      setTimeout(resolve);
    });
  });

const mockRect = (
  element: { getBoundingClientRect: () => unknown },
  rect: { left: number; top: number; width: number; height: number },
) => {
  element.getBoundingClientRect = () =>
    ({ ...rect, x: rect.left, y: rect.top, right: rect.left + rect.width, bottom: rect.top + rect.height } as DOMRect);
  if ('getClientRects' in element) {
    (element as HTMLElement).getClientRects = () => [element.getBoundingClientRect()] as unknown as DOMRectList;
  }
};

describe('usePositioning without CSS anchor positioning', () => {
  beforeAll(() => {
    // `anchor-name` and `position-area` are not supported
    Object.defineProperty(globalThis, 'CSS', { value: { supports: () => false }, configurable: true, writable: true });
  });

  afterAll(() => {
    Reflect.deleteProperty(globalThis, 'CSS');
  });

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
    expect(container).toHaveAttribute('data-placement', 'below-start');
  });

  it('positions with usePositioning() from @fluentui/react-positioning', async () => {
    const onPositioningEnd = jest.fn();
    const result = mountHook({ position: 'below', align: 'start', offset: 8, onPositioningEnd });
    const target = document.createElement('div');
    const container = document.createElement('div');
    document.body.append(target, container);

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });
    expect(lastFloatingOptions()).toMatchObject({ position: 'below', align: 'start', offset: 8, enabled: true });

    await flushPositioning();

    expect(container).toHaveStyle({ position: 'fixed' });
    expect(container).toHaveAttribute('data-popper-placement', 'bottom-start');
    expect(onPositioningEnd).toHaveBeenCalledWith(
      expect.objectContaining({ detail: expect.objectContaining({ placement: 'bottom-start' }) }),
    );

    target.remove();
    container.remove();
  });

  it('mirrors the placement in data-placement after the container is positioned', async () => {
    const result = mountHook({ position: 'above' });
    const target = document.createElement('div');
    const container = document.createElement('div');
    document.body.append(target, container);
    mockRect(target, { left: 450, top: 60, width: 100, height: 40 });
    // The container flipped below the target
    mockRect(container, { left: 400, top: 100, width: 200, height: 100 });

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });
    await flushPositioning();

    expect(container).toHaveAttribute('data-placement', 'below');

    target.remove();
    container.remove();
  });

  it('updates the position with updatePosition()', () => {
    const positioningRef = React.createRef<{ updatePosition: () => void }>();
    mountHook({ positioningRef: positioningRef as unknown as UsePositioningOptions['positioningRef'] });
    const floatingPositioningRef = lastFloatingOptions().positioningRef as React.RefObject<{
      updatePosition: () => void;
    }>;
    const updatePosition = jest.spyOn(floatingPositioningRef.current!, 'updatePosition');

    positioningRef.current?.updatePosition();

    expect(updatePosition).toHaveBeenCalledTimes(1);
  });
});

describe('usePositioning with options that need JavaScript', () => {
  beforeAll(() => {
    Object.defineProperty(globalThis, 'CSS', {
      value: { supports: supportsAnchorPositioning },
      configurable: true,
      writable: true,
    });
  });

  afterAll(() => {
    Reflect.deleteProperty(globalThis, 'CSS');
  });

  const mountWithTargets = (options: UsePositioningOptions) => {
    const result = mountHook(options);
    const target = document.createElement('div');
    const container = document.createElement('div');

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });

    return { result, target, container };
  };

  it('delegates the resolved above default with the headless strategy', async () => {
    const { target, container } = mountWithTargets({ autoSize: true });
    document.body.append(target, container);
    await flushPositioning();

    expect(lastFloatingOptions()).toMatchObject({ position: 'above', strategy: 'fixed', enabled: true });
    expect(container).toHaveAttribute('data-popper-placement', 'top');
    target.remove();
    container.remove();
  });

  it('removes exact shared anchor names on handoff and unmount, not prefixes', async () => {
    const { result, target } = mountWithTargets({});
    const ownName = target.style.getPropertyValue('anchor-name');
    const otherName = `${ownName}0`;
    target.style.setProperty('anchor-name', `${otherName}, ${ownName}, --consumer`);

    result.rerender({ autoSize: true });
    await flushPositioning();
    expect(target.style.getPropertyValue('anchor-name')).toBe(`${otherName}, --consumer`);

    result.rerender({});
    expect(target.style.getPropertyValue('anchor-name')).toBe(`${otherName}, --consumer, ${ownName}`);
    result.unmount();
    expect(target.style.getPropertyValue('anchor-name')).toBe(`${otherName}, --consumer`);
  });

  it('releases CSS anchor width before JS target sizing, and restores it on the reverse handoff', async () => {
    const { result, target, container } = mountWithTargets({ matchTargetSize: 'width' });
    document.body.append(target, container);
    mockRect(target, { left: 450, top: 300, width: 100, height: 40 });
    mockRect(container, { left: 450, top: 340, width: 100, height: 100 });
    // jsdom doesn't parse anchor-size(); the browser regression verifies the CSS width itself.
    const setProperty = jest.spyOn(container.style, 'setProperty');

    result.rerender({ matchTargetSize: 'width', offset: () => 4 });
    await flushPositioning();
    expect(container.style.width).toBe('var(--fui-match-target-size)');
    expect(container.style.getPropertyValue('--fui-match-target-size')).toBe('100px');

    result.rerender({ matchTargetSize: 'width' });
    expect(setProperty).toHaveBeenCalledWith('width', 'anchor-size(width)');
    expect(container.style.getPropertyValue('--fui-match-target-size')).toBe('');
    result.unmount();
    expect(container.style.width).toBe('');
    target.remove();
    container.remove();
  });

  it.each([true, 'height', 'width'] as const)(
    'restores consumer sizing and overflow after autoSize %s on handoff and unmount',
    async autoSize => {
      const result = mountHook({ autoSize });
      const target = document.createElement('div');
      const container = document.createElement('div');
      container.style.cssText =
        'width:25px;height:30px;max-width:300px;max-height:400px;box-sizing:content-box;overflow-x:scroll;overflow-y:hidden;transform:scale(1)';
      const original = [
        'width',
        'height',
        'max-width',
        'max-height',
        'box-sizing',
        'overflow-x',
        'overflow-y',
        'transform',
      ];
      const values = original.map(property => container.style.getPropertyValue(property));
      document.body.append(target, container);
      mockRect(target, { left: 450, top: 300, width: 100, height: 40 });
      mockRect(container, { left: 450, top: 340, width: 25, height: 30 });
      act(() => {
        result.current.targetRef(target);
        result.current.containerRef(container);
      });
      await flushPositioning();
      expect(container.style.boxSizing).toBe('border-box');

      result.rerender({});
      expect(original.map(property => container.style.getPropertyValue(property))).toEqual(values);

      result.rerender({ autoSize });
      await flushPositioning();
      result.unmount();
      expect(original.map(property => container.style.getPropertyValue(property))).toEqual(values);
      target.remove();
      container.remove();
    },
  );

  it('preserves newer consumer sizing overrides instead of restoring over them', async () => {
    const { result, target, container } = mountWithTargets({ autoSize: true });
    document.body.append(target, container);
    await flushPositioning();
    container.style.setProperty('height', '123px', 'important');
    container.style.setProperty('overflow-x', 'hidden');

    result.rerender({});

    expect(container.style.height).toBe('123px');
    expect(container.style.getPropertyPriority('height')).toBe('important');
    expect(container.style.overflowX).toBe('hidden');
    target.remove();
    container.remove();
  });

  it.each([
    [{}, 'top'],
    [{ coverTarget: true }, 'top'],
    [{ position: 'below', align: 'start', coverTarget: true }, 'bottom-start'],
    [{ position: 'below', align: 'end', offset: -20 }, 'bottom-end'],
  ] as const)('dispatches CSS completion once to the container and callback with %j', async (options, placement) => {
    const onPositioningEnd = jest.fn();
    const listener = jest.fn();
    const positioningRef = React.createRef<{ updatePosition: () => void }>();
    const { target, container } = mountWithTargets({
      ...options,
      onPositioningEnd,
      positioningRef: positioningRef as UsePositioningOptions['positioningRef'],
    });
    container.addEventListener('fui-positioningend', listener);
    document.body.append(target, container);
    mockRect(target, { left: 450, top: 300, width: 100, height: 40 });
    // Overlapping rectangles cannot detect a placement.
    mockRect(container, { left: 450, top: 310, width: 200, height: 100 });
    act(() => positioningRef.current?.updatePosition());
    await flushPositioning();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    const event = listener.mock.calls[0][0];
    expect(event.target).toBe(container);
    expect(event.detail.placement).toBe(placement);
    expect(onPositioningEnd).toHaveBeenCalledWith(event);
    target.remove();
    container.remove();
  });

  it('returns an arrowRef', () => {
    const result = mountHook({});

    expect(typeof result.current.arrowRef).toBe('function');
  });

  it('uses CSS for options that CSS can handle', () => {
    const { target, container } = mountWithTargets({
      position: 'below',
      offset: 4,
      arrowPadding: 8,
      matchTargetSize: 'width',
      fallbackPositions: ['above'],
      autoSize: false,
    });

    expect(lastFloatingOptions()).toMatchObject({ enabled: false });
    expect(target.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);
    expect(container).toHaveStyle({ positionArea: 'block-end' });
  });

  it.each([0, {}, { top: 0, end: 0, bottom: 0, start: 0 }, { bottom: undefined }])(
    'uses CSS for zero flip boundary padding %j',
    flipBoundaryPadding => {
      const { target } = mountWithTargets({ flipBoundaryPadding });

      expect(lastFloatingOptions()).toMatchObject({ enabled: false });
      expect(target.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);
    },
  );

  it.each([
    [{ position: 'above' }, 'top-start'],
    [{ align: 'end' }, 'bottom-end'],
    [{ offset: 8 }, 'bottom-start'],
    [{ offset: { mainAxis: 8, crossAxis: 4 } }, 'bottom-start'],
    [{ coverTarget: true }, 'bottom-start'],
  ] as const)('completes CSS option updates once after styles are applied: %j', async (next, placement) => {
    const onPositioningEnd = jest.fn();
    const listener = jest.fn();
    const options: UsePositioningOptions = { position: 'below', align: 'start', onPositioningEnd };
    const result = mountHook(options);
    const target = document.createElement('div');
    const container = document.createElement('div');
    container.addEventListener('fui-positioningend', listener);
    document.body.append(target, container);
    mockRect(target, { left: 450, top: 300, width: 100, height: 40 });
    // Simulate CSS layout from the applied styles, without size/intersection notifications.
    container.getBoundingClientRect = () =>
      ({
        left: 450,
        right: 650,
        top: container.style.positionArea.startsWith('block-start') ? 200 : 340,
        bottom: container.style.positionArea.startsWith('block-start') ? 300 : 440,
        width: 200,
        height: 100,
      } as DOMRect);
    container.getClientRects = () => [container.getBoundingClientRect()] as unknown as DOMRectList;
    // Overlap makes the configured alignment observable, instead of deriving it from mocked geometry.
    if ('align' in next) {
      mockRect(container, { left: 450, top: 310, width: 200, height: 100 });
    }
    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });
    await flushPositioning();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    listener.mockClear();
    onPositioningEnd.mockClear();

    result.rerender({ ...options, ...next });
    await flushPositioning();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0].detail.placement).toBe(placement);
    expect(onPositioningEnd).toHaveBeenCalledWith(listener.mock.calls[0][0]);

    // Fresh option objects and callback-driven rerenders must not schedule another completion.
    result.rerender({ ...options, ...next });
    await flushPositioning();
    expect(listener).toHaveBeenCalledTimes(1);
    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    result.unmount();
    target.remove();
    container.remove();
  });

  it.each([
    ['autoSize', { autoSize: true }],
    ['autoSize: "height"', { autoSize: 'height' as const }],
    ['a function offset', { offset: () => 4 }],
    ['a flip boundary', { flipBoundary: 'window' as const }],
    ['numeric flip boundary padding', { flipBoundaryPadding: 100 }],
    ['object flip boundary padding', { flipBoundaryPadding: { bottom: 100 } }],
    ['logical flip boundary padding', { flipBoundaryPadding: { start: 8 } }],
    ['an overflow boundary', { overflowBoundary: 'scrollParent' as const }],
    ['an overflow padding', { overflowBoundaryPadding: 8 }],
    ['shiftToCoverTarget', { shiftToCoverTarget: true }],
  ])('positions in JavaScript with %s', (_name, extra) => {
    const { target, container } = mountWithTargets({ position: 'below', align: 'start', ...extra });

    expect(lastFloatingOptions()).toMatchObject({ ...extra, enabled: true });
    expect(target.style.getPropertyValue('anchor-name')).toBe('');
    expect(container.style.getPropertyValue('position-anchor')).toBe('');
    expect(container.style.getPropertyValue('position-area')).toBe('');
  });

  it.each([
    ['above', 'start', 'start'],
    ['below', 'top', 'start'],
    ['before', 'start', 'top'],
    ['after', 'end', 'bottom'],
    ['after', 'bottom', 'bottom'],
    ['before', 'center', 'center'],
  ] as const)('passes %s-%s to @fluentui/react-positioning as %s', (position, align, expected) => {
    mountWithTargets({ position, align, autoSize: true });

    expect(lastFloatingOptions()).toMatchObject({ position, align: expected, strategy: 'fixed' });
  });

  it('positions in JavaScript when there is an arrow', () => {
    const { result, target, container } = mountWithTargets({ position: 'below' });
    expect(container).toHaveStyle({ positionArea: 'block-end' });

    act(() => {
      result.current.arrowRef(document.createElement('div'));
    });

    expect(lastFloatingOptions()).toMatchObject({ enabled: true });
    expect(target.style.getPropertyValue('anchor-name')).toBe('');
    expect(container.style.getPropertyValue('position-area')).toBe('');
    expect(container.style.getPropertyValue('margin-block-start')).toBe('');
  });

  it('positions next to a virtual element in JavaScript', () => {
    const virtualElement = { getBoundingClientRect: () => ({ left: 450, top: 300, width: 0, height: 0 } as DOMRect) };
    const { container } = mountWithTargets({ position: 'below', target: virtualElement });

    expect(lastFloatingOptions()).toMatchObject({ target: virtualElement, enabled: true });
    expect(container.style.getPropertyValue('position-area')).toBe('');
  });

  it('positions next to a virtual element set with setTarget() in JavaScript, and goes back to CSS', async () => {
    const positioningRef = React.createRef<{ setTarget: (target: unknown) => void }>();
    const { target, container } = mountWithTargets({
      position: 'below',
      positioningRef: positioningRef as unknown as UsePositioningOptions['positioningRef'],
    });
    document.body.append(target, container);
    const virtualElement = { getBoundingClientRect: () => ({ left: 450, top: 300, width: 0, height: 0 } as DOMRect) };

    act(() => {
      positioningRef.current?.setTarget(virtualElement);
    });
    await flushPositioning();

    expect(lastFloatingOptions()).toMatchObject({ target: virtualElement, enabled: true });
    expect(container).toHaveAttribute('data-popper-placement');
    expect(container.style.getPropertyValue('transform')).not.toBe('');

    act(() => {
      positioningRef.current?.setTarget(null);
    });

    // The styles of @fluentui/react-positioning are removed
    expect(lastFloatingOptions()).toMatchObject({ target: null, enabled: false });
    expect(container).not.toHaveAttribute('data-popper-placement');
    expect(container.style.getPropertyValue('transform')).toBe('');
    expect(container).toHaveStyle({ position: 'fixed', inset: 'auto', positionArea: 'block-end' });
    expect(target.style.getPropertyValue('anchor-name')).toMatch(/^--popover-anchor-/);

    target.remove();
    container.remove();
  });

  it('calls onPositioningEnd with the placement that the browser picked', async () => {
    const onPositioningEnd = jest.fn();
    const result = mountHook({ position: 'below', align: 'start', onPositioningEnd });
    const target = document.createElement('div');
    const container = document.createElement('div');
    document.body.append(target, container);
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 700, configurable: true });
    mockRect(target, { left: 450, top: 300, width: 100, height: 40 });
    mockRect(container, { left: 450, top: 340, width: 200, height: 100 });

    act(() => {
      result.current.targetRef(target);
      result.current.containerRef(container);
    });
    await act(async () => {
      await Promise.resolve();
    });

    expect(lastFloatingOptions()).toMatchObject({ enabled: false });
    expect(onPositioningEnd).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: { placement: 'bottom-start', escaped: false, referenceHidden: false },
      }),
    );

    target.remove();
    container.remove();
  });

  it('does not position when it is disabled', () => {
    const { target, container } = mountWithTargets({ position: 'below', enabled: false });

    expect(lastFloatingOptions()).toMatchObject({ enabled: false });
    expect(target.style.getPropertyValue('anchor-name')).toBe('');
    expect(container.style.getPropertyValue('position-area')).toBe('');
    expect(container.style.getPropertyValue('position')).toBe('');
  });

  it('does not position when it is disabled and needs JavaScript', () => {
    mountWithTargets({ position: 'below', autoSize: true, enabled: false });

    expect(lastFloatingOptions()).toMatchObject({ enabled: false });
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
