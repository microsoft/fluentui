import * as React from 'react';
import { createOverflowManager } from '@fluentui/priority-overflow';

/**
 * @internal
 */
import type {
  OnUpdateItemVisibility,
  OnUpdateOverflow,
  OverflowItemEntry,
  OverflowManager,
  ObserveOptions,
} from '@fluentui/priority-overflow';
import { canUseDOM, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { UseOverflowContainerReturn } from './types';
import { DATA_OVERFLOWING, DATA_OVERFLOW_ITEM, DATA_OVERFLOW_MENU } from './constants';

/**
 * @internal
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

  const [overflowManager] = React.useState<OverflowManager | null>(() =>
    canUseDOM() ? createOverflowManager() : null,
  );

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) {
      return;
    }

    if (overflowManager) {
      overflowManager.observe(containerRef.current, {
        overflowDirection: overflowDirection ?? 'end',
        overflowAxis: overflowAxis ?? 'horizontal',
        padding: padding ?? 10,
        minimumVisible: minimumVisible ?? 0,
        onUpdateItemVisibility: onUpdateItemVisibility ?? (() => undefined),
        onUpdateOverflow: updateOverflowItems ?? (() => undefined),
      });

      return () => {
        overflowManager.disconnect();
      };
    }
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
      overflowManager?.addItem(item);
      item.element.setAttribute(DATA_OVERFLOW_ITEM, '');

      return () => {
        item.element.removeAttribute(DATA_OVERFLOWING);
        item.element.removeAttribute(DATA_OVERFLOW_ITEM);
        overflowManager?.removeItem(item.id);
      };
    },
    [overflowManager],
  );

  const updateOverflow = React.useCallback(() => {
    overflowManager?.update();
  }, [overflowManager]);

  const registerOverflowMenu = React.useCallback(
    (el: HTMLElement) => {
      overflowManager?.addOverflowMenu(el);
      el.setAttribute(DATA_OVERFLOW_MENU, '');

      return () => {
        overflowManager?.removeOverflowMenu();
        el.removeAttribute(DATA_OVERFLOW_MENU);
      };
    },
    [overflowManager],
  );

  return {
    containerRef,
    registerItem,
    updateOverflow,
    registerOverflowMenu,
  };
};

export const updateVisibilityAttribute: OnUpdateItemVisibility = ({ item, visible }) => {
  if (visible) {
    item.element.removeAttribute(DATA_OVERFLOWING);
  } else {
    item.element.setAttribute(DATA_OVERFLOWING, '');
  }
};
