'use client';

import * as React from 'react';
import { useId, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useOverflowContext } from './overflowContext';
import { useOverflowCount } from './useOverflowCount';

export function useOverflowMenu<TElement extends HTMLElement>(
  id?: string,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
): { ref: React.MutableRefObject<TElement | null>; overflowCount: number; isOverflowing: boolean } {
  const elementId = useId('overflow-menu', id);
  const overflowCount = useOverflowCount();
  const { registerOverflowMenu, forceUpdateOverflow } = useOverflowContext();
  const ref = React.useRef<TElement | null>(null);
  const isOverflowing = overflowCount > 0;

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      const unregister = registerOverflowMenu(ref.current);
      forceUpdateOverflow();
      return () => {
        unregister();
        forceUpdateOverflow();
      };
    }
    /**
     * `isOverflowing` is a re-run trigger.
     * Consumers gate the menu element on it,
     * so it stands in for "ref.current (re)attached".
     *
     * MAYBE: A callback ref would express this better,
     * but that would change the public ref type and
     * move logic earlier in the commit.
     */
  }, [registerOverflowMenu, forceUpdateOverflow, isOverflowing, elementId]);

  return { ref, overflowCount, isOverflowing };
}
