import * as React from 'react';
import { OverflowContext } from '../overflowContext';
import { updateVisibilityAttribute, useOverflowContainer } from '../useOverflowContainer';
import { useMergedRefs } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { OnUpdateOverflow, OverflowGroupState, ObserveOptions } from '@fluentui/priority-overflow';
import { DATA_OVERFLOWING, DATA_OVERFLOW_MENU } from '../constants';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'nowrap',
    minWidth: 0,
    ...shorthands.overflow('hidden'),
  },

  vertical: {
    flexDirection: 'column',
  },

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

export interface OverflowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<ObserveOptions, 'overflowAxis' | 'overflowDirection' | 'padding' | 'minimumVisible'> {}

export const Overflow = React.forwardRef<HTMLDivElement, OverflowProps>((props, ref) => {
  const { overflowAxis = 'horizontal', overflowDirection, padding, minimumVisible, ...rest } = props;
  const styles = useStyles();

  const [hasOverflow, setHasOverflow] = React.useState(false);
  const [itemVisibility, setItemVisibility] = React.useState<Record<string, boolean>>({});
  const [groupVisibility, setGroupVisibility] = React.useState<Record<string, OverflowGroupState>>({});

  const updateItemVisibility: OnUpdateOverflow = ({
    visibleItems,
    invisibleItems,
    groupVisibility: managerGroupVisibility,
  }) => {
    setHasOverflow(invisibleItems.length > 0);
    setItemVisibility(() => {
      const newState: Record<string, boolean> = {};
      visibleItems.forEach(x => (newState[x.id] = true));
      invisibleItems.forEach(x => (newState[x.id] = false));
      return newState;
    });

    setGroupVisibility(managerGroupVisibility);
  };

  const { containerRef, registerItem, updateOverflow } = useOverflowContainer<HTMLDivElement>(updateItemVisibility, {
    overflowDirection,
    overflowAxis,
    padding,
    minimumVisible,
    onUpdateItemVisibility: updateVisibilityAttribute,
  });

  const mergedRef = useMergedRefs(containerRef, ref);

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
      <div
        {...rest}
        ref={mergedRef}
        className={mergeClasses(
          styles.container,
          styles.overflowMenu,
          styles.overflowingItems,
          props.overflowAxis === 'vertical' && styles.vertical,
          props.className,
        )}
      >
        {props.children}
      </div>
    </OverflowContext.Provider>
  );
});
