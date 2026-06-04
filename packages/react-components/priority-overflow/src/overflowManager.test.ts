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
