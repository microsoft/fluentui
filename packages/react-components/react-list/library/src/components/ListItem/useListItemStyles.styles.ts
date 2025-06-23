import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ListItemSlots, ListItemState } from './ListItem.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const listItemClassNames: SlotClassNames<ListItemSlots> = {
  root: 'fui-ListItem',
  checkmark: 'fui-ListItem__checkmark',
};

const useRootBaseStyles = makeResetStyles({
  padding: 0,
  margin: 0,
  textIndent: 0,
  listStyleType: 'none',
  ...createCustomFocusIndicatorStyle(
    {
      outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens._ctrlListItemStroke}`,
      borderRadius: semanticTokens.cornerCtrlRest,
    },
    { selector: 'focus' },
  ),
  color: semanticTokens._ctrlListForegroundColorRest,
  backgroundColor: semanticTokens._ctrlListBackgroundColorRest,
  fontSize: semanticTokens.textRampItemBodyFontSize,
  lineHeight: semanticTokens.textRampItemBodyLineHeight,
});

const useCheckmarkBaseStyles = makeStyles({
  root: {
    alignSelf: 'center',

    '& .fui-Checkbox__indicator': { margin: '4px' },
  },
});
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  rootClickableOrSelectable: {
    display: 'flex',
    cursor: 'pointer',
    ':hover': {
      color: semanticTokens._ctrlListForegroundColorHover,
      backgroundColor: semanticTokens._ctrlListBackgroundColorHover,
      ...createCustomFocusIndicatorStyle(
        {
          outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens._ctrlListItemStroke}`,
          borderRadius: semanticTokens.cornerCtrlHover,
        },
        { selector: 'focus' },
      ),
    },
    ':active': {
      color: semanticTokens._ctrlListForegroundColorPressed,
      backgroundColor: semanticTokens._ctrlListBackgroundColorPressed,
      ...createCustomFocusIndicatorStyle(
        {
          outline: `${semanticTokens.ctrlFocusOuterStrokeWidth} solid ${semanticTokens._ctrlListItemStroke}`,
          borderRadius: semanticTokens.cornerCtrlPressed,
        },
        { selector: 'focus' },
      ),
    },
  },
});

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  'use no memo';

  const rootBaseStyles = useRootBaseStyles();
  const checkmarkBaseStyles = useCheckmarkBaseStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    listItemClassNames.root,
    rootBaseStyles,
    (state.selectable || state.navigable) && styles.rootClickableOrSelectable,
    state.root.className,
  );

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      listItemClassNames.checkmark,
      checkmarkBaseStyles.root,
      state.checkmark.className,
    );
  }

  return state;
};
