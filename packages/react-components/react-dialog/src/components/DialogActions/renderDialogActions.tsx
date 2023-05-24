/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { DialogActionsState, DialogActionsSlots } from './DialogActions.types';

/**
 * Render the final JSX of DialogActions
 */
export const renderDialogActions_unstable = (state: DialogActionsState) => {
  const { slots, slotProps } = getSlotsNext<DialogActionsSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
