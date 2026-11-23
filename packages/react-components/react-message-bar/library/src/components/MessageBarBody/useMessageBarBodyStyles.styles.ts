'use client';

import { makeResetStyles, makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarBodySlots, MessageBarBodyState } from './MessageBarBody.types';
import { tokens, typographyStyles } from '@fluentui/react-theme';
import { useMessageBarContext } from '../../contexts/messageBarContext';

export const messageBarBodyClassNames: SlotClassNames<MessageBarBodySlots> = {
  root: 'fui-MessageBarBody',
};

const useRootBaseStyles = makeResetStyles({
  ...typographyStyles.body1,
  gridArea: 'body',
  paddingRight: tokens.spacingHorizontalM,
});

const useStyles = makeStyles({
  multiline: {
    maxWidth: '520px',
  },
});

/**
 * Apply styling to the MessageBarBody slots based on the state
 */
export const useMessageBarBodyStyles_unstable = (state: MessageBarBodyState): MessageBarBodyState => {
  const rootBaseStyles = useRootBaseStyles();
  const styles = useStyles();
  const { layout } = useMessageBarContext();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(
    messageBarBodyClassNames.root,
    rootBaseStyles,
    layout === 'multiline' && styles.multiline,
    state.root.className,
  );

  return state;
};
