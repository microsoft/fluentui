import { DATA_OVERFLOWING, DATA_OVERFLOW_GROUP } from './consts';
import { observeResize } from './createResizeObserver';
import { debounce } from './debounce';
import { createPriorityQueue, PriorityQueue } from './priorityQueue';
import type {
  OverflowGroupState,
  OverflowItemEntry,
  OverflowManager,
  ObserveOptions,
  OverflowDividerEntry,
} from './types';

/**
 * @internal
 * @returns overflow manager instance
 */
export function createOverflowManager(): OverflowManager {
  // calls to `offsetWidth or offsetHeight` can happen multiple times in an update
  // Use a cache to avoid causing too many recalcs and avoid scripting time to meausure sizes
  const sizeCache = new Map<HTMLElement, number>();
  let container: HTMLElement | undefined;
  let overflowMenu: HTMLElement | undefined;
  // Set as true when resize observer is observing
  let observing = false;
  // If true, next update will dispatch to onUpdateOverflow even if queue top states don't change
  // Initially true to force dispatch on first mount
  let forceDispatch = true;
  const options: Required<ObserveOptions> = {
    padding: 10,
    overflowAxis: 'horizontal',
    overflowDirection: 'end',
    minimumVisible: 0,
    onUpdateItemVisibility: () => undefined,
    onUpdateOverflow: () => undefined,
  };

  const overflowItems: Record<string, OverflowItemEntry> = {};
  const overflowDividers: Record<string, OverflowDividerEntry> = {};
  let disposeResizeObserver: () => void = () => null;

  const getNextItem = (queueToDequeue: PriorityQueue<string>, queueToEnqueue: PriorityQueue<string>) => {
    const nextItem = queueToDequeue.dequeue();
    queueToEnqueue.enqueue(nextItem);
    return overflowItems[nextItem];
  };

  const groupManager = createGroupManager();

  function compareItems(lt: string | null, rt: string | null): number {
    if (!lt || !rt) {
      return 0;
    }

    const lte = overflowItems[lt];
    const rte = overflowItems[rt];

    if (lte.priority !== rte.priority) {
      return lte.priority > rte.priority ? 1 : -1;
    }

    const positionStatusBit =
      options.overflowDirection === 'end' ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING;

    // eslint-disable-next-line no-bitwise
    return lte.element.compareDocumentPosition(rte.element) & positionStatusBit ? 1 : -1;
  }

  function getElementAxisSize(
    horizontal: 'clientWidth' | 'offsetWidth',
    vertical: 'clientHeight' | 'offsetHeight',
    el: HTMLElement,
  ): number {
    if (!sizeCache.has(el)) {
      sizeCache.set(el, options.overflowAxis === 'horizontal' ? el[horizontal] : el[vertical]);
    }

    return sizeCache.get(el)!;
  }

  const getOffsetSize = getElementAxisSize.bind(null, 'offsetWidth', 'offsetHeight');
  const getClientSize = getElementAxisSize.bind(null, 'clientWidth', 'clientHeight');

  const invisibleItemQueue = createPriorityQueue<string>((a, b) => -1 * compareItems(a, b));

  const visibleItemQueue = createPriorityQueue<string>(compareItems);

  function occupiedSize(): number {
    const totalItemSize = visibleItemQueue
      .all()
      .map(id => overflowItems[id].element)
      .map(getOffsetSize)
      .reduce((prev, current) => prev + current, 0);

    const totalDividerSize = Object.entries(groupManager.groupVisibility()).reduce(
      (acc, [id, state]) =>
        acc + (state !== 'hidden' && overflowDividers[id] ? getOffsetSize(overflowDividers[id].element) : 0),
      0,
    );

    const overflowMenuSize = invisibleItemQueue.size() > 0 && overflowMenu ? getOffsetSize(overflowMenu) : 0;

    return totalItemSize + totalDividerSize + overflowMenuSize;
  }

  const showItem = () => {
    const item = getNextItem(invisibleItemQueue, visibleItemQueue);
    options.onUpdateItemVisibility({ item, visible: true });

    if (item.groupId) {
      groupManager.showItem(item.id, item.groupId);

      if (groupManager.isSingleItemVisible(item.id, item.groupId)) {
        overflowDividers[item.groupId]?.element.removeAttribute(DATA_OVERFLOWING);
      }
    }
  };

  const hideItem = () => {
    const item = getNextItem(visibleItemQueue, invisibleItemQueue);
    options.onUpdateItemVisibility({ item, visible: false });

    if (item.groupId) {
      if (groupManager.isSingleItemVisible(item.id, item.groupId)) {
        overflowDividers[item.groupId]?.element.setAttribute(DATA_OVERFLOWING, '');
      }

      groupManager.hideItem(item.id, item.groupId);
    }
  };

  const dispatchOverflowUpdate = () => {
    const visibleItemIds = visibleItemQueue.all();
    const invisibleItemIds = invisibleItemQueue.all();

    const visibleItems = visibleItemIds.map(itemId => overflowItems[itemId]);
    const invisibleItems = invisibleItemIds.map(itemId => overflowItems[itemId]);

    options.onUpdateOverflow({ visibleItems, invisibleItems, groupVisibility: groupManager.groupVisibility() });
  };

  const processOverflowItems = (): boolean => {
    if (!container) {
      return false;
    }
    sizeCache.clear();

    const availableSize = getClientSize(container) - options.padding;

    // Snapshot of the visible/invisible state to compare for updates
    const visibleTop = visibleItemQueue.peek();
    const invisibleTop = invisibleItemQueue.peek();

    while (compareItems(invisibleItemQueue.peek(), visibleItemQueue.peek()) > 0) {
      hideItem(); // hide elements whose priority become smaller than the highest priority of the hidden one
    }

    // Run the show/hide step twice - the first step might not be correct if
    // it was triggered by a new item being added - new items are always visible by default.
    for (let i = 0; i < 2; i++) {
      // Add items until available width is filled - can result in overflow
      while (
        (occupiedSize() < availableSize && invisibleItemQueue.size() > 0) ||
        invisibleItemQueue.size() === 1 // attempt to show the last invisible item hoping it's size does not exceed overflow menu size
      ) {
        showItem();
      }

      // Remove items until there's no more overflow
      while (occupiedSize() > availableSize && visibleItemQueue.size() > options.minimumVisible) {
        hideItem();
      }
    }

    // only update when the state of visible/invisible items has changed
    return visibleItemQueue.peek() !== visibleTop || invisibleItemQueue.peek() !== invisibleTop;
  };

  const forceUpdate: OverflowManager['forceUpdate'] = () => {
    if (processOverflowItems() || forceDispatch) {
      forceDispatch = false;
      dispatchOverflowUpdate();
    }
  };

  const update: OverflowManager['update'] = debounce(forceUpdate);

  const observe: OverflowManager['observe'] = (observedContainer, userOptions) => {
    Object.assign(options, userOptions);
    observing = true;
    Object.values(overflowItems).forEach(item => visibleItemQueue.enqueue(item.id));

    container = observedContainer;
    disposeResizeObserver = observeResize(container, entries => {
      if (!entries[0] || !container) {
        return;
      }

      update();
    });
  };

  const addItem: OverflowManager['addItem'] = item => {
    if (overflowItems[item.id]) {
      return;
    }

    overflowItems[item.id] = item;

    // some options can affect priority which are only set on `observe`
    if (observing) {
      // Updates to elements might not change the queue tops
      // i.e. new element is enqueued but the top of the queue stays the same
      // force a dispatch on the next batched update
      forceDispatch = true;
      visibleItemQueue.enqueue(item.id);
    }

    if (item.groupId) {
      groupManager.addItem(item.id, item.groupId);
      item.element.setAttribute(DATA_OVERFLOW_GROUP, item.groupId);
    }

    update();
  };

  const addOverflowMenu: OverflowManager['addOverflowMenu'] = el => {
    overflowMenu = el;
  };

  const addDivider: OverflowManager['addDivider'] = divider => {
    if (!divider.groupId || overflowDividers[divider.groupId]) {
      return;
    }

    divider.element.setAttribute(DATA_OVERFLOW_GROUP, divider.groupId);
    overflowDividers[divider.groupId] = divider;
  };

  const removeOverflowMenu: OverflowManager['removeOverflowMenu'] = () => {
    overflowMenu = undefined;
  };

  const removeDivider: OverflowManager['removeDivider'] = groupId => {
    if (!overflowDividers[groupId]) {
      return;
    }
    const divider = overflowDividers[groupId];
    if (divider.groupId) {
      delete overflowDividers[groupId];
      divider.element.removeAttribute(DATA_OVERFLOW_GROUP);
    }
  };

  const removeItem: OverflowManager['removeItem'] = itemId => {
    if (!overflowItems[itemId]) {
      return;
    }

    if (observing) {
      // We might be removing an item in an overflow which would not affect the tops,
      // but we need to update anyway to update the overflow menu state
      forceDispatch = true;
    }

    const item = overflowItems[itemId];
    visibleItemQueue.remove(itemId);
    invisibleItemQueue.remove(itemId);

    if (item.groupId) {
      groupManager.removeItem(item.id, item.groupId);
      item.element.removeAttribute(DATA_OVERFLOW_GROUP);
    }

    sizeCache.delete(item.element);
    delete overflowItems[itemId];
    update();
  };

  const disconnect: OverflowManager['disconnect'] = () => {
    disposeResizeObserver();

    // reset flags
    container = undefined;
    observing = false;
    forceDispatch = true;

    // clear all entries
    Object.keys(overflowItems).forEach(itemId => removeItem(itemId));
    Object.keys(overflowDividers).forEach(dividerId => removeDivider(dividerId));
    removeOverflowMenu();
    sizeCache.clear();
  };

  return {
    addItem,
    disconnect,
    forceUpdate,
    observe,
    removeItem,
    update,
    addOverflowMenu,
    removeOverflowMenu,
    addDivider,
    removeDivider,
  };
}

const createGroupManager = () => {
  const groupVisibility: Record<string, OverflowGroupState> = {};
  const groups: Record<string, { visibleItemIds: Set<string>; invisibleItemIds: Set<string> }> = {};
  function updateGroupVisibility(groupId: string) {
    const group = groups[groupId];
    if (group.invisibleItemIds.size && group.visibleItemIds.size) {
      groupVisibility[groupId] = 'overflow';
    } else if (group.visibleItemIds.size === 0) {
      groupVisibility[groupId] = 'hidden';
    } else {
      groupVisibility[groupId] = 'visible';
    }
  }
  function isGroupVisible(groupId: string) {
    return groupVisibility[groupId] === 'visible' || groupVisibility[groupId] === 'overflow';
  }
  return {
    groupVisibility: () => groupVisibility,
    isSingleItemVisible(itemId: string, groupId: string) {
      return (
        isGroupVisible(groupId) &&
        groups[groupId].visibleItemIds.has(itemId) &&
        groups[groupId].visibleItemIds.size === 1
      );
    },
    addItem(itemId: string, groupId: string) {
      groups[groupId] ??= {
        visibleItemIds: new Set<string>(),
        invisibleItemIds: new Set<string>(),
      };

      groups[groupId].visibleItemIds.add(itemId);
      updateGroupVisibility(groupId);
    },
    removeItem(itemId: string, groupId: string) {
      groups[groupId].invisibleItemIds.delete(itemId);
      groups[groupId].visibleItemIds.delete(itemId);
      updateGroupVisibility(groupId);
    },
    showItem(itemId: string, groupId: string) {
      groups[groupId].invisibleItemIds.delete(itemId);
      groups[groupId].visibleItemIds.add(itemId);
      updateGroupVisibility(groupId);
    },
    hideItem(itemId: string, groupId: string) {
      groups[groupId].invisibleItemIds.add(itemId);
      groups[groupId].visibleItemIds.delete(itemId);
      updateGroupVisibility(groupId);
    },
  };
};
