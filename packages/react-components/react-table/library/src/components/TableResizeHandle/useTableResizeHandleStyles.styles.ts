import { makeStyles, mergeClasses } from '@griffel/react';
import type { TableResizeHandleSlots, TableResizeHandleState } from './TableResizeHandle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const tableResizeHandleClassNames: SlotClassNames<TableResizeHandleSlots> = {
  root: 'fui-TableResizeHandle',
  // TODO: add class names for all slots on TableResizeHandleSlots.
  // Should be of the form `<slotName>: 'fui-TableResizeHandle__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '16px',
    margin: '0 -8px',
    cursor: 'col-resize',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '.2s',
    zIndex: 1,

    // If mouse users focus on the resize handle through a context menu, we want the handle
    // to be visible because the mouse might not be hovering over the handle
    ':focus': {
      opacity: 1,
      outlineStyle: 'none',
    },

    ':hover': {
      opacity: 1,
    },

    ':after': {
      content: '" "',
      display: 'block',
      width: '1px',
      position: 'absolute',
      left: '50%',
      top: 0,
      bottom: 0,
      backgroundColor: tokens.colorNeutralStroke1,
    },
  },
});

/**
 * Apply styling to the TableResizeHandle slots based on the state
 */
export const useTableResizeHandleStyles_unstable = (state: TableResizeHandleState): TableResizeHandleState => {
  'use no memo';

  const styles = useStyles();
  state.root.className = mergeClasses(tableResizeHandleClassNames.root, styles.root, state.root.className);
  return state;
};
