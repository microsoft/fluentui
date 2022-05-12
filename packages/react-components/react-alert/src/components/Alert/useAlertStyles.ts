import { tokens } from '@fluentui/react-theme';
import { shorthands, makeStyles, mergeClasses } from '@griffel/react';

import type { AlertSlots, AlertState } from './Alert.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
export const alertClassName = 'fui-Alert';
export const alertClassNames: SlotClassNames<AlertSlots> = {
  root: 'fui-Alert',
  icon: 'fui-Alert__icon',
  content: 'fui-Alert__content',
  action: 'fui-Alert__action',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '44px',
    backgroundColor: tokens.colorNeutralBackground1, // todo - there is no bg10, us
    ...shorthands.borderColor('transparent'),
    ...shorthands.borderRadius('4px'),
    boxShadow: tokens.shadow8,
  },
  icon: {
    height: '16px',
    ...shorthands.padding('0', '8px', '0', '12px'),
  },
  iconSuccess: {
    color: tokens.colorPaletteGreenForeground2,
  },
  iconError: {
    color: tokens.colorPaletteRedForeground3,
  },
  iconWarning: {
    color: tokens.colorPaletteYellowForeground1, // todo - there is no foreground
  },
  iconInfo: {
    color: tokens.colorNeutralForeground3,
  },
  content: {
    fontSize: '14px', // todo - what is the size & lineheight in tokens
    fontWeight: tokens.fontWeightSemibold,
  },
  action: {
    ...shorthands.padding('12px'),
    minWidth: 0,
    marginLeft: 'auto',
    color: tokens.colorBrandForeground2, // todo - foreground3 doesn't exist
  },
});

/**
 * Apply styling to the Alert slots based on the state
 */
export const useAlertStyles_unstable = (state: AlertState): AlertState => {
  const styles = useStyles();
  state.root.className = mergeClasses(alertClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(
      alertClassNames.icon,
      styles.icon,
      state.intent === 'success' && styles.iconSuccess,
      state.intent === 'error' && styles.iconError,
      state.intent === 'warning' && styles.iconWarning,
      state.intent === 'info' && styles.iconInfo,
      state.icon.className,
    );
  }

  state.content.className = mergeClasses(alertClassNames.content, styles.content, state.content.className);

  if (state.action) {
    state.action.className = mergeClasses(alertClassNames.action, styles.action, state.action.className);
  }

  return state;
};
