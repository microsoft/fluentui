import { makeResetStyles, mergeClasses } from '@griffel/react';
import { messageBarBodyClassNames, type MessageBarBodyState } from '@fluentui/react-message-bar';
import * as semanticTokens from '@fluentui/semantic-tokens';
import { getSlotClassNameProp_unstable } from '@fluentui/react-utilities';

const useRootBaseStyles = makeResetStyles({
  fontFamily: semanticTokens.textStyleDefaultRegularFontFamily,
  fontSize: semanticTokens.textRampItemBodyFontSize,
  fontWeight: semanticTokens.textStyleDefaultRegularWeight,
  lineHeight: semanticTokens.textRampItemBodyLineHeight,
  gridArea: 'body',
  paddingRight: semanticTokens.gapBetweenCtrlDefault,
});

/**
 * Apply styling to the MessageBarBody slots based on the state
 */
export const useSemanticMessageBarBodyStyles = (_state: unknown): MessageBarBodyState => {
  'use no memo';

  const state = _state as MessageBarBodyState;
  const rootBaseStyles = useRootBaseStyles();
  state.root.className = mergeClasses(
    state.root.className,
    messageBarBodyClassNames.root,
    rootBaseStyles,
    getSlotClassNameProp_unstable(state.root),
  );

  return state;
};
