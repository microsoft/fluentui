import { renderHook } from '@testing-library/react';
import { createPositionManager } from './createPositionManager';
import * as modular from './modular';
import { usePositioning } from './usePositioning';
import type { PositioningProps } from './types';

jest.mock('./createPositionManager', () => ({
  createPositionManager: jest.fn(() => ({ updatePosition: jest.fn(), dispose: jest.fn() })),
}));

const createPositionManagerMock = createPositionManager as jest.MockedFunction<typeof createPositionManager>;

type Options = PositioningProps & Parameters<typeof usePositioning>[0];

/**
 * Renders a hook, attaches its refs to real elements and returns the middleware names that were used.
 */
function getMiddlewareNames(useHook: (options: Options) => ReturnType<typeof usePositioning>, options: Options) {
  const { result } = renderHook(() => useHook(options));

  const container = document.createElement('div');
  const target = document.createElement('button');
  const arrow = document.createElement('div');
  document.body.append(container, target);
  container.append(arrow);

  createPositionManagerMock.mockClear();
  attachElements(result.current, { container, target, arrow });

  const { middleware } = createPositionManagerMock.mock.calls[createPositionManagerMock.mock.calls.length - 1][0];
  return middleware.map(m => m.name);
}

function attachElements(
  refs: ReturnType<typeof usePositioning>,
  elements: { container: HTMLElement; target: HTMLElement; arrow: HTMLElement },
) {
  refs.targetRef.current = elements.target;
  refs.arrowRef.current = elements.arrow;
  refs.containerRef.current = elements.container;
}

const allOptions: Options = {
  autoSize: true,
  matchTargetSize: 'width',
  offset: 4,
  coverTarget: true,
};

describe('usePositioningCore', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    createPositionManagerMock.mockClear();
  });

  it('uses every built-in plugin in the order used by usePositioning()', () => {
    const expected = [
      'resetMaxSize',
      'matchTargetSize',
      'offset',
      'coverTarget',
      'flip',
      'shift',
      'size',
      'intersectionObserver',
      'arrow',
      'hide',
      'hide',
    ];

    expect(getMiddlewareNames(usePositioning, allOptions)).toEqual(expected);
    expect(
      getMiddlewareNames(options => modular.usePositioningCore(options, modular.defaultPositioningPlugins), allOptions),
    ).toEqual(expected);
  });

  it('does not add any middleware without plugins', () => {
    expect(getMiddlewareNames(options => modular.usePositioningCore(options, []), allOptions)).toEqual([]);
  });

  it('only runs the provided plugins', () => {
    const plugins = [modular.arrowPlugin, modular.offsetPlugin, modular.flipPlugin];

    // the order of the list does not matter, plugins are ordered by their slot
    expect(getMiddlewareNames(options => modular.usePositioningCore(options, plugins), allOptions)).toEqual([
      'offset',
      'flip',
      'arrow',
    ]);
  });

  it('skips plugins that are not required by the options', () => {
    const plugins = modular.defaultPositioningPlugins;

    expect(getMiddlewareNames(options => modular.usePositioningCore(options, plugins), { pinned: true })).toEqual([
      'shift',
      'intersectionObserver',
      'arrow',
      'hide',
      'hide',
    ]);
  });

  it('uses the documented slots', () => {
    const context = {
      container: document.createElement('div'),
      arrow: document.createElement('div'),
      isRtl: false,
      options: { autoSize: true, matchTargetSize: 'width', offset: 4, coverTarget: true } as const,
    };
    const orderOf = (plugin: modular.PositioningPlugin) => {
      const created = plugin(context);
      return (Array.isArray(created) ? created : [created]).map(entry => entry && entry.order);
    };
    const { POSITIONING_PLUGIN_ORDER: order } = modular;

    expect(orderOf(modular.autoSizePlugin)).toEqual([order.resetAutoSize, order.autoSize]);
    expect(orderOf(modular.matchTargetSizePlugin)).toEqual([order.matchTargetSize]);
    expect(orderOf(modular.offsetPlugin)).toEqual([order.offset]);
    expect(orderOf(modular.coverTargetPlugin)).toEqual([order.coverTarget]);
    expect(orderOf(modular.flipPlugin)).toEqual([order.flip]);
    expect(orderOf(modular.shiftPlugin)).toEqual([order.shift]);
    expect(orderOf(modular.intersectingPlugin)).toEqual([order.intersecting]);
    expect(orderOf(modular.arrowPlugin)).toEqual([order.arrow]);
    expect(orderOf(modular.hidePlugin)).toEqual([order.hide, order.hide]);
  });

  it('orders custom plugins using their slot', () => {
    const custom: modular.PositioningPlugin = () => ({
      order: modular.POSITIONING_PLUGIN_ORDER.flip + 1,
      middleware: { name: 'custom', fn: () => ({}) },
    });
    const plugins = [modular.shiftPlugin, custom, modular.flipPlugin];

    expect(getMiddlewareNames(options => modular.usePositioningCore(options, plugins), {})).toEqual([
      'flip',
      'custom',
      'shift',
    ]);
  });

  it('warns when the list of plugins changes between renders', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    const { rerender } = renderHook(() => modular.usePositioningCore({}, [modular.offsetPlugin]));

    expect(warn).not.toHaveBeenCalled();

    rerender();

    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain('list of plugins changed');
    warn.mockRestore();
  });
});
