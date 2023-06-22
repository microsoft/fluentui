import { DATA_OVERFLOWING, DATA_OVERFLOW_GROUP } from './consts';
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
  const resizeObserver = new ResizeObserver(entries => {
    if (!entries[0] || !container) {
      return;
    }

    update();
  });

  const getNextItem = (queueToDequeue: PriorityQueue<string>, queueToEnqueue: PriorityQueue<string>) => {
    const nextItem = queueToDequeue.dequeue();
    queueToEnqueue.enqueue(nextItem);
    return overflowItems[nextItem];
  };

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

  const groupManager = createGroupManager();

  const invisibleItemQueue = createPriorityQueue<string>((a, b) => {
    const itemA = overflowItems[a];
    const itemB = overflowItems[b];
    // Higher priority at the top of the queue
    const priority = itemB.priority - itemA.priority;
    if (priority !== 0) {
      return priority;
    }

    const positionStatusBit =
      options.overflowDirection === 'end' ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING;

    // equal priority, use DOM order
    // eslint-disable-next-line no-bitwise
    return itemA.element.compareDocumentPosition(itemB.element) & positionStatusBit ? -1 : 1;
  });

  const visibleItemQueue = createPriorityQueue<string>((a, b) => {
    const itemA = overflowItems[a];
    const itemB = overflowItems[b];
    // Lower priority at the top of the queue
    const priority = itemA.priority - itemB.priority;

    if (priority !== 0) {
      return priority;
    }

    const positionStatusBit =
      options.overflowDirection === 'end' ? Node.DOCUMENT_POSITION_PRECEDING : Node.DOCUMENT_POSITION_FOLLOWING;

    // equal priority, use DOM order
    // eslint-disable-next-line no-bitwise
    return itemA.element.compareDocumentPosition(itemB.element) & positionStatusBit ? -1 : 1;
  });

  const getOffsetSize = (el: HTMLElement) => {
    return options.overflowAxis === 'horizontal' ? el.offsetWidth : el.offsetHeight;
  };

  function computeSizeChange(entry: OverflowItemEntry) {
    const dividerWidth =
      entry.groupId && groupManager.isSingleItemVisible(entry.id, entry.groupId) && overflowDividers[entry.groupId]
        ? getOffsetSize(overflowDividers[entry.groupId].element)
        : 0;

    return getOffsetSize(entry.element) + dividerWidth;
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

    return computeSizeChange(item);
  };

  const hideItem = () => {
    const item = getNextItem(visibleItemQueue, invisibleItemQueue);
    const width = computeSizeChange(item);
    options.onUpdateItemVisibility({ item, visible: false });

    if (item.groupId) {
      if (groupManager.isSingleItemVisible(item.id, item.groupId)) {
        overflowDividers[item.groupId]?.element.setAttribute(DATA_OVERFLOWING, '');
      }

      groupManager.hideItem(item.id, item.groupId);
    }

    return width;
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
    const totalDividersWidth = Object.values(overflowDividers)
      .map(dvdr => (dvdr.groupId ? getOffsetSize(dvdr.element) : 0))
      .reduce((prev, current) => prev + current, 0);

    function overflowMenuSize() {
      return invisibleItemQueue.size() > 0 && overflowMenu ? getOffsetSize(overflowMenu) : 0;
    }

    const availableSize = getOffsetSize(container) - totalDividersWidth - options.padding;

    // Snapshot of the visible/invisible state to compare for updates
    const visibleTop = visibleItemQueue.peek();
    const invisibleTop = invisibleItemQueue.peek();

    let currentWidth = visibleItemQueue
      .all()
      .map(id => overflowItems[id].element)
      .map(getOffsetSize)
      .reduce((prev, current) => prev + current, 0);

    // Add items until available width is filled - can result in overflow
    while (currentWidth + overflowMenuSize() < availableSize && invisibleItemQueue.size() > 0) {
      currentWidth += showItem();
    }

    // Remove items until there's no more overflow
    while (currentWidth + overflowMenuSize() > availableSize && visibleItemQueue.size() > options.minimumVisible) {
      currentWidth -= hideItem();
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
    resizeObserver.observe(container);
  };

  const disconnect: OverflowManager['disconnect'] = () => {
    observing = false;
    resizeObserver.disconnect();
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

    const item = overflowItems[itemId];
    visibleItemQueue.remove(itemId);
    invisibleItemQueue.remove(itemId);

    if (item.groupId) {
      groupManager.removeItem(item.id, item.groupId);
      item.element.removeAttribute(DATA_OVERFLOW_GROUP);
    }

    delete overflowItems[itemId];
    update();
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
