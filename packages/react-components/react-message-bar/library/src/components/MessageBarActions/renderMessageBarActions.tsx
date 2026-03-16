/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
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
): JSXElement => {
  assertSlots<MessageBarActionsSlots>(state);

  return (
    <ButtonContextProvider value={contexts.button}>
      {state.layout === 'multiline' && state.containerAction && <state.containerAction key="containerAction" />}
      <state.root />
      {state.layout !== 'multiline' && state.containerAction && <state.containerAction key="containerAction" />}
    </ButtonContextProvider>
  );
};
