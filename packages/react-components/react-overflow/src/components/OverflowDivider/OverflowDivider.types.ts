import * as React from 'react';

/**
 * OverflowDividerProps
 */
export type OverflowDividerProps = {
  /**
   * Assigns the item to a group, group visibility can be watched.
   */
  groupId: string;
  /**
   * The single child that has overflow item behavior attached.
   */
  children: React.ReactElement;
};
