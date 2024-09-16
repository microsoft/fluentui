import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ToastSlots, ToastState } from './Toast.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastClassNames: SlotClassNames<ToastSlots> = {
  root: 'fui-Toast',
};

const useRootBaseClassName = makeResetStyles({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  padding: '12px',
  borderRadius: tokens.borderRadiusMedium,
  border: `1px solid ${tokens.colorTransparentStroke}`,
  boxShadow: tokens.shadow8,
  fontSize: tokens.fontSizeBase300,
  lineHeight: '20px',
  fontWeight: tokens.fontWeightSemibold,
  color: tokens.colorNeutralForeground1,
  backgroundColor: tokens.colorNeutralBackground1,
});

const useStyles = makeStyles({
  inverted: {
    color: tokens.colorNeutralForegroundInverted2,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
});

/**
 * Apply styling to the Toast slots based on the state
 */
export const useToastStyles_unstable = (state: ToastState): ToastState => {
  'use no memo';

  const rootBaseClassName = useRootBaseClassName();
  const styles = useStyles();
  state.root.className = mergeClasses(
    toastClassNames.root,
    rootBaseClassName,
    state.backgroundAppearance === 'inverted' && styles.inverted,
    state.root.className,
  );

  return state;
};
