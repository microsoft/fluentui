import * as React from 'react';
import { act, cleanup, render } from '@testing-library/react';
import { createPortal } from 'react-dom';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItem } from './';
import { useMenuViewport } from './useMenuViewport';

describe('Menu viewport', () => {
  let frames: Map<number, FrameRequestCallback>;
  let nextFrame: number;
  let resizeObservers: { callback: ResizeObserverCallback; targets: Set<Element> }[];
  let observe: jest.Mock;
  let disconnect: jest.Mock;

  beforeEach(() => {
    frames = new Map();
    resizeObservers = [];
    nextFrame = 0;
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(callback => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(id => {
      frames.delete(id);
    });
    observe = jest.fn();
    disconnect = jest.fn();
    jest.spyOn(window, 'ResizeObserver').mockImplementation(callback => {
      const targets = new Set<Element>();
      resizeObservers.push({ callback, targets });
      return {
        observe: target => {
          targets.add(target);
          observe(target);
        },
        unobserve: target => targets.delete(target),
        disconnect: () => {
          targets.clear();
          disconnect();
        },
      };
    });
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  const flush = () =>
    act(() => {
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(0));
    });

  const resize = (target: Element) =>
    act(() => {
      resizeObservers.forEach(observer => {
        if (observer.targets.has(target)) {
          observer.callback([], {} as ResizeObserver);
        }
      });
    });

  const rect = (top: number, height: number) => ({
    top,
    bottom: top + height,
    left: 0,
    right: 100,
    x: 0,
    y: top,
    width: 100,
    height,
    toJSON: () => ({}),
  });

  const measure = (surface: HTMLElement, item: HTMLElement, itemTop = 180, itemHeight = 20) => {
    Object.defineProperties(surface, {
      clientHeight: { configurable: true, value: 100 },
      clientWidth: { configurable: true, value: 100 },
      clientTop: { configurable: true, value: 2 },
    });
    jest.spyOn(surface, 'getBoundingClientRect').mockImplementation(() => rect(10, surface.clientHeight + 4));
    jest
      .spyOn(item, 'getBoundingClientRect')
      .mockImplementation(() => rect(12 + itemTop - surface.scrollTop, itemHeight));
  };

  const Example = ({ replacement = false, open = true }: { replacement?: boolean; open?: boolean }) => (
    <>
      <button data-testid="outside">Outside</button>
      <Menu open={open}>
        <MenuTrigger>
          <button>Actions</button>
        </MenuTrigger>
        <MenuPopover data-testid="outer">
          <MenuList>
            <MenuItem data-testid="outer-item">First action</MenuItem>
            <Menu open={open}>
              <MenuTrigger>
                <MenuItem key={String(replacement)} data-testid="middle-trigger">
                  More actions
                </MenuItem>
              </MenuTrigger>
              <MenuPopover data-testid="middle">
                <MenuList>
                  <Menu open={open}>
                    <MenuTrigger>
                      <MenuItem data-testid="inner-trigger">Additional actions</MenuItem>
                    </MenuTrigger>
                    <MenuPopover data-testid="inner">
                      <MenuList>
                        <MenuItem data-testid="inner-item">Last action</MenuItem>
                      </MenuList>
                    </MenuPopover>
                  </Menu>
                </MenuList>
              </MenuPopover>
            </Menu>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );

  const setup = (mode: 'document' | 'open' | 'closed' = 'document') => {
    const host = render(<div />).container.firstElementChild!;
    const root = mode === 'document' ? host : host.attachShadow({ mode });
    const view = render(createPortal(<Example />, root));
    const get = (id: string) => root.querySelector<HTMLElement>(`[data-testid="${id}"]`)!;
    return {
      ...view,
      get,
      activeRoot: mode === 'document' ? host.ownerDocument : (root as ShadowRoot),
      update: (props: React.ComponentProps<typeof Example>) =>
        view.rerender(createPortal(<Example {...props} />, root)),
    };
  };

  for (const mode of ['document', 'open', 'closed'] as const) {
    it(`reveals live invokers root-to-leaf without moving focus in a ${mode} root`, () => {
      const { get, activeRoot, update } = setup(mode);
      const outer = get('outer');
      const middle = get('middle');
      const inner = get('inner');
      const item = get('inner-item');
      measure(outer, get('middle-trigger'));
      measure(middle, get('inner-trigger'));
      measure(inner, item);
      item.focus();
      flush();
      expect([outer.scrollTop, middle.scrollTop, inner.scrollTop]).toEqual([100, 100, 100]);

      update({ replacement: true });
      measure(outer, get('middle-trigger'), 240);
      const order: string[] = [];
      for (const [name, surface] of [
        ['outer', outer],
        ['middle', middle],
        ['inner', inner],
      ] as const) {
        let value = 0;
        Object.defineProperty(surface, 'scrollTop', {
          configurable: true,
          get: () => value,
          set: next => {
            order.push(name);
            value = next;
          },
        });
      }
      act(() => window.dispatchEvent(new Event('resize')));
      flush();
      expect(order).toEqual(['outer', 'middle', 'inner']);
      expect([outer.scrollTop, middle.scrollTop, inner.scrollTop]).toEqual([160, 100, 100]);
      expect(activeRoot.activeElement).toBe(item);
    });

    it(`reveals only the currently owned focus and preserves manual scrolling in a ${mode} root`, () => {
      const { get, activeRoot } = setup(mode);
      const surface = get('outer');
      const item = get('outer-item');
      measure(surface, item);
      item.focus();
      flush();
      expect(surface.scrollTop).toBe(100);
      surface.scrollTop = 0;
      act(() => surface.dispatchEvent(new Event('scroll')));
      flush();
      expect(surface.scrollTop).toBe(0);
      get('outside').focus();
      act(() => window.dispatchEvent(new Event('resize')));
      flush();
      expect(surface.scrollTop).toBe(0);
      expect(activeRoot.activeElement).toBe(get('outside'));
    });

    it(`reconciles outer-only scrolling and shrinking with innermost focus in a ${mode} root`, () => {
      const { get, activeRoot } = setup(mode);
      const outer = get('outer');
      const item = get('inner-item');
      measure(outer, get('middle-trigger'));
      measure(get('middle'), get('inner-trigger'));
      measure(get('inner'), item);
      item.focus();
      flush();
      expect(outer.scrollTop).toBe(100);

      outer.scrollTop = 0;
      act(() => outer.dispatchEvent(new Event('scroll')));
      flush();
      expect(outer.scrollTop).toBe(100);

      Object.defineProperty(outer, 'clientHeight', { configurable: true, value: 60 });
      resize(outer);
      flush();
      expect(outer.scrollTop).toBe(140);
      expect(activeRoot.activeElement).toBe(item);
    });
  }

  it('coalesces resize and focus events and observes the full ancestor chain', () => {
    const { get } = setup();
    const surface = get('inner');
    const item = get('inner-item');
    measure(surface, item);
    item.focus();
    flush();
    expect(observe).toHaveBeenCalledWith(surface);
    expect(observe).toHaveBeenCalledWith(get('middle'));
    expect(observe).toHaveBeenCalledWith(get('outer'));
    surface.scrollTop = 0;
    act(() => {
      window.dispatchEvent(new Event('resize'));
      window.dispatchEvent(new Event('resize'));
      surface.dispatchEvent(new FocusEvent('focusin'));
    });
    const read = jest.spyOn(item, 'getBoundingClientRect');
    read.mockClear();
    flush();
    expect(read).toHaveBeenCalledTimes(1);
    expect(surface.scrollTop).toBe(100);
  });

  it.each([
    { writingMode: 'vertical-rl', direction: 'ltr', left: -180, width: 20, expected: -180 },
    { writingMode: 'vertical-lr', direction: 'ltr', left: 180, width: 20, expected: 100 },
    { writingMode: 'horizontal-tb', direction: 'rtl', left: -180, width: 20, expected: -180 },
    { writingMode: 'vertical-rl', direction: 'ltr', left: -240, width: 160, expected: -180 },
    { writingMode: 'vertical-lr', direction: 'ltr', left: 180, width: 160, expected: 180 },
    { writingMode: 'vertical-rl', direction: 'ltr', left: -20, width: 160, expected: 0 },
  ])(
    'reveals horizontal overflow with stable oversized rows: %o',
    ({ writingMode, direction, left, width, expected }) => {
      const { get, activeRoot } = setup();
      const surface = get('outer');
      const item = get('outer-item');
      surface.style.writingMode = writingMode;
      surface.style.direction = direction;
      measure(surface, item, 0);
      Object.defineProperty(surface, 'clientLeft', { configurable: true, value: 2 });
      jest.spyOn(surface, 'getBoundingClientRect').mockImplementation(() => ({
        ...rect(10, 104),
        left: 10,
        right: 114,
        width: 104,
      }));
      jest.spyOn(item, 'getBoundingClientRect').mockImplementation(() => ({
        ...rect(12, 20),
        left: 12 + left - surface.scrollLeft,
        right: 12 + left + width - surface.scrollLeft,
        width,
      }));
      item.focus();
      flush();
      expect(surface.scrollLeft).toBe(expected);
      act(() => window.dispatchEvent(new Event('resize')));
      flush();
      expect(surface.scrollLeft).toBe(expected);
      expect(activeRoot.activeElement).toBe(item);
    },
  );

  it.each([
    { scaleX: 0.5, scaleY: 2 },
    { scaleX: 2, scaleY: 0.5 },
  ])('normalizes scaled bounds, borders, and scroll deltas: %o', ({ scaleX, scaleY }) => {
    const { get, activeRoot } = setup();
    const surface = get('outer');
    const item = get('outer-item');
    Object.defineProperties(surface, {
      clientWidth: { configurable: true, value: 200 },
      clientHeight: { configurable: true, value: 200 },
      clientLeft: { configurable: true, value: 3 },
      clientTop: { configurable: true, value: 2 },
      offsetWidth: { configurable: true, get: () => surface.clientWidth + 6 },
      offsetHeight: { configurable: true, get: () => surface.clientHeight + 4 },
    });
    jest.spyOn(surface, 'getBoundingClientRect').mockImplementation(() => ({
      ...rect(10, surface.offsetHeight * scaleY),
      left: 10,
      right: 10 + surface.offsetWidth * scaleX,
      width: surface.offsetWidth * scaleX,
    }));
    jest.spyOn(item, 'getBoundingClientRect').mockImplementation(() => {
      const left = 10 + (surface.clientLeft + 160 - surface.scrollLeft) * scaleX;
      return {
        ...rect(10 + (surface.clientTop + 160 - surface.scrollTop) * scaleY, 20 * scaleY),
        left,
        right: left + 20 * scaleX,
        width: 20 * scaleX,
      };
    });
    item.focus();
    flush();
    expect([surface.scrollLeft, surface.scrollTop]).toEqual([0, 0]);
    resize(surface);

    Object.defineProperties(surface, {
      clientWidth: { configurable: true, value: 100 },
      clientHeight: { configurable: true, value: 100 },
    });
    resize(surface);
    flush();
    expect([surface.scrollLeft, surface.scrollTop]).toEqual([80, 80]);
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect([surface.scrollLeft, surface.scrollTop]).toEqual([80, 80]);

    surface.scrollLeft = 200;
    surface.scrollTop = 200;
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect([surface.scrollLeft, surface.scrollTop]).toEqual([160, 160]);
    expect(activeRoot.activeElement).toBe(item);
  });

  it('reconciles on parent scrolling, but leaves pure height growth alone', () => {
    const { get } = setup();
    const surface = get('inner');
    const item = get('inner-item');
    measure(surface, item);
    item.focus();
    flush();
    surface.scrollTop = 0;
    act(() => get('middle').dispatchEvent(new Event('scroll')));
    flush();
    expect(surface.scrollTop).toBe(100);
    surface.scrollTop = 0;
    Object.defineProperty(surface, 'clientHeight', { configurable: true, value: 120 });
    resize(surface);
    flush();
    expect(surface.scrollTop).toBe(0);
    Object.defineProperty(surface, 'clientHeight', { configurable: true, value: 80 });
    resize(surface);
    flush();
    expect(surface.scrollTop).toBe(120);
  });

  it('keeps an oversized row stable after aligning its start', () => {
    const { get } = setup();
    const surface = get('outer');
    const item = get('outer-item');
    measure(surface, item, 180, 160);
    item.focus();
    flush();
    expect(surface.scrollTop).toBe(180);
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect(surface.scrollTop).toBe(180);
  });

  it('does not reveal focus owned by a different popover', () => {
    const { get } = setup();
    const surface = get('outer');
    const nested = surface.ownerDocument.createElement('div');
    nested.setAttribute('popover', 'manual');
    const item = surface.ownerDocument.createElement('button');
    nested.appendChild(item);
    surface.appendChild(nested);
    measure(surface, item);
    item.focus();
    flush();
    expect(surface.scrollTop).toBe(0);
  });

  it('reveals an item above the scrollport with only the required delta', () => {
    const { get } = setup();
    const surface = get('outer');
    const item = get('outer-item');
    measure(surface, item, 40);
    surface.scrollTop = 100;
    item.focus();
    flush();
    expect(surface.scrollTop).toBe(40);
  });

  it('ignores a disconnected invoker while still revealing the focused item', () => {
    const { get } = setup();
    const surface = get('inner');
    const item = get('inner-item');
    measure(surface, item);
    get('inner-trigger').remove();
    item.focus();
    flush();
    expect(surface.scrollTop).toBe(100);
    expect(get('middle').scrollTop).toBe(0);
  });

  it('uses and cleans up visual viewport listeners without taking focus back', () => {
    const viewport = new EventTarget();
    const previous = Object.getOwnPropertyDescriptor(window, 'visualViewport');
    Object.defineProperty(window, 'visualViewport', { configurable: true, value: viewport });
    try {
      const { get, unmount } = setup();
      const surface = get('outer');
      const item = get('outer-item');
      measure(surface, item);
      item.focus();
      flush();
      surface.scrollTop = 0;
      act(() => viewport.dispatchEvent(new Event('resize')));
      flush();
      expect(surface.scrollTop).toBe(100);
      const remove = jest.spyOn(viewport, 'removeEventListener');
      unmount();
      expect(remove).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
      expect(frames.size).toBe(0);
    } finally {
      if (previous) {
        Object.defineProperty(window, 'visualViewport', previous);
      } else {
        Reflect.deleteProperty(window, 'visualViewport');
      }
    }
  });

  it('uses the surface owner window for observation and animation frames', () => {
    const frame = render(<iframe />).container.firstElementChild as HTMLIFrameElement;
    const ownerDocument = frame.contentDocument!;
    const ownerWindow = ownerDocument.defaultView!;
    const request = jest.fn(() => 1);
    const cancel = jest.fn();
    const observer = jest.fn(() => ({ observe: jest.fn(), unobserve: jest.fn(), disconnect: jest.fn() }));
    Object.defineProperties(ownerWindow, {
      requestAnimationFrame: { configurable: true, value: request },
      cancelAnimationFrame: { configurable: true, value: cancel },
      ResizeObserver: { configurable: true, value: observer },
    });
    const ExampleInFrame = () => {
      const triggerRef = React.useRef<HTMLElement | null>(null);
      const parentRef = React.useRef<HTMLElement | null>(null);
      const surfaceRef = useMenuViewport(true, triggerRef, parentRef);
      return <div ref={surfaceRef} />;
    };
    const view = render(createPortal(<ExampleInFrame />, ownerDocument.body));
    expect(observer).toHaveBeenCalled();
    expect(request).toHaveBeenCalled();
    const observerCalls = observer.mock.calls.length;
    view.unmount();
    expect(cancel).toHaveBeenCalledTimes(observerCalls);
  });

  it('updates and cleans up ancestor subscriptions when the live parent changes', () => {
    const parentRef: React.RefObject<HTMLElement | null> = { current: null };
    const triggerRef: React.RefObject<HTMLButtonElement | null> = { current: null };
    const Surface = () => {
      const ref = useMenuViewport(true, triggerRef, parentRef);
      return <div ref={ref} data-testid="surface" />;
    };
    const view = render(
      <>
        <div data-testid="first" />
        <div data-testid="second" />
        <button ref={triggerRef}>Invoker</button>
        <Surface />
      </>,
    );
    const first = view.getByTestId('first');
    const second = view.getByTestId('second');
    parentRef.current = first;
    flush();
    expect(resizeObservers[0].targets.has(first)).toBe(true);

    parentRef.current = second;
    act(() => window.dispatchEvent(new Event('resize')));
    flush();
    expect(resizeObservers[0].targets.has(first)).toBe(false);
    expect(resizeObservers[0].targets.has(second)).toBe(true);
    act(() => first.dispatchEvent(new Event('scroll')));
    expect(frames.size).toBe(0);
    act(() => second.dispatchEvent(new Event('scroll')));
    expect(frames.size).toBe(1);
    view.unmount();
    expect(frames.size).toBe(0);
    expect(resizeObservers[0].targets.size).toBe(0);
  });

  it('cancels pending work and removes observers and listeners on close', () => {
    const { get, update } = setup();
    const surface = get('inner');
    measure(surface, get('inner-item'));
    get('inner-item').focus();
    flush();
    act(() => window.dispatchEvent(new Event('resize')));
    const remove = jest.spyOn(surface, 'removeEventListener');
    const removeAncestor = jest.spyOn(get('outer'), 'removeEventListener');
    expect(frames.size).toBeGreaterThan(0);
    update({ open: false });
    expect(disconnect).toHaveBeenCalled();
    expect(remove).toHaveBeenCalledWith('focusin', expect.any(Function));
    expect(removeAncestor).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(frames.size).toBe(0);
    flush();
    expect(surface.scrollTop).toBe(100);
  });
});
