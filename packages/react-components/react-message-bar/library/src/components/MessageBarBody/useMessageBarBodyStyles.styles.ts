import { makeResetStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { MessageBarBodySlots, MessageBarBodyState } from './MessageBarBody.types';
import * as semanticTokens from '@fluentui/semantic-tokens';

export const messageBarBodyClassNames: SlotClassNames<MessageBarBodySlots> = {
  root: 'fui-MessageBarBody',
};

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
export const useMessageBarBodyStyles_unstable = (state: MessageBarBodyState): MessageBarBodyState => {
  'use no memo';

  const rootBaseStyles = useRootBaseStyles();
  state.root.className = mergeClasses(messageBarBodyClassNames.root, rootBaseStyles, state.root.className);

  return state;
};
