import { computePosition } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';
import { createPositionManager } from './createPositionManager';
import { DATA_POSITIONING_ESCAPED, DATA_POSITIONING_HIDDEN, POSITIONING_END_EVENT } from './constants';
import type { OnPositioningEndEvent, PositionManager } from './types';

jest.mock('@floating-ui/dom', () => ({
  computePosition: jest.fn(),
}));

const computePositionMock = computePosition as jest.MockedFunction<typeof computePosition>;

/**
 * Flush the microtask queue.
 * createPositionManager uses debounce (Promise.resolve().then → forceUpdate)
 * followed by computePosition(...).then → dispatch event, requiring multiple
 * microtask cycles to fully resolve.
 */
const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) {
    await new Promise(process.nextTick);
  }
};

function createTestElements() {
  const container = document.createElement('div');
  const target = document.createElement('button');

  document.body.appendChild(container);
  document.body.appendChild(target);

  return { container, target };
}

const mockMiddlewareData = {
  intersectionObserver: { intersecting: false },
  hide: { escaped: false, referenceHidden: false },
};

describe('createPositionManager', () => {
  beforeEach(() => {
    computePositionMock.mockReset();
  });

  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it.each([
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end',
  ] as Placement[])('dispatches POSITIONING_END_EVENT with placement "%s"', async (placement: Placement) => {
    computePositionMock.mockResolvedValue({
      x: 10,
      y: 20,
      placement,
      strategy: 'absolute',
      middlewareData: mockMiddlewareData,
    });

    const { container, target } = createTestElements();
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'absolute',
      middleware: [],
      placement,
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(listener).toHaveBeenCalledTimes(1);

    const event: OnPositioningEndEvent = listener.mock.calls[0][0];

    expect(event).toBeInstanceOf(CustomEvent);
    expect(event.type).toBe(POSITIONING_END_EVENT);
    expect(event.detail).toEqual({ placement, escaped: false, referenceHidden: false });
  });

  it('dispatches event with computed placement when middleware changes it', async () => {
    // Request 'top' but middleware flips to 'bottom'
    computePositionMock.mockResolvedValue({
      x: 10,
      y: 20,
      placement: 'bottom',
      strategy: 'absolute',
      middlewareData: mockMiddlewareData,
    });

    const { container, target } = createTestElements();
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'absolute',
      middleware: [],
      placement: 'top',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    expect(listener).toHaveBeenCalledTimes(1);

    const event: OnPositioningEndEvent = listener.mock.calls[0][0];

    expect(event.detail.placement).toBe('bottom');
    expect(event.detail.escaped).toBe(false);
    expect(event.detail.referenceHidden).toBe(false);
  });

  it('dispatches event with hide middleware visibility flags', async () => {
    computePositionMock.mockResolvedValue({
      x: 10,
      y: 20,
      placement: 'bottom',
      strategy: 'absolute',
      middlewareData: {
        ...mockMiddlewareData,
        hide: { escaped: true, referenceHidden: true },
      },
    });

    const { container, target } = createTestElements();
    const measurableRect = {
      top: 0,
      right: 10,
      bottom: 10,
      left: 0,
      width: 10,
      height: 10,
    } as DOMRect;
    jest.spyOn(container, 'getBoundingClientRect').mockReturnValue(measurableRect);
    jest.spyOn(target, 'getBoundingClientRect').mockReturnValue(measurableRect);
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(10);
    jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(10);
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'absolute',
      middleware: [],
      placement: 'bottom',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    const event: OnPositioningEndEvent = listener.mock.calls[0][0];
    expect(event.detail).toEqual({ placement: 'bottom', escaped: true, referenceHidden: true });
  });

  it('does not report hide flags when the layout viewport is unavailable', async () => {
    computePositionMock.mockResolvedValue({
      x: 0,
      y: 0,
      placement: 'bottom',
      strategy: 'absolute',
      middlewareData: {
        ...mockMiddlewareData,
        hide: { escaped: true, referenceHidden: true },
      },
    });

    const { container, target } = createTestElements();
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'absolute',
      middleware: [],
      placement: 'bottom',
      disableUpdateOnResize: true,
    });

    await flushMicrotasks();

    const event: OnPositioningEndEvent = listener.mock.calls[0][0];
    expect(event.detail).toEqual({ placement: 'bottom', escaped: false, referenceHidden: false });
    expect(container.hasAttribute(DATA_POSITIONING_ESCAPED)).toBe(false);
    expect(container.hasAttribute(DATA_POSITIONING_HIDDEN)).toBe(false);
  });

  it('does not dispatch event after dispose', async () => {
    // Use a deferred promise so we can control when computePosition resolves
    let resolveCompute!: (value: Awaited<ReturnType<typeof computePosition>>) => void;

    computePositionMock.mockImplementation(
      () =>
        new Promise(resolve => {
          resolveCompute = resolve;
        }),
    );

    const { container, target } = createTestElements();
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    const manager = createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'absolute',
      middleware: [],
      placement: 'bottom',
      disableUpdateOnResize: true,
    });

    // Let debounce microtask fire so computePosition is called
    await flushMicrotasks();

    // Dispose before the promise resolves
    manager.dispose();

    // Now resolve the pending computePosition
    resolveCompute({
      x: 10,
      y: 20,
      placement: 'bottom',
      strategy: 'absolute',
      middlewareData: mockMiddlewareData,
    });

    // Allow the .then() to run
    await flushMicrotasks();

    expect(listener).not.toHaveBeenCalled();
  });

  describe('ancestor animations', () => {
    type TestAnimation = {
      playState: AnimationPlayState;
      playbackRate: number;
      effect: { getComputedTiming: jest.Mock } | null;
    };

    let frames: Map<number, FrameRequestCallback>;
    let managers: PositionManager[];
    let nextFrame: number;

    const createAnimation = (overrides: Partial<TestAnimation> = {}): TestAnimation => ({
      playState: 'running',
      playbackRate: 1,
      effect: { getComputedTiming: jest.fn().mockReturnValue({ endTime: 250 }) },
      ...overrides,
    });

    const mockAnimations = (element: Element, animations: TestAnimation[]) => {
      const getAnimations = jest.fn(() => animations);
      Object.defineProperty(element, 'getAnimations', { configurable: true, value: getAnimations });
      return getAnimations;
    };

    const createManager = (options: Partial<Parameters<typeof createPositionManager>[0]> = {}) => {
      const elements = createTestElements();
      const manager = createPositionManager({
        ...elements,
        arrow: null,
        strategy: 'absolute',
        middleware: [],
        disableUpdateOnResize: true,
        ...options,
      });
      managers.push(manager);
      return { ...elements, manager };
    };

    const nextAnimationFrame = async () => {
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach(callback => callback(0));
      await flushMicrotasks();
    };

    beforeEach(() => {
      frames = new Map();
      managers = [];
      nextFrame = 0;
      jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
        const id = ++nextFrame;
        frames.set(id, callback);
        return id;
      });
      jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => {
        frames.delete(id);
      });
      computePositionMock.mockResolvedValue({
        x: 10,
        y: 20,
        placement: 'bottom',
        strategy: 'absolute',
        middlewareData: mockMiddlewareData,
      });
    });

    afterEach(() => {
      managers.forEach(manager => manager.dispose());
    });

    it('discovers ancestor motion after construction and follows a portaled target', async () => {
      const ancestor = document.createElement('div');
      document.body.appendChild(ancestor);
      const { target, container } = createManager();
      ancestor.appendChild(target);
      mockAnimations(ancestor, [createAnimation()]);

      await flushMicrotasks();
      expect(container.parentElement).toBe(document.body);
      expect(computePositionMock).toHaveBeenCalledTimes(1);
      expect(frames.size).toBe(1);

      await nextAnimationFrame();
      expect(computePositionMock).toHaveBeenCalledTimes(2);
      expect(frames.size).toBe(1);
    });

    it('follows container motion and deduplicates shared ancestors', async () => {
      const { container, target, manager } = createManager();
      const getAnimations = mockAnimations(document.body, []);
      mockAnimations(container, [createAnimation()]);
      await flushMicrotasks();
      expect(frames.size).toBe(1);

      mockAnimations(container, []);
      mockAnimations(target, []);
      getAnimations.mockClear();
      manager.updatePosition();
      await flushMicrotasks();
      expect(getAnimations).toHaveBeenCalledTimes(1);
      expect(frames.size).toBe(0);
    });

    it('coalesces frame and ordinary updates without scheduling duplicate frames', async () => {
      const { target, manager } = createManager();
      mockAnimations(target, [createAnimation()]);
      await flushMicrotasks();
      manager.updatePosition();
      manager.updatePosition();
      await flushMicrotasks();
      expect(frames.size).toBe(1);
      expect(computePositionMock).toHaveBeenCalledTimes(2);

      const callback = [...frames.values()][0];
      frames.clear();
      callback(0);
      manager.updatePosition();
      await flushMicrotasks();
      expect(computePositionMock).toHaveBeenCalledTimes(3);
      expect(frames.size).toBe(1);
    });

    it.each(['finished', 'idle', 'paused'] as const)(
      'performs a final update when motion becomes %s',
      async playState => {
        const animation = createAnimation();
        const { target } = createManager();
        mockAnimations(target, [animation]);
        await flushMicrotasks();
        animation.playState = playState;

        await nextAnimationFrame();
        expect(computePositionMock).toHaveBeenCalledTimes(2);
        expect(frames.size).toBe(0);
      },
    );

    it('follows nested and replaced animations until all motion has stopped', async () => {
      const first = createAnimation();
      const second = createAnimation();
      const { target } = createManager();
      const animations = [first];
      mockAnimations(target, animations);
      await flushMicrotasks();
      first.playState = 'finished';
      animations.push(second);
      await nextAnimationFrame();
      expect(frames.size).toBe(1);

      animations.length = 0;
      await nextAnimationFrame();
      expect(computePositionMock).toHaveBeenCalledTimes(3);
      expect(frames.size).toBe(0);
    });

    it.each([
      { playState: 'finished' as const },
      { playState: 'paused' as const },
      { playState: 'idle' as const },
      { playbackRate: 0 },
      { effect: null },
      { effect: { getComputedTiming: jest.fn().mockReturnValue({ endTime: Infinity }) } },
    ])('does not poll inactive or infinite motion: %p', async overrides => {
      const { target } = createManager();
      mockAnimations(target, [createAnimation(overrides)]);
      await flushMicrotasks();
      expect(computePositionMock).toHaveBeenCalledTimes(1);
      expect(frames.size).toBe(0);
    });

    it('retains normal positioning when getAnimations is unavailable', async () => {
      createManager();
      await flushMicrotasks();
      expect(computePositionMock).toHaveBeenCalledTimes(1);
      expect(frames.size).toBe(0);
    });

    it.each([true, false])('supports a virtual reference with contextElement: %s', async hasContext => {
      const element = document.createElement('span');
      document.body.appendChild(element);
      mockAnimations(element, [createAnimation()]);
      createManager({
        target: {
          getBoundingClientRect: () => element.getBoundingClientRect(),
          contextElement: hasContext ? element : undefined,
        },
      });
      await flushMicrotasks();
      expect(frames.size).toBe(hasContext ? 1 : 0);
    });

    it.each([true, false])('walks shadow hosts and assigned slots: slotted=%s', async slotted => {
      const host = document.createElement('div');
      document.body.appendChild(host);
      const shadowRoot = host.attachShadow({ mode: 'open' });
      const wrapper = document.createElement('div');
      const slot = document.createElement('slot');
      wrapper.appendChild(slot);
      shadowRoot.appendChild(wrapper);
      const { target } = createManager();
      (slotted ? host : wrapper).appendChild(target);
      mockAnimations(slotted ? wrapper : host, [createAnimation()]);
      await flushMicrotasks();
      expect(frames.size).toBe(1);
    });

    it('discovers later motion on an ordinary update, without idle polling', async () => {
      const { target, manager } = createManager();
      await flushMicrotasks();
      mockAnimations(target, [createAnimation()]);
      expect(frames.size).toBe(0);
      manager.updatePosition();
      await flushMicrotasks();
      expect(frames.size).toBe(1);
    });

    it('ignores stale async results, including results preceding the final correction', async () => {
      const pending: Array<(value: Awaited<ReturnType<typeof computePosition>>) => void> = [];
      computePositionMock.mockImplementation(
        () =>
          new Promise(resolve => {
            pending.push(resolve);
          }),
      );
      const animation = createAnimation();
      const { target, container } = createManager();
      const listener = jest.fn();
      container.addEventListener(POSITIONING_END_EVENT, listener);
      mockAnimations(target, [animation]);
      await flushMicrotasks();
      await nextAnimationFrame();
      animation.playState = 'finished';
      await nextAnimationFrame();

      for (const index of [2, 0, 1]) {
        pending[index]({
          x: index * 10,
          y: index * 20,
          placement: 'bottom',
          strategy: 'absolute',
          middlewareData: mockMiddlewareData,
        });
        await flushMicrotasks();
      }
      expect(container.style.transform).toBe('translate(20px, 40px)');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(frames.size).toBe(0);
    });

    it('cancels pending frames and ignores callbacks after disposal', async () => {
      const { target, manager } = createManager();
      mockAnimations(target, [createAnimation()]);
      await flushMicrotasks();
      const callback = [...frames.values()][0];
      manager.dispose();
      expect(window.cancelAnimationFrame).toHaveBeenCalledTimes(1);
      expect(frames.size).toBe(0);
      callback(0);
      await flushMicrotasks();
      expect(computePositionMock).toHaveBeenCalledTimes(1);
    });
  });
});
