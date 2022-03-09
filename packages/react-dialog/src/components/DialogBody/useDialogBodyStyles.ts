import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { DialogBodyState } from './DialogBody.types';
import { tokens } from '@fluentui/react-theme';

export const dialogBodyClassName = 'fui-DialogBody';

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
  },
});

export const useDialogBodyStyles_unstable = (state: DialogBodyState): DialogBodyState => {
  const styles = useStyles();
  state.root.className = mergeClasses(dialogBodyClassName, styles.root, state.root.className);

  return state;
};
