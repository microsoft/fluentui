import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';
import { useOverflowCount } from './useOverflowCount';

export function useOverflowMenu<TElement extends HTMLElement>(id = 'overflow-menu') {
  const overflowCount = useOverflowCount();
  const registerItem = useOverflowContext(v => v.registerItem);
  const updateOverflow = useOverflowContext(v => v.updateOverflow);
  const ref = React.useRef<TElement>(null);
  const isOverflowing = overflowCount > 0;

  useIsomorphicLayoutEffect(() => {
    let deregisterItem: () => void = () => null;
    if (ref.current) {
      deregisterItem = registerItem({
        element: ref.current,
        id,
        priority: Infinity,
      });
      ref.current.style.setProperty('flex-shrink', '0');
    }

    return deregisterItem;
  }, [registerItem, isOverflowing, id]);

  React.useEffect(() => {
    if (isOverflowing) {
      updateOverflow();
    }
  }, [isOverflowing, updateOverflow, ref]);

  return { ref, overflowCount, isOverflowing };
}
