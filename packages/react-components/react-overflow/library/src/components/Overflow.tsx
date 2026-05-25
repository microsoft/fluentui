'use client';

import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import type { ObserveOptions, OverflowGroupState, OverflowSnapshot } from '@fluentui/priority-overflow';
import {
  applyTriggerPropsToChildren,
  getTriggerChild,
  getReactElementRef,
  useMergedRefs,
} from '@fluentui/react-utilities';

import { defaultOverflowManager, OverflowContext } from '../overflowContext';
import { updateVisibilityAttribute, useOverflowContainer } from '../useOverflowContainer';
import { useOverflowStyles } from './useOverflowStyles.styles';

interface OverflowState {
  hasOverflow: boolean;
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
}

const toOverflowState = (snapshot: OverflowSnapshot): OverflowState => ({
  hasOverflow: snapshot.hasOverflow,
  itemVisibility: snapshot.itemVisibility,
  groupVisibility: snapshot.groupVisibility,
});

export interface OnOverflowChangeData extends OverflowState {}

/**
 * Overflow Props
 */
export type OverflowProps = Partial<
  Pick<ObserveOptions, 'overflowAxis' | 'overflowDirection' | 'padding' | 'minimumVisible' | 'hasHiddenItems'>
> & {
  children: React.ReactElement;

  // overflow is not caused by DOM event
  // eslint-disable-next-line @nx/workspace-consistent-callback-type
  onOverflowChange?: (ev: null, data: OverflowState) => void;
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
  } = props;

  const { containerRef, manager, registerItem, updateOverflow, registerOverflowMenu, registerDivider } =
    useOverflowContainer(() => undefined, {
      overflowDirection,
      overflowAxis,
      padding,
      minimumVisible,
      hasHiddenItems,
      onUpdateItemVisibility: updateVisibilityAttribute,
    });

  const lastReportedState = React.useRef<OverflowState | null>(null);

  React.useEffect(() => {
    if (!manager || !onOverflowChange) {
      return;
    }

    lastReportedState.current = null;

    return manager.subscribe(() => {
      const overflowState = toOverflowState(manager.getSnapshot());

      if (lastReportedState.current === null) {
        lastReportedState.current = overflowState;
        return;
      }

      onOverflowChange(null, overflowState);
      lastReportedState.current = overflowState;
    });
  }, [manager, onOverflowChange]);

  const child = getTriggerChild<HTMLElement>(children);
  const clonedChild = applyTriggerPropsToChildren(children, {
    ref: useMergedRefs(containerRef, ref, getReactElementRef(child)),
    className: mergeClasses('fui-Overflow', styles.overflowMenu, styles.overflowingItems, child?.props.className),
  });

  return (
    <OverflowContext.Provider
      value={{
        manager: manager ?? defaultOverflowManager,
        registerItem,
        updateOverflow,
        registerOverflowMenu,
        registerDivider,
        containerRef,
      }}
    >
      {clonedChild}
    </OverflowContext.Provider>
  );
});
