import { DATA_OVERFLOWING, DATA_OVERFLOW_GROUP, EMPTY_SNAPSHOT } from './consts';
import { observeResize } from './createResizeObserver';
import { debounce } from './debounce';
import type { PriorityQueue } from './priorityQueue';
import { createPriorityQueue } from './priorityQueue';
import type {
  OverflowGroupState,
  OverflowItemEntry,
  OverflowManager,
  OverflowOptions,
  OverflowDividerEntry,
  OverflowSnapshot,
} from './types';

const DEFAULT_OPTIONS: Required<OverflowOptions> = {
  overflowAxis: 'horizontal',
  overflowDirection: 'end',
  padding: 10,
  minimumVisible: 0,
  hasHiddenItems: false,
  onUpdateItemVisibility: () => {
    /* noop */
  },
  onUpdateOverflow: () => {
    /* noop */
  },
};

/**
 * Creates an overflow manager instance for a single container.
 *
 * @internal
 * @param initialOptions - Initial observe options. Missing values are filled with defaults.
 * @returns overflow manager instance
 */
export function createOverflowManager(initialOptions: Partial<OverflowOptions> = {}): OverflowManager {
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
  const options: Required<OverflowOptions> = { ...DEFAULT_OPTIONS, ...initialOptions };
  const overflowItems: Record<string, OverflowItemEntry> = {};
  const overflowDividers: Record<string, OverflowDividerEntry> = {};
  const listeners = new Set<() => void>();
  let disposeResizeObserver: () => void = () => {
    /* noop */
  };

  let snapshot: OverflowSnapshot = EMPTY_SNAPSHOT;
  const takeSnapshot = (nextSnapshot: OverflowSnapshot) => {
    snapshot = nextSnapshot;
    listeners.forEach(listener => listener());
  };

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

    // TODO this should not happen but there have been reports of one of these items being undefined
    // Try to find a consistent repro for this
    if (!lte || !rte) {
      return lte ? 1 : -1;
    }

    // Pinned items have "infinite" priority - they should never be hidden
    if (lte.pinned !== rte.pinned) {
      return lte.pinned ? 1 : -1;
    }

    if (lte.priority !== rte.priority) {
      return lte.priority > rte.priority ? 1 : -1;
    }

    // Node.DOCUMENT_POSITION_FOLLOWING = 4, Node.DOCUMENT_POSITION_PRECEDING = 2
    const positionStatusBit = options.overflowDirection === 'end' ? 4 : 2;

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
    let totalItemSize = 0;
    for (const id of visibleItemQueue) {
      totalItemSize += getOffsetSize(overflowItems[id].element);
    }

    const totalDividerSize = Object.entries(groupManager.groupVisibility()).reduce(
      (acc, [id, state]) =>
        acc + (state !== 'hidden' && overflowDividers[id] ? getOffsetSize(overflowDividers[id].element) : 0),
      0,
    );

    const overflowMenuSize =
      (invisibleItemQueue.size() > 0 || options.hasHiddenItems) && overflowMenu ? getOffsetSize(overflowMenu) : 0;

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
    const groupVisibility = groupManager.groupVisibility();

    // Build the legacy ordered-entry arrays and the snapshot's id -> visible map in a single pass
    // over each queue.
    const itemVisibility: Record<string, boolean> = {};
    const visibleItems: OverflowItemEntry[] = [];
    const invisibleItems: OverflowItemEntry[] = [];

    for (const itemId of visibleItemQueue) {
      itemVisibility[itemId] = true;
      visibleItems.push(overflowItems[itemId]);
    }
    for (const itemId of invisibleItemQueue) {
      itemVisibility[itemId] = false;
      invisibleItems.push(overflowItems[itemId]);
    }

    // Set the snapshot first so `getSnapshot()` is current for both subscribers and any
    // `onUpdateOverflow` consumer that reads it.
    takeSnapshot({
      itemVisibility,
      groupVisibility,
      invisibleItemCount: invisibleItems.length,
    });

    // Legacy event payload: ordered item entries for `onUpdateOverflow` consumers.
    options.onUpdateOverflow({ visibleItems, invisibleItems, groupVisibility });
  };

  const getSnapshot: OverflowManager['getSnapshot'] = () => snapshot;

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
        const nextItemId = visibleItemQueue.peek();

        // Never hide pinned items - they should always remain visible
        if (nextItemId && overflowItems[nextItemId]?.pinned) {
          break;
        }

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

  const setOptions: OverflowManager['setOptions'] = nextOptions => {
    if (options === nextOptions) {
      return;
    }

    const shouldTriggerUpdate =
      (nextOptions.overflowAxis && options.overflowAxis !== nextOptions.overflowAxis) ||
      (nextOptions.overflowDirection && options.overflowDirection !== nextOptions.overflowDirection) ||
      (nextOptions.padding && options.padding !== nextOptions.padding) ||
      (nextOptions.minimumVisible && options.minimumVisible !== nextOptions.minimumVisible) ||
      (nextOptions.hasHiddenItems && options.hasHiddenItems !== nextOptions.hasHiddenItems);

    Object.assign(options, nextOptions);

    if (shouldTriggerUpdate) {
      forceDispatch = true;
      update();
    }
  };

  const observe: OverflowManager['observe'] = (observedContainer, observeOptions) => {
    const { forceUpdate: shouldForceUpdate, ...userOptions } = observeOptions ?? {};
    Object.assign(options, userOptions);

    Object.values(overflowItems).forEach(item => {
      if (!visibleItemQueue.contains(item.id) && !invisibleItemQueue.contains(item.id)) {
        visibleItemQueue.enqueue(item.id);
      }
    });

    container = observedContainer;
    observing = true;
    disposeResizeObserver = observeResize(container, entries => {
      if (!entries[0] || !container) {
        return;
      }
      update();
    });

    if (shouldForceUpdate && getClientSize(observedContainer) > 0) {
      forceUpdate();
    }
  };

  const disconnect: OverflowManager['disconnect'] = () => {
    disposeResizeObserver();
    disposeResizeObserver = () => {
      /* noop */
    };

    // reset flags
    container = undefined;
    observing = false;
    forceDispatch = true;

    // clear all entries
    Object.keys(overflowItems).forEach(itemId => removeItem(itemId));
    Object.keys(overflowDividers).forEach(dividerId => removeDivider(dividerId));
    removeOverflowMenu();
    sizeCache.clear();

    // notify subscribers that the manager is no longer tracking anything
    takeSnapshot(EMPTY_SNAPSHOT);
  };

  const addItem: OverflowManager['addItem'] = items => {
    if (overflowItems[items.id]) {
      return;
    }

    overflowItems[items.id] = items;

    // some options can affect priority which are only set on `observe`
    if (observing) {
      // Updates to elements might not change the queue tops
      // i.e. new element is enqueued but the top of the queue stays the same
      // force a dispatch on the next batched update
      forceDispatch = true;
      visibleItemQueue.enqueue(items.id);
      update();
    }

    if (items.groupId) {
      groupManager.addItem(items.id, items.groupId);
      items.element.setAttribute(DATA_OVERFLOW_GROUP, items.groupId);
    }
  };

  const addOverflowMenu: OverflowManager['addOverflowMenu'] = el => {
    overflowMenu = el;

    if (observing) {
      forceDispatch = true;
      update();
    }
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

    if (observing) {
      forceDispatch = true;
      update();
    }
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
    if (observing) {
      update();
    }
  };

  const subscribe: OverflowManager['subscribe'] = listener => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
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
    setOptions,
    getSnapshot,
    subscribe,
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
