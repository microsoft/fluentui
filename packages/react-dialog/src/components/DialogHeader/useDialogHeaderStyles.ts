import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogHeaderState } from './DialogHeader.types';
import { tokens } from '@fluentui/react-theme';

export const dialogHeaderClassName = 'fui-DialogHeader';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // TODO text + close icon styling
    ...shorthands.padding('24px', '24px', '8px', '24px'),
    justifyContent: 'flex-start',
    height: 'fit-content',
    verticalAlign: 'top',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export const useDialogHeaderStyles_unstable = (state: DialogHeaderState): DialogHeaderState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogHeaderClassName, styles.root, state.root.className);

  return state;
};
