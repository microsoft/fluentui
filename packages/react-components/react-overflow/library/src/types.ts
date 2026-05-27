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
  containerRef: React.RefCallback<TElement>;

  /**
   * RefObject pointing to the currently observed container element.
   * Use this when you need to read `containerRef.current` (e.g. for MutationObserver).
   * @deprecated Prefer `containerRef` (RefCallback). This exists for backward compatibility.
   */
  containerRefObject: React.RefObject<TElement | null>;

  /**
   * Canonical overflow manager for the current container.
   */
  manager: OverflowManager | null;
}
