import { computePosition } from '@floating-ui/dom';
import type { Placement } from '@floating-ui/dom';
import { createPositionManager } from './createPositionManager';
import { POSITIONING_END_EVENT } from './constants';
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
    expect(event.detail).toEqual({ placement });
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
});
