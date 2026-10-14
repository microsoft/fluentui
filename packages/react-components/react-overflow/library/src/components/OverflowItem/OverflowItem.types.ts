import type * as React from 'react';

/**
 * OverflowItemProps
 */
export type OverflowItemProps = {
  /**
   * The unique identifier for the item used by the overflow manager.
   */
  id: string;
  /**
   * Assigns the item to a group, group visibility can be watched.
   */
  groupId?: string;
  /**
   * The single child that has overflow item behavior attached.
   */
  children: React.ReactElement;
  /**
   * Optional size hint in pixels for the overflow axis.
   * When provided and used with `createFlatOverflowManager`, the manager will use
   * this value instead of reading `offsetWidth`/`offsetHeight`, eliminating a
   * layout read on first compute. Only set when the item has a known, stable size.
   */
  sizeHint?: number;
} & (
  | {
      /**
       * If true, the item will never overflow and will always be visible.
       * Mutually exclusive with `priority`.
       */
      pinned?: boolean;
      priority?: never;
    }
  | {
      pinned?: never;
      /**
       * A higher priority means the item overflows later.
       * Mutually exclusive with `pinned`.
       */
      priority?: number;
    }
);
