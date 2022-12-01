import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

import type { AlertSlots, AlertState } from './Alert.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const alertClassNames: SlotClassNames<AlertSlots> = {
  root: 'fui-Alert',
  icon: 'fui-Alert__icon',
  action: 'fui-Alert__action',
  avatar: 'fui-Alert__avatar',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '44px',
    ...shorthands.padding('0', '12px'),
    ...shorthands.borderRadius('4px'),
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStrokeInteractive),
    boxShadow: tokens.shadow8,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  inverted: {
    color: tokens.colorNeutralForegroundInverted,
    backgroundColor: tokens.colorNeutralBackgroundInverted,
  },
  icon: {
    height: '16px',
    fontSize: '16px',
    ...shorthands.padding('0', '8px', '0', '0'),
  },
  avatar: {
    ...shorthands.margin('0', '8px', '0', '0'),
  },
  action: {
    ...shorthands.padding('0'),
    minWidth: 0,
    marginLeft: 'auto',
    color: tokens.colorBrandForegroundLink,
  },
});

const useIntentIconStyles = makeStyles({
  success: {
    color: tokens.colorPaletteGreenForeground3,
  },
  error: {
    color: tokens.colorPaletteRedForeground3,
  },
  warning: {
    color: tokens.colorPaletteYellowForeground2,
  },
  info: {
    color: tokens.colorNeutralForeground2,
  },
});

/**
 * Apply styling to the Alert slots based on the state
 */
export const useAlertStyles_unstable = (state: AlertState): AlertState => {
  const styles = useStyles();
  const intentIconStyles = useIntentIconStyles();

  state.root.className = mergeClasses(
    alertClassNames.root,
    styles.root,
    state.appearance !== 'primary' && styles.inverted,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      alertClassNames.icon,
      styles.icon,
      state.intent && intentIconStyles[state.intent],
      state.icon.className,
    );
  }

  if (state.avatar) {
    state.avatar.className = mergeClasses(alertClassNames.avatar, styles.avatar, state.avatar.className);
  }

  if (state.action) {
    state.action.className = mergeClasses(alertClassNames.action, styles.action, state.action.className);
  }

  return state;
};
