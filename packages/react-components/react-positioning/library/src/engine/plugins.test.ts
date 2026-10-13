import type { PlacementInput, PlacementRect, Placement } from './computePlacement';
import type { PositioningOptions, TargetElement } from '../types';
import { applyArrow } from './arrow';
import { applyAutoSize, resetAutoSize } from './autoSize';
import { applyBoundary } from './boundary';
import { applyFunctionOffset } from './offset';
import { toPlacement, toPositioningPlacement } from './placement';
import { getVisibility } from './visibility';

const rect = (left: number, top: number, width: number, height: number): PlacementRect => ({
  left,
  top,
  width,
  height,
});

const createInput = (): PlacementInput => [
  rect(450, 300, 100, 40),
  rect(0, 0, 1000, 700),
  200,
  100,
  false,
  { position: 'below', align: 'center' },
  0,
  0,
];

const mockSize = (element: HTMLElement, size: { width?: number; height?: number }) => {
  Object.entries({
    offsetWidth: size.width,
    offsetHeight: size.height,
    scrollWidth: size.width,
    scrollHeight: size.height,
  }).forEach(([property, value]) => Object.defineProperty(element, property, { value, configurable: true }));
};

const mockViewport = () => {
  Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, configurable: true });
  Object.defineProperty(document.documentElement, 'clientHeight', { value: 700, configurable: true });
};

describe('applyArrow', () => {
  const placement: Placement = { position: 'below', align: 'center' };
  const createArrow = () => {
    const arrow = document.createElement('div');
    mockSize(arrow, { width: 10, height: 10 });
    return arrow;
  };

  it('points to the center of the target', () => {
    const arrow = createArrow();

    applyArrow(arrow, placement, rect(450, 300, 100, 40), rect(400, 340, 200, 100));

    // The center of the target is at 500, the container starts at 400
    expect(arrow).toHaveStyle({ left: '95px' });
    expect(arrow.style.top).toBe('');
  });

  it('uses the top for placements next to the target', () => {
    const arrow = createArrow();

    applyArrow(arrow, { position: 'after', align: 'center' }, rect(450, 300, 100, 40), rect(560, 260, 100, 120));

    expect(arrow).toHaveStyle({ top: '55px' });
    expect(arrow.style.left).toBe('');
  });

  it('keeps the arrow inside the container using arrowPadding', () => {
    const arrow = createArrow();

    // The center of the target is after the end of the container
    applyArrow(arrow, placement, rect(590, 300, 40, 40), rect(400, 340, 200, 100), 12);

    expect(arrow).toHaveStyle({ left: '178px' });
  });

  it('does nothing without an arrow', () => {
    expect(() => applyArrow(null, placement, rect(0, 0, 10, 10), rect(0, 0, 10, 10))).not.toThrow();
  });
});

describe('applyAutoSize', () => {
  const both = { applyMaxWidth: true, applyMaxHeight: true };
  const heightOnly = { applyMaxWidth: false, applyMaxHeight: true };

  it.each([
    ['above', { maxHeight: '300px', maxWidth: '1000px' }],
    ['below', { maxHeight: '360px', maxWidth: '1000px' }],
    ['before', { maxHeight: '700px', maxWidth: '450px' }],
    ['after', { maxHeight: '700px', maxWidth: '450px' }],
  ] as const)('limits the size to the space next to the target (%s)', (position, expected) => {
    const container = document.createElement('div');
    mockSize(container, { width: 100, height: 100 });

    applyAutoSize(
      container,
      both,
      { position, align: 'center' },
      rect(450, 300, 100, 40),
      rect(0, 0, 1000, 700),
      false,
      0,
    );

    expect(container.style.maxHeight).toBe(expected.maxHeight);
    expect(container.style.maxWidth).toBe(expected.maxWidth);
    expect(container.style.boxSizing).toBe('border-box');
  });

  it('subtracts the offset from both sides', () => {
    const container = document.createElement('div');
    mockSize(container, { width: 100, height: 100 });

    applyAutoSize(
      container,
      heightOnly,
      { position: 'above', align: 'center' },
      rect(450, 300, 100, 40),
      rect(0, 0, 1000, 700),
      false,
      8,
    );

    expect(container.style.maxHeight).toBe('284px');
    expect(container.style.maxWidth).toBe('');
  });

  it('scrolls the container when the content does not fit', () => {
    const container = document.createElement('div');
    mockSize(container, { width: 100, height: 500 });

    applyAutoSize(
      container,
      heightOnly,
      { position: 'above', align: 'center' },
      rect(450, 300, 100, 40),
      rect(0, 0, 1000, 700),
      false,
      0,
    );

    expect(container.style.overflowY).toBe('auto');
  });

  it('resets the styles of the previous update', () => {
    const container = document.createElement('div');
    container.style.maxHeight = '100px';
    container.style.maxWidth = '100px';
    container.style.boxSizing = 'border-box';

    resetAutoSize(container, heightOnly);

    expect(container.style.maxHeight).toBe('');
    expect(container.style.maxWidth).toBe('100px');
    expect(container.style.boxSizing).toBe('');
  });
});

describe('getVisibility', () => {
  beforeEach(mockViewport);

  it('detects a target and a container that are outside of the viewport', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');

    expect(getVisibility(container, target, rect(450, -100, 100, 40), rect(400, -60, 200, 100))).toMatchObject({
      referenceHidden: true,
      escaped: false,
    });
    expect(getVisibility(container, target, rect(450, 300, 100, 40), rect(400, 740, 200, 100))).toMatchObject({
      referenceHidden: false,
      escaped: true,
    });
  });

  it('detects a container that overlaps the edges of the viewport', () => {
    const container = document.createElement('div');
    const target = document.createElement('button');

    expect(getVisibility(container, target, rect(450, 20, 100, 40), rect(400, -40, 200, 100)).intersecting).toBe(true);
    expect(getVisibility(container, target, rect(450, 300, 100, 40), rect(400, 340, 200, 100)).intersecting).toBe(
      false,
    );
  });

  it('uses the context element of virtual elements', () => {
    const container = document.createElement('div');
    const target: TargetElement = { getBoundingClientRect: () => rect(0, 0, 0, 0) as unknown as DOMRect };

    expect(() => getVisibility(container, target, rect(450, 300, 0, 0), rect(400, 340, 200, 100))).not.toThrow();
  });
});

describe('placement', () => {
  it('ignores alignments that do not apply to the position', () => {
    expect(toPlacement('above', 'top')).toEqual({ position: 'above', align: 'center' });
    expect(toPlacement('before', 'start')).toEqual({ position: 'before', align: 'center' });
    expect(toPlacement('before', 'bottom')).toEqual({ position: 'before', align: 'end' });
    expect(toPlacement('below', 'end')).toEqual({ position: 'below', align: 'end' });
  });

  it('defaults to below', () => {
    expect(toPlacement()).toEqual({ position: 'below', align: 'center' });
  });

  it('writes physical placements', () => {
    expect(toPositioningPlacement({ position: 'before', align: 'end' }, false)).toBe('left-end');
    expect(toPositioningPlacement({ position: 'before', align: 'end' }, true)).toBe('right-end');
    expect(toPositioningPlacement({ position: 'above', align: 'center' }, true)).toBe('top');
  });
});

describe('applyFunctionOffset', () => {
  it('computes the margins of every placement with the function', () => {
    const offset = jest.fn(({ position }: { position: string }) =>
      position === 'above' || position === 'below' ? { mainAxis: 8, crossAxis: 2 } : { mainAxis: 4, crossAxis: 1 },
    );
    const input = createInput();
    applyFunctionOffset(input, offset);

    expect(input[12]?.({ position: 'above', align: 'start' })).toEqual([8, 2]);
    expect(input[12]?.({ position: 'after', align: 'start' })).toEqual([1, 4]);
    expect(offset).toHaveBeenLastCalledWith({
      positionedRect: { x: 0, y: 0, width: 200, height: 100 },
      targetRect: { x: 450, y: 300, width: 100, height: 40 },
      position: 'after',
      alignment: 'top',
    });
  });

  it('keeps the input when the offset is not a function', () => {
    const input = createInput();

    applyFunctionOffset(input, 4);

    expect(input[12]).toBeUndefined();
  });
});

describe('applyBoundary', () => {
  type Options = Pick<PositioningOptions, 'flipBoundary' | 'overflowBoundary' | 'overflowBoundaryPadding'>;
  const apply = (input: PlacementInput, options: Options, rtl = false) =>
    applyBoundary(input, document.createElement('div'), rtl, options);

  beforeEach(mockViewport);

  it('uses rects as boundaries and applies the padding to the overflow boundary', () => {
    const input = createInput();
    apply(input, {
      flipBoundary: { x: 100, y: 50, width: 800, height: 600 },
      overflowBoundary: { x: 10, y: 20, width: 500, height: 400 },
      overflowBoundaryPadding: { top: 5, bottom: 15, start: 10, end: 20 },
    });

    expect(input[8]).toEqual(rect(100, 50, 800, 600));
    expect(input[1]).toEqual(rect(20, 25, 470, 380));
  });

  it('swaps the start and the end of the padding for rtl', () => {
    const input = createInput();
    apply(input, { overflowBoundaryPadding: { start: 10, end: 30 } }, true);

    expect(input[1]).toEqual(rect(30, 0, 960, 700));
  });

  it('keeps the bounds for the flip when only the overflow boundary is set', () => {
    const input = createInput();
    apply(input, { overflowBoundary: { x: 100, y: 100, width: 300, height: 300 } });

    expect(input[1]).toEqual(rect(100, 100, 300, 300));
    expect(input[8]).toEqual(rect(0, 0, 1000, 700));
  });

  it('resolves elements and the window', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = () => ({ left: 100, top: 100 } as DOMRect);
    Object.defineProperty(element, 'clientWidth', { value: 300 });
    Object.defineProperty(element, 'clientHeight', { value: 200 });

    const input = createInput();
    apply(input, { flipBoundary: element, overflowBoundary: 'window' });

    expect(input[8]).toEqual(rect(100, 100, 300, 200));
    expect(input[1]).toEqual(rect(0, 0, 1000, 700));
  });
});
