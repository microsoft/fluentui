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
import { canUseDOM, useEventCallback, useFirstMount, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
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

  const managerOptions = React.useMemo(
    () => ({
      overflowAxis,
      overflowDirection,
      padding,
      minimumVisible,
      hasHiddenItems,
    }),
    [minimumVisible, overflowAxis, overflowDirection, padding, hasHiddenItems],
  );

  const firstMount = useFirstMount();
  const hasObservedRef = React.useRef(false);

  // DOM ref to the overflow container element
  const containerRef = React.useRef<TElement>(null);

  const overflowManager = React.useState<OverflowManager | null>(() =>
    canUseDOM() ? createOverflowManager() : null,
  )[0];

  // Initialize the manager with the full observation contract once, when the container ref is first available.
  useIsomorphicLayoutEffect(() => {
    if (!hasObservedRef.current && containerRef.current) {
      overflowManager?.observe(containerRef.current, observeOptions);
      hasObservedRef.current = true;
    }
  }, [overflowManager, observeOptions, firstMount]);

  // After first mount, option changes should reconfigure the same manager.
  useIsomorphicLayoutEffect(() => {
    if (!overflowManager || firstMount) {
      return;
    }

    overflowManager.setOptions(managerOptions);
  }, [firstMount, overflowManager, managerOptions]);

  // Keep the attached container current across renders after mount.
  useIsomorphicLayoutEffect(() => {
    if (!overflowManager || !hasObservedRef.current || firstMount) {
      return;
    }

    overflowManager.setContainer(containerRef.current);
  });

  /* Fully destroy the manager on unmount */
  React.useEffect(
    () => () => {
      overflowManager?.destroy();
    },
    [overflowManager],
  );

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
      overflowManager?.setOverflowMenu(el);
      el.setAttribute(DATA_OVERFLOW_MENU, '');

      return () => {
        overflowManager?.setOverflowMenu(null);
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
