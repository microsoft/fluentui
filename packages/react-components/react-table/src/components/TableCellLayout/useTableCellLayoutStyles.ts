import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellLayoutSlots, TableCellLayoutState } from './TableCellLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableCellLayoutClassNames: SlotClassNames<TableCellLayoutSlots> = {
  root: 'fui-TableCellLayout',
  media: 'fui-TableCellLayout__media',
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
 * Apply styling to the TableCellLayout slots based on the state
 */
export const useTableCellLayoutStyles_unstable = (state: TableCellLayoutState): TableCellLayoutState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableCellLayoutClassNames.root, styles.root, state.root.className);
  if (state.media) {
    state.media.className = mergeClasses(tableCellLayoutClassNames.media, styles.media, state.media.className);
  }

  return state;
};
