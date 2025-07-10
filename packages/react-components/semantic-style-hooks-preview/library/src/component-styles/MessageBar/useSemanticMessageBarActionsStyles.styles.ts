import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import { messageBarActionsClassNames, type MessageBarActionsState } from '@fluentui/react-message-bar';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
export const useSemanticMessageBarActionsStyles = (_state: unknown): MessageBarActionsState => {
  'use no memo';

  const state = _state as MessageBarActionsState;
  const rootBaseStyles = useRootBaseStyles();
  const containerActionBaseStyles = useContainerActionBaseStyles();
  const multilineStyles = useMultilineStyles();
  state.root.className = mergeClasses(
    state.root.className,
    messageBarActionsClassNames.root,
    rootBaseStyles,
    state.layout === 'multiline' && multilineStyles.root,
    !state.hasActions && multilineStyles.noActions,
    getSlotClassNameProp_unstable(state.root),
  );

  if (state.containerAction) {
    state.containerAction.className = mergeClasses(
      state.containerAction.className,
      messageBarActionsClassNames.containerAction,
      containerActionBaseStyles,
      getSlotClassNameProp_unstable(state.containerAction),
    );
  }

  return state;
};
