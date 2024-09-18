/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarBodyState, MessageBarBodySlots } from './MessageBarBody.types';
import { InlineLinkContextProvider } from '@fluentui/react-link';

/**
 * Render the final JSX of MessageBarBody
 */
export const renderMessageBarBody_unstable = (state: MessageBarBodyState) => {
  assertSlots<MessageBarBodySlots>(state);

  return (
    <InlineLinkContextProvider value={{ inlineLinks: true }}>
      <state.root />
    </InlineLinkContextProvider>
  );
};
