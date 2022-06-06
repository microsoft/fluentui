import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';

/**
 * Registers an overflow item
 * @param id - unique identifier for the item used by the overflow manager
 * @param priority - higher priority means the item overflows later
 * @param groupId - assigns the item to a group, group visibility can be watched
 * @returns ref to assign to an intrinsic HTML element
 */
export function useOverflowItem<TElement extends HTMLElement>(id: string, priority?: number, groupId?: string) {
  const ref = React.useRef<TElement>(null);
  const registerItem = useOverflowContext(v => v.registerItem);

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      return registerItem({
        element: ref.current,
        id,
        priority: priority ?? 0,
        groupId,
      });
    }
  }, [id, priority, registerItem, groupId]);

  return ref;
}
