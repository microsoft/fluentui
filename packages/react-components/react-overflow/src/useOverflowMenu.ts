import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';
import { useOverflowCount } from './useOverflowCount';

export function useOverflowMenu<TElement extends HTMLElement>(id?: string) {
  const elementId = useId('overflow-menu', id);
  const overflowCount = useOverflowCount();
  const registerOverflowMenu = useOverflowContext(v => v.registerOverflowMenu);
  const updateOverflow = useOverflowContext(v => v.updateOverflow);
  const ref = React.useRef<TElement>(null);
  const offsetRef = React.useRef(0);
  const isOverflowing = overflowCount > 0;

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || !isOverflowing) {
      offsetRef.current = 0;
      return;
    }

    offsetRef.current = 1;

    return registerOverflowMenu(element);
  }, [registerOverflowMenu, isOverflowing, elementId]);

  useIsomorphicLayoutEffect(() => {
    if (isOverflowing) {
      updateOverflow();
    }
  }, [isOverflowing, updateOverflow, ref]);

  return { ref, overflowCount, isOverflowing };
}
