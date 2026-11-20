import { EMPTY_SNAPSHOT } from './consts';
import { observeResize } from './createResizeObserver';
import { debounce } from './debounce';
import type {
  OverflowItemEntry,
  OverflowDividerEntry,
  OverflowManager,
  OverflowOptions,
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
 * Creates a flat-list overflow manager optimised for simple, ungrouped horizontal
 * tab-bar scenarios (no pinning, no groups, no dividers, at most one elevated
 * priority item – the selected tab).
 *
 * Compared with createOverflowManager:
 * - Sizes are measured once per structural change and then cached (prefix-sum array).
 * - Container-resize recomputation is O(log N) via binary search on the prefix sums.
 * - No priority-queue allocation; items are stored in a flat insertion-ordered array.
 * - Group/divider bookkeeping is omitted entirely.
 *
 * @internal
 */
export function createFlatOverflowManager(initialOptions: Partial<OverflowOptions> = {}): OverflowManager {
  // ---------- state --------------------------------------------------------
  /** Items in registration / DOM order. */
  const items: OverflowItemEntry[] = [];
  /**
   * Per-item size cache. Items are measured lazily — only as needed by the
   * greedy scan. Items beyond the visible cutoff are never measured, making
   * first-compute cost O(K+1) DOM reads where K is the number of visible
   * items, regardless of total item count N.
   */
  const sizeById = new Map<string, number>();

  let container: HTMLElement | undefined;
  let overflowMenu: HTMLElement | undefined;
  let observing = false;
  let forceUpdateOnObserve = false;
  let forceDispatch = true;

  /** Previous per-item visible flag used to detect changes. */
  const prevVisible = new Map<string, boolean>();

  const options: Required<OverflowOptions> = { ...DEFAULT_OPTIONS, ...initialOptions };
  const listeners = new Set<() => void>();
  let snapshot: OverflowSnapshot = EMPTY_SNAPSHOT;

  let disposeResizeObserver: () => void = () => {
    /* noop */
  };

  // ---------- helpers ------------------------------------------------------
  const getAxisOffset = (el: HTMLElement) => (options.overflowAxis === 'horizontal' ? el.offsetWidth : el.offsetHeight);

  const takeSnapshot = (next: OverflowSnapshot) => {
    snapshot = next;
    for (const l of listeners) {
      l();
    }
  };

  /**
   * Returns the cached size for an item, measuring it only if not already in
   * the cache. Uses sizeHint when available to skip the DOM read entirely.
   */
  const getItemSize = (item: OverflowItemEntry): number => {
    if (!sizeById.has(item.id)) {
      sizeById.set(item.id, item.sizeHint !== undefined ? item.sizeHint : getAxisOffset(item.element));
    }
    return sizeById.get(item.id)!;
  };

  // ---------- core compute -------------------------------------------------
  const computeAndApply = (): boolean => {
    if (!container) {
      return false;
    }

    const n = items.length;
    if (n === 0) {
      return false;
    }

    const rawContainerSize = options.overflowAxis === 'horizontal' ? container.clientWidth : container.clientHeight;
    const registeredMenuSize = overflowMenu ? getAxisOffset(overflowMenu) : 0;

    // Restore classic manager semantics:
    // - padding is ALWAYS subtracted (reserves fixed elements like an add-tab button)
    // - menuSize is ADDITIONALLY subtracted when the overflow menu is registered
    // This matches: items ≤ containerWidth - padding - menuSize (when overflowing)
    const available = rawContainerSize - options.padding;
    const effectiveAvailable = available - registeredMenuSize;

    const newVisible: boolean[] = new Array(n);

    if (options.overflowDirection === 'end') {
      // Greedy scan left-to-right: measure only until the first item that
      // doesn't fit, then stop. Items beyond that point are never touched.
      // First-compute cost is O(K+1) reads where K = visible items, not O(N).
      let acc = 0;
      let cutoff = 0;
      for (let i = 0; i < n; i++) {
        const sz = getItemSize(items[i]);
        if (acc + sz <= effectiveAvailable) {
          acc += sz;
          cutoff++;
        } else {
          break;
        }
      }

      if (cutoff === n && !options.hasHiddenItems && registeredMenuSize === 0) {
        // All items fit without overflow menu present – no overflow.
        newVisible.fill(true);
      } else {
        cutoff = Math.min(Math.max(cutoff, options.minimumVisible), n);

        // Find first item with elevated priority (selected tab).
        let priorityIdx = -1;
        for (let i = 0; i < n; i++) {
          if ((items[i].priority ?? 0) > 0) {
            priorityIdx = i;
            break;
          }
        }

        if (priorityIdx >= cutoff) {
          // Priority item would be hidden – include it and repack from the left.
          const pSize = getItemSize(items[priorityIdx]);
          const remaining = effectiveAvailable - pSize;
          let racc = 0;
          let count = 0;
          for (let i = 0; i < n; i++) {
            if (i === priorityIdx) {
              continue;
            }
            const sz = getItemSize(items[i]);
            if (racc + sz <= remaining) {
              racc += sz;
              count++;
            } else {
              break;
            }
          }
          let filled = 0;
          for (let i = 0; i < n; i++) {
            if (i === priorityIdx) {
              newVisible[i] = true;
            } else {
              newVisible[i] = filled < count;
              if (filled < count) {
                filled++;
              }
            }
          }
        } else {
          for (let i = 0; i < n; i++) {
            newVisible[i] = i < cutoff;
          }
        }
      }
    } else {
      // direction='start': greedy scan right-to-left.
      let acc = 0;
      let fromRight = 0;
      for (let i = n - 1; i >= 0; i--) {
        const sz = getItemSize(items[i]);
        if (acc + sz <= effectiveAvailable) {
          acc += sz;
          fromRight++;
        } else {
          break;
        }
      }

      if (fromRight === n && !options.hasHiddenItems && registeredMenuSize === 0) {
        newVisible.fill(true);
      } else {
        fromRight = Math.min(Math.max(fromRight, options.minimumVisible), n);
        const visibleFrom = n - fromRight;

        let priorityIdx = -1;
        for (let i = n - 1; i >= 0; i--) {
          if ((items[i].priority ?? 0) > 0) {
            priorityIdx = i;
            break;
          }
        }

        if (priorityIdx >= 0 && priorityIdx < visibleFrom) {
          const pSize = getItemSize(items[priorityIdx]);
          const remaining = effectiveAvailable - pSize;
          acc = 0;
          fromRight = 0;
          for (let i = n - 1; i >= 0; i--) {
            if (i === priorityIdx) {
              continue;
            }
            const sz = getItemSize(items[i]);
            if (acc + sz <= remaining) {
              acc += sz;
              fromRight++;
            } else {
              break;
            }
          }
          const vFrom = n - fromRight;
          for (let i = 0; i < n; i++) {
            newVisible[i] = i === priorityIdx || i >= vFrom;
          }
        } else {
          for (let i = 0; i < n; i++) {
            newVisible[i] = i >= visibleFrom;
          }
        }
      }
    }

    // ---------- apply changes + emit snapshot ------------------------------
    let changed = false;
    const itemVisibility: Record<string, boolean> = {};
    const visibleItems: OverflowItemEntry[] = [];
    const invisibleItems: OverflowItemEntry[] = [];

    for (let i = 0; i < n; i++) {
      const item = items[i];
      const visible = newVisible[i];
      itemVisibility[item.id] = visible;
      (visible ? visibleItems : invisibleItems).push(item);

      if (prevVisible.get(item.id) !== visible) {
        changed = true;
        prevVisible.set(item.id, visible);
        options.onUpdateItemVisibility({ item, visible });
      }
    }

    if (changed || forceDispatch) {
      takeSnapshot({
        itemVisibility,
        groupVisibility: {},
        invisibleItemCount: invisibleItems.length,
      });
      options.onUpdateOverflow({ visibleItems, invisibleItems, groupVisibility: {} });
    }

    return changed;
  };

  // ---------- public API ---------------------------------------------------
  const forceUpdate: OverflowManager['forceUpdate'] = () => {
    if (!container) {
      forceUpdateOnObserve = true;
      return;
    }
    computeAndApply();
    forceDispatch = false;
  };

  const update: OverflowManager['update'] = debounce(forceUpdate);

  const observe: OverflowManager['observe'] = (observedContainer, observeOptions) => {
    const { forceUpdate: shouldForceUpdate, ...userOptions } = observeOptions ?? {};
    Object.assign(options, userOptions);

    container = observedContainer;
    observing = true;

    disposeResizeObserver = observeResize(container, entries => {
      if (!entries[0] || !container) {
        return;
      }
      update();
    });

    const clientSize =
      options.overflowAxis === 'horizontal' ? observedContainer.clientWidth : observedContainer.clientHeight;

    if ((shouldForceUpdate || forceUpdateOnObserve) && clientSize > 0) {
      forceUpdate();
    }
    forceUpdateOnObserve = false;
  };

  const disconnect: OverflowManager['disconnect'] = () => {
    disposeResizeObserver();
    disposeResizeObserver = () => {
      /* noop */
    };

    container = undefined;
    observing = false;
    forceDispatch = true;
    forceUpdateOnObserve = false;

    items.length = 0;
    sizeById.clear();
    prevVisible.clear();

    takeSnapshot(EMPTY_SNAPSHOT);
  };

  const addItem: OverflowManager['addItem'] = item => {
    if (items.some(i => i.id === item.id)) {
      return;
    }

    if (!observing) {
      // Initial mount: items register before observe() → insertion order = DOM order.
      items.push(item);
    } else {
      // Dynamic add or re-registration (priority change): insert by DOM position.
      let lo = 0;
      let hi = items.length;
      while (lo < hi) {
        // eslint-disable-next-line no-bitwise
        const mid = (lo + hi) >> 1;
        // eslint-disable-next-line no-bitwise
        if (items[mid].element.compareDocumentPosition(item.element) & 4) {
          lo = mid + 1;
        } else {
          hi = mid;
        }
      }
      items.splice(lo, 0, item);
    }

    if (observing) {
      forceDispatch = true;
      update();
    }
  };

  const removeItem: OverflowManager['removeItem'] = itemId => {
    const idx = items.findIndex(i => i.id === itemId);
    if (idx === -1) {
      return;
    }

    items.splice(idx, 1);
    // Keep sizeById entry – if the same element is re-registered (priority change)
    // the cached size is still valid and avoids measuring a display:none element.
    prevVisible.delete(itemId);

    if (observing) {
      forceDispatch = true;
      update();
    }
  };

  const addOverflowMenu: OverflowManager['addOverflowMenu'] = el => {
    overflowMenu = el;
    if (observing) {
      // Do not set forceDispatch: if menuReserve equals padding the first compute
      // already produced the correct visibility, and a no-op second pass should
      // not trigger a snapshot update or React re-render.
      update();
    }
  };

  const removeOverflowMenu: OverflowManager['removeOverflowMenu'] = () => {
    overflowMenu = undefined;
    if (observing) {
      update();
    }
  };

  const setOptions: OverflowManager['setOptions'] = nextOptions => {
    const axisChanging = !!(nextOptions.overflowAxis && options.overflowAxis !== nextOptions.overflowAxis);
    if (axisChanging) {
      sizeById.clear();
    }

    const shouldUpdate =
      axisChanging ||
      !!(nextOptions.overflowDirection && options.overflowDirection !== nextOptions.overflowDirection) ||
      (nextOptions.padding !== undefined && options.padding !== nextOptions.padding) ||
      (nextOptions.minimumVisible !== undefined && options.minimumVisible !== nextOptions.minimumVisible) ||
      (nextOptions.hasHiddenItems !== undefined && options.hasHiddenItems !== nextOptions.hasHiddenItems);

    Object.assign(options, nextOptions);

    if (shouldUpdate && observing) {
      forceDispatch = true;
      update();
    }
  };

  const getSnapshot: OverflowManager['getSnapshot'] = () => snapshot;

  const subscribe: OverflowManager['subscribe'] = listener => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  // Dividers are not supported in flat mode – these are intentional noops.
  const addDivider = (_divider: OverflowDividerEntry) => {
    /* noop */
  };
  const removeDivider = (_groupId: string) => {
    /* noop */
  };

  return {
    observe,
    disconnect,
    setOptions,
    addItem,
    removeItem,
    update,
    forceUpdate,
    addOverflowMenu,
    removeOverflowMenu,
    addDivider,
    removeDivider,
    getSnapshot,
    subscribe,
  };
}
