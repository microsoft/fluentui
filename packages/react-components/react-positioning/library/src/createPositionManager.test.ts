import { computePosition } from './floating';
import type { Placement } from './floating';
import { createPositionManager } from './createPositionManager';
import { DATA_POSITIONING_ESCAPED, DATA_POSITIONING_HIDDEN, POSITIONING_END_EVENT } from './constants';
import type { OnPositioningEndEvent } from './types';

jest.mock('./floating', () => ({
  computePosition: jest.fn(),
}));

const computePositionMock = computePosition as jest.MockedFunction<typeof computePosition>;

/**
 * Flush the microtask queue.
 * createPositionManager uses debounce (Promise.resolve().then → forceUpdate),
 * which then computes the position and dispatches the event synchronously.
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
    computePositionMock.mockReturnValue({
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
    computePositionMock.mockReturnValue({
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
    computePositionMock.mockReturnValue({
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
    computePositionMock.mockReturnValue({
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

  it('does not compute position or dispatch event after dispose', async () => {
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

    // Dispose before the debounced update fires
    manager.dispose();

    await flushMicrotasks();

    expect(computePositionMock).not.toHaveBeenCalled();
    expect(listener).not.toHaveBeenCalled();
  });
});
