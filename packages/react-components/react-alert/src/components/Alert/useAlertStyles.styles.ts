import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { createCustomFocusIndicatorStyle } from '@fluentui/react-tabster';
import type { AlertSlots, AlertState } from './Alert.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

// eslint-disable-next-line deprecation/deprecation
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
    ...shorthands.border('1px', 'solid', tokens.colorTransparentStroke),
    boxShadow: tokens.shadow8,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  inverted: {
    color: tokens.colorNeutralForegroundInverted2,
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
    ...shorthands.padding('5px', '10px'),
    minWidth: 0,
    marginLeft: 'auto',
    color: tokens.colorBrandForeground1,
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

const useIntentIconStylesInverted = makeStyles({
  success: {
    color: tokens.colorPaletteGreenForegroundInverted,
  },
  error: {
    color: tokens.colorPaletteRedForegroundInverted,
  },
  warning: {
    color: tokens.colorPaletteYellowForegroundInverted,
  },
  info: {
    color: tokens.colorNeutralForegroundInverted2,
  },
});

const useActionButtonColorInverted = makeStyles({
  action: {
    color: tokens.colorBrandForegroundInverted,
    ...createCustomFocusIndicatorStyle(
      {
        ...shorthands.borderColor(tokens.colorTransparentStrokeInteractive),
        outlineColor: tokens.colorNeutralBackground5Pressed,
      },
      { enableOutline: true },
    ),
  },
});

/**
 * @deprecated please use the Toast or MessageBar component
 * Apply styling to the Alert slots based on the state
 */
// eslint-disable-next-line deprecation/deprecation
export const useAlertStyles_unstable = (state: AlertState): AlertState => {
  const inverted = state.appearance === 'inverted';
  const styles = useStyles();
  const intentIconStylesPrimary = useIntentIconStyles();
  const intentIconStylesInverted = useIntentIconStylesInverted();
  const actionStylesInverted = useActionButtonColorInverted();

  state.root.className = mergeClasses(
    alertClassNames.root,
    styles.root,
    inverted && styles.inverted,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      alertClassNames.icon,
      styles.icon,
      state.intent && (inverted ? intentIconStylesInverted[state.intent] : intentIconStylesPrimary[state.intent]),
      state.icon.className,
    );
  }

  if (state.avatar) {
    state.avatar.className = mergeClasses(alertClassNames.avatar, styles.avatar, state.avatar.className);
  }

  if (state.action) {
    // Note: inverted && actionStylesInverted.action has the highest piority and must be merged last
    state.action.className = mergeClasses(
      alertClassNames.action,
      styles.action,
      inverted && actionStylesInverted.action,
      state.action.className,
    );
  }

  return state;
};
