/* eslint-disable @typescript-eslint/naming-convention */
import { devtools } from '@floating-ui/devtools';
import { arrow as arrowMiddleware, hide as hideMiddleware } from '@floating-ui/dom';

import {
  coverTarget as coverTargetMiddleware,
  flip as flipMiddleware,
  intersecting as intersectingMiddleware,
  matchTargetSize as matchTargetSizeMiddleware,
  maxSize as maxSizeMiddleware,
  offset as offsetMiddleware,
  resetMaxSize as resetMaxSizeMiddleware,
  shift as shiftMiddleware,
} from './middleware';
import { resolvePositioningOptions } from './resolvePositioningOptions';

jest.mock('./middleware', () => ({
  coverTarget: jest.fn(() => ({ name: 'coverTarget' })),
  flip: jest.fn(() => ({ name: 'flip' })),
  intersecting: jest.fn(() => ({ name: 'intersecting' })),
  matchTargetSize: jest.fn(() => ({ name: 'matchTargetSize' })),
  maxSize: jest.fn(() => ({ name: 'maxSize' })),
  offset: jest.fn(() => ({ name: 'offset' })),
  resetMaxSize: jest.fn(() => ({ name: 'resetMaxSize' })),
  shift: jest.fn(() => ({ name: 'shift' })),
}));

jest.mock('@floating-ui/dom', () => ({
  arrow: jest.fn(() => ({ name: 'arrow' })),
  hide: jest.fn(({ strategy }: { strategy: string }) => ({ name: `hide:${strategy}` })),
}));

jest.mock('@floating-ui/devtools', () => ({
  devtools: jest.fn(() => ({ name: 'devtools' })),
}));

const arrowMiddlewareMock = arrowMiddleware as jest.MockedFunction<typeof arrowMiddleware>;
const coverTargetMiddlewareMock = coverTargetMiddleware as jest.MockedFunction<typeof coverTargetMiddleware>;
const devtoolsMock = devtools as jest.MockedFunction<typeof devtools>;
const flipMiddlewareMock = flipMiddleware as jest.MockedFunction<typeof flipMiddleware>;
const hideMiddlewareMock = hideMiddleware as jest.MockedFunction<typeof hideMiddleware>;
const intersectingMiddlewareMock = intersectingMiddleware as jest.MockedFunction<typeof intersectingMiddleware>;
const matchTargetSizeMiddlewareMock = matchTargetSizeMiddleware as jest.MockedFunction<
  typeof matchTargetSizeMiddleware
>;
const maxSizeMiddlewareMock = maxSizeMiddleware as jest.MockedFunction<typeof maxSizeMiddleware>;
const offsetMiddlewareMock = offsetMiddleware as jest.MockedFunction<typeof offsetMiddleware>;
const resetMaxSizeMiddlewareMock = resetMaxSizeMiddleware as jest.MockedFunction<typeof resetMaxSizeMiddleware>;
const shiftMiddlewareMock = shiftMiddleware as jest.MockedFunction<typeof shiftMiddleware>;

function createContainer() {
  const container = document.createElement('div');
  document.body.appendChild(container);
  return container;
}

describe('resolvePositioningOptions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('uses default flip and shift behavior', () => {
    const container = createContainer();

    const result = resolvePositioningOptions({
      container,
      arrow: null,
      targetDocument: document,
    });

    expect(result.placement).toBeUndefined();
    expect(result.strategy).toBe('absolute');
    expect(result.middleware.map(middleware => middleware.name)).toEqual([
      'flip',
      'shift',
      'intersecting',
      'hide:referenceHidden',
      'hide:escaped',
      'devtools',
    ]);
    expect(flipMiddlewareMock).toHaveBeenCalledWith(
      expect.objectContaining({
        container,
        fallbackStrategy: 'bestFit',
        hasScrollableElement: false,
        isRtl: false,
      }),
    );
    expect(shiftMiddlewareMock).toHaveBeenCalledWith(
      expect.objectContaining({
        container,
        hasScrollableElement: false,
        isRtl: false,
      }),
    );
    expect(intersectingMiddlewareMock).toHaveBeenCalledTimes(1);
    expect(hideMiddlewareMock).toHaveBeenNthCalledWith(1, { strategy: 'referenceHidden' });
    expect(hideMiddlewareMock).toHaveBeenNthCalledWith(2, { strategy: 'escaped' });
    expect(devtoolsMock).toHaveBeenCalledWith(document, expect.any(Function));
    expect(arrowMiddlewareMock).not.toHaveBeenCalled();
  });

  it('uses fixed positioning when positionFixed is set and strategy is omitted', () => {
    const container = createContainer();

    const result = resolvePositioningOptions({
      container,
      arrow: null,
      positionFixed: true,
    });

    expect(result.strategy).toBe('fixed');
  });

  it('honors native parity overrides without changing explicit strategy', () => {
    const container = createContainer();
    const arrow = document.createElement('div');

    const result = resolvePositioningOptions({
      align: 'top',
      arrow,
      arrowPadding: 12,
      autoSize: 'height',
      container,
      coverTarget: true,
      dir: 'rtl',
      disableUpdateOnResize: true,
      fallbackPositions: ['above', 'below-end'],
      matchTargetSize: 'width',
      offset: 4,
      position: 'before',
      positionFixed: true,
      strategy: 'absolute',
      targetDocument: document,
      unstable_disableShift: true,
      unstable_flipFallbackStrategy: 'initialPlacement',
      useTransform: false,
    });

    expect(result.placement).toBe('right-start');
    expect(result.strategy).toBe('absolute');
    expect(result.disableUpdateOnResize).toBe(true);
    expect(result.useTransform).toBe(false);
    expect(result.middleware.map(middleware => middleware.name)).toEqual([
      'resetMaxSize',
      'matchTargetSize',
      'offset',
      'coverTarget',
      'flip',
      'maxSize',
      'intersecting',
      'arrow',
      'hide:referenceHidden',
      'hide:escaped',
      'devtools',
    ]);
    expect(resetMaxSizeMiddlewareMock).toHaveBeenCalledWith({ applyMaxWidth: false, applyMaxHeight: true });
    expect(matchTargetSizeMiddlewareMock).toHaveBeenCalledTimes(1);
    expect(offsetMiddlewareMock).toHaveBeenCalledWith(4);
    expect(coverTargetMiddlewareMock).toHaveBeenCalledTimes(1);
    expect(flipMiddlewareMock).toHaveBeenCalledWith(
      expect.objectContaining({
        container,
        fallbackPositions: ['above', 'below-end'],
        fallbackStrategy: 'initialPlacement',
        hasScrollableElement: false,
        isRtl: true,
      }),
    );
    expect(shiftMiddlewareMock).not.toHaveBeenCalled();
    expect(maxSizeMiddlewareMock).toHaveBeenCalledWith(
      { applyMaxWidth: false, applyMaxHeight: true },
      expect.objectContaining({ container, isRtl: true }),
    );
    expect(intersectingMiddlewareMock).toHaveBeenCalledTimes(1);
    expect(arrowMiddlewareMock).toHaveBeenCalledWith({ element: arrow, padding: 12 });
  });
});
