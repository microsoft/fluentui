import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { TableRowSlots, TableRowState } from './TableRow.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tableCellActionsClassNames } from '../TableCellActions/useTableCellActionsStyles.styles';
import { tableSelectionCellClassNames } from '../TableSelectionCell/useTableSelectionCellStyles.styles';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';

export const tableRowClassName = 'fui-TableRow';
export const tableRowClassNames: SlotClassNames<TableRowSlots> = {
  root: tableRowClassName,
};

const useTableLayoutStyles = makeStyles({
  root: {
    display: 'table-row',
  },
});

const useFlexLayoutStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
});

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    color: `var(--ctrl-token-TableRow-1977, var(--semantic-token-TableRow-1978, ${tokens.colorNeutralForeground1}))`,
    boxSizing: 'border-box',
    ...createCustomFocusIndicatorStyle(
      {
        [`& .${tableSelectionCellClassNames.root}`]: {
          opacity: 1,
        },
        [`& .${tableCellActionsClassNames.root}`]: {
          opacity: 1,
        },
      },
      { selector: 'focus-within' },
    ),
    ...createCustomFocusIndicatorStyle(
      { outline: `2px solid ${tokens.colorStrokeFocus2}`, borderRadius: `var(--ctrl-token-TableRow-1979, var(--semantic-token-TableRow-1980, ${tokens.borderRadiusMedium}))` },
      { selector: 'focus' },
    ),
  },

  rootInteractive: {
    ':active': {
      backgroundColor: `var(--ctrl-token-TableRow-1981, var(--semantic-token-TableRow-1982, ${tokens.colorSubtleBackgroundPressed}))`,
      color: `var(--ctrl-token-TableRow-1983, var(--semantic-token-TableRow-1984, ${tokens.colorNeutralForeground1Pressed}))`,
      [`& .${tableCellActionsClassNames.root}`]: {
        opacity: 1,
      },
      [`& .${tableSelectionCellClassNames.root}`]: {
        opacity: 1,
      },
    },
    ':hover': {
      backgroundColor: `var(--ctrl-token-TableRow-1985, var(--semantic-token-TableRow-1986, ${tokens.colorSubtleBackgroundHover}))`,
      color: `var(--ctrl-token-TableRow-1987, var(--semantic-token-TableRow-1988, ${tokens.colorNeutralForeground1Hover}))`,
      [`& .${tableCellActionsClassNames.root}`]: {
        opacity: 1,
      },
      [`& .${tableSelectionCellClassNames.root}`]: {
        opacity: 1,
      },
    },
    // High contrast styles
    '@media (forced-colors: active)': {
      ':hover': {
        color: 'Highlight',
        ...shorthands.borderColor('Highlight'),
      },
    },
  },

  medium: { borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}` },

  small: { borderBottom: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke2}` },

  'extra-small': {
    fontSize: `var(--ctrl-token-TableRow-1989, var(--semantic-token-TableRow-1990, ${tokens.fontSizeBase200}))`,
  },

  brand: {
    backgroundColor: `var(--ctrl-token-TableRow-1991, var(--semantic-token-TableRow-1992, ${tokens.colorBrandBackground2}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    ':active': {
      backgroundColor: `var(--ctrl-token-TableRow-1993, var(--semantic-token-TableRow-1994, ${tokens.colorBrandBackground2}))`,
      color: `var(--ctrl-token-TableRow-1995, var(--semantic-token-TableRow-1996, ${tokens.colorNeutralForeground1}))`,
    },

    '@media(forced-colors: active)': {
      border: '2px solid transparent',
      borderRadius: `var(--ctrl-token-TableRow-1997, var(--semantic-token-TableRow-1998, ${tokens.borderRadiusMedium}))`,
      boxSizing: 'border-box',
      ':focus-visible': {
        outlineOffset: '-4px',
      },
    },
  },

  neutral: {
    '@media(forced-colors: active)': {
      border: '2px solid transparent',
      borderRadius: `var(--ctrl-token-TableRow-1999, var(--semantic-token-TableRow-2000, ${tokens.borderRadiusMedium}))`,
      boxSizing: 'border-box',
      ':focus-visible': {
        outlineOffset: '-4px',
      },
    },
    backgroundColor: `var(--ctrl-token-TableRow-2001, var(--semantic-token-TableRow-2002, ${tokens.colorSubtleBackgroundSelected}))`,
    color: `var(--ctrl-token-TableRow-2003, var(--semantic-token-TableRow-2004, ${tokens.colorNeutralForeground1Hover}))`,
    ':hover': {
      backgroundColor: `var(--ctrl-token-TableRow-2005, var(--semantic-token-TableRow-2006, ${tokens.colorSubtleBackgroundSelected}))`,
    },
    ':active': {
      backgroundColor: `var(--ctrl-token-TableRow-2007, var(--semantic-token-TableRow-2008, ${tokens.colorSubtleBackgroundSelected}))`,
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
    !state.isHeaderRow && styles.rootInteractive,
    styles[state.size],
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    styles[state.appearance],
    state.root.className,
  );

  return state;
};
