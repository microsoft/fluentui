import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import {
  tableRowClassNames,
  tableCellActionsClassNames,
  tableSelectionCellClassNames,
  type TableRowState,
} from '@fluentui/react-table';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
    color: semanticTokens.foregroundContentNeutralPrimary,
    boxSizing: 'border-box',
    ...createCustomFocusIndicatorStyle(
      {
        outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusInnerStroke}`,
        borderRadius: semanticTokens.cornerCtrlRest,
      },
      { selector: 'focus' },
    ),
  },

  rootSubtleSelection: {
    ...createCustomFocusIndicatorStyle(
      {
        [`& .${tableSelectionCellClassNames.root}`]: {
          opacity: 1,
        },
      },
      { selector: 'focus-within' },
    ),
    ':hover': {
      [`& .${tableSelectionCellClassNames.root}`]: {
        opacity: 1,
      },
    },
  },

  rootInteractive: {
    ...createCustomFocusIndicatorStyle(
      {
        [`& .${tableCellActionsClassNames.root}`]: {
          opacity: 1,
        },
      },
      { selector: 'focus-within' },
    ),
    ':active': {
      backgroundColor: semanticTokens.backgroundCtrlSubtlePressed,
      color: semanticTokens.foregroundCtrlNeutralPrimaryPressed,
      [`& .${tableCellActionsClassNames.root}`]: {
        opacity: 1,
      },
    },
    ':hover': {
      backgroundColor: semanticTokens.backgroundCtrlSubtleHover,
      color: semanticTokens.foregroundCtrlNeutralPrimaryHover,
      [`& .${tableCellActionsClassNames.root}`]: {
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

  medium: { borderBottom: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.strokeDividerDefault}` },

  small: { borderBottom: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.strokeDividerDefault}` },

  'extra-small': {
    fontSize: semanticTokens.textRampSmItemBodyFontSize,
  },

  brand: {
    backgroundColor: semanticTokens.statusBrandTintBackground,
    ...shorthands.borderColor(semanticTokens.strokeCtrlOnActiveBrandPressed),
    ':active': {
      backgroundColor: semanticTokens.statusBrandTintBackground,
      color: semanticTokens.foregroundContentNeutralPrimary,
    },

    '@media(forced-colors: active)': {
      border: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusOuterStroke}`,
      borderRadius: semanticTokens.cornerCtrlRest,
      boxSizing: 'border-box',
      ':focus-visible': {
        outlineOffset: '-4px',
      },
    },
  },

  neutral: {
    '@media(forced-colors: active)': {
      border: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens.ctrlFocusOuterStroke}`,
      borderRadius: semanticTokens.cornerCtrlRest,
      boxSizing: 'border-box',
      ':focus-visible': {
        outlineOffset: '-4px',
      },
    },
    backgroundColor: tokens.colorSubtleBackgroundSelected,
    color: semanticTokens.foregroundCtrlNeutralPrimaryHover,
    ':hover': {
      backgroundColor: tokens.colorSubtleBackgroundSelected,
    },
    ':active': {
      backgroundColor: tokens.colorSubtleBackgroundSelected,
    },

    ...shorthands.borderColor(semanticTokens.strokeCtrlDividerOnBrand),
  },

  none: {},
});

/**
 * Apply styling to the TableRow slots based on the state
 */
export const useSemanticTableRowStyles = (_state: unknown): TableRowState => {
  'use no memo';

  const state = _state as TableRowState;

  const styles = useStyles();
  const layoutStyles = {
    table: useTableLayoutStyles(),
    flex: useFlexLayoutStyles(),
  };
  state.root.className = mergeClasses(
    state.root.className,
    tableRowClassNames.root,
    styles.root,
    styles.rootSubtleSelection,
    !state.isHeaderRow && styles.rootInteractive,
    styles[state.size],
    state.noNativeElements ? layoutStyles.flex.root : layoutStyles.table.root,
    styles[state.appearance],
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
