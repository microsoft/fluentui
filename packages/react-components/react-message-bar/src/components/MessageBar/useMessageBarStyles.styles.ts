import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarSlots, MessageBarState } from './MessageBar.types';

export const messageBarClassNames: SlotClassNames<MessageBarSlots> = {
  root: 'fui-MessageBar',
  icon: 'fui-MessageBar__icon',
};

const useRootBaseStyles = makeResetStyles({
  whiteSpace: 'nowrap',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto auto',
  gridTemplateRows: '1fr',
  gridTemplateAreas: '"icon body secondaryActions actions"',
  paddingLeft: tokens.spacingHorizontalM,
  ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  alignItems: 'center',
  minHeight: '36px',
  boxSizing: 'border-box',
  backgroundColor: tokens.colorNeutralBackground3,
});

const useIconBaseStyles = makeResetStyles({
  ...shorthands.gridArea('icon'),
  fontSize: tokens.fontSizeBase500,
  marginRight: tokens.spacingHorizontalS,
  color: tokens.colorNeutralForeground3,
  display: 'flex',
  alignItems: 'center',
});

const useStyles = makeStyles({
  rootMultiline: {
    whiteSpace: 'normal',
    alignItems: 'start',
    paddingTop: tokens.spacingVerticalMNudge,
    gridTemplateColumns: 'auto 1fr auto',
    gridTemplateAreas: `
      "icon body actions"
      "secondaryActions secondaryActions secondaryActions"
    `,
  },

  secondaryActionsMultiline: {
    justifyContent: 'end',
    marginTop: tokens.spacingVerticalMNudge,
    marginBottom: tokens.spacingVerticalS,
    marginRight: '0px',
  },

  square: {
    ...shorthands.borderRadius(0),
  },
});

const useIconIntentStyles = makeStyles({
  info: {
    /** already in base reset styles */
  },
  error: {
    color: tokens.colorStatusDangerForeground1,
  },
  warning: {
    color: tokens.colorStatusWarningForeground3,
  },
  success: {
    color: tokens.colorStatusSuccessForeground1,
  },
});

const useRootIntentStyles = makeStyles({
  info: {
    /** already in base reset styles */
  },
  error: {
    backgroundColor: tokens.colorStatusDangerBackground1,
    ...shorthands.borderColor(tokens.colorStatusDangerBorder1),
  },
  warning: {
    backgroundColor: tokens.colorStatusWarningBackground1,
    ...shorthands.borderColor(tokens.colorStatusWarningBorder1),
  },
  success: {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    ...shorthands.borderColor(tokens.colorStatusSuccessBorder1),
  },
});

/**
 * Apply styling to the MessageBar slots based on the state
 */
export const useMessageBarStyles_unstable = (state: MessageBarState): MessageBarState => {
  const rootBaseStyles = useRootBaseStyles();
  const iconBaseStyles = useIconBaseStyles();
  const iconIntentStyles = useIconIntentStyles();
  const rootIntentStyles = useRootIntentStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    messageBarClassNames.root,
    rootBaseStyles,
    state.layout === 'multiline' && styles.rootMultiline,
    state.shape === 'square' && styles.square,
    rootIntentStyles[state.intent],
    state.transitionClassName,
    state.root.className,
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      messageBarClassNames.icon,
      iconBaseStyles,
      iconIntentStyles[state.intent],
      state.icon.className,
    );
  }

  return state;
};
