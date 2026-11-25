import { computePosition } from './utils/computePosition';
import { createPositionManager as createPositionManagerImpl } from './createPositionManager';
import { DATA_POSITIONING_PLACEMENT, POSITIONING_END_EVENT } from './constants';
import type { OnPositioningEndEvent, PositioningPlacement, PositionManager } from './types';

jest.mock('./utils/computePosition', () => ({
  computePosition: jest.fn(),
}));

const computePositionMock = computePosition as jest.MockedFunction<typeof computePosition>;
const managers: PositionManager[] = [];
const createPositionManager: typeof createPositionManagerImpl = options => {
  const manager = createPositionManagerImpl(options);
  managers.push(manager);
  return manager;
};

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

const mockVisibility = { intersecting: false, escaped: false, referenceHidden: false };

describe('createPositionManager', () => {
  beforeEach(() => {
    computePositionMock.mockReset();
  });

  afterEach(() => {
    managers.splice(0).forEach(manager => manager.dispose());
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('listens to ancestor scrolls once and detaches when disposed', async () => {
    computePositionMock.mockResolvedValue({ x: 0, y: 0, placement: 'bottom', ...mockVisibility });
    const { container, target } = createTestElements();
    const positioned = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, positioned);
    const scroller = document.body.appendChild(document.createElement('div'));
    scroller.style.overflowY = 'auto';
    scroller.appendChild(target);
    const add = jest.spyOn(document, 'addEventListener');
    const remove = jest.spyOn(document, 'removeEventListener');
    const manager = createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'fixed',
      options: { disableUpdateOnResize: true },
    });
    await flushMicrotasks();

    scroller.dispatchEvent(new Event('scroll'));
    await flushMicrotasks();
    document.body.dispatchEvent(new Event('scroll'));
    await flushMicrotasks();
    expect(positioned).toHaveBeenCalledTimes(3);
    expect(add.mock.calls.filter(([type]) => type === 'scroll')).toHaveLength(1);
    const scrollListener = add.mock.calls.find(([type]) => type === 'scroll')?.[1];
    expect(add).toHaveBeenCalledWith('scroll', scrollListener, { capture: true, passive: true });

    manager.dispose();
    expect(remove).toHaveBeenCalledWith('scroll', scrollListener, true);
    scroller.dispatchEvent(new Event('scroll'));
    document.body.dispatchEvent(new Event('scroll'));
    await flushMicrotasks();
    expect(positioned).toHaveBeenCalledTimes(3);
  });

  describe('scroll ancestry changes', () => {
    const startManager = async (target?: Parameters<typeof createPositionManager>[0]['target']) => {
      computePositionMock.mockResolvedValue({ x: 0, y: 0, placement: 'bottom', ...mockVisibility });
      const elements = createTestElements();
      const manager = createPositionManager({
        ...elements,
        target: target ?? elements.target,
        arrow: null,
        strategy: 'fixed',
        options: { disableUpdateOnResize: true },
      });
      await flushMicrotasks();
      computePositionMock.mockClear();
      return { ...elements, manager };
    };
    const createScroller = (parent: Node = document.body) => {
      const scroller = document.createElement('div');
      scroller.style.overflow = 'auto';
      parent.appendChild(scroller);
      return scroller;
    };
    const scroll = async (element: Element) => {
      element.dispatchEvent(new Event('scroll'));
      await flushMicrotasks();
    };

    it('follows an ancestor that becomes scrollable without rebuilding subscriptions', async () => {
      const { target, manager } = await startManager();
      const scroller = createScroller();
      scroller.style.overflow = 'visible';
      scroller.appendChild(target);
      manager.updatePosition();
      await flushMicrotasks();
      computePositionMock.mockClear();
      const add = jest.spyOn(document, 'addEventListener');
      const getComputedStyle = jest.spyOn(window, 'getComputedStyle');

      scroller.style.overflow = 'auto';
      manager.updatePosition();
      await flushMicrotasks();
      await scroll(scroller);

      expect(computePositionMock).toHaveBeenCalledTimes(2);
      expect(add).not.toHaveBeenCalled();
      expect(getComputedStyle).not.toHaveBeenCalled();
    });

    it('follows a new light-DOM ancestor and ignores the old ancestor and unrelated scrollers', async () => {
      const { target } = await startManager();
      const first = createScroller();
      const second = createScroller();
      first.appendChild(target);
      await scroll(first);
      second.appendChild(target);
      await scroll(first);
      await scroll(createScroller());
      expect(computePositionMock).toHaveBeenCalledTimes(1);

      await scroll(second);
      expect(computePositionMock).toHaveBeenCalledTimes(2);
    });

    it('follows nested shadow-root and slotted ancestors', async () => {
      const { target, manager } = await startManager();
      const outerHost = createScroller();
      const outerRoot = outerHost.attachShadow({ mode: 'closed' });
      const outerScroller = createScroller(outerRoot);
      const innerHost = createScroller(outerScroller);
      const innerRoot = innerHost.attachShadow({ mode: 'open' });
      const innerScroller = createScroller(innerRoot);
      innerScroller.appendChild(document.createElement('slot'));
      innerHost.appendChild(target);
      manager.updatePosition();
      await flushMicrotasks();
      computePositionMock.mockClear();

      await scroll(innerScroller);
      await scroll(outerScroller);
      await scroll(outerHost);
      expect(computePositionMock).toHaveBeenCalledTimes(3);
    });

    it('refreshes shadow roots on an update and removes retired subscriptions and all subscriptions on dispose', async () => {
      const { target, manager } = await startManager();
      const firstRoot = createScroller().attachShadow({ mode: 'open' });
      const secondRoot = createScroller().attachShadow({ mode: 'closed' });
      const firstScroller = createScroller(firstRoot);
      const secondScroller = createScroller(secondRoot);
      const removeFirst = jest.spyOn(firstRoot, 'removeEventListener');
      const removeSecond = jest.spyOn(secondRoot, 'removeEventListener');
      firstScroller.appendChild(target);
      manager.updatePosition();
      await flushMicrotasks();
      secondScroller.appendChild(target);
      manager.updatePosition();
      await flushMicrotasks();
      computePositionMock.mockClear();

      expect(removeFirst).toHaveBeenCalledWith('scroll', expect.any(Function), true);
      await scroll(firstScroller);
      expect(computePositionMock).not.toHaveBeenCalled();
      await scroll(secondScroller);
      expect(computePositionMock).toHaveBeenCalledTimes(1);

      manager.dispose();
      manager.updatePosition();
      expect(removeSecond).toHaveBeenCalledWith('scroll', expect.any(Function), true);
      await scroll(secondScroller);
      expect(computePositionMock).toHaveBeenCalledTimes(1);
    });

    it('uses a virtual target context element to follow its scroll ancestors', async () => {
      const scroller = createScroller();
      const contextElement = scroller.appendChild(document.createElement('span'));
      const { manager } = await startManager({
        contextElement,
        getBoundingClientRect: () => contextElement.getBoundingClientRect(),
      });
      await scroll(scroller);
      expect(computePositionMock).toHaveBeenCalledTimes(1);

      manager.dispose();
      await startManager({ getBoundingClientRect: () => contextElement.getBoundingClientRect() });
      await scroll(scroller);
      expect(computePositionMock).not.toHaveBeenCalled();
    });

    it('follows the target in a different document and coalesces viewport notifications', async () => {
      const iframe = document.body.appendChild(document.createElement('iframe'));
      const targetDocument = iframe.contentDocument!;
      const target = targetDocument.body.appendChild(targetDocument.createElement('button'));
      const scroller = targetDocument.body.appendChild(targetDocument.createElement('div'));
      scroller.appendChild(target);
      const remove = jest.spyOn(targetDocument, 'removeEventListener');
      const { manager } = await startManager(target);
      await scroll(scroller);
      expect(computePositionMock).toHaveBeenCalledTimes(1);

      computePositionMock.mockClear();
      document.dispatchEvent(new Event('scroll'));
      window.dispatchEvent(new Event('scroll'));
      await flushMicrotasks();
      expect(computePositionMock).toHaveBeenCalledTimes(1);

      manager.dispose();
      expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function), true);
    });
  });

  it('does not try to observe elements in documents without a window', async () => {
    const doc = document.implementation.createHTMLDocument();
    expect(doc.defaultView).toBeNull();
    const manager = createPositionManager({
      container: doc.createElement('div'),
      target: doc.createElement('button'),
      arrow: null,
      strategy: 'absolute',
    });
    manager.updatePosition();
    await flushMicrotasks();
    manager.dispose();
    expect(computePositionMock).not.toHaveBeenCalled();
  });

  it.each<PositioningPlacement>([
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
  ])('dispatches POSITIONING_END_EVENT with placement "%s"', async placement => {
    computePositionMock.mockResolvedValue({
      x: 10,
      y: 20,
      placement,
      ...mockVisibility,
    });

    const { container, target } = createTestElements();
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'absolute',
      placement,
      options: { disableUpdateOnResize: true },
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
      ...mockVisibility,
    });

    const { container, target } = createTestElements();
    const listener = jest.fn();
    container.addEventListener(POSITIONING_END_EVENT, listener);

    createPositionManager({
      container,
      target,
      arrow: null,
      strategy: 'absolute',
      placement: 'top',
      options: { disableUpdateOnResize: true },
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
      ...mockVisibility,
      escaped: true,
      referenceHidden: true,
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
      placement: 'bottom',
      options: { disableUpdateOnResize: true },
    });

    await flushMicrotasks();

    const event: OnPositioningEndEvent = listener.mock.calls[0][0];
    expect(event.detail).toEqual({ placement: 'bottom', escaped: true, referenceHidden: true });
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
      placement: 'bottom',
      options: { disableUpdateOnResize: true },
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
      ...mockVisibility,
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

    const computedPosition = (placement: PositioningPlacement, y: number): ComputedPosition => ({
      x: 10,
      y,
      placement,
      ...mockVisibility,
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
        placement: 'top',
        options: { disableUpdateOnResize: true },
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
