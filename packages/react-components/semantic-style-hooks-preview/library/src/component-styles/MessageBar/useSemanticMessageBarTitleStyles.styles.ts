import { makeResetStyles, mergeClasses } from '@griffel/react';
import { messageBarTitleClassNames, type MessageBarTitleState } from '@fluentui/react-message-bar';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

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
export const useSemanticMessageBarTitleStyles = (_state: unknown): MessageBarTitleState => {
  'use no memo';

  const state = _state as MessageBarTitleState;
  const rootBaseStyles = useRootBaseStyles();
  state.root.className = mergeClasses(
    state.root.className,
    messageBarTitleClassNames.root,
    rootBaseStyles,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
