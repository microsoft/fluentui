import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';

import type { AlertSlots, AlertState } from './Alert.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const alertClassName = 'fui-Alert';
export const alertClassNames: SlotClassNames<AlertSlots> = {
  root: 'fui-Alert',
  icon: 'fui-Alert__icon',
  content: 'fui-Alert__content',
  action: 'fui-Alert__action',
};

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
  content: {
    fontSize: tokens.fontSizeBase300, // todo - what is the size & lineheight in tokens
    fontWeight: tokens.fontWeightSemibold,
  },
  action: {
    ...shorthands.padding('12px'),
    minWidth: 0,
    marginLeft: 'auto',
    color: tokens.colorBrandForeground2, // todo - foreground3 doesn't exist
  },
});

const useIntentIconStyles = makeStyles({
  success: {
    color: tokens.colorPaletteGreenForeground2,
  },
  error: {
    color: tokens.colorPaletteRedForeground3,
  },
  warning: {
    color: tokens.colorPaletteYellowForeground1, // todo - there is no foreground
  },
  info: {
    color: tokens.colorNeutralForeground3,
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

  state.content.className = mergeClasses(alertClassNames.content, styles.content, state.content.className);

  if (state.action) {
    state.action.className = mergeClasses(alertClassNames.action, styles.action, state.action.className);
  }

  return state;
};
