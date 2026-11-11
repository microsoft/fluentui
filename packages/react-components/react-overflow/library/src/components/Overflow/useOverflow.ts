'use client';

import * as React from 'react';
import type { OnUpdateOverflow } from '@fluentui/priority-overflow';
import { getTriggerChild, getReactElementRef, useMergedRefs, useEventCallback } from '@fluentui/react-utilities';

import { updateVisibilityAttribute, useOverflowContainer } from '../../useOverflowContainer';
import type { OverflowComponentState, OverflowProps, OverflowState } from './Overflow.types';

/**
 * The state required to render Overflow.
 *
 * @param props - props from this instance of Overflow
 * @param ref - reference forwarded to the single child's root element
 */
export const useOverflow_unstable = (props: OverflowProps, ref: React.Ref<HTMLElement>): OverflowComponentState => {
  const {
    children,
    minimumVisible,
    overflowAxis = 'horizontal',
    overflowDirection,
    padding,
    onOverflowChange,
    hasHiddenItems,
    measureGap,
    getAutoMargins,
    imperativeRef,
  } = props;

  const update: OnUpdateOverflow = useEventCallback(() => {
    // eslint-disable-next-line react-hooks/immutability
    const snapshot = getSnapshot();
    const state: OverflowState = {
      hasOverflow: snapshot.invisibleItemCount > 0,
      itemVisibility: snapshot.itemVisibility,
      groupVisibility: snapshot.groupVisibility,
    };
    onOverflowChange?.(null, state);
  });

  const {
    containerRef,
    getSnapshot,
    subscribe,
    registerItem,
    updateOverflow,
    forceUpdateOverflow,
    registerOverflowMenu,
    registerDivider,
  } = useOverflowContainer(update, {
    overflowDirection,
    overflowAxis,
    padding,
    minimumVisible,
    hasHiddenItems,
    measureGap,
    getAutoMargins,
    onUpdateItemVisibility: updateVisibilityAttribute,
  });

  const child = getTriggerChild<HTMLElement>(children);

  React.useImperativeHandle(imperativeRef, () => ({
    updateOverflow,
  }));

  return {
    containerRef,
    getSnapshot,
    subscribe,
    registerItem,
    updateOverflow,
    forceUpdateOverflow,
    registerOverflowMenu,
    registerDivider,
    ref: useMergedRefs(containerRef, ref, getReactElementRef(child)),
    children,
  };
};
