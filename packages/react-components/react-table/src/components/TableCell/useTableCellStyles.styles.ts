import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { TableCellSlots, TableCellState } from './TableCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const tableCellClassName = 'fui-TableCell';
export const tableCellClassNames: SlotClassNames<TableCellSlots> = {
  root: tableCellClassName,
};

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-cell',
    verticalAlign: 'middle',
  },

  medium: {
    height: '44px',
  },

  small: {
    height: '34px',
  },

  'extra-small': {
    height: '24px',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    minWidth: '0px',
    alignItems: 'center',
    ...shorthands.flex(1, 1, '0px'),
  },

  medium: {
    minHeight: '44px',
  },

  small: {
    minHeight: '34px',
  },

  'extra-small': {
    minHeight: '24px',
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: 'inherit',
    position: 'relative',
    ...shorthands.padding('0px', tokens.spacingHorizontalS),

    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
      },
      { selector: 'focus' },
    ),
  },
});

/**
 * Apply styling to the TableCell slots based on the state
 */
export const useTableCellStyles_unstable = (state: TableCellState): TableCellState => {
  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableCellClassNames.root,
    styles.root,
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.noNativeElements ? layoutStyles.flex[state.size] : layoutStyles.table[state.size],
    state.root.className,
  );
  return state;
};
