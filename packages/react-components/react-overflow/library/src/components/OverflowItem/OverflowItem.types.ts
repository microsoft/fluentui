import * as React from 'react';

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
