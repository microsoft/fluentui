import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogTitleSlots, DialogTitleState } from './DialogTitle.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { createFocusOutlineStyle } from '@fluentui/react-tabster';

export const dialogTitleClassNames: SlotClassNames<DialogTitleSlots> = {
  root: 'fui-DialogTitle',
  closeButton: 'fui-DialogTitle__closeButton',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  closeButton: {},
  focusIndicator: createFocusOutlineStyle(),
  // TODO: this should be extracted to another package
  resetButton: {
    // boxSizing: 'content-box',
    // backgroundColor: 'inherit',
    // color: 'inherit',
    // fontFamily: 'inherit',
    // fontSize: 'inherit',
    // lineHeight: 'normal',
    // ...shorthands.overflow('visible'),
    // ...shorthands.padding(0),
    // WebkitAppearance: 'button',
    // textAlign: 'unset',
  },
});

/**
 * Apply styling to the DialogTitle slots based on the state
 */
export const useDialogTitleStyles_unstable = (state: DialogTitleState): DialogTitleState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogTitleClassNames.root, styles.root, state.root.className);
  if (state.closeButton) {
    state.closeButton.className = mergeClasses(
      dialogTitleClassNames.closeButton,
      styles.closeButton,
      styles.resetButton,
      styles.focusIndicator,
      state.closeButton.className,
    );
  }
  return state;
};
