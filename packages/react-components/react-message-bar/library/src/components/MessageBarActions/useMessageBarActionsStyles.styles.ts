import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';
import type { MessageBarActionsSlots, MessageBarActionsState } from './MessageBarActions.types';

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
  columnGap: `var(--ctrl-token-MessageBarActions-1435, var(--semantic-token-MessageBarActions-1436, ${tokens.spacingHorizontalM}))`,
  paddingRight: `var(--ctrl-token-MessageBarActions-1437, var(--semantic-token-MessageBarActions-1438, ${tokens.spacingHorizontalM}))`,
});

const useContainerActionBaseStyles = makeResetStyles({
  gridArea: 'actions',
  paddingRight: `var(--ctrl-token-MessageBarActions-1439, var(--semantic-token-MessageBarActions-1440, ${tokens.spacingHorizontalM}))`,
});

const useMultilineStyles = makeStyles({
  root: {
    justifyContent: 'end',
    marginTop: `var(--ctrl-token-MessageBarActions-1441, var(--semantic-token-MessageBarActions-1442, ${tokens.spacingVerticalMNudge}))`,
    marginBottom: `var(--ctrl-token-MessageBarActions-1443, var(--semantic-token-MessageBarActions-1444, ${tokens.spacingVerticalS}))`,
    marginRight: '0px',
    paddingRight: `var(--ctrl-token-MessageBarActions-1445, var(--semantic-token-MessageBarActions-1446, ${tokens.spacingVerticalM}))`,
  },

  noActions: {
    display: 'none',
  },
});

/**
 * Apply styling to the MessageBarActions slots based on the state
 */
export const useMessageBarActionsStyles_unstable = (state: MessageBarActionsState): MessageBarActionsState => {
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
