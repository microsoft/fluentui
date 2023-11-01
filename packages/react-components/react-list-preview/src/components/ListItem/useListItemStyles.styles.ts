import type { SlotClassNames } from '@fluentui/react-utilities';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { ListItemSlots, ListItemState } from './ListItem.types';
import { tokens } from '@fluentui/react-theme';

export const listItemClassNames: SlotClassNames<ListItemSlots> = {
  root: 'fui-ListItem',
  checkbox: 'fui-ListItem__checkbox',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.outline('2px', 'solid', tokens.colorStrokeFocus2),
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
      },
      { selector: 'focus' },
    ),
  },

  rootSelectable: {
    display: 'flex',
  },
});

/**
 * Apply styling to the ListItem slots based on the state
 */
export const useListItemStyles_unstable = (state: ListItemState): ListItemState => {
  const styles = useStyles();
  state.root.className = mergeClasses(
    listItemClassNames.root,
    styles.root,
    state.selectable && styles.rootSelectable,
    state.root.className,
  );

  if (state.checkbox) {
    state.checkbox.className = mergeClasses(listItemClassNames.checkbox, state.checkbox?.className);
  }

  return state;
};
