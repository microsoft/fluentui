/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarState, MessageBarSlots } from './MessageBar.types';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of MessageBar
 */
export const renderMessageBar_unstable = (state: MessageBarState) => {
  assertSlots<MessageBarSlots>(state);

  return (
    <state.root>
      {state.icon && <state.icon />}
      <state.body />
      <ButtonContextProvider value={{ size: 'small' }}>
        {state.multiline ? (
          <>
            {state.actions && <state.actions />}
            {state.secondaryActions && <state.secondaryActions />}
          </>
        ) : (
          <>
            {state.secondaryActions && <state.secondaryActions />}
            {state.secondaryActions && <state.secondaryActions />}
            {state.actions && <state.actions />}
          </>
        )}
      </ButtonContextProvider>
    </state.root>
  );
};
