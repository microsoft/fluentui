/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { ToastState, ToastSlots } from './Toast.types';

/**
 * Render the final JSX of Toast
 */
export const renderToast_unstable = (state: ToastState) => {
  const { slots, slotProps } = getSlotsNext<ToastSlots>(state);

  return <slots.root {...slotProps.root} />;
};
