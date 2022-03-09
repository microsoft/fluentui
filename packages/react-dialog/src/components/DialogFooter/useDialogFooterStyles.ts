import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogFooterState } from './DialogFooter.types';

export const dialogFooterClassName = 'fui-DialogFooter';

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
    },

    '@media screen and (max-width: 320px)': {
      alignItems: 'stretch',
      flexDirection: 'column',
    },
  },
});

export const useDialogFooterStyles_unstable = (state: DialogFooterState): DialogFooterState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogFooterClassName, styles.root, state.root.className);

  return state;
};
