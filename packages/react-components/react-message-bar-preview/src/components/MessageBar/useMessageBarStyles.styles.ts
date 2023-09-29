import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { tokens } from '@fluentui/react-theme';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarSlots, MessageBarState } from './MessageBar.types';
import { MotionType } from '../../../../react-motion-preview/src/index';

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
  ...shorthands.padding('0', tokens.spacingHorizontalM),
  ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke1),
  ...shorthands.borderRadius(tokens.borderRadiusMedium),
  alignItems: 'center',
  minHeight: '36px',
  boxSizing: 'border-box',
  backgroundColor: tokens.colorNeutralBackground3,
  animationFillMode: 'forwards',
  animationDuration: tokens.durationNormal,
});

const useIconBaseStyles = makeResetStyles({
  ...shorthands.gridArea('icon'),
  fontSize: tokens.fontSizeBase500,
  marginRight: tokens.spacingHorizontalS,
  color: tokens.colorNeutralForeground3,
});

const useMultilineStyles = makeStyles({
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

const useMotionStyles = makeStyles({
  enter: {
    animationName: {
      from: {
        opacity: 0,
        transform: 'translateY(-100%)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },

  exit: {
    animationName: {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
    },
  },
});

/**
 * Apply styling to the MessageBar slots based on the state
 */
export const useMessageBarStyles_unstable = (state: MessageBarState): MessageBarState => {
  const rootBaseStyles = useRootBaseStyles();
  const iconBaseStyles = useIconBaseStyles();
  const multilineStyles = useMultilineStyles();
  const iconIntentStyles = useIconIntentStyles();
  const rootIntentStyles = useRootIntentStyles();
  const motionStyles = useMotionStyles();

  const shouldExit = (type: MotionType) => ['exiting', 'exited'].includes(type);

  state.root.className = mergeClasses(
    messageBarClassNames.root,
    rootBaseStyles,
    state.layout === 'multiline' && multilineStyles.rootMultiline,
    rootIntentStyles[state.intent],
    shouldExit(state.motionState.type) && motionStyles.exit,
    state.animate === 'both' && !shouldExit(state.motionState.type) && motionStyles.enter,
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
