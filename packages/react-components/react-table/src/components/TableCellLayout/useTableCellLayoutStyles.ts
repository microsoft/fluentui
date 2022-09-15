import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableCellLayoutSlots, TableCellLayoutState } from './TableCellLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableCellLayoutClassNames: SlotClassNames<TableCellLayoutSlots> = {
  root: 'fui-TableCellLayout',
  media: 'fui-TableCellLayout__media',
  main: 'fui-TableCellLayout__main',
  description: 'fui-TableCellLayout__description',
  wrapper: 'fui-TableCellLayout__wrapper',
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
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  media: {
    display: 'flex',
    alignItems: 'center',
  },

  mediaPrimary: {
    '& svg': {
      width: '28px',
      height: '28px',
    },
  },

  mainPrimary: {
    fontWeight: tokens.fontWeightSemibold,
  },

  description: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
});

/**
 * Apply styling to the TableCellLayout slots based on the state
 */
export const useTableCellLayoutStyles_unstable = (state: TableCellLayoutState): TableCellLayoutState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableCellLayoutClassNames.root, styles.root, state.root.className);
  const primary = state.appearance === 'primary';

  if (state.media) {
    state.media.className = mergeClasses(
      tableCellLayoutClassNames.media,
      styles.media,
      primary && styles.mediaPrimary,
      state.media.className,
    );
  }

  if (state.main) {
    state.main.className = mergeClasses(
      tableCellLayoutClassNames.main,
      primary && styles.mainPrimary,
      state.main.className,
    );
  }

  if (state.description) {
    state.description.className = mergeClasses(
      tableCellLayoutClassNames.description,
      styles.description,
      state.description.className,
    );
  }

  if (state.wrapper) {
    state.wrapper.className = mergeClasses(tableCellLayoutClassNames.wrapper, styles.wrapper, state.wrapper.className);
  }

  return state;
};
