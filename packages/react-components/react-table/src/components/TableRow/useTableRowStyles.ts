import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableRowSlots, TableRowState } from './TableRow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tableCellActionsClassNames } from '../TableCellActions/useTableCellActionsStyles';
import { tableSelectionCellClassNames } from '../TableSelectionCell/useTableSelectionCellStyles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { useIsInTableHeader } from '../../contexts/tableHeaderContext';

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
    boxSizing: 'border-box',
    ...createCustomFocusIndicatorStyle(
      {
        [`& .${tableSelectionCellClassNames.root}`]: {
          opacity: 1,
        },
      },
      { selector: 'focus-within' },
    ),
    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.outline('2px', 'solid'),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
      },
      { selector: 'focus', enableOutline: true },
    ),
  },

  rootInteractive: {
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundPressed,
      color: tokens.colorNeutralForeground1Pressed,
      [`& .${tableCellActionsClassNames.root}`]: {
        backgroundColor: tokens.colorSubtleBackgroundPressed,
        opacity: 1,
      },
      [`& .${tableSelectionCellClassNames.root}`]: {
        backgroundColor: tokens.colorNeutralBackground1Hover,
        opacity: 1,
      },
    },
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundHover,
      color: tokens.colorNeutralForeground1Hover,
      [`& .${tableCellActionsClassNames.root}`]: {
        backgroundColor: tokens.colorNeutralBackground1Hover,
        opacity: 1,
      },
      [`& .${tableSelectionCellClassNames.root}`]: {
        backgroundColor: tokens.colorNeutralBackground1Hover,
        opacity: 1,
      },
    },
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
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorNeutralForeground1Hover,
    ...shorthands.borderColor(tokens.colorNeutralStrokeOnBrand),
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2,
    },
    ':active': {
      backgroundColor: tokens.colorBrandBackgroundInvertedSelected,
    },

    '@media(forced-colors: active)': {
      ...shorthands.border('2px', 'solid', 'transparent'),
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      boxSizing: 'border-box',
      ':focus-visible': {
        outlineOffset: '-4px',
      },
    },
  },

  neutral: {
    '@media(forced-colors: active)': {
      ...shorthands.border('2px', 'solid', 'transparent'),
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
      boxSizing: 'border-box',
      ':focus-visible': {
        outlineOffset: '-4px',
      },
    },
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: tokens.colorNeutralForeground1Hover,
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
  const isHeaderRow = useIsInTableHeader();
  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    tableRowClassNames.root,
    styles.root,
    !isHeaderRow && styles.rootInteractive,
    styles[state.size],
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    state.noNativeElements ? layoutStyles.flex[state.size] : layoutStyles.table[state.size],
    styles[state.appearance],
    state.root.className,
  );

  return state;
};
