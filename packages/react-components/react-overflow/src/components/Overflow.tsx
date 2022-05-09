import * as React from 'react';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { OnUpdateOverflow, OverflowGroupState, ObserveOptions } from '@fluentui/priority-overflow';
import { applyTriggerPropsToChildren, useMergedRefs } from '@fluentui/react-utilities';

import { OverflowContext } from '../overflowContext';
import { updateVisibilityAttribute, useOverflowContainer } from '../useOverflowContainer';
import { DATA_OVERFLOWING, DATA_OVERFLOW_MENU } from '../constants';

const useStyles = makeStyles({
  overflowMenu: {
    [`& [${DATA_OVERFLOW_MENU}]`]: {
      flexShrink: 0,
    },
  },

  overflowingItems: {
    [`& > [${DATA_OVERFLOWING}]`]: {
      display: 'none',
    },
  },
});

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
  const styles = useStyles();

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

  const { containerRef, registerItem, updateOverflow } = useOverflowContainer(update, {
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
      }}
    >
      {clonedChild}
    </OverflowContext.Provider>
  );
});
