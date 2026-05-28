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
    manager
      .getSnapshot()
      .visibleItems.map(item => item.id)
      .sort();

  const getInvisibleIds = (manager: ReturnType<typeof createOverflowManager>) =>
    manager
      .getSnapshot()
      .invisibleItems.map(item => item.id)
      .sort();

  it('should expose a stable snapshot after forceUpdate', () => {
    const manager = createOverflowManager();
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);
    const itemB = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);

    manager.setOptions(createObserveOptions());
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
    const manager = createOverflowManager();
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);
    const itemB = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);
    const listener = jest.fn();

    manager.setOptions(createObserveOptions());
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

  it('should reset snapshot state when observation cleanup runs', () => {
    const manager = createOverflowManager();
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);

    manager.setOptions(createObserveOptions());
    manager.addItem({ element: item, id: 'a', priority: 1 });
    const cleanup = manager.observe(container);
    manager.forceUpdate();

    expect(getVisibleIds(manager)).toEqual(['a']);

    cleanup();

    expect(manager.getSnapshot()).toEqual({
      visibleItems: [],
      invisibleItems: [],
      groupVisibility: {},
    });
  });

  it('should remove items through removeItem', () => {
    const manager = createOverflowManager();
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);

    manager.setOptions(createObserveOptions());
    manager.addItem({ element: item, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();

    expect(getVisibleIds(manager)).toEqual(['a']);

    manager.removeItem('a');
    manager.forceUpdate();

    expect(manager.getSnapshot()).toEqual({
      visibleItems: [],
      invisibleItems: [],
      groupVisibility: {},
    });
  });
});
