import { computePosition } from './engine/computePosition';
import type { Placement } from './engine/types';
import { createPositionManager } from './createPositionManager';
import { POSITIONING_END_EVENT } from './constants';
import type { OnPositioningEndEvent } from './types';

jest.mock('./engine/computePosition', () => ({
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

const mockVisibility = { intersecting: false, escaped: false, referenceHidden: false };

describe('createPositionManager', () => {
  beforeEach(() => {
    computePositionMock.mockReset();
  });

  afterEach(() => {
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
    const add = jest.spyOn(scroller, 'addEventListener');
    const remove = jest.spyOn(scroller, 'removeEventListener');
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
    expect(add).toHaveBeenCalledTimes(1);
    expect(add).toHaveBeenCalledWith('scroll', manager.updatePosition, { passive: true });

    manager.dispose();
    expect(remove).toHaveBeenCalledWith('scroll', manager.updatePosition);
    scroller.dispatchEvent(new Event('scroll'));
    document.body.dispatchEvent(new Event('scroll'));
    await flushMicrotasks();
    expect(positioned).toHaveBeenCalledTimes(3);
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
});
