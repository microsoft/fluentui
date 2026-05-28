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

  const observeOptions: Required<ObserveOptions> = React.useMemo(
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

  const containerRef = React.useRef<TElement>(null);

  const manager = React.useMemo<OverflowManager | null>(
    () => (canUseDOM() ? createOverflowManager(observeOptions) : null),
    // Manager is created once for the component's lifetime; option changes go through setOptions.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useIsomorphicLayoutEffect(() => {
    if (manager && containerRef.current) {
      manager.observe(containerRef.current);
      return () => manager.disconnect();
    }
  }, [manager]);

  useIsomorphicLayoutEffect(() => {
    manager?.setOptions(observeOptions);
  }, [observeOptions, manager]);

  const registerItem = React.useCallback(
    (item: OverflowItemEntry) => {
      manager?.addItem(item);
      item.element.setAttribute(DATA_OVERFLOW_ITEM, '');

      return () => {
        item.element.removeAttribute(DATA_OVERFLOWING);
        item.element.removeAttribute(DATA_OVERFLOW_ITEM);
        manager?.removeItem(item.id);
      };
    },
    [manager],
  );

  const registerDivider = React.useCallback(
    (divider: OverflowDividerEntry) => {
      const el = divider.element;
      manager?.addDivider(divider);
      el.setAttribute(DATA_OVERFLOW_DIVIDER, '');

      return () => {
        manager?.removeDivider(divider.groupId);
        el.removeAttribute(DATA_OVERFLOW_DIVIDER);
      };
    },
    [manager],
  );

  const registerOverflowMenu = React.useCallback(
    (el: HTMLElement) => {
      manager?.addOverflowMenu(el);
      el.setAttribute(DATA_OVERFLOW_MENU, '');

      return () => {
        manager?.removeOverflowMenu();
        el.removeAttribute(DATA_OVERFLOW_MENU);
      };
    },
    [manager],
  );

  const updateOverflow = React.useCallback(() => {
    manager?.update();
  }, [manager]);

  return {
    registerItem,
    registerDivider,
    registerOverflowMenu,
    updateOverflow,
    containerRef,
  };
};

const noop = () => {
  /* noop */
};

export const updateVisibilityAttribute: OnUpdateItemVisibility = ({ item, visible }) => {
  if (visible) {
    item.element.removeAttribute(DATA_OVERFLOWING);
  } else {
    item.element.setAttribute(DATA_OVERFLOWING, '');
  }
};
