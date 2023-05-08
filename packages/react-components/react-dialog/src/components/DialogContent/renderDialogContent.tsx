/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { DialogContentState, DialogContentSlots } from './DialogContent.types';

/**
 * Render the final JSX of DialogContent
 */
export const renderDialogContent_unstable = (state: DialogContentState) => {
  const { slots, slotProps } = getSlotsNext<DialogContentSlots>(state);

  return <slots.root {...slotProps.root} />;
};
