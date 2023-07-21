export type OverflowDirection = 'start' | 'end';
export type OverflowAxis = 'horizontal' | 'vertical';
export type OverflowGroupState = 'visible' | 'hidden' | 'overflow';
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
}

export interface OverflowDividerEntry {
  /**
   * HTML element that will be disappear when overflowed
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
}

/**
 * @internal
 */
export interface OverflowManager {
  /**
   * Starts observing the container and managing the overflow state
   */
  observe: (container: HTMLElement, options: ObserveOptions) => void;
  /**
   * Stops observing the container
   */
  disconnect: () => void;
  /**
   * Add overflow items
   */
  addItem: (items: OverflowItemEntry) => void;
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
   * Adds an element that opens an overflow menu. This is used to calculate
   * available space and check if additional items need to overflow
   */
  addOverflowMenu: (element: HTMLElement) => void;

  /**
   * Add overflow divider
   */
  addDivider: (divider: OverflowDividerEntry) => void;

  /**
   * Remove overflow divider
   */
  removeDivider: (groupId: string) => void;

  /**
   * Unsets the overflow menu element
   */
  removeOverflowMenu: () => void;
}
