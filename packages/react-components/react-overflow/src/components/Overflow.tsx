import * as React from 'react';
import { mergeClasses } from '@griffel/react';
import type { OnUpdateOverflow, OverflowGroupState, ObserveOptions } from '@fluentui/priority-overflow';
import { applyTriggerPropsToChildren, useMergedRefs } from '@fluentui/react-utilities';

import { OverflowContext } from '../overflowContext';
import { updateVisibilityAttribute, useOverflowContainer } from '../useOverflowContainer';
import { useOverflowStyles } from './useOverflowStyles.styles';

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

  const [hasOverflow, setHasOverflow] = React.useState(false);
  const [itemVisibility, setItemVisibility] = React.useState<Record<string, boolean>>({});
  const [groupVisibility, setGroupVisibility] = React.useState<Record<string, OverflowGroupState>>({});

  // useOverflowContainer wraps this method in a useEventCallback.
  // TODO: Do we need a useEventCallback here too?
  const update: OnUpdateOverflow = data => {
    setHasOverflow(() => data.invisibleItems.length > 0);
    setItemVisibility(() => {
      const newState: Record<string, boolean> = {};
      data.visibleItems.forEach(x => (newState[x.id] = true));
      data.invisibleItems.forEach(x => (newState[x.id] = false));
      return newState;
    });
    setGroupVisibility(data.groupVisibility);
  };

  const { containerRef, registerItem, updateOverflow, registerOverflowMenu } = useOverflowContainer(update, {
    overflowDirection,
    overflowAxis,
    padding,
    minimumVisible,
    onUpdateItemVisibility: updateVisibilityAttribute,
  });

  const clonedChild = applyTriggerPropsToChildren(children, {
    ref: useMergedRefs(containerRef, ref),
    className: mergeClasses(styles.overflowMenu, styles.overflowingItems, children.props.className),
  });

  return (
    <OverflowContext.Provider
      value={{
        itemVisibility,
        groupVisibility,
        hasOverflow,
        registerItem,
        updateOverflow,
        registerOverflowMenu,
      }}
    >
      {clonedChild}
    </OverflowContext.Provider>
  );
});
