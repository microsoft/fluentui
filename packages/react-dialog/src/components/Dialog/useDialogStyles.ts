import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogState } from './Dialog.types';
import { tokens } from '@fluentui/react-theme';

export const dialogClassName = 'fui-Dialog';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '600px',
    height: 'fit-content',
    maxHeight: '100vh',
    boxShadow: tokens.shadow64,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    ...shorthands.borderRadius('8px'),
    ...shorthands.margin('auto'),
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),

    '@media screen and (max-width: 480px)': {
      maxWidth: '100%',
      width: '100vw',
    },
  },

  overlay: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    inset: '0px',
    backgroundColor: '#000000', //TODO: change value to a theme token
    opacity: '0.8',
  },
});

export const useDialogStyles_unstable = (state: DialogState): DialogState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogClassName, styles.root, state.root.className);
  state.overlayClassName = mergeClasses(styles.overlay);

  return state;
};
