import { computePosition } from '@floating-ui/dom';
import { createFloatingUIPositioningEngine, floatingUIPositioningEngine } from './createFloatingUIPositioningEngine';
import { POSITIONING_END_EVENT } from './constants';
import type { OnPositioningEndEvent, PositioningConfigurationFn } from './types';

jest.mock('@floating-ui/dom', () => ({
  ...jest.requireActual('@floating-ui/dom'),
  computePosition: jest.fn(),
}));

const computePositionMock = computePosition as jest.MockedFunction<typeof computePosition>;

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

describe('createFloatingUIPositioningEngine', () => {
  beforeEach(() => {
    computePositionMock.mockReset();
    computePositionMock.mockResolvedValue({
      x: 10,
      y: 20,
      placement: 'bottom-start',
      strategy: 'fixed',
      middlewareData: {
        intersectionObserver: { intersecting: false },
        hide: { escaped: false, referenceHidden: false },
      },
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('positions the container with the resolved placement and strategy', async () => {
    const { container, target } = createTestElements();

    const manager = floatingUIPositioningEngine.create({
      container,
      target,
      arrow: null,
      options: { position: 'below', align: 'start', strategy: 'fixed' },
    });
    await flushMicrotasks();

    expect(computePositionMock).toHaveBeenCalledWith(
      target,
      container,
      expect.objectContaining({ placement: 'bottom-start', strategy: 'fixed' }),
    );
    expect(container.style.position).toBe('fixed');
    expect(container).toHaveAttribute('data-popper-placement', 'bottom-start');
    expect(container).toHaveAttribute('data-placement', 'below-start');

    manager.dispose();
  });

  it('releases the UA top-layer inset before positioning', () => {
    const { container, target } = createTestElements();
    container.style.inset = '0px';

    const manager = floatingUIPositioningEngine.create({ container, target, arrow: null, options: {} });

    expect(container.style.getPropertyValue('inset')).toBe('auto');

    manager.dispose();
  });

  it('writes a logical data-placement in rtl', async () => {
    const { container, target } = createTestElements();
    computePositionMock.mockResolvedValue({
      x: 0,
      y: 0,
      placement: 'left-start',
      strategy: 'fixed',
      middlewareData: {
        intersectionObserver: { intersecting: false },
        hide: { escaped: false, referenceHidden: false },
      },
    });

    const manager = floatingUIPositioningEngine.create({ container, target, arrow: null, dir: 'rtl', options: {} });
    await flushMicrotasks();

    expect(container).toHaveAttribute('data-placement', 'after-top');

    manager.dispose();
  });

  it('honors rtl direction when resolving the placement', async () => {
    const { container, target } = createTestElements();

    const manager = floatingUIPositioningEngine.create({
      container,
      target,
      arrow: null,
      dir: 'rtl',
      options: { position: 'after', align: 'top' },
    });
    await flushMicrotasks();

    expect(computePositionMock).toHaveBeenCalledWith(
      target,
      container,
      expect.objectContaining({ placement: 'left-start' }),
    );

    manager.dispose();
  });

  it('subscribes onPositioningEnd and unsubscribes on dispose', async () => {
    const { container, target } = createTestElements();
    const onPositioningEnd = jest.fn<void, [OnPositioningEndEvent]>();

    const manager = floatingUIPositioningEngine.create({
      container,
      target,
      arrow: null,
      options: { onPositioningEnd },
    });
    await flushMicrotasks();

    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    expect(onPositioningEnd.mock.calls[0][0].detail.placement).toBe('bottom-start');

    manager.dispose();
    container.dispatchEvent(new CustomEvent(POSITIONING_END_EVENT, { detail: { placement: 'top' } }));

    expect(onPositioningEnd).toHaveBeenCalledTimes(1);
    expect(container).toHaveAttribute('data-placement', 'below-start');
  });

  it('does nothing when enabled is false', async () => {
    const { container, target } = createTestElements();

    const manager = floatingUIPositioningEngine.create({
      container,
      target,
      arrow: null,
      options: { enabled: false },
    });
    await flushMicrotasks();

    expect(computePositionMock).not.toHaveBeenCalled();
    expect(() => manager.updatePosition()).not.toThrow();
    expect(() => manager.dispose()).not.toThrow();
  });

  it('runs the configuration function over the merged options', async () => {
    const { container, target } = createTestElements();
    const configuration = jest.fn<ReturnType<PositioningConfigurationFn>, Parameters<PositioningConfigurationFn>>(
      ({ options }) => ({ ...options, position: 'above' }),
    );
    const engine = createFloatingUIPositioningEngine({ configuration });

    const manager = engine.create({
      container,
      target,
      arrow: null,
      options: { position: 'below', autoSize: true },
    });
    await flushMicrotasks();

    expect(configuration).toHaveBeenCalledWith(
      expect.objectContaining({
        container,
        arrow: null,
        options: expect.objectContaining({ position: 'below', autoSize: true }),
      }),
    );
    expect(computePositionMock).toHaveBeenCalledWith(target, container, expect.objectContaining({ placement: 'top' }));

    manager.dispose();
  });
});
