/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { DialogBodyState, DialogBodySlots } from './DialogBody.types';

/**
 * Render the final JSX of DialogBody
 */
export const renderDialogBody_unstable = (state: DialogBodyState) => {
  const { slots, slotProps } = getSlotsNext<DialogBodySlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
