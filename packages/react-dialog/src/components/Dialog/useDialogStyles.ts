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
  },

  overlay: {
    pointerEvents: 'none',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000', //TODO: change to token value
    opacity: '0.8',
  },
});

/**
 * Apply styling to the Dialog slots based on the state
 */
export const useDialogStyles_unstable = (state: DialogState): DialogState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogClassName, styles.root, state.root.className);

  state.overlayClassName = mergeClasses(styles.overlay);

  return state;
};
