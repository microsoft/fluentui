import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogState } from './Dialog.types';
import { tokens } from '@fluentui/react-theme';

export const dialogClassName = 'fui-Dialog';

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    height: '100%',
    maxHeight: '100vh',
    boxShadow: tokens.shadow64,
    position: 'relative',
    ...shorthands.borderRadius('8px'),
    ...shorthands.margin('auto'),
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),

    '&.fui-Dialog--open': {},
    '@media screen and (max-width: 480px)': {
      maxWidth: '100%',
      width: '100vw',
    },
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the Dialog slots based on the state
 */
export const useDialogStyles_unstable = (state: DialogState): DialogState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogClassName, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
