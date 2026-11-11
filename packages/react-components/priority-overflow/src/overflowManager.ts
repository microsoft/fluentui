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

const noop = () => {
  /* noop */
};

const DEFAULT_OPTIONS: Required<OverflowOptions> = {
  overflowAxis: 'horizontal',
  overflowDirection: 'end',
  padding: 10,
  minimumVisible: 0,
  hasHiddenItems: false,
  measureGap: false,
  onUpdateItemVisibility: noop,
  onUpdateOverflow: noop,
};

/**
 * Creates an overflow manager instance for a single container.
 *
 * @internal
 * @param initialOptions - Initial observe options. Missing values are filled with defaults.
 * @returns overflow manager instance
 */
export function createOverflowManager(initialOptions?: Partial<OverflowOptions>): OverflowManager {
  let container: HTMLElement | undefined;
  let overflowMenu: HTMLElement | undefined;
  let updateMeasurements: (item: OverflowItemEntry, visible: boolean) => void = noop;
  // If true, next update will dispatch to onUpdateOverflow even if queue top states don't change
  // Initially true to force dispatch on first mount
  let forceDispatch = true;
  const options: Required<OverflowOptions> = { ...DEFAULT_OPTIONS, ...initialOptions };
  const overflowItems: Record<string, OverflowItemEntry> = {};
  const overflowDividers: Record<string, OverflowDividerEntry> = {};
  const listeners = new Set<() => void>();
  let disposeResizeObserver: () => void = noop;

  let snapshot: OverflowSnapshot = EMPTY_SNAPSHOT;
  const groupVisibility: Record<string, OverflowGroupState> = {};
  const groups: Record<string, [visible: number, size: number]> = {};
  const elementOrder = new Map<Element, number>();

  function updateGroup(groupId: string, visibleDelta: number, sizeDelta = 0): number {
    const group = groups[groupId] || (groups[groupId] = [0, 0]);
    const visible = (group[0] += visibleDelta);
    const size = (group[1] += sizeDelta);
    groupVisibility[groupId] = visible ? (visible === size ? 'visible' : 'overflow') : 'hidden';
    return visible;
  }

  function compareElements(a: Element, b: Element): number {
    const left = elementOrder.get(a);
    const right = elementOrder.get(b);
    // Node.DOCUMENT_POSITION_FOLLOWING = 4
    // eslint-disable-next-line no-bitwise
    return left && right ? left - right : a.compareDocumentPosition(b) & 4 ? -1 : 1;
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

    return compareElements(lte.element, rte.element) * (options.overflowDirection === 'end' ? -1 : 1);
  }

  const getSize = (element: HTMLElement, client?: boolean) =>
    element[`${client ? 'client' : 'offset'}${options.overflowAxis === 'horizontal' ? 'Width' : 'Height'}`];

  const invisibleItemQueue = createPriorityQueue<string>((a, b) => -1 * compareItems(a, b));

  const visibleItemQueue = createPriorityQueue<string>(compareItems);

  function hasOverflowItems(): boolean {
    return invisibleItemQueue.size() > 0 || options.hasHiddenItems;
  }

  const setItemVisibility = (visible: boolean) => {
    const id = (visible ? invisibleItemQueue : visibleItemQueue).dequeue();
    (visible ? visibleItemQueue : invisibleItemQueue).enqueue(id);
    const item = overflowItems[id];
    options.onUpdateItemVisibility({ item, visible });

    const groupId = item.groupId;
    if (groupId) {
      const visibleCount = updateGroup(groupId, visible ? 1 : -1);
      const divider = overflowDividers[groupId];
      if (divider && visibleCount === +visible) {
        divider.element.toggleAttribute(DATA_OVERFLOWING, !visible);
      }
    }
    updateMeasurements(item, visible);
  };

  const dispatchOverflowUpdate = () => {
    // Build the legacy ordered-entry arrays and the snapshot's id -> visible map in a single pass
    // over each queue.
    const itemVisibility: Record<string, boolean> = {};
    const collect = (queue: PriorityQueue<string>, visible: boolean) =>
      Array.from(queue, itemId => {
        itemVisibility[itemId] = visible;
        return overflowItems[itemId];
      });
    const visibleItems = collect(visibleItemQueue, true);
    const invisibleItems = collect(invisibleItemQueue, false);

    // Set the snapshot first so `getSnapshot()` is current for both subscribers and any
    // `onUpdateOverflow` consumer that reads it.
    snapshot = {
      itemVisibility,
      groupVisibility,
      invisibleItemCount: invisibleItems.length,
    };
    listeners.forEach(listener => listener());

    // Legacy event payload: ordered item entries for `onUpdateOverflow` consumers.
    options.onUpdateOverflow({ visibleItems, invisibleItems, groupVisibility });
  };

  function measureOccupiedSize(): (refreshMenu?: boolean) => number {
    type Measurement = [
      element: HTMLElement,
      visible: boolean,
      size: number,
      before: number,
      after: number,
      index: number,
      order: number,
    ];
    const ELEMENT = 0;
    const VISIBLE = 1;
    const SIZE = 2;
    const BEFORE = 3;
    const AFTER = 4;
    const INDEX = 5;
    const ORDER = 6;
    const UNMEASURED = -1;
    let entries: Measurement[] = [];
    const add = (element: HTMLElement, visible: boolean) => {
      entries.push([element, visible, visible ? getSize(element) : UNMEASURED, 0, 0, 0, 0]);
    };
    for (const queue of [visibleItemQueue, invisibleItemQueue]) {
      for (const id of queue) {
        add(overflowItems[id].element, queue === visibleItemQueue);
      }
    }
    Object.entries(overflowDividers).forEach(([id, divider]) =>
      add(divider.element, !!groupVisibility[id] && groupVisibility[id] !== 'hidden'),
    );
    if (overflowMenu) {
      add(overflowMenu, hasOverflowItems());
    }

    const parseSize = (value: string) => parseFloat(value) || 0;
    let gap = 0;
    if (options.measureGap) {
      const ownerDocument = container!.ownerDocument;
      const view = ownerDocument.defaultView!;
      const containerStyle = view.getComputedStyle(container!);
      const vertical = options.overflowAxis === 'vertical';
      const row = containerStyle.display.endsWith('flex') ? containerStyle.flexDirection.startsWith('row') : !vertical;
      const reverse =
        containerStyle.flexDirection.endsWith('reverse') !==
        (row
          ? (containerStyle.direction === 'rtl') !== (containerStyle.writingMode === 'sideways-lr')
          : containerStyle.writingMode.endsWith('-rl'));
      const sides = vertical ? (['Top', 'Bottom'] as const) : (['Left', 'Right'] as const);
      const properties = sides.map(side => `margin${side}` as const);
      if (reverse) {
        properties.reverse();
      }
      const [start, end] = properties;
      const gapValue = row ? containerStyle.columnGap : containerStyle.rowGap;
      const probe = ownerDocument.createElement('div');
      gap = parseSize(gapValue);
      try {
        if (gapValue.includes('%')) {
          const contentSize = sides.reduce(
            (size, side) => size - parseSize(containerStyle[`padding${side}`]),
            getSize(container!, true),
          );
          // Translate percentages resolve against this width, independent of application div styles.
          probe.style.cssText = `all:initial!important;position:fixed!important;width:${contentSize}px!important;transform:translateX(${gapValue})!important`;
          ownerDocument.body.appendChild(probe);
          gap = Math.max(0, parseSize(view.getComputedStyle(probe).transform.split(',')[4]));
          probe.remove();
        }
        // A non-rendered child inherits computed margins, preserving `auto` instead of used free space.
        probe.style.cssText = 'display:none!important;margin:inherit!important';
        entries = entries.filter(entry => {
          const element = entry[ELEMENT];
          const style = view.getComputedStyle(element);
          if (style.display === 'none') {
            return false;
          }
          const size = parseFloat(vertical ? style.height : style.width);
          if (size >= 0) {
            entry[SIZE] =
              size +
              (style.boxSizing === 'border-box'
                ? 0
                : sides.reduce(
                    (total, side) =>
                      total + parseSize(style[`padding${side}`]) + parseSize(style[`border${side}Width`]),
                    0,
                  ));
          }
          entry[BEFORE] = parseSize(style[start]);
          entry[AFTER] = parseSize(style[end]);
          if (entry[BEFORE] || entry[AFTER]) {
            element.appendChild(probe);
            const margins = view.getComputedStyle(probe);
            properties.forEach((property, index) => {
              if (margins[property] === 'auto') {
                entry[BEFORE + index] = 0;
              }
            });
            probe.remove();
          }
          entry[ORDER] = +style.order;
          return true;
        });
      } finally {
        probe.remove();
      }
      entries.sort((a, b) => a[ORDER] - b[ORDER] || compareElements(a[ELEMENT], b[ELEMENT]));
    }

    let base = 1;
    while (base < entries.length) {
      base *= 2;
    }
    // Each segment stores its advance and occupied extrema. Combining segments preserves overlaps.
    type Span = readonly [advance: number, min: number, max: number];
    const empty: Span = [0, Infinity, -Infinity];
    const spans = Array<Span>(base * 2).fill(empty);
    const measurements = new Map<HTMLElement, Measurement>();
    const setVisible = (element: HTMLElement | undefined, visible: boolean) => {
      const entry = measurements.get(element!);
      if (!entry) {
        return;
      }
      let index = entry[INDEX];
      if (visible && entry[SIZE] === UNMEASURED) {
        entry[SIZE] = getSize(entry[ELEMENT]);
      }
      const endPosition = entry[BEFORE] + entry[SIZE];
      spans[index] = visible ? [endPosition + entry[AFTER] + gap, entry[BEFORE], endPosition] : empty;
      while (index > 1) {
        // eslint-disable-next-line no-bitwise
        index >>>= 1;
        const left = spans[index * 2];
        const right = spans[index * 2 + 1];
        spans[index] = [
          left[0] + right[0],
          Math.min(left[1], left[0] + right[1]),
          Math.max(left[2], left[0] + right[2]),
        ];
      }
    };

    entries.forEach((entry, index) => {
      entry[INDEX] = base + index;
      measurements.set(entry[ELEMENT], entry);
      setVisible(entry[ELEMENT], entry[VISIBLE]);
    });
    updateMeasurements = (item, visible) => {
      setVisible(item.element, visible);
      const groupId = item.groupId;
      if (groupId) {
        const divider = overflowDividers[groupId];
        if (divider) {
          setVisible(divider.element, groupVisibility[groupId] !== 'hidden');
        }
      }
    };
    return refreshMenu => {
      const menu = measurements.get(overflowMenu!);
      if (refreshMenu && menu && menu[SIZE] === 0) {
        menu[SIZE] = UNMEASURED;
      }
      setVisible(overflowMenu, hasOverflowItems());
      return Math.max(0, spans[1][2] - spans[1][1]);
    };
  }

  const getSnapshot: OverflowManager['getSnapshot'] = () => snapshot;

  const processOverflowItems = (): boolean => {
    if (!container) {
      return false;
    }
    try {
      updateMeasurements = noop;

      // Snapshot of the visible/invisible state to compare for updates
      const visibleTop = visibleItemQueue.peek();
      const invisibleTop = invisibleItemQueue.peek();

      // Reveal in one batch before measuring. Hidden elements have no layout size, and
      // reading geometry between individual visibility writes forces repeated layouts.
      if (options.measureGap) {
        // Repeated native sibling comparisons can be quadratic. Cache document order for this pass.
        container.querySelectorAll('*').forEach((element, index) => elementOrder.set(element, index + 1));
        while (invisibleItemQueue.size()) {
          setItemVisibility(true);
        }
      }
      const getOccupiedSize = measureOccupiedSize();
      const availableSize = getSize(container, true) - options.padding;

      while (compareItems(invisibleItemQueue.peek(), visibleItemQueue.peek()) > 0) {
        setItemVisibility(false); // hide elements whose priority become smaller than the highest priority of the hidden one
      }

      // Run the show/hide step twice - the first step might not be correct if
      // it was triggered by a new item being added - new items are always visible by default.
      for (let i = 0; i < 2; i++) {
        if (i) {
          getOccupiedSize(true);
        }
        // Add items until available width is filled - can result in overflow
        while (
          (getOccupiedSize() < availableSize && invisibleItemQueue.size()) ||
          invisibleItemQueue.size() === 1 // attempt to show the last invisible item hoping it's size does not exceed overflow menu size
        ) {
          setItemVisibility(true);
        }

        // Remove items until there's no more overflow
        while (getOccupiedSize() > availableSize && visibleItemQueue.size() > options.minimumVisible) {
          // Never hide pinned items - they should always remain visible
          const nextItem = overflowItems[visibleItemQueue.peek()!];
          if (nextItem && nextItem.pinned) {
            break;
          }

          setItemVisibility(false);
        }
      }

      // only update when the state of visible/invisible items has changed
      return visibleItemQueue.peek() !== visibleTop || invisibleItemQueue.peek() !== invisibleTop;
    } finally {
      elementOrder.clear();
    }
  };

  const forceUpdate: OverflowManager['forceUpdate'] = () => {
    if (processOverflowItems() || forceDispatch) {
      forceDispatch = false;
      dispatchOverflowUpdate();
    }
  };

  const update: OverflowManager['update'] = debounce(forceUpdate);

  const setOptions: OverflowManager['setOptions'] = nextOptions => {
    const shouldTriggerUpdate = Object.entries(nextOptions).some(
      ([key, value]) =>
        typeof value !== 'function' &&
        value !== undefined &&
        (value || key === 'measureGap') &&
        options[key as keyof OverflowOptions] !== value,
    );

    Object.assign(options, nextOptions);

    if (shouldTriggerUpdate) {
      forceDispatch = true;
      update();
    }
  };

  const observe: OverflowManager['observe'] = (
    observedContainer,
    { forceUpdate: shouldForceUpdate, ...userOptions } = {},
  ) => {
    Object.assign(options, userOptions);

    if (!container) {
      Object.keys(overflowItems).forEach(id => visibleItemQueue.enqueue(id));
    }

    container = observedContainer;
    disposeResizeObserver = observeResize(container, entries => {
      if (!entries[0] || !container) {
        return;
      }
      update();
    });

    if (shouldForceUpdate && getSize(observedContainer, true)) {
      forceUpdate();
    }
  };

  const disconnect: OverflowManager['disconnect'] = () => {
    disposeResizeObserver();
    disposeResizeObserver = noop;

    // reset flags
    container = undefined;
    forceDispatch = true;

    // clear all entries
    Object.keys(overflowItems).forEach(removeItem);
    Object.keys(overflowDividers).forEach(removeDivider);
    removeOverflowMenu();
    updateMeasurements = noop;

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
    if (container) {
      // Updates to elements might not change the queue tops
      // i.e. new element is enqueued but the top of the queue stays the same
      // force a dispatch on the next batched update
      forceDispatch = true;
      visibleItemQueue.enqueue(items.id);
      update();
    }

    const groupId = items.groupId;
    if (groupId) {
      updateGroup(groupId, 1, 1);
      items.element.setAttribute(DATA_OVERFLOW_GROUP, groupId);
    }
  };

  const addOverflowMenu: OverflowManager['addOverflowMenu'] = el => {
    if (overflowMenu === el) {
      return;
    }

    overflowMenu = el;

    if (container) {
      forceDispatch = true;
      if (invisibleItemQueue.size()) {
        forceUpdate();
      } else {
        update();
      }
    }
  };

  const addDivider: OverflowManager['addDivider'] = divider => {
    const groupId = divider.groupId;
    if (!groupId || overflowDividers[groupId]) {
      return;
    }

    divider.element.setAttribute(DATA_OVERFLOW_GROUP, groupId);
    overflowDividers[groupId] = divider;
  };

  const removeOverflowMenu: OverflowManager['removeOverflowMenu'] = () => {
    const needsUpdate = overflowMenu && invisibleItemQueue.size();
    overflowMenu = undefined;

    if (container && needsUpdate) {
      forceDispatch = true;
      update();
    }
  };

  const removeDivider: OverflowManager['removeDivider'] = groupId => {
    const divider = overflowDividers[groupId];
    if (divider) {
      delete overflowDividers[groupId];
      divider.element.removeAttribute(DATA_OVERFLOW_GROUP);
    }
  };

  const removeItem: OverflowManager['removeItem'] = itemId => {
    const item = overflowItems[itemId];
    if (!item) {
      return;
    }

    if (container) {
      // We might be removing an item in an overflow which would not affect the tops,
      // but we need to update anyway to update the overflow menu state
      forceDispatch = true;
    }

    const groupId = item.groupId;
    if (groupId) {
      // Items not yet enqueued (before observe) are visible too.
      updateGroup(groupId, invisibleItemQueue.contains(itemId) ? 0 : -1, -1);
      item.element.removeAttribute(DATA_OVERFLOW_GROUP);
    }
    visibleItemQueue.remove(itemId);
    invisibleItemQueue.remove(itemId);

    delete overflowItems[itemId];
    if (container) {
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
