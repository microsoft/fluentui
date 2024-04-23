/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarState, MessageBarSlots, MessageBarContextValues } from './MessageBar.types';
import { MessageBarContextProvider } from '../../contexts/messageBarContext';

/**
 * Render the final JSX of MessageBar
 */
export const renderMessageBar_unstable = (state: MessageBarState, contexts: MessageBarContextValues) => {
  assertSlots<MessageBarSlots>(state);

  return (
    <MessageBarContextProvider value={contexts.messageBar}>
      <state.root>
        {state.icon && <state.icon />}
        {state.root.children}
        {state.bottomReflowSpacer && <state.bottomReflowSpacer />}
      </state.root>
    </MessageBarContextProvider>
  );
};
