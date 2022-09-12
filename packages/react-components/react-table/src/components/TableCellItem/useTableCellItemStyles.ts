import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellItemSlots, TableCellItemState } from './TableCellItem.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableCellItemClassNames: SlotClassNames<TableCellItemSlots> = {
  root: 'fui-TableCellItem',
  media: 'fui-TableCellItem__media',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.flex(1, 1, '0px'),
  },

  media: {
    display: 'flex',
    alignItems: 'center',
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the TableCellItem slots based on the state
 */
export const useTableCellItemStyles_unstable = (state: TableCellItemState): TableCellItemState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableCellItemClassNames.root, styles.root, state.root.className);
  if (state.media) {
    state.media.className = mergeClasses(tableCellItemClassNames.media, styles.media, state.media.className);
  }

  return state;
};
