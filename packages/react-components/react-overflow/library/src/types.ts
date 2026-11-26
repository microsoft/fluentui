import type * as React from 'react';
import type { OverflowContextValue } from './overflowContext';

/**
 * @public
 */
export interface UseOverflowContainerReturn<TElement extends HTMLElement>
  extends Pick<
    OverflowContextValue,
    | 'registerItem'
    | 'updateOverflow'
    | 'forceUpdateOverflow'
    | 'registerOverflowMenu'
    | 'registerDivider'
    | 'getSnapshot'
    | 'subscribe'
  > {
  /**
   * Ref to apply to the container that will overflow
   */
  containerRef: React.RefObject<TElement | null>;
}

/**
 * Imperative methods for requesting overflow recalculation after layout changes.
 */
export interface OverflowImperativeRef {
  /**
   * Requests a recalculation of the current DOM layout, coalescing calls in a microtask.
   * Call after layout changes have committed, such as from a layout effect, not alongside
   * a React state update. Overflow state is not updated synchronously by this method.
   */
  updateOverflow: () => void;
}
