/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarActionsState, MessageBarActionsSlots } from './MessageBarActions.types';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of MessageBarActions
 */
export const renderMessageBarActions_unstable = (state: MessageBarActionsState) => {
  assertSlots<MessageBarActionsSlots>(state);
  if (state.layout === 'multiline') {
    return (
      <ButtonContextProvider value={{ size: 'small' }}>
        {state.containerAction && <state.containerAction />}
        <state.root />
      </ButtonContextProvider>
    );
  }

  return (
    <ButtonContextProvider value={{ size: 'small' }}>
      <state.root />
      {state.containerAction && <state.containerAction />}
    </ButtonContextProvider>
  );
};
