'use client';

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
import type { UseOverflowContainerReturn } from './types';
import { DATA_OVERFLOWING, DATA_OVERFLOW_DIVIDER, DATA_OVERFLOW_ITEM, DATA_OVERFLOW_MENU } from './constants';

const noop = () => null;

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
  'use no memo';

  const {
    overflowAxis = 'horizontal',
    overflowDirection = 'end',
    padding = 10,
    minimumVisible = 0,
    onUpdateItemVisibility = noop,
    hasHiddenItems = false,
  } = options;

  const onUpdateOverflow = useEventCallback(update);
  const onUpdateItemVisibilityCallback = useEventCallback(onUpdateItemVisibility);

  const observeOptions = React.useMemo(
    () => ({
      overflowAxis,
      overflowDirection,
      padding,
      minimumVisible,
      onUpdateItemVisibility: onUpdateItemVisibilityCallback,
      onUpdateOverflow,
      hasHiddenItems,
    }),
    [
      minimumVisible,
      onUpdateItemVisibilityCallback,
      overflowAxis,
      overflowDirection,
      padding,
      onUpdateOverflow,
      hasHiddenItems,
    ],
  );

  const [container, setContainer] = React.useState<TElement | null>(null);

  const containerRef = React.useCallback<React.RefCallback<TElement>>(node => {
    setContainer(node);
  }, []);

  const overflowManager = React.useState<OverflowManager | null>(() =>
    canUseDOM() ? createOverflowManager() : null,
  )[0];

  useIsomorphicLayoutEffect(() => {
    overflowManager?.setOptions(observeOptions);
  }, [observeOptions, overflowManager]);

  useIsomorphicLayoutEffect(() => {
    if (!overflowManager || !container) {
      return;
    }

    return overflowManager.observe(container);
  }, [container, overflowManager]);

  const registerItem = React.useCallback(
    (item: OverflowItemEntry) => {
      const deregisterItem = overflowManager?.registerItem(item) ?? noop;
      item.element.setAttribute(DATA_OVERFLOW_ITEM, '');

      return () => {
        item.element.removeAttribute(DATA_OVERFLOWING);
        item.element.removeAttribute(DATA_OVERFLOW_ITEM);
        deregisterItem();
      };
    },
    [overflowManager],
  );

  const registerDivider = React.useCallback(
    (divider: OverflowDividerEntry) => {
      const el = divider.element;
      const deregisterDivider = overflowManager?.registerDivider(divider) ?? noop;
      el.setAttribute(DATA_OVERFLOW_DIVIDER, '');

      return () => {
        deregisterDivider();
        el.removeAttribute(DATA_OVERFLOW_DIVIDER);
      };
    },
    [overflowManager],
  );

  const registerOverflowMenu = React.useCallback(
    (el: HTMLElement) => {
      const detachOverflowMenu = overflowManager?.attachOverflowMenu(el) ?? noop;
      el.setAttribute(DATA_OVERFLOW_MENU, '');

      return () => {
        detachOverflowMenu();
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
    manager: overflowManager,
  };
};

export const updateVisibilityAttribute: OnUpdateItemVisibility = ({ item, visible }) => {
  if (visible) {
    item.element.removeAttribute(DATA_OVERFLOWING);
  } else {
    item.element.setAttribute(DATA_OVERFLOWING, '');
  }
};
