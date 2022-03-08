import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogFooterState } from './DialogFooter.types';

export const dialogFooterClassName = 'fui-DialogFooter';
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    justifyContent: 'flex-end',
    height: 'fit-content',
    verticalAlign: 'top',
    ...shorthands.gap('8px'),
    ...shorthands.padding('8px', '24px', '24px', '24px'),

    '@media screen and (max-width: 480px)': {
      ...shorthands.padding('24px', '24px', '24px', '24px'),
      justifyContent: 'stretch',
    },
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the DialogFooter slots based on the state
 */
export const useDialogFooterStyles_unstable = (state: DialogFooterState): DialogFooterState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogFooterClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
