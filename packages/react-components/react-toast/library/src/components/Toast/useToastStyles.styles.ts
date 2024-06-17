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
  borderRadius: `var(--2765, var(--2766, ${tokens.borderRadiusMedium}))`,
  border: `1px solid ${tokens.colorTransparentStroke}`,
  boxShadow: `var(--2767, var(--2768, ${tokens.shadow8}))`,
  fontSize: `var(--2769, var(--2770, ${tokens.fontSizeBase300}))`,
  lineHeight: '20px',
  fontWeight: `var(--2771, var(--2772, ${tokens.fontWeightSemibold}))`,
  color: `var(--2773, var(--2774, ${tokens.colorNeutralForeground1}))`,
  backgroundColor: `var(--2775, var(--2776, ${tokens.colorNeutralBackground1}))`,
});

const useStyles = makeStyles({
  inverted: {
    color: `var(--2777, var(--2778, ${tokens.colorNeutralForegroundInverted2}))`,
    backgroundColor: `var(--2779, var(--2780, ${tokens.colorNeutralBackgroundInverted}))`,
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
