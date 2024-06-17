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
  columnGap: `var(--1435, var(--1436, ${tokens.spacingHorizontalM}))`,
  paddingRight: `var(--1437, var(--1438, ${tokens.spacingHorizontalM}))`,
});

const useContainerActionBaseStyles = makeResetStyles({
  gridArea: 'actions',
  paddingRight: `var(--1439, var(--1440, ${tokens.spacingHorizontalM}))`,
});

const useMultilineStyles = makeStyles({
  root: {
    justifyContent: 'end',
    marginTop: `var(--1441, var(--1442, ${tokens.spacingVerticalMNudge}))`,
    marginBottom: `var(--1443, var(--1444, ${tokens.spacingVerticalS}))`,
    marginRight: '0px',
    paddingRight: `var(--1445, var(--1446, ${tokens.spacingVerticalM}))`,
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
