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

  it('should expose a stable snapshot after forceUpdate', () => {
    const manager = createOverflowManager();
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);
    const itemB = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);

    manager.setOptions(createObserveOptions());
    manager.registerItem({ element: itemA, id: 'a', priority: 1 });
    manager.registerItem({ element: itemB, id: 'b', priority: 0 });
    manager.attachOverflowMenu(menu);
    manager.observe(container);
    manager.forceUpdate();

    expect(manager.getSnapshot()).toEqual({
      hasOverflow: false,
      overflowCount: 0,
      itemVisibility: { a: true, b: true },
      groupVisibility: {},
    });
  });

  it('should update snapshot and notify subscribers when options change', () => {
    const manager = createOverflowManager();
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);
    const itemB = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);
    const listener = jest.fn();

    manager.setOptions(createObserveOptions());
    manager.registerItem({ element: itemA, id: 'a', priority: 1 });
    manager.registerItem({ element: itemB, id: 'b', priority: 0 });
    manager.attachOverflowMenu(menu);
    manager.observe(container);
    manager.forceUpdate();
    const unsubscribe = manager.subscribe(listener);

    manager.setOptions({ padding: 30 });

    expect(listener).toHaveBeenCalled();
    expect(manager.getSnapshot()).toEqual({
      hasOverflow: true,
      overflowCount: 1,
      itemVisibility: { a: true, b: false },
      groupVisibility: {},
    });

    unsubscribe();
  });

  it('should reset snapshot state when observation cleanup runs', () => {
    const manager = createOverflowManager();
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);

    manager.setOptions(createObserveOptions());
    manager.registerItem({ element: item, id: 'a', priority: 1 });
    const cleanup = manager.observe(container);
    manager.forceUpdate();

    expect(manager.getSnapshot().itemVisibility).toEqual({ a: true });

    cleanup();

    expect(manager.getSnapshot()).toEqual({
      hasOverflow: false,
      overflowCount: 0,
      itemVisibility: {},
      groupVisibility: {},
    });
  });

  it('should remove items through registration cleanup', () => {
    const manager = createOverflowManager();
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);

    manager.setOptions(createObserveOptions());
    const cleanupItem = manager.registerItem({ element: item, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();

    expect(manager.getSnapshot().itemVisibility).toEqual({ a: true });

    cleanupItem();
    manager.forceUpdate();

    expect(manager.getSnapshot()).toEqual({
      hasOverflow: false,
      overflowCount: 0,
      itemVisibility: {},
      groupVisibility: {},
    });
  });
});
