import type { FallbackInput } from '../fallback/computeFallbackPosition';
import { arrowPlugin } from './arrowPlugin';
import { autoSizePlugin } from './autoSizePlugin';
import { boundaryPlugin } from './boundaryPlugin';
import { DATA_POSITIONING_ESCAPED, DATA_POSITIONING_HIDDEN, hidePlugin } from './hidePlugin';
import { offsetPlugin } from './offsetPlugin';
import type { PositioningPluginContext, PositioningPluginUpdate } from './types';

const rect = (left: number, top: number, width: number, height: number) => ({ left, top, width, height });

const createContext = (options: PositioningPluginContext['options'] = {}): PositioningPluginContext => ({
  options,
  container: document.createElement('div'),
  target: document.createElement('button'),
  arrow: document.createElement('div'),
  rtl: false,
});

const createUpdate = (
  options: PositioningPluginContext['options'],
  update: Partial<PositioningPluginUpdate> = {},
): PositioningPluginUpdate => ({
  ...createContext(options),
  placement: { position: 'below', align: 'center' },
  anchor: rect(450, 300, 100, 40),
  popup: rect(400, 340, 200, 100),
  bounds: rect(0, 0, 1000, 700),
  ...update,
});

const createInput = (): FallbackInput => ({
  anchor: rect(450, 300, 100, 40),
  bounds: rect(0, 0, 1000, 700),
  width: 200,
  height: 100,
  rtl: false,
  placement: { position: 'below', align: 'center' },
  marginBlock: 0,
  marginInline: 0,
});

const mockSize = (element: HTMLElement, size: { width?: number; height?: number }) => {
  Object.entries({
    offsetWidth: size.width,
    offsetHeight: size.height,
    scrollWidth: size.width,
    scrollHeight: size.height,
  }).forEach(([property, value]) => Object.defineProperty(element, property, { value, configurable: true }));
};

describe('arrowPlugin', () => {
  it('points to the center of the target', () => {
    const update = createUpdate({});
    mockSize(update.arrow as HTMLElement, { width: 10, height: 10 });

    arrowPlugin.apply?.(update);

    // The center of the target is at 500, the container starts at 400
    expect(update.arrow).toHaveStyle({ left: '95px' });
    expect(update.arrow?.style.top).toBe('');
  });

  it('uses the top for placements next to the target', () => {
    const update = createUpdate(
      {},
      { placement: { position: 'after', align: 'center' }, popup: rect(560, 260, 100, 120) },
    );
    mockSize(update.arrow as HTMLElement, { width: 10, height: 10 });

    arrowPlugin.apply?.(update);

    expect(update.arrow).toHaveStyle({ top: '55px' });
    expect(update.arrow?.style.left).toBe('');
  });

  it('keeps the arrow inside the container using arrowPadding', () => {
    // The center of the target is after the end of the container
    const update = createUpdate(
      { arrowPadding: 12 },
      { anchor: rect(590, 300, 40, 40), popup: rect(400, 340, 200, 100) },
    );
    mockSize(update.arrow as HTMLElement, { width: 10, height: 10 });

    arrowPlugin.apply?.(update);

    expect(update.arrow).toHaveStyle({ left: '178px' });
  });

  it('does nothing without an arrow or a placement', () => {
    const withoutArrow = createUpdate({}, { arrow: null });
    const withoutPlacement = createUpdate({}, { placement: null });

    expect(() => arrowPlugin.apply?.(withoutArrow)).not.toThrow();
    arrowPlugin.apply?.(withoutPlacement);

    expect(withoutPlacement.arrow?.style.left).toBe('');
  });
});

describe('autoSizePlugin', () => {
  it.each([
    ['above', rect(450, 300, 100, 40), { maxHeight: '300px', maxWidth: '' }],
    ['below', rect(450, 300, 100, 40), { maxHeight: '360px', maxWidth: '' }],
    ['before', rect(450, 300, 100, 40), { maxHeight: '', maxWidth: '450px' }],
    ['after', rect(450, 300, 100, 40), { maxHeight: '', maxWidth: '450px' }],
  ] as const)('limits the size to the space next to the target (%s)', (position, anchor, expected) => {
    const update = createUpdate({ autoSize: true }, { placement: { position, align: 'center' }, anchor });
    mockSize(update.container, { width: 100, height: 100 });

    autoSizePlugin.apply?.(update);

    const { maxHeight, maxWidth } = update.container.style;
    const blockMain = position === 'above' || position === 'below';
    expect(blockMain ? maxHeight : maxWidth).toBe(blockMain ? expected.maxHeight : expected.maxWidth);
    expect(update.container.style.boxSizing).toBe('border-box');
  });

  it('subtracts the offset from both sides', () => {
    const update = createUpdate(
      { autoSize: 'height', offset: 8 },
      { placement: { position: 'above', align: 'center' } },
    );
    mockSize(update.container, { width: 100, height: 100 });

    autoSizePlugin.apply?.(update);

    expect(update.container.style.maxHeight).toBe('284px');
    expect(update.container.style.maxWidth).toBe('');
  });

  it('scrolls the container when the content does not fit', () => {
    const update = createUpdate({ autoSize: 'height' }, { placement: { position: 'above', align: 'center' } });
    mockSize(update.container, { width: 100, height: 500 });

    autoSizePlugin.apply?.(update);

    expect(update.container.style.overflowY).toBe('auto');
  });

  it('does nothing without autoSize', () => {
    const update = createUpdate({});

    autoSizePlugin.apply?.(update);

    expect(update.container.style.maxHeight).toBe('');
  });
});

describe('hidePlugin', () => {
  it('marks a target and a container that are outside of the viewport', () => {
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 700, configurable: true });
    const update = createUpdate({}, { anchor: rect(450, -100, 100, 40), popup: rect(400, -60, 200, 100) });

    hidePlugin.apply?.(update);

    expect(update.container).toHaveAttribute(DATA_POSITIONING_HIDDEN);
    expect(update.container).not.toHaveAttribute(DATA_POSITIONING_ESCAPED);

    hidePlugin.apply?.({ ...update, anchor: rect(450, 300, 100, 40), popup: rect(400, 740, 200, 100) });

    expect(update.container).not.toHaveAttribute(DATA_POSITIONING_HIDDEN);
    expect(update.container).toHaveAttribute(DATA_POSITIONING_ESCAPED);
  });

  it('calls onPositioningEnd with the placement', () => {
    const onPositioningEnd = jest.fn();
    const update = createUpdate({ onPositioningEnd }, { placement: { position: 'before', align: 'end' } });

    hidePlugin.apply?.(update);
    hidePlugin.apply?.({ ...update, rtl: true, placement: { position: 'above', align: 'center' } });

    expect(onPositioningEnd.mock.calls[0][0].detail).toMatchObject({ placement: 'left-end' });
    expect(onPositioningEnd.mock.calls[1][0].detail).toMatchObject({ placement: 'top' });
  });
});

describe('offsetPlugin', () => {
  it('only requires JavaScript for functions', () => {
    expect(offsetPlugin.requiresJs?.({ offset: () => 4 })).toBe(true);
    expect(offsetPlugin.requiresJs?.({ offset: 4 })).toBe(false);
    expect(offsetPlugin.requiresJs?.({ offset: { mainAxis: 4 } })).toBe(false);
    expect(offsetPlugin.requiresJs?.({})).toBe(false);
  });

  it('computes the margins of every placement with the function', () => {
    const offset = jest.fn(({ position }: { position: string }) =>
      position === 'above' || position === 'below' ? { mainAxis: 8, crossAxis: 2 } : { mainAxis: 4, crossAxis: 1 },
    );
    const input = offsetPlugin.prepare?.(createInput(), createContext({ offset })) as FallbackInput;

    expect(input.getMargins?.({ position: 'above', align: 'start' })).toEqual({ marginBlock: 8, marginInline: 2 });
    expect(input.getMargins?.({ position: 'after', align: 'start' })).toEqual({ marginBlock: 1, marginInline: 4 });
    expect(offset).toHaveBeenLastCalledWith({
      positionedRect: { x: 0, y: 0, width: 200, height: 100 },
      targetRect: { x: 450, y: 300, width: 100, height: 40 },
      position: 'after',
      alignment: 'top',
    });
  });

  it('keeps the input when the offset is not a function', () => {
    const input = createInput();

    expect(offsetPlugin.prepare?.(input, createContext({ offset: 4 }))).toBe(input);
  });
});

describe('boundaryPlugin', () => {
  beforeEach(() => {
    Object.defineProperty(document.documentElement, 'clientWidth', { value: 1000, configurable: true });
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 700, configurable: true });
  });

  it('requires JavaScript for boundaries', () => {
    expect(boundaryPlugin.requiresJs?.({ flipBoundary: 'window' })).toBe(true);
    expect(boundaryPlugin.requiresJs?.({ overflowBoundary: 'window' })).toBe(true);
    expect(boundaryPlugin.requiresJs?.({ overflowBoundaryPadding: 8 })).toBe(true);
    expect(boundaryPlugin.requiresJs?.({})).toBe(false);
  });

  it('uses rects as boundaries and applies the padding to the overflow boundary', () => {
    const input = boundaryPlugin.prepare?.(
      createInput(),
      createContext({
        flipBoundary: { x: 100, y: 50, width: 800, height: 600 },
        overflowBoundary: { x: 10, y: 20, width: 500, height: 400 },
        overflowBoundaryPadding: { top: 5, bottom: 15, start: 10, end: 20 },
      }),
    ) as FallbackInput;

    expect(input.flipBounds).toEqual(rect(100, 50, 800, 600));
    expect(input.bounds).toEqual(rect(20, 25, 470, 380));
  });

  it('swaps the start and the end of the padding for rtl', () => {
    const context = { ...createContext({ overflowBoundaryPadding: { start: 10, end: 30 } }), rtl: true };
    const input = boundaryPlugin.prepare?.(createInput(), context) as FallbackInput;

    expect(input.bounds).toEqual(rect(30, 0, 960, 700));
  });

  it('keeps the containing block for the flip when only the overflow boundary is set', () => {
    const input = boundaryPlugin.prepare?.(
      createInput(),
      createContext({ overflowBoundary: { x: 100, y: 100, width: 300, height: 300 } }),
    ) as FallbackInput;

    expect(input.bounds).toEqual(rect(100, 100, 300, 300));
    expect(input.flipBounds).toEqual(rect(0, 0, 1000, 700));
  });

  it('resolves elements and the window', () => {
    const element = document.createElement('div');
    element.getBoundingClientRect = () => ({ left: 100, top: 100 } as DOMRect);
    Object.defineProperty(element, 'clientWidth', { value: 300 });
    Object.defineProperty(element, 'clientHeight', { value: 200 });

    const input = boundaryPlugin.prepare?.(
      createInput(),
      createContext({ flipBoundary: element, overflowBoundary: 'window' }),
    ) as FallbackInput;

    expect(input.flipBounds).toEqual(rect(100, 100, 300, 200));
    expect(input.bounds).toEqual(rect(0, 0, 1000, 700));
  });
});
