import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogBodyState } from './DialogBody.types';
import { tokens } from '@fluentui/react-theme';

export const dialogBodyClassName = 'fui-DialogBody';
/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'start',
    verticalAlign: 'top',
    height: 'fit-content',
    minHeight: '32px',
    ...shorthands.padding('0px', '24px', '0px', '24px'),
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300,
    fontWeight: tokens.fontWeightRegular,
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the DialogBody slots based on the state
 */
export const useDialogBodyStyles_unstable = (state: DialogBodyState): DialogBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogBodyClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
