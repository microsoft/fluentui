import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';
import { useOverflowCount } from './useOverflowCount';
import { DATA_OVERFLOW_MENU } from './constants';

export function useOverflowMenu<TElement extends HTMLElement>(id = 'overflow-menu') {
  const overflowCount = useOverflowCount();
  const registerItem = useOverflowContext(v => v.registerItem);
  const updateOverflow = useOverflowContext(v => v.updateOverflow);
  const ref = React.useRef<TElement>(null);
  const isOverflowing = overflowCount > 0;

  useIsomorphicLayoutEffect(() => {
    let deregisterItem: () => void = () => null;
    const element = ref.current;
    if (element) {
      deregisterItem = registerItem({
        element,
        id,
        priority: Infinity,
      });
      element.setAttribute(DATA_OVERFLOW_MENU, '');
    }

    return () => {
      element?.removeAttribute(DATA_OVERFLOW_MENU);
      deregisterItem();
    };
  }, [registerItem, isOverflowing, id]);

  React.useEffect(() => {
    if (isOverflowing) {
      updateOverflow();
    }
  }, [isOverflowing, updateOverflow, ref]);

  return { ref, overflowCount, isOverflowing };
}
