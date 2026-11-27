import { renderHook } from '@testing-library/react-hooks';
import { usePlacementObserver } from './usePlacementObserver';

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

let ioInstances: FakeIO[] = [];

class FakeIO {
  public disconnect = jest.fn();
  constructor(public callback: (entries: unknown[]) => void) {
    ioInstances.push(this);
  }
  public observe() {
    /* noop */
  }
}

function notify(...targets: Element[]) {
  instances[instances.length - 1].callback(targets.map(target => ({ target })));
}

function notifyIntersection(...targets: Element[]) {
  ioInstances[ioInstances.length - 1].callback(targets.map(target => ({ target })));
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

// jsdom has no layout and returns no client rects; mock whether an element is rendered.
function setRendered(el: HTMLElement, rendered: boolean) {
  el.getClientRects = () => (rendered ? [el.getBoundingClientRect()] : []) as unknown as DOMRectList;
}

describe('usePlacementObserver', () => {
  const originalRO = window.ResizeObserver;
  const originalIO = window.IntersectionObserver;
  let addSpy: jest.SpyInstance;
  let removeSpy: jest.SpyInstance;
  let container: HTMLElement;
  let target: HTMLElement;

  const calledWith = (spy: jest.SpyInstance, type: string) => spy.mock.calls.some(call => call[0] === type);

  beforeEach(() => {
    instances = [];
    ioInstances = [];
    (window as unknown as { ResizeObserver: unknown }).ResizeObserver = FakeRO;
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = FakeIO;
    addSpy = jest.spyOn(window, 'addEventListener');
    removeSpy = jest.spyOn(window, 'removeEventListener');
    container = document.createElement('div');
    target = document.createElement('div');
    setRendered(container, true);
    setRendered(target, true);
  });

  afterEach(() => {
    (window as unknown as { ResizeObserver: unknown }).ResizeObserver = originalRO;
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = originalIO;
    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  const showBelow = () => {
    target.getBoundingClientRect = () => makeRect({ top: 100, left: 100, width: 100, height: 40 });
    container.getBoundingClientRect = () => makeRect({ top: 140, left: 100, width: 100, height: 50 });
  };

  it('attaches no window listeners while hidden', () => {
    setRendered(container, false);
    renderHook(() => usePlacementObserver(container, target, document));
    notify(container);

    expect(calledWith(addSpy, 'scroll')).toBe(false);
    expect(calledWith(addSpy, 'resize')).toBe(false);
  });

  it('attaches listeners and updates placement when shown', async () => {
    setRendered(container, false);
    renderHook(() => usePlacementObserver(container, target, document));
    notify(container);

    showBelow();
    setRendered(container, true);
    notify(container);
    await Promise.resolve();

    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function), expect.objectContaining({ capture: true }));
    expect(calledWith(addSpy, 'resize')).toBe(true);
    expect(container.getAttribute('data-placement')).toMatch(/^below/);
  });

  it('removes listeners when hidden again', () => {
    renderHook(() => usePlacementObserver(container, target, document));
    showBelow();
    notify(container);
    expect(calledWith(removeSpy, 'scroll')).toBe(false);

    setRendered(container, false);
    notify(container);

    expect(calledWith(removeSpy, 'scroll')).toBe(true);
    expect(calledWith(removeSpy, 'resize')).toBe(true);
  });

  it('never overwrites a correct placement while hidden', async () => {
    renderHook(() => usePlacementObserver(container, target, document));
    container.setAttribute('data-placement', 'below-start');
    setRendered(container, false);

    notify(container);
    await Promise.resolve();

    expect(container.getAttribute('data-placement')).toBe('below-start');
  });

  it('keeps listening on a scale(0) surface and updates once the transform is restored', async () => {
    renderHook(() => usePlacementObserver(container, target, document));
    showBelow();
    // a rendered surface whose transformed rect collapses to a point
    container.getBoundingClientRect = () => makeRect({ top: 165, left: 150 });
    notify(container);
    await Promise.resolve();
    expect(calledWith(addSpy, 'scroll')).toBe(true);

    // the transform is restored: no ResizeObserver notification, only a later scroll
    showBelow();
    container.removeAttribute('data-placement');
    window.dispatchEvent(new Event('scroll'));
    await Promise.resolve();

    expect(container.getAttribute('data-placement')).toBe('below-start');
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
    notify(container);
    await Promise.resolve();
    expect(container.getAttribute('data-placement')).toBe('above-start');

    setRendered(target, false);
    notify(target);
    await Promise.resolve();

    expect(container.getAttribute('data-placement')).toBe('above-start');
  });

  it('updates placement for a laid-out 0x0 point anchor', async () => {
    renderHook(() => usePlacementObserver(container, target, document));
    target.getBoundingClientRect = () => makeRect({ top: 100, left: 150, width: 0, height: 0 });
    container.getBoundingClientRect = () => makeRect({ top: 100, left: 100, width: 100, height: 50 });

    notify(container);
    await Promise.resolve();

    expect(container.getAttribute('data-placement')).toMatch(/^below/);
  });

  it('attaches listeners when a 0x0 surface is shown without a resize notification', () => {
    container.getBoundingClientRect = () => makeRect({ top: 140, left: 100 });
    setRendered(container, false);
    renderHook(() => usePlacementObserver(container, target, document));
    notify(container);
    notifyIntersection(container);
    expect(calledWith(addSpy, 'scroll')).toBe(false);

    // display: none -> rendered at 0x0: the size is unchanged, so only the IntersectionObserver reports it
    setRendered(container, true);
    notifyIntersection(container);

    expect(calledWith(addSpy, 'scroll')).toBe(true);
    expect(calledWith(addSpy, 'resize')).toBe(true);
  });

  it('removes listeners when a 0x0 surface is hidden without a resize notification', () => {
    container.getBoundingClientRect = () => makeRect({ top: 140, left: 100 });
    renderHook(() => usePlacementObserver(container, target, document));
    notify(container);
    expect(calledWith(addSpy, 'scroll')).toBe(true);

    setRendered(container, false);
    notifyIntersection(container);

    expect(calledWith(removeSpy, 'scroll')).toBe(true);
    expect(calledWith(removeSpy, 'resize')).toBe(true);
  });

  it('removes listeners on the next scroll when the surface was hidden without any observer notification', async () => {
    renderHook(() => usePlacementObserver(container, target, document));
    showBelow();
    notify(container);
    await Promise.resolve();
    container.setAttribute('data-placement', 'above-start');

    setRendered(container, false);
    window.dispatchEvent(new Event('scroll'));
    await Promise.resolve();

    expect(calledWith(removeSpy, 'scroll')).toBe(true);
    expect(calledWith(removeSpy, 'resize')).toBe(true);
    expect(container.getAttribute('data-placement')).toBe('above-start');
  });

  it('still tracks visibility through ResizeObserver without IntersectionObserver', () => {
    delete (window as unknown as { IntersectionObserver?: unknown }).IntersectionObserver;
    setRendered(container, false);
    renderHook(() => usePlacementObserver(container, target, document));
    notify(container);
    expect(calledWith(addSpy, 'scroll')).toBe(false);

    setRendered(container, true);
    notify(container);

    expect(calledWith(addSpy, 'scroll')).toBe(true);
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
    notify(container);

    unmount();

    expect(calledWith(removeSpy, 'scroll')).toBe(true);
    expect(calledWith(removeSpy, 'resize')).toBe(true);
    expect(instances[0].disconnect).toHaveBeenCalled();
    expect(ioInstances[0].disconnect).toHaveBeenCalled();
  });
});
