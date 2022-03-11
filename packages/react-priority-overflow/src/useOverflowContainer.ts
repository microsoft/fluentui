import * as React from 'react';
import { createOverflowManager } from '@fluentui/priority-overflow';

import type {
  OnUpdateItemVisibility,
  OnUpdateOverflow,
  OverflowItemEntry,
  OverflowManager,
  ObserveOptions,
} from '@fluentui/priority-overflow';
import { useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { UseOverflowContainerReturn } from './types';

/**
 *
 * @param update - Callback when overflow state changes
 * @param options - Options to configure the overflow container
 * @returns - ref to attach to an intrinsic HTML element and imperative functions
 */
export const useOverflowContainer = <TElement extends HTMLElement>(
  update: OnUpdateOverflow,
  options: Omit<ObserveOptions, 'onUpdateOverflow'>,
): UseOverflowContainerReturn<TElement> => {
  const { overflowAxis, overflowDirection, padding, minimumVisible, onUpdateItemVisibility } = options;
  // DOM ref to the overflow container element
  const containerRef = React.useRef<TElement>(null);
  const updateOverflowItems = useEventCallback(update);
  const [overflowManager] = React.useState<OverflowManager>(() => createOverflowManager());

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    overflowManager.observe(containerRef.current, {
      overflowDirection,
      overflowAxis,
      padding,
      minimumVisible,
      onUpdateItemVisibility,
      onUpdateOverflow: updateOverflowItems,
    });

    return () => {
      overflowManager.disconnect();
    };
  }, [
    updateOverflowItems,
    overflowManager,
    overflowDirection,
    overflowAxis,
    padding,
    minimumVisible,
    onUpdateItemVisibility,
  ]);

  const registerItem = React.useCallback(
    (item: OverflowItemEntry) => {
      overflowManager.addItem(item);

      return () => {
        item.element.style.removeProperty('display');
        overflowManager.removeItem(item.id);
      };
    },
    [overflowManager],
  );

  const updateOverflow = React.useCallback(() => {
    overflowManager.update();
  }, [overflowManager]);

  return {
    containerRef,
    registerItem,
    updateOverflow,
  };
};

export const defaultUpdateVisibilityCallback: OnUpdateItemVisibility = ({ item, visible }) => {
  if (visible) {
    item.element.style.removeProperty('display');
  } else {
    item.element.style.setProperty('display', 'none');
  }
};
