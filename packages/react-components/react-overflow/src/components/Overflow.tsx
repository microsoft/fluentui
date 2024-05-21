import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import type { OnUpdateOverflow, OverflowGroupState, ObserveOptions } from '@fluentui/priority-overflow';
import { applyTriggerPropsToChildren, getTriggerChild, useMergedRefs } from '@fluentui/react-utilities';

import { OverflowContext } from '../overflowContext';
import { updateVisibilityAttribute, useOverflowContainer } from '../useOverflowContainer';
import { useOverflowStyles } from './useOverflowStyles.styles';

interface OverflowState {
  hasOverflow: boolean;
  itemVisibility: Record<string, boolean>;
  groupVisibility: Record<string, OverflowGroupState>;
}

/**
 * Overflow Props
 */
export type OverflowProps = Partial<
  Pick<ObserveOptions, 'overflowAxis' | 'overflowDirection' | 'padding' | 'minimumVisible'>
> & {
  children: React.ReactElement;
};

/**
 * Provides an OverflowContext for OverflowItem descendants.
 */
export const Overflow = React.forwardRef((props: OverflowProps, ref) => {
  const styles = useOverflowStyles();

  const { children, minimumVisible, overflowAxis = 'horizontal', overflowDirection, padding } = props;

  const [overflowState, setOverflowState] = React.useState<OverflowState>({
    hasOverflow: false,
    itemVisibility: {},
    groupVisibility: {},
  });

  // useOverflowContainer wraps this method in a useEventCallback.
  const update: OnUpdateOverflow = data => {
    const { visibleItems, invisibleItems, groupVisibility } = data;

    const itemVisibility: Record<string, boolean> = {};
    visibleItems.forEach(item => {
      itemVisibility[item.id] = true;
    });
    invisibleItems.forEach(x => (itemVisibility[x.id] = false));

    setOverflowState(() => {
      return {
        hasOverflow: data.invisibleItems.length > 0,
        itemVisibility,
        groupVisibility,
      };
    });
  };

  const { containerRef, registerItem, updateOverflow, registerOverflowMenu, registerDivider } = useOverflowContainer(
    update,
    {
      overflowDirection,
      overflowAxis,
      padding,
      minimumVisible,
      onUpdateItemVisibility: updateVisibilityAttribute,
    },
  );

  const child = getTriggerChild(children);
  const clonedChild = applyTriggerPropsToChildren(children, {
    ref: useMergedRefs(containerRef, ref, child?.ref),
    className: mergeClasses('fui-Overflow', styles.overflowMenu, styles.overflowingItems, children.props.className),
  });

  return (
    <OverflowContext.Provider
      value={{
        itemVisibility: overflowState.itemVisibility,
        groupVisibility: overflowState.groupVisibility,
        hasOverflow: overflowState.hasOverflow,
        registerItem,
        updateOverflow,
        registerOverflowMenu,
        registerDivider,
      }}
    >
      {clonedChild}
    </OverflowContext.Provider>
  );
});
