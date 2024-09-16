/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { DialogBodyState, DialogBodySlots } from './DialogBody.types';

/**
 * Render the final JSX of DialogBody
 */
export const renderDialogBody_unstable = (state: DialogBodyState) => {
  assertSlots<DialogBodySlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
