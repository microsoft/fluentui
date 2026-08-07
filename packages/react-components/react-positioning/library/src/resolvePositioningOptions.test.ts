import { arrow as arrowMiddleware, hide as hideMiddleware } from '@floating-ui/dom';
import { devtools } from '@floating-ui/devtools';

import { coverTarget, flip, intersecting, matchTargetSize, maxSize, offset, resetMaxSize, shift } from './middleware';
import { resolvePositioningOptions } from './resolvePositioningOptions';
import type { PositioningConfigurationFn } from './types';

jest.mock('@floating-ui/dom', () => ({
  arrow: jest.fn(() => ({ name: 'arrow' })),
  hide: jest.fn(({ strategy }: { strategy: string }) => ({ name: `hide:${strategy}` })),
}));

jest.mock('@floating-ui/devtools', () => ({
  devtools: jest.fn(() => ({ name: 'devtools' })),
}));

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

const arrowMiddlewareMock = arrowMiddleware as jest.MockedFunction<typeof arrowMiddleware>;
const coverTargetMock = coverTarget as jest.MockedFunction<typeof coverTarget>;
const devtoolsMock = devtools as jest.MockedFunction<typeof devtools>;
const flipMock = flip as jest.MockedFunction<typeof flip>;
const hideMiddlewareMock = hideMiddleware as jest.MockedFunction<typeof hideMiddleware>;
const intersectingMock = intersecting as jest.MockedFunction<typeof intersecting>;
const matchTargetSizeMock = matchTargetSize as jest.MockedFunction<typeof matchTargetSize>;
const maxSizeMock = maxSize as jest.MockedFunction<typeof maxSize>;
const offsetMock = offset as jest.MockedFunction<typeof offset>;
const resetMaxSizeMock = resetMaxSize as jest.MockedFunction<typeof resetMaxSize>;
const shiftMock = shift as jest.MockedFunction<typeof shift>;

describe('resolvePositioningOptions', () => {
  const container = document.createElement('div');
  const arrow = document.createElement('div');

  beforeEach(() => {
    arrowMiddlewareMock.mockClear();
    coverTargetMock.mockClear();
    devtoolsMock.mockClear();
    flipMock.mockClear();
    hideMiddlewareMock.mockClear();
    intersectingMock.mockClear();
    matchTargetSizeMock.mockClear();
    maxSizeMock.mockClear();
    offsetMock.mockClear();
    resetMaxSizeMock.mockClear();
    shiftMock.mockClear();
  });

  it('uses the shared default middleware chain', () => {
    const result = resolvePositioningOptions({
      container,
      arrow: null,
      isRtl: false,
      targetDocument: document,
      align: 'start',
      position: 'above',
      offset: 4,
    });

    expect(result.placement).toBe('top-start');
    expect(result.strategy).toBe('absolute');
    expect(flipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        container,
        fallbackStrategy: 'bestFit',
        fallbackPositions: undefined,
        isRtl: false,
      }),
    );
    expect(shiftMock).toHaveBeenCalledWith(
      expect.objectContaining({
        container,
        isRtl: false,
      }),
    );
    expect(offsetMock).toHaveBeenCalledWith(4);
    expect(intersectingMock).toHaveBeenCalledTimes(1);
    expect(hideMiddlewareMock).toHaveBeenNthCalledWith(1, { strategy: 'referenceHidden' });
    expect(hideMiddlewareMock).toHaveBeenNthCalledWith(2, { strategy: 'escaped' });
    expect(devtoolsMock).toHaveBeenCalledTimes(1);
  });

  it('supports internal anchor-positioning overrides without changing hook defaults', () => {
    const positioningConfiguration: PositioningConfigurationFn = ({ options }) => ({
      ...options,
      coverTarget: true,
      matchTargetSize: 'width',
    });

    const result = resolvePositioningOptions({
      container,
      arrow,
      isRtl: true,
      targetDocument: document,
      positioningConfiguration,
      position: 'after',
      align: 'top',
      strategy: 'fixed',
      autoSize: 'height',
      flipBoundary: document.body,
      overflowBoundary: document.body,
      arrowPadding: 8,
      unstable_disableShift: true,
      unstable_flipFallbackStrategy: 'initialPlacement',
    });

    expect(result.placement).toBe('left-start');
    expect(result.strategy).toBe('fixed');
    expect(flipMock).toHaveBeenCalledWith(
      expect.objectContaining({
        fallbackStrategy: 'initialPlacement',
        flipBoundary: document.body,
        isRtl: true,
      }),
    );
    expect(shiftMock).not.toHaveBeenCalled();
    expect(coverTargetMock).toHaveBeenCalledTimes(1);
    expect(matchTargetSizeMock).toHaveBeenCalledTimes(1);
    expect(resetMaxSizeMock).toHaveBeenCalledTimes(1);
    expect(maxSizeMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        container,
        isRtl: true,
        overflowBoundary: document.body,
      }),
    );
    expect(arrowMiddlewareMock).toHaveBeenCalledWith({ element: arrow, padding: 8 });
  });
});
