import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarActionsSlots, MessageBarActionsState } from './MessageBarActions.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const messageBarActionsClassNames: SlotClassNames<MessageBarActionsSlots> = {
  root: 'fui-MessageBarActions',
  containerAction: 'fui-MessageBarActions__containerAction',
};

/**
 * Styles for the root slot
 */
const useRootBaseStyles = makeResetStyles({
  gridArea: 'secondaryActions',
  display: 'flex',
  columnGap: semanticTokens.gapBetweenCtrlDefault,
  paddingRight: semanticTokens.gapBetweenCtrlDefault,
});

const useContainerActionBaseStyles = makeResetStyles({
  gridArea: 'actions',
});

const useMultilineStyles = makeStyles({
  root: {
    justifyContent: 'end',
    marginTop: semanticTokens._ctrlMessageBarSpacingTop,
    marginBottom: semanticTokens.paddingContentAlignDefault,
    marginRight: '0px',
    paddingRight: semanticTokens._ctrlMessageBarActionsMultilinePaddingRight,
  },

  noActions: {
    display: 'none',
  },
});

/**
 * Apply styling to the MessageBarActions slots based on the state
 */
export const useMessageBarActionsStyles_unstable = (state: MessageBarActionsState): MessageBarActionsState => {
  'use no memo';

  const rootBaseStyles = useRootBaseStyles();
  const containerActionBaseStyles = useContainerActionBaseStyles();
  const multilineStyles = useMultilineStyles();
  state.root.className = mergeClasses(
    messageBarActionsClassNames.root,
    rootBaseStyles,
    state.layout === 'multiline' && multilineStyles.root,
    !state.hasActions && multilineStyles.noActions,
    state.root.className,
  );

  if (state.containerAction) {
    state.containerAction.className = mergeClasses(
      messageBarActionsClassNames.containerAction,
      containerActionBaseStyles,
      state.containerAction.className,
    );
  }

  return state;
};
