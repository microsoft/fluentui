'use client';

import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';
import { useOverflowCount } from './useOverflowCount';

export interface UseOverflowMenuOptions {
  /**
   * The unique identifier for the menu used by the overflow manager. If not provided, a unique id will be generated.
   */
  id?: string;
}

export function useOverflowMenu<TElement extends HTMLElement>(
  idOrOptions?: string | UseOverflowMenuOptions,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
): { ref: React.MutableRefObject<TElement | null>; overflowCount: number; isOverflowing: boolean } {
  const { id } = typeof idOrOptions === 'string' ? { id: idOrOptions } : idOrOptions || {};
  const elementId = useId('overflow-menu', id);
  const overflowCount = useOverflowCount();
  const { registerOverflowMenu, forceUpdateOverflow } = useOverflowContext();
  const ref = React.useRef<TElement | null>(null);
  const isOverflowing = overflowCount > 0;

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const unregister = registerOverflowMenu(ref.current);
      if (isOverflowing) {
        forceUpdateOverflow();
      }
      return () => {
        unregister();
        forceUpdateOverflow();
      };
    }
  }, [registerOverflowMenu, forceUpdateOverflow, isOverflowing, elementId]);

  return { ref, overflowCount, isOverflowing };
}
