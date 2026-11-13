import * as React from 'react';
import { computePosition, platform as domPlatform } from '@floating-ui/dom';
import type { Middleware, Platform } from '@floating-ui/dom';
import { renderHook } from '@testing-library/react-hooks';
import { flip } from './flip';
import { usePositioningOptions } from '../usePositioningOptions';
import { PositioningConfigurationProvider } from '../PositioningConfigurationContext';
import type { PositioningConfigurationFn } from '../types';

const referenceRect = { x: 80, y: 55, width: 20, height: 10 };
const floatingRect = { x: 0, y: 0, width: 40, height: 50 };
const boundaryRect = { x: 0, y: 0, width: 200, height: 125 };

const platform: Platform = {
  ...domPlatform,
  getElementRects: async () => ({
    reference: referenceRect,
    floating: floatingRect,
  }),
  getClippingRect: async () => boundaryRect,
  getDimensions: async () => floatingRect,
  isElement: () => false,
  convertOffsetParentRelativeRectToViewportRelativeRect: ({ rect }) => rect,
  getOffsetParent: () => document.documentElement,
};

function compute(middleware: Middleware[]) {
  return computePosition(document.createElement('div'), document.createElement('div'), {
    placement: 'top',
    middleware,
    platform,
  });
}

describe('flip', () => {
  it.each([
    [undefined, 'top', 5],
    [0, 'top', 5],
    [10, 'bottom', 65],
  ])('uses flipBoundaryPadding %s to select the expected placement', async (flipBoundaryPadding, placement, y) => {
    const result = await computePosition(document.createElement('div'), document.createElement('div'), {
      placement: 'top',
      middleware: [
        flip({
          container: null,
          flipBoundaryPadding,
        }),
      ],
      platform,
    });

    expect(result).toMatchObject({ placement, x: 70, y });
  });

  it('passes flipBoundaryPadding from usePositioningOptions to flip', async () => {
    const { result: positioningOptions } = renderHook(() =>
      usePositioningOptions({ position: 'above', flipBoundaryPadding: 10 }),
    );
    const options = positioningOptions.current(document.createElement('div'), null);
    const flipMiddleware = options.middleware.find(middleware => middleware.name === 'flip');

    const result = await computePosition(document.createElement('div'), document.createElement('div'), {
      placement: 'top',
      middleware: [flipMiddleware!],
      platform,
    });

    expect(result).toMatchObject({ placement: 'bottom', x: 70, y: 65 });
  });

  it.each(['top', 'bottom'] as const)('treats undefined %s padding as omitted', async side => {
    for (const flipBoundaryPadding of [{}, { [side]: undefined }, { [side]: 0 }]) {
      const result = await computePosition(document.createElement('div'), document.createElement('div'), {
        placement: side,
        middleware: [flip({ container: null, flipBoundaryPadding })],
        platform,
      });

      expect(result).toMatchObject({ placement: side, x: 70, y: side === 'top' ? 5 : 65 });
    }
  });

  it('does not use overflowBoundaryPadding for flipping', async () => {
    const { result: positioningOptions } = renderHook(() =>
      usePositioningOptions({ position: 'above', overflowBoundaryPadding: 10 }),
    );
    const options = positioningOptions.current(document.createElement('div'), null);
    const flipMiddleware = options.middleware.find(middleware => middleware.name === 'flip');

    const result = await computePosition(document.createElement('div'), document.createElement('div'), {
      placement: 'top',
      middleware: [flipMiddleware!],
      platform,
    });

    expect(result).toMatchObject({ placement: 'top', x: 70, y: 5 });
  });

  it('updates flip padding without remounting', async () => {
    const { result, rerender } = renderHook(
      ({ padding }) => usePositioningOptions({ position: 'above', flipBoundaryPadding: padding }),
      { initialProps: { padding: 0 } },
    );
    const middleware = () =>
      result.current(document.createElement('div'), null).middleware.filter(item => item.name === 'flip');

    expect(await compute(middleware())).toMatchObject({ placement: 'top', y: 5 });
    rerender({ padding: 10 });
    expect(await compute(middleware())).toMatchObject({ placement: 'bottom', y: 65 });
  });

  it('passes padding through configuration and applies provider overrides', async () => {
    const configure = jest.fn<ReturnType<PositioningConfigurationFn>, Parameters<PositioningConfigurationFn>>(
      ({ options }) => ({ ...options, flipBoundaryPadding: 10 }),
    );
    const wrapper = ({ children }: { children?: React.ReactNode }) =>
      React.createElement(PositioningConfigurationProvider, { value: configure }, children);
    const { result } = renderHook(() => usePositioningOptions({ flipBoundaryPadding: 0 }), { wrapper });
    const middleware = result.current(document.createElement('div'), null).middleware;

    expect(configure).toHaveBeenCalledWith(
      expect.objectContaining({ options: expect.objectContaining({ flipBoundaryPadding: 0 }) }),
    );
    expect(await compute(middleware.filter(item => item.name === 'flip'))).toMatchObject({
      placement: 'bottom',
      y: 65,
    });
  });

  it.each([false, true])('converts logical padding for isRtl=%s', async isRtl => {
    const middleware = flip({ container: null, flipBoundaryPadding: { start: 80, end: 0 }, isRtl });
    const result = await computePosition(document.createElement('div'), document.createElement('div'), {
      placement: 'left',
      middleware: [middleware],
      platform,
    });

    expect(result.placement).toBe(isRtl ? 'left' : 'right');
  });

  it('does not add flip middleware when pinned', () => {
    const { result } = renderHook(() => usePositioningOptions({ pinned: true, flipBoundaryPadding: 10 }));
    expect(result.current(document.createElement('div'), null).middleware.some(item => item.name === 'flip')).toBe(
      false,
    );
  });

  it('keeps flip and shift padding independent', async () => {
    const { result } = renderHook(() =>
      usePositioningOptions({
        position: 'above',
        flipBoundaryPadding: { top: 10 },
        overflowBoundaryPadding: { start: 80 },
      }),
    );
    const middleware = result.current(document.createElement('div'), null).middleware;

    expect(await compute(middleware.filter(item => item.name === 'flip' || item.name === 'shift'))).toMatchObject({
      placement: 'bottom',
      x: 80,
      y: 65,
    });
  });
});
