/** @jsxRuntime classic */
/** @jsxFrag Fragment */
/** @jsx createElement */

import { createElement, Fragment } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { ToastBodyState, ToastBodySlots } from './ToastBody.types';

/**
 * Render the final JSX of ToastBody
 */
export const renderToastBody_unstable = (state: ToastBodyState) => {
  const { slots, slotProps } = getSlotsNext<ToastBodySlots>(state);

  return (
    <>
      <slots.root {...slotProps.root} />
      {slots.subtitle ? <slots.subtitle {...slotProps.subtitle} /> : null}
    </>
  );
};
