import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarTitleSlots, MessageBarTitleState } from './MessageBarTitle.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const messageBarTitleClassNames: SlotClassNames<MessageBarTitleSlots> = {
  root: 'fui-MessageBarTitle',
};

/**
 * Styles for the root slot
 */
const useRootBaseStyles = makeResetStyles({
  fontFamily: semanticTokens.textStyleDefaultHeaderFontFamily,
  fontSize: semanticTokens.textRampItemHeaderFontSize,
  fontWeight: semanticTokens.textStyleDefaultHeaderWeight,
  lineHeight: semanticTokens._ctrlMessageBarTitleLineHeight,

  '::after': {
    content: '" "',
  },
});

/**
 * Apply styling to the MessageBarTitle slots based on the state
 */
export const useMessageBarTitleStyles_unstable = (state: MessageBarTitleState): MessageBarTitleState => {
  'use no memo';

  const rootBaseStyles = useRootBaseStyles();
  state.root.className = mergeClasses(messageBarTitleClassNames.root, rootBaseStyles, state.root.className);

  return state;
};
