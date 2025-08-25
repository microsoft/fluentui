/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { MessageBarBodyState, MessageBarBodySlots, MessageBarBodyContextValues } from './MessageBarBody.types';
import { LinkContextProvider } from '@fluentui/react-link';

/**
 * Render the final JSX of MessageBarBody
 */
export const renderMessageBarBody_unstable = (
  state: MessageBarBodyState,
  contextValues: MessageBarBodyContextValues,
): JSXElement => {
  assertSlots<MessageBarBodySlots>(state);

  return (
    <LinkContextProvider value={contextValues.link}>
      <state.root />
    </LinkContextProvider>
  );
};
