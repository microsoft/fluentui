/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type {
  MessageBarActionsState,
  MessageBarActionsSlots,
  MessageBarActionsContextValues,
} from './MessageBarActions.types';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of MessageBarActions
 */
export const renderMessageBarActions_unstable = (
  state: MessageBarActionsState,
  contexts: MessageBarActionsContextValues,
) => {
  assertSlots<MessageBarActionsSlots>(state);
  if (state.layout === 'multiline') {
    return (
      <ButtonContextProvider value={contexts.button}>
        {state.containerAction && <state.containerAction />}
        <state.root />
      </ButtonContextProvider>
    );
  }

  return (
    <ButtonContextProvider value={contexts.button}>
      <state.root />
      {state.containerAction && <state.containerAction />}
    </ButtonContextProvider>
  );
};
