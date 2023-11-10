import * as React from 'react';
import { createOverflowManager } from '@fluentui/priority-overflow';

/**
 * @internal
 */
import type {
  OnUpdateItemVisibility,
  OnUpdateOverflow,
  OverflowItemEntry,
  OverflowDividerEntry,
  OverflowManager,
  ObserveOptions,
} from '@fluentui/priority-overflow';
import { canUseDOM, useEventCallback, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { UseOverflowContainerReturn } from './types';
import { DATA_OVERFLOWING, DATA_OVERFLOW_DIVIDER, DATA_OVERFLOW_ITEM, DATA_OVERFLOW_MENU } from './constants';

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

  const [overflowManager, setOverflowManager] = React.useState<OverflowManager | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current || !canUseDOM()) {
      return;
    }

    const newOverflowManager = createOverflowManager();

    newOverflowManager.observe(containerRef.current, {
      overflowDirection: overflowDirection ?? 'end',
      overflowAxis: overflowAxis ?? 'horizontal',
      padding: padding ?? 10,
      minimumVisible: minimumVisible ?? 0,
      onUpdateItemVisibility: onUpdateItemVisibility ?? (() => undefined),
      onUpdateOverflow: updateOverflowItems ?? (() => undefined),
    });

    setOverflowManager(newOverflowManager);

    return () => {
      newOverflowManager.disconnect();
    };
  }, [updateOverflowItems, overflowDirection, overflowAxis, padding, minimumVisible, onUpdateItemVisibility]);

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

  const registerDivider = React.useCallback(
    (divider: OverflowDividerEntry) => {
      const el = divider.element;
      overflowManager?.addDivider(divider);
      el.setAttribute(DATA_OVERFLOW_DIVIDER, '');

      return () => {
        divider.groupId && overflowManager?.removeDivider(divider.groupId);
        el.removeAttribute(DATA_OVERFLOW_DIVIDER);
      };
    },
    [overflowManager],
  );

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

  const updateOverflow = React.useCallback(() => {
    overflowManager?.update();
  }, [overflowManager]);

  return {
    registerItem,
    registerDivider,
    registerOverflowMenu,
    updateOverflow,
    containerRef,
  };
};

export const updateVisibilityAttribute: OnUpdateItemVisibility = ({ item, visible }) => {
  if (visible) {
    item.element.removeAttribute(DATA_OVERFLOWING);
  } else {
    item.element.setAttribute(DATA_OVERFLOWING, '');
  }
};
