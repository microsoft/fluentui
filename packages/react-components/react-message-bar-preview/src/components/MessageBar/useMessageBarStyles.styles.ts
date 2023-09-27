import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarSlots, MessageBarState } from './MessageBar.types';

export const messageBarClassNames: SlotClassNames<MessageBarSlots> = {
  root: 'fui-MessageBar',
  icon: 'fui-MessageBar__icon',
  actions: 'fui-MessageBar__actions',
  secondaryActions: 'fui-MessageBar__secondaryActions',
  body: 'fui-MessageBar__body',
};

const useRootBaseStyles = makeResetStyles({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto auto',
  gridTemplateAreas: '"icon body secondaryActions actions"',
  ...shorthands.padding('0', tokens.spacingHorizontalM),
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
});

const useActionBaseStyles = makeResetStyles({
  ...shorthands.gridArea('actions'),
});

const useSecondaryActionsBaseStyles = makeResetStyles({
  ...shorthands.gridArea('secondaryActions'),
  display: 'flex',
  alignItems: 'center',
  columnGap: tokens.spacingHorizontalM,
  marginRight: tokens.spacingHorizontalM,
});

const useBodyBaseStyles = makeResetStyles({
  ...typographyStyles.body1,
  ...shorthands.gridArea('body'),
});

const useMultilineStyles = makeStyles({
  rootMultiline: {
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
  const actionsBaseStyles = useActionBaseStyles();
  const secondaryActionsBaseStyles = useSecondaryActionsBaseStyles();
  const bodyBaseStyles = useBodyBaseStyles();
  const multilineStyles = useMultilineStyles();
  const iconIntentStyles = useIconIntentStyles();
  const rootIntntStyles = useRootIntentStyles();
  state.root.className = mergeClasses(
    messageBarClassNames.root,
    rootBaseStyles,
    state.multiline && multilineStyles.rootMultiline,
    rootIntntStyles[state.intent],
    state.root.className,
  );

  state.body.className = mergeClasses(messageBarClassNames.body, bodyBaseStyles, state.body.className);

  if (state.icon) {
    state.icon.className = mergeClasses(
      messageBarClassNames.icon,
      iconBaseStyles,
      iconIntentStyles[state.intent],
      state.icon.className,
    );
  }

  if (state.actions) {
    state.actions.className = mergeClasses(
      messageBarClassNames.secondaryActions,
      actionsBaseStyles,
      state.actions.className,
    );
  }

  if (state.secondaryActions) {
    state.secondaryActions.className = mergeClasses(
      messageBarClassNames.actions,
      secondaryActionsBaseStyles,
      state.multiline && multilineStyles.secondaryActionsMultiline,
      state.secondaryActions.className,
    );
  }

  return state;
};
