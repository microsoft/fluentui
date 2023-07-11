import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
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
    ...shorthands.margin(0, '-8px'),
    cursor: 'col-resize',
    opacity: 0,
    transitionProperty: 'opacity',
    transitionDuration: '.2s',
    zIndex: 1,

    ':focus': {
      opacity: 1,
      ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
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
  const styles = useStyles();
  state.root.className = mergeClasses(tableResizeHandleClassNames.root, styles.root, state.root.className);
  return state;
};
