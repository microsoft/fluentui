import { computePosition } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';
import { createPositionManager } from './createPositionManager';
import {
  DATA_POSITIONING_ESCAPED,
  DATA_POSITIONING_HIDDEN,
  DATA_POSITIONING_PLACEMENT,
  POSITIONING_END_EVENT,
} from './constants';
import type { OnPositioningEndEvent } from './types';

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

  describe('when position computations overlap', () => {
    type ComputedPosition = Awaited<ReturnType<typeof computePosition>>;
    type PendingComputation = { resolve: (position: ComputedPosition) => void; reject: (error: Error) => void };

    // Lets every pending microtask run, whatever the number of promise steps involved
    const settle = () =>
      new Promise<void>(resolve => {
        setTimeout(resolve, 0);
      });

    // Every computePosition() call stays pending until the test resolves or rejects it
    const deferComputations = () => {
      const computations: PendingComputation[] = [];
      computePositionMock.mockImplementation(
        () =>
          new Promise<ComputedPosition>((resolve, reject) => {
            computations.push({ resolve, reject });
          }),
      );

      return computations;
    };

    const computedPosition = (placement: Placement, y: number): ComputedPosition => ({
      x: 10,
      y,
      placement,
      strategy: 'absolute',
      middlewareData: mockMiddlewareData,
    });

    const listenToPositioningEnd = (container: HTMLElement) => {
      const placements: string[] = [];
      container.addEventListener(POSITIONING_END_EVENT, event => {
        placements.push((event as OnPositioningEndEvent).detail.placement);
      });

      return placements;
    };

    const createManager = (container: HTMLElement, target: HTMLElement) =>
      createPositionManager({
        container,
        target,
        arrow: null,
        strategy: 'absolute',
        middleware: [],
        placement: 'top',
        disableUpdateOnResize: true,
      });

    // Starts a manager whose initial computation is still pending when a second computation starts
    const startOverlappingComputations = async () => {
      const computations = deferComputations();
      const { container, target } = createTestElements();
      const placements = listenToPositioningEnd(container);
      const manager = createManager(container, target);
      await settle();
      manager.updatePosition();
      await settle();
      expect(computations).toHaveLength(2);

      return { computations, container, manager, placements };
    };

    it('applies only the latest computation when an older one resolves after it', async () => {
      const { computations, container, placements } = await startOverlappingComputations();

      computations[1].resolve(computedPosition('top', 20));
      await settle();
      computations[0].resolve(computedPosition('bottom', 60));
      await settle();

      expect(placements).toEqual(['top']);
      expect(container.getAttribute(DATA_POSITIONING_PLACEMENT)).toBe('top');
      expect(container.style.transform).toBe('translate(10px, 20px)');
    });

    it('does not apply an older computation that resolves before the latest one', async () => {
      const { computations, container, placements } = await startOverlappingComputations();

      computations[0].resolve(computedPosition('bottom', 60));
      await settle();

      expect(placements).toEqual([]);
      expect(container.hasAttribute(DATA_POSITIONING_PLACEMENT)).toBe(false);

      computations[1].resolve(computedPosition('top', 20));
      await settle();

      expect(placements).toEqual(['top']);
      expect(container.style.transform).toBe('translate(10px, 20px)');
    });

    it('applies every computation that starts after the previous one resolved', async () => {
      const computations = deferComputations();
      const { container, target } = createTestElements();
      const placements = listenToPositioningEnd(container);
      const manager = createManager(container, target);
      await settle();
      computations[0].resolve(computedPosition('bottom', 60));
      await settle();

      manager.updatePosition();
      await settle();
      computations[1].resolve(computedPosition('top', 20));
      await settle();

      expect(placements).toEqual(['bottom', 'top']);
      expect(container.style.transform).toBe('translate(10px, 20px)');
    });

    it('does not fall back to an older computation when the latest one fails, and recovers on the next update', async () => {
      const { computations, container, manager, placements } = await startOverlappingComputations();

      computations[1].reject(new Error('Failed to compute the position'));
      await settle();
      computations[0].resolve(computedPosition('bottom', 60));
      await settle();

      expect(placements).toEqual([]);
      expect(container.hasAttribute(DATA_POSITIONING_PLACEMENT)).toBe(false);
      expect(container.style.transform).toBe('');

      manager.updatePosition();
      await settle();
      computations[2].resolve(computedPosition('top', 20));
      await settle();

      expect(placements).toEqual(['top']);
      expect(container.style.transform).toBe('translate(10px, 20px)');
    });

    it('does not apply the latest computation after dispose', async () => {
      const { computations, container, manager, placements } = await startOverlappingComputations();

      manager.dispose();
      computations[1].resolve(computedPosition('top', 20));
      computations[0].resolve(computedPosition('bottom', 60));
      await settle();

      expect(placements).toEqual([]);
      expect(container.hasAttribute(DATA_POSITIONING_PLACEMENT)).toBe(false);
      expect(container.style.transform).toBe('');
    });

    it('keeps the computation of a disposed manager inert after the manager that replaced it applied its own', async () => {
      // usePositioning() disposes the manager and creates a new one when the target changes
      const computations = deferComputations();
      const { container, target } = createTestElements();
      const placements = listenToPositioningEnd(container);
      const replacedManager = createManager(container, target);
      await settle();
      replacedManager.dispose();
      const newTarget = document.createElement('button');
      document.body.appendChild(newTarget);
      createManager(container, newTarget);
      await settle();
      expect(computations).toHaveLength(2);

      computations[1].resolve(computedPosition('top', 20));
      await settle();
      computations[0].resolve(computedPosition('bottom', 60));
      await settle();

      expect(placements).toEqual(['top']);
      expect(container.style.transform).toBe('translate(10px, 20px)');
    });
  });
});
