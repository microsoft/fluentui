import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { ToastLayoutSlots, ToastLayoutState } from './ToastLayout.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const toastLayoutClassNames: SlotClassNames<ToastLayoutSlots> = {
  root: 'fui-ToastLayout',
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
 * Apply styling to the ToastLayout slots based on the state
 */
export const useToastLayoutStyles_unstable = (state: ToastLayoutState): ToastLayoutState => {
  const styles = useStyles();
  state.root.className = mergeClasses(toastLayoutClassNames.root, styles.root, state.root.className);

  return state;
};
