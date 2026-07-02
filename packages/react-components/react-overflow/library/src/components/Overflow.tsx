'use client';

import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import type { OverflowOptions, OnUpdateOverflow, OverflowGroupState } from '@fluentui/priority-overflow';
import type { OverflowManager } from '@fluentui/priority-overflow';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  getReactElementRef,
  useMergedRefs,
  useEventCallback,
} from '@fluentui/react-utilities';

import { OverflowContext, type OverflowContextValue } from '../overflowContext';
import { updateVisibilityAttribute, useOverflowContainer } from '../useOverflowContainer';
import { useOverflowStyles } from './useOverflowStyles.styles';

interface OverflowState {
  hasOverflow: boolean;
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
}

export interface OnOverflowChangeData extends OverflowState {}

/**
 * Overflow Props
 */
export type OverflowProps = Partial<
  Pick<OverflowOptions, 'overflowAxis' | 'overflowDirection' | 'padding' | 'minimumVisible' | 'hasHiddenItems'>
> & {
  children: React.ReactElement;

  // overflow is not caused by DOM event
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onOverflowChange?: (ev: null, data: OverflowState) => void;

  /**
   * Optional factory used to create the overflow manager.
   * When provided, called instead of the default `createOverflowManager`.
   * All option props (`padding`, `overflowAxis`, etc.) are still applied normally.
   *
   * Pass `createFlatOverflowManager` from `\@fluentui/priority-overflow` to opt into
   * the flat manager optimised for simple ungrouped lists (no pinning, no groups).
   */
  createManager?: (options: Partial<OverflowOptions>) => OverflowManager;
};

/**
 * Provides an OverflowContext for OverflowItem descendants.
 */
export const Overflow = React.forwardRef((props: OverflowProps, ref) => {
  const styles = useOverflowStyles();

  const {
    children,
    minimumVisible,
    overflowAxis = 'horizontal',
    overflowDirection,
    padding,
    onOverflowChange,
    hasHiddenItems,
    createManager,
  } = props;

  const update: OnUpdateOverflow = useEventCallback(() => {
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
  } = useOverflowContainer(
    update,
    {
      overflowDirection,
      overflowAxis,
      padding,
      minimumVisible,
      hasHiddenItems,
      onUpdateItemVisibility: updateVisibilityAttribute,
    },
    createManager,
  );

  const child = getTriggerChild<HTMLElement>(children);
  const clonedChild = applyTriggerPropsToChildren(children, {
    ref: useMergedRefs(containerRef, ref, getReactElementRef(child)),
    className: mergeClasses('fui-Overflow', styles.overflowMenu, styles.overflowingItems, child?.props.className),
  });

  const ctx: OverflowContextValue = React.useMemo(
    () => ({
      groupVisibility: {},
      itemVisibility: {},
      hasOverflow: false,
      registerItem,
      updateOverflow,
      forceUpdateOverflow,
      registerOverflowMenu,
      registerDivider,
      containerRef,
      getSnapshot,
      subscribe,
    }),
    [
      getSnapshot,
      subscribe,
      registerItem,
      updateOverflow,
      forceUpdateOverflow,
      registerOverflowMenu,
      registerDivider,
      containerRef,
    ],
  );

  return <OverflowContext.Provider value={ctx}>{clonedChild}</OverflowContext.Provider>;
});
