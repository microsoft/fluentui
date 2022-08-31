import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableRowSlots, TableRowState } from './TableRow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tableCellActionsClassNames } from '../TableCellActions/useTableCellActionsStyles';

export const tableRowClassName = 'fui-TableRow';
export const tableRowClassNames: SlotClassNames<TableRowSlots> = {
  root: tableRowClassName,
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    color: tokens.colorNeutralForeground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      [`& .${tableCellActionsClassNames.root}`]: {
        opacity: 1,
      },
    },
  },

  medium: {
    minHeight: '44px',
    ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
  },

  small: {
    minHeight: '34px',
    ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
  },

  smaller: {
    minHeight: '24px',
    fontSize: tokens.fontSizeBase200,
  },
});

/**
 * Apply styling to the TableRow slots based on the state
 */
export const useTableRowStyles_unstable = (state: TableRowState): TableRowState => {
  const styles = useStyles();
  state.root.className = mergeClasses(tableRowClassNames.root, styles.root, styles[state.size], state.root.className);

  return state;
};
