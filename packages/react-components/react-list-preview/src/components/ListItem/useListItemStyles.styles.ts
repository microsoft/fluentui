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

const useCheckmarkBaseStyles = makeResetStyles({
  alignSelf: 'center',
  marginRight: tokens.spacingHorizontalS,
  width: tokens.spacingHorizontalL,
  height: tokens.spacingVerticalL,
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
    state.root.onClick && styles.rootClickable,
    state.root.className,
  );

  if (state.checkmark) {
    state.checkmark.className = mergeClasses(
      listItemClassNames.checkmark,
      checkmarkBaseStyles,
      state.checkmark?.className,
    );
  }

  return state;
};
