import { renderHook } from '@testing-library/react-hooks';
import { usePlacementObserver } from './usePlacementObserver';

type Entry = {
  target: Element;
  width: number;
  height: number;
  /** Border box size; defaults to width/height. `null` omits `borderBoxSize` from the entry. */
  borderBox?: { inlineSize: number; blockSize: number } | null;
};

let instances: FakeRO[] = [];

class FakeRO {
  public disconnect = jest.fn();
  constructor(public callback: (entries: unknown[]) => void) {
    instances.push(this);
  }
  public observe() {
    /* noop */
  }
}

function emit(entries: Entry[]) {
  const ro = instances[instances.length - 1];
  ro.callback(
    entries.map(({ target, width, height, borderBox }) => {
      const resolved = borderBox === undefined ? { inlineSize: width, blockSize: height } : borderBox;
      return {
        target,
        contentRect: { width, height },
        ...(resolved ? { borderBoxSize: [resolved] } : {}),
      };
    }),
  );
}

function makeRect(rect: Partial<DOMRect>): DOMRect {
  const { top = 0, left = 0, width = 0, height = 0 } = rect;
  return {
    x: left,
    y: top,
    top,
    left,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect;
}

describe('usePlacementObserver', () => {
  const originalRO = window.ResizeObserver;
  let addSpy: jest.SpyInstance;
  let removeSpy: jest.SpyInstance;
  let container: HTMLElement;
  let target: HTMLElement;

  const calledWith = (spy: jest.SpyInstance, type: string) => spy.mock.calls.some(call => call[0] === type);

  beforeEach(() => {
    instances = [];
    (window as unknown as { ResizeObserver: unknown }).ResizeObserver = FakeRO;
    addSpy = jest.spyOn(window, 'addEventListener');
    removeSpy = jest.spyOn(window, 'removeEventListener');
    container = document.createElement('div');
    target = document.createElement('div');
    // jsdom has no layout and returns no client rects; treat the anchor as rendered.
    target.getClientRects = () => [target.getBoundingClientRect()] as unknown as DOMRectList;
  });

  afterEach(() => {
    (window as unknown as { ResizeObserver: unknown }).ResizeObserver = originalRO;
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  const showBelow = () => {
    target.getBoundingClientRect = () => makeRect({ top: 100, left: 100, width: 100, height: 40 });
    container.getBoundingClientRect = () => makeRect({ top: 140, left: 100, width: 100, height: 50 });
  };

  it('attaches no window listeners while hidden', () => {
    renderHook(() => usePlacementObserver(container, target, document));
    emit([{ target: container, width: 0, height: 0 }]);

    expect(calledWith(addSpy, 'scroll')).toBe(false);
    expect(calledWith(addSpy, 'resize')).toBe(false);
  });

  it('attaches listeners and updates placement when shown', async () => {
    renderHook(() => usePlacementObserver(container, target, document));
    emit([{ target: container, width: 0, height: 0 }]);

    showBelow();
    emit([{ target: container, width: 100, height: 50 }]);
    await Promise.resolve();

    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), expect.objectContaining({ capture: true }));
    expect(calledWith(addSpy, 'resize')).toBe(true);
    expect(container.getAttribute('data-placement')).toMatch(/^below/);
  });

  it('removes listeners when hidden again', () => {
    renderHook(() => usePlacementObserver(container, target, document));
    showBelow();
    emit([{ target: container, width: 100, height: 50 }]);
    expect(calledWith(removeSpy, 'scroll')).toBe(false);

    emit([{ target: container, width: 0, height: 0 }]);

    expect(calledWith(removeSpy, 'scroll')).toBe(true);
    expect(calledWith(removeSpy, 'resize')).toBe(true);
  });

  it('never overwrites a correct placement while hidden', async () => {
    renderHook(() => usePlacementObserver(container, target, document));
    container.setAttribute('data-placement', 'below-start');
    container.getBoundingClientRect = () => makeRect({});
    target.getBoundingClientRect = () => makeRect({});

    emit([{ target: container, width: 0, height: 0 }]);
    await Promise.resolve();

    expect(container.getAttribute('data-placement')).toBe('below-start');
  });

  // The content box is 0x0 in every row: only the border box decides.
  it.each([
    [100, 20],
    [100, 0],
    [0, 20],
  ])('treats a %ix%i border box as laid out', async (inlineSize, blockSize) => {
    renderHook(() => usePlacementObserver(container, target, document));
    showBelow();
    emit([{ target: container, width: 0, height: 0, borderBox: { inlineSize, blockSize } }]);
    await Promise.resolve();

    expect(calledWith(addSpy, 'scroll')).toBe(true);
    expect(calledWith(addSpy, 'resize')).toBe(true);
    expect(container.getAttribute('data-placement')).toMatch(/^below/);
  });

  it('treats a 0x0 border box as hidden and detaches listeners', () => {
    renderHook(() => usePlacementObserver(container, target, document));
    emit([{ target: container, width: 100, height: 50 }]);
    expect(calledWith(addSpy, 'scroll')).toBe(true);

    emit([{ target: container, width: 10, height: 10, borderBox: { inlineSize: 0, blockSize: 0 } }]);

    expect(calledWith(removeSpy, 'scroll')).toBe(true);
    expect(calledWith(removeSpy, 'resize')).toBe(true);
  });

  it('falls back to getBoundingClientRect without borderBoxSize', () => {
    renderHook(() => usePlacementObserver(container, target, document));
    container.getBoundingClientRect = () => makeRect({ width: 100, height: 20 });
    emit([{ target: container, width: 0, height: 0, borderBox: null }]);
    expect(calledWith(addSpy, 'scroll')).toBe(true);

    container.getBoundingClientRect = () => makeRect({});
    emit([{ target: container, width: 50, height: 50, borderBox: null }]);
    expect(calledWith(removeSpy, 'scroll')).toBe(true);
  });

  it('observes the container with the border-box option', () => {
    const observe = jest.spyOn(FakeRO.prototype, 'observe');
    renderHook(() => usePlacementObserver(container, target, document));
    expect(observe).toHaveBeenCalledWith(container, { box: 'border-box' });
    observe.mockRestore();
  });

  it('keeps the placement when the anchor is hidden while the surface stays laid out', async () => {
    renderHook(() => usePlacementObserver(container, target, document));
    target.getBoundingClientRect = () => makeRect({ top: 200, left: 100, width: 100, height: 40 });
    container.getBoundingClientRect = () => makeRect({ top: 150, left: 100, width: 100, height: 40 });
    container.setAttribute('data-placement', 'above-start');
    emit([{ target: container, width: 100, height: 40 }]);
    await Promise.resolve();
    expect(container.getAttribute('data-placement')).toBe('above-start');

    target.getBoundingClientRect = () => makeRect({});
    target.getClientRects = () => [] as unknown as DOMRectList;
    emit([{ target, width: 0, height: 0 }]);
    await Promise.resolve();

    expect(container.getAttribute('data-placement')).toBe('above-start');
  });

  it('updates placement for a laid-out 0x0 point anchor', async () => {
    renderHook(() => usePlacementObserver(container, target, document));
    target.getBoundingClientRect = () => makeRect({ top: 100, left: 150, width: 0, height: 0 });
    container.getBoundingClientRect = () => makeRect({ top: 100, left: 100, width: 100, height: 50 });

    emit([{ target: container, width: 100, height: 50 }]);
    await Promise.resolve();

    expect(container.getAttribute('data-placement')).toMatch(/^below/);
  });

  it('does nothing without ResizeObserver', async () => {
    delete (window as unknown as { ResizeObserver?: unknown }).ResizeObserver;
    container.setAttribute('data-placement', 'below-start');

    renderHook(() => usePlacementObserver(container, target, document));
    await Promise.resolve();

    expect(calledWith(addSpy, 'scroll')).toBe(false);
    expect(calledWith(addSpy, 'resize')).toBe(false);
    expect(container.getAttribute('data-placement')).toBe('below-start');
  });

  it('removes everything on unmount', () => {
    const { unmount } = renderHook(() => usePlacementObserver(container, target, document));
    showBelow();
    emit([{ target: container, width: 100, height: 50 }]);

    unmount();

    expect(calledWith(removeSpy, 'scroll')).toBe(true);
    expect(calledWith(removeSpy, 'resize')).toBe(true);
    expect(instances[0].disconnect).toHaveBeenCalled();
  });
});
