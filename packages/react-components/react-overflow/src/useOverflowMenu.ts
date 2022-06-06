import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';
import { useOverflowCount } from './useOverflowCount';
import { DATA_OVERFLOW_MENU } from './constants';

export function useOverflowMenu<TElement extends HTMLElement>(id?: string) {
  const elementId = useId('overflow-menu', id);
  const overflowCount = useOverflowCount();
  const registerItem = useOverflowContext(v => v.registerItem);
  const updateOverflow = useOverflowContext(v => v.updateOverflow);
  const ref = React.useRef<TElement>(null);
  const isOverflowing = overflowCount > 0;

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (element) {
      const deregisterItem = registerItem({
        element,
        id: elementId,
        priority: Infinity,
      });
      element.setAttribute(DATA_OVERFLOW_MENU, '');

      return () => {
        deregisterItem();
        element?.removeAttribute(DATA_OVERFLOW_MENU);
      };
    }
  }, [registerItem, isOverflowing, elementId]);

  useIsomorphicLayoutEffect(() => {
    if (isOverflowing) {
      updateOverflow();
    }
  }, [isOverflowing, updateOverflow, ref]);

  return { ref, overflowCount, isOverflowing };
}
