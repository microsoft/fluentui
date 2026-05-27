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
  const overflowMenuRef = React.useRef<HTMLElement | null>(null);
  const dividerElementsRef = React.useRef(new Map<string, HTMLElement>());

  const manager = React.useMemo<OverflowManager | null>(
    () => (canUseDOM() ? createOverflowManager(observeOptions) : null),
    [],
  );

  useIsomorphicLayoutEffect(() => {
    if (manager && containerRef.current) {
      return manager.observe(containerRef.current);
    }
  }, [manager]);

  React.useEffect(() => {
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
      dividerElementsRef.current.set(divider.groupId, el);
      el.setAttribute(DATA_OVERFLOW_DIVIDER, '');

      return () => {
        if (dividerElementsRef.current.get(divider.groupId) === el) {
          manager?.removeDivider(divider.groupId);
          dividerElementsRef.current.delete(divider.groupId);
        }
        el.removeAttribute(DATA_OVERFLOW_DIVIDER);
      };
    },
    [manager],
  );

  const registerOverflowMenu = React.useCallback(
    (el: HTMLElement) => {
      manager?.addOverflowMenu(el);
      overflowMenuRef.current = el;
      el.setAttribute(DATA_OVERFLOW_MENU, '');

      return () => {
        if (overflowMenuRef.current === el) {
          manager?.removeOverflowMenu();
          overflowMenuRef.current = null;
        }
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
    manager,
  };
};

export const updateVisibilityAttribute: OnUpdateItemVisibility = ({ item, visible }) => {
  if (visible) {
    item.element.removeAttribute(DATA_OVERFLOWING);
  } else {
    item.element.setAttribute(DATA_OVERFLOWING, '');
  }
};
