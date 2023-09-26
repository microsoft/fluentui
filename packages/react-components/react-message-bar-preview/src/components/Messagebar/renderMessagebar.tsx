/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { MessagebarState, MessagebarSlots } from './Messagebar.types';

/**
 * Render the final JSX of Messagebar
 */
export const renderMessagebar_unstable = (state: MessagebarState) => {
  assertSlots<MessagebarSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
