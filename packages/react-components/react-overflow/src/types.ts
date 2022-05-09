import * as React from 'react';
import { OverflowContextValue } from './overflowContext';

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
