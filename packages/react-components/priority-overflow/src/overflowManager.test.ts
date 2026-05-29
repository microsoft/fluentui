import { createOverflowManager } from './overflowManager';
import type { ObserveOptions, OverflowEventPayload } from './types';

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

  const lastDispatch = (onUpdateOverflow: jest.Mock): OverflowEventPayload =>
    onUpdateOverflow.mock.calls[onUpdateOverflow.mock.calls.length - 1][0];

  it('should dispatch overflow update after forceUpdate', () => {
    const onUpdateOverflow = jest.fn();
    const options = createObserveOptions({ onUpdateOverflow });
    const manager = createOverflowManager(options);
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);
    const itemB = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.addItem({ element: itemB, id: 'b', priority: 0 });
    manager.addOverflowMenu(menu);
    manager.observe(container);
    manager.forceUpdate();

    const dispatch = lastDispatch(onUpdateOverflow);
    expect(dispatch.visibleItems.map(item => item.id).sort()).toEqual(['a', 'b']);
    expect(dispatch.invisibleItems).toEqual([]);
    expect(dispatch.groupVisibility).toEqual({});
  });

  it('should re-dispatch when setOptions changes a relevant option', () => {
    const onUpdateOverflow = jest.fn();
    const options = createObserveOptions({ onUpdateOverflow });
    const manager = createOverflowManager(options);
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);
    const itemB = createElementWithSize('button', 40);
    const menu = createElementWithSize('button', 20);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.addItem({ element: itemB, id: 'b', priority: 0 });
    manager.addOverflowMenu(menu);
    manager.observe(container);
    manager.forceUpdate();

    onUpdateOverflow.mockClear();
    manager.setOptions({ padding: 30 });

    expect(onUpdateOverflow).toHaveBeenCalled();
    const dispatch = lastDispatch(onUpdateOverflow);
    expect(dispatch.visibleItems.map(item => item.id)).toEqual(['a']);
    expect(dispatch.invisibleItems.map(item => item.id)).toEqual(['b']);
  });

  it('should not re-dispatch when setOptions is called with a partial that does not change anything', () => {
    const onUpdateOverflow = jest.fn();
    const options = createObserveOptions({ onUpdateOverflow });
    const manager = createOverflowManager(options);
    const container = createContainer(100);
    const itemA = createElementWithSize('button', 40);

    manager.addItem({ element: itemA, id: 'a', priority: 1 });
    manager.observe(container, options);
    manager.forceUpdate();

    onUpdateOverflow.mockClear();
    manager.setOptions({ padding: 10 }); // padding is already 10; no real change

    expect(onUpdateOverflow).not.toHaveBeenCalled();
  });

  it('disconnect stops observation and re-observe restarts dispatching', () => {
    const onUpdateOverflow = jest.fn();
    const options = createObserveOptions({ onUpdateOverflow });
    const manager = createOverflowManager(options);
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);

    manager.addItem({ element: item, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();
    expect(lastDispatch(onUpdateOverflow).visibleItems.map(i => i.id)).toEqual(['a']);

    manager.disconnect();
    onUpdateOverflow.mockClear();

    manager.addItem({ element: item, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();
    expect(onUpdateOverflow).toHaveBeenCalled();
    expect(lastDispatch(onUpdateOverflow).visibleItems.map(i => i.id)).toEqual(['a']);
  });

  it('should remove items through removeItem', () => {
    const onUpdateOverflow = jest.fn();
    const options = createObserveOptions({ onUpdateOverflow });
    const manager = createOverflowManager(options);
    const container = createContainer(100);
    const item = createElementWithSize('button', 40);

    manager.addItem({ element: item, id: 'a', priority: 1 });
    manager.observe(container);
    manager.forceUpdate();

    expect(lastDispatch(onUpdateOverflow).visibleItems.map(i => i.id)).toEqual(['a']);

    manager.removeItem('a');
    manager.forceUpdate();

    const dispatch = lastDispatch(onUpdateOverflow);
    expect(dispatch.visibleItems).toEqual([]);
    expect(dispatch.invisibleItems).toEqual([]);
  });
});
