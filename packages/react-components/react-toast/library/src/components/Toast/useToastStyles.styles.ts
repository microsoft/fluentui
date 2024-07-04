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
  borderRadius: `var(--ctrl-token-Toast-2765, var(--semantic-token-Toast-2766, ${tokens.borderRadiusMedium}))`,
  border: `1px solid ${tokens.colorTransparentStroke}`,
  boxShadow: `var(--ctrl-token-Toast-2767, var(--semantic-token-Toast-2768, ${tokens.shadow8}))`,
  fontSize: `var(--ctrl-token-Toast-2769, var(--semantic-token-Toast-2770, ${tokens.fontSizeBase300}))`,
  lineHeight: '20px',
  fontWeight: `var(--ctrl-token-Toast-2771, var(--semantic-token-Toast-2772, ${tokens.fontWeightSemibold}))`,
  color: `var(--ctrl-token-Toast-2773, var(--semantic-token-Toast-2774, ${tokens.colorNeutralForeground1}))`,
  backgroundColor: `var(--ctrl-token-Toast-2775, var(--semantic-token-Toast-2776, ${tokens.colorNeutralBackground1}))`,
});

const useStyles = makeStyles({
  inverted: {
    color: `var(--ctrl-token-Toast-2777, var(--semantic-token-Toast-2778, ${tokens.colorNeutralForegroundInverted2}))`,
    backgroundColor: `var(--ctrl-token-Toast-2779, var(--semantic-token-Toast-2780, ${tokens.colorNeutralBackgroundInverted}))`,
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
