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

  describe('divider aggregation', () => {
    it.each([
      [0, 0],
      [24, 0],
      [24, 1],
    ])(
      'bounds enumeration by registered dividers with %i retired groups and %i dividers',
      (retiredGroups, dividers) => {
        const manager = createOverflowManager(createObserveOptions({ padding: 0 }));
        for (let index = 0; index < retiredGroups; index++) {
          manager.addItem({
            id: `retired-${index}`,
            groupId: `retired-group-${index}`,
            priority: 0,
            element: createElementWithSize('button', 10),
          });
          manager.removeItem(`retired-${index}`);
        }
        for (let index = 0; index < 4; index++) {
          manager.addItem({
            id: `active-${index}`,
            groupId: `active-group-${index}`,
            priority: index,
            element: createElementWithSize('button', 10),
          });
        }
        for (let index = 0; index < dividers; index++) {
          manager.addDivider({
            groupId: `active-group-${index}`,
            element: createElementWithSize('span', 5),
          });
        }
        manager.observe(createContainer(200));
        manager.forceUpdate();
        const groupsBefore = { ...manager.getSnapshot().groupVisibility };

        try {
          const entries = jest.spyOn(Object, 'entries');
          let sizes: number[];
          try {
            manager.forceUpdate();
            sizes = entries.mock.results.map(result => {
              if (result.type !== 'return') {
                throw new Error('Expected successful object enumeration');
              }
              return result.value.length;
            });
          } finally {
            entries.mockRestore();
          }

          expect(sizes.length).toBeGreaterThan(0);
          expect(sizes.reduce((sum, size) => sum + size, 0)).toBeLessThanOrEqual(dividers * sizes.length);
          expect(manager.getSnapshot().groupVisibility).toEqual(groupsBefore);
          expect(Object.keys(groupsBefore)).toHaveLength(retiredGroups + 4);
          expect(getVisibleIds(manager)).toEqual(['active-0', 'active-1', 'active-2', 'active-3']);
        } finally {
          manager.disconnect();
        }
      },
    );

    it.each([false, true])('does not measure a divider whose group has no items (measureGap: %s)', measureGap => {
      const manager = createOverflowManager(createObserveOptions({ measureGap }));
      const divider = createElementWithSize('span', 80);
      const getDividerWidth = jest.fn(() => 80);
      const getDividerRects = jest.spyOn(divider, 'getClientRects');
      const getDividerRect = jest.spyOn(divider, 'getBoundingClientRect');
      Object.defineProperty(divider, 'offsetWidth', { configurable: true, get: getDividerWidth });
      manager.addDivider({ groupId: 'missing', element: divider });
      manager.addItem({ id: 'a', priority: 1, element: createElementWithSize('button', 40) });
      manager.observe(createContainer(100));

      try {
        manager.forceUpdate();
        expect(getDividerWidth).not.toHaveBeenCalled();
        expect(getDividerRects).not.toHaveBeenCalled();
        expect(getDividerRect).not.toHaveBeenCalled();
        expect(getVisibleIds(manager)).toEqual(['a']);
        expect(manager.getSnapshot().groupVisibility).toEqual({});
      } finally {
        manager.disconnect();
      }
    });

    it('preserves repeated sizing with a divider larger than the overflow menu', () => {
      const manager = createOverflowManager(createObserveOptions());
      const container = createContainer(160);
      manager.addItem({ id: 'a', groupId: 'group', priority: 2, element: createElementWithSize('button', 40) });
      manager.addItem({ id: 'b', groupId: 'group', priority: 1, element: createElementWithSize('button', 40) });
      manager.addDivider({ groupId: 'group', element: createElementWithSize('span', 80) });
      manager.addOverflowMenu(createElementWithSize('button', 24));
      manager.observe(container);

      try {
        for (let iteration = 0; iteration < 3; iteration++) {
          manager.forceUpdate();
          expect(getVisibleIds(manager)).toEqual(['a']);
          expect(manager.getSnapshot().groupVisibility).toEqual({ group: 'overflow' });
        }
        Object.defineProperty(container, 'clientWidth', { configurable: true, value: 240 });
        manager.forceUpdate();
        expect(getVisibleIds(manager)).toEqual(['a', 'b']);
        Object.defineProperty(container, 'clientWidth', { configurable: true, value: 160 });
        manager.forceUpdate();
        expect(getVisibleIds(manager)).toEqual(['a']);
      } finally {
        manager.disconnect();
      }
    });

    it('propagates errors while measuring a visible group divider', () => {
      const manager = createOverflowManager(createObserveOptions());
      const divider = createElementWithSize('span', 80);
      const failure = new Error('divider measurement failed');
      Object.defineProperty(divider, 'offsetWidth', {
        configurable: true,
        get: () => {
          throw failure;
        },
      });
      manager.addItem({ id: 'a', groupId: 'group', priority: 1, element: createElementWithSize('button', 40) });
      manager.addDivider({ groupId: 'group', element: divider });
      manager.observe(createContainer(200));

      try {
        expect(() => manager.forceUpdate()).toThrow(failure);
      } finally {
        manager.disconnect();
      }
    });
  });

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

  it.each([false, true])('should restore menu styles after candidate measurement (throws: %s)', throws => {
    const manager = createOverflowManager(createObserveOptions({ measureGap: true }));
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);
    menu.style.cssText = 'display: inline-flex !important; margin-left: 10px;';
    const cssText = menu.style.cssText;
    const measurementError = new Error('Measurement failed');
    const rect = new DOMRect(0, 0, 40, 40);

    jest.spyOn(item, 'getClientRects').mockReturnValue(Object.assign([rect], { item: () => rect }));
    jest.spyOn(item, 'getBoundingClientRect').mockImplementation(() => {
      expect(menu.style.display).toBe('none');
      expect(menu.style.getPropertyPriority('display')).toBe('important');
      if (throws) {
        throw measurementError;
      }
      return rect;
    });
    manager.addItem({ element: item, id: 'a', priority: 1 });
    manager.addOverflowMenu(menu);
    manager.observe(container);

    if (throws) {
      expect(() => manager.forceUpdate()).toThrow(measurementError);
    } else {
      manager.forceUpdate();
      expect(getVisibleIds(manager)).toEqual(['a']);
    }
    expect(menu.style.cssText).toBe(cssText);
    manager.disconnect();
  });

  it('preserves group and divider transitions through resize, removal and re-registration', () => {
    const manager = createOverflowManager(createObserveOptions({ padding: 0 }));
    const container = createContainer(400);
    const divider = createElementWithSize('div', 10);
    const otherDivider = createElementWithSize('div', 10);
    const itemA = { element: createElementWithSize('button', 90), id: 'a', groupId: 'group', priority: 2 };
    const itemB = { element: createElementWithSize('button', 90), id: 'b', groupId: 'group', priority: 1 };
    const itemC = { element: createElementWithSize('button', 90), id: 'c', groupId: 'other', priority: 0 };

    manager.addItem(itemA);
    manager.addItem(itemB);
    manager.addItem(itemC);
    manager.addDivider({ element: divider, groupId: 'group' });
    manager.addDivider({ element: otherDivider, groupId: 'other' });
    manager.addOverflowMenu(createElementWithSize('button', 20));
    manager.observe(container);

    const resize = (width: number) => {
      Object.defineProperty(container, 'clientWidth', { configurable: true, value: width });
      manager.forceUpdate();
    };

    resize(400);
    expect(manager.getSnapshot().groupVisibility).toEqual({ group: 'visible', other: 'visible' });
    resize(250);
    expect(getVisibleIds(manager)).toEqual(['a', 'b']);
    expect(manager.getSnapshot().groupVisibility).toEqual({ group: 'visible', other: 'hidden' });
    expect(otherDivider.hasAttribute('data-overflowing')).toBe(true);
    resize(160);
    expect(getVisibleIds(manager)).toEqual(['a']);
    expect(manager.getSnapshot().groupVisibility).toEqual({ group: 'overflow', other: 'hidden' });
    expect(divider.hasAttribute('data-overflowing')).toBe(false);
    resize(80);
    expect(getVisibleIds(manager)).toEqual([]);
    expect(manager.getSnapshot().groupVisibility).toEqual({ group: 'hidden', other: 'hidden' });
    expect(divider.hasAttribute('data-overflowing')).toBe(true);
    resize(160);
    expect(manager.getSnapshot().groupVisibility.group).toBe('overflow');
    expect(divider.hasAttribute('data-overflowing')).toBe(false);

    manager.removeItem('b');
    expect(manager.getSnapshot().groupVisibility.group).toBe('visible');
    manager.removeItem('a');
    expect(manager.getSnapshot().groupVisibility.group).toBe('hidden');
    manager.addItem(itemA);
    expect(manager.getSnapshot().groupVisibility.group).toBe('visible');
    resize(400);
    expect(getVisibleIds(manager)).toEqual(['a', 'c']);
    expect(manager.getSnapshot().groupVisibility).toEqual({ group: 'visible', other: 'visible' });
    expect(otherDivider.hasAttribute('data-overflowing')).toBe(false);
    manager.disconnect();

    manager.addItem(itemB);
    manager.observe(container, { forceUpdate: true });
    expect(getVisibleIds(manager)).toEqual(['b']);
    expect(manager.getSnapshot().groupVisibility.group).toBe('visible');
    manager.disconnect();
  });

  it('caches zero-sized items for one update without measuring gaps by default', () => {
    const manager = createOverflowManager(createObserveOptions());
    const item = createElementWithSize('button', 0);
    const getWidth = jest.fn(() => 0);
    Object.defineProperty(item, 'offsetWidth', { configurable: true, get: getWidth });
    const getRect = jest.spyOn(item, 'getBoundingClientRect');
    manager.addItem({ element: item, id: 'zero', priority: 0 });
    manager.observe(createContainer(100));

    manager.forceUpdate();
    expect(getWidth).toHaveBeenCalledTimes(1);
    manager.forceUpdate();
    expect(getWidth).toHaveBeenCalledTimes(2);
    expect(getRect).not.toHaveBeenCalled();
    expect(getVisibleIds(manager)).toEqual(['zero']);
    manager.disconnect();
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

  it('should converge when a conditional overflow menu changes item widths', () => {
    const container = createContainer(110);
    const menu = createElementWithSize('button', 30);
    const invisibleItemCounts: number[] = [];
    let menuAttached = false;

    const manager = createOverflowManager(
      createObserveOptions({
        onUpdateOverflow: () => {
          const invisibleItemCount = manager.getSnapshot().invisibleItemCount;
          invisibleItemCounts.push(invisibleItemCount);

          // Cap a regression so this test fails with the oscillating states instead of recursing indefinitely.
          if (invisibleItemCounts.length >= 6) {
            return;
          }

          if (invisibleItemCount > 0 && !menuAttached) {
            menuAttached = true;
            manager.addOverflowMenu(menu);
          } else if (invisibleItemCount === 0 && menuAttached) {
            menuAttached = false;
            manager.removeOverflowMenu();
          }
        },
      }),
    );

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
    manager.observe(container, { forceUpdate: true });

    expect(invisibleItemCounts).toEqual([1, 0]);
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
