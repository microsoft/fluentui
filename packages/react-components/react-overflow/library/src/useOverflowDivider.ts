import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';

/**
 * @internal
 * Registers an overflow item
 * @param groupId - assigns the item to a group, group visibility can be watched
 * @returns ref to assign to an intrinsic HTML element
 */
export function useOverflowDivider<TElement extends HTMLElement>(groupId?: string) {
  const ref = React.useRef<TElement>(null);
  const registerDivider = useOverflowContext(v => v.registerDivider);

  useIsomorphicLayoutEffect(() => {
    if (ref.current && groupId) {
      return registerDivider({
        element: ref.current,
        groupId,
      });
    }
  }, [registerDivider, groupId]);

  return ref;
}
