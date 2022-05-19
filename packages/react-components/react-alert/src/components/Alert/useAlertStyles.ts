import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

import type { AlertSlots, AlertState } from './Alert.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const alertClassName = 'fui-Alert';
export const alertClassNames: SlotClassNames<AlertSlots> = {
  root: 'fui-Alert',
  icon: 'fui-Alert__icon',
  action: 'fui-Alert__action',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '44px',
    ...shorthands.padding('0', '12px'),
    backgroundColor: tokens.colorNeutralBackground1, // todo - there is no bg10, used bg1
    ...shorthands.borderColor('transparent'),
    ...shorthands.borderRadius('4px'),
    boxShadow: tokens.shadow8,
    fontSize: tokens.fontSizeBase300, // todo - lineheight in tokens
    fontWeight: tokens.fontWeightSemibold,
  },
  icon: {
    height: '16px',
    fontSize: '16px',
    ...shorthands.padding('0', '8px', '0', '0'),
  },
  action: {
    ...shorthands.padding('0'),
    minWidth: 0,
    marginLeft: 'auto',
    color: tokens.colorBrandForeground2, // todo - foreground3 doesn't exist
  },
});

const useIntentIconStyles = makeStyles({
  success: {
    color: tokens.colorPaletteGreenBackground3,
  },
  error: {
    color: tokens.colorPaletteRedBackground3,
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

  state.root.className = mergeClasses(alertClassNames.root, styles.root, state.root.className);

  if (state.icon) {
    state.icon.className = mergeClasses(
      alertClassNames.icon,
      styles.icon,
      state.intent && intentIconStyles[state.intent],
      state.icon.className,
    );
  }

  if (state.action) {
    state.action.className = mergeClasses(alertClassNames.action, styles.action, state.action.className);
  }

  return state;
};
