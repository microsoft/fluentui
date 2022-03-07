import type { OverflowGroupState, OverflowItemEntry } from '@fluentui/priority-overflow';
import * as React from 'react';
export interface OverflowContextValue {
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
  hasOverflow: boolean;
  registerItem: (item: OverflowItemEntry) => () => void;
  updateOverflow: (padding?: number) => void;
}

export interface UseOverflowContainerReturn<TElement extends HTMLElement> {
  /**
   * Ref to apply to the container that will overflow
   */
  containerRef: React.RefObject<TElement>;
  /**
   * Registers and overflow item
   */
  registerItem: OverflowContextValue['registerItem'];
  /**
   * Imperative function to trigger overflow update
   */
  updateOverflow: OverflowContextValue['updateOverflow'];
}
