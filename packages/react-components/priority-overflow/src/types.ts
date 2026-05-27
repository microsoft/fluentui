/**
 * Direction where items are removed when overflow occurs.
 */
export type OverflowDirection = 'start' | 'end';

/**
 * Axis used to measure overflow.
 */
export type OverflowAxis = 'horizontal' | 'vertical';

/**
 * Visibility state for an overflow group.
 */
export type OverflowGroupState = 'visible' | 'hidden' | 'overflow';

/**
 * Tracked item in the overflow manager.
 */
export interface OverflowItemEntry {
  /**
   * HTML element that disappears when the item overflows.
   */
  element: HTMLElement;
  /**
   * Lower-priority items become invisible first when the container overflows.
   * @default 0
   */
  priority: number;
  /**
   * Stable item id used to track visibility and emit updates.
   */
  id: string;

  /**
   * Optional group id used to coordinate divider and grouped visibility states.
   */
  groupId?: string;

  /**
   * If true, the item will never overflow and will always be visible.
   * Pinned items are excluded from the overflow count.
   * @default false
   */
  pinned?: boolean;
}

/**
 * Tracked divider in the overflow manager.
 */
export interface OverflowDividerEntry {
  /**
   * HTML element that disappears when its group overflows.
   */
  element: HTMLElement;

  /**
   * Id of the group controlled by this divider.
   */
  groupId: string;
}

/**
 * Signature similar to standard event listeners, typed for overflow updates.
 */
export type OnUpdateOverflow = (data: OverflowEventPayload) => void;

/**
 * Callback invoked when a single item's visibility changes.
 */
export type OnUpdateItemVisibility = (data: OnUpdateItemVisibilityPayload) => void;

/**
 * Payload of the custom DOM event for overflow updates
 */
export interface OverflowEventPayload {
  /**
   * Items currently visible in the container.
   */
  visibleItems: OverflowItemEntry[];

  /**
   * Items currently moved to overflow.
   */
  invisibleItems: OverflowItemEntry[];

  /**
   * Current visibility state by group id.
   */
  groupVisibility: Record<string, OverflowGroupState>;
}

/**
 * Payload for item-level visibility updates.
 */
export interface OnUpdateItemVisibilityPayload {
  /**
   * Item whose visibility changed.
   */
  item: OverflowItemEntry;

  /**
   * Whether the item is now visible.
   */
  visible: boolean;
}

/**
 * Options used to initialize or reconfigure overflow observation.
 */
export interface ObserveOptions {
  /**
   * Padding in pixels reserved at the end of the container before overflow occurs.
   * Useful for accounting for extra elements (for example an overflow menu button)
   * or margins between items that are difficult to measure in JavaScript.
   * @default 10
   */
  padding?: number;
  /**
   * Direction where items are removed when overflow occurs.
   * @default end
   */
  overflowDirection?: OverflowDirection;

  /**
   * Overflow axis used for size measurement.
   * @default horizontal
   */
  overflowAxis?: OverflowAxis;

  /**
   * Minimum number of items that must remain visible.
   */
  minimumVisible?: number;

  /**
   * Callback invoked when an individual item's visibility changes.
   */
  onUpdateItemVisibility: OnUpdateItemVisibility;

  /**
   * Callback invoked after overflow state is recomputed.
   */
  onUpdateOverflow: OnUpdateOverflow;

  /**
   * When true, reserve space as if the overflow menu were visible even with no overflowing items.
   * @default false
   */
  hasHiddenItems?: boolean;
}

/**
 * Runtime options accepted by `setOptions`.
 */
export type OverflowManagerOptions = ObserveOptions;

/**
 * Internal manager contract used to observe and compute priority overflow.
 *
 * @internal
 */
export interface OverflowManager {
  /**
   * Updates engine options without requiring full observation re-creation.
   */
  setOptions: (options: Partial<OverflowManagerOptions>) => void;
  /**
   * Starts observing the container and managing overflow state.
   */
  observe: (container: HTMLElement) => () => void;
  /**
   * Adds an item to overflow tracking.
   */
  addItem: (item: OverflowItemEntry) => void;

  /**
   * Removes an overflow item by id.
   */
  removeItem: (itemId: string) => void;
  /**
   * Schedules an asynchronous overflow recomputation.
   */
  update: () => void;
  /**
   * Forces an immediate synchronous overflow recomputation.
   */
  forceUpdate: () => void;

  /**
   * Attaches the overflow menu element.
   * This is used to calculate available space and determine whether more items should overflow.
   */
  addOverflowMenu: (element: HTMLElement) => void;

  /**
   * Removes the overflow menu element.
   */
  removeOverflowMenu: () => void;

  /**
   * Adds a divider for the provided group.
   */
  addDivider: (divider: OverflowDividerEntry) => void;

  /**
   * Removes a divider by group id.
   */
  removeDivider: (groupId: string) => void;

  /**
   * Returns the current canonical overflow snapshot.
   */
  getSnapshot: () => OverflowEventPayload;

  /**
   * Subscribes to snapshot changes.
   */
  subscribe: (listener: () => void) => () => void;

  /**
   * Disconnects all active observers.
   * Equivalent to calling the latest cleanup function returned by `observe`.
   */
  disconnect: () => void;
}
