import type * as React from 'react';
import type { OverflowContextValue } from './overflowContext';
import type { OverflowManager } from '@fluentui/priority-overflow';

/**
 * @internal
 */
export interface UseOverflowContainerReturn<TElement extends HTMLElement>
  extends Pick<OverflowContextValue, 'registerItem' | 'updateOverflow' | 'registerOverflowMenu' | 'registerDivider'> {
  /**
   * Ref callback to apply to the container that will overflow
   */
  containerRef: React.RefObject<TElement | null>;

  /**
   * Canonical overflow manager for the current container.
   */
  manager: OverflowManager | null;
}
