import { debounce } from './debounce';
import { createPriorityQueue } from './priorityQueue';
import type {
  OnUpdateItemVisibility,
  OnUpdateOverflow,
  OverflowDirection,
  OverflowGroupState,
  OverflowItemEntry,
  OverflowManager,
  OverflowAxis,
} from './types';

/**
 * @returns overflow manager instance
 */
export function createOverflowManager(): OverflowManager {
  let onUpdateOverflow: OnUpdateOverflow = () => null;
  let onUpdateItemVisibility: OnUpdateItemVisibility = () => null;
  let overflowDirection: OverflowDirection = 'end';
  let overflowAxis: OverflowAxis = 'horizontal';
  let container: HTMLElement | undefined;
  let padding = 10;
  let minimumVisible = 0;

  const overflowItems: Record<string, OverflowItemEntry> = {};
  const overflowGroups: Record<string, { visibleItemIds: Set<string>; invisibleItemIds: Set<string> }> = {};
  const resizeObserver = new ResizeObserver(entries => {
    if (!entries[0] || !container) {
      return;
    }

    update();
  });

  const invisibleItemQueue = createPriorityQueue<string>((a, b) => {
    const itemA = overflowItems[a];
    const itemB = overflowItems[b];
    // Higher priority at the top of the queue
    const priority = itemB.priority - itemA.priority;
    if (priority !== 0) {
      return priority;
    }

    const positionStatusBit =
      overflowDirection === 'end' ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING;

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
      overflowDirection === 'end' ? Node.DOCUMENT_POSITION_PRECEDING : Node.DOCUMENT_POSITION_FOLLOWING;

    // equal priority, use DOM order
    // eslint-disable-next-line no-bitwise
    return itemA.element.compareDocumentPosition(itemB.element) & positionStatusBit ? -1 : 1;
  });

  const getOffsetSize = (el: HTMLElement) => {
    return overflowAxis === 'horizontal' ? el.offsetWidth : el.offsetHeight;
  };

  const makeItemVisible = () => {
    const nextVisible = invisibleItemQueue.dequeue();
    visibleItemQueue.enqueue(nextVisible);

    const item = overflowItems[nextVisible];
    onUpdateItemVisibility({ item, visible: true });
    if (item.groupId) {
      overflowGroups[item.groupId].invisibleItemIds.delete(item.id);
      overflowGroups[item.groupId].visibleItemIds.add(item.id);
    }

    return getOffsetSize(item.element);
  };

  const makeItemInvisible = () => {
    const nextInvisible = visibleItemQueue.dequeue();
    invisibleItemQueue.enqueue(nextInvisible);

    const item = overflowItems[nextInvisible];
    const width = getOffsetSize(item.element);
    onUpdateItemVisibility({ item, visible: false });
    if (item.groupId) {
      overflowGroups[item.groupId].visibleItemIds.delete(item.id);
      overflowGroups[item.groupId].invisibleItemIds.add(item.id);
    }

    return width;
  };

  const dispatchOverflowUpdate = () => {
    const visibleItemIds = visibleItemQueue.all();
    const invisibleItemIds = invisibleItemQueue.all();

    const visibleItems = visibleItemIds.map(itemId => overflowItems[itemId]);
    const invisibleItems = invisibleItemIds.map(itemId => overflowItems[itemId]);

    const groupVisibility: Record<string, OverflowGroupState> = {};
    Object.entries(overflowGroups).forEach(([groupId, groupState]) => {
      if (groupState.invisibleItemIds.size && groupState.visibleItemIds.size) {
        groupVisibility[groupId] = 'overflow';
      } else if (groupState.visibleItemIds.size === 0) {
        groupVisibility[groupId] = 'hidden';
      } else {
        groupVisibility[groupId] = 'visible';
      }
    });

    onUpdateOverflow({ visibleItems, invisibleItems, groupVisibility });
  };

  const processOverflowItems = (availableSize: number) => {
    if (!container) {
      return;
    }

    // Snapshot of the visible/invisible state to compare for updates
    const visibleTop = visibleItemQueue.peek();
    const invisibleTop = invisibleItemQueue.peek();

    const visibleItemIds = visibleItemQueue.all();
    let currentWidth = visibleItemIds.reduce((sum, visibleItemId) => {
      const child = overflowItems[visibleItemId].element;
      return sum + getOffsetSize(child);
    }, 0);

    // Add items until available width is filled
    while (currentWidth < availableSize && invisibleItemQueue.size() > 0) {
      currentWidth += makeItemVisible();
    }
    // Remove items until there's no more overlap
    while (currentWidth > availableSize && visibleItemQueue.size() > 0) {
      if (visibleItemQueue.size() === minimumVisible) {
        break;
      }
      currentWidth -= makeItemInvisible();
    }

    // only update when the state of visible/invisible items has changed
    if (visibleItemQueue.peek() !== visibleTop || invisibleItemQueue.peek() !== invisibleTop) {
      dispatchOverflowUpdate();
    }
  };

  const forceUpdate: OverflowManager['forceUpdate'] = () => {
    if (!container) {
      return;
    }

    const availableSize = getOffsetSize(container) - padding;
    processOverflowItems(availableSize);
  };

  const update: OverflowManager['update'] = debounce(forceUpdate);

  const observe: OverflowManager['observe'] = (observedContainer, options) => {
    ({
      padding = 10,
      overflowAxis = 'horizontal',
      overflowDirection = 'end',
      minimumVisible = 0,
      onUpdateItemVisibility,
      onUpdateOverflow,
    } = options);

    container = observedContainer;
    resizeObserver.observe(container);
  };

  const disconnect: OverflowManager['disconnect'] = () => {
    resizeObserver.disconnect();
  };

  const addItem: OverflowManager['addItem'] = item => {
    overflowItems[item.id] = item;
    visibleItemQueue.enqueue(item.id);

    if (item.groupId) {
      if (!overflowGroups[item.groupId]) {
        overflowGroups[item.groupId] = {
          visibleItemIds: new Set<string>(),
          invisibleItemIds: new Set<string>(),
        };
      }

      overflowGroups[item.groupId].visibleItemIds.add(item.id);
    }

    update();
  };

  const removeItem: OverflowManager['removeItem'] = itemId => {
    const item = overflowItems[itemId];
    visibleItemQueue.remove(itemId);
    invisibleItemQueue.remove(itemId);

    if (item.groupId) {
      overflowGroups[item.groupId].visibleItemIds.delete(item.id);
      overflowGroups[item.groupId].invisibleItemIds.delete(item.id);
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
  };
}
