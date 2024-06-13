import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarBodySlots, MessageBarBodyState } from './MessageBarBody.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';

export const messageBarBodyClassNames: SlotClassNames<MessageBarBodySlots> = {
  root: 'fui-MessageBarBody',
};

const useRootBaseStyles = makeResetStyles({
  ...typographyStyles.body1,
  gridArea: 'body',
  paddingRight: `var(--ctrl-token-MessageBarBody-1447, var(--semantic-token-MessageBarBody-1448, ${tokens.spacingHorizontalM}))`,
});

/**
 * Apply styling to the MessageBarBody slots based on the state
 */
export const useMessageBarBodyStyles_unstable = (state: MessageBarBodyState): MessageBarBodyState => {
  'use no memo';

  const rootBaseStyles = useRootBaseStyles();
  state.root.className = mergeClasses(messageBarBodyClassNames.root, rootBaseStyles, state.root.className);

  return state;
};
