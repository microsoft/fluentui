import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellSlots, TableCellState } from './TableCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableCellClassName = 'fui-TableCell';
export const tableCellClassNames: SlotClassNames<TableCellSlots> = {
  root: tableCellClassName,
  media: 'fui-TableCell__media',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...shorthands.padding('0px', tokens.spacingHorizontalS),
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.flex(1, 1, '0px'),
  },

  media: {
    display: 'flex',
    alignItems: 'center',
  },
});

/**
 * Apply styling to the TableCell slots based on the state
 */
export const useTableCellStyles_unstable = (state: TableCellState): TableCellState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableCellClassNames.root, styles.root, state.root.className);
  if (state.media) {
    state.media.className = mergeClasses(tableCellClassNames.media, styles.media);
  }

  return state;
};
