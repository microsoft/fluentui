export type OverflowDirection = 'start' | 'end';
export type OverflowAxis = 'horizontal' | 'vertical';
export type OverflowGroupState = 'visible' | 'hidden' | 'overflow';

export interface OverflowSnapshot {
  hasOverflow: boolean;
  overflowCount: number;
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
}

export interface OverflowItemEntry {
  /**
   * HTML element that will be disappear when overflowed
   */
  element: HTMLElement;
  /**
   * Lower priority items are invisible first when the container is overflowed
   * @default 0
   */
  priority: number;
  /**
   * Specific id, used to track visibility and provide updates to consumers
   */
  id: string;

  groupId?: string;

  /**
   * If true, the item will never overflow and will always be visible.
   * Pinned items are excluded from the overflow count.
   * @default false
   */
  pinned?: boolean;
}

export interface OverflowDividerEntry {
  /**
   * HTML element that will disappear when overflowed
   */
  element: HTMLElement;

  groupId: string;
}

/**
 * signature similar to standard event listeners, but typed to handle the custom event
 */
export type OnUpdateOverflow = (data: OverflowEventPayload) => void;

export type OnUpdateItemVisibility = (data: OnUpdateItemVisibilityPayload) => void;

/**
 * Payload of the custom DOM event for overflow updates
 */
export interface OverflowEventPayload {
  visibleItems: OverflowItemEntry[];
  invisibleItems: OverflowItemEntry[];
  groupVisibility: Record<string, OverflowGroupState>;
}

export interface OnUpdateItemVisibilityPayload {
  item: OverflowItemEntry;
  visible: boolean;
}

export interface ObserveOptions {
  /**
   * Padding (in px) at the end of the container before overflow occurs
   * Useful to account for extra elements (i.e. dropdown menu)
   * or to account for any kinds of margins between items which are hard to measure with JS
   * @default 10
   */
  padding?: number;
  /**
   * Direction where items are removed when overflow occurs
   * @default end
   */
  overflowDirection?: OverflowDirection;

  /**
   * Horizontal or vertical overflow
   * @default horizontal
   */
  overflowAxis?: OverflowAxis;

  /**
   * The minimum number of visible items
   */
  minimumVisible?: number;

  /**
   * Callback when item visibility is updated
   */
  onUpdateItemVisibility: OnUpdateItemVisibility;

  /**
   * Callback when item visibility is updated
   */
  onUpdateOverflow: OnUpdateOverflow;

  /**
   * When true, the overflow menu has default hidden items
   * @default false
   */
  hasHiddenItems?: boolean;
}

export type OverflowManagerOptions = ObserveOptions;

/**
 * @internal
 */
export interface OverflowManager {
  /**
   * Updates engine options without requiring full observation re-creation.
   */
  setOptions: (options: Partial<OverflowManagerOptions>) => void;
  /**
   * Starts observing the container and managing the overflow state
   */
  observe: (container: HTMLElement) => () => void;
  /**
   * Registers an overflow item and returns a cleanup function.
   */
  registerItem: (items: OverflowItemEntry) => () => void;
  /**
   * Remove overflow item
   */
  removeItem: (itemId: string) => void;
  /**
   * Manually update the overflow, updates are batched and async
   */
  update: () => void;
  /**
   * Manually update the overflow sync
   */
  forceUpdate: () => void;

  /**
   * Attaches an element that opens an overflow menu and returns a cleanup function.
   * This is used to calculate available space and check if additional items need to overflow.
   */
  attachOverflowMenu: (element: HTMLElement) => () => void;

  /**
   * Registers a divider and returns a cleanup function.
   */
  registerDivider: (divider: OverflowDividerEntry) => () => void;

  /**
   * Returns the current canonical overflow snapshot.
   */
  getSnapshot: () => OverflowSnapshot;

  /**
   * Subscribes to snapshot changes.
   */
  subscribe: (listener: () => void) => () => void;

  // --- Deprecated backward-compat methods ---

  /**
   * @deprecated Use `registerItem` instead — it returns a cleanup function.
   */
  addItem: (item: OverflowItemEntry) => void;

  /**
   * @deprecated Use `registerDivider` instead — it returns a cleanup function.
   */
  addDivider: (divider: OverflowDividerEntry) => void;

  /**
   * @deprecated Use `attachOverflowMenu` instead — it returns a cleanup function.
   */
  addOverflowMenu: (element: HTMLElement) => void;

  /**
   * @deprecated Call the cleanup function returned by `observe` instead.
   */
  disconnect: () => void;

  /**
   * @deprecated Call the cleanup function returned by `registerDivider` instead.
   */
  removeDivider: (groupId: string) => void;

  /**
   * @deprecated Call the cleanup function returned by `attachOverflowMenu` instead.
   */
  removeOverflowMenu: () => void;
}
