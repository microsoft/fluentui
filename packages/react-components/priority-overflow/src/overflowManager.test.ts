import { createOverflowManager } from './overflowManager';
import type { ObserveOptions } from './types';

describe('overflowManager', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      public observe() {
        // do nothing
      }

      public unobserve() {
        // do nothing
      }

      public disconnect() {
        // do nothing
      }
    } as unknown as typeof ResizeObserver;
  });

  const createElementWithSize = (tagName: string, width: number) => {
    const element = document.createElement(tagName);
    Object.defineProperty(element, 'offsetWidth', { configurable: true, value: width });
    Object.defineProperty(element, 'offsetHeight', { configurable: true, value: width });

    return element;
  };

  const createContainer = (width: number) => {
    const container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { configurable: true, value: width });
    Object.defineProperty(container, 'clientHeight', { configurable: true, value: width });

    return container;
  };

  const createObserveOptions = (options: Partial<ObserveOptions> = {}): ObserveOptions => ({
    overflowAxis: 'horizontal',
    overflowDirection: 'end',
    padding: 10,
    minimumVisible: 0,
    hasHiddenItems: false,
    onUpdateItemVisibility: jest.fn(),
    onUpdateOverflow: jest.fn(),
    ...options,
  });

  const getVisibleIds = (manager: ReturnType<typeof createOverflowManager>) =>
    Object.entries(manager.getSnapshot().itemVisibility)
      .filter(([, visible]) => visible)
      .map(([id]) => id)
      .sort();

  const getInvisibleIds = (manager: ReturnType<typeof createOverflowManager>) =>
    Object.entries(manager.getSnapshot().itemVisibility)
      .filter(([, visible]) => !visible)
      .map(([id]) => id)
      .sort();

  it('should expose a stable snapshot after forceUpdate', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);
    const itemB = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.addItem({ element: itemB, id: 'b', priority: 0 });
    manager.addOverflowMenu(menu);
    manager.observe(container);
    manager.forceUpdate();

    expect(getVisibleIds(manager)).toEqual(['a', 'b']);
    expect(getInvisibleIds(manager)).toEqual([]);
    expect(manager.getSnapshot().groupVisibility).toEqual({});
  });

  it('should update snapshot and notify subscribers when options change', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);
    const itemB = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);
    const listener = jest.fn();

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.addItem({ element: itemB, id: 'b', priority: 0 });
    manager.addOverflowMenu(menu);
    manager.observe(container);
    manager.forceUpdate();
    const unsubscribe = manager.subscribe(listener);

    manager.setOptions({ padding: 30 });

    expect(listener).toHaveBeenCalled();
    expect(getVisibleIds(manager)).toEqual(['a']);
    expect(getInvisibleIds(manager)).toEqual(['b']);
    expect(manager.getSnapshot().groupVisibility).toEqual({});

    unsubscribe();
  });

  it('should not notify subscribers when setOptions is called with a partial that does not change anything', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();

    const listener = jest.fn();
    manager.subscribe(listener);
    manager.setOptions({ padding: 10 }); // padding is already 10; no real change

    expect(listener).not.toHaveBeenCalled();
  });

  it('should reset snapshot state when disconnect runs', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);

    manager.addItem({ element: item, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();

    expect(getVisibleIds(manager)).toEqual(['a']);

    manager.disconnect();

    expect(manager.getSnapshot()).toEqual({
      itemVisibility: {},
      groupVisibility: {},
      invisibleItemCount: 0,
    });
  });

  it('should not notify subscribers when disconnect runs', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);
    const listener = jest.fn();

    manager.addItem({ element: item, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();
    listener.mockClear();

    manager.subscribe(listener);
    manager.disconnect();

    expect(listener).not.toHaveBeenCalled();
    expect(manager.getSnapshot()).toEqual({
      itemVisibility: {},
      groupVisibility: {},
      invisibleItemCount: 0,
    });
  });

  it('should re-dispatch when the overflow menu is attached while observing', () => {
    const onUpdateOverflow = jest.fn();
    const manager = createOverflowManager(createObserveOptions({ onUpdateOverflow }));
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 60);
    const itemB = createElementWithSize('button', 60);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.addItem({ element: itemB, id: 'b', priority: 0 });
    manager.observe(container);
    manager.forceUpdate();
    onUpdateOverflow.mockClear();

    const menu = createElementWithSize('button', 30);
    manager.addOverflowMenu(menu);

    expect(onUpdateOverflow).toHaveBeenCalled();
  });

  it('should synchronously update once when the overflow menu attaches to an overflowing manager', async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const manager = createOverflowManager(createObserveOptions());
    process.env.NODE_ENV = previousNodeEnv;

    const container = createContainer(100);
    const getClientWidth = jest.fn(() => 100);
    Object.defineProperty(container, 'clientWidth', { configurable: true, get: getClientWidth });

    manager.addItem({ element: createElementWithSize('button', 60), id: 'a', priority: 1 });
    manager.addItem({ element: createElementWithSize('button', 60), id: 'b', priority: 0 });
    manager.observe(container);
    manager.forceUpdate();
    getClientWidth.mockClear();

    manager.addOverflowMenu(createElementWithSize('button', 30));
    expect(getClientWidth).toHaveBeenCalledTimes(1);

    await Promise.resolve();

    expect(getClientWidth).toHaveBeenCalledTimes(1);
  });

  it('should batch the update when the overflow menu attaches without hidden items', async () => {
    const previousNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const manager = createOverflowManager(createObserveOptions());
    process.env.NODE_ENV = previousNodeEnv;

    const container = createContainer(100);
    const getClientWidth = jest.fn(() => 100);
    Object.defineProperty(container, 'clientWidth', { configurable: true, get: getClientWidth });

    manager.addItem({ element: createElementWithSize('button', 40), id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();
    getClientWidth.mockClear();

    manager.addOverflowMenu(createElementWithSize('button', 30));
    expect(getClientWidth).not.toHaveBeenCalled();

    await Promise.resolve();

    expect(getClientWidth).toHaveBeenCalledTimes(1);
  });

  it('should not recompute when the same overflow menu is added twice', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const getClientWidth = jest.fn(() => 100);
    Object.defineProperty(container, 'clientWidth', { configurable: true, get: getClientWidth });
    const menu = createElementWithSize('button', 30);

    manager.addItem({ element: createElementWithSize('button', 60), id: 'a', priority: 1 });
    manager.addItem({ element: createElementWithSize('button', 60), id: 'b', priority: 0 });
    manager.observe(container);
    manager.forceUpdate();
    manager.addOverflowMenu(menu);
    getClientWidth.mockClear();

    const listener = jest.fn();
    manager.subscribe(listener);
    manager.addOverflowMenu(menu);

    expect(listener).not.toHaveBeenCalled();
    expect(getClientWidth).not.toHaveBeenCalled();
  });

  it('should not recompute when no overflow menu is registered', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const getClientWidth = jest.fn(() => 100);
    Object.defineProperty(container, 'clientWidth', { configurable: true, get: getClientWidth });

    manager.addItem({ element: createElementWithSize('button', 60), id: 'a', priority: 1 });
    manager.addItem({ element: createElementWithSize('button', 60), id: 'b', priority: 0 });
    manager.observe(container);
    manager.forceUpdate();
    getClientWidth.mockClear();

    const listener = jest.fn();
    manager.subscribe(listener);
    manager.removeOverflowMenu();

    expect(listener).not.toHaveBeenCalled();
    expect(getClientWidth).not.toHaveBeenCalled();
  });

  it('should not recompute when the overflow menu is removed after all items become visible', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(110);
    const getClientWidth = jest.fn(() => 110);
    Object.defineProperty(container, 'clientWidth', { configurable: true, get: getClientWidth });
    const menu = createElementWithSize('button', 30);
    let menuAttached = false;

    const createResponsiveItem = () => {
      const item = document.createElement('button');
      Object.defineProperty(item, 'offsetWidth', {
        configurable: true,
        get: () => (menuAttached ? 35 : 60),
      });
      return item;
    };

    manager.addItem({ element: createResponsiveItem(), id: 'a', priority: 1 });
    manager.addItem({ element: createResponsiveItem(), id: 'b', priority: 0 });
    manager.observe(container);
    manager.forceUpdate();
    expect(getInvisibleIds(manager)).toEqual(['b']);

    menuAttached = true;
    manager.addOverflowMenu(menu);
    expect(getInvisibleIds(manager)).toEqual([]);
    getClientWidth.mockClear();

    const listener = jest.fn();
    manager.subscribe(listener);
    menuAttached = false;
    manager.removeOverflowMenu();

    expect(listener).not.toHaveBeenCalled();
    expect(getClientWidth).not.toHaveBeenCalled();
    expect(getVisibleIds(manager)).toEqual(['a', 'b']);
  });

  it('should recompute when the overflow menu is removed with hidden items', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(140);
    const getClientWidth = jest.fn(() => 140);
    Object.defineProperty(container, 'clientWidth', { configurable: true, get: getClientWidth });

    manager.addItem({ element: createElementWithSize('button', 60), id: 'a', priority: 1 });
    manager.addItem({ element: createElementWithSize('button', 60), id: 'b', priority: 0 });
    manager.addItem({ element: createElementWithSize('button', 60), id: 'c', priority: -1 });
    manager.addOverflowMenu(createElementWithSize('button', 30));
    manager.observe(container);
    manager.forceUpdate();
    expect(getInvisibleIds(manager)).toHaveLength(2);
    getClientWidth.mockClear();

    manager.removeOverflowMenu();

    expect(getClientWidth).toHaveBeenCalledTimes(1);
    expect(getVisibleIds(manager)).toHaveLength(2);
    expect(getInvisibleIds(manager)).toHaveLength(1);
  });

  it('should remove items through removeItem', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);

    manager.addItem({ element: item, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();

    expect(getVisibleIds(manager)).toEqual(['a']);

    manager.removeItem('a');
    manager.forceUpdate();

    expect(manager.getSnapshot()).toEqual({
      itemVisibility: {},
      groupVisibility: {},
      invisibleItemCount: 0,
    });
  });

  it('resolves overflow synchronously when observed with forceUpdate and the container is measured', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 60);
    const itemB = createElementWithSize('button', 60);
    const menu = createElementWithSize('button', 30);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.addItem({ element: itemB, id: 'b', priority: 0 });
    manager.addOverflowMenu(menu);

    // No manual forceUpdate(); observing with forceUpdate resolves overflow on its own.
    manager.observe(container, { forceUpdate: true });

    expect(getVisibleIds(manager)).toEqual(['a']);
    expect(getInvisibleIds(manager)).toEqual(['b']);
  });

  it('does not resolve overflow on observe when forceUpdate is not requested', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 60);
    const itemB = createElementWithSize('button', 60);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.addItem({ element: itemB, id: 'b', priority: 0 });

    manager.observe(container);

    // Nothing has been computed yet (the ResizeObserver is mocked to a noop).
    expect(manager.getSnapshot().itemVisibility).toEqual({});
  });

  it('does not resolve overflow on observe with forceUpdate when the container is not measured', () => {
    const manager = createOverflowManager(createObserveOptions());
    const container = createContainer(0);
    const itemA = createElementWithSize('button', 60);
    const itemB = createElementWithSize('button', 60);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.addItem({ element: itemB, id: 'b', priority: 0 });

    // Degenerate 0 size — the guard skips the force so nothing collapses.
    manager.observe(container, { forceUpdate: true });

    expect(manager.getSnapshot().itemVisibility).toEqual({});
  });
});
