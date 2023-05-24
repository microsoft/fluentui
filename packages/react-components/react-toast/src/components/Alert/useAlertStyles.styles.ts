import { tokens } from '@fluentui/react-theme';
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { AlertSlots, AlertState } from './Alert.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const alertClassNames: SlotClassNames<AlertSlots> = {
  root: 'fui-Alert',
  media: 'fui-Alert__media',
  action: 'fui-Alert__action',
};

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '44px',
    ...shorthands.padding('0px', '12px'),
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
  media: {
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

const useIntentMediaStyles = makeStyles({
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

const useIntentMediaStylesInverted = makeStyles({
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
  },
});

/**
 * Apply styling to the Alert slots based on the state
 */
export const useAlertStyles_unstable = (state: AlertState): AlertState => {
  const inverted = state.appearance === 'inverted';
  const styles = useStyles();
  const intentMediaStylesPrimary = useIntentMediaStyles();
  const intentMediaStylesInverted = useIntentMediaStylesInverted();
  const actionStylesInverted = useActionButtonColorInverted();

  state.root.className = mergeClasses(
    alertClassNames.root,
    styles.root,
    inverted && styles.inverted,
    state.root.className,
  );

  if (state.media) {
    state.media.className = mergeClasses(
      alertClassNames.media,
      styles.media,
      state.intent && (inverted ? intentMediaStylesInverted[state.intent] : intentMediaStylesPrimary[state.intent]),
      state.media.className,
    );
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
