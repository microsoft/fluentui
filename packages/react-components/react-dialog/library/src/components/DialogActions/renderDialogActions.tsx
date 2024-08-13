/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { DialogActionsState, DialogActionsSlots } from './DialogActions.types';

/**
 * Render the final JSX of DialogActions
 */
export const renderDialogActions_unstable = (state: DialogActionsState) => {
  assertSlots<DialogActionsSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
