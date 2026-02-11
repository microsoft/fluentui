'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';

/**
 * @internal
 * Registers an overflow item
 * @param id - unique identifier for the item used by the overflow manager
 * @param priority - higher priority means the item overflows later
 * @param groupId - assigns the item to a group, group visibility can be watched
 * @param pinned - if true, the item will never overflow and will always be visible
 * @returns ref to assign to an intrinsic HTML element
 */
export function useOverflowItem<TElement extends HTMLElement>(
  id: string,
  priority?: number,
  groupId?: string,
  pinned?: boolean,
): React.RefObject<TElement | null> {
  const ref = React.useRef<TElement | null>(null);
  const registerItem = useOverflowContext(v => v.registerItem);

  useIsomorphicLayoutEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof pinned !== 'undefined' && typeof priority !== 'undefined' && pinned) {
        // eslint-disable-next-line no-console
        console.error(
          `useOverflowItem: Overflow item with id "${id}" has pinned=true and priority<0. ` +
            `Pinned items are always visible and should not have defined priority.`,
        );
      }
    }

    if (ref.current) {
      return registerItem({
        element: ref.current,
        id,
        priority: priority ?? 0,
        groupId,
        pinned,
      });
    }
  }, [id, priority, registerItem, groupId, pinned]);

  return ref;
}
