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
   * A higher priority means the item overflows later.
   */
  priority?: number;
  /**
   * The single child that has overflow item behavior attached.
   */
  children: React.ReactElement;
};
