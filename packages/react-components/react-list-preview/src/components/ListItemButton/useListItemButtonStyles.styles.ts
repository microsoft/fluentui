import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { ListItemButtonSlots, ListItemButtonState } from './ListItemButton.types';

export const listItemButtonClassNames: SlotClassNames<ListItemButtonSlots> = {
  root: 'fui-ListItemButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'block',
    width: '100%',
    textAlign: 'left',
    ...shorthands.padding(0),
  },
});

/**
 * Apply styling to the ListItemButton slots based on the state
 */
export const useListItemButtonStyles_unstable = (state: ListItemButtonState): ListItemButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(listItemButtonClassNames.root, styles.root, state.root.className);

  return state;
};
