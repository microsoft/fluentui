import { createPositionManager } from './createPositionManager';
import {
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_PLACEMENT,
  POSITIONING_END_EVENT,
} from './constants';
import type { OnPositioningEndEvent, PositioningPlacement } from './types';

/**
 * Flush the microtask queue, `createPositionManager` debounces updates with a promise.
 */
const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) {
    await new Promise(process.nextTick);
  }
};

type Rect = { left: number; top: number; width: number; height: number };

const toDOMRect = ({ left, top, width, height }: Rect) =>
  ({ left, top, width, height, x: left, y: top, right: left + width, bottom: top + height } as DOMRect);

function createTestElements({
  target: targetRect = { left: 450, top: 300, width: 100, height: 40 },
  size = { width: 200, height: 100 },
}: { target?: Rect; size?: { width: number; height: number } } = {}) {
  const container = document.createElement('div');
  const target = document.createElement('button');

  document.body.appendChild(container);
  document.body.appendChild(target);

  jest.spyOn(target, 'getBoundingClientRect').mockImplementation(() => toDOMRect(targetRect));
  // The container is moved by the manager, the rect follows the transform
  jest.spyOn(container, 'getBoundingClientRect').mockImplementation(() => {
    const [, x = 0, y = 0] = /translate(?:3d)?\((-?[\d.]+)px, (-?[\d.]+)px/.exec(container.style.transform) ?? [];
    return toDOMRect({ left: Number(x), top: Number(y), ...size });
  });
  Object.defineProperty(container, 'offsetWidth', { value: size.width, configurable: true });
  Object.defineProperty(container, 'offsetHeight', { value: size.height, configurable: true });

  return { container, target };
}

const mockViewport = (width = 1000, height = 700) => {
  jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(width);
  jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(height);
};

describe('createPositionManager', () => {
  beforeEach(() => {
    mockViewport();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it.each([
    ['above', 'center', 'top'],
    ['above', 'start', 'top-start'],
    ['above', 'end', 'top-end'],
    ['below', 'center', 'bottom'],
    ['below', 'start', 'bottom-start'],
    ['below', 'end', 'bottom-end'],
    ['before', 'center', 'left'],
    ['before', 'top', 'left-start'],
    ['before', 'bottom', 'left-end'],
    ['after', 'center', 'right'],
    ['after', 'top', 'right-start'],
    ['after', 'bottom', 'right-end'],
  ] as const)(
    'dispatches POSITIONING_END_EVENT for position "%s" and align "%s" as "%s"',
    async (position, align, placement: PositioningPlacement) => {
      const { container, target } = createTestElements();
      const listener = jest.fn();
      container.addEventListener(POSITIONING_END_EVENT, listener);

      createPositionManager({
        container,
        target,
        arrow: null,
        strategy: 'fixed',
        position,
        align,
        disableUpdateOnResize: true,
      });

      await flushMicrotasks();

      expect(listener).toHaveBeenCalledTimes(1);

      const event: OnPositioningEndEvent = listener.mock.calls[0][0];

      expect(event).toBeInstanceOf(CustomEvent);
      expect(event.type).toBe(POSITIONING_END_EVENT);
      expect(event.detail).toEqual({ placement, escaped: false, referenceHidden: false });
      expect(container.getAttribute(DATA_POSITIONING_PLACEMENT)).toBe(placement);
    },
  );

  it('swaps the sides of before and after in rtl', async () => {
    const { container, target } = createTestElements();
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'before',
      isRtl: true,
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(listener.mock.calls[0][0].detail.placement).toBe('right');
    // The container is on the right side of the target
    expect(container.style.transform).toBe('translate(550px, 270px)');
  });

  it('positions the container next to the target', async () => {
    const { container, target } = createTestElements();

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      align: 'start',
      offset: 8,
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(container).toHaveStyle({ position: 'fixed', left: '0px', top: '0px' });
    expect(container.style.transform).toBe('translate(450px, 348px)');
  });

  it('writes left and top without useTransform', async () => {
    const { container, target } = createTestElements();

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      align: 'start',
      useTransform: false,
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(container).toHaveStyle({ left: '450px', top: '340px' });
    expect(container.style.transform).toBe('');
  });

  it('flips when there is no room and reports the computed placement', async () => {
    const { container, target } = createTestElements({ target: { left: 450, top: 60, width: 100, height: 40 } });
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'above',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(listener.mock.calls[0][0].detail.placement).toBe('bottom');
    expect(container.style.transform).toBe('translate(400px, 100px)');
  });

  it('does not flip when it is pinned', async () => {
    const { container, target } = createTestElements({ target: { left: 450, top: 60, width: 100, height: 40 } });
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'above',
      pinned: true,
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(listener.mock.calls[0][0].detail.placement).toBe('top');
  });

  it('tries the fallback positions before the default ones', async () => {
    const { container, target } = createTestElements({ target: { left: 450, top: 60, width: 100, height: 40 } });
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'above',
      fallbackPositions: ['after-top'],
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(listener.mock.calls[0][0].detail.placement).toBe('right-start');
  });

  it('calls function offsets with the placement that is tried', async () => {
    const { container, target } = createTestElements();
    const offset = jest.fn(() => 12);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      align: 'start',
      offset,
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(offset).toHaveBeenCalledWith({
      positionedRect: { x: 0, y: 0, width: 200, height: 100 },
      targetRect: { x: 450, y: 300, width: 100, height: 40 },
      position: 'below',
      alignment: 'start',
    });
    expect(container.style.transform).toBe('translate(450px, 352px)');
  });

  it('positions next to a virtual element', async () => {
    const { container } = createTestElements();
    const target = {
      getBoundingClientRect: () => ({ ...toDOMRect({ left: 300, top: 200, width: 0, height: 0 }) }),
    };

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      align: 'start',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(container.style.transform).toBe('translate(300px, 200px)');
  });

  it('positions relative to the document with the absolute strategy', async () => {
    const { container, target } = createTestElements();
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'absolute',
      position: 'below',
      align: 'start',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(container.style.transform).toBe('translate(450px, 440px)');
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('matches the width of the target', async () => {
    const { container, target } = createTestElements({ size: { width: 120, height: 100 } });

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      align: 'start',
      matchTargetSize: 'width',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(container.style.getPropertyValue('--fui-match-target-size')).toBe('100px');
    expect(container.style.width).toBe('var(--fui-match-target-size)');
  });

  it('limits the size of the container with autoSize', async () => {
    const { container, target } = createTestElements();

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      autoSize: 'height',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(container.style.maxHeight).toBe('360px');
    expect(container.style.boxSizing).toBe('border-box');
  });

  it('positions the arrow', async () => {
    const { container, target } = createTestElements();
    const arrow = document.createElement('div');
    Object.defineProperty(arrow, 'offsetWidth', { value: 10 });
    container.appendChild(arrow);

    createPositionManager({
      container,
      target,
      arrow,
      strategy: 'fixed',
      position: 'below',
      align: 'start',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    // The container starts where the target does, the arrow points to the center of the target
    expect(arrow).toHaveStyle({ left: '45px' });
  });

  it('sets the visibility attributes', async () => {
    const { container, target } = createTestElements({ target: { left: 450, top: -100, width: 100, height: 40 } });

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'above',
      pinned: true,
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(container.hasAttribute(DATA_POSITIONING_HIDDEN)).toBe(true);
    expect(container.hasAttribute(DATA_POSITIONING_ESCAPED)).toBe(true);
  });

  it('dispatches event with the visibility flags', async () => {
    const { container, target } = createTestElements({ target: { left: 450, top: -100, width: 100, height: 40 } });
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'above',
      pinned: true,
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(listener.mock.calls[0][0].detail).toEqual({ placement: 'top', escaped: true, referenceHidden: true });
  });

  it('does not report hide flags when the layout viewport is unavailable', async () => {
    mockViewport(0, 0);
    const { container, target } = createTestElements({ target: { left: 450, top: -100, width: 100, height: 40 } });
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'above',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    const event: OnPositioningEndEvent = listener.mock.calls[0][0];
    expect(event.detail.escaped).toBe(false);
    expect(event.detail.referenceHidden).toBe(false);
    expect(container.hasAttribute(DATA_POSITIONING_ESCAPED)).toBe(false);
    expect(container.hasAttribute(DATA_POSITIONING_HIDDEN)).toBe(false);
  });

  it('updates the position with updatePosition()', async () => {
    const targetRect = { left: 450, top: 300, width: 100, height: 40 };
    const { container, target } = createTestElements({ target: targetRect });

    const manager = createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      align: 'start',
      disableUpdateOnResize: true,
    });
    await flushMicrotasks();
    expect(container.style.transform).toBe('translate(450px, 340px)');

    targetRect.top = 200;
    manager.updatePosition();
    await flushMicrotasks();

    expect(container.style.transform).toBe('translate(450px, 240px)');
  });

  it('does not dispatch event after dispose', async () => {
    const { container, target } = createTestElements();
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    const manager = createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      disableUpdateOnResize: true,
    });

    // The first update is scheduled but didn't run yet
    manager.dispose();
    await flushMicrotasks();

    expect(listener).not.toHaveBeenCalled();
  });
  it('uses the direction of the containing block when isRtl is not set', async () => {
    const { container, target } = createTestElements();
    document.body.setAttribute('dir', 'rtl');
    jest.spyOn(window, 'getComputedStyle').mockReturnValue({ direction: 'rtl' } as CSSStyleDeclaration);
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'before',
      disableUpdateOnResize: true,
    });
    await flushMicrotasks();

    expect(listener.mock.calls[0][0].detail.placement).toBe('right');
    document.body.removeAttribute('dir');
  });

  it('writes the attributes with the given names', async () => {
    const { container, target } = createTestElements({ target: { left: 450, top: -500, width: 100, height: 40 } });

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      disableUpdateOnResize: true,
      attributes: { placement: '', hidden: 'data-hidden', escaped: 'data-escaped', intersecting: '' },
    });
    await flushMicrotasks();

    expect(container.hasAttribute(DATA_POSITIONING_PLACEMENT)).toBe(false);
    expect(container.hasAttribute(DATA_POSITIONING_HIDDEN)).toBe(false);
    expect(container.hasAttribute('data-hidden')).toBe(true);
  });

  it('calls onPlacement with the placement', async () => {
    const { container, target } = createTestElements();
    const onPlacement = jest.fn();

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      position: 'below',
      align: 'end',
      disableUpdateOnResize: true,
      onPlacement,
    });
    await flushMicrotasks();

    expect(onPlacement).toHaveBeenCalledWith(expect.objectContaining({ position: 'below', align: 'end' }));
  });

  describe('when the browser positions the container', () => {
    it('does not move the container, it reads the placement and handles the arrow and the end event', async () => {
      const { container, target } = createTestElements();
      const arrow = document.createElement('div');
      Object.defineProperty(arrow, 'offsetWidth', { value: 10 });
      container.append(arrow);
      const listener = jest.fn();
      container.addEventListener(POSITIONING_END_EVENT, listener);
      jest
        .spyOn(container, 'getBoundingClientRect')
        .mockReturnValue(toDOMRect({ left: 450, top: 340, width: 200, height: 100 }));

      createPositionManager({
        container,
        target,
        arrow,
        strategy: 'fixed',
        position: 'below',
        disableUpdateOnResize: true,
        detectPlacement: () => ({ position: 'below', align: 'start' }),
      });
      await flushMicrotasks();

      expect(container.style.position).toBe('');
      expect(container.style.transform).toBe('');
      expect(container.hasAttribute(DATA_POSITIONING_PLACEMENT)).toBe(false);
      expect(arrow.style.left).toBe('45px');
      expect(listener.mock.calls[0][0].detail.placement).toBe('bottom-start');
    });

    it('does not dispatch the end event when the placement can not be detected', async () => {
      const { container, target } = createTestElements();
      const listener = jest.fn();
      container.addEventListener(POSITIONING_END_EVENT, listener);

      createPositionManager({
        container,
        target,
        arrow: null,
        strategy: 'fixed',
        disableUpdateOnResize: true,
        detectPlacement: () => null,
      });
      await flushMicrotasks();

      expect(listener).not.toHaveBeenCalled();
    });

    it('limits the size with autoSize', async () => {
      const { container, target } = createTestElements();

      createPositionManager({
        container,
        target,
        arrow: null,
        strategy: 'fixed',
        position: 'below',
        autoSize: 'height',
        disableUpdateOnResize: true,
        detectPlacement: () => ({ position: 'below', align: 'center' }),
      });
      await flushMicrotasks();

      expect(container.style.maxHeight).toBe('360px');
    });
  });
});
