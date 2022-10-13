import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableRowSlots, TableRowState } from './TableRow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tableCellActionsClassNames } from '../TableCellActions/useTableCellActionsStyles';

export const tableRowClassName = 'fui-TableRow';
export const tableRowClassNames: SlotClassNames<TableRowSlots> = {
  root: tableRowClassName,
};

const useTableLayoutStyles = makeStyles({
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
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      color: tokens.colorNeutralForeground1Pressed,
      [`& .${tableCellActionsClassNames.root}`]: {
        backgroundColor: tokens.colorSubtleBackgroundPressed,
        opacity: 1,
      },
    },
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground1Hover,
      [`& .${tableCellActionsClassNames.root}`]: {
        backgroundColor: tokens.colorSubtleBackgroundHover,
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

  brand: {
    backgroundColor: tokens.colorBrandBackgroundInvertedHover,
    ...shorthands.borderColor(tokens.colorNeutralStrokeOnBrand),
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    },
  },

  neutral: {
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundSelected,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundSelected,
    },
    ...shorthands.borderColor(tokens.colorNeutralStrokeOnBrand),
  },

  none: {},
});

/**
 * Apply styling to the TableRow slots based on the state
 */
export const useTableRowStyles_unstable = (state: TableRowState): TableRowState => {
  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableRowClassNames.root,
    styles.root,
    styles[state.size],
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.noNativeElements ? layoutStyles.flex[state.size] : layoutStyles.table[state.size],
    styles[state.appearance],
    state.root.className,
  );

  return state;
};
