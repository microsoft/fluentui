/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { DialogTitleState, DialogTitleSlots } from './DialogTitle.types';

/**
 * Render the final JSX of DialogTitle
 */
export const renderDialogTitle_unstable = (state: DialogTitleState) => {
  const { slots, slotProps } = getSlotsNext<DialogTitleSlots>(state);

  return (
    <>
      <slots.root {...slotProps.root}>{slotProps.root.children}</slots.root>
      {slots.action && <slots.action {...slotProps.action} />}
    </>
  );
};
