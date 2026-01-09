import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import { listItemClassNames, type ListItemState } from '@fluentui/react-list';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
export const useSemanticListItemStyles = (_state: unknown): ListItemState => {
  'use no memo';

  const state = _state as ListItemState;
  const rootBaseStyles = useRootBaseStyles();
  const checkmarkBaseStyles = useCheckmarkBaseStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    listItemClassNames.root,
    rootBaseStyles,
    (state.selectable || state.navigable) && styles.rootClickableOrSelectable,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      state.checkmark.className,
      listItemClassNames.checkmark,
      checkmarkBaseStyles.root,
      getSlotClassNameProp_unstable(state.checkmark),
    );
  }

  return state;
};
