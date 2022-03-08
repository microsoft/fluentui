import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogHeaderState } from './DialogHeader.types';
import { tokens } from '@fluentui/react-theme';

export const dialogHeaderClassName = 'fui-DialogHeader';
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    //text only
    ...shorthands.padding('24px', '24px', '8px', '24px'),
    justifyContent: 'flex-start',
    height: 'fit-content',
    verticalAlign: 'top',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the DialogHeader slots based on the state
 */
export const useDialogHeaderStyles_unstable = (state: DialogHeaderState): DialogHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogHeaderClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
