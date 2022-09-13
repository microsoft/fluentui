import { makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellPrimaryLayoutSlots, TableCellPrimaryLayoutState } from './TableCellPrimaryLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useTableCellLayoutStyles_unstable } from '../TableCellLayout/useTableCellLayoutStyles';

export const tableCellPrimaryLayoutClassNames: SlotClassNames<TableCellPrimaryLayoutSlots> = {
  root: 'fui-TableCellPrimaryLayout',
  media: 'fui-TableCellPrimaryLayout__media',
  main: 'fui-TableCellPrimaryLayout__main',
  secondary: 'fui-TableCellPrimaryLayout__secondary',
  wrapper: 'fui-TableCellPrimaryLayout__wrapper',
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
});

/**
 * Apply styling to the TableCellPrimaryLayout slots based on the state
 */
export const useTableCellPrimaryLayoutStyles_unstable = (
  state: TableCellPrimaryLayoutState,
): TableCellPrimaryLayoutState => {
  useTableCellLayoutStyles_unstable(state);
  const styles = useStyles();
  state.root.className = mergeClasses(tableCellPrimaryLayoutClassNames.root, state.root.className);

  if (state.media) {
    state.media.className = mergeClasses(tableCellPrimaryLayoutClassNames.media, styles.media, state.media.className);
  }

  if (state.main) {
    state.main.className = mergeClasses(tableCellPrimaryLayoutClassNames.main, styles.main, state.main.className);
  }

  if (state.secondary) {
    state.secondary.className = mergeClasses(
      tableCellPrimaryLayoutClassNames.secondary,
      styles.secondary,
      state.secondary.className,
    );
  }

  if (state.wrapper) {
    state.wrapper.className = mergeClasses(
      tableCellPrimaryLayoutClassNames.wrapper,
      styles.wrapper,
      state.wrapper.className,
    );
  }

  return state;
};
