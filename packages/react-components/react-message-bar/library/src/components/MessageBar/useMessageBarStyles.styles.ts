import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarSlots, MessageBarState } from './MessageBar.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

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
  paddingLeft: semanticTokens._ctrlMessageBarPaddingContentAlignDefault,
  paddingRight: semanticTokens.paddingContentAlignOutdentIconOnSubtle,
  paddingTop: semanticTokens._ctrlMessageBarPaddingVertical,
  paddingBottom: semanticTokens._ctrlMessageBarPaddingVertical,
  border: `${semanticTokens.strokeWidthDefault} solid ${semanticTokens.statusInformativeTintStroke}`,
  borderRadius: semanticTokens.cornerCtrlRest,
  alignItems: 'center',
  minHeight: '36px',
  boxSizing: 'border-box',
  backgroundColor: semanticTokens.statusImportantTintBackground,
});

const useIconBaseStyles = makeResetStyles({
  gridArea: 'icon',
  fontSize: semanticTokens.textGlobalBody1FontSize,
  marginRight: semanticTokens.gapInsideCtrlDefault,
  color: semanticTokens.foregroundCtrlIconOnNeutralRest,
  height: semanticTokens.textRampItemHeaderLineHeight,
  display: 'flex',
  alignItems: 'center',
});

const useReflowSpacerBaseStyles = makeResetStyles({
  marginBottom: semanticTokens._ctrlMessageBarReflowSpacerMarginBottom,
  gridArea: 'secondaryActions',
});

const useStyles = makeStyles({
  rootMultiline: {
    whiteSpace: 'normal',
    alignItems: 'start',
    paddingTop: semanticTokens._ctrlMessageBarSpacingTop,
    gridTemplateColumns: 'auto 1fr auto',
    gridTemplateAreas: `
      "icon body actions"
      "secondaryActions secondaryActions secondaryActions"
    `,
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
    color: semanticTokens._ctrlMessageBarErrorIconColor,
  },
  warning: {
    color: semanticTokens.statusWarningTintForeground,
  },
  success: {
    color: semanticTokens.statusSuccessTintForeground,
  },
});

const useRootIntentStyles = makeStyles({
  info: {
    /** already in base reset styles */
  },
  error: {
    backgroundColor: semanticTokens.statusDangerTintBackground,
    ...shorthands.borderColor(semanticTokens.statusDangerTintStroke),
  },
  warning: {
    backgroundColor: semanticTokens.statusWarningTintBackground,
    ...shorthands.borderColor(semanticTokens.statusWarningTintStroke),
  },
  success: {
    backgroundColor: semanticTokens.statusSuccessTintBackground,
    ...shorthands.borderColor(semanticTokens.statusSuccessTintStroke),
  },
});

/**
 * Apply styling to the MessageBar slots based on the state
 */
export const useMessageBarStyles_unstable = (state: MessageBarState): MessageBarState => {
  'use no memo';

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
