import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableRowSlots, TableRowState } from './TableRow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tableCellActionsClassNames } from '../TableCellActions/useTableCellActionsStyles';

export const tableRowClassName = 'fui-TableRow';
export const tableRowClassNames: SlotClassNames<TableRowSlots> = {
  root: tableRowClassName,
};

const useNativeLayoutStyles = makeStyles({
  root: {
    display: 'table-row',
  },

  medium: {
    height: '44px',
  },

  small: {
    height: '34px',
  },

  smaller: {
    height: '24px',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },

  medium: {
    minHeight: '44px',
  },

  small: {
    minHeight: '34px',
  },

  smaller: {
    minHeight: '24px',
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    color: tokens.colorNeutralForeground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      color: tokens.colorNeutralForeground1Hover,
      [`& .${tableCellActionsClassNames.root}`]: {
        backgroundColor: tokens.colorNeutralBackground1Hover,
        opacity: 1,
      },
    },
    boxSizing: 'border-box',
  },

  medium: {
    ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
  },

  small: {
    ...shorthands.borderBottom(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
  },

  smaller: {
    fontSize: tokens.fontSizeBase200,
  },
});

/**
 * Apply styling to the TableRow slots based on the state
 */
export const useTableRowStyles_unstable = (state: TableRowState): TableRowState => {
  const styles = useStyles();
  const layoutStyles = {
    native: useNativeLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableRowClassNames.root,
    styles.root,
    styles[state.size],
    layoutStyles[state.layoutType].root,
    layoutStyles[state.layoutType][state.size],
    state.root.className,
  );

  return state;
};
