import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarSlots, MessageBarState } from './MessageBar.types';

export const messageBarClassNames: SlotClassNames<MessageBarSlots> = {
  root: 'fui-MessageBar',
  icon: 'fui-MessageBar__icon',
  bottomReflowSpacer: 'fui-MessageBar__bottomReflowSpacer',
};

const useRootBaseStyles = makeResetStyles({
  whiteSpace: 'nowrap',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto auto',
  gridTemplateRows: '1fr',
  gridTemplateAreas: '"icon body secondaryActions actions"',
  paddingLeft: `var(--ctrl-token-MessageBar-1403, var(--semantic-token-MessageBar-1404, ${tokens.spacingHorizontalM}))`,
  border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
  borderRadius: `var(--ctrl-token-MessageBar-1405, var(--semantic-token-MessageBar-1406, ${tokens.borderRadiusMedium}))`,
  alignItems: 'center',
  minHeight: '36px',
  boxSizing: 'border-box',
  backgroundColor: `var(--ctrl-token-MessageBar-1407, var(--semantic-token-MessageBar-1408, ${tokens.colorNeutralBackground3}))`,
});

const useIconBaseStyles = makeResetStyles({
  gridArea: 'icon',
  fontSize: `var(--ctrl-token-MessageBar-1409, var(--semantic-token-MessageBar-1410, ${tokens.fontSizeBase500}))`,
  marginRight: `var(--ctrl-token-MessageBar-1411, var(--semantic-token-MessageBar-1412, ${tokens.spacingHorizontalS}))`,
  color: `var(--ctrl-token-MessageBar-1413, var(--semantic-token-MessageBar-1414, ${tokens.colorNeutralForeground3}))`,
  display: 'flex',
  alignItems: 'center',
});

const useReflowSpacerBaseStyles = makeResetStyles({
  marginBottom: `var(--ctrl-token-MessageBar-1415, var(--semantic-token-MessageBar-1416, ${tokens.spacingVerticalS}))`,
  gridArea: 'secondaryActions',
});

const useStyles = makeStyles({
  rootMultiline: {
    whiteSpace: 'normal',
    alignItems: 'start',
    paddingTop: `var(--ctrl-token-MessageBar-1417, var(--semantic-token-MessageBar-1418, ${tokens.spacingVerticalMNudge}))`,
    gridTemplateColumns: 'auto 1fr auto',
    gridTemplateAreas: `
      "icon body actions"
      "secondaryActions secondaryActions secondaryActions"
    `,
  },

  secondaryActionsMultiline: {
    justifyContent: 'end',
    marginTop: `var(--ctrl-token-MessageBar-1419, var(--semantic-token-MessageBar-1420, ${tokens.spacingVerticalMNudge}))`,
    marginBottom: `var(--ctrl-token-MessageBar-1421, var(--semantic-token-MessageBar-1422, ${tokens.spacingVerticalS}))`,
    marginRight: '0px',
  },

  square: {
    borderRadius: '0',
  },
});

const useIconIntentStyles = makeStyles({
  info: {
    /** already in base reset styles */
  },
  error: {
    color: `var(--ctrl-token-MessageBar-1423, var(--semantic-token-MessageBar-1424, ${tokens.colorStatusDangerForeground1}))`,
  },
  warning: {
    color: `var(--ctrl-token-MessageBar-1425, var(--semantic-token-MessageBar-1426, ${tokens.colorStatusWarningForeground3}))`,
  },
  success: {
    color: `var(--ctrl-token-MessageBar-1427, var(--semantic-token-MessageBar-1428, ${tokens.colorStatusSuccessForeground1}))`,
  },
});

const useRootIntentStyles = makeStyles({
  info: {
    /** already in base reset styles */
  },
  error: {
    backgroundColor: `var(--ctrl-token-MessageBar-1429, var(--semantic-token-MessageBar-1430, ${tokens.colorStatusDangerBackground1}))`,
    ...shorthands.borderColor(tokens.colorStatusDangerBorder1),
  },
  warning: {
    backgroundColor: `var(--ctrl-token-MessageBar-1431, var(--semantic-token-MessageBar-1432, ${tokens.colorStatusWarningBackground1}))`,
    ...shorthands.borderColor(tokens.colorStatusWarningBorder1),
  },
  success: {
    backgroundColor: `var(--ctrl-token-MessageBar-1433, var(--semantic-token-MessageBar-1434, ${tokens.colorStatusSuccessBackground1}))`,
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
  const reflowSpacerStyles = useReflowSpacerBaseStyles();
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

  if (state.bottomReflowSpacer) {
    state.bottomReflowSpacer.className = mergeClasses(messageBarClassNames.bottomReflowSpacer, reflowSpacerStyles);
  }

  return state;
};
