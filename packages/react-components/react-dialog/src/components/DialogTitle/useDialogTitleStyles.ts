import { makeStyles, mergeClasses } from '@griffel/react';
import type { DialogTitleSlots, DialogTitleState } from './DialogTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const dialogTitleClassNames: SlotClassNames<DialogTitleSlots> = {
  root: 'fui-DialogTitle',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
});

/**
 * Apply styling to the DialogTitle slots based on the state
 */
export const useDialogTitleStyles_unstable = (state: DialogTitleState): DialogTitleState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogTitleClassNames.root, styles.root, state.root.className);
  return state;
};
