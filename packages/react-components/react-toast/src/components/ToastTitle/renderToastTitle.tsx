/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { ToastTitleState, ToastTitleSlots } from './ToastTitle.types';

/**
 * Render the final JSX of ToastTitle
 */
export const renderToastTitle_unstable = (state: ToastTitleState) => {
  const { slots, slotProps } = getSlotsNext<ToastTitleSlots>(state);

  return (
    <>
      {slots.media ? <slots.media {...slotProps.media} /> : null}
      <slots.root {...slotProps.root} />
      {slots.action ? <slots.action {...slotProps.action} /> : null}
    </>
  );
};
