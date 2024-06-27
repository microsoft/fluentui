/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessageBarTitleState, MessageBarTitleSlots } from './MessageBarTitle.types';

/**
 * Render the final JSX of MessageBarTitle
 */
export const renderMessageBarTitle_unstable = (state: MessageBarTitleState) => {
  assertSlots<MessageBarTitleSlots>(state);

  return <state.root />;
};
