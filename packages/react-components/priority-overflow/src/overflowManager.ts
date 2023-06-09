import { DATA_OVERFLOWING } from '../../react-overflow/src/constants';
import { debounce } from './debounce';
import { createPriorityQueue } from './priorityQueue';
import type { OverflowGroupState, OverflowItemEntry, OverflowManager, ObserveOptions, OverflowDivider } from './types';

class GroupManager {
  public groupVisibility: Record<string, OverflowGroupState> = {};
  private groups: Record<string, { visibleItemIds: Set<string>; invisibleItemIds: Set<string> }> = {};

  public isGroupVisible(groupId: string) {
    return this.groupVisibility[groupId];
  }

  public addItem(itemId: string, groupId: string) {
    this.groups[groupId] ??= {
      visibleItemIds: new Set<string>(),
      invisibleItemIds: new Set<string>(),
    };

    this.groups[groupId].visibleItemIds.add(itemId);
    this._updateGroupVisibility(groupId);
  }

  public removeItem(itemId: string, groupId: string) {
    this.groups[groupId].invisibleItemIds.delete(itemId);
    this.groups[groupId].visibleItemIds.delete(itemId);
    this._updateGroupVisibility(groupId);
  }

  public makeItemVisible(itemId: string, groupId: string) {
    const group = this.groups[groupId];
    group.invisibleItemIds.delete(itemId);
    group.visibleItemIds.add(itemId);
    this._updateGroupVisibility(groupId);
  }

  public makeItemInvisible(itemId: string, groupId: string) {
    this.groups[groupId].invisibleItemIds.add(itemId);
    this.groups[groupId].visibleItemIds.delete(itemId);
    this._updateGroupVisibility(groupId);
  }

  private _updateGroupVisibility(groupId: string) {
    const group = this.groups[groupId];
    if (group.invisibleItemIds.size && group.visibleItemIds.size) {
      this.groupVisibility[groupId] = 'overflow';
    } else if (group.visibleItemIds.size === 0) {
      this.groupVisibility[groupId] = 'hidden';
    } else {
      this.groupVisibility[groupId] = 'visible';
    }
  }
}

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
    onUpdateDividerVisibility: () => undefined,
    onUpdateOverflow: () => undefined,
  };

  const groupManager = new GroupManager();
  const overflowItems: Record<string, OverflowItemEntry> = {};
  const overflowDividers: Record<string, OverflowDivider> = {};
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

  const isGroupVisible = (id: number | string) => {
    return groupManager.groupVisibility[id] === 'visible' || groupManager.groupVisibility[id] === 'overflow';
  };

  const makeItemVisible = () => {
    const nextVisible = invisibleItemQueue.dequeue();
    visibleItemQueue.enqueue(nextVisible);

    const item = overflowItems[nextVisible];
    options.onUpdateItemVisibility({ item, visible: true });
    let dividerWidth = 0;
    if (item.groupId) {
      const prevGroupVisible = isGroupVisible(item.groupId);
      groupManager.makeItemVisible(item.id, item.groupId);
      const groupVisible = isGroupVisible(item.groupId);

      if (prevGroupVisible !== groupVisible && overflowDividers[item.groupId]) {
        overflowDividers[item.groupId]?.element.removeAttribute(DATA_OVERFLOWING);
        dividerWidth = getOffsetSize(overflowDividers[item.groupId].element);
      }
    }
    return getOffsetSize(item.element) + dividerWidth;
  };

  const makeItemInvisible = () => {
    const nextInvisible = visibleItemQueue.dequeue();
    invisibleItemQueue.enqueue(nextInvisible);

    const item = overflowItems[nextInvisible];
    let width = getOffsetSize(item.element);
    options.onUpdateItemVisibility({ item, visible: false });
    if (item.groupId) {
      const prevGroupVisible = isGroupVisible(item.groupId);
      groupManager.makeItemInvisible(item.id, item.groupId);
      const groupVisible = isGroupVisible(item.groupId);
      if (prevGroupVisible !== groupVisible && overflowDividers[item.groupId]) {
        overflowDividers[item.groupId].element.setAttribute(DATA_OVERFLOWING, '');
        width += getOffsetSize(overflowDividers[item.groupId].element);
      }
    }
    return width;
  };

  const dispatchOverflowUpdate = () => {
    const visibleItemIds = visibleItemQueue.all();
    const invisibleItemIds = invisibleItemQueue.all();

    const visibleItems = visibleItemIds.map(itemId => overflowItems[itemId]);
    const invisibleItems = invisibleItemIds.map(itemId => overflowItems[itemId]);

    options.onUpdateOverflow({ visibleItems, invisibleItems, groupVisibility: groupManager.groupVisibility });
  };

  const processOverflowItems = (): boolean => {
    if (!container) {
      return false;
    }
    const dividersWidth = Object.values(overflowDividers).reduce((sum, divider) => {
      if (!divider.groupId) {
        return sum;
      }
      const groupVisible = isGroupVisible(divider.groupId);
      const width = groupVisible ? getOffsetSize(divider.element) : 0;

      // options.onUpdateDividerVisibility({
      //   divider: overflowDividers[divider.groupId],
      //   groupVisible: isGroupVisible(divider.groupId),
      // });
      return sum + width;
    }, 0);

    const availableSize = getOffsetSize(container) - options.padding - dividersWidth;
    const overflowMenuOffset = overflowMenu ? getOffsetSize(overflowMenu) : 0;

    // Snapshot of the visible/invisible state to compare for updates
    const visibleTop = visibleItemQueue.peek();
    const invisibleTop = invisibleItemQueue.peek();

    const visibleItemIds = visibleItemQueue.all();

    let currentWidth = visibleItemIds.reduce((sum, visibleItemId) => {
      const child = overflowItems[visibleItemId].element;
      return sum + getOffsetSize(child);
    }, 0);

    // Add items until available width is filled - can result in overflow
    while (currentWidth < availableSize && invisibleItemQueue.size() > 0) {
      currentWidth += makeItemVisible();
    }

    // Remove items until there's no more overflow
    while (currentWidth > availableSize && visibleItemQueue.size() > 0) {
      if (visibleItemQueue.size() <= options.minimumVisible) {
        break;
      }
      currentWidth -= makeItemInvisible();
    }

    // make sure the overflow menu can fit
    if (
      visibleItemQueue.size() > options.minimumVisible &&
      invisibleItemQueue.size() > 0 &&
      currentWidth + overflowMenuOffset > availableSize
    ) {
      makeItemInvisible();
    }

    // Object.values(overflowDividers).map((el, i) => {
    //   const groupId = el.groupId;
    //   if (groupId) {
    //     options.onUpdateDividerVisibility({
    //       divider: overflowDividers[groupId],
    //       groupVisible: isGroupVisible(groupId),
    //     });
    //   }
    // });

    // only update when the state of visible/invisible items has changed
    if (visibleItemQueue.peek() !== visibleTop || invisibleItemQueue.peek() !== invisibleTop) {
      return true;
    }

    return false;
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
      item.element.setAttribute('data-overflow-group', item.groupId);
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

    divider.element.setAttribute('data-overflow-group', divider.groupId);
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
      divider.element.removeAttribute('data-overflow-group');
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
      item.element.removeAttribute('data-overflow-group');
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
