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
    color: `var(--1977, var(--1978, ${tokens.colorNeutralForeground1}))`,
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
      {
        outline: `2px solid ${tokens.colorStrokeFocus2}`,
        borderRadius: `var(--1979, var(--1980, ${tokens.borderRadiusMedium}))`,
      },
      { selector: 'focus' },
    ),
  },

  rootInteractive: {
    ':active': {
      backgroundColor: `var(--1981, var(--1982, ${tokens.colorSubtleBackgroundPressed}))`,
      color: `var(--1983, var(--1984, ${tokens.colorNeutralForeground1Pressed}))`,
      [`& .${tableCellActionsClassNames.root}`]: {
        opacity: 1,
      },
      [`& .${tableSelectionCellClassNames.root}`]: {
        opacity: 1,
      },
    },
    ':hover': {
      backgroundColor: `var(--1985, var(--1986, ${tokens.colorSubtleBackgroundHover}))`,
      color: `var(--1987, var(--1988, ${tokens.colorNeutralForeground1Hover}))`,
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
    fontSize: `var(--1989, var(--1990, ${tokens.fontSizeBase200}))`,
  },

  brand: {
    backgroundColor: `var(--1991, var(--1992, ${tokens.colorBrandBackground2}))`,
    ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
    ':active': {
      backgroundColor: `var(--1993, var(--1994, ${tokens.colorBrandBackground2}))`,
      color: `var(--1995, var(--1996, ${tokens.colorNeutralForeground1}))`,
    },

    '@media(forced-colors: active)': {
      border: '2px solid transparent',
      borderRadius: `var(--1997, var(--1998, ${tokens.borderRadiusMedium}))`,
      boxSizing: 'border-box',
      ':focus-visible': {
        outlineOffset: '-4px',
      },
    },
  },

  neutral: {
    '@media(forced-colors: active)': {
      border: '2px solid transparent',
      borderRadius: `var(--1999, var(--2000, ${tokens.borderRadiusMedium}))`,
      boxSizing: 'border-box',
      ':focus-visible': {
        outlineOffset: '-4px',
      },
    },
    backgroundColor: `var(--2001, var(--2002, ${tokens.colorSubtleBackgroundSelected}))`,
    color: `var(--2003, var(--2004, ${tokens.colorNeutralForeground1Hover}))`,
    ':hover': {
      backgroundColor: `var(--2005, var(--2006, ${tokens.colorSubtleBackgroundSelected}))`,
    },
    ':active': {
      backgroundColor: `var(--2007, var(--2008, ${tokens.colorSubtleBackgroundSelected}))`,
    },

    ...shorthands.borderColor(tokens.colorNeutralStrokeOnBrand),
  },

  none: {},
});

/**
 * Apply styling to the TableRow slots based on the state
 */
export const useTableRowStyles_unstable = (state: TableRowState): TableRowState => {
  'use no memo';

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
