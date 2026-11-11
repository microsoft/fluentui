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
  measureGap: false,
  onUpdateItemVisibility: () => {
    /* noop */
  },
  onUpdateOverflow: () => {
    /* noop */
  },
};

const LAYOUT_OPTIONS = [
  'overflowAxis',
  'overflowDirection',
  'padding',
  'minimumVisible',
  'hasHiddenItems',
  'measureGap',
] as const;

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

  const groupVisibility: Record<string, OverflowGroupState> = {};
  const groups: Record<string, { visible: number; size: number }> = {};

  function updateGroup(groupId: string, visibleDelta: number, sizeDelta = 0): number {
    const group = (groups[groupId] ??= { visible: 0, size: 0 });
    group.visible += visibleDelta;
    group.size += sizeDelta;
    groupVisibility[groupId] = group.visible ? (group.visible === group.size ? 'visible' : 'overflow') : 'hidden';
    return group.visible;
  }

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
    if (sizeCache.has(el)) {
      return sizeCache.get(el)!;
    }

    const requested = options.overflowAxis === 'horizontal' ? horizontal : vertical;
    const measurement = el[requested];

    sizeCache.set(el, measurement);
    return measurement;
  }

  const getOffsetSize = getElementAxisSize.bind(null, 'offsetWidth', 'offsetHeight');
  const getClientSize = getElementAxisSize.bind(null, 'clientWidth', 'clientHeight');

  const invisibleItemQueue = createPriorityQueue<string>((a, b) => -1 * compareItems(a, b));

  const visibleItemQueue = createPriorityQueue<string>(compareItems);

  function hasOverflowItems(): boolean {
    return invisibleItemQueue.size() > 0 || options.hasHiddenItems;
  }

  function getVisibleElements(): HTMLElement[] {
    const elements = Array.from(visibleItemQueue, id => overflowItems[id].element);
    for (const [id, divider] of Object.entries(overflowDividers)) {
      const visibility = groupVisibility[id];
      if (visibility && visibility !== 'hidden') {
        elements.push(divider.element);
      }
    }
    if (hasOverflowItems() && overflowMenu) {
      elements.push(overflowMenu);
    }
    return elements;
  }

  function occupiedSize(): number {
    return getVisibleElements().reduce((size, element) => size + getOffsetSize(element), 0);
  }

  const setItemVisibility = (visible: boolean) => {
    const item = getNextItem(
      visible ? invisibleItemQueue : visibleItemQueue,
      visible ? visibleItemQueue : invisibleItemQueue,
    );
    options.onUpdateItemVisibility({ item, visible });

    if (item.groupId) {
      const visibleCount = updateGroup(item.groupId, visible ? 1 : -1);
      if (visibleCount === Number(visible)) {
        overflowDividers[item.groupId]?.element.toggleAttribute(DATA_OVERFLOWING, !visible);
      }
    }
  };

  const dispatchOverflowUpdate = () => {
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

  function measureOccupiedSize(): () => number {
    const view = container!.ownerDocument.defaultView!;
    const parseSize = (value: string) => parseFloat(value) || 0;
    const containerStyle = view.getComputedStyle(container!);
    const vertical = options.overflowAxis === 'vertical';
    const reverse =
      containerStyle.flexDirection.endsWith('reverse') !== (!vertical && containerStyle.direction === 'rtl');
    const start = vertical ? 'marginTop' : 'marginLeft';
    const end = vertical ? 'marginBottom' : 'marginRight';
    const gapValue = vertical ? containerStyle.rowGap : containerStyle.columnGap;
    let gap = parseSize(gapValue);
    if (gapValue.endsWith('%') || gapValue.includes('(')) {
      // Unlike width, computed gap can retain CSS math and percentages.
      const contentSize =
        getClientSize(container!) -
        parseSize(vertical ? containerStyle.paddingTop : containerStyle.paddingLeft) -
        parseSize(vertical ? containerStyle.paddingBottom : containerStyle.paddingRight);
      const basis = container!.ownerDocument.createElement('div');
      const probe = basis.appendChild(container!.ownerDocument.createElement('div'));
      basis.style.cssText = `position:fixed;visibility:hidden;contain:strict;width:${contentSize}px;height:0`;
      probe.style.cssText = `padding:0;border:0;box-sizing:content-box;width:${gapValue}`;
      container!.ownerDocument.body.appendChild(basis);
      try {
        gap = parseSize(view.getComputedStyle(probe).width);
      } finally {
        basis.remove();
      }
    }
    const elements = getVisibleElements();
    if (overflowMenu && !elements.includes(overflowMenu)) {
      elements.push(overflowMenu);
    }
    const entries = elements.map(element => {
      const style = view.getComputedStyle(element);
      return {
        element,
        before: parseSize(style[reverse ? end : start]),
        after: parseSize(style[reverse ? start : end]),
        order: Number(style.order),
      };
    });

    entries.sort(
      (a, b) =>
        a.order - b.order ||
        // eslint-disable-next-line no-bitwise
        (a.element.compareDocumentPosition(b.element) & 4 ? -1 : 1),
    );

    return () => {
      const visible = new Set(getVisibleElements());
      let position = 0;
      let previousMargin = 0;
      let minimum = 0;
      let maximum = 0;
      let first = true;
      for (const entry of entries) {
        if (!visible.has(entry.element)) {
          continue;
        }
        if (!first) {
          position += previousMargin + gap + entry.before;
        }
        minimum = Math.min(minimum, position);
        position += getOffsetSize(entry.element);
        maximum = Math.max(maximum, position);
        previousMargin = entry.after;
        first = false;
      }
      return maximum - minimum;
    };
  }

  const getSnapshot: OverflowManager['getSnapshot'] = () => snapshot;

  const processOverflowItems = (): boolean => {
    if (!container) {
      return false;
    }
    sizeCache.clear();

    // Snapshot of the visible/invisible state to compare for updates
    const visibleTop = visibleItemQueue.peek();
    const invisibleTop = invisibleItemQueue.peek();

    // Reveal in one batch before measuring. Hidden elements have no layout size, and
    // reading geometry between individual visibility writes forces repeated layouts.
    if (options.measureGap) {
      if (overflowMenu && hasOverflowItems()) {
        getOffsetSize(overflowMenu);
      }
      while (invisibleItemQueue.size()) {
        setItemVisibility(true);
      }
    }
    const getOccupiedSize = options.measureGap ? measureOccupiedSize() : occupiedSize;
    const availableSize = getClientSize(container) - options.padding;

    while (compareItems(invisibleItemQueue.peek(), visibleItemQueue.peek()) > 0) {
      setItemVisibility(false); // hide elements whose priority become smaller than the highest priority of the hidden one
    }

    // Run the show/hide step twice - the first step might not be correct if
    // it was triggered by a new item being added - new items are always visible by default.
    for (let i = 0; i < 2; i++) {
      if (i && options.measureGap && overflowMenu && !sizeCache.get(overflowMenu) && hasOverflowItems()) {
        sizeCache.delete(overflowMenu);
      }
      // Add items until available width is filled - can result in overflow
      while (
        (getOccupiedSize() < availableSize && invisibleItemQueue.size() > 0) ||
        invisibleItemQueue.size() === 1 // attempt to show the last invisible item hoping it's size does not exceed overflow menu size
      ) {
        setItemVisibility(true);
      }

      // Remove items until there's no more overflow
      while (getOccupiedSize() > availableSize && visibleItemQueue.size() > options.minimumVisible) {
        const nextItemId = visibleItemQueue.peek();

        // Never hide pinned items - they should always remain visible
        if (nextItemId && overflowItems[nextItemId]?.pinned) {
          break;
        }

        setItemVisibility(false);
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

    const shouldTriggerUpdate = LAYOUT_OPTIONS.some(
      key =>
        (key === 'measureGap' ? nextOptions[key] !== undefined : nextOptions[key]) && options[key] !== nextOptions[key],
    );

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

    // Reset the snapshot during teardown, but do not broadcast a final update.
    // Consumers unsubscribe as part of unmount, and a disconnect-time notification can race
    // those cleanups and dispatch into already-unmounting React listeners.
    snapshot = EMPTY_SNAPSHOT;
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
      updateGroup(items.groupId, 1, 1);
      items.element.setAttribute(DATA_OVERFLOW_GROUP, items.groupId);
    }
  };

  const addOverflowMenu: OverflowManager['addOverflowMenu'] = el => {
    if (overflowMenu === el) {
      return;
    }

    overflowMenu = el;

    if (observing) {
      forceDispatch = true;
      if (invisibleItemQueue.size() > 0) {
        forceUpdate();
      } else {
        update();
      }
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
    if (!overflowMenu) {
      return;
    }

    const hasInvisibleItems = invisibleItemQueue.size() > 0;
    overflowMenu = undefined;

    if (observing && hasInvisibleItems) {
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
    if (item.groupId) {
      // Items not yet enqueued (before observe) are visible too.
      updateGroup(item.groupId, invisibleItemQueue.contains(itemId) ? 0 : -1, -1);
      item.element.removeAttribute(DATA_OVERFLOW_GROUP);
    }
    visibleItemQueue.remove(itemId);
    invisibleItemQueue.remove(itemId);

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
