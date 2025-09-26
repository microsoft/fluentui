import { makeResetStyles, makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { messageBarClassNames, type MessageBarState } from '@fluentui/react-message-bar';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
export const useSemanticMessageBarStyles = (_state: unknown): MessageBarState => {
  'use no memo';

  const state = _state as MessageBarState;
  const rootBaseStyles = useRootBaseStyles();
  const iconBaseStyles = useIconBaseStyles();
  const iconIntentStyles = useIconIntentStyles();
  const rootIntentStyles = useRootIntentStyles();
  const reflowSpacerStyles = useReflowSpacerBaseStyles();
  const styles = useStyles();

  state.root.className = mergeClasses(
    state.root.className,
    messageBarClassNames.root,
    rootBaseStyles,
    state.layout === 'multiline' && styles.rootMultiline,
    state.shape === 'square' && styles.square,
    rootIntentStyles[state.intent],
    state.transitionClassName,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.icon) {
    state.icon.className = mergeClasses(
      state.icon.className,
      messageBarClassNames.icon,
      iconBaseStyles,
      iconIntentStyles[state.intent],
      getSlotClassNameProp_unstable(state.icon),
    );
  }

  if (state.bottomReflowSpacer) {
    state.bottomReflowSpacer.className = mergeClasses(
      state.bottomReflowSpacer.className,
      messageBarClassNames.bottomReflowSpacer,
      reflowSpacerStyles,
      getSlotClassNameProp_unstable(state.bottomReflowSpacer),
    );
  }

  return state;
};
