import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TablePrimaryCellSlots, TablePrimaryCellState } from './TablePrimaryCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableCellStyles_unstable } from '../TableCell/useTableCellStyles';

export const tablePrimaryCellClassNames: SlotClassNames<TablePrimaryCellSlots> = {
  root: 'fui-TablePrimaryCell',
  media: 'fui-TablePrimaryCell__media',
  main: 'fui-TablePrimaryCell__main',
  secondary: 'fui-TablePrimaryCell__secondary',
  wrapper: 'fui-TablePrimaryCell__wrapper',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  media: {
    '& svg': {
      width: '28px',
      height: '28px',
    },
  },

  main: {
    fontWeight: tokens.fontWeightSemibold,
  },

  secondary: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the TablePrimaryCell slots based on the state
 */
export const useTablePrimaryCellStyles_unstable = (state: TablePrimaryCellState): TablePrimaryCellState => {
  useTableCellStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(tablePrimaryCellClassNames.root, state.root.className);

  if (state.media) {
    state.media.className = mergeClasses(tablePrimaryCellClassNames.media, styles.media, state.media.className);
  }

  if (state.main) {
    state.main.className = mergeClasses(tablePrimaryCellClassNames.main, styles.main, state.main.className);
  }

  if (state.secondary) {
    state.secondary.className = mergeClasses(
      tablePrimaryCellClassNames.secondary,
      styles.secondary,
      state.secondary.className,
    );
  }

  if (state.wrapper) {
    state.wrapper.className = mergeClasses(tablePrimaryCellClassNames.wrapper, styles.wrapper, state.wrapper.className);
  }

  return state;
};
