import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, makeResetStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ListItemSlots, ListItemState } from './ListItem.types';
import { tokens } from '@fluentui/react-theme';

export const listItemClassNames: SlotClassNames<ListItemSlots> = {
  root: 'fui-ListItem',
  checkmark: 'fui-ListItem__checkmark',
};

const useRootBaseStyles = makeResetStyles({
  ...shorthands.padding(0),
  ...shorthands.margin(0),
  textIndent: 0,
  listStyleType: 'none',
  ...createCustomFocusIndicatorStyle(
    {
      ...shorthands.outline(tokens.strokeWidthThick, 'solid', tokens.colorStrokeFocus2),
      ...shorthands.borderRadius(tokens.borderRadiusMedium),
    },
    { selector: 'focus' },
  ),
});

const useCheckmarkBaseStyles = makeStyles({
  root: {
    alignSelf: 'center',
  },
});
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  rootClickable: {
    display: 'flex',
    cursor: 'pointer',
  },
});

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  const rootBaseStyles = useRootBaseStyles();
  const checkmarkBaseStyles = useCheckmarkBaseStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    listItemClassNames.root,
    rootBaseStyles,
    // add the clickable root only if we know the items are selectable and there is no custom onClick
    // because the custom onClick could be overriding the selection behavior.
    (state.selectable || state.hasCustomOnClick) && styles.rootClickable,
    state.root.className,
  );

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      listItemClassNames.checkmark,
      checkmarkBaseStyles.root,
      state.checkmark?.className,
    );
  }

  return state;
};

export const useIndicatorStyle = makeStyles({
  root: {
    ...shorthands.margin('4px'),
  },
});
