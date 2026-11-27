import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { computePosition } from './computePosition';
import { usePositioningOptions } from '../usePositioningOptions';
import { PositioningConfigurationProvider } from '../PositioningConfigurationContext';
import type {
  OffsetFunctionParam,
  PositioningConfigurationFn,
  PositioningOptions,
  PositioningPlacement,
} from '../types';

// Supply layout measurements (which jsdom lacks), not a mock of the positioning or geometry helpers.
function setup() {
  const container = document.createElement('div');
  const targetRect = { x: 100, y: 100, width: 40, height: 30 };
  const target = {
    getBoundingClientRect: jest.fn(() => ({
      ...targetRect,
      left: targetRect.x,
      top: targetRect.y,
      right: targetRect.x + targetRect.width,
      bottom: targetRect.y + targetRect.height,
    })),
  };
  document.body.appendChild(container);
  jest.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(300);
  jest.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(300);
  jest.spyOn(container, 'offsetWidth', 'get').mockReturnValue(20);
  jest.spyOn(container, 'offsetHeight', 'get').mockReturnValue(10);

  const place = (options: PositioningOptions, placement: PositioningPlacement = 'top-start', isRtl = false) =>
    computePosition(target, container, { strategy: 'fixed', placement, options: { pinned: true, ...options }, isRtl });
  return { container, target, targetRect, place };
}

describe('computePosition options', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('applies numeric, two-axis and callback offsets in positioned coordinates', async () => {
    const { place, targetRect } = setup();
    await expect(place({ offset: 7 })).resolves.toMatchObject({ x: 100, y: 83 });
    await expect(place({ offset: { mainAxis: 7, crossAxis: 5 } })).resolves.toMatchObject({ x: 105, y: 83 });
    await expect(place({ offset: ({ targetRect: r }) => r.height })).resolves.toMatchObject({ x: 100, y: 60 });

    const offset = jest.fn(({ positionedRect, targetRect: reference }: OffsetFunctionParam) => ({
      mainAxis: positionedRect.height,
      crossAxis: reference.width,
    }));
    await expect(place({ offset })).resolves.toMatchObject({ x: 140, y: 80 });
    expect(offset).toHaveBeenCalledWith({
      positionedRect: { x: 0, y: 0, width: 20, height: 10 },
      targetRect,
      position: 'above',
      alignment: 'start',
    });
  });

  it.each<[PositioningOptions['overflowBoundaryPadding'], boolean, number, number]>([
    [10, false, 10, 270],
    [{ start: 1, end: 2 }, false, 1, 278],
    [{ start: 1, end: 2 }, true, 2, 279],
  ])('shifts inside both padded edges (%j, rtl=%s)', async (overflowBoundaryPadding, rtl, left, right) => {
    const { place, targetRect } = setup();
    targetRect.x = -100;
    await expect(place({ overflowBoundaryPadding }, 'bottom', rtl)).resolves.toMatchObject({ x: left });
    targetRect.x = 400;
    await expect(place({ overflowBoundaryPadding }, 'bottom', rtl)).resolves.toMatchObject({ x: right });
  });

  it.each<[PositioningOptions['flipBoundaryPadding'], PositioningPlacement, number]>([
    [undefined, 'top', 5],
    [0, 'top', 5],
    [10, 'bottom', 45],
    [{ top: 10 }, 'bottom', 45],
  ])('uses flip padding %j to choose placement', async (flipBoundaryPadding, placement, y) => {
    const { place, targetRect } = setup();
    targetRect.y = 15;
    await expect(place({ pinned: false, flipBoundaryPadding }, 'top')).resolves.toMatchObject({ placement, y });
  });

  it.each(['top', 'bottom'] as const)('treats undefined and zero %s flip padding as omitted', async side => {
    const { place, targetRect } = setup();
    targetRect.y = side === 'top' ? 15 : 255;
    for (const flipBoundaryPadding of [{}, { [side]: undefined }, { [side]: 0 }]) {
      await expect(place({ pinned: false, flipBoundaryPadding }, side)).resolves.toMatchObject({
        placement: side,
        y: side === 'top' ? 5 : 285,
      });
    }
    await expect(place({ pinned: false, flipBoundaryPadding: { [side]: 10 } }, side)).resolves.toMatchObject({
      placement: side === 'top' ? 'bottom' : 'top',
      y: side === 'top' ? 45 : 245,
    });
  });

  it.each([false, true])('maps logical flip padding in RTL=%s', async isRtl => {
    const { place, targetRect } = setup();
    targetRect.x = 25;
    await expect(
      place({ pinned: false, flipBoundaryPadding: { start: 10, end: 0 } }, 'left', isRtl),
    ).resolves.toMatchObject({ placement: isRtl ? 'left' : 'right', x: isRtl ? 5 : 65 });
    targetRect.x = 235;
    await expect(
      place({ pinned: false, flipBoundaryPadding: { start: 10, end: 0 } }, 'right', isRtl),
    ).resolves.toMatchObject({ placement: isRtl ? 'left' : 'right', x: isRtl ? 215 : 275 });
  });

  it('keeps flip, shift and auto-size padding independent', async () => {
    const { place, targetRect, container } = setup();
    targetRect.x = 20;
    targetRect.y = 15;
    await expect(place({ pinned: false, overflowBoundaryPadding: 10 }, 'top')).resolves.toMatchObject({
      placement: 'top',
      x: 30,
      y: 5,
    });
    await expect(
      place(
        {
          pinned: false,
          flipBoundaryPadding: { top: 10, end: 100 },
          overflowBoundaryPadding: { start: 80, end: 10 },
          autoSize: 'width',
        },
        'top',
      ),
    ).resolves.toMatchObject({ placement: 'bottom', x: 80, y: 45 });
    expect(container.style.maxWidth).toBe('210px');
  });

  it('honors pinned and explicit fallback placements with flip padding', async () => {
    const { place, targetRect } = setup();
    targetRect.y = 15;
    await expect(place({ flipBoundaryPadding: 10 }, 'top')).resolves.toMatchObject({ placement: 'top', y: 5 });
    await expect(
      place({ pinned: false, flipBoundaryPadding: 10, fallbackPositions: ['after'] }, 'top'),
    ).resolves.toMatchObject({ placement: 'right', x: 140, y: 25 });
  });

  it('passes padding through configuration and applies provider overrides', async () => {
    const { container, target, targetRect } = setup();
    targetRect.y = 15;
    const configure = jest.fn<ReturnType<PositioningConfigurationFn>, Parameters<PositioningConfigurationFn>>(
      ({ options }) => ({ ...options, flipBoundaryPadding: 10 }),
    );
    const wrapper = ({ children }: { children?: React.ReactNode }) =>
      React.createElement(PositioningConfigurationProvider, { value: configure }, children);
    const { result } = renderHook(() => usePositioningOptions({ position: 'above', flipBoundaryPadding: 0 }), {
      wrapper,
    });
    const resolved = result.current(container, null);
    expect(configure).toHaveBeenCalledWith(
      expect.objectContaining({ options: expect.objectContaining({ flipBoundaryPadding: 0 }) }),
    );
    await expect(computePosition(target, container, resolved)).resolves.toMatchObject({
      placement: 'bottom',
      y: 45,
    });
  });

  it('updates and removes flip padding without remounting', async () => {
    const { container, target, targetRect } = setup();
    targetRect.y = 15;
    const initialProps: { padding: number | undefined } = { padding: 0 };
    const { result, rerender } = renderHook(
      ({ padding }: { padding: number | undefined }) =>
        usePositioningOptions({ position: 'above', flipBoundaryPadding: padding }),
      { initialProps },
    );
    const compute = () => computePosition(target, container, result.current(container, null));
    await expect(compute()).resolves.toMatchObject({ placement: 'top', y: 5 });
    rerender({ padding: 10 });
    await expect(compute()).resolves.toMatchObject({ placement: 'bottom', y: 45 });
    rerender({ padding: undefined });
    await expect(compute()).resolves.toMatchObject({ placement: 'top', y: 5 });
  });

  it.each<[PositioningPlacement, number, number]>([
    ['top', 110, 120],
    ['top-start', 100, 120],
    ['top-end', 120, 120],
    ['bottom', 110, 100],
    ['bottom-start', 100, 100],
    ['bottom-end', 120, 100],
    ['left', 120, 110],
    ['left-start', 120, 100],
    ['left-end', 120, 120],
    ['right', 100, 110],
    ['right-start', 100, 100],
    ['right-end', 100, 120],
  ])('covers the target on the requested side and alignment for %s', async (placement, x, y) => {
    const { place } = setup();
    await expect(place({ coverTarget: true }, placement)).resolves.toMatchObject({ placement, x, y });
  });

  it.each(['', '25px'])('matches width once and remeasures, preserving an explicit width ("%s")', async width => {
    const { container, target, place } = setup();
    container.style.width = width;
    const write = jest.spyOn(container.style, 'setProperty');
    await place({ matchTargetSize: 'width' });

    // The measured widths still differ on the second pass: don't write and reset indefinitely.
    expect(write.mock.calls.filter(([name]) => name === '--fui-match-target-size')).toHaveLength(1);
    expect(container.style.getPropertyValue('--fui-match-target-size')).toBe('40px');
    expect(container.style.width).toBe(width || 'var(--fui-match-target-size)');
    expect(target.getBoundingClientRect).toHaveBeenCalledTimes(2);
  });

  it('leaves sizes alone if widths already match', async () => {
    const { container, target, targetRect, place } = setup();
    targetRect.width = 20;
    await place({ matchTargetSize: 'width' });
    expect(container.style.width).toBe('');
    expect(container.style.getPropertyValue('--fui-match-target-size')).toBe('');
    expect(target.getBoundingClientRect).toHaveBeenCalledTimes(1);
  });

  it('clears stale auto-size constraints before measurement but not on the resize pass', async () => {
    const { container, target, place } = setup();
    const { style } = container;
    style.cssText = 'box-sizing:border-box;width:1px;height:1px;max-width:1px;max-height:1px';
    // Intrinsically 400x400 until the engine constrains it. Record styles at each target measurement.
    jest.spyOn(container, 'offsetWidth', 'get').mockImplementation(() => parseFloat(style.width) || 400);
    jest.spyOn(container, 'offsetHeight', 'get').mockImplementation(() => parseFloat(style.height) || 400);
    const measurements: string[][] = [];
    const rect = target.getBoundingClientRect();
    target.getBoundingClientRect.mockImplementation(() => {
      measurements.push([style.boxSizing, style.width, style.height, style.maxWidth, style.maxHeight]);
      return rect;
    });

    await place({ autoSize: true }, 'bottom');
    expect(measurements).toEqual([
      ['', '', '', '', ''],
      ['border-box', '300px', '170px', '300px', '170px'],
    ]);
    expect([style.width, style.height]).toEqual(['300px', '170px']);
  });
});
