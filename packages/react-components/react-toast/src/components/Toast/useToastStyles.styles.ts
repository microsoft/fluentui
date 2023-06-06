import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ToastSlots, ToastState } from './Toast.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastClassNames: SlotClassNames<ToastSlots> = {
  root: 'fui-Toast',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    ...shorthands.padding('12px', '12px'),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
    boxShadow: tokens.shadow8,
    fontSize: tokens.fontSizeBase300,
    lineHeight: '20px',
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },

  inverted: {
    color: tokens.colorNeutralForegroundInverted2,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
});

/**
 * Apply styling to the Toast slots based on the state
 */
export const useToastStyles_unstable = (state: ToastState): ToastState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toastClassNames.root, styles.root, state.root.className);

  return state;
};
