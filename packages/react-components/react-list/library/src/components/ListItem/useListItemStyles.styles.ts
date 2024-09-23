import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, makeResetStyles, mergeClasses } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ListItemSlots, ListItemState } from './ListItem.types';
import { tokens } from '@fluentui/react-theme';

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
      outline: `${tokens.strokeWidthThick} solid ${tokens.colorStrokeFocus2}`,
      borderRadius: tokens.borderRadiusMedium,
    },
    { selector: 'focus' },
  ),
});

const useCheckmarkBaseStyles = makeStyles({
  root: {
    alignSelf: 'center',
    //eslint-disable-next-line
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
