import * as React from 'react';
import { OverflowContextValue } from './overflowContext';

/**
 * @internal
 */
export interface UseOverflowContainerReturn<TElement extends HTMLElement>
  extends Pick<OverflowContextValue, 'registerItem' | 'updateOverflow' | 'registerOverflowMenu' | 'registerDivider'> {
  /**
   * Ref to apply to the container that will overflow
   */
  containerRef: React.RefObject<TElement>;
}

export interface OverflowImperativeRef {
  /**
   * Used to force an update of the overflow on demand
   */
  updateOverflow: () => void;
}
