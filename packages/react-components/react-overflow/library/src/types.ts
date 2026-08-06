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
